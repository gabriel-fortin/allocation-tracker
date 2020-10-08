import { Id } from "Model";


export class Person {
    iid: Id;
    firstName: string;
    initial: string;

    constructor(id: Id, firstName: string, initial: string) {
        this.iid = id;
        this.firstName = firstName;
        this.initial = initial;
    }
}
