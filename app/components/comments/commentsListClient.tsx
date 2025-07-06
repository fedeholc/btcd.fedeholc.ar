"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Date from "../date";

interface Comment {
  id: string;
  name: string;
  comment: string;
  created_at: string;
}

export default function CommentsListClient(props: { postId: string }) {
  const { postId } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const { data: postComments, error } = await supabase
          .from("btcd_comments")
          .select("*")
          .eq("post_id", decodeURI(postId))
          .order("created_at", { ascending: false });

        if (error) {
          setError(error.message);
        } else {
          setComments(postComments || []);
        }
      } catch (err) {
        setError("Error al cargar comentarios");
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [postId, supabase]);

  if (loading) return <p>Cargando comentarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="comments__list">
      {comments?.map((comment) => (
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
