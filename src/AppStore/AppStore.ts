import { Id, Person, Project, Record, WithId } from "Model";

export interface AppStore {
    persons: WithId<Person>[],
    projects: WithId<Project>[],
    records: WithId<Record>[],
    addRecord: (recordWithoutId: Record) => void;
    addPerson: (personWithoutId: Person) => void;
    updatePerson: (id: Id, person: Person) => void;
    addProject: (projectWithoutId: Project) => void;
    updateProject: (id: Id, project: Project) => void;

    isLoading: boolean;
}

export const dummyAppStore: AppStore = {
    persons: [],
    projects: [],
    records: [],
    addPerson: () => {},
    updatePerson: () => {},
    addProject: () => {},
    updateProject: () => {},
    addRecord: () => {},
    isLoading: false,
};
