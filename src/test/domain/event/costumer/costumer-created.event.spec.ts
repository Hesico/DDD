import Customer from "../../../../domain/entity/Customer";
import EventDispatcher from "../../../../domain/event/@shared/event-dispatcher";
import CostumerCreatedEvent from "../../../../domain/event/customer/costumer-created.event";
import EnviaConsoleLog1Handler from "../../../../domain/event/customer/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../../../domain/event/customer/handler/envia-console-log-2.handler";

describe("Costumer created event unit tests", () => {
    it("should notify when costumer is created", () => {
        console.log = jest.fn();
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        eventDispatcher.register("CostumerCreatedEvent", eventHandler1);
        eventDispatcher.register("CostumerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"].length).toBe(2);

        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CostumerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const costumer = new Customer("1", "John Doe");

        const costumerCreatedEvent = new CostumerCreatedEvent({
            id: costumer.id,
            name: costumer.name,
        });

        eventDispatcher.notify(costumerCreatedEvent);

        expect(console.log).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
        expect(console.log).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
    });
});
