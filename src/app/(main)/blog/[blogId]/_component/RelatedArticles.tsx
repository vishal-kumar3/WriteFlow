import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';
import { BlogWithTagsAndUser } from '@/types/BlogType';
import Link from 'next/link';
import { ShowBadges } from '@/components/UserProfile/Tabs/UserFlows';
import { cn } from '@/lib/utils';

const ArticlePreview = ({ id, title, description, author, thumbnail, tags }: RelatedArticles) => (
  <Card className="overflow-hidden h-full">
    <Link href={`/user/${id}`}>
      <CardFooter className="flex items-center space-x-2 px-4 py-1">
        <Avatar className="h-8 w-8">
          <AvatarImage src={author.avatar!} />
          <AvatarFallback>{author.name}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{author.name}</span>
      </CardFooter>
    </Link>
    <Link href={`/blog/${id}`}>
      <CardHeader className="p-0">
        <Image src={thumbnail!} width={400} height={160} alt={title!} className="w-full h-40 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg line-clamp-1 font-semibold">{title}</h3>
        <ShowBadges badgeArray={tags?.map((tag) => tag) || []} />
        <p className={cn("text-sm line-clamp-3 text-gray-600 dark:text-gray-300", (tags && tags?.length > 0) && "line-clamp-2")}>{description}</p>
      </CardContent>
    </Link>
  </Card>
);

const ArticleGrid = ({ articles }: { articles: RelatedArticles[] }) => (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <ArticlePreview key={index} {...article} />
      ))}
    </div>
  </div>
);

type RelatedArticles = {
  id: string | undefined;
  title: string | undefined | null;
  description: string | undefined | null;
  author: {
    name: string | undefined | null;
    avatar: string | undefined | null;
    id: string | undefined | null;
  };
  thumbnail: string | undefined | null;
  tags: string[] | undefined;
}

export default function MoreArticles({ relatedArticles }: { relatedArticles: BlogWithTagsAndUser[]}) {

  const articles: RelatedArticles[] = relatedArticles.map(article => ({
    id: article?.id,
    title: article?.title,
    description: article?.description,
    author: {
      name: article?.user?.name,
      avatar: article?.user?.image,
      id: article?.user?.id
    },
    thumbnail: article?.thumbnail,
    tags: article?.tags?.map(tag => tag.tag)
  }));

  console.log(relatedArticles);

  return <ArticleGrid articles={articles} />;
}
