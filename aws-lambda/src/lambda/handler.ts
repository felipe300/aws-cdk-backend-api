export const lambdaFunction = async (event: any) => {
  console.log("TEMP event log!", event);
  return {
    message: "Hello World Lambda",
  };
};
