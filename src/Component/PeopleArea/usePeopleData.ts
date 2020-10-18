import { useAppStore } from "AppStore";
import { Id, Person, WithId } from "Model";


export const usePeopleData: () => {
    persons: WithId<Person>[],
    upsertPerson: (person: Person | WithId<Person>) => void,
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
