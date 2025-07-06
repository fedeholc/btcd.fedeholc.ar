export default function BskyPost({ htmlString }: { htmlString: string }) {
  return (
    <div id="bsky-post" dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}
