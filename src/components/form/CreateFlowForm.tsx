"use client"
import { ForwardRefExoticComponent, RefAttributes, useActionState, useEffect } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { createFlow } from '@/actions/flow.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { SideButton } from '../Sidebar/LinkButton'
import { LucideProps, NotebookPen } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'

type props = {
  title?: string
  className?: string
  showIcon?: boolean
  mobile?: {
    mobile: boolean
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    label: string
  }
}

const CreateFlowForm = ({ title, className, showIcon, mobile }: props) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [state, createFlowAction, isPending] = useActionState(createFlow, null)

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false)
      router.push(`/blog/draft/${state?.id}`)
      toast.success('Flow created successfully')
    }
    if (state?.error) {
      setIsOpen(false)
      toast.error('Failed to create flow')
    }
  }, [isPending, state?.success, state?.error, state?.id, router])

  return (
    <div id='createFlowForm'>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {
            !mobile ? (
              <SideButton
                action={() => setIsOpen(true)}
                icon={<NotebookPen />}
                showIcon={showIcon}
                className={className}
              >
                {title}
              </SideButton>
            )
              :
              (
                <li key={mobile.label} className="relative flex-1 h-full">
                  <button
                    className="flex flex-col items-center justify-center h-full w-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10"
                    >
                      <mobile.icon
                        className={`w-6 h-6 text-gray-500 dark:text-gray-400`}
                      />
                    </motion.div>
                    <span
                      className={`text-xs mt-1 'text-gray-500 dark:text-gray-400`}
                    >
                      {mobile.label}
                    </span>
                  </button>
                </li>
              )
          }
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write Your Flow</DialogTitle>
          </DialogHeader>
          <form action={createFlowAction}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name='title'
                  placeholder="Enter title"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className='disabled:cursor-wait opacity-90 ' disabled={isPending} >
                {
                  isPending ? "Creating..." : "Create Flow"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateFlowForm
