import { Person } from "Model";
import { Persister } from "PersistentStore";


export class LocalStoragePersister implements Persister {
    retrievePersons: () => Promise<Person[]> =
        () => {
            const retrievedPersons = window.localStorage.getItem("persons");
            if (retrievedPersons === null) return Promise.resolve([]);

            return RandomlyDelayedPromise.resolve(JSON.parse(retrievedPersons));
        }

    storePersons: (persons: Person[]) => Promise<void> =
        (persons) => {
            window.localStorage.setItem("persons", JSON.stringify(persons));
            return RandomlyDelayedPromise.resolve();
        }
}

/**
 * A little cheat to see how the app could behave with network latency
 */
class RandomlyDelayedPromise {
    private constructor() {}
    static resolve: <T> (x?: T) => Promise<T> =
        (x) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                resolve(x);
            }, 800 * Math.random());
        });
    }
}
