import { FirebaseSeedData } from "../interface";
import { firebase } from "../providers";
import * as services from "./services.data";

const seedData: FirebaseSeedData[] = [services];

export async function seedFirestore() {
  const seedDataPromise = seedData.map(async ({ collection, data }) => {
    let collectionDataPromise: unknown[] = [];
    const ref = firebase.db.collection(collection);
    const documents = await ref.get();

    if (documents.size === 0) {
      collectionDataPromise = data.map((d: object) => ref.add(d));
    }

    return Promise.all(collectionDataPromise);
  });

  await Promise.all(seedDataPromise);
}
