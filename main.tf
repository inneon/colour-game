provider "aws" {
  region = "eu-west-2"
}
module "server" {
  source = "server/terraform"
}