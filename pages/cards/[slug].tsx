// pages/cards/[slug].tsx

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'

export default function CardPage({ card }: { card: any }) {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-6">
        {/* Profile Image */}
        <Image
          src={card.image}
          alt={card.name}
          width={120}
          height={120}
          className="rounded-full mx-auto border-4 border-gray-200"
        />

        {/* Name & Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{card.name}</h1>
          <p className="text-sm text-gray-500">{card.title}</p>
        </div>

        {/* Contact Section */}
        <div className="space-y-2">
          <h2 className="text-xs text-gray-400 uppercase">Contact</h2>
          {card.contact?.phone && (
            <a href={`tel:${card.contact.phone}`} className="block text-blue-600 hover:underline">
              📞 {card.contact.phone}
            </a>
          )}
          {card.contact?.email && (
            <a href={`mailto:${card.contact.email}`} className="block text-blue-600 hover:underline">
              📧 {card.contact.email}
            </a>
          )}
          {card.contact?.whatsapp && (
            <a
              href={`https://wa.me/${card.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-green-600 hover:underline"
            >
              💬 WhatsApp
            </a>
          )}
        </div>

        {/* Social Section */}
        <div className="space-y-2">
          <h2 className="text-xs text-gray-400 uppercase">Socials</h2>
          {card.socials?.facebook && (
            <a
              href={card.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-700 hover:underline"
            >
              🌐 Facebook
            </a>
          )}
          {card.socials?.youtube && (
            <a
              href={card.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-red-600 hover:underline"
            >
              ▶️ YouTube
            </a>
          )}
        </div>

        {/* QR Code */}
        {card.qr && (
          <div>
            <h2 className="text-xs text-gray-400 uppercase mb-2">Scan QR</h2>
            <Image
              src={card.qr}
              alt="QR Code"
              width={160}
              height={160}
              className="mx-auto rounded-md shadow"
            />
          </div>
        )}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }

  const filePath = path.join(process.cwd(), 'data', 'cards.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const cards
