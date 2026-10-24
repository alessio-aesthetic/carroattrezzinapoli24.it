import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LongDetail } from '@/components/LongDetail'
import { zones, site } from '@/data/site'

const items = (zones as unknown as Array<string | { slug: string; name: string; title?: string }>).map((entry) => typeof entry === 'string' ? { name: entry, title: `Carroattrezzi a ${entry}`, slug: entry.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') } : { ...entry, title: entry.title ?? `Carroattrezzi a ${entry.name}` })

export function generateStaticParams() { return items.map((item) => ({ slug: item.slug })) }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = items.find((entry) => entry.slug === params.slug)
  if (!item) return {}
  const title = `${item.title} | Soccorso stradale`
  const description = `${item.title}: soccorso stradale, traino auto e recupero moto. Chiama ${site.phone} per disponibilità e preventivo a ${item.name}.`
  return { title: { absolute: title }, description, alternates: { canonical: `/zone/${item.slug}/` }, openGraph: { title, description, url: `/zone/${item.slug}/`, images: [{url: `/images/zones/${item.slug}.jpg`}] } }
}

export default function ZonePage({ params }: { params: { slug: string } }) {
  const item = items.find((entry) => entry.slug === params.slug)
  if (!item) notFound()
  return <LongDetail kind="zone" item={item} related={items} />
}
