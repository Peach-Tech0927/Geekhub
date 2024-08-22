import prismadb from "@/app/lib/prisma";
import { NextResponse } from "next/server";

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
