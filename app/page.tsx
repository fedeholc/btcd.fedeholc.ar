import Link from "next/link";
import Date from "./components/date";
import { getSortedPostsData } from "./lib/posts";
import { auth } from "./auth";

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const session = await auth();

  return (
    <section className="homepage">
      {session?.user?.name ? (
        <div>{session?.user?.name}</div>
      ) : (
        <div>Not logged in</div>
      )}
      <h2 className="apuntes__titulo">Últimos posteos</h2>
      <ul>
        {allPostsData.map(
          ({ id, date, title, draft }) =>
            !draft && (
              <li className="apuntes__item" key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
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
