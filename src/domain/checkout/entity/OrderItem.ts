export default class OrderItem {
    private _id: string;
    private _name: string;
    private _price: number;
    private _quantity: number = 1;
    private _productId: string;

    constructor(id: string, name: string, price: number, quantity: number, productId: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._productId = productId;
        this.validate();
    }

    get price(): number {
        return this._price;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get quantity(): number {
        return this._quantity;
    }

    get productId(): string {
        return this._productId;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    applyDiscount(discount: number) {
        this._price -= discount;
    }

    validate() {
        if (this._id?.length === 0) throw new Error("Id is required");
        if (this._name?.length === 0) throw new Error("Name is required");
        if (this._price <= 0) throw new Error("Price must be greater than zero");
        if (this._quantity <= 0) throw new Error("Quantity must be greater than zero");
        if (this._productId?.length === 0) throw new Error("ProductId is required");
    }
}
