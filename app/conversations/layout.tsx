import getConversations from "../actions/get-conversations";
import getUsers from "../actions/get-users";
import Sidebar from "../components/sidebar/sidebar";
import ConversationList from "./_components/conversation-list";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    //@ts=expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  )
}