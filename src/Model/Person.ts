import { Id } from "Model";


export class Person {
    iid?: Id;
    firstName: string;
    initial: string;

    constructor(firstName: string, initial: string) {
        this.firstName = firstName;
        this.initial = initial;
    }
}
