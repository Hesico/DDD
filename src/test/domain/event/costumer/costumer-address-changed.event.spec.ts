import Address from "../../../../domain/entity/Addres";
import Customer from "../../../../domain/entity/Customer";
import EventDispatcher from "../../../../domain/event/@shared/event-dispatcher";
import CostumerAddressChangedEvent from "../../../../domain/event/customer/costumer-address-changed.event";
import EnviaConsoleLogHandler from "../../../../domain/event/customer/handler/envia-console-log.handler";

describe("Costumer address changed event unit tests", () => {
    it("Should log when costumer address is changed", () => {
        console.log = jest.fn();
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CostumerAddressChangedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CostumerAddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CostumerAddressChangedEvent"].length).toBe(1);

        expect(eventDispatcher.getEventHandlers["CostumerAddressChangedEvent"][0]).toMatchObject(eventHandler);

        const address = new Address("Street", 123, "12345", "City");
        const costumer = new Customer("1", "John Doe");

        costumer.changeAddress(address);

        const costumerCreatedEvent = new CostumerAddressChangedEvent({
            id: costumer.id,
            name: costumer.name,
            address: address,
        });

        eventDispatcher.notify(costumerCreatedEvent);

        expect(console.log).toHaveBeenCalledWith(
            `Endereço do cliente: ${costumer.id}, ${costumer.name} alterado para: ${costumer.address.toString()}`
        );
    });
});
