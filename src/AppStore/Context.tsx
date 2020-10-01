import React, { useState, useMemo, useContext } from "react";

import { Person, Project, Record } from "Model";
import { AppStore, dummyAppStore } from "./AppStore";


const AppStoreContext = React.createContext<AppStore>(dummyAppStore);

export const useAppStore: () => AppStore =
    () => useContext(AppStoreContext);

export const AppStoreProvider: React.FC<{
    initializer?: Promise<{ persons: Person[], projects: Project[], records: Record[] }>,
}> = ({ initializer, children }) => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [records, setRecords] = useState<Record[]>([]);
    const [isLoading, setIsLoading] = useState(initializer !== undefined)

    if (initializer) {
        initializer.then(({ persons, projects, records }) => {
            setIsLoading(false);
            setPersons(persons);
            setProjects(projects);
            setRecords(records);
        })
    }

    const appStore: AppStore = useMemo(() => ({
        persons,
        projects,
        records,
        addPerson: (newPerson) => setPersons(currentPersons => [newPerson, ...currentPersons]),
        addProject: (newProject) => setProjects(currentProjects => [newProject, ...currentProjects]),
        addRecord: (newRecord) => setRecords(currentRecords => [newRecord, ...currentRecords]),
        isLoading,
    }), [persons, projects, records]);

    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};