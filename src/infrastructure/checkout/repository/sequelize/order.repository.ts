import Order from "../../../../domain/checkout/entity/Order";
import OrderItem from "../../../../domain/checkout/entity/OrderItem";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    product_id: item.productId,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }

    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;

        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });

            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }));

            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update({ total: entity.total() }, { where: { id: entity.id }, transaction: t });
        });
    }

    async find(id: string): Promise<Order> {
        const order = await OrderModel.findByPk(id, { include: ["items"] });

        if (!order) throw new Error("Order not found");

        const items = order?.items?.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id);
        });

        return new Order(order.id, order.customer_id, items);
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({ include: ["items"] });

        return orders.map((order) => {
            const items = order?.items?.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.quantity, item.product_id);
            });

            return new Order(order.id, order.customer_id, items);
        });
    }
}
