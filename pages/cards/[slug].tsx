import { GetServerSideProps } from 'next'
import path from 'path'
import fs from 'fs'

// ...rest of your component above

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }

  const filePath = path.join(process.cwd(), 'data', 'cards.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const cards = JSON.parse(fileContents)

  const card = cards.find((c: any) => c.slug === slug)

  if (!card) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      card,
    },
  }
}
