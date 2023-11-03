import Address from "../value-object/Addres";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get address(): Address {
        return this._address;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    changeName(name: string) {
        this._name = name;
        this.validateName();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    isActive() {
        return this._active;
    }

    activate() {
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
