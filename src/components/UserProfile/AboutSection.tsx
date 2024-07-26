import React from 'react'
import { Badge } from '../ui/badge'
import { Check, Cross, Plus, X } from 'lucide-react'
import { Button } from '../ui/button'
import { FcCancel } from 'react-icons/fc'
import { Dialog } from '../ui/dialog'
import { DialogPopup } from './DialogPopup'

type props = {}

const AboutSection = (props: props) => {
  return (
    <>
      <div className='flex gap-6'>
        <p className=' text-3xl font-semibold'>Vishal Kumar</p>
        <div className='flex gap-2 items-center'>
          {/* //TODO: Dialog Popup to choose badges */}
          <Badge>VishaL</Badge>
          <Badge>VishaL</Badge>
          <Badge>VishaL</Badge>
          <Plus size={20} className='rounded-full hover:bg-black/50 hover:cursor-pointer' />
        </div>
      </div>
      <div className='pl-4 text-black/70 '>
        <p>Software Engineer</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore delectus sunt expedita quaerat cum quia molestiae, fugiat rerum id reprehenderit!
        </p>
      </div>
      <div className='flex gap-3 items-center mt-3'>
        {/* // TODO: Costimize the DialogPopup component */}
        <DialogPopup></DialogPopup>
        <Button variant="outline">Settings</Button>
      </div>
    </>
  )
}

export default AboutSection