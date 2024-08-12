import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CurrentUserOnly from '@/util/CurrentUserOnly'


type Props = {
  UserFlows: React.ReactNode
  History?: React.ReactNode
  LikedFlows?: React.ReactNode
  Bookmarks?: React.ReactNode
  DraftFlows?: React.ReactNode
  id: string
}

type UserTabContentProps = {
  value: string
  children: React.ReactNode
}

export const UserTabContent = ({ value, children }: UserTabContentProps) => {
  return (
    <TabsContent className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 content-center" value={value}>{children}</TabsContent>
  )
}

const TabSwitcher = ({id, UserFlows, History, LikedFlows, Bookmarks, DraftFlows}: Props) => {
  return (
    <Tabs className='' defaultValue='UserFlows'>
      <TabsList className='w-full mx-auto space-x-8 bg-black/5 dark:bg-black/20 py-6'>
                <TabsTrigger className='text-lg' value='UserFlows'>Flows</TabsTrigger>
                {/* @ts-expect-error Async Server Component */}
                <CurrentUserOnly userId={id}>
                  <TabsTrigger className='text-lg' value='DraftFlows'>Draft Flows</TabsTrigger>
                  <TabsTrigger className='text-lg' value='LikedFlows'>Liked Flows</TabsTrigger>
                  <TabsTrigger className='text-lg' value='Bookmarks'>Bookmarks</TabsTrigger>
                  <TabsTrigger className='text-lg' value='History'>History</TabsTrigger>
                </CurrentUserOnly>
            </TabsList>

            <div>
              <UserTabContent value='UserFlows'>{UserFlows}</UserTabContent>
              {/* @ts-expect-error Async Server Component */}
              <CurrentUserOnly userId={id}>
                <UserTabContent value='DraftFlows'>{DraftFlows}</UserTabContent>
                <UserTabContent value='History'>{History}</UserTabContent>
                <UserTabContent value='LikedFlows'>{LikedFlows}</UserTabContent>
                <UserTabContent value='Bookmarks'>{Bookmarks}</UserTabContent>
              </CurrentUserOnly>
            </div>
    </Tabs>
  )
}

export default TabSwitcher
