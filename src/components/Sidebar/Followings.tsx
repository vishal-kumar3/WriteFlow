import prisma from '@/prisma'
import LinkButton from './LinkButton'
import { DefaultAvatarImage } from '@/app/(main)/user/[userId]/page'

const Followings = async({userId}: {userId: any}) => {

  const followingUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return (
    <LinkButton imageUrl={followingUser?.image || DefaultAvatarImage} link={`/user/${followingUser?.id}`}>{followingUser?.name}</LinkButton>
  )
}

export default Followings
