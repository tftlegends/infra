import { CloudWatchClient, GetMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Context, Handler } from 'aws-lambda';
import { SERVICE_NAME } from "@/domain/constants/aws";
import { Dimensions } from "@/domain/enums/dimensions";
import { MessageLogics } from "@/logics/messageLogics";

const cloudWatchClient = new CloudWatchClient();

const sqsClient = new SQSClient();
const Period = 60 * 60 * 24;

export const handler: Handler = async (event: unknown, context: unknown, callback: unknown): Promise<unknown> => {
  try {
    const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL || '';
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    const metrics = await fetchMetrics(startTime, endTime);
    if (!metrics) {
      return { statusCode: 500, body: JSON.stringify({ message: 'Metrics cannot be fetched.' }) };
    }

    const message = MessageLogics.generateDailyDevOpsMessage(metrics);

    const messageBody = {
      message: message,
    };

    const command = new SendMessageCommand({
      QueueUrl: SQS_QUEUE_URL, MessageBody: JSON.stringify(messageBody),
    });

    await sqsClient.send(command);

    return { statusCode: 200, body: JSON.stringify(metrics) };
  } catch (error) {
    console.error('Error: ' + error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error occurred' }) };
  }
};

async function fetchMetrics(startTime: Date, endTime: Date) {

  //

  const queries = [{
    Id: 'transactionDurationsAvg', MetricStat: {
      Metric: {
        Namespace: 'TFTLegendsMatchScraper',
        MetricName: 'TransactionDurations',
        Dimensions: [{ Name: Dimensions.KEY_PERFORMANCE_INDICATOR, Value: 'True' }, {
          Name: Dimensions.SERVICE_NAME,
          Value: SERVICE_NAME
        }],
      }, Period,
      Stat: 'Average',
    }, ReturnData: true,
  }, {
    Id: 'transactionDurationsP50', MetricStat: {
      Metric: {
        Namespace: 'TFTLegendsMatchScraper',
        MetricName: 'TransactionDurations',
        Dimensions: [{ Name: Dimensions.KEY_PERFORMANCE_INDICATOR, Value: 'True' }, {
          Name: Dimensions.SERVICE_NAME,
          Value: SERVICE_NAME
        }],
      }, Period, Stat: 'p50',
    }, ReturnData: true,
  }, {
    Id: 'transactionDurationsP95', MetricStat: {
      Metric: {
        Namespace: 'TFTLegendsMatchScraper',
        MetricName: 'TransactionDurations',
        Dimensions: [{ Name: Dimensions.KEY_PERFORMANCE_INDICATOR, Value: 'True' }, {
          Name: Dimensions.SERVICE_NAME,
          Value: 'tft-legends-match-scraper'
        }],
      }, Period, Stat: 'p95',
    }, ReturnData: true,
  }, {
    Id: 'transactionDurationsP99', MetricStat: {
      Metric: {
        Namespace: 'TFTLegendsMatchScraper',
        MetricName: 'TransactionDurations',
        Dimensions: [{ Name: Dimensions.KEY_PERFORMANCE_INDICATOR, Value: 'True' }, {
          Name: Dimensions.SERVICE_NAME,
          Value: 'tft-legends-match-scraper'
        }],
      }, Period, Stat: 'p99',
    }, ReturnData: true,
  }, {
    Id: 'numberOfSuccessfulTransactions', MetricStat: {
      Metric: {
        Namespace: 'TFTLegendsMatchScraper',
        MetricName: 'SuccessfulTransactions',
        Dimensions: [{ Name: Dimensions.KEY_PERFORMANCE_INDICATOR, Value: 'True' }, {
          Name: Dimensions.SERVICE_NAME,
          Value: SERVICE_NAME
        }],
      }, Period, Stat: 'Sum',
    }, ReturnData: true,
  }, {
    Id: 'numberOfFailedTransactions', MetricStat: {
      Metric: {
        Namespace: 'TFTLegendsMatchScraper',
        MetricName: 'FailedTransactions',
        Dimensions: [{ Name: Dimensions.KEY_PERFORMANCE_INDICATOR, Value: 'True' }, {
          Name: Dimensions.SERVICE_NAME,
          Value: SERVICE_NAME
        }],
      }, Period, Stat: 'Sum',
    }, ReturnData: true,
  }];

  const command = new GetMetricDataCommand({
    StartTime: startTime, EndTime: endTime, MetricDataQueries: queries,
  });

  const data = await cloudWatchClient.send(command);

  return data.MetricDataResults;
}
