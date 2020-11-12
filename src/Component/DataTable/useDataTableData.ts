import { Project, WithId } from "Model";
import { AppStore, useAppStore } from "AppStore";


interface Result {
    projects: WithId<Project>[];
    days: Date[];
}


export const useDataTableData: () => Result = () => {
    const theAppStore: AppStore = useAppStore();

    const unique: (value: any, index: number, self: any[]) => boolean =
        (value, index, self) => self.indexOf(value) === index;

    const days = theAppStore.records
        .map(x => x.date)
        .filter(unique);
    return ({
        projects: theAppStore.projects,
        days,
    });
};
