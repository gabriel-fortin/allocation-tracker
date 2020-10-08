import { Id, Person, Project, Record } from "Model";

export interface AppStore {
    persons: Person[],
    projects: Project[],
    records: Record[],
    addRecord: (personId: Id, projectId: Id, date: Date) => void;
    addPerson: (firstName: string) => void;
    addProject: (projectName: string) => void;

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
