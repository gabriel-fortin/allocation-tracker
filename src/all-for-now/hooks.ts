import { Project, Day, Person } from "../Model";


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
export const useData: () => Projects<Days<Persons>> =
    () => ({
        projects: new Array(9)
            .fill('X')
            .map((_x, i) => ({
                name: `project ${i}`,
                days: new Array(71)
                    .fill('?')
                    .map((_y, j) => ({
                        date: new Date(),
                        persons: [{ firstName: `${j * 67}` }],
                    }))
            }))
    });
