terraform {
  required_version = "1.13.3"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.15"
    }
  }

  backend "s3" {
    # Partial config for the S3 backend, bucket and region 
    # should be specified when calling terraform init. e.g.,
    # terraform init -backend-config="bucket=myapp-tfbackend" -backend-config="region=us-east-1"
    key          = "terraform.tfstate"
    use_lockfile = true
    encrypt      = true
  }
}
