/* versión server side con form action, no la voy a usar porque no se puede hacer que se borren los inputs
del formulario después del submit, para eso hay que usar un componente client */
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Comments(props: { postId: string }) {
  // change data type to match form data

  async function saveComment(dataF: FormData) {
    "use server";
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
      .from("btcd_comments")
      .insert({
        post_id: decodeURI(props.postId),
        name: dataF.get("userName"),
        comment: dataF.get("comment"),
      })
      .select();

    // hace que se vuelva a cargar la página para que se vea el comentario
    revalidatePath("/posts/" + decodeURI(props.postId));
  }

  return (
    <div className="comment__form">
      <form action={saveComment}>
        <input required id="userName" name="userName" placeholder="Nombre" />
        <textarea
          required
          id="comment"
          name="comment"
          placeholder="Comentario"
        />
        <div className="button_container">
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
}
