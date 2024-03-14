import getConversations from "../actions/get-conversations";
import Sidebar from "../components/sidebar/sidebar";
import ConversationList from "./_components/conversation-list";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();

  return (
    //@ts=expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  )
}