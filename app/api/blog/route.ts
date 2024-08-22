import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;

// ブログの全記事取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const posts = await prismadb.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};

//ブログ投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    const post = await prismadb.post.create({ data: { title, description } });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
};
