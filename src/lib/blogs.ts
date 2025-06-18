import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'src/content/blogs');

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // Keep as string for frontmatter, format for display
  formattedDate?: string; // For display
  excerpt: string;
  content: string; // Raw markdown content
  tags?: string[];
  author?: string;
  featured?: boolean;
  featuredImage?: string;
}

export function getSortedPostsData(): BlogPost[] {
  let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    // If directory doesn't exist or is not readable, return empty array
    console.warn("Warning: src/content/blogs directory not found or not readable. No blog posts will be loaded.");
    return [];
  }
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      const dateStr = matterResult.data.date || new Date().toISOString();
      let formattedDate;
      try {
        formattedDate = format(parseISO(dateStr), 'MMMM d, yyyy');
      } catch (e) {
        // Fallback if date is not parsable by parseISO
        formattedDate = matterResult.data.date || "Date not available";
      }

      return {
        slug,
        title: matterResult.data.title || 'Untitled Post',
        date: dateStr,
        formattedDate: formattedDate,
        excerpt: matterResult.data.excerpt || '',
        content: matterResult.content,
        tags: matterResult.data.tags || [],
        author: matterResult.data.author || 'Anonymous',
        featured: matterResult.data.featured || false,
        featuredImage: matterResult.data.featuredImage || undefined,
      } as BlogPost;
    });

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
   let fileNames: string[];
  try {
    fileNames = fs.readdirSync(postsDirectory);
  } catch (error) {
    return [];
  }

  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
    return {
      slug: fileName.replace(/\.md$/, ''),
    };
  });
}

export function getPostData(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const dateStr = matterResult.data.date || new Date().toISOString();
    let formattedDate;
    try {
      formattedDate = format(parseISO(dateStr), 'MMMM d, yyyy');
    } catch (e) {
      formattedDate = matterResult.data.date || "Date not available";
    }
    
    return {
      slug,
      title: matterResult.data.title || 'Untitled Post',
      date: dateStr,
      formattedDate: formattedDate,
      excerpt: matterResult.data.excerpt || '',
      content: matterResult.content,
      tags: matterResult.data.tags || [],
      author: matterResult.data.author || 'Anonymous',
      featured: matterResult.data.featured || false,
      featuredImage: matterResult.data.featuredImage || undefined,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
