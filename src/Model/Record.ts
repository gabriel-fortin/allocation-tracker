import { Id } from "Model";


export class Record {
    personId: Id;
    projectId: Id;
    date: Date;
    workAmount: number;
    note: string | null;

    constructor(
        personId: Id,
        projectId: Id,
        date: Date,
        workAmount: number,
        note: string | null = null,
    ) {
        this.personId = personId;
        this.projectId = projectId;
        this.date = date;
        this.workAmount = workAmount;
        this.note = note;
    }
}
