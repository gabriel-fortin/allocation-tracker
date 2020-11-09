import { useAppStore } from "AppStore";
import { Person, Project, Record, WithId } from "Model";


interface NewRecordFormData {
    persons: WithId<Person>[];
    projects: WithId<Project>[];
    addRecord: (recordWithoutId: Record) => void;
}

export const useNewRecordFormData: () => NewRecordFormData =
    () => {
        const appStore = useAppStore();
        return {
            persons: appStore.persons,
            projects: appStore.projects,
            addRecord: appStore.addRecord,
        };
    };
