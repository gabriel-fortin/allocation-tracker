import React, { useState, useMemo, useContext, useEffect } from "react";

import { Id, Person, Project, Record, WithId } from "Model";
import { Persister } from "PersistentStore";

import { AppStore, dummyAppStore } from "./AppStore";


const AppStoreContext = React.createContext<AppStore>(dummyAppStore);

export const useAppStore: () => AppStore =
    () => useContext(AppStoreContext);


interface ProviderProps {
    persister: Persister;
}

export const AppStoreProvider: React.FC<ProviderProps> = ({ persister, children }) => {
    const [persons, setPersons] = useState<WithId<Person>[]>([]);
    const [projects, setProjects] = useState<WithId<Project>[]>([]);
    const [records, setRecords] = useState<WithId<Record>[]>([]);
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
            addPerson: (personWithoutId) => {
                const newPerson = {...personWithoutId, iid: nextId()};
                const updatedPersons = [newPerson, ...persons];
                setPersons(updatedPersons)
                persister.storePersons(updatedPersons);
            },
            updatePerson: (id, person) => {
                const updatedPersons = persons.map(p => {
                    if (p.iid !== id) return p;
                    return { ...p, ...person };
                });
                setPersons(updatedPersons);
                persister.storePersons(updatedPersons);
            },
            addProject: (projectWithoutId: Project) => {
                const newProject = { ...projectWithoutId, iid: nextId() };
                const updatedProjects = [newProject, ...projects];
                setProjects(updatedProjects);
                persister.storeProjects(updatedProjects);
            },
            updateProject: (id: Id, project: Project) => {
                const updatedProjects = projects.map(p => {
                    if (p.iid !== id) return p;
                    return { ...p, ...project };
                    // TODO: pick only those fields of 'project' that we're interested in
                    //      currently it has a lot of garbage (a 'days' field with lots of nesting)
                });
                setProjects(updatedProjects);
                persister.storeProjects(updatedProjects);
            },
            addRecord: (recordWithoutId: Record) => {
                const newRecord = { ...recordWithoutId, iid: nextId() };
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
