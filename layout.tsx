import './globals.css';import {Nav} from '@/components/Nav';
export const metadata={title:'1RicochetVoidUniverse',description:'Some doors are earned.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Nav/>{children}<a className="far-door" href="/creator-vault">signal fracture</a></body></html>}
