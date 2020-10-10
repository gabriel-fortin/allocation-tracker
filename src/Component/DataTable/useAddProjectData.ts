import { useAppStore } from "AppStore";


interface Result {
    addProject: (projectName: string) => void;
}

export const useAddProjectData: () => Result = () => {
    const appStore = useAppStore();
    
    return {
        addProject: appStore.addProject,
    };
};
