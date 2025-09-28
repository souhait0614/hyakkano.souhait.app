import type { ReactNode } from 'react';

import BaseHead from '@/features/BaseHead';

interface RootElementProps {
  children: ReactNode;
}

export default function RootElement({ children }: RootElementProps) {
  return (
    <html lang='ja'>
      <head>
        <BaseHead />
      </head>
      <body>{children}</body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
