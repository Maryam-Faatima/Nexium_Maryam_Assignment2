import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

const fakeDictionary: Record<string, string> = {
  blog: "بلاگ",
  summary: "خلاصہ",
  the: "یہ",
  is: "ہے",
  this: "یہ",
  a: "ایک",
  good: "اچھا",
  amazing: "شاندار",
  article: "مضمون",
  information: "معلومات",
}

function translateToUrdu(text: string): string {
  return text
    .split(' ')
    .map(word => fakeDictionary[word.toLowerCase()] || word)
    .join(' ')
}

function simulateSummary(fullText: string): string {
  const sentences = fullText.split('.')
  return sentences.slice(0, 2).join('.').trim() + '.'
}

export async function POST(req: Request) {
  const { url } = await req.json()

  try {
    const response = await fetch(url)
    const html = await response.text()

    const $ = cheerio.load(html)
    const paragraphs = $('p').map((i, el) => $(el).text()).get()
    const fullText = paragraphs.join(' ')

    const summary = simulateSummary(fullText)
    const urdu = translateToUrdu(summary)

    return NextResponse.json({ summary, urdu })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch or parse blog.' }, { status: 500 })
  }
}
