export class CustomerModel {
    id:string
    name:string
    nic:string
    email:string
    phone:number

    constructor(id: string, name: string, email: string, phone: number, nic: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.nic = nic;
    }
}