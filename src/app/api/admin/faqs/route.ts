import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

const defaultFaqs = [
  { question: "What is the minimum CIBIL score required for a home loan?", answer: "Generally, a CIBIL score of 750 or above is considered excellent and helps secure the lowest interest rates starting from 7.99%. Borrowers with scores between 650-749 can still qualify under custom banking programs.", category: "Eligibility" },
  { question: "What documents are required for a home loan sanction?", answer: "Mandatory documents include PAN Card, Aadhaar Card, last 3 months salary slips, 6 months bank statements, Form 16 / 3-year ITR, and property title / agreement documents.", category: "Documentation" },
  { question: "Are there any foreclosure or pre-payment penalties?", answer: "As per RBI mandate, there are ZERO foreclosure or pre-payment charges on floating-rate home loans for individual borrowers across all partner banks.", category: "Repayment" },
  { question: "How long does digital sanction take?", answer: "With our automated pre-underwriting engine, in-principle digital sanction is issued within 24 to 48 hours after document verification.", category: "Process" },
]

export async function GET() {
  try {
    let faqs = await prisma.faq.findMany({
      orderBy: { createdAt: "asc" }
    })

    // If database is empty, seed defaults
    if (faqs.length === 0) {
      for (let i = 0; i < defaultFaqs.length; i++) {
        await prisma.faq.create({
          data: {
            question: defaultFaqs[i].question,
            answer: defaultFaqs[i].answer,
            category: defaultFaqs[i].category,
          }
        }).catch(() => null)
      }
      faqs = await prisma.faq.findMany({ orderBy: { createdAt: "asc" } })
    }

    return NextResponse.json({ faqs })
  } catch (error) {
    console.error("Failed to fetch FAQs:", error)
    return NextResponse.json({ faqs: defaultFaqs })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, question, answer, category } = body

    if (id && !id.startsWith("new-")) {
      const updated = await prisma.faq.update({
        where: { id },
        data: { question, answer, category: category || "General" }
      })
      return NextResponse.json({ faq: updated })
    } else {
      const created = await prisma.faq.create({
        data: {
          question,
          answer,
          category: category || "General",
        }
      })
      return NextResponse.json({ faq: created })
    }
  } catch (error) {
    console.error("Failed to save FAQ:", error)
    return NextResponse.json({ error: "Failed to save FAQ" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 })

    await prisma.faq.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete FAQ:", error)
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 })
  }
}
