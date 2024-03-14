import prismadb from "@/app/libs/prismadb";
import getCurrentUser from "./get-current-user";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const conversations = await prismadb.conversation.findMany({
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      orderBy: {
        lastMessageAt: "desc"
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true
          }
        }
      }
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
}

export default getConversations;