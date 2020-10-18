import { useAppStore } from "AppStore";
import { Id, Person } from "Model";


export const usePeopleData: () => {
    persons: Person[],
    upsertPerson: (person: Omit<Person, "iid">) => void,
    removePerson: (personId: Id) => void,
} = () => {
    const appStore = useAppStore();
    return {
        persons: appStore.persons,
        upsertPerson: (person) => {
            const id = (person as any).iid;
            if (id) {
                appStore.updatePerson(id, person);
            } else {
                appStore.addPerson(person);
            }
        },
        removePerson: (personId) => { console.error(`Removing persons is not implemented`) },
    };
};
