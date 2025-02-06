import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <SignIn />
    </div>
  )
}
