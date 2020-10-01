import { Person, Project, Record } from "Model";

export interface AppStore {
    persons: Person[],
    projects: Project[],
    records: Record[],
    addRecord: (record: Record) => void;
    addPerson: (person: Person) => void;
    addProject: (project: Project) => void;

    isLoading: boolean;
}

export const dummyAppStore: AppStore = {
    persons: [],
    projects: [],
    records: [],
    addPerson: (x) => {},
    addProject: (x) => {},
    addRecord: (x) => {},
    isLoading: false,
};
