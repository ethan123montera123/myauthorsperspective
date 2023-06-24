import { collection, getDocs } from "firebase/firestore";
import { collections, db } from "../firebase";

/**
 * Gets the offered services from the database.
 *
 * @returns {Promise<import("./@types").Service[]>} The services from the database.
 */
export async function getServices() {
  const servicesRef = collection(db, collections.SERVICES);
  const snapshot = await getDocs(servicesRef);

  /** @type {import("./@types").Service[]} */
  const docs = [];
  snapshot.forEach((doc) => {
    const { inclusions, title, unitPrice } = doc.data();

    docs.push({
      id: doc.id,
      title,
      unitPrice,
      inclusions: inclusions.map((name, id) => ({ id, name })),
    });
  });

  return docs;
}
