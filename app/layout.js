import MainHeader from '@/components/layout/MainHeader';
import './globals.css';

export const metadata = {
  title: 'NextJS Event',
  description: 'Find a lot of great events that allow you to evolve...',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
