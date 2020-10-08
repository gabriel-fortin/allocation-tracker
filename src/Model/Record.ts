import { Id } from "Model";


export class Record {
    iid: Id;
    personId: Id;
    projectId: Id;
    date: Date;
    workAmount: number;
    note: string | null;

    constructor(
        id: Id,
        personId: Id,
        projectId: Id,
        date: Date,
        workAmount: number,
        note: string | null = null,
    ) {
        this.iid = id;
        this.personId = personId;
        this.projectId = projectId;
        this.date = date;
        this.workAmount = workAmount;
        this.note = note;
    }
}
