import { Person } from "Model"

export interface Persister {
    retrievePersons: () => Person[];
    // TODO: retrieveProjects: () => Project[],
    // TODO: retrieveRecords: () => Record[],
    storePersons: (persons: Person[]) => void;
    // TODO: storeProjects
    // TODO: storeRecords
}
