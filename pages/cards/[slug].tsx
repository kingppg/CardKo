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

      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6">
          
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center space-y-2">
            <Image
              src={card.image}
              alt={card.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-blue-200"
            />
            <h1 className="text-2xl font-bold text-gray-800">{card.name}</h1>
            <p className="text-sm text-gray-500">{card.title}</p>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-left">
              {card.contact.phone && (
                <div>
                  <span className="font-medium text-gray-600">Phone: </span>
                  <a href={`tel:${card.contact.phone}`} className="text-blue-600 hover:underline">
                    {card.contact.phone}
                  </a>
                </div>
              )}
              {card.contact.email && (
                <div>
                  <span className="font-medium text-gray-600">Email: </span>
                  <a href={`mailto:${card.contact.email}`} className="text-blue-600 hover:underline">
                    {card.contact.email}
                  </a>
                </div>
              )}
              {card.contact.whatsapp && (
                <div>
                  <span className="font-medium text-gray-600">WhatsApp: </span>
                  <a
                    href={`https://wa.me/${card.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {card.contact.whatsapp}
                  </a>
                </div>
              )}
              {card.contact.website && (
                <div>
                  <span className="font-medium text-gray-600">Website: </span>
                  <a
                    href={card.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    {card.contact.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Socials</h2>
            <div className="flex space-x-4 text-sm">
              {card.socials.facebook && (
                <a
                  href={card.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Facebook
                </a>
              )}
              {card.socials.youtube && (
                <a
                  href={card.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:underline"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>

          {/* QR Code Section */}
          {card.qr && (
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Scan this QR code</p>
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
