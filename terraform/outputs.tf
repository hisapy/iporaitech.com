output "s3_bucket_name" {
  value       = module.static_website.s3_bucket_name
  description = "Name of the S3 bucket used for the site"
}

output "cloudfront_dist_domain_name" {
  value       = module.static_website.cloudfront_dist_domain_name
  description = "CloudFront distribution domain name"
}

output "cloudfront_dist_id" {
  value       = module.static_website.cloudfront_dist_id
  description = "CloudFront distribution id"
}

# output "name_servers" {
#   value       = aws_route53_zone.this.name_servers
#   description = "Update the NS registrar to point to these NS"
# }
