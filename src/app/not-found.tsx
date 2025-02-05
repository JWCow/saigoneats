import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">Could not find requested resource</p>
      <Link
        href="/"
        className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
      >
        Return Home
      </Link>
    </div>
  )
} 