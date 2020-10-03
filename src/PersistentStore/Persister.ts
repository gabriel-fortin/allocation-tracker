import { Person } from "Model"

export interface Persister {
    retrievePersons: () => Promise<Person[]>;
    // TODO: retrieveProjects: () => Project[],
    // TODO: retrieveRecords: () => Record[],
    storePersons: (persons: Person[]) => Promise<void>;
    // TODO: storeProjects
    // TODO: storeRecords
}
