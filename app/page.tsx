import Link from "next/link";
import Date from "./components/date";
import { getSortedPostsData } from "./lib/posts";
import Prueba from "../blog-posts/prueba.mdx"; // Importa tu archivo MDX

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  console.log(allPostsData);

  return (
    <section className="homepage">
      <h2 className="apuntes__titulo">Últimos posteos</h2>
      <ul>
        {allPostsData.map(
          ({ id, date, title, draft, isInteractive }) =>
            !draft && (
              <li className="apuntes__item" key={id}>
                <Link href={isInteractive ? `/posts-mdx/${id}` : `/posts/${id}`}>
                  {title} {isInteractive && "🚀"}
                </Link>
                {/*  
            <small>
              <Date dateString={date} />
            </small> */}
              </li>
            )
        )}
      </ul>
    </section>
  );
}
