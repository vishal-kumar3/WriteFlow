import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';

const ArticlePreview = ({ title, description, author, image }) => (
  <Card className="overflow-hidden">
    <CardHeader className="p-0">
      <Image src={image} width={400} height={160} alt={title} className="w-full h-40 object-cover" />
    </CardHeader>
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </CardContent>
    <CardFooter className="flex items-center space-x-2 p-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={author.avatar} />
        <AvatarFallback>{author.name[0]}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{author.name}</span>
    </CardFooter>
  </Card>
);

const ArticleGrid = ({ articles }) => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-6">More Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticlePreview key={index} {...article} />
      ))}
    </div>
  </div>
);

export default function MoreArticles() {
  const articles = [
    {
      title: "Understanding Binary Search",
      description: "An in-depth look at implementing binary search in various programming languages.",
      author: { name: "Jane Doe", avatar: "/avatars/jane.jpg" },
      image: "/images/binary-search.jpg"
    },
    {
      title: "Automating Social Media Content",
      description: "Learn how to use modern tools to streamline your social media workflow.",
      author: { name: "John Smith", avatar: "/avatars/john.jpg" },
      image: "/images/automation.jpg"
    },
    {
      title: "Advanced Coding Challenges",
      description: "Tackle complex coding problems and improve your problem-solving skills.",
      author: { name: "Alice Johnson", avatar: "/avatars/alice.jpg" },
      image: "/images/coding-challenge.jpg"
    }
  ];

  return <ArticleGrid articles={articles} />;
}
