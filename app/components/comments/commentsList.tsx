import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Date from "../date";

export default async function CommentsList(props: { postId: string }) {
  const { postId } = props;
  const supabase = createServerComponentClient({ cookies });

  // The fetched data is stored in a variable called `postComments`. The `data` property of the response object from Supabase is being destructured and assigned to this variable.
  const { data: postComments } = await supabase
    .from("btcd_comments")
    .select()
    .eq("post_id", decodeURI(postId));
  return (
    <div className="comments__list">
      {postComments?.map((comment) => (
        <div className="comments__comment" key={comment.id}>
          <div className="comment__header">
            <span className="comment__name">{comment.name}:</span>

            <div className="comment__date">
              <Date dateString={comment.created_at} />
            </div>
          </div>

          <div className="comment__body">{comment.comment} </div>
        </div>
      ))}
    </div>
  );
}
