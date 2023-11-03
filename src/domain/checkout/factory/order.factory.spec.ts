import { v4 as uuid } from "uuid";
import OrderFactory from "./order.factory";
describe("Order factory unit tests", () => {
    it("should create a order", () => {
        const orderPros = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    price: 100,
                    productId: uuid(),
                    quantity: 1,
                },
            ],
        };

        const order = OrderFactory.create(orderPros);

        expect(order.id).toBe(orderPros.id);
        expect(order.customerId).toBe(orderPros.customerId);
        expect(order.items.length).toBe(1);
        expect(order.total()).toBe(100);
    });
});
