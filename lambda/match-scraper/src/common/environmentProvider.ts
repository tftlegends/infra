import { SSM } from "aws-sdk";

export default class EnvironmentProvider {
  static ssm = new SSM();

  static async get(variableName: string) {
    if (process.env[variableName]) {
      return process.env[variableName];
    } else {
      const parameter = await EnvironmentProvider.ssm.getParameter({ Name: variableName, WithDecryption: true }).promise()
      if (parameter.Parameter?.Type === 'StringList' && parameter.Parameter.Value) {
        const listValue = parameter.Parameter.Value.split(',')
        console.log(`${variableName} with type ${parameter.Parameter?.Type} has value ${listValue}`);
        return listValue;
      } else {
        console.log(`${variableName} with type ${parameter.Parameter?.Type} has value ${parameter.Parameter?.Value}`)
        return parameter.Parameter?.Value || ''
      }

    }
  }
}
