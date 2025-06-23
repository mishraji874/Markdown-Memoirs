import { Globe, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>&copy; {currentYear} Made with ❤️ by Aditya Mishra | Markdown Memoirs | All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <Link href="https://adityamishra-dev.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio Website">
              <Globe className="h-6 w-6" />
            </Link>
          <Link href="https://www.github.com/mishraji874" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/aditya-mishra-a76237226" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="https://x.com/mishraji874_eth" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
