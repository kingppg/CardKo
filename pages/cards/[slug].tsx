// pages/cards/[slug].tsx

import { useRouter } from 'next/router';
import Image from 'next/image';
import QRCode from 'react-qr-code';

export async function getServerSideProps(context) {
  const { slug } = context.params;  // Get the dynamic slug from the URL
  const cards = require('../../data/cards.json');  // Import your card data
  const card = cards.find((c) => c.slug === slug);  // Find the card matching the slug

  if (!card) {
    return {
      notFound: true,  // If no card is found, return a 404
    };
  }

  return {
    props: {
      card,  // Pass the card data as props to the component
      slug,
    },
  };
}

export default function CardPage({ card }) {
  const router = useRouter();

  if (!card) {
    return <div>Card not found</div>;  // In case no card is found
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', maxWidth: '400px', textAlign: 'center' }}>
        <Image src={card.image} alt={card.name} width={120} height={120} style={{ borderRadius: '50%' }} />
        <h1>{card.name}</h1>
        <p>{card.title}</p>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-start' }}>
          <a href={`tel:${card.phone}`} style={{ textDecoration: 'none', color: '#0070f3', fontWeight: '500', border: '1px solid #eaeaea', padding: '0.6rem 1rem', borderRadius: '12px', backgroundColor: '#f0f0f0', display: 'block', width: '100%' }}>📞 Call</a>
          <a href={`mailto:${card.email}`} style={{ textDecoration: 'none', color: '#0070f3', fontWeight: '500', border: '1px solid #eaeaea', padding: '0.6rem 1rem', borderRadius: '12px', backgroundColor: '#f0f0f0', display: 'block', width: '100%' }}>📧 Email</a>
          <a href={`https://wa.me/${card.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: '500', border: '1px solid #eaeaea', padding: '0.6rem 1rem', borderRadius: '12px', backgroundColor: '#f0f0f0', display: 'block', width: '100%' }}>💬 WhatsApp</a>
          <a href={card.facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: '500', border: '1px solid #eaeaea', padding: '0.6rem 1rem', borderRadius: '12px', backgroundColor: '#f0f0f0', display: 'block', width: '100%' }}>📘 Facebook</a>
          <a href={card.youtube} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#0070f3', fontWeight: '500', border: '1px solid #eaeaea', padding: '0.6rem 1rem', borderRadius: '12px', backgroundColor: '#f0f0f0', display: 'block', width: '100%' }}>▶️ YouTube</a>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Scan this QR code:</h3>
          <div style={{ display: 'inline-block', background: '#fff', padding: '10px', border: '2px solid #000', borderRadius: '12px' }}>
            <QRCode value={`http://localhost:3000/cards/${router.query.slug}`} size={160} />
          </div>
        </div>
      </div>
    </div>
  );
}
