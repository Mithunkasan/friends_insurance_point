'use client';

import React from 'react';

interface WhatsAppButtonProps {
  lang?: string;
}

export default function WhatsAppButton({ lang = 'en' }: WhatsAppButtonProps) {
  const label = lang === 'ta' ? 'அரட்டையடிக்க' : 'Chat on WhatsApp';

  return (
    <a
      href="https://wa.me/917598657990"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group cursor-pointer"
      title={label}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="currentColor"
        className="w-5 h-5 shrink-0"
      >
        <path d="M12.012 2c-5.506 0-9.975 4.469-9.975 9.974 0 1.761.459 3.475 1.332 5.003L2 22l5.163-1.353c1.472.802 3.125 1.226 4.814 1.226 5.505 0 9.975-4.469 9.975-9.974 0-5.506-4.47-9.975-9.975-9.975zm0 1.716c4.557 0 8.259 3.702 8.259 8.258 0 4.557-3.702 8.259-8.259 8.259-1.579 0-3.123-.451-4.467-1.306l-.32-.204-3.324.871.886-3.238-.225-.357A8.214 8.214 0 0 1 3.753 11.97c0-4.556 3.702-8.258 8.259-8.258zm-3.61 3.036c-.198 0-.414.072-.61.27-.197.198-.755.738-.755 1.802 0 1.062.774 2.088.882 2.233.107.144 1.503 2.378 3.684 3.256.518.209.923.333 1.238.432.52.162.993.137 1.367.081.417-.063 1.282-.522 1.462-1.026.18-.504.18-.936.126-1.026-.054-.09-.198-.144-.414-.252-.216-.108-1.282-.63-1.48-.702-.198-.072-.342-.108-.486.108-.144.216-.558.702-.684.846-.126.144-.252.162-.468.054-.216-.108-.913-.336-1.74-1.074-.643-.573-1.077-1.281-1.203-1.497-.126-.216-.013-.333.094-.44.098-.097.216-.252.324-.378.108-.126.144-.216.216-.36.072-.144.036-.27-.018-.378-.054-.108-.486-1.17-.666-1.602-.176-.423-.35-.365-.486-.372-.126-.007-.27-.007-.414-.007z" />
      </svg>
      <span className="text-xs font-extrabold tracking-wide hidden sm:inline-block">
        {label}
      </span>
      {/* Pulsing indicator */}
      <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
    </a>
  );
}
