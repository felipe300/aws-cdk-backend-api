AWS CDK Backend API

This repository provides a foundational project for building and deploying a serverless backend API on AWS using the AWS Cloud Development Kit (CDK). It's designed to be a starting point for developing modern, scalable, and cost-effective APIs.

The project uses Infrastructure as Code (IaC) principles, allowing you to define your cloud resources using a familiar programming language, rather than through manual configuration.

✨ Features

- Serverless First: Utilizes AWS Lambda and API Gateway for a fully managed, pay-per-use backend.
- Infrastructure as Code: Defines all AWS resources in TypeScript using AWS CDK.
- Ready for Development: Includes a modular structure for your Lambda functions and CDK stacks.
- Cost-Effective: Scales automatically with demand, so you only pay for what you use.

📋 Prerequisites

Before you can use this project, you'll need to have the following installed and configured:

- Node.js & npm: A recent version of Node.js.
- AWS CLI: Configured with credentials for the AWS account you'll be deploying to.
- AWS CDK Toolkit: The CDK CLI must be installed globally.

```sh
npm install -g aws-cdk
```

🚀 Installation & Deployment

Follow these steps to get the project up and running in your AWS account.

1. Clone the repository

```sh
git clone https://github.com/felipe300/aws-cdk-backend-api.git
cd aws-cdk-backend-api
```

2. Install dependencies

```sh
npm install
```

3. Bootstrap your AWS environment (if this is your first time using CDK in this account/region)

```sh
cdk bootstrap
```

4. Synthesize the CloudFormation template

```sh
cdk synth
```

This command compiles the CDK code into a CloudFormation template.

5. View the differences

```sh
cdk diff
```

This command shows you the infrastructure changes that will be applied.

6. Deploy the stack

```sh
cdk deploy
```

This will provision the AWS resources and deploy your API. After the deployment is complete, the API Gateway endpoint URL will be printed in your terminal.

📂 Project Structure

- `bin/aws-cdk-backend-api.ts`: The main entry point for the CDK application.
- `lib/aws-cdk-backend-api-stack.ts`: Defines the AWS CDK stack, including API Gateway, Lambda functions, and any other resources.
- `src/`: Contains the source code for your Lambda functions.
- `test/`: Unit tests for your CDK stack.

🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have ideas for improvements.
📄 License

This project is licensed under the MIT License.
