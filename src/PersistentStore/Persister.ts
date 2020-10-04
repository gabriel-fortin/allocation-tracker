import { Person, Project, Record } from "Model"


export interface Persister {
    retrievePersons: () => Promise<Person[]>;
    retrieveProjects: () => Promise<Project[]>,
    retrieveRecords: () => Promise<Record[]>,
    storePersons: (persons: Person[]) => Promise<void>;
    storeProjects: (projects: Project[]) => Promise<void>;
    storeRecords: (records: Record[]) => Promise<void>;
}
