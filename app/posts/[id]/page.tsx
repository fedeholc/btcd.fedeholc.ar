import Date from "../../components/date";
import { getPostData } from "../../lib/posts";
import CommentsFormClient from "@/app/components/comments/commentsFormClient";
import { Suspense } from "react";
import CommentsList from "@/app/components/comments/commentsList";

type PostProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Post({ params }: PostProps) {
  const { id } = await params;
  const postData = await getPostData(id);

  const tags: string =
    postData.tags && postData.tags.length > 0 ? postData.tags.join(", ") : "";

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

      {tags && <div className="post__tags">Tags: {tags}</div>}

      {/*     <div className="volver">
        <Link href="/">⬅ Volver</Link>
      </div> */}

      <details className="comments__wrapper">
        <summary className="comments__title">Ver comentarios</summary>
        <Suspense fallback={<p>Cargando comentarios...</p>}>
          <CommentsList postId={id}></CommentsList>
        </Suspense>
      </details>
      <details>
        <summary className="comments__title">Escribir un comentario</summary>
        <Suspense fallback={<p>Cargando formulario...</p>}>
          <CommentsFormClient postId={postData.id}></CommentsFormClient>
        </Suspense>
      </details>
    </section>
  );
}
