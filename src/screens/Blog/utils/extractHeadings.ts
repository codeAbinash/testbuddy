import { Heading } from '../components/HeadingsList'

export const extractHeadings = (html: string): Heading[] => {
  const headingRegex = /<h([1-6])(?:\s+[^>])?>(.*?)<\/h\1>/g
  const headings: Heading[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      text: match[2]?.trim().replace(/<[^>]*>/g, '') || '',
      level: parseInt(match[1]!, 10),
    })
  }

  return headings
}
