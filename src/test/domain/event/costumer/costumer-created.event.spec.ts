import Customer from "../../../../domain/costumer/entity/Customer";
import EventDispatcher from "../../../../domain/@shared/event/event-dispatcher";
import CostumerCreatedEvent from "../../../../domain/costumer/event/costumer-created.event";
import EnviaConsoleLog1Handler from "../../../../domain/costumer/event/handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "../../../../domain/costumer/event/handler/envia-console-log-2.handler";

describe("Costumer created event unit tests", () => {
    it("should notify when costumer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsoleLog1Handler();
        const eventHandler2 = new EnviaConsoleLog2Handler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyConsoleLog = jest.spyOn(console, "log");

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

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

        expect(spyConsoleLog).toHaveBeenCalledWith("Esse é o primeiro console.log do evento: CustomerCreated");
        expect(spyConsoleLog).toHaveBeenCalledWith("Esse é o segundo console.log do evento: CustomerCreated");
    });
});
