"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function handleBorrarComentario(props: { id: string }) {
  const supabase = createServerComponentClient({ cookies });
  console.log("Borrar: ", props.id);
  const { error } = await supabase
    .from("btcd_comments")
    .delete()
    .eq("id", props.id);

  if (error) console.error("Error borrando el comentario", error);

  revalidatePath("/dashboard");
}
