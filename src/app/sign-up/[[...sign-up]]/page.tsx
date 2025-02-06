import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <SignUp />
    </div>
  )
}
