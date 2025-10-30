# Iporaitech's web site

This is the static website for iporaitech.com

It's built with Webpack and styled with TailwindCSS.

See webpack.\* files for bundling info.

## Scripts

Install dependencies with `yarn install`

Start development server with `yarn dev`

Build for production with `yarn build:prod`

## Deployment

The deploy process is encoded in the [deploy-all](.github/workflows/deploy-all.yml) GitHub Actions workflow, basically:

- Deploy the AWS infra with Terraform
- Build for production and upload the output to its S3 bucket
- Invalidate CloudFront cache

## AWS Infrastructure

This is and static website hosted in a private S3 bucket and distributed by CloudFront.

For info about the exact resources check the [terraform](./terraform/) directory.

**NOTICE:** The Route53 hosted zone for the `iporaitech.com` domain name is created in this project.

**TODO:** add terraform-docs
