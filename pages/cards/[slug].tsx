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

      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6">

          {/* Profile Section - Centered */}
          <div className="flex flex-col items-center text-center">
            <Image
              src={card.image}
              alt={card.name}
              width={120}
              height={120}
              className="rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold">{card.name}</h1>
            <p className="text-sm text-gray-600">{card.title}</p>
          </div>

          {/* Contact Section - Left-aligned inside rounded box */}
          {(card.contact.phone || card.contact.email || card.contact.whatsapp) && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-left">
                {card.contact.phone && (
                  <a href={`tel:${card.contact.phone}`} className="block text-blue-600 hover:underline">
                    📞 {card.contact.phone}
                  </a>
                )}
                {card.contact.email && (
                  <a href={`mailto:${card.contact.email}`} className="block text-blue-600 hover:underline">
                    📧 {card.contact.email}
                  </a>
                )}
                {card.contact.whatsapp && (
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
            </div>
          )}

          {/* Social Links - Left-aligned inside rounded box */}
          {(card.socials.facebook || card.socials.youtube) && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Socials</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-left">
                {card.socials.facebook && (
                  <a
                    href={card.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    🌐 Facebook
                  </a>
                )}
                {card.socials.youtube && (
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
            </div>
          )}

          {/* QR Code - Centered */}
          {card.qr && (
            <div className="pt-4 border-t border-gray-200 text-center">
              <h2 className="text-sm text-gray-500 mb-2">Scan this QR code</h2>
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
