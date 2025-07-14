// pages/cards/[slug].tsx

import { useRouter } from 'next/router';
import Image from 'next/image';
import QRCode from 'react-qr-code';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const cards = require('../../data/cards.json');
  const card = cards.find((c) => c.slug === slug);

  if (!card) {
    return { notFound: true };
  }

  return {
    props: {
      card,
      slug,
    },
  };
}

export default function CardPage({ card }) {
  const router = useRouter();

  if (!card) return <div>Card not found</div>;

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    background: '#f0f2f5',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const cardStyle = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '24px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
  };

  const imageStyle = {
    borderRadius: '50%',
    boxShadow: '0 0 0 4px #fff',
  };

  const nameStyle = {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginTop: '1rem',
  };

  const titleStyle = {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '1.5rem',
  };

  const sectionTitle = {
    fontSize: '1.1rem',
    fontWeight: 500,
    marginTop: '2rem',
    marginBottom: '0.8rem',
    textAlign: 'left',
  };

  const contactStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
    alignItems: 'stretch',
    width: '100%',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#0070f3',
    fontWeight: '500',
    border: '1px solid #eaeaea',
    padding: '0.7rem 1rem',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  };

  const qrBox = {
    marginTop: '2rem',
    padding: '10px',
    border: '2px solid #000',
    borderRadius: '12px',
    display: 'inline-block',
    background: '#fff',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <Image src={card.image} alt={card.name} width={120} height={120} style={imageStyle} />
        <h1 style={nameStyle}>{card.name}</h1>
        <p style={titleStyle}>{card.title}</p>

        <h2 style={sectionTitle}>📞 Contact</h2>
        <div style={contactStyle}>
          <a href={`tel:${card.phone}`} style={linkStyle}>Call</a>
          <a href={`mailto:${card.email}`} style={linkStyle}>Email</a>
        </div>

        <h2 style={sectionTitle}>🌐 Socials</h2>
        <div style={contactStyle}>
          <a href={`https://wa.me/${card.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>WhatsApp</a>
          <a href={card.facebook} target="_blank" rel="noopener noreferrer" style={linkStyle}>Facebook</a>
          <a href={card.youtube} target="_blank" rel="noopener noreferrer" style={linkStyle}>YouTube</a>
        </div>

        <h2 style={sectionTitle}>🔳 QR Code</h2>
        <div style={qrBox}>
          <QRCode value={`https://card-ko.vercel.app/cards/${router.query.slug}`} size={160} />
        </div>
      </div>
    </div>
  );
}
