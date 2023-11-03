import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/Product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("Product repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "123" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 1",
            price: 10,
        });
    });

    it("Should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "123" } });

        expect(productModel.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 1",
            price: 10,
        });

        product.changeName("Product 2");
        product.changePrice(20);

        await productRepository.update(product);

        const productModel2 = await ProductModel.findOne({ where: { id: "123" } });

        expect(productModel2.toJSON()).toStrictEqual({
            id: "123",
            name: "Product 2",
            price: 20,
        });
    });

    it("Should find a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);

        await productRepository.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "123" } });

        const foundProduct = await productRepository.find("123");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.id,
            name: foundProduct.name,
            price: foundProduct.price,
        });
    });

    it("Should find all products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        const product2 = new Product("1234", "Product 2", 20);

        await productRepository.create(product);
        await productRepository.create(product2);

        const foundProducts = await productRepository.findAll();
        const products = [product, product2];

        expect(products).toEqual(foundProducts);
    });
});
