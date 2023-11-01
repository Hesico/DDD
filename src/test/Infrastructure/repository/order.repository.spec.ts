import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../../infrastructure/db/sequelize/model/order.model";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import OrderItemModel from "../../../infrastructure/db/sequelize/model/order-item.model";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import Customer from "../../../domain/entity/Customer";
import Address from "../../../domain/entity/Addres";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import OrderItem from "../../../domain/entity/OrderItem";
import ProductRepository from "../../../infrastructure/repository/product.repository";
import Product from "../../../domain/entity/Product";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../infrastructure/repository/order.repository";

describe("Order repository unit tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("i1", product1.name, product1.price, 2, product1.id);
        const orderItem2 = new OrderItem("i2", product2.name, product2.price, 3, product2.id);

        const orderRepository = new OrderRepository();
        const order = new Order("o1", customer.id, [orderItem1, orderItem2]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity,
                    product_id: orderItem1.productId,
                    order_id: order.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    product_id: orderItem2.productId,
                    order_id: order.id,
                },
            ],
        });
    });

    it("Should update a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("i1", product1.name, product1.price, 2, product1.id);
        const orderItem2 = new OrderItem("i2", product2.name, product2.price, 3, product2.id);

        const orderRepository = new OrderRepository();
        const order = new Order("o1", customer.id, [orderItem1, orderItem2]);

        await orderRepository.create(order);

        const product3 = new Product("p3", "Product 3", 30);
        await productRepository.create(product3);

        const orderItem3 = new OrderItem("i3", product3.name, product3.price, 7, product3.id);

        order.addItem(orderItem3);
        order.removeItem(orderItem1);

        orderItem2.applyDiscount(10);

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    product_id: orderItem2.productId,
                    order_id: order.id,
                },
                {
                    id: orderItem3.id,
                    name: orderItem3.name,
                    price: orderItem3.price,
                    quantity: orderItem3.quantity,
                    product_id: orderItem3.productId,
                    order_id: order.id,
                },
            ],
        });
    });

    it("Should throw an error when order not found", async () => {
        const orderRepository = new OrderRepository();

        await expect(orderRepository.find("1")).rejects.toThrowError("Order not found");
    });

    it("Should find a order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("i1", product1.name, product1.price, 2, product1.id);
        const orderItem2 = new OrderItem("i2", product2.name, product2.price, 3, product2.id);

        const orderRepository = new OrderRepository();
        const order = new Order("o1", customer.id, [orderItem1, orderItem2]);

        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder).toStrictEqual(order);
    });

    it("Should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("c1", "Customer 1");
        const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("p1", "Product 1", 10);
        const product2 = new Product("p2", "Product 2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("i1", product1.name, product1.price, 2, product1.id);
        const orderItem2 = new OrderItem("i2", product2.name, product2.price, 3, product2.id);

        const orderRepository = new OrderRepository();

        const order1 = new Order("o1", customer.id, [orderItem1]);
        const order2 = new Order("o2", customer.id, [orderItem2]);

        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders).toEqual([order1, order2]);
    });
});
