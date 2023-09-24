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

  function handleBorrarComentario() {}

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
              {/*     <div className={dashboard.comments__leido}>
                {comment.leido ? "LEÍDO" : "NO LEÍDO"}{" "}
              </div> */}
              {/* TODO: queda pendiente implementar el marcar y filtrar leídos y no leídos */}
            </div>
            <div className={dashboard.comments__botones}>
              <BotonBorrar id={comment.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
