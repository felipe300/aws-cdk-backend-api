import { APIGatewayProxyEventV2 } from "aws-lambda";

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

export const createProfileRoute = async (event: APIGatewayProxyEventV2) => {
  console.log("TEMP POST Event", event);
  const body = JSON.parse(event.body ?? "{}");
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Profile created successfully",
      username: body.username,
    }),
  };
};
