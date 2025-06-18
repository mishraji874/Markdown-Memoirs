import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/blogs';
import { CalendarDays, ArrowRight, Tag, UserCircle } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out bg-card">
      <CardHeader>
        <Link href={`/blogs/${post.slug}`} className="group">
          <CardTitle className="text-2xl font-headline font-semibold text-primary group-hover:text-accent transition-colors duration-300">
            {post.title}
          </CardTitle>
        </Link>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
          <div className="flex items-center">
            <CalendarDays className="mr-1.5 h-4 w-4" />
            <span>{post.formattedDate || post.date}</span>
          </div>
          {post.author && (
            <div className="flex items-center">
              <UserCircle className="mr-1.5 h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
        </div>
        <CardDescription className="mt-3 text-base text-foreground/80 leading-relaxed">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                <Tag className="mr-1 h-3 w-3" /> {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="link" asChild className="text-accent hover:text-accent/80 p-0">
          <Link href={`/blogs/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
