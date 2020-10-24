import { useAppStore } from "AppStore";
import { Person, Project, WithId } from "Model";


interface NewRecordFormData {
    persons: WithId<Person>[];
    projects: WithId<Project>[];
}

export const useNewRecordFormData: () => NewRecordFormData =
    () => {
        const appStore = useAppStore();
        return {
            persons: appStore.persons,
            projects: appStore.projects,
        };
    };
