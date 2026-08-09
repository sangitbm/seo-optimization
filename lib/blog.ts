import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
}

export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}

const contentDir = path.join(process.cwd(), "content", "blog");

export function getBlogPosts(lang: string): BlogPostMeta[] {
  const dirPath = path.join(contentDir, lang);
  
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath);
  const posts = files
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(dirPath, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: filename.replace(".md", ""),
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getBlogPost(slug: string, lang: string): BlogPost | null {
  const filePath = path.join(contentDir, lang, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
    },
    content,
  };
}
