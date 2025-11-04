variable "aws_region" {
  type        = string
  description = "AWS region for resources"
  default     = "us-east-1"
}

variable "project" {
  type        = string
  description = "Name of the project in lowercase without spaces, e.g., myproject"
  default     = "iporaitech"
}

variable "env" {
  type        = string
  description = "Deploy environment, e.g., prod, dev"
}

variable "root_domain" {
  type        = string
  description = "Route 53 hosted zone and domain name"
  default     = "iporaitech.com"
}

variable "dns_google_site_verification_txt" {
  type        = string
  description = "DNS TXT record to prove ownership of a Google Workspace domain"
}

# See https://support.google.com/a/answer/33786
variable "dns_spf_txt" {
  type        = string
  description = "DNS TXT record to set up Sender Policy Framework (SPF)"
  default     = "v=spf1 include:_spf.google.com ~all"
}

# These are legacy MX records
# See: https://support.google.com/a/answer/16004259
variable "dns_mx_records" {
  type        = list(string)
  description = "DNS MX records for Gmail"
  default = [
    "1 ASPMX.L.GOOGLE.COM",
    "5 ALT1.ASPMX.L.GOOGLE.COM",
    "5 ALT2.ASPMX.L.GOOGLE.COM",
    "10 ALT3.ASPMX.L.GOOGLE.COM",
    "10 ALT4.ASPMX.L.GOOGLE.COM"
  ]
}
variable "dns_mx_ttl" {
  type    = number
  default = 3600
}

variable "dns_dkim_selector" {
  type        = string
  description = "DKIM selector, issued by the email service provider"
  default     = "google"
}
variable "dns_dkim_txt" {
  type        = string
  description = "DNS TXT value for the DKIM record"
}
variable "dns_dkim_ttl" {
  type    = number
  default = 300
}


