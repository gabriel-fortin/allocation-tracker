import { Project, Day, Person, Record, WithId } from "Model";
import { AppStore, useAppStore } from "AppStore";


interface Result {
    byProject: {
        project: WithId<Project>
        days: Date[]
    }[]
}


export const useDataTableData: () => Result = () => {
    const theAppStore: AppStore = useAppStore();

    const unique: (value: any, index: number, self: any[]) => boolean =
        (value, index, self) => self.indexOf(value) === index;

    return ({
        byProject: theAppStore.projects
            .map((project) => {
                const recordsForProject = theAppStore.records
                    .filter(r => r.projectId===project.iid);
                const days = recordsForProject
                    .map(r => r.date)
                    .filter(unique);
                
                return ({
                    project,
                    days,
                });
            })
    })
};
