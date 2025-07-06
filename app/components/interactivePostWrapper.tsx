import { ReactNode, Suspense } from "react";
import Date from "./date";
import CommentsList from "@/app/components/comments/commentsList";
import CommentsFormClient from "@/app/components/comments/commentsFormClient";

interface InteractivePostWrapperProps {
  children: ReactNode;
  title: string;
  date: string;
  tags: string[];
  postId: string;
}

export default function InteractivePostWrapper({
  children,
  title,
  date,
  tags,
  postId,
}: InteractivePostWrapperProps) {
  const tagsString = tags && tags.length > 0 ? tags.join(", ") : "";

  return (
    <section className="post__container">
      <div className="post__fecha">
        <Date dateString={date} />
      </div>
      <h1 className="post__titulo">{title}</h1>

      <div className="post__content">{children}</div>

      {tagsString && <div className="post__tags">Tags: {tagsString}</div>}

      <details className="comments__wrapper">
        <summary className="comments__title">Ver comentarios</summary>
        <Suspense fallback={<p>Cargando comentarios...</p>}>
          <CommentsList postId={postId} />
        </Suspense>
      </details>

      <details>
        <summary className="comments__form-title">Escribir comentario</summary>
        <CommentsFormClient postId={postId} />
      </details>
    </section>
  );
}
