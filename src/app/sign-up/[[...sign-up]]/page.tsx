import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="mt-12 bg-white flex items-center justify-center">
      <SignUp />
    </div>
  )
}
