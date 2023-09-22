"use client";
import { useState } from "react";
import { saveComment } from "./commentsSaveComment";
import { signIn, signOut, useSession } from "next-auth/react";

export default function CommentsFormClient(props: { postId: string }) {
  const { data: session } = useSession();

  const [userName, setUserName] = useState(session?.user?.name || "");
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
      {/* {session && <button onClick={() => signOut()}>Sign Out</button>} */}

      {!session && (
        <div className="signIn">
          Para poder escribir primero inicia sesión (GitHub / Google)
          <button onClick={() => signIn()}>Sign In</button>
        </div>
      )}

      {!isCommentSent && session && (
        <form action={handleForm}>
          <input
            id="comment__postId"
            name="postId"
            value={props.postId}
            readOnly
          />
          <div>
            <input
              required
              id="userName"
              name="userName"
              placeholder="Nombre"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="name"
            />
          </div>
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
