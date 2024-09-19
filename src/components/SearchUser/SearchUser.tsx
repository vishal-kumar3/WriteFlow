import { Input } from '../ui/input'
import { Button } from '../ui/button'
import SearchUserCard from '../Friends/SearchUserCard'
import { User } from '@/types/UserType'

type props = {
  data: User[]
}

const SearchUser = ({data}: props) => {
  return (
    <div className='w-full border-2 rounded-lg m-2 sm:m-10 p-2 md:p-4'>
      <form action="/user/search" method='GET' className='flex gap-2 mb-5'>
        <Input placeholder='Search User...' name='search' id='search' />
        <Button variant={'ghost'}>Search</Button>
      </form>

      <div className='flex flex-col gap-2'>
        {
          data?.map((user, key) => (
            <SearchUserCard userData={user} key={key} />
          ))
        }
      </div>
    </div>
  )
}

export default SearchUser
