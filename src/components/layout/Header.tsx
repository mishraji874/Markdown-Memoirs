"use client";

import Link from 'next/link';
import { Menu, X, Feather } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/about', label: 'About Me' },
];

export default function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="bg-background/80 backdrop-blur-md shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
            <Feather className="w-7 h-7" />
            Markdown Memoirs
          </Link>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-2">
              {navLinks.map(link => <div key={link.href} className="h-10 w-20 bg-muted/50 rounded-md animate-pulse" />)}
            </div>
            <div className="h-10 w-10 bg-muted/50 rounded-md animate-pulse" /> {/* Placeholder for ThemeToggle */}
            <div className="md:hidden">
              <div className="h-10 w-10 bg-muted/50 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </header>
    );
  }


  return (
    <header className="bg-background/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
          <Feather className="w-7 h-7" />
          Markdown Memoirs
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex space-x-2">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild
                className={cn(
                  "text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors",
                  pathname === link.href && "text-primary font-semibold bg-primary/10"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="flex items-center gap-2 text-xl font-headline font-bold text-primary">
                       <Feather className="w-6 h-6" />
                       Markdown Memoirs
                    </Link>
                    <SheetClose asChild>
                       <Button variant="ghost" size="icon" aria-label="Close menu">
                          <X className="h-5 w-5" />
                       </Button>
                    </SheetClose>
                  </div>
                  {navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 transition-colors",
                          pathname === link.href ? "text-primary bg-primary/10" : "text-foreground/80"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
