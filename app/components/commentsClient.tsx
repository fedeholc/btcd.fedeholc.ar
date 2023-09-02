"use client";
import { MouseEventHandler, useState } from "react";
import { saveComment } from "./commentsClientSaveComment";
import { set } from "date-fns";

export default function CommentsClient(props: { postId: string }) {
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isCommentSent, setIsCommentSent] = useState(false);

  async function handleForm(formData: FormData) {
    const { error } = await saveComment(formData);
    if (error) console.error("Error guardando el comentario", error);
    setUserName("");
    setCommentText("");
    setIsCommentSent(true);
  }

  return (
    <div className="comment__form">
      {!isCommentSent && (
        <form action={handleForm}>
          <input
            id="comment__postId"
            name="postId"
            value={props.postId}
            readOnly
          />
          <input
            required
            id="userName"
            name="userName"
            placeholder="Nombre"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <textarea
            required
            id="comment"
            name="comment"
            placeholder="Comentario"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      )}

      {isCommentSent && (
        <div className="comment__sent">
          <p>Comentario enviado. ¡Gracias!</p>
          <button onClick={() => setIsCommentSent(false)}>
            Enviar otro comentario
          </button>
        </div>
      )}
    </div>
  );
}
