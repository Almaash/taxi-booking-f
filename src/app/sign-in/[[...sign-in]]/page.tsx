import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="mt-20 max-sm:mt-10 bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <SignIn />
    </div>
  )
}
