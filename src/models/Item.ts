export class Item{
    id:string;
    name:string;
    price:number;
    qty:number;

    constructor(id:string,name:string,price:number,qtyOnHand:number){
        this.id=id;
        this.name=name;
        this.price=price;
        this.qty=qtyOnHand;
    }
}