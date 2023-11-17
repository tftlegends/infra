import { SSM } from "aws-sdk";

export default class EnvironmentProvider {
  static ssm = new SSM();

  static async get(variableName: string) {
    if (process.env[variableName]) {
      return process.env[variableName];
    } else {
      try {
        const parameter = await EnvironmentProvider.ssm.getParameter({
          Name: variableName,
          WithDecryption: true
        }).promise()
        return parameter.Parameter?.Type === 'StringList' && parameter.Parameter.Value ? parameter.Parameter.Value.split(',') : parameter.Parameter?.Value || '';

      } catch {
        console.warn(`Error while fetching variable with name ${variableName} not found in SSM: ${process.env.AWS_DEFAULT_REGION}`);
        return '';
      }

    }
  }
}
