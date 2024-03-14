import prismadb from "@/app/libs/prismadb";
import getSession from "./get-session";

const getUsers = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prismadb.user.findMany({
      where: {
        NOT: {
          email: session.user.email
        }
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
}

export default getUsers;