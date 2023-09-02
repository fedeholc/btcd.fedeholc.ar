"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function saveComment(dataF: FormData) {
  const supabase = createServerComponentClient({ cookies });

  let postId = decodeURI(dataF.get("postId")?.toString() || "");
  const { data, error } = await supabase
    .from("btcd_comments")
    .insert({
      post_id: postId,
      name: dataF.get("userName"),
      comment: dataF.get("comment"),
    })
    .select();

  // hace que se vuelva a cargar la página para que se vea el comentario
  revalidatePath("/posts/" + postId);
  return { data, error };
}
