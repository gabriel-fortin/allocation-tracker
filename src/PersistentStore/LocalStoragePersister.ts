import { Person, Project, Record, WithId } from "Model";
import { Persister } from "PersistentStore";


const PERSONS = "persons";
const PROJECTS = "projects";
const RECORDS = "records";

export class LocalStoragePersister implements Persister {
    retrievePersons(): Promise<WithId<Person>[]> {
        const retrievedPersons = window.localStorage.getItem(PERSONS);
        if (retrievedPersons === null) return Promise.resolve([]);

        return RandomlyDelayedPromise.resolve(JSON.parse(retrievedPersons));
    }

    retrieveProjects(): Promise<Project[]> {
        const retrievedProjects = window.localStorage.getItem(PROJECTS);
        if (retrievedProjects === null) return Promise.resolve([]);

        return RandomlyDelayedPromise.resolve(JSON.parse(retrievedProjects));
    }

    retrieveRecords(): Promise<Record[]> {
        const retrievedRecords = window.localStorage.getItem(RECORDS);
        if (retrievedRecords === null) return Promise.resolve([]);

        return RandomlyDelayedPromise.resolve(JSON.parse(retrievedRecords));
    }

    storePersons(persons: WithId<Person>[]): Promise<void> {
        window.localStorage.setItem(PERSONS, JSON.stringify(persons));
        return RandomlyDelayedPromise.resolve();
    }

    storeProjects(projects: Project[]): Promise<void> {
        window.localStorage.setItem(PROJECTS, JSON.stringify(projects));
        return RandomlyDelayedPromise.resolve();
    }

    storeRecords(records: Record[]): Promise<void> {
        window.localStorage.setItem(RECORDS, JSON.stringify(records));
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
