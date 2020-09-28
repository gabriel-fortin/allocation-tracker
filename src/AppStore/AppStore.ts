import { Person, Project, Record } from "Model";

export interface AppStore {
    getRecords: () => Record[];
    getPersons: () => Person[];
    getProjects: () => Project[];
    addRecord: (record: Record) => void;
    addPerson: (person: Person) => void;
    addProject: (project: Project) => void;
}
