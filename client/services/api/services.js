import { collection, getDocs } from "firebase/firestore";

import { collections, db } from "@/services/firebase";
import { ObjectWithError, parseThrowablesToObject } from "@/services/utils";

/**
 * Gets the offered services from the database.
 *
 * @returns {Promise<ObjectWithError<import("./@types").Service[]>>}
 * A promise containing the services from the database, or a possible error.
 *
 * @example
 * const { data: services, error } = await getServices();
 * if(error) // handle error
 *
 * // handle services
 */
export async function getServices() {
  return parseThrowablesToObject(async () => {
    const servicesRef = collection(db, collections.SERVICES);
    const snapshot = await getDocs(servicesRef);

    /** @type {import("./@types").Service[]} */
    const docs = [];
    snapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });

    return docs;
  });
}
