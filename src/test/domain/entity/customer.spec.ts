import Address from "../../../domain/entity/Addres";
import Customer from "../../../domain/entity/Customer";

describe("Customer unit tests", () => {
    it("should throw an error when id is empty", () => {
        expect(() => new Customer("", "John Doe")).toThrowError("Id is required");
    });

    it("should throw an error when name have lass than 3 characters", () => {
        expect(() => new Customer("123", "Jo")).toThrowError("Name must be longer than 3 characters");
    });

    it("should change name", () => {
        const customer = new Customer("123", "John Doe");
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer("123", "John Doe");
        const address = new Address("Street", 123, "12345", "City");
        customer.changeAddress(address);

        customer.active();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw an error when address is undefined", () => {
        const customer = new Customer("123", "John Doe");

        expect(() => customer.active()).toThrowError("Address is required to activate a customer");
    });

    it("should deactivate customer", () => {
        const customer = new Customer("123", "John Doe");
        customer.desactive();

        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("123", "John Doe");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});
