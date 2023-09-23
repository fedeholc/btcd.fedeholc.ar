import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Date from "../components/date";

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

  return (
    <div>
      This is a protected route.
      <br />
      You will only see this if you are authenticated.
      <div className="comments__list">
        {postComments?.map((comment) => (
          <div className="" key={comment.id}>
            {comment.name}

            <Date dateString={comment.created_at} />

            {comment.comment}
          </div>
        ))}
      </div>
    </div>
  );
}
