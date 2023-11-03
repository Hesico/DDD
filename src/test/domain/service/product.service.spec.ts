import Product from "../../../domain/product/entity/Product";
import ProductoService from "../../../domain/product/service/product.service";

describe("Product service unit tests", () => {
    it("Sould change the price of all products", () => {
        const product1 = new Product("1", "Product 1", 10);
        const product2 = new Product("2", "Product 2", 20);
        const products = [product1, product2];

        ProductoService.increasePrice(products, 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);
    });
});
