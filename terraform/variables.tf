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

