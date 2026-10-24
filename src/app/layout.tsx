import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import { site, services, zones } from '@/data/site'
import '@/styles/tailwind.css'
const inter = Inter({subsets:['latin'],display:'swap',variable:'--font-inter'})
const lexend = Lexend({subsets:['latin'],display:'swap',variable:'--font-lexend'})
export const metadata: Metadata = {
 metadataBase:new URL(`https://${site.domain}`), title:{default:site.title,template:`%s | ${site.name}`}, description:site.description,
 icons:{icon:'/favicon.svg'}, alternates:{canonical:'/'}, robots:{index:true,follow:true},
 openGraph:{title:site.title,description:site.description,url:`https://${site.domain}/`,siteName:site.name,locale:'it_IT',type:'website',images:[{url:'/images/hero-napoli-original.jpg',width:1600,height:900,alt:'Carroattrezzi e soccorso stradale a Napoli'}]},
 twitter:{card:'summary_large_image',title:site.title,description:site.description,images:['/images/hero-napoli-original.jpg']}
}
const schema = {'@context':'https://schema.org','@graph':[
 {'@type':'AutomotiveBusiness','@id':`https://${site.domain}/#attivita`,name:site.name,url:`https://${site.domain}/`,telephone:site.tel,email:site.email,image:`https://${site.domain}/images/hero-napoli-original.jpg`,logo:`https://${site.domain}/images/brand-napoli.png`,description:site.description,address:{'@type':'PostalAddress',streetAddress:'Via Professor Filippo Manna, 7',postalCode:'80013',addressLocality:'Casalnuovo di Napoli',addressRegion:'NA',addressCountry:'IT'},areaServed:['Napoli','Casalnuovo di Napoli',...zones.map(z=>z.name)].map(name=>({'@type':'City',name})),hasOfferCatalog:{'@type':'OfferCatalog',name:'Soccorso stradale a Napoli',itemListElement:services.map(s=>({'@type':'Offer',itemOffered:{'@type':'Service',name:`${s.title} a Napoli`,url:`https://${site.domain}/servizi/${s.slug}/`}}))}},
 {'@type':'WebSite','@id':`https://${site.domain}/#website`,url:`https://${site.domain}/`,name:site.name,inLanguage:'it-IT',publisher:{'@id':`https://${site.domain}/#attivita`}}
]}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="it" className={`${inter.variable} ${lexend.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/></body></html>}
