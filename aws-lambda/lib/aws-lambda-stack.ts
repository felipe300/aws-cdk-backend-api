import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "node:path";

import * as apigateway from "aws-cdk-lib/aws-apigatewayv2";
import * as apigateway_integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";

export class AwsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const newLambda = new NodejsFunction(this, "LambdaHandler", {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, "../src/lambda/handler.ts"),
      handler: "lambdaFunction",
      functionName: `${this.stackName}-cdk-lambda`,
    });

    new cdk.CfnOutput(this, "lambdaFunctionArn", {
      value: newLambda.functionArn,
      description: "The ARN of this lambda function",
    });

    const homeLambda = new NodejsFunction(this, "HomeLambda", {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, "../src/lambda/handler.ts"),
      handler: "homeRoute",
      functionName: `${this.stackName}-home-route-lambda`,
    });

    const httpAPI = new apigateway.HttpApi(this, "HttpApi", {
      apiName: "HttpApi",
      description: "HTTP API with AWS CDK",
      // for this test project this permissions are 'ok'
      // but not for production
      corsPreflight: {
        allowOrigins: ["*"],
        allowMethods: [apigateway.CorsHttpMethod.ANY],
        allowHeaders: ["*"],
      },
    });

    httpAPI.addRoutes({
      path: "/",
      methods: [apigateway.HttpMethod.GET],
      integration: new apigateway_integrations.HttpLambdaIntegration(
        "HomeIntegration",
        homeLambda,
      ),
    });

    new cdk.CfnOutput(this, "HttpAPIArn", {
      value: httpAPI.url!,
      description: "The ARN of this HTTP API URL",
    });

    // Profile Handler
    const createProfileLambda = new NodejsFunction(this, "ProfileHandler", {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, "../src/lambda/handler.ts"),
      handler: "createProfileRoute",
      functionName: `${this.stackName}-profile-lambda`,
    });

    httpAPI.addRoutes({
      path: "/profile",
      methods: [apigateway.HttpMethod.POST],
      integration: new apigateway_integrations.HttpLambdaIntegration(
        "ProfileIntegration",
        createProfileLambda,
      ),
    });

    // Welcome Handler
    const welcomeLambda = new NodejsFunction(this, "WelcomeHandler", {
      runtime: lambda.Runtime.NODEJS_22_X,
      entry: path.join(__dirname, "../src/lambda/handler.ts"),
      handler: "welcomeRoute",
      functionName: `${this.stackName}-welcome-lambda`,
      environment: {
        USERNAME: "Felipe Moises",
      },
    });

    // welcomeLambda.addEnvironment("USERNAME", "Merry");

    httpAPI.addRoutes({
      path: "/welcome",
      methods: [apigateway.HttpMethod.GET],
      integration: new apigateway_integrations.HttpLambdaIntegration(
        "ProfileIntegration",
        welcomeLambda,
      ),
    });
  }
}
