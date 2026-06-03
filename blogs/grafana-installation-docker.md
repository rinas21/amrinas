---
title: "Grafana Installation on Ubuntu using Docker"
author: "A.M.Rinas"
date: "2026-06-03"
category: "DevOps"
image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiMPszwNzpEZyn0_ODpDhD_mlezoXLXhLJl8BjDmzrxj05lFHUCdKdaIG0iC4n8A8kwEKKegKvUU9g7hM2KgNseJcnsoYGIAhyTJcnICoIYBlPAIc-bza47IsNu5pRUATbJMdkuFt37kTXtd4P4fz-1N46sOTYMjsAPyGDZXGMpqOL7-cYJsmPH10S8/s320/Grafana.png"
excerpt: "A guide on installing Grafana OSS on Ubuntu using Docker."
---

# Grafana Installation on Ubuntu using Docker

### Aim :
Install Grafana OSS (open-source version) on Ubuntu using Docker.

## Grafana Installation Steps

### Step 1: Pull and Run the Grafana Container
- Pull and start the Grafana container:
  ```bash
  sudo docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
  ```
  - `-d`: Detaches the container and runs it in the background.
  - `-p 3000:3000`: Maps port 3000 on your host machine to port 3000 inside the container, enabling access to Grafana's web interface.
  - `--name=grafana`: Specifies the name of the container as `grafana`.

### Step 2: Access Grafana
- Once the container is running, access Grafana by opening a web browser and navigating to:
  ```text
  http://localhost:3000
  ```
  If Grafana is running on a remote server or different IP, replace `localhost` with the server's IP or hostname.

### Step 3: Initial Setup
- On the first visit, you'll be prompted to:
  - Set up an admin password (default username: `admin`).
  - Configure data sources and dashboards as needed.

### Step 4: Change Admin Password
- After logging in with the default credentials:
  - Click on the user icon in the lower-left corner, then select "Admin" to access the Admin menu.
  - Go to "Profile" and then "Change password" to update the admin password.

### Useful Grafana and Docker Commands
- **Grafana Commands:**
  - Restart Grafana container:
    ```bash
    sudo docker restart grafana
    ```
  - View logs of Grafana container:
    ```bash
    sudo docker logs grafana
    ```
- **Docker Commands:**
  - List all running containers:
    ```bash
    sudo docker ps
    ```
  - Stop and remove Grafana container:
    ```bash
    sudo docker stop grafana
    sudo docker rm grafana
    ```
  - Clean up unused Docker resources (containers, images, networks):
    ```bash
    sudo docker system prune
    ```
