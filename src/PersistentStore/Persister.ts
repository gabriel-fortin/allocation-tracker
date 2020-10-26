import { Person, Project, Record, WithId } from "Model"


export interface Persister {
    retrievePersons: () => Promise<WithId<Person>[]>;
    retrieveProjects: () => Promise<WithId<Project>[]>,
    retrieveRecords: () => Promise<WithId<Record>[]>,
    storePersons: (persons: WithId<Person>[]) => Promise<void>;
    storeProjects: (projects: WithId<Project>[]) => Promise<void>;
    storeRecords: (records: WithId<Record>[]) => Promise<void>;
}
