export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-primary">404 - Page Not Found</h1>
            <div className="mt-4 flex justify-center flex-col items-center">
                <p className="text-lg">The page you are looking for does not exist.</p>
                <a href="/" className="text-blue-500 hover:underline">Go back to home</a>
            </div>
        </div>
    )
}