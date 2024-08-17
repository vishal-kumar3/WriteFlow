import { getTopUsers } from '@/actions/user.action'
import RightSidebar from '@/components/RightSidebar/RightSidebar'
import SearchUser from '@/components/SearchUser/SearchUser'
import AuthUserOnly from '@/util/AuthUserOnly'

type Props = {
  searchParams: { search?: string }
}

const Page = async({ searchParams }: Props) => {
  const searchQuery = searchParams.search;

  const {error, data} = await getTopUsers(searchQuery)

  return (
    <div className='w-full mx-auto'>
      <div className='flex justify-center'>
        <SearchUser data={data!} />

        {/* @ts-expect-error Async Server Component */}
        <AuthUserOnly>
          {/* @ts-expect-error Async Server Component */}
          <RightSidebar />
        </AuthUserOnly>
      </div>
    </div>
  )
}

export default Page
