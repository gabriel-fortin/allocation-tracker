import { useAppStore } from "AppStore";
import { Id, Person } from "Model";


export const usePeopleData: () => {
    persons: Person[],
    addPerson: (firstName: string) => void,
    removePerson: (personId: Id) => void,
} = () => {
    const appStore = useAppStore();
    return {
        persons: appStore.getPersons(),
        addPerson: (firstName) => { appStore.addPerson(new Person(firstName, firstName[0])) },
        // addPerson: (firstName) => { alert(`usePeopleData -> addPerson: ${firstName}`) },
        removePerson: (personId) => { console.error(`Removing persons is not implemented`) },
    };
};
