import BlogCard from '@/components/BlogCard';
import { getSortedPostsData } from '@/lib/blogs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Blogs | Aditya Mishra',
  description: 'Browse all blog posts from Markdown Memoirs.',
};

export default function BlogsPage() {
  const allPosts = getSortedPostsData({ order: 'asc' }); // Oldest first

  if (allPosts.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold font-headline text-primary mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground">No blog posts found. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary mb-4">
          The Archive
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
          Explore our collection of articles, thoughts, and stories.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
