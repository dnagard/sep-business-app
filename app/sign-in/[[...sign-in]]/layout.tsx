export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <main> {children}</main>
        </div>

    );
}