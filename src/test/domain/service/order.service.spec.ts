import Customer from "../../../domain/costumer/entity/Customer";
import Order from "../../../domain/checkout/entity/Order";
import OrderItem from "../../../domain/checkout/entity/OrderItem";
import OrderService from "../../../domain/checkout/service/order.service";

describe("Order service unit tests", () => {
    it("Should place an order", () => {
        const customer = new Customer("c1", "John Doe");

        const orderItem1 = new OrderItem("i1", "Item 1", 10, 1, "1");

        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("Should get total of all orders", () => {
        const orderItem1 = new OrderItem("1", "Item 1", 10, 1, "1");
        const orderItem2 = new OrderItem("2", "Item 2", 20, 2, "2");

        const order1 = new Order("1", "1", [orderItem1]);
        const order2 = new Order("2", "2", [orderItem2]);

        expect(OrderService.getTotal([order1, order2])).toBe(50);
    });
});
