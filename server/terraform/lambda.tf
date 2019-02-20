resource "aws_iam_role" "orientation_logger_role" {
  name = "orientation_logger_role"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF
  tags = {
    Creator = "jmwright"
  }
}

resource "aws_iam_policy" "orientation_logger_policy" {
  name = "orientation_logger_policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Action": [
              "logs:CreateLogGroup",
              "logs:CreateLogStream",
              "logs:PutLogEvents"
          ],
          "Resource": "*"
      },
      {
          "Effect": "Allow",
          "Action": [
            "dynamodb:PutItem"
          ],
          "Resource": ["${aws_dynamodb_table.orientations.arn}"]
      }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "orientation_logger_policy_attach" {
  role       = "${aws_iam_role.orientation_logger_role.name}"
  policy_arn = "${aws_iam_policy.orientation_logger_policy.arn}"
}

resource "aws_lambda_function" "orientation_logger_lambda" {
  function_name = "orientation_logger"
  filename      = "${data.archive_file.write.output_path}"

  source_code_hash = "${base64sha256(data.archive_file.write.output_path)}"
  handler          = "writeOrientationToDb.handler"
  role             = "${aws_iam_role.orientation_logger_role.arn}"
  runtime          = "nodejs8.10"

  environment {
    variables = {
      TABLENAME = "${aws_dynamodb_table.orientations.name}"
    }
  }

  tags = {
    Creator = "jmwright"
  }
}

# {
#   "path": "/ride",
#   "httpMethod": "POST",
#   "headers": {
#     "Accept": "*/*",
#     "Authorization": "eyJraWQiOiJLTzRVMWZs",
#     "content-type": "application/json; charset=UTF-8"
#   },
#   "queryStringParameters": null,
#   "pathParameters": null,
#   "requestContext": {
#     "authorizer": {
#       "claims": {
#         "cognito:username": "the_username"
#       }
#     }
#   },
#   "body": "{\"alpha\":\"0\", \"beta\":\"0.5\", \"gamma\": \"0\", \"timestamp\":\"20190220 103200\"}"
# }

data "archive_file" "write" {
  type        = "zip"
  source_file = "server/src/writeOrientationToDb.js"
  output_path = "server/dist/writeOrientationToDb.zip"
}