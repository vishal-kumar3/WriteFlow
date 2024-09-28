import { auth } from "@/auth"
import MobileBar from "./MobileBar";
import prisma from "@/prisma";

type props = {}

const MobileBarServer = async(props: props) => {

  const session = await auth();
  // if(!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      followers: {
        select: {
          followingId: true,
        }
      }
    }
  }).catch(() => null)

  return (
    <MobileBar user={user} />
  )
}

export default MobileBarServer
