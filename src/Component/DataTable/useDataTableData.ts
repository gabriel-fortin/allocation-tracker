import { Project, Day, Person, Value, WithId } from "Model";
import { AppStore, useAppStore } from "AppStore";


// types for nesting thingies

export interface Projects<T={}> {
    projects: (WithId<Project> & T)[];
}
export interface Days<T={}> {
    days: (Day & T)[];
}
export interface Persons<T={}> {
    persons: (WithId<Person> & T)[];
}



// mock data
export const useDataTableData: () => Projects<Days<Persons<Value>>> = () => {
    const theAppStore: AppStore = useAppStore();

    // TODO: transform data from theAppStore into the required output structure

    // TODO: replace Value with Record

    // for now, just some mock data
    return ({
        projects: theAppStore.projects
            .map((project) => ({
                ...project,
                days: new Array(4)
                    .fill('?')
                    .map((_y, j) => ({
                        date: new Date(),
                        persons: [
                            { iid: project.iid*1000+j, firstName: `Gabriel`, initial: "G", color: "yellow", value: Math.random()>0.9 ? 1 : 0 },
                            { iid: project.iid*1000+j, firstName: `Shane`, initial: "S", color: "yellow", value: Math.random()>0.9 ? 1 : 0 },
                            { iid: project.iid*1000+j, firstName: `Kosta`, initial: "K", color: "yellow", value: Math.random()>0.9 ? 1 : 0 },
                            { iid: project.iid*1000+j, firstName: `Neill`, initial: "N", color: "yellow", value: Math.random()>0.9 ? 1 : 0 },
                            { iid: project.iid*1000+j, firstName: `Brett`, initial: "B", color: "yellow", value: Math.random()>0.9 ? 1 : 0 },
                            { iid: project.iid*1000+j, firstName: `Lee`, initial: "L", color: "yellow", value: Math.random()>0.9 ? 1 : 0 },
                            { iid: project.iid*1000+j, firstName: `Jon`, initial: "J", color: "yellow", value: Math.random()>0.9 ? 1 : 0 },
                        ],
                    }))
            }))
    })
};
