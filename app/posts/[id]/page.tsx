import Date from "../../components/date";
import { getPostData } from "../../lib/posts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Comments from "../../components/comments";
import Link from "next/link";
import CommentsClient from "@/app/components/commentsClient";

type PostProps = {
  params: {
    id: string;
  };
};

export default async function Post({ params }: PostProps) {
  const supabase = createServerComponentClient({ cookies });

  // The fetched data is stored in a variable called `postComments`. The `data` property of the response object from Supabase is being destructured and assigned to this variable.
  const { data: postComments } = await supabase
    .from("btcd_comments")
    .select()
    .eq("post_id", decodeURI(params.id));

  console.log(postComments);
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

      {/*     <div className="volver">
        <Link href="/">⬅ Volver</Link>
      </div> */}

      <details className="comments__wrapper">
        <summary className="comments__title">Ver comentarios</summary>
        <div className="comments__list">
          {postComments?.map((comment) => (
            <div className="comments__comment" key={comment.id}>
              <div className="comment__header">
                <span className="comment__name">{comment.name}:</span>

                <div className="comment__date">
                  <Date dateString={comment.created_at} />
                </div>
              </div>

              <div className="comment__body">{comment.comment} </div>
            </div>
          ))}
        </div>
      </details>
      <details>
        <summary className="comments__title">Escribir un comentario</summary>
        <CommentsClient postId={postData.id}></CommentsClient>
      </details>
    </section>
  );
}
