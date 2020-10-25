import { useAppStore } from "AppStore";
import { Id, Project } from "Model";

interface Result {
    updateProject: (id: Id, project: Project) => void;
}

export const useProjectCellData: () => Result = () => {
    const appStore = useAppStore();
    
    return {
        updateProject: appStore.updateProject,
    };
};
