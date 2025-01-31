import { OrderDetails } from "./OrderDetails";

export class Order {
    orderId: string;
    customerID: string;
    orderDetails: OrderDetails[];

    constructor(orderId: string, customerID: string, orderDetails: OrderDetails[]) {
        this.orderId = orderId;
        this.customerID = customerID;
        this.orderDetails = orderDetails;
    }
}
