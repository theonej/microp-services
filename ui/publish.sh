$(aws ecr get-login --no-include-email)

docker build -t 319304591743.dkr.ecr.us-east-1.amazonaws.com/microp-admin-ui:latest .

docker push 319304591743.dkr.ecr.us-east-1.amazonaws.com/microp-admin-ui:latest