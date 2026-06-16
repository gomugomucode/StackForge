import { signIn } from '@/auth'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to StackForge</h1>
        <p className="text-gray-600 mb-8">Sign in to access your learning dashboard</p>
        
        <div className="space-y-4">
          <form
            action={async () => {
              'use server'
              await signIn('github')
            }}
          >
            <button 
              className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue with GitHub
            </button>
          </form>

          <form
            action={async () => {
              'use server'
              await signIn('google')
            }}
          >
            <button 
              className="w-full py-2 px-4 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
