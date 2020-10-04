import React, { useState, useMemo, useContext, useEffect } from "react";

import { Person, Project, Record } from "Model";
import { Persister } from "PersistentStore";

import { AppStore, dummyAppStore } from "./AppStore";


const AppStoreContext = React.createContext<AppStore>(dummyAppStore);

export const useAppStore: () => AppStore =
    () => useContext(AppStoreContext);


interface ProviderProps {
    persister: Persister;
}

export const AppStoreProvider: React.FC<ProviderProps> = ({ persister, children }) => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [records, setRecords] = useState<Record[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // initial data load from persister
    useEffect(() => {
        Promise.all([
            persister.retrievePersons(),
        ]).then(([persons]) => {
            setPersons(persons);
            // TODO: setProjects(...)
            // TODO: setRecords(...)
            setIsLoading(false);
        }).catch((reason) => {
            console.error(`Initial load of data failed. Reason:`, reason);
        });

        // TODO: load projects and records as well

    }, []);

    const appStore: AppStore = useMemo(() => ({
        persons,
        projects,
        records,
        isLoading,
        addPerson: (newPerson) => {
            const newPersonsCollection = [newPerson, ...persons];
            setPersons(newPersonsCollection)
            persister.storePersons(newPersonsCollection);
        },
        addProject: (newProject) => {
            setProjects(currentProjects => [newProject, ...currentProjects]);

            // TODO: persist projects

        },
        addRecord: (newRecord) => {
            setRecords(currentRecords => [newRecord, ...currentRecords]);

            // TODO: persist records

        },
    }), [persons, projects, records, isLoading, persister]);

    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};
