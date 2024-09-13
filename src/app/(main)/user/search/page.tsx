import { getTopUsers } from '@/actions/user.action'
import SearchUser from '@/components/SearchUser/SearchUser'

type Props = {
  searchParams: { search?: string }
}

const Page = async({ searchParams }: Props) => {
  const searchQuery = searchParams.search;

  const {error, data} = await getTopUsers(searchQuery)

  return (
    <div className='w-[75%] mx-auto'>
      <div className='flex justify-center'>
        <SearchUser data={data!} />
      </div>
    </div>
  )
}

export default Page
