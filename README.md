# SnapNet Interview Task

## Overview
SnapNet is a project designed to showcase your skills and understanding of modern software development practices. This README provides an overview of the project, its setup, and usage instructions.

## Required tools
- Docker

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/snapnet_interview_task.git
    ```
2. Navigate to the project directory:
    ```bash
    cd snapnet_interview_task
    ```
3. Install the required dependencies:
    ```bash
    npm install
    npm run dev
    ```

## Usage
To run the project, use the following command:

## env
```sh
PORT=3006
EDIS_URL=redis://redis-server:6379
REDIS_PORT=6379
REDIS_UI_PORT=8081

MONGO_URI=mongodb://mongo:27017/documents

RABBITMQ_URL=amqp://rabbitmq:5672
PORT=5000
JWT_SECRET=supersecret
```