import Link from "next/link"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import LessonActions from "@/components/lesson/LessonActions"

export default async function LessonPage({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterSlug: string }>
}) {
  const { bookSlug, chapterSlug } = await params

  const book = await prisma.book.findUnique({ where: { slug: bookSlug } })
  if (!book) notFound()

  const chapter = await prisma.chapter.findUnique({
    where: { bookId_slug: { bookId: book.id, slug: chapterSlug } },
    include: { progress: true },
  })
  if (!chapter) notFound()

  const lessonDone = chapter.progress[0]?.lessonCompleted ?? false

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href={`/books/${bookSlug}/chapters/${chapterSlug}`}
        className="text-sm text-[#6b7280] hover:text-[#1a4a8a] mb-4 inline-block"
      >
        ← Ch.{chapter.chapterNumber} · {chapter.title}
      </Link>

      <div className="mb-6">
        <div className="text-xs text-[#6b7280] mb-1">
          {book.shortTitle} · Chapter {chapter.chapterNumber}
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">{chapter.title}</h1>
        {chapter.partTitle && (
          <p className="text-sm text-[#6b7280] mt-1">{chapter.partTitle}</p>
        )}
        <p className="text-xs text-[#9ca3af] mt-1">~{chapter.estimatedMins} min read</p>
      </div>

      <article className="prose-lesson mb-10">
        <LessonContent content={chapter.lessonContent} />
      </article>

      <LessonActions
        chapterId={chapter.id}
        bookSlug={bookSlug}
        chapterSlug={chapterSlug}
        bookColor={book.coverColor}
        initialDone={lessonDone}
      />
    </main>
  )
}

// ── Server-side markdown renderer ─────────────────────────────────────────────

function LessonContent({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++}>{parseInline(line.slice(3))}</h2>)
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key++}>{parseInline(line.slice(4))}</h3>)
    } else if (line.startsWith("- ")) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2))
        i++
      }
      i-- // the outer while will i++
      elements.push(
        <ul key={key++}>
          {items.map((item, j) => (
            <li key={j}>{parseInline(item)}</li>
          ))}
        </ul>
      )
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""))
        i++
      }
      i--
      elements.push(
        <ol key={key++}>
          {items.map((item, j) => (
            <li key={j}>{parseInline(item)}</li>
          ))}
        </ol>
      )
    } else if (line.startsWith("|")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i])
        i++
      }
      i--
      const rows = tableLines.filter((l) => !/^\|[-| :]+\|$/.test(l))
      if (rows.length > 0) {
        const [header, ...body] = rows
        const headerCells = splitRow(header)
        const bodyRows = body.map(splitRow)
        elements.push(
          <table key={key++}>
            <thead>
              <tr>{headerCells.map((c, ci) => <th key={ci}>{c}</th>)}</tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr key={ri}>{row.map((c, ci) => <td key={ci}>{parseInline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        )
      }
    } else if (line.trim() !== "") {
      elements.push(<p key={key++}>{parseInline(line)}</p>)
    }

    i++
  }

  return <>{elements}</>
}

function splitRow(row: string) {
  return row
    .split("|")
    .slice(1, -1)
    .map((c) => c.trim())
}

function parseInline(text: string): React.ReactNode {
  // Handle **bold**, `code`, and $$formula$$
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\$\$[^$]+\$\$)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i}>{part.slice(1, -1)}</code>
        }
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <code key={i}>{part.slice(2, -2)}</code>
        }
        return part
      })}
    </>
  )
}
