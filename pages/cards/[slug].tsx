import { GetServerSideProps } from 'next';
import Image from 'next/image';
import path from 'path';
import fs from 'fs';
import Head from 'next/head';

export default function CardPage({ card }: { card: any }) {
  return (
    <>
      <Head>
        <title>{card.name} | CardKo</title>
      </Head>

      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-8">
          {/* Profile */}
          <div className="flex flex-col items-center text-center space-y-2">
            <Image
              src={card.image}
              alt={card.name}
              width={120}
              height={120}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-gray-800">{card.name}</h1>
            <p className="text-sm text-gray-500">{card.title}</p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">📞 Contact</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              {card.contact.phone && (
                <a
                  href={`tel:${card.contact.phone}`}
                  className="block text-blue-600 hover:underline"
                >
                  {card.contact.phone}
                </a>
              )}
              {card.contact.email && (
                <a
                  href={`mailto:${card.contact.email}`}
                  className="block text-blue-600 hover:underline"
                >
                  {card.contact.email}
                </a>
              )}
              {card.contact.whatsapp && (
                <a
                  href={`https://wa.me/${card.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-600 hover:underline"
                >
                  WhatsApp Chat
                </a>
              )}
            </div>
          </div>

          {/* Socials */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">🌐 Socials</h2>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              {card.socials.facebook && (
                <a
                  href={card.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  Facebook
                </a>
              )}
              {card.socials.youtube && (
                <a
                  href={card.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-red-600 hover:underline"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>

          {/* QR Code */}
          {card.qr && (
            <div className="pt-6 border-t border-gray-200 text-center">
              <h3 className="text-sm text-gray-500 mb-2">Scan QR to share card</h3>
              <Image
                src={card.qr}
                alt="QR Code"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };
  const filePath = path.join(process.cwd(), 'data', 'cards.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const cards = JSON.parse(jsonData);
  const card = cards.find((c: any) => c.slug === slug);

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
