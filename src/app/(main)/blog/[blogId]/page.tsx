import prisma from "@/prisma";

type props = {
  params: {
    blogId: string
  }
}

const PublishedBlog = async({params}: props) => {
  const publishedId = params.blogId;

  const blog = await prisma.blog.findFirst({
    where: {
      AND: [
        { id: publishedId },
        { isPublished: true}
      ]
    },
    include: {
      //TODO: include user but not password thing!!!
      user: true
    }
  })

  if(!blog) return <div>Blog not found</div>

  return (
    <div>
      Title: {blog?.title}
    </div>
  )
}

export default PublishedBlog
