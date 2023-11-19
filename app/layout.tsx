import '@/components/ui/global.css';

import { Metadata } from 'next';
import { montserrat } from '@/components/ui/fonts';

export const metadata: Metadata = {
   title: {
      template: '%s | Acme Dashboard',
      default: 'Acme Dashboard',
   },
   description: 'The official Next.js Learn Dashboard built with App Router.',
   metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body
            suppressHydrationWarning={true}
            className={`${montserrat.className} antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
