import { Id } from "./Id";


export type WithId<T> = T & {
    iid: Id
};
