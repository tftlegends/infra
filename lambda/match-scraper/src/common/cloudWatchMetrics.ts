import { CloudWatchClient, PutMetricDataCommand, ListMetricsCommand } from "@aws-sdk/client-cloudwatch";
import { METRIC_NAMESPACE, SERVICE_NAME } from "@/domain/constants/aws";
import { Metrics } from "@/domain/enums/metrics";

export interface CloudWatchMetricsConfig {
  region: string | undefined
  awsAccessKeyId: string | undefined;
  awsSecretAccessKey: string | undefined;
}

export class CloudWatchMetrics {
  private readonly client: CloudWatchClient;

  constructor() {
    this.client = new CloudWatchClient();
    const command = new ListMetricsCommand({
      Namespace: METRIC_NAMESPACE, MetricName: Metrics.TRANSACTION_DURATIONS
    })
    this.client.send(command).then(() => {
      console.info('CloudWatch client initialized successfully');
    }).catch((error) => {
      console.error('CloudWatch client failed to initialize', error);
      throw error;
    });
  }

  sendDurationMetric(metricName: string, duration: number) {
    const command = new PutMetricDataCommand({
      MetricData: [{
        MetricName: metricName, Dimensions: [{
          Name: 'Key Performance Indicator', Value: 'True'
        }, { Name: 'Service Name', Value: SERVICE_NAME }], Unit: 'Milliseconds', Value: duration,
      },], Namespace: METRIC_NAMESPACE,
    });
    return this.client.send(command);
  }

  sendCountMetric(metricName: string, count: number = 1) {
    const command = new PutMetricDataCommand({
      MetricData: [{
        MetricName: metricName, Dimensions: [{
          Name: 'Key Performance Indicator', Value: 'True'
        }, { Name: 'Service Name', Value: SERVICE_NAME }], Unit: 'Count', Value: count,
      },], Namespace: METRIC_NAMESPACE,
    });
    return this.client.send(command);
  }

}
