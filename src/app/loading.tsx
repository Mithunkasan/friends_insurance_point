'use client';

import React, { useState, useEffect } from 'react';
import LogoLoader from '@/components/shared/LogoLoader';

export default function Loading() {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    // Read lang cookie dynamically on client mount
    const match = document.cookie.match(/(?:^|; )lang=([^;]*)/);
    if (match && match[1]) {
      setLang(match[1]);
    }
  }, []);

  return <LogoLoader lang={lang} fullscreen />;
}
