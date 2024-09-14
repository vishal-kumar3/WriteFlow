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
    <TabsContent className="space-x-4 md:space-x-0 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr" value={value}>{children}</TabsContent>
  )
}

const TabSwitcher = ({id, UserFlows, History, LikedFlows, Bookmarks, DraftFlows}: Props) => {
  return (
    <Tabs defaultValue='UserFlows'>
      <div className="overflow-x-scroll">
        <TabsList className="w-max min-w-full flex space-x-2 sm:space-x-4 bg-black/5 dark:bg-black/20 p-2 rounded-lg">
          <TabsTrigger className="text-sm sm:text-base whitespace-nowrap" value="UserFlows">Flows</TabsTrigger>
          {/* @ts-expect-error Async Server Component */}
          <CurrentUserOnly userId={id}>
            <TabsTrigger className="text-sm sm:text-base whitespace-nowrap" value="DraftFlows">Draft Flows</TabsTrigger>
            <TabsTrigger className="text-sm sm:text-base whitespace-nowrap" value="LikedFlows">Liked Flows</TabsTrigger>
            <TabsTrigger className="text-sm sm:text-base whitespace-nowrap" value="Bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger className="text-sm sm:text-base whitespace-nowrap" value="History">History</TabsTrigger>
          </CurrentUserOnly>
        </TabsList>
      </div>
      <div className="mt-6">
        <UserTabContent value="UserFlows">{UserFlows}</UserTabContent>
        {/* @ts-expect-error Async Server Component */}
        <CurrentUserOnly userId={id}>
          <UserTabContent value="DraftFlows">{DraftFlows}</UserTabContent>
          <UserTabContent value="History">{History}</UserTabContent>
          <UserTabContent value="LikedFlows">{LikedFlows}</UserTabContent>
          <UserTabContent value="Bookmarks">{Bookmarks}</UserTabContent>
        </CurrentUserOnly>
      </div>
      </Tabs>
  )
}

export default TabSwitcher
