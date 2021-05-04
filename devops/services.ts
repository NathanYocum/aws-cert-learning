import { readFileSync } from "fs";
import * as Handlebars from "handlebars";

interface AWSService {
  name: string;
  faq: string[];
  description: string;
}

const services: AWSService[] = [
  {
    name: "CodeCommit",
    description: "Github but in AWS",
    faq: ["https://aws.amazon.com/codecommit/faqs/"],
  },
  {
    name: "CodeBuild",
    description: "Build and test code in containers",
    faq: ["https://aws.amazon.com/codebuild/faqs/"],
  },
  {
    name: "CodeDeploy",
    description: "automate deployments of EC2, Lambda functions, and more",
    faq: ["https://aws.amazon.com/codedeploy/faqs/"],
  },
  {
    name: "CodePipeline",
    description: "automate actions inside of stages to deploy code",
    faq: ["https://aws.amazon.com/codepipeline/faqs/"],
  },
  {
    name: "CloudFormation",
    description:
      "infrastructure configuration to make infrastructure repeatable",
    faq: ["https://aws.amazon.com/cloudformation/faqs/"],
  },
  {
    name: "Elastic Beanstalk",
    description:
      "automatically handles provisioning, load-balancing, scaling, and application health",
    faq: ["https://aws.amazon.com/elasticbeanstalk/faqs/"],
  },
  {
    name: "AWS Config",
    description:
      "resource inventory to assist with compliance, security, and governance",
    faq: ["https://aws.amazon.com/config/faq/"],
  },
  {
    name: "ECS",
    description: "supports docker images on EC2 instances",
    faq: ["https://aws.amazon.com/ecs/faqs/"],
  },
  {
    name: "EKS",
    description: "aws k8s",
    faq: ["https://aws.amazon.com/eks/faqs/"],
  },
  {
    name: "ECR",
    description: "repositories of built docker containers",
    faq: ["https://aws.amazon.com/ecr/faqs/"],
  },
  {
    name: "Fargate",
    description: "serverless containers using ECS / EKS",
    faq: ["https://aws.amazon.com/fargate/faqs/"],
  },
  {
    name: "Managed Services",
    // is this accurate?
    description: "run third party services in AWS",
    faq: ["https://aws.amazon.com/managed-services/faqs/"],
  },
  {
    name: "Lambda",
    description: "run stateless code on demand without managing servers",
    faq: ["https://aws.amazon.com/lambda/faqs/"],
  },
  {
    name: "OpsWorks",
    description: "configuration management for servers",
    faq: [
      "https://aws.amazon.com/opsworks/faqs/",
      "https://aws.amazon.com/opsworks/stacks/faqs",
      "https://aws.amazon.com/opsworks/puppetenterprise/faqs",
    ],
  },
  {
    name: "CloudWatch",
    description: "logging and metrics for AWS resources",
    faq: ["https://aws.amazon.com/cloudwatch/faqs/"],
  },
  {
    name: "XRay",
    description: "debugging and logging for AWS resources",
    faq: ["https://aws.amazon.com/xray/faqs/"],
  },
  {
    name: "Service Catalog",
    description: "allow products to use a porfolio of services",
    faq: ["https://aws.amazon.com/servicecatalog/faqs/"],
  },
  {
    name: "Trusted Advisor",
    description: "tool to help with billing management",
    // faq for trusted advisor is premium support
    faq: ["https://aws.amazon.com/premiumsupport/faqs/"],
  },
  {
    name: "Systems Manager",
    description: "parameter store and task automator",
    faq: ["https://aws.amazon.com/systems-manager/faq/"],
  },
  {
    name: "Organizations",
    description: "centralized management for AWS accounts",
    faq: ["https://aws.amazon.com/organizations/faqs/"],
  },
  {
    name: "Secrets Manager",
    description: "service to store and rotate passwords",
    faq: ["https://aws.amazon.com/secrets-manager/faqs/"],
  },
  {
    name: "Macie",
    description: "PII identification and protection service",
    faq: ["https://aws.amazon.com/macie/faq/"],
  },
  {
    name: "Certificate Manager",
    description: "manage SSL/TLS certifications",
    faq: ["https://aws.amazon.com/certificate-manager/faqs/"],
  },
  {
    name: "GuardDuty",
    description: "threat detection and alarming for AWS accounts",
    faq: ["https://aws.amazon.com/guardduty/faqs/"],
  },
  {
    name: "Inspector",
    description: "EC2 security analysis",
    faq: ["https://aws.amazon.com/inspector/faqs/"],
  },
  {
    name: "Kinesis",
    description: "stream/event ingestion and analytics",
    faq: [
      "https://aws.amazon.com/kinesis/video-streams/faqs",
      "https://aws.amazon.com/kinesis/data-streams/faqs/",
      "https://aws.amazon.com/kinesis/data-firehose/faqs",
      "https://aws.amazon.com/kinesis/data-analytics/faqs",
    ],
  },
  {
    name: "SSO",
    description:
      "AWS single sign on service for multiple accounts and applications",
    faq: ["https://aws.amazon.com/single-sign-on/faqs/"],
  },
  {
    name: "CloudFront",
    description: "distribute content over http",
    faq: ["https://aws.amazon.com/cloudfront/faqs/"],
  },
  {
    name: "Route53",
    description: "AWS DNS service",
    faq: ["https://aws.amazon.com/route53/faqs/"],
  },
  {
    name: "RDS",
    description: "AWS releational database managed service",
    faq: ["https://aws.amazon.com/rds/faqs/"],
  },
  {
    name: "Aurora",
    description: "Postgres/mysql compliant rds engine",
    faq: ["https://aws.amazon.com/aurora/faqs/"],
  },
  {
    name: "DynamoDB",
    description: "NoSQL serverless database ",
    faq: ["https://aws.amazon.com/dynamodb/faqs/"],
  },
  {
    name: "EFS",
    description: "file system for compute (ec2, eks, lambda, etc)",
    faq: ["https://aws.amazon.com/efs/faq/"],
  },
  {
    name: "EBS",
    description: "file system for ec2",
    faq: ["https://aws.amazon.com/ebs/faqs/"],
  },
  {
    name: "Elasicache",
    description: "memcached or redis compliant caching in the cloud",
    faq: ["https://aws.amazon.com/elasticache/faqs/"],
  },
  {
    name: "Elasticsearch Service",
    description:
      "ELK (elasticsearch, logstask, kibana) stack deployment, operations, and scaling service",
    faq: ["https://aws.amazon.com/elasticsearch-service/faqs/"],
  },
  {
    name: "Server Migration Service",
    description: "run server migrations in AWS",
    faq: ["https://aws.amazon.com/server-migration-service/faqs/"],
  },
  {
    name: "CloudSearch",
    description: "aws service for application search",
    faq: ["https://aws.amazon.com/cloudsearch/faqs/"],
  },
  {
    name: "Step Functions",
    description: "lambda functions stitched together with state",
    faq: ["https://aws.amazon.com/step-functions/faqs/"],
  },
  {
    name: "DMS",
    description:
      "service to migrate databases into an AWS db engine (aurora or DDB for example)",
    faq: ["https://aws.amazon.com/dms/faqs"],
  },
];

const source = readFileSync("./README.template.md", { encoding: "utf-8" });
const template = Handlebars.compile(source);
console.log(template({services}));
