import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import RedirectUser from "./(dashboards)/page";

export default function Home() {
  return (
    <ClerkProvider>
      <SignedOut>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Image src="/sep-logo.png" alt="SEP Logo" width={78} height={72} />
          <h1 className=" text-4xl font-bold mb-6 my-6 text-center">
            Welcome to the SEP Event Planning App!
          </h1>
        </div>
      </SignedOut>
      <SignedIn>
        <RedirectUser />
      </SignedIn>
    </ClerkProvider>
  );
}
