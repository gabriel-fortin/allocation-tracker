import { useAppStore } from "AppStore";
import { Id, Person } from "Model";


export const usePeopleData: () => {
    persons: Person[],
    addPerson: (firstName: string) => void,
    removePerson: (personId: Id) => void,
} = () => {
    const appStore = useAppStore();
    return {
        persons: appStore.persons,
        addPerson: (firstName) => { appStore.addPerson(new Person(firstName, firstName[0])) },
        removePerson: (personId) => { console.error(`Removing persons is not implemented`) },
    };
};
