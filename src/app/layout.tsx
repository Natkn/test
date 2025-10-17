import { Montserrat } from 'next/font/google';
import './globals.css';


export const metadata = {
  title: 'My Page Title',
  description: 'Description of my page',
};

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
    
          <body className={`${montserrat.variable}`}>
           {children} 
          </body>
     
    </html>
  );
}
