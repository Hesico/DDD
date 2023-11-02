import EventHandlerInterface from "../../@shared/event-handler.interface";
import CostumerAddressChangedEvent from "../costumer-address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CostumerAddressChangedEvent> {
    handle(event: CostumerAddressChangedEvent): void {
        console.log(
            `Endereço do cliente: ${event.eventData.id}, ${
                event.eventData.name
            } alterado para: ${event.eventData.address.toString()}`
        );
    }
}
