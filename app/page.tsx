import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { Redirect } from "next";

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
        <h1 className=" text-3xl "> This is going to link to the dashboard </h1>
      </SignedIn>
    </ClerkProvider>
  );
}
