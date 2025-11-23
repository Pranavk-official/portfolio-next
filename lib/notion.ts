import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export interface PostMetadata {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  description: string;
  published: boolean;
}

export interface Post extends PostMetadata {
  content: string;
}

export interface FilteredPostsResult {
  posts: PostMetadata[];
  total: number;
  totalPages: number;
}

// Type guard
function isPageObjectResponse(
  page:
    | PageObjectResponse
    | PartialPageObjectResponse
    | { object: "data_source" }
    | { object: "database" }
): page is PageObjectResponse {
  return "properties" in page && page.object === "page";
}

function getPageMetaData(page: PageObjectResponse): PostMetadata {
  const properties = page.properties;

  // Extract title
  let title = "Untitled";
  const titleProp = properties.Title || properties.title;
  if (titleProp?.type === "title" && titleProp.title.length > 0) {
    title = titleProp.title[0].plain_text || "Untitled";
  }

  // Extract slug
  let slug = "";
  const slugProp = properties.Slug || properties.slug;
  if (slugProp?.type === "rich_text" && slugProp.rich_text.length > 0) {
    slug = slugProp.rich_text[0].plain_text || "";
  }

  // Extract date
  let date = "";
  const dateProp = properties.Date || properties.date;
  if (dateProp?.type === "date" && dateProp.date) {
    date = dateProp.date.start || "";
  }

  // Extract tags
  let tags: string[] = [];
  const tagsProp = properties.Tags || properties.tags;
  if (tagsProp?.type === "multi_select" && tagsProp.multi_select) {
    tags = tagsProp.multi_select.map((tag) => tag.name);
  }

  // Extract description
  let description = "";
  const descProp = properties.Description || properties.description;
  if (descProp?.type === "rich_text" && descProp.rich_text.length > 0) {
    description = descProp.rich_text[0].plain_text || "";
  }

  // Extract published status
  let published = false;
  const publishedProp = properties.Published || properties.published;
  if (publishedProp?.type === "checkbox") {
    published = publishedProp.checkbox;
  }

  return { id: page.id, title, slug, date, tags, description, published };
}

export async function getAllPublished(): Promise<PostMetadata[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });

  return response.results.filter(isPageObjectResponse).map(getPageMetaData);
}

export async function getAllPublisedSlugs(): Promise<string[]> {
  const response = await notion.dataSources.query({
    data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
  });

  return response.results
    .filter(isPageObjectResponse)
    .map((page: PageObjectResponse) => {
      const properties = page.properties;
      const slugProp = properties.Slug || properties.slug;
      let slugValue = "";

      if (slugProp?.type === "rich_text" && slugProp.rich_text.length > 0) {
        slugValue = slugProp.rich_text[0].plain_text || "";
      }

      // If no slug, generate from title
      if (!slugValue) {
        const titleProp = properties.Title || properties.title;
        if (titleProp?.type === "title" && titleProp.title.length > 0) {
          const title = titleProp.title[0].plain_text || "";
          slugValue = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        }
      }

      return slugValue;
    })
    .filter((slug: string): slug is string => slug !== "");
}

export async function getSinglePost(slug: string): Promise<Post | null> {
  if (!slug || slug.trim() === "") {
    return null;
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_DATA_SOURCE_ID!,
      filter: {
        and: [
          { property: "Published", checkbox: { equals: true } },
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
      page_size: 1,
    });

    // console.log("Notion response for slug", slug, ":", response);

    const pageResult = response.results.find(isPageObjectResponse);

    if (!pageResult) {
      return null;
    }

    const metadata = getPageMetaData(pageResult);

    // Fetch content blocks with STRICT LIMIT
    const mdBlocks = await n2m.pageToMarkdown(metadata.id);

    // CRITICAL: Only take first 30 blocks to prevent OOM
    const limitedBlocks = mdBlocks.slice(0, 30);
    const mdString = n2m.toMarkdownString(limitedBlocks);

    return {
      ...metadata,
      content: mdString.parent || "",
    };
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getAllPublished();
  return posts.map((post) => post.slug);
}

export async function getFilteredPosts(
  page: number = 1,
  pageSize: number = 9,
  search: string = "",
  tag: string = ""
): Promise<FilteredPostsResult> {
  const allPosts = await getAllPublished();
  let filtered = allPosts;

  // Apply search filter
  if (search && search.trim()) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(searchLower) ||
        post.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply tag filter
  if (tag && tag.trim()) {
    filtered = filtered.filter((post) => post.tags.includes(tag));
  }

  // Calculate pagination
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const validPage = Math.max(1, Math.min(page, totalPages));

  const start = (validPage - 1) * pageSize;
  const end = start + pageSize;
  const posts = filtered.slice(start, end);

  return { posts, total, totalPages };
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPublished();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}
