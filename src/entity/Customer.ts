import Address from "./addres";

class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    changeName(name: string) {
        this._name = name;
        this.validateName();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    active() {
        if (this._address === undefined) throw new Error("Address is required to activate a customer");

        this._active = true;
    }

    desactive() {
        this._active = false;
    }

    validateName() {
        if (this._name?.length < 3) {
            throw new Error("Name must be longer than 3 characters");
        }
    }

    validateId() {
        if (this._id?.length === 0) {
            throw new Error("Id is required");
        }
    }

    validate() {
        this.validateId();
        this.validateName();
    }
}
