# Hosting a React App on AWS EC2 using `build` and `serve`

This guide will walk you through deploying your React app on an AWS EC2 instance using the `build` folder and the `serve` package to serve the static files.

## Prerequisites

- An AWS EC2 instance running Ubuntu (or any other Linux distribution).
- SSH access to the EC2 instance.
- Node.js installed on the EC2 instance.
- Your React app ready for deployment (created with `create-react-app` or any other setup).

## Step-by-Step Guide

### 1. SSH into your EC2 Instance

First, you need to SSH into your EC2 instance. Use the following command, replacing `your-key.pem` with your private key and `your-ec2-ip` with your EC2 instance's public IP address.

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip


# Update package list
sudo apt update

# Install Node.js (example: version 16)
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v

sudo npm install -g serve

npm run build

scp -i your-key.pem -r ./build ubuntu@your-ec2-ip:/home/ubuntu/

cd /home/ubuntu/build

serve -s .

http://your-ec2-ip:5000
