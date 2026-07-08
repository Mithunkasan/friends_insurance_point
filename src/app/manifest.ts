import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Friends Insurance Point',
    short_name: 'Friends Insurance',
    description: 'Get vehicle insurance in 10 minutes at Friends Insurance Point, Nagercoil.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#004199',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
