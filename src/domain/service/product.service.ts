import Product from "../entity/Product";

export default class ProductoService {
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach((product) => product.changePrice((product.price * percentage) / 100 + product.price));
    }
}
