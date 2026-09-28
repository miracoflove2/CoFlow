import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'CoFlow', description: 'Human governed engineering workflow' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
