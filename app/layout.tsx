import Link from 'next/link';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SignedOut>
            <SignInButton>
              <button className="bg-sky-500 hover:bg-sky-300 rounded py-1 px-1 ml-2 mt-2">
                {" "}
                Sign In{" "}
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <Link className=' font-serif ml-4 ' href="/">SEP Planner Application</Link>
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}