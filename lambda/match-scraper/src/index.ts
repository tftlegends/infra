import { handler } from "@/main";
import { config } from 'dotenv'
config();
const sqsEvent = {
  "Records": [
    {
      "messageId": "unique-message-id-1234",
      "receiptHandle": "receipt-handle-abc-123",
      "body": "{\"username\": \"exampleUser\"}",
      "attributes": {
        "ApproximateReceiveCount": "1",
        "SentTimestamp": "1588360698852",
        "SenderId": "sender-id-123",
        "ApproximateFirstReceiveTimestamp": "1588360698859"
      },
      "messageAttributes": {},
      "md5OfBody": "md5-hash-of-body-123",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:region:account-id:queue-name",
      "awsRegion": "us-east-1"
    }
  ]
};
handler(sqsEvent,{});
