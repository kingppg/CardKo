import { useRouter } from 'next/router';
import cards from '../../data/cards.json';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { useState } from 'react';

const cardWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#f9f9f9',
  fontFamily: 'Segoe UI, sans-serif',
};

const cardStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
};

const nameStyle = {
  fontSize: '1.5rem',
  marginTop: '1rem',
  textAlign: 'center' as const,
};

const titleStyle = {
  color: '#666',
  textAlign: 'center' as const,
};

const contactSectionStyle = {
  marginTop: '1.5rem',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '0.8rem',
  alignItems: 'flex-start' as const,
  textAlign: 'left' as const,
  width: '100%',
};

const baseLinkStyle = {
  textDecoration: 'none',
  color: '#0070f3',
  fontWeight: 500,
  border: '1px solid #eaeaea',
  padding: '0.6rem 1rem',
  borderRadius: '12px',
  backgroundColor: '#f0f0f0',
  display: 'block',
  width: '100%',
  transition: 'all 0.2s ease',
};

const qrSectionStyle = {
  marginTop: '2rem',
  textAlign: 'center' as const,
};

const qrContainerStyle = {
  display: 'inline-block',
  background: '#fff',
  padding: '10px',
  border: '2px solid #000',
  borderRadius: '12px',
};

// ✅ HoverableLink Component
function HoverableLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...baseLinkStyle,
        backgroundColor: hover ? '#e0e0e0' : baseLinkStyle.backgroundColor,
        fontWeight: hover ? 700 : baseLinkStyle.fontWeight,
      }}
    >
      {label}
    </a>
  );
}

// ✅ Main Component
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
        <div style={{ textAlign: 'center' }}>
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
          {card.contact.phone && (
            <HoverableLink href={`tel:${card.contact.phone}`} label="📞 Call" />
          )}
          {card.contact.email && (
            <HoverableLink href={`mailto:${card.contact.email}`} label="📧 Email" />
          )}
          {card.contact.whatsapp && (
            <HoverableLink
              href={`https://wa.me/${card.contact.whatsapp.replace('+', '')}`}
              label="💬 WhatsApp"
            />
          )}
          {card.socials.facebook && (
            <HoverableLink href={card.socials.facebook} label="📘 Facebook" />
          )}
          {card.socials.youtube && (
            <HoverableLink href={card.socials.youtube} label="▶️ YouTube" />
          )}
        </div>

        <div style={qrSectionStyle}>
          <h3 style={{ marginBottom: '0.5rem' }}>Scan this QR code:</h3>
          <div style={qrContainerStyle}>
            <QRCode
              value={`https://card-ko.vercel.app/cards/${slug}`}
              size={160}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
