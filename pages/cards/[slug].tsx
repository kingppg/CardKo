// pages/cards/[slug].tsx

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

type Card = {
  slug: string
  name: string
  title?: string
  image: string
  contact?: {
    phone?: string
    email?: string
    whatsapp?: string
  }
  socials?: {
    facebook?: string
    youtube?: string
  }
  qr?: string
}

export default function CardPage({ card }: { card: Card }) {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        {/* Top Section - Centered */}
        <div className="flex flex-col items-center justify-center p-6 space-y-2 text-center border-b border-gray-200">
          <Image
            src={card.image}
            alt={card.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-300 shadow-sm"
          />
          <h1 className="text-2xl font-semibold text-gray-800">{card.name}</h1>
          {card.title && <p className="text-sm text-gray-500">{card.title}</p>}
        </div>

        {/* Bottom Section - Left-Aligned */}
        <div className="p-6 space-y-6 text-sm text-gray-700 text-left">
          {/* Contact */}
          {(card.contact?.phone || card.contact?.email || card.contact?.whatsapp) && (
            <div>
              <h2 className="text-xs text-gray-400 uppercase mb-1">Contact</h2>
              <div className="space-y-1">
                {card.contact?.phone && (
                  <a href={`tel:${card.contact.phone}`} className="block hover:text-blue-600">
                    📞 {card.contact.phone}
                  </a>
                )}
                {card.contact?.email && (
                  <a href={`mailto:${card.contact.email}`} className="block hover:text-blue-600">
                    📧 {card.contact.email}
                  </a>
                )}
                {card.contact?.whatsapp && (
                  <a
                    href={`https://wa.me/${card.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-green-600"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Socials */}
          {(card.socials?.facebook || card.socials?.youtube) && (
            <div>
              <h2 className="text-xs text-gray-400 uppercase mb-1">Socials</h2>
              <div className="space-y-1">
                {card.socials?.facebook && (
                  <a
                    href={card.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-blue-700"
                  >
                    🌐 Facebook
                  </a>
                )}
                {card.socials?.youtube && (
                  <a
                    href={card.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-red-600"
                  >
                    ▶️ YouTube
                  </a>
                )}
              </div>
            </div>
          )}

          {/* QR Code */}
          {card.qr && (
            <div>
              <h2 className="text-xs text-gray-400 uppercase mb-1">QR Code</h2>
              <Image
                src={card.qr}
                alt="QR Code"
                width={160}
                height={160}
                className="rounded-md shadow mx-auto"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }

  const filePath = path.join(process.cwd(), 'data', 'cards.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const cards: Card[] = JSON.parse(fileContents)

  const card = cards.find((c) => c.slug === slug)

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
