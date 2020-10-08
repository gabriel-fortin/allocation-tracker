import { Id } from "Model";


export class Project {
    iid: Id;
    name: string;

    constructor(id: Id, name: string) {
        this.iid = id;
        this.name = name;
    }
}
