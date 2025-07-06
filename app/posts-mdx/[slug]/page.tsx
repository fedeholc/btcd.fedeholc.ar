import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Date from "../../components/date";

type PostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MdxPost({ params }: PostProps) {
  const { slug } = await params;
  console.log("MDX Post slug:", slug);

  // Extract metadata from the MDX file's frontmatter
  const mdxFilePath = path.join(
    process.cwd(),
    "app",
    "posts-mdx",
    slug,
    `${slug}.mdx`
  );
  const fileContents = fs.readFileSync(mdxFilePath, "utf8");
  const matterResult = matter(fileContents);
  const metadata = matterResult.data;

  const PostModule = await import(`../${slug}/${slug}.mdx`);
  const Post = PostModule.default;

  const tags: string =
    metadata.tags && metadata.tags.length > 0 ? metadata.tags.join(", ") : "";

  return (
    <section className="post__container">
      <div className="post__fecha">
        <Date dateString={metadata.date} />
      </div>
      <h1 className="post__titulo">{metadata.title}</h1>

      <div className="post__content">
        <Post />
      </div>

      {tags && <div className="post__tags">Tags: {tags}</div>}
    </section>
  );
}
