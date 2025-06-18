import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, UserCircle, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
import BlogCard from "@/components/BlogCard";
import { getSortedPostsData, type BlogPost } from "@/lib/blogs";

export const metadata: Metadata = {
  title: 'Home', // This will be "Home | Markdown Memoirs" due to layout template
};

export default function Home() {
  const allPosts = getSortedPostsData();
  const latestPosts = allPosts.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-5xl md:text-6xl font-bold font-headline text-primary mb-6 leading-tight">
          Welcome to Markdown Memoirs
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          Discover inspiring articles, in-depth tutorials, and personal reflections.
          Dive into a world of ideas crafted with care.
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

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-accent" />
              <CardTitle className="text-3xl text-primary font-headline">Featured Content</CardTitle>
            </div>
            <CardDescription className="text-lg">
              Handpicked articles to get you started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 mb-4">
              Our blog covers a wide range of topics, from technology deep dives to creative writing insights. There's something for everyone.
            </p>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Abstract representation of ideas"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full"
              data-ai-hint="knowledge ideas"
            />
          </CardContent>
        </Card>
        <div className="relative h-80 md:h-96">
           <Image
              src="https://placehold.co/600x450.png"
              alt="Person writing or thinking"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
              data-ai-hint="writing creativity"
            />
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
          {allPosts.length > 3 && (
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
    </div>
  );
}
