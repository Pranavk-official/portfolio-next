type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 md:px-8">
      <div
        className="prose prose-base md:prose-lg prose-ash"
        dangerouslySetInnerHTML={{ __html: content }}
        role="article"
        aria-label="Article content"
      />
    </div>
  );
}
