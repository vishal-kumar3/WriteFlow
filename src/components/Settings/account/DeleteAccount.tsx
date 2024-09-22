"use client"

import { deleteAccount } from "@/actions/settings.action"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

type props = {}

const DeleteAccount = (props: props) => {
  return (
    <form action={async(formData: FormData) => {
      const password = formData.get("password") as string
      const confirm = formData.get("confirm") as string
      const {error, success} = await deleteAccount(password, confirm === "on");

      if(error) {
        toast.error(error)
      } else {
        toast.success(success)
      }
    }} className="mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Delete Your Account</h1>
        <p className="text-gray-500 dark:text-gray-400">
          We&apos; re sorry to see you go. Before you delete your account, please confirm that you want to proceed.
        </p>
      </div>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Enter your password</Label>
          <Input id="password" name="password" min={6} type="password" placeholder="Enter your password" required />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="confirm" name="confirm" required />
          <Label htmlFor="confirm">
            I understand that deleting my account is permanent and I will lose all my data.
          </Label>
        </div>
      </CardContent>
      <CardFooter className="py-0">
        <Button variant="destructive" type="submit" className="w-full">
          Delete Account
        </Button>
      </CardFooter>
    </form>
  )
}

export default DeleteAccount
