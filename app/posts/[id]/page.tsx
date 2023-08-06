import Date from "../../components/date";
import { getPostData } from "../../lib/posts";

type PostProps = {
  params: {
    id: string;
  };
};

export default async function Post({ params }: PostProps) {
  const postData = await getPostData(params.id);

  let tags: string = "";
  postData.tags.forEach((tag: string, index: number) => {
    tags = tags + tag + ", ";
  });
  tags = tags.slice(0, tags.length - 2); // le quita la coma y el espacio a la última */
  return (
    <section className="post__container">
      <div className="post__fecha">
        <Date dateString={postData.date} />
      </div>
      <h1 className="post__titulo">{postData.title}</h1>

      <div
        className="post__content"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />

      <div className="post__tags">Tags: {tags}</div>
    </section>
  );
}
