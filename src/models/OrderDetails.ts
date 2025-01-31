export class OrderDetails {
    orderDetailId: string;
    orderID: string;
    itemID: string;
    quantity: number;
    price: number;

    constructor(orderDetailId: string, orderID: string, itemID: string, quantity: number, price: number) {
        this.orderDetailId = orderDetailId;
        this.orderID = orderID;
        this.itemID = itemID;
        this.quantity = quantity;
        this.price = price;
    }
}
