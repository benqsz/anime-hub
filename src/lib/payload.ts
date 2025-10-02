import config from '@payload-config';
import { CollectionSlug, DataFromCollectionSlug, getPayload } from 'payload';

export const getPayloadInstance = async () => await getPayload({ config });

export async function getAllDocs<T extends CollectionSlug>(collection: T) {
  const payload = await getPayloadInstance();
  const docs = await payload.find({
    collection,
    pagination: false,
  });

  return docs.docs as DataFromCollectionSlug<T>[];
}

export async function getDocBySlug<T extends CollectionSlug>(
  collection: T,
  slug: string,
): Promise<DataFromCollectionSlug<T> | undefined> {
  const payload = await getPayloadInstance();
  const doc = await payload.find({
    collection,
    limit: 1,
    pagination: false,
    depth: 2,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return (doc.docs[0] as DataFromCollectionSlug<T>) || undefined;
}
