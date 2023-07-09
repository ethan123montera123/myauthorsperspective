import { config } from "../..";
import { db } from "../firebase";

import services from "./services";

type FirebaseSeedData = {
  collection: string;
  data: object[];
};

const seedData: FirebaseSeedData[] = [
  {
    collection: config.firebase.firestore.collections.SERVICES,
    data: services,
  },
];

/**
 * Populates the Firestore with necessary data.
 */
export async function seedFirestore(): Promise<void> {
  const seedDataPromise = seedData.map(async ({ collection, data }) => {
    const ref = db.collection(collection);
    const documents = await ref.get();

    return Promise.all(
      documents.size === 0 ? data.map((d: object) => ref.add(d)) : []
    );
  });

  await Promise.all(seedDataPromise);
}
