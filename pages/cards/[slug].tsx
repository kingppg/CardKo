import { useRouter } from 'next/router';
import cards from '../../data/cards.json';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import React from 'react';

const cardWrapperStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#f9f9f9',
  fontFamily: 'Segoe UI, sans-serif',
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
};

const nameStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  marginTop: '1rem',
  textAlign: 'center' as const,
};

const titleStyle: React.CSSProperties = {
  color: '#666',
  textAlign: 'center' as const,
};

const contactSectionStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  alignItems: 'flex-start',
  textAlign: 'left' as const,
  width: '100%',
};

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
  color: '#0070f3',
  fontWeight: 500,
  border: '1px solid #eaeaea',
  padding: '0.6rem 1rem',
  borderRadius: '12px',
  backgroundColor: '#f0f0f0',
  display: 'block',
  width: '100%',
};

const qrSectionStyle: React.CSSProperties = {
  marginTop: '2rem',
  textAlign: 'center' as const,
};

const qrContainerStyle: React.CSSProperties = {
  display: 'inline-block',
  background: '#fff',
  padding: '10px',
  border: '2px solid #000',
  borderRadius: '12px',
};

export default function CardPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!router.isReady) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  const card = cards.find((c) => c.slug === slug);

  if (!card) {
    return <div style={{ padding: '2rem' }}>Card not found</div>;
  }

  return (
    <div style={cardWrapperStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: 'center' as const }}>
          <Image
            src={card.image}
            alt={card.name}
            width={120}
            height={120}
            style={{ borderRadius: '50%' }}
          />
        </div>
        <h1 style={nameStyle}>{card.name}</h1>
        <p style={titleStyle}>{card.title}</p>

        <div style={contactSectionStyle}>
          <a href={`tel:${card.phone}`} style={linkStyle}>
            📞 Call
          </a>
          <a href={`mailto:${card.email}`} style={linkStyle}>
            📧 Email
          </a>
          <a
            href={`https://wa.me/${card.whatsapp.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            💬 WhatsApp
          </a>
          <a href={card.facebook} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            📘 Facebook
          </a>
          <a href={card.youtube} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            ▶️ YouTube
          </a>
        </div>

        <div style={qrSectionStyle}>
          <h3 style={{ marginBottom: '0.5rem' }}>Scan this QR code:</h3>
          <div style={qrContainerStyle}>
            <QRCode value={`https://card-ko.vercel.app/cards/${slug}`} size={160} />
          </div>
        </div>
      </div>
    </div>
  );
}
