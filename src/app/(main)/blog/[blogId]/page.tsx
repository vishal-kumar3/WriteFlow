import prisma from "@/prisma";

type props = {
  params: {
    blogId: string
  }
}

const PublishedBlog = async({params}: props) => {
  const publishedId = params.blogId;

  const blog = await prisma.blog.findUnique({
    where: {
      id: publishedId,
      isPublished: true
    },
    include: {
      //TODO: include user but not password thing!!!
      user: true
    }
  })
  console.log(blog)
  if(!blog) return <div>Blog not found</div>

  return (
    <div>
      Title: {blog?.title}
    </div>
  )
}

export default PublishedBlog
