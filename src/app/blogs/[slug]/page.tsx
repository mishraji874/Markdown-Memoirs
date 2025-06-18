import { getPostData, getAllPostSlugs, BlogPost } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { CalendarDays, UserCircle, Tag } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostData(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Markdown Memoirs`,
    description: post.excerpt,
    authors: post.author ? [{ name: post.author }] : undefined,
    keywords: post.tags,
    openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: post.author ? [post.author] : [],
        tags: post.tags,
    },
  };
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-md text-muted-foreground mb-6">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            <span>{post.formattedDate || post.date}</span>
          </div>
          {post.author && (
             <div className="flex items-center">
               <UserCircle className="mr-2 h-5 w-5" />
               <span>By {post.author}</span>
             </div>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent"
              >
                <Tag className="mr-1.5 h-4 w-4" /> {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Optional: Add a placeholder for a cover image if you plan to use it
      <div className="mb-8 aspect-video relative">
        <Image src="https://placehold.co/1200x675" alt={`Cover image for ${post.title}`} layout="fill" objectFit="cover" className="rounded-lg shadow-lg" data-ai-hint="article technology" />
      </div>
      */}
      
      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground/90 prose-code:font-code prose-code:text-accent-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-blockquote:border-accent prose-blockquote:text-muted-foreground">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
