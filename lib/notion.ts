import { NotionToMarkdown } from 'notion-to-md';

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

interface NotionResponse {
    results: Array<{
        id: string;
        properties: Record<string, unknown>;
        [key: string]: unknown;
    }>;
    [key: string]: unknown;
}

interface NotionPage {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: Record<string, any>;
}


async function notionFetch(endpoint: string, options: { method?: string; body?: object } = {}) {
    const response = await fetch(`${NOTION_API}${endpoint}`, {
        method: options.method || 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
            'Notion-Version': NOTION_VERSION,
            'Content-Type': 'application/json',
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Notion API Error: ${error.message || 'Unknown error'}`);
    }

    return response.json() as Promise<NotionResponse>;
}

// Create a minimal notion client for notion-to-md
const notionClient = {
    blocks: {
        children: {
            list: async ({ block_id }: { block_id: string }) => {
                return notionFetch(`/blocks/${block_id}/children`, { method: 'GET' });
            }
        }
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const n2m = new NotionToMarkdown({ notionClient: notionClient as any });

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


function getPageMetaData(page: NotionPage): PostMetadata {
    const properties = page.properties;

    // Extract title
    let title = 'Untitled';
    const titleProp = properties.Title || properties.title;
    if (titleProp && titleProp.type === 'title' && titleProp.title && titleProp.title.length > 0) {
        title = titleProp.title[0].plain_text || 'Untitled';
    }

    // Extract slug
    let slug = '';
    const slugProp = properties.Slug || properties.slug;
    if (slugProp && slugProp.type === 'rich_text' && slugProp.rich_text && slugProp.rich_text.length > 0) {
        slug = slugProp.rich_text[0].plain_text || '';
    }

    // Extract date
    let date = '';
    const dateProp = properties.Date || properties.date;
    if (dateProp && dateProp.type === 'date' && dateProp.date) {
        date = dateProp.date.start || '';
    }

    // Extract tags
    let tags: string[] = [];
    const tagsProp = properties.Tags || properties.tags;
    if (tagsProp && tagsProp.type === 'multi_select' && tagsProp.multi_select) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tags = tagsProp.multi_select.map((tag: any) => tag.name);
    }

    // Extract description
    let description = '';
    const descProp = properties.Description || properties.description;
    if (descProp && descProp.type === 'rich_text' && descProp.rich_text && descProp.rich_text.length > 0) {
        description = descProp.rich_text[0].plain_text || '';
    }

    // Extract published status
    let published = false;
    const publishedProp = properties.Published || properties.published;
    if (publishedProp && publishedProp.type === 'checkbox') {
        published = publishedProp.checkbox;
    }

    return {
        id: page.id,
        title,
        slug,
        date,
        tags,
        description,
        published,
    };
}


export async function getAllPublished(): Promise<PostMetadata[]> {
    const response = await notionFetch(`/databases/${process.env.NOTION_DATA_SOURCE_ID}/query`, {
        method: 'POST',
        body: {
            filter: {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        },
    });

    // console.log(response.results)

    return response.results.map((page) => getPageMetaData(page as NotionPage));
}

// export async function getSinglePost(slug: string): Promise<Post | null> {
//     console.log(slug)
//     // Validate slug
//     if (!slug || slug.trim() === '') {
//         console.error('Invalid slug provided:', slug);
//         return null;
//     }

//     try {
//         const response = await notionFetch(`/databases/${process.env.NOTION_DATA_SOURCE_ID}/query`, {
//             method: 'POST',
//             body: {
//                 filter: {
//                     and: [
//                         {
//                             property: 'Slug',
//                             rich_text: {
//                                 equals: slug.trim(),
//                             },
//                         },
//                         {
//                             property: 'Published',
//                             checkbox: {
//                                 equals: true,
//                             },
//                         },
//                     ],
//                 },
//             },
//         });

//         if (response.results.length === 0) {
//             return null;
//         }

//         const page = response.results[0] as NotionPage;
//         const metadata = getPageMetaData(page);

//         const mdBlocks = await n2m.pageToMarkdown(page.id);
//         const mdString = n2m.toMarkdownString(mdBlocks);

//         return {
//             ...metadata,
//             content: mdString.parent,
//         };
//     } catch (error) {
//         console.error('Error fetching post:', slug, error);
//         return null;
//     }
// }

export async function getSinglePost(slug: string): Promise<Post | null> {
    // console.log('🔍 getSinglePost called with slug:', slug);

    // Validate slug
    if (!slug || slug.trim() === '') {
        // console.error('❌ Invalid slug provided:', slug);
        return null;
    }

    // First, get all published posts
    // console.log('📚 Fetching all published posts...');
    const allPosts = await getAllPublished();
    // console.log('📊 Found posts:', allPosts.map(p => ({ title: p.title, slug: p.slug })));

    // Find the post with matching slug (case-insensitive)
    const matchingPost = allPosts.find(
        post => {
            const match = post.slug.toLowerCase() === slug.toLowerCase();
            // console.log(`🔎 Comparing "${post.slug}" with "${slug}": ${match}`);
            return match;
        }
    );

    if (!matchingPost) {
        // console.error('❌ No matching post found for slug:', slug);
        // console.log('Available slugs:', allPosts.map(p => p.slug));
        return null;
    }

    // console.log('✅ Found matching post:', matchingPost.title);

    // Fetch the page content
    const mdBlocks = await n2m.pageToMarkdown(matchingPost.id);
    const mdString = n2m.toMarkdownString(mdBlocks);

    return {
        ...matchingPost,
        content: mdString.parent,
    };
}


export async function getAllSlugs(): Promise<string[]> {
    const posts = await getAllPublished();
    return posts.map((post) => post.slug);
}
