// pages/cards/[slug].tsx

import { GetServerSideProps } from 'next'
import Image from 'next/image'
import path from 'path'
import fs from 'fs'

export default function CardPage({ card }: { card: any }) {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-6 text-center">
        {/* Profile Image */}
        <Image
          src={card.image}
          alt={card.name}
          width={120}
          height={120}
          className="rounded-full mx-auto border-4 border-gray-200"
        />

        {/* Name and Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{card.name}</h1>
          {card.title && <p className="text-gray-500 text-sm">{card.title}</p>}
        </div>

        {/* Contact Section */}
        <div className="space-y-1">
          <h2 className="text-xs text-gray-400 uppercase tracking-wide">Contact</h2>
          {card.contact.phone && (
            <a
              href={`tel:${card.contact.phone}`}
              className="block text-blue-600 hover:underline"
            >
              📞 {card.contact.phone}
            </a>
          )}
          {card.contact.email && (
            <a
              href={`mailto:${card.contact.email}`}
              className="block text-blue-600 hover:underline"
            >
              📧 {card.contact.email}
            </a>
          )}
          {card.contact.whatsapp && (
            <a
              href={`https://wa.me/${card.contact.whatsapp}`}
              className="block text-green-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 WhatsApp
            </a>
          )}
        </div>

        {/* Socials Section */}
        <div className="space-y-1">
