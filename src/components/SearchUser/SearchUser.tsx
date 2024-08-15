"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { getTopUsers } from '@/actions/user.action'
import SearchUserCard from '../Friends/SearchUserCard'
import { useSearchParams } from 'next/navigation'
import { User } from '@/types/UserType'

type props = {
}

const SearchUser = (props: props) => {

  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    getTopUsers(searchQuery).then(({error, data}) => {
      if(error) return console.error(error)
      setData(data || [])
    })
  }, [searchQuery])
  // const {error, data} =  getTopUsers(searchQuery)
  // if(error) return <div>{error}</div>
  // console.log("data:- ", data)

  return (
    <div className='w-full border-2 rounded-lg m-10 p-4'>
      <form action="/user/search" method='GET' className='flex gap-2 mb-5'>
        <Input placeholder='Search User...' name='search' id='search' />
        <Button variant={'ghost'}>Search</Button>
      </form>

      {/* Use suspense here */}
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
