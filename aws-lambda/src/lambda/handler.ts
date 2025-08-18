import { APIGatewayProxyEventV2 } from "aws-lambda";

// You need to install @tyles/aws-lambda for "event"
// SO run `npm install -D @types/aws-lambda`
export const lambdaFunction = async (event: any) => {
  console.log("TEMP event log!", event);
  return {
    message: "Hello World Lambda",
  };
};

export const homeRoute = async (event: APIGatewayProxyEventV2) => {
  console.log("Home Route Event Log", event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World HTTP API",
    }),
  };
};
