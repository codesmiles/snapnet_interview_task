import NotificationClient from './NotificationClient';
import amqp from "amqplib"; 
import { DocumentService } from '../Services';

const documentService = new DocumentService();
(async () => {
    await NotificationClient.connect();

    const channel = NotificationClient['channel']; // Access the internal channel

    if (!channel) {
        console.error("Channel not initialized");
        return;
    }

    channel.consume(NotificationClient.queue, async (msg: amqp.Message | null) => {
        if (!msg) return;

        const { message } = JSON.parse(msg.content.toString());
        const { documentId } = JSON.parse(message);

        console.log("Received message:", message);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const status = Math.random() > 0.5 ? 'VERIFIED' : 'FAILED';
        await documentService.update({_id:documentId}, {status});

        channel.ack(msg);
    });
})();
