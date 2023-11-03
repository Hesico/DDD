import Address from "../../../../domain/costumer/value-object/Addres";
import Customer from "../../../../domain/costumer/entity/Customer";
import EventDispatcher from "../../../../domain/@shared/event/event-dispatcher";
import CostumerAddressChangedEvent from "../../../../domain/costumer/event/costumer-address-changed.event";
import EnviaConsoleLogHandler from "../../../../domain/costumer/event/handler/envia-console-log.handler";

describe("Costumer address changed event unit tests", () => {
    it("Should log when costumer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyConsoleLog = jest.spyOn(console, "log");

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

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyConsoleLog).toHaveBeenCalledWith(
            `Endereço do cliente: ${costumer.id}, ${costumer.name} alterado para: ${address.toString()}`
        );
    });
});
