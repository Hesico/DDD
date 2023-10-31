import Product from "../../../domain/entity/Product";

describe("Product unit tests", () => {
    it("Should throw an error when id is empty", () => {
        expect(() => new Product("", "Product 1", 10)).toThrowError("Id is required");
    });

    it("Should throw an error when name is empty", () => {
        expect(() => new Product("123", "", 10)).toThrowError("Name is required");
    });

    it("should throw an error when price is less than zero", () => {
        expect(() => new Product("123", "Product 1", -1)).toThrowError("Price must be greater than zero");
    });

    it("Should change name", () => {
        const product = new Product("123", "Product 1", 10);
        product.changeName("Product 2");

        expect(product.name).toBe("Product 2");
    });

    it("Sould change price", () => {
        const product = new Product("123", "Product 1", 10);
        product.changePrice(20);

        expect(product.price).toBe(20);
    });
});
