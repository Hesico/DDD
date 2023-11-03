import { v4 as uuid } from "uuid";
import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        name: string;
        price: number;
        productId: string;
        quantity: number;
    }[];
}

export default class OrderFactory {
    static create(orderProps: OrderFactoryProps): Order {
        const orderItems = orderProps.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.quantity, item.productId);
        });

        return new Order(orderProps.id, orderProps.customerId, orderItems);
    }
}
