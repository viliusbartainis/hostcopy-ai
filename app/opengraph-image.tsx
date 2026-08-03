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
                                  background: 'linear-gradient(135deg, #EA580C 0%, #B45309 100%)',
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                      },
            },
                  React.createElement(
                            'div',
                    { style: { fontSize: 64, fontWeight: 700, marginBottom: 20 } },
                            'HostCopy AI'
                          ),
                  React.createElement(
                            'div',
                    { style: { fontSize: 32, opacity: 0.9, maxWidth: 800, textAlign: 'center' } },
                            'One form. Three ready-to-paste listings for Airbnb, Booking.com & Instagram.'
                          )
                ),
      { ...size }
        );
}
