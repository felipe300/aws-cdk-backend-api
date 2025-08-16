import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "node:path";

export class AwsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const newLambda = new NodejsFunction(this, "LambdaHandler", {
      // NODEJS requires the use of esbuild to transform the code
      // SO run `npm i esbuild`
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, "../src/lambda/handler.ts"),
      handler: "lambdaFunction", // this has to match exactly the name of your handler function
      functionName: `${this.stackName}-cdk-lambda`, // To avoid repetitive names or LogGroup names
    });

    new cdk.CfnOutput(this, "lambdaFunctionArn", {
      value: newLambda.functionArn,
      description: "The ARN of this lambda function",
    });
  }
}
