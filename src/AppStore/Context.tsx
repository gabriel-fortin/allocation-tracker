import React, { useState, useMemo, useContext, useEffect } from "react";

import { Person, Project, Record } from "Model";
import { AppStore, dummyAppStore } from "./AppStore";


const AppStoreContext = React.createContext<AppStore>(dummyAppStore);

export const useAppStore: () => AppStore =
    () => useContext(AppStoreContext);

export const AppStoreProvider: React.FC = ({ children }) => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [records, setRecords] = useState<Record[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // TODO: persister should be a dependency, injected through props
    const persister: {
        retrievePersons: () => Person[],
        // TODO: retrieveProjects: () => Project[],
        // TODO: retrieveRecords: () => Record[],
        storePersons: (persons: Person[]) => void,
        // TODO: storeProjects
        // TODO: storeRecords
    } = {
        retrievePersons: () => {
            const retrievedPersons = window.localStorage.getItem("persons");
            if (retrievedPersons === null) return [];
            return JSON.parse(retrievedPersons);
        },
        storePersons: (persons) => {
            window.localStorage.setItem("persons", JSON.stringify(persons));
        },
    };

    useEffect(() => {
        setPersons(persister.retrievePersons());

        // TODO: load projects and records

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
    }), [persons, projects, records, isLoading]);

    return (
        <AppStoreContext.Provider value={appStore}>
            {children}
        </AppStoreContext.Provider>
    );
};
