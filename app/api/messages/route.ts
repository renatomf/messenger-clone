import getCurrentUser from "@/app/actions/get-current-user";
import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb" 

export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      message,
      image,
      conversationId
    } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

  const newMessage = await prismadb.message.create({
    data: {
      body: message,
      image: image,
      conversation: {
        connect: {
          id: conversationId
        }
      },
      sender: {
        connect: {
          id: currentUser.id
        }
      },
      seen: {
        connect: {
          id: currentUser.id
        }
      }
    },
    include: {
      seen: true,
      sender: true
    }
  });

  const updatedConversation = await prismadb.conversation.update({
    where: {
      id: conversationId
    },
    data: {
      lastMessageAt: new Date(),
      messages: {
        connect: {
          id: newMessage.id
        }
      }
    },
    include: {
      users: true,
      messages: {
        include: {
          seen: true
        }
      }
    }
  });

  return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Internal Error", { status: 500 });
  }
}