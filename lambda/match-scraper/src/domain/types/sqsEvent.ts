export interface SQSEventRecord {
  messageId: string;
  receiptHandle: string;
  body: string;
  attributes: {
    ApproximateReceiveCount: string;
    SentTimestamp: string;
    SenderId: string;
    ApproximateFirstReceiveTimestamp: string;
  };
  messageAttributes: {[key: string]: string};
  md5OfBody: string;
  eventSource: string;
  eventSourceARN: string;
  awsRegion: string;
}


export interface SQSEvent {
  Records: SQSEventRecord[];
}
