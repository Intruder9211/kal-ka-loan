import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const articles = await prisma.article.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, articles });
  } catch (error: any) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    if (!session || (role !== "ADMIN" && role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, desc, content, category, author, imageUrl, readTime } = body;

    if (!title || !desc || !content) {
      return NextResponse.json({ error: "Title, excerpt, and content are required." }, { status: 400 });
    }

    // Generate URL friendly slug from title
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const todayDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    if (id && id !== "new") {
      // Update existing article
      const updated = await prisma.article.update({
        where: { id },
        data: {
          title,
          desc,
          content,
          category: category || "Blog",
          author: author || session.user.name || "Money Viora Editorial Desk",
          imageUrl: imageUrl || null,
          readTime: readTime || "5 min read",
          date: todayDate,
        }
      });
      return NextResponse.json({ success: true, article: updated });
    } else {
      // Create new article with collision-safe slug
      let finalSlug = baseSlug;
      let counter = 1;
      while (await prisma.article.findUnique({ where: { slug: finalSlug } })) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      const created = await prisma.article.create({
        data: {
          slug: finalSlug,
          title,
          desc,
          content,
          category: category || "Blog",
          author: author || session.user.name || "Money Viora Editorial Desk",
          imageUrl: imageUrl || null,
          readTime: readTime || "5 min read",
          date: todayDate,
        }
      });
      return NextResponse.json({ success: true, article: created }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Error creating/updating article:", error);
    return NextResponse.json({ error: error.message || "Failed to save article" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    const role = session?.user?.role;
    if (!session || (role !== "ADMIN" && role !== "SUPER_ADMIN")) {
      return NextResponse.json({ error: "Unauthorized. Admin privileges required." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Article ID is required." }, { status: 400 });
    }

    await prisma.article.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Article deleted successfully." });
  } catch (error: any) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ error: error.message || "Failed to delete article" }, { status: 500 });
  }
}
