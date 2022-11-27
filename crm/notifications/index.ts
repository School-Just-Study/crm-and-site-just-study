import { SendMessageProps } from './types';

const AWS = require('aws-sdk');

const mq = new AWS.SQS({
    region: 'ru-central1',
    endpoint: 'https://message-queue.api.cloud.yandex.net'
});

export const sendMessage = async (config: SendMessageProps) => {
    const email = process.env.TEST_EMAIL === 'true' ? 'pucks.favours-0f@icloud.com' : config.email;

    if (process.env.TEST_EMAIL === 'true') {
        console.debug('sendMessage for', config.email);
    }

    const params = {
        QueueUrl: 'https://message-queue.api.cloud.yandex.net/b1g5ik20auf4ic3fvnl6/dj600000000a9l4g001g/notification',
        MessageBody: JSON.stringify({ ...config, email })
    };

    return mq.sendMessage(params).promise();
};
