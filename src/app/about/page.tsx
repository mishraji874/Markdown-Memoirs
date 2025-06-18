import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me - Markdown Memoirs',
  description: 'Learn more about the author of Markdown Memoirs.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-12">
      <section className="text-center">
        <UserCircle className="mx-auto h-24 w-24 text-primary mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary mb-3">
          About the Author
        </h1>
        <p className="text-xl text-foreground/80">
          A little bit about who I am and what I do.
        </p>
      </section>

      <section className="bg-card p-8 rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <Image
              src="https://placehold.co/200x200.png"
              alt="Author's profile picture"
              width={200}
              height={200}
              className="rounded-full object-cover shadow-md"
              data-ai-hint="portrait person"
            />
          </div>
          <div className="text-lg text-foreground/90 space-y-4 leading-relaxed text-center md:text-left">
            <p>
              Hello! I'm the creator of Markdown Memoirs. I'm passionate about technology, writing, and sharing knowledge.
              This blog is a space where I explore various topics that fascinate me, from software development and web technologies
              to personal growth and creative pursuits.
            </p>
            <p>
              My goal is to create content that is not only informative but also engaging and thought-provoking. I believe in the power
              of storytelling and clear communication to make complex ideas accessible to everyone.
            </p>
            <p>
              When I'm not writing or coding, you can find me reading, exploring new hiking trails, or experimenting with new recipes in the kitchen.
              Thank you for visiting, and I hope you find something here that resonates with you!
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-headline font-semibold text-primary mb-6">Connect With Me</h2>
        <div className="flex justify-center space-x-6">
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="mailto:email@example.com" aria-label="Email">
              <Mail className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
