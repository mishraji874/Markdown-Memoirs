import Image from 'next/image';
import { Github, Linkedin, Twitter, Globe, GraduationCap, Code, Cpu, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { Metadata } from 'next';
import image from '../image.jpg';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Aditya Mishra, Web3 Wizard & Full Stack Developer.',
};

export default function AboutPage() {
  const skills = ['Solidity', 'React', 'Javascript', 'TypeScript', 'Node.js', 'Smart Contracts', 'Web3.js', 'Blockchain', 'DApps', 'Vyper', 'Foundry', 'Moccasin', 'Hardhat', 'Truffle', 'SaaS', 'Git', 'Docker'];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <section className="text-center">
        <Image
          src={image}
          alt="Aditya Mishra's profile picture"
          width={200}
          height={200}
          className="rounded-full object-cover shadow-md mx-auto mb-10"
          data-ai-hint="developer programming"
        />
        <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary mb-3">
          Aditya Mishra
        </h1>
        <p className="text-xl text-foreground/80 mb-10">
          Web3 Wizard & Full Stack Developer
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
                <GraduationCap className="mr-3 h-6 w-6" /> Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-foreground/90">
              <div>
                <h3 className="font-semibold">Bachelor of Technology (B.Tech)</h3>
                <p className="text-sm">SRM Institute of Science and Technology</p>
                <p className="text-xs text-muted-foreground">2021 - 2025</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
                <Code className="mr-3 h-6 w-6" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-primary">About Me</CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-foreground/90 space-y-4 leading-relaxed prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-a:text-accent prose-strong:font-semibold prose-em:italic">
              <p>
                🚀 Hey there! I'm <a href="https://adityamishra-dev.vercel.app/" target="_blank" rel="noopener noreferrer"><strong>Aditya Mishra</strong></a> – <strong><em>a Web3 wizard and Full Stack Developer</em></strong> on a mission to revolutionize the digital world, one line of code at a time.
              </p>
              <p>
                💻 Whether it's crafting decentralized applications (dApps) that redefine trust or building scalable web platforms that just work, I thrive at the intersection of innovation and impact. With expertise spanning Solidity, blockchain security, and smart contract development, I've helped optimize transaction efficiency, boost user engagement, and slash operational costs for projects that matter.
              </p>
              <p>
                🎓 Currently pursuing my <em>Bachelor of Technology(B.Tech) from SRM Institute of Science and Technology</em>, I bring a unique blend of academic rigor and hands-on experience to the table. From sleek frontends to robust backends, cloud tech to DevOps pipelines, and cutting-edge blockchain tools – I've got the full stack covered.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline text-primary">
                <Cpu className="mr-3 h-6 w-6" /> What Drives Me
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-foreground/90 space-y-4 leading-relaxed prose prose-sm sm:prose-base max-w-none dark:prose-invert prose-a:text-accent prose-strong:font-semibold prose-em:italic">
              <p>
                ✨ <em>Decentralization</em> is my passion. I'm obsessed with the potential of decentralized systems to reshape industries, empower users, and create a fairer digital future. Through my work and this blog, I share insights, tutorials, and deep dives into the world of Web3, blockchain, and beyond – all while keeping things fun, approachable, and actionable.
              </p>
              <p>
                My goal is to bridge the gap between traditional web development and the decentralized future, making blockchain technology more accessible to developers and users alike. I believe in the power of open-source collaboration and community-driven innovation to create lasting positive change in the tech ecosystem.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <section className="text-center pt-8">
        <h2 className="text-3xl font-headline font-semibold text-primary mb-6 flex items-center justify-center">
          <Briefcase className="mr-3 h-7 w-7" /> Connect With Me
        </h2>
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="https://adityamishra-dev.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Portfolio Website">
              <Globe className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="https://github.com/mishraji874" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="https://www.linkedin.com/in/aditya-mishra-a76237226/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild className="border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-110">
            <Link href="https://x.com/mishraji874_eth" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
