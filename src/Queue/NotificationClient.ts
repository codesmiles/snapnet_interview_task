import amqplib, { Connection, Channel } from "amqplib";

export class NotificationClient {
    private channel: Channel | null = null;
    private connection: Connection | null = null;
    private URI: string;
    public queue: string;

    constructor(queue: string) {
        this.URI = process.env.RABBITMQ_URL as string;
        this.queue = queue;
    }

    public async connect() {
        try {
            this.connection = await amqplib.connect(this.URI);
            this.channel = await (this.connection as any).createChannel() as Channel;

            await this.channel.assertQueue(this.queue, { durable: false });

            console.log("Connected to RabbitMQ successfully!");
        } catch (error) {
            console.log("Failed to connect to RabbitMQ:", error);
        }
    }

    public async sendMessage(message: string) {
        if (!this.channel) {
            console.log("No channel available. Please connect first.");
            return;
        }

        try {
            this.channel.sendToQueue(
                this.queue,
                Buffer.from(JSON.stringify({ message }))
            );
            console.log("Message sent successfully.");
        } catch (error) {
            console.log("Error sending message:", error);
        }
    }
}