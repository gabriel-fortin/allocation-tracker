import { Id, Person, Project, Record, WithId } from "Model";

export interface AppStore {
    persons: WithId<Person>[],
    projects: WithId<Project>[],
    records: Record[],
    addRecord: (personId: Id, projectId: Id, date: Date, amount: number) => void;
    addPerson: (personWithoutId: Person) => void;
    updatePerson: (id: Id, person: Person) => void;
    addProject: (project: Project) => void;
    // TODO: 'updateProject()'

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
