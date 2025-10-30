# AWS infra for iporaitech.com static website (CloudFront+S3)

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = var.project
      Environment = var.env
    }
  }
}

# resource "aws_route53_zone" "this" {
#   name    = var.root_domain
#   comment = "Hosted zone for ${var.project}"

#   lifecycle {
#     prevent_destroy = true
#   }
# }

# module "dns_cert" {
#   source = "git::https://github.com/hisapy/terraform-aws-acm-route53-cert.git?ref=v0.0.1"

#   route53_zone_id = aws_route53_zone.this.zone_id
#   root_domain     = var.root_domain
#   subdomains      = ["www"]
# }

# resource "aws_cloudfront_function" "request_handler" {
#   name    = "static_web_request_handler"
#   runtime = "cloudfront-js-2.0"
#   comment = "Redirect root domain requests to www and handle /es requests"
#   code    = file("${path.module}/cdn_request_handler.js")
# }

module "static_website" {
  source = "git::https://github.com/hisapy/terraform-aws-cloudfront-s3-hosting.git?ref=v0.0.4"

  project = var.project
  env     = var.env

  # cdn_aliases     = module.dns_cert.names
  # acm_cert_arn    = module.dns_cert.acm_cert_arn
  # route53_zone_id = aws_route53_zone.this.zone_id

  # function_association = [{
  #   event_type   = "viewer-request"
  #   function_arn = aws_cloudfront_function.request_handler.arn
  # }]
}

