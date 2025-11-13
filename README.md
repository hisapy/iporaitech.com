# iporaitech.com

This is the static website for [iporaitech.com](https://iporaitech.com), styled with TailwindCSS and bundled with Webpack.

> **NOTICE**: Iporaitech is currently out-of-service, but this is a _very simple_ example of how to build an static website _without a framework_, and deploy it to AWS.

It features English/Spanish content by using the `HtmlWebpackPlugin` to generate the `index.html` and the `es/index.html` files based on a [template file](./src/template.html) and [partial content](./src/partials/) embedded in the template for each language.

Caveat: this example does not include tests nor code quality checks.

## Scripts

Install dependencies with `yarn install`

Start development server with `yarn dev`

Build for production with `yarn build:prod`

## AWS Infrastructure

This is an static website hosted in a private S3 bucket and distributed by CloudFront. These and other related resources are provided by the following Terraform modules:

- [terraform-aws-route53-cert](https://github.com/hisapy/terraform-aws-acm-route53-cert)
- [terraform-aws-cloudfront-s3-hosting](https://github.com/hisapy/terraform-aws-cloudfront-s3-hosting)

The AWS account where these resources live is part of an AWS Control Tower landing zone, and it was provisioned using the [aws-afc-terraform-s3-backend-blueprint](https://github.com/hisapy/aws-afc-terraform-s3-backend-blueprint).

For convenience, the **Route53 hosted zone** for the `iporaitech.com` domain name as well as the Google site-verification and Gmail related DNS records are also defined in this repository and are created in the **same AWS account** as the rest of the resources in this repo.

Check the [terraform](./terraform/) directory for more info.

**TODO:** add terraform-docs

### About Route53 and DNS propagation

When you create a Route53 hosted zone for your domain, you have to update the name servers (NS) on the domain's registrar with the NS records assigned to the hosted zone by Route53.

You can use the `dig` command to verify the name servers have been propagated (at least to your location). For example, the following command should return the same NS as the ones shown in the Route53 hosted zone:

`dig NS iporaitech.com +short`

Operations that require Route53 DNS records will timeout if the NS records returned by the DNS query are not the same as the ones in the hosted zone, for example, the ACM certificate validation from the terraform-aws-route53-cert module.

> In my experience, with US and PY based DNS registrars, ACM (us-east-1) was able to validate certificates ~1 hour or so after updating the NS in the registrar ... maybe affected by me running `dig` from my side to get the expected CNAME answer (?) 🤔.

### About the DomainKeys Identified Mail (DKIM) DNS record

## Deployment

The deploy process is encoded in the [Build and deploy](.github/workflows/deploy.yml) GitHub Actions workflow, basically:

TODOOOO: Link deploy.yml to the blueprint repo's README

- Deploy the AWS infra with Terraform
- Build for production
- Upload the build output to its S3 bucket
- Invalidate CloudFront cache
