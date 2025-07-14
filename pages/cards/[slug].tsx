import { GetServerSideProps } from 'next';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import { ParsedUrlQuery } from 'querystring';
import { InferGetServerSidePropsType } from 'next';

type CardData = {
  slug: string;
  name: string;
  title?: string;
  image: string;
  contact?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  socials?: {
    facebook?: string;
    youtube?: string;
  };
  qr?: string;
};

export default function CardPage({
  card,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6">
        
        {/* Profile - Centered */}
        <div className="flex flex-col items-center text-center">
          <Image
            src={card.image}
            alt={card.name}
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-200 shadow"
          />
          <h1 className="text-2xl font-bold mt-4 text-gray-800">{card.name}</h1>
          {card.title && <p className="text-sm text-gray-500">{card.title}</p>}
        </div>

        {/* Contact Section */}
        {(card.contact?.phone || card.contact?.email || card.contact?.whatsapp) && (
          <div>
            <h2 className="text-xs text-gray-400 uppercase mb-2">Contact</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {card.contact?.phone && (
                <li>
                  <a href={`tel:${card.contact.phone}`} className="hover:text-blue-600">📞 {card.contact.phone}</a>
                </li>
              )}
              {card.contact?.email && (
                <li>
                  <a href={`mailto:${card.contact.email}`} className="hover:text-blue-600">📧 {card.contact.email}</a>
                </li>
              )}
              {card.contact?.whatsapp && (
                <li>
                  <a href={`https://wa.me/${card.contact.whatsapp}`} className="hover:text-green-600" target="_blank" rel="noopener noreferrer">
                    💬 WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Socials Section */}
        {(card.socials?.facebook || card.socials?.youtube) && (
          <div>
            <h2 className="text-xs text-gray-400 uppercase mb-2">Socials</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {card.socials?.facebook && (
                <li>
                  <a href={card.socials.facebook} className="hover:text-blue-700" target="_blank" rel="noopener noreferrer">🌐 Facebook</a>
                </li>
              )}
              {card.socials?.youtube && (
                <li>
                  <a href={card.socials.youtube} className="hover:text-red-600" target="_blank" rel="noopener noreferrer">▶️ YouTube</a>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* QR Code */}
        {card.qr && (
          <div>
            <h2 className="text-xs text-gray-400 uppercase mb-2">Scan QR</h2>
            <div className="flex justify-center">
              <Image
                src={card.qr}
                alt="QR Code"
                width={160}
                height={160}
                className="rounded-md shadow"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const filePath = path.join(process.cwd(), 'data', 'cards.json');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const cards: CardData[] = JSON.parse(fileContents);

  const card = cards.find((c) => c.slug === slug);

  if (!card) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      card,
    },
  };
};
