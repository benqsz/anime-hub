import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllDocs, getDocBySlug } from '@/lib/payload';
import { metadata } from '@/lib/utils';

export async function generateMetadata({
  params,
}: PageProps<'/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const payloadSlug = slug === undefined ? 'home' : slug;
  const page = await getDocBySlug('pages', payloadSlug);
  if (!page) notFound();

  return metadata(page.meta);
}

export async function generateStaticParams() {
  const pages = await getAllDocs('pages');
  return pages
    .filter(page => page.slug !== 'home')
    .map(page => ({
      slug: page.slug,
    }));
}

export default async function PayloadPage({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params;
  const payloadSlug = slug === undefined ? 'home' : slug;
  const page = await getDocBySlug('pages', payloadSlug);
  if (!page) notFound();

  return <div>{page.title}</div>;
}
