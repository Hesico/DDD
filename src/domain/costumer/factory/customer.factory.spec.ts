import Address from "../value-object/Addres";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        const customer = CustomerFactory.create("John Doe");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Street 1", 1, "00000-000", "City");

        const customer = CustomerFactory.createWithAddress("John Doe", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.address).toEqual(address);
    });
});
