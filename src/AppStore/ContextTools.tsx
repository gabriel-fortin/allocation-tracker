import React, { useState, useMemo, useContext, useEffect } from "react";

import { Id, Person, Project, Record } from "Model";
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
    const [currentMaxId, setCurrentMaxId] = useState<Id>(1);
    const nextId: () => Id =
        () => {
            setCurrentMaxId(currentMaxId + 1);
            return currentMaxId + 1;
        }

    // initial data load from persister
    useEffect(() => {
        Promise.all([
            persister.retrievePersons(),
            persister.retrieveProjects(),
            persister.retrieveRecords(),
        ]).then(([persons, projects, records]) => {
            const chooseBigger = (acc: Id, x: { iid: Id }) => Math.max(acc, x.iid);
            const maxId = [...persons, ...projects, ...records].reduce(chooseBigger, 0);
            setCurrentMaxId(maxId);
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
            addPerson: (firstName) => {
                const newPerson = new Person(nextId(), firstName, firstName[0]);
                const updatedPersons = [newPerson, ...persons];
                setPersons(updatedPersons)
                persister.storePersons(updatedPersons);
            },
            addProject: (projectName: string) => {
                const newProject = new Project(nextId(), projectName);
                const updatedProjects = [newProject, ...projects];
                setProjects(updatedProjects);
                persister.storeProjects(updatedProjects);
            },
            addRecord: (personId, projectId, date, amount = 1) => {
                const newRecord = new Record(nextId(), personId, projectId, date, amount);
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
