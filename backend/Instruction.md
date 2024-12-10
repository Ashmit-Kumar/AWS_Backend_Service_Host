# Hosting Express Backend on AWS EC2

This guide explains how to deploy your **Express.js** backend on an **AWS EC2** instance.

## Prerequisites

- **AWS Account**: Create one [here](https://aws.amazon.com/).
- **SSH Key Pair**: Used to access the EC2 instance.
- **Express Application**: Your backend app (hosted on GitHub or locally).

---

## Step 1: Launch an EC2 Instance

1. **Log into AWS Console** and navigate to **EC2**.
2. **Launch Instance**:
   - Select **Ubuntu 20.04 LTS** AMI.
   - Choose **t2.micro** (free tier).
   - Configure Security Group: Open ports **22 (SSH)**, **80 (HTTP)**, and **5000** (for Express).
3. **Access EC2**:
   - Use SSH: `ssh -i your-key.pem ubuntu@your-ec2-ip`.

---

## Step 2: Set Up Your EC2 Instance

1. **Update and Install Dependencies**:

    ```bash
    sudo apt update && sudo apt install -y curl git build-essential
    ```

2. **Install Node.js**:

    ```bash
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt install -y nodejs
    ```

3. **Clone Your App** (or upload it):

    ```bash
    git clone https://github.com/your-username/express-app.git
    cd express-app
    npm install
    ```

4. **Set Up Environment Variables**:

    ```bash
    nano .env
    ```

    Add variables like `MONGO_URI` and `PORT`.

---

## Step 3: Run the App

1. **Start the Express app**:

    ```bash
    npm start
    ```

2. **Access via Browser**: `http://your-ec2-ip:5000`

---

## Step 4: Optional Setup (Nginx & PM2)

1. **Install Nginx** (for reverse proxy):

    ```bash
    sudo apt install nginx
    ```

2. **Configure Reverse Proxy**:

    ```nginx
    server {
        listen 80;
        server_name your-ec2-ip;
        location / {
            proxy_pass http://localhost:5000;
        }
    }
    ```

3. **Install PM2** (for app persistence):

    ```bash
    sudo npm install -g pm2
    pm2 start app.js
    pm2 save
    ```

---

## Conclusion

Your **Express.js** app is now deployed on **AWS EC2** and accessible via the public IP. Optionally, use Nginx and PM2 for better performance and reliability.

---

## License

MIT License
