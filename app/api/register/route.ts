import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

import prismadb from '@/app/libs/prismadb';

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      email, 
      name, 
      password
    } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTER_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
};
