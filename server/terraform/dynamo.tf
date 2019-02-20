resource "aws_dynamodb_table" "orientations" {
  name         = "Orientations"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute = [
    {
      name = "id"
      type = "S"
    }
  ]

  tags = {
    Creator = "jmwright"
  }
}
