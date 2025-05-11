provider "aws" {
  region = "us-east-1"
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  cluster_name = "my-cluster"
  subnets      = ["subnet-abc", "subnet-def"]
  vpc_id       = "vpc-xyz"
  
  node_groups = {
    default = {
      desired_capacity = 2
      max_capacity     = 3
      min_capacity     = 1
      instance_type    = "t3.medium"
    }
  }
}

