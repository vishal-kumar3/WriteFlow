import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


type props = {
  Follower: React.ReactNode
  Following: React.ReactNode
}

const FriendTabSwitcher = ({Follower, Following}: props) => {
  return (
    <div className='w-full border-2 rounded-lg m-10 p-4'>
      <Tabs className='' defaultValue='Follower'>
        <TabsList className='w-full mx-auto space-x-8 bg-black/5 dark:bg-red-500/20 py-6'>
          <TabsTrigger className='text-lg' value='Follower'>Follower</TabsTrigger>
          <TabsTrigger className='text-lg' value='Following'>Following</TabsTrigger>
        </TabsList>

        <div>
          <TabsContent value='Follower'>{Follower}</TabsContent>
          <TabsContent value='Following'>{Following}</TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default FriendTabSwitcher
