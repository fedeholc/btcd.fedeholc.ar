import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeComponents from "../rehype-components";
import { h, s } from "hastscript";
import { redirect } from "next/navigation";
import rehypePrism from "rehype-prism-plus";
import { compile } from "@mdx-js/mdx";

const postsDirectory = path.join(process.cwd(), "blog-posts");
const interactivePostsDirectory = path.join(process.cwd(), "app/posts");

export async function getSortedPostsData() {
  const allPostsData = [];

  // Get regular posts from blog-posts directory
  const fileNames = fs.readdirSync(postsDirectory);
  const regularPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      const id = fileName.replace(/\.(md|mdx)$/, "");

      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = JSON.parse(JSON.stringify(matter(fileContents)));

      // Combine the data with the id
      return {
        id,
        ...matterResult.data,
      };
    });

  allPostsData.push(...regularPosts);

  // Get interactive posts from app/posts subdirectories
  try {
    const interactiveDirs = fs
      .readdirSync(interactivePostsDirectory, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .filter((dirName) => dirName !== "[id]"); // Exclude the dynamic route folder

    for (const dirName of interactiveDirs) {
      const pageMdxPath = path.join(
        interactivePostsDirectory,
        dirName,
        "page.mdx"
      );

      if (fs.existsSync(pageMdxPath)) {
        const fileContents = fs.readFileSync(pageMdxPath, "utf8");
        const matterResult = JSON.parse(JSON.stringify(matter(fileContents)));

        allPostsData.push({
          id: dirName,
          isInteractive: true,
          ...matterResult.data,
        });
      }
    }
  } catch (error) {
    console.log("No interactive posts directory found");
  }

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.(md|mdx)$/, ""),
        },
      };
    });
}

export async function getPostData(id: string) {
  const decodedId = decodeURI(id);
  let fullPath = path.join(postsDirectory, `${decodedId}.md`);
  let fileContents: string;
  let isMdx = false;

  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    // Try .mdx if .md doesn't exist
    try {
      fullPath = path.join(postsDirectory, `${decodedId}.mdx`);
      fileContents = fs.readFileSync(fullPath, "utf8");
      isMdx = true;
    } catch (mdxError) {
      console.error(`Error reading file: ${error}`);
      redirect("/");
    }
  }

  const matterResult = JSON.parse(JSON.stringify(matter(fileContents)));
  let contentHtml: string;

  if (isMdx) {
    // Para MDX, procesamos con remark/rehype pero mantenemos la sintaxis JSX
    const processed = await remark()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypePrism)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(matterResult.content);

    contentHtml = String(processed.value);
  } else {
    // Process regular markdown
    const processed = await remark()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypePrism)
      .use(rehypeStringify)
      .process(matterResult.content);

    contentHtml = String(processed.value);
  }

  return {
    id,
    contentHtml,
    isMdx,
    ...matterResult.data,
  };
}
