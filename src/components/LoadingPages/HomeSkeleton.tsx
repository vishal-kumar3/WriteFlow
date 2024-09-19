import React from 'react'

type props = {}

const UserCardSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="size-[50px] bg-gray-300 rounded-full"></div>
      <div className="flex-1 py-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  )
}

const HomeSkeleton = (props: props) => {
  return (
    <div className='flex max-w-[800px] flex-col gap-2'>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="border-2 rounded-lg m-4 p-4 animate-pulse lg:m-10">
          <UserCardSkeleton />
          <div className="border-none w-full mt-4">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="w-full lg:mr-5">
                <div className="h-3 bg-gray-300 mt-2 line-clamp-1 text-transparent rounded w-3/4 mb-2 sm:w-1/2 lg:w-3/4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, obcaecati?</div>
                <div className="h-3 mx-2 line-clamp-4 text-transparent bg-gray-300 rounded w-full mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus at rem excepturi impedit corrupti eos molestias aliquid, nam deserunt sapiente.</div>
              </div>
              <div className="min-w-[200px] min-h-[120px] lg:min-w-[250px] lg:min-h-[150px] rounded-lg bg-gray-300 p-0 overflow-hidden mt-4 lg:mt-0">
                <div className="relative w-full h-full">
                  <div className="w-full h-full bg-gray-300"></div>
                </div>
              </div>
            </div>
            <div className="px-2 mt-4">
              <div className="h-3 bg-gray-300 rounded w-2/3 mb-2 sm:w-1/2 lg:w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2 sm:w-1/3 lg:w-1/2"></div>
            </div>
            <div className="flex px-2 justify-between items-center mt-4">
              <div className="h-3 bg-gray-300 rounded w-1/4 sm:w-1/6"></div>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-10 sm:w-12 bg-gray-300 rounded"></div>
                <div className="h-6 w-10 sm:w-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeSkeleton;
