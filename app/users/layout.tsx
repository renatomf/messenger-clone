import Sidebar from "../components/sidebar/sidebar";

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    //@ts=expect-error Server Component
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>

  )
}