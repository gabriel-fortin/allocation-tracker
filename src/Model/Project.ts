import { Id } from "Model";


export class Project {
    iid?: Id;
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
