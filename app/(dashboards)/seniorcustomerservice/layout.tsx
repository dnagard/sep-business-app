"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.username !== "seniorcustomerservice") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  return (
    <main>
      {!loading && children}
      {loading && <p>Loading...</p>}
    </main>
  );
}
