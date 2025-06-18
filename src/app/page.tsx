import { Button } from "@/components/ui/button";
import { ArrowRight, Rss, UserCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from 'next';
import BlogCard from "@/components/BlogCard";
import { getSortedPostsData } from "@/lib/blogs";

export const metadata: Metadata = {
  title: 'Home | Aditya Mishra',
};

export default function Home() {
  const allPosts = getSortedPostsData({ order: 'desc' }); // Newest first for homepage
  const latestPosts = allPosts.slice(0, 6);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary mb-6 leading-tight">
          Welcome to Blogs by Aditya Mishra
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          Discover insightful articles about Web3 Development, Blockchain Technology, Smart Contract Security, Web development, programming best practices, and software engineering.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all hover:shadow-xl transform hover:scale-105">
            <Link href="/blogs">
              Explore Blogs <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 shadow-lg transition-all hover:shadow-xl transform hover:scale-105">
            <Link href="/about">
              About The Author <UserCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="space-y-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold font-headline text-primary mb-4 flex items-center justify-center">
              <Rss className="mr-3 h-8 w-8 text-accent" />
              Latest Articles
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Catch up on our newest thoughts, stories, and tutorials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          {allPosts.length > 6 && (
            <div className="text-center mt-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:shadow-lg transform hover:scale-105">
                <Link href="/blogs">
                  View All Articles <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </section>
      )}

      {latestPosts.length === 0 && (
        <section className="text-center py-10">
          <p className="text-xl text-muted-foreground">No blog posts found yet. Check back soon!</p>
        </section>
      )}
    </div>
  );
}
