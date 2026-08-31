import { ImageResponse } from 'next/og';
import React from 'react';

export const size = { width: 1200, height: 630 };

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          background: 'linear-gradient(135deg, #B5652E 0%, #954F21 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          color: 'white',
        },
      },
      React.createElement(
        'div',
        { style: { fontSize: 28, fontWeight: 600, opacity: 0.85, marginBottom: 24, letterSpacing: 2, textTransform: 'uppercase' } },
        'HostCopy AI'
      ),
      React.createElement(
        'div',
        { style: { fontSize: 54, fontWeight: 700, textAlign: 'center', lineHeight: 1.25, maxWidth: 1000 } },
        'How to Write an Airbnb Listing Description That Actually Books'
      )
    ),
    { ...size }
  );
}
