import { useAppStore } from "AppStore";
import { Person, Project } from "Model";


interface NewRecordFormData {
    persons: Person[];
    projects: Project[];
}

export const useNewRecordFormData: () => NewRecordFormData =
    () => {
        const appStore = useAppStore();
        return {
            persons: appStore.persons,
            projects: appStore.projects,
        };
    };
