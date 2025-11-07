import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({
  weight: '400',
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={ubuntu.className} suppressHydrationWarning>
      <body className='flex flex-col min-h-screen'>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
