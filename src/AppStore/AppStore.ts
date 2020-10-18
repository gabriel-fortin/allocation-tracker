import { Id, Person, Project, Record } from "Model";

export interface AppStore {
    persons: Person[],
    projects: Project[],
    records: Record[],
    addRecord: (personId: Id, projectId: Id, date: Date, amount: number) => void;
    addPerson: (personWithoutId: Omit<Person, "iid">) => void;
    updatePerson: (id: Id, person: Omit<Person, "iid">) => void;
    addProject: (projectName: string) => void;

    isLoading: boolean;
}

export const dummyAppStore: AppStore = {
    persons: [],
    projects: [],
    records: [],
    addPerson: () => {},
    updatePerson: () => {},
    addProject: () => {},
    addRecord: () => {},
    isLoading: false,
};
