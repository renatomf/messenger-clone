import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/get-current-user";
import prismadb from "@/app/libs/prismadb";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingConversation = await prismadb.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedConversation = await prismadb.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id]
        },
      },
    });

       if (!existingConversation) {
       return new NextResponse("Invalid ID", { status: 400 });
    }

    return NextResponse.json(deletedConversation)
  } catch (error) {
    return NextResponse.json(null);
  }
}