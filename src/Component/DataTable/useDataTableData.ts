import { Project, Day, Person, Value } from "Model";
import { AppStore, useAppStore } from "AppStore";


// types for nesting thingies

export interface Projects<T={}> {
    projects: (Project & T)[];
}
export interface Days<T={}> {
    days: (Day & T)[];
}
export interface Persons<T={}> {
    persons: (Person & T)[];
}



// mock data
export const useDataTableData: () => Projects<Days<Persons<Value>>> = () => {
    const theAppStore: AppStore = useAppStore();

    // TODO: transform data from theAppStore into the required output structure

    // for now, just some mock data
    return ({
        projects: new Array(9)
            .fill('X')
            .map((_x, i) => ({
                name: `project ${i}`,
                days: new Array(3)
                    .fill('?')
                    .map((_y, j) => ({
                        date: new Date(),
                        persons: [
                            { firstName: `Gabriel`, initial: "G", value: Math.random()>0.9 ? 1 : 0 },
                            { firstName: `Shane`, initial: "S", value: Math.random()>0.9 ? 1 : 0 },
                            { firstName: `Kosta`, initial: "K", value: Math.random()>0.9 ? 1 : 0 },
                            { firstName: `Neill`, initial: "N", value: Math.random()>0.9 ? 1 : 0 },
                            { firstName: `Brett`, initial: "B", value: Math.random()>0.9 ? 1 : 0 },
                            { firstName: `Lee`, initial: "L", value: Math.random()>0.9 ? 1 : 0 },
                            { firstName: `Jon`, initial: "J", value: Math.random()>0.9 ? 1 : 0 },
                        ],
                    }))
            }))
    })
};
