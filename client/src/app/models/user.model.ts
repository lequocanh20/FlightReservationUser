export class User {
    public firstName: string;
    public lastName: string;
    public named: string;
    public sex: string;
    public phoneNumber: string;
    public phoneNumber2: string;
    public email: string;
    public email2: string;
    public dateOfBirth: Date;
    
    constructor(firstName: string, lastName: string, named: string, sex: string, phoneNumber: string,
        phoneNumber2: string, email: string, email2: string, dateOfBirth: Date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.named = named;
        this.sex = sex;
        this.phoneNumber = phoneNumber;
        this.phoneNumber2 = phoneNumber2;
        this.email = email;
        this.email2 = email2;
        this.dateOfBirth = dateOfBirth;
    }
}