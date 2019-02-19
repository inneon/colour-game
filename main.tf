provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "front_end" {
  bucket = "colourspinner"
  acl    = "public-read"
  force_destroy = true
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
    ],
      "Resource": [
      "arn:aws:s3:::colourspinner/*"
    ]
    }
  ]
}
EOF

  website {
    index_document = "index.html"
  }
  versioning {
    enabled = true
  }
  tags = {
    Creator = "jmwright"
  }
}

resource "aws_s3_bucket_object" "index" {
  bucket = "${aws_s3_bucket.front_end.id}"
  key    = "index.html"
  source = ".\\dist\\index.html"
  content_type = "text/html"
  etag   = "${md5(file(".\\dist\\index.html"))}"

  tags = {
    Creator = "jmwright"
  }
}

resource "aws_s3_bucket_object" "app" {
  bucket = "${aws_s3_bucket.front_end.id}"
  key    = "main.js"
  source = ".\\dist\\main.js"
  content_type = "application/javascript"
  etag   = "${md5(file(".\\dist\\main.js"))}"
  
  tags = {
    Creator = "jmwright"
  }
}
