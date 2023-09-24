"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

export async function saveComment(dataF: FormData) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession();

  let postId = decodeURI(dataF.get("postId")?.toString() || "");
  const { data, error } = await supabase
    .from("btcd_comments")
    .insert({
      post_id: postId,
      name: dataF.get("userName"),
      comment: dataF.get("comment"),
      email: session?.user?.email ?? "",
      leido: false,
    })
    .select();

  // hace que se vuelva a cargar la página para que se vea el comentario
  revalidatePath("/posts/" + postId);
  return { data, error };
}
