import { Person, Project, Record, WithId } from "Model"


export interface Persister {
    retrievePersons: () => Promise<WithId<Person>[]>;
    retrieveProjects: () => Promise<WithId<Project>[]>,
    retrieveRecords: () => Promise<Record[]>,
    storePersons: (persons: WithId<Person>[]) => Promise<void>;
    storeProjects: (projects: WithId<Project>[]) => Promise<void>;
    storeRecords: (records: Record[]) => Promise<void>;
}
