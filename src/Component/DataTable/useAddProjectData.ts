import { useAppStore } from "AppStore";
import { Project } from "Model";


interface Result {
    addProject: (project: Project) => void;
}

export const useAddProjectData: () => Result = () => {
    const appStore = useAppStore();
    
    return {
        addProject: appStore.addProject,
    };
};
