import prisma from '@/prisma'
import LinkButton from './LinkButton'

const Followings = async({userId}: {userId: any}) => {

  const followingUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return (
    <LinkButton imageUrl={followingUser?.image!} link={`/user/${followingUser?.id}`}>{followingUser?.name}</LinkButton>
  )
}

export default Followings
