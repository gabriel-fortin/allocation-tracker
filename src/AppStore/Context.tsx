import React, { useState, useMemo, useContext } from "react";

import { Person, Project, Record } from "Model";
import { AppStore, dummyAppStore } from "./AppStore";


const AppStoreContext = React.createContext<AppStore>(dummyAppStore);

export const useAppStore: () => AppStore =
    () => useContext(AppStoreContext);

export const AppStoreProvider: React.FC = ({ children }) => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [records, setRecords] = useState<Record[]>([]);

    const appStore: AppStore = useMemo(() => ({
        persons,
        projects,
        records,
        addPerson: (newPerson) => setPersons(currentPersons => [newPerson, ...currentPersons]),
        addProject: (newProject) => setProjects(currentProjects => [newProject, ...currentProjects]),
        addRecord: (newRecord) => setRecords(currentRecords => [newRecord, ...currentRecords]),
        isLoading: false,
    }), [persons, projects, records]);

    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};