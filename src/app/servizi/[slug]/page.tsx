import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LongDetail } from '@/components/LongDetail'
import { services, site } from '@/data/site'

const items = services as unknown as Array<{ slug: string; title: string; intro?: string; text?: string; detail?: string }>

export function generateStaticParams() { return items.map((item) => ({ slug: item.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = items.find((entry) => entry.slug === params.slug)
  if (!item) return {}
  const title = `${item.title} a ${site.city} | Carroattrezzi Napoli`
  const description = `${item.title} a Napoli: ${item.text ?? "recupero e assistenza veicoli."} Chiama ${site.phone}.`
  return { title: { absolute: title }, description, alternates: { canonical: `/servizi/${item.slug}/` }, openGraph: { title, description, url: `/servizi/${item.slug}/`, images: [{url: `/images/services/${item.slug}.jpg`}] } }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const item = items.find((entry) => entry.slug === params.slug)
  if (!item) notFound()
  return <LongDetail kind="service" item={item} related={items} />
}
