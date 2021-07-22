export class Employee {
    id?: string;
    fullName: string;
    email: string;
    admissionDate: Date;
    seniority: string;
    position: string;

    constructor(fullName: string, email: string, seniority: string, position: string) {
        this.fullName = fullName;
        this.email = email;
        this.admissionDate = new Date();
        this.seniority = seniority;
        this.position = position; 
    }
}
