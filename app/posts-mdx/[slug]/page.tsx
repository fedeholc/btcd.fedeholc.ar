type PostProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function MdxPost({ params }: PostProps) {
  const { slug } = await params;
  console.log("MDX Post slug:", slug);

  const PostModule = await import(`../${slug}/${slug}.mdx`);
  const Post = PostModule.default;
  return <Post />;
}
