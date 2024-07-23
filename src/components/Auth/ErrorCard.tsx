import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"



type props = {}

const ErrorCard = (props: props) => {
  return (
    <Card className="w-[400px] shadow-md flex flex-col items-center">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>Login</CardTitle>
        <CardDescription>Oops! Something went wrong!</CardDescription>
      </CardHeader>
        <ExclamationTriangleIcon className="text-destructive" />
      <CardFooter>
        <Link href="/auth/login"><Button className="w-full bg-white text-black hover:bg-slate-50">Go Back To Login</Button></Link>
      </CardFooter>
    </Card>
  )
}

export default ErrorCard