//cspell: disable

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Date from "../components/date";
import dashboard from "./dashboard.module.css";
import BotonBorrar from "./botonBorrar";

export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  if (session?.user?.email != process.env.DASHBOARD_AUTH) {
    redirect("/");
  }

  const supabase = createServerComponentClient({ cookies });

  const { data: postComments } = await supabase
    .from("btcd_comments")
    .select()
    .order("created_at", { ascending: false });

  //TODO: darle forma a los comentarios
  //TODO: para la opción de borrar hay que hacer un client component?

  function handleBorrarComentario() {

  }

  return (
    <div>
      Dashboard - Comentarios
      <br /> <br />
      <div>
        {postComments?.map((comment) => (
          <div key={comment.id}>
            <div className={dashboard.comments__table}>
              <div>
                <strong>{comment.post_id}</strong>
              </div>
              <div>
                El <Date dateString={comment.created_at} />
                {comment.email} ({comment.name}) escribió:
              </div>
              <div className={dashboard.comments__comment}>
                {comment.comment}
              </div>
              <div className={dashboard.comments__leido}>
                {comment.leido ? "LEÍDO" : "NO LEÍDO"}{" "}
              </div>
            </div>
            <div className={dashboard.comments__botones}>
              <BotonBorrar id={comment.id} />
             {/*  <button onClick={handleBorrarComentario} className={dashboard.comments__button}>Borrar</button> */}
             {/*  <button className={dashboard.comments__button}>
                Marcar como leído
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
