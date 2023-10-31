import Order from "../../../domain/entity/Order";
import OrderItem from "../../../domain/entity/OrderItem";

describe("Order unit tests", () => {
    it("should throw an error when id is empty", () => {
        expect(() => new Order("", "123", [])).toThrowError("Id is required");
    });

    it("should throw an error when customerId is empty", () => {
        expect(() => new Order("123", "", [])).toThrowError("CustomerId is required");
    });

    it("Sould throw an error when items is empty", () => {
        expect(() => new Order("123", "123", [])).toThrowError("Items are required");
    });

    it("sould calculate total", () => {
        const item1 = new OrderItem("1", "Item 1", 10, 1, "1");
        const item2 = new OrderItem("2", "Item 2", 20, 2, "2");

        const order = new Order("1", "123", [item1, item2]);

        expect(order.total()).toBe(50);

        const item3 = new OrderItem("3", "Item 3", 30, 5, "3");
        const order2 = new Order("2", "123", [item1, item2, item3]);

        expect(order2.total()).toBe(200);
    });

    it("Should throw an error when item quantity is less than zero", () => {
        expect(() => new Order("1", "123", [new OrderItem("1", "Item 1", 10, -1, "1")])).toThrowError(
            "Quantity must be greater than zero"
        );
    });
});
