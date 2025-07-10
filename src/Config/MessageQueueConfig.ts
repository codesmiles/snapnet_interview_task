import amqp from "amqplib";
// import serverConfig from "../configs/server.config";

class NotificationClient {
    private channel: amqp.Channel | null = null;
    private connection: amqp.Connection | null = null;
    private URI: string;
    public queue: string;

    constructor() {
        this.URI = serverConfig.RABBITMQ_URL;
        this.queue = "messages";
    }

    // Connect to RabbitMQ server and create a channel
    public async connect() {
        try {
            this.connection = await amqp.connect(this.URI);
            this.channel = await this.connection.createChannel();

            // Make sure the queue exists
            await this.channel.assertQueue(this.queue, { durable: false });

            console.log("Connected to RabbitMQ successfully!");
        } catch (error) {
            console.log("Failed to connect to RabbitMQ:", error);
        }
    }

    // Send a message to the queue
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

export default new NotificationClient();