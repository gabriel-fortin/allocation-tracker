import React, { useState, useMemo, useContext } from "react";

import { Person, Project, Record } from "Model";
import { AppStore } from "AppStore";


const emptyAppStore: AppStore = {
    getRecords: () => [],
    getPersons: () => [],
    getProjects: () => [],
    addPerson: (x) => {},
    addProject: (x) => {},
    addRecord: (x) => {},
};

const AppStoreContext = React.createContext<AppStore>(emptyAppStore);

export const useAppStore: () => AppStore =
    () => useContext(AppStoreContext);

export const AppStoreProvider: React.FC = ({ children }) => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [records, setRecords] = useState<Record[]>([]);

    const appStore: AppStore = useMemo(() => ({
        getPersons: () => persons,
        getProjects: () => projects,
        getRecords: () => records,
        addPerson: (newPerson) => setPersons(currentPersons => [newPerson, ...currentPersons]),
        addProject: (newProject) => setProjects(currentProjects => [newProject, ...currentProjects]),
        addRecord: (newRecord) => setRecords(currentRecords => [newRecord, ...currentRecords]),
    }), [persons, projects, records]);

    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};