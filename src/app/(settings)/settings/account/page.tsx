import DashboardHeader from '@/components/Dashboard/DashboardHeader'
import { onSubmitChangePassword, onSubmitPersonalInfo, onSubmitSetPassword } from '@/components/form/AccountOnSubmit'
import { PasswordSchema, PasswordUpdate, PersonalInfoSchema, PersonalInfoUpdate, SetPassword, setPasswordSchema } from '@/components/form/AccountSchema'
import DeleteAccount from '@/components/Settings/account/DeleteAccount'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { z } from 'zod'
import { auth } from '@/auth'
import prisma from '@/prisma'
import { FormWrapper } from '@/components/form/FormWrapper'
import { redirect } from 'next/navigation'

const AccountPage = async () => {
  const session = await auth()
  if(!session) return null

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    include: {
      about: true
    }
  }).catch(() => null)

  if(!user) return redirect('/settings/account')

  const defaultValue: z.infer<typeof PersonalInfoSchema> = {
    name: user?.name!,
    username: user?.username!,
    email: user?.email!,
    career: user?.about?.career!,
    bio: user?.about?.bio!
  }

  return (
    <DashboardHeader
      title='My Account'
      description=''
    >
      <div className='space-y-10'>
        <FormWrapper
          title='Personal Information'
          schema={PersonalInfoSchema}
          defaultValues={defaultValue}
          fields={PersonalInfoUpdate}
          onSubmit={onSubmitPersonalInfo}
          buttonText='Update Profile'
        />
        <FormWrapper
          title='Password'
          schema={user.password ? PasswordSchema : setPasswordSchema}
          // defaultValues={defaultValue}
          fields={user.password ? PasswordUpdate : SetPassword}
          onSubmit={user.password ? onSubmitChangePassword : onSubmitSetPassword}
          buttonText={user.password ? 'Change Password' : 'Set Password'}
        />

        <div className=' max-w-full md:max-w-[70%] text-sm space-y-4'>
          <div className='text-xl font-semibold'># Delete Your Account Permanently</div>
          <hr />
          <div className='ml-8 text-md'>This is will delete your account permanently</div>
          <div className='ml-8'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='destructive' >Detele Your Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DeleteAccount />
                <DialogClose className='mx-6'>
                  <Button variant="outline" className="w-full ">Cancel</Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </DashboardHeader>
  )
}

export default AccountPage
