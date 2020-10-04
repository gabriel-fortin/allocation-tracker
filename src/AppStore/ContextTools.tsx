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
            persister.retrieveProjects(),
            persister.retrieveRecords(),
        ]).then(([persons, projects, records]) => {
            setPersons(persons);
            setProjects(projects);
            setRecords(records);
            setIsLoading(false);
        }).catch((reason) => {
            console.error(`Initial load of data failed. Reason:`, reason);
        });
    }, []);

    const appStore: AppStore = useMemo(
        () => ({
            persons,
            projects,
            records,
            isLoading,
            addPerson: (newPerson) => {
                const updatedPersons = [newPerson, ...persons];
                setPersons(updatedPersons)
                persister.storePersons(updatedPersons);
            },
            addProject: (newProject) => {
                const updatedProjects = [newProject, ...projects];
                setProjects(updatedProjects);
                persister.storeProjects(updatedProjects);
            },
            addRecord: (newRecord) => {
                const updatedRecords = [newRecord, ...records];
                setRecords(updatedRecords);
                persister.storeRecords(updatedRecords);
            },
        }),
        [persons, projects, records, isLoading, persister]);

    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};
