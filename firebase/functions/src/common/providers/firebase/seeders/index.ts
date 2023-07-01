import { FirebaseSeedData } from "../../../interface";
import { db } from "../firebase";

import * as services from "./services";

const seedData: FirebaseSeedData[] = [services];

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
