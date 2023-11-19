import { MetricDataResult } from "@aws-sdk/client-cloudwatch";


export class MessageLogics {

  static generateDailyDevOpsMessage(metrics: MetricDataResult[]) {
    const transactionDurationsAvg = metrics.find(m => m.Id === 'transactionDurationsAvg')?.Values?.[0];
    const transactionDurationsP50 = metrics.find(m => m.Id === 'transactionDurationsP50')?.Values?.[0];
    const transactionDurationsP95 = metrics.find(m => m.Id === 'transactionDurationsP95')?.Values?.[0];
    const transactionDurationsP99 = metrics.find(m => m.Id === 'transactionDurationsP99')?.Values?.[0];
    const successfulTransactions = metrics.find(m => m.Id === 'numberOfSuccessfulTransactions')?.Values?.[0];
    const failedTransactions = metrics.find(m => m.Id === 'numberOfFailedTransactions')?.Values?.[0];

    // Constructing the message
    let message = `Daily Metrics Report:\n`;
    message += `Average Transaction Duration: ${transactionDurationsAvg?.toFixed(2) ?? 'N/A'} ms\n`;
    message += `Transaction Duration - Median (p50): ${transactionDurationsP50?.toFixed(2) ?? 'N/A'} ms\n`;
    message += `Transaction Duration - 95th Percentile (p95): ${transactionDurationsP95?.toFixed(2) ?? 'N/A'} ms\n`;
    message += `Transaction Duration - 99th Percentile (p99): ${transactionDurationsP99?.toFixed(2) ?? 'N/A'} ms\n`;
    message += `Successful Transactions: ${successfulTransactions ?? 'N/A'}\n`;
    message += `Failed Transactions: ${failedTransactions ?? 'N/A'}\n`;

    return message;
  }

}
