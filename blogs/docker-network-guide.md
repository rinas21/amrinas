---
title: "How to Create a Docker Network"
author: "A.M.Rinas"
date: "2026-06-03"
category: "DevOps"
image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiPQTDSVe4KOLziRki_y-goieDE_lXZAm1158ffmdSAQ6eu8jJ7YhZsJZ80qUfSjhEbgzw2YYFx1CGjPSvNHMLxAN5uoHadkmCFxfLLQk-kQhvNMrqKo-kuZg03MjZUZXESUWrgv-d_sWyzv8vUpVylhBGFEHgghbRy8lzV_W1rPLLGj_oHE-im725k/s320/Untitled-2024-10-07-1905%20%281%29.png"
excerpt: "A guide on creating Docker networks to allow containers to communicate securely."
---

# How to Create a Docker Network

Creating a Docker network allows containers to communicate with each other while isolating them from external traffic. This is particularly useful for managing services that need to interact within a defined network. Follow these steps to create a Docker network:

### Step 1: Open Your Terminal
Access your terminal or command prompt where Docker is installed.

### Step 2: Create a Docker Network
Use the following command to create a new Docker network:
```bash
docker network create your_network_name
```
Replace `your_network_name` with a name that makes sense for your application.

### Step 3: Verify the Network Creation
You can verify that the network was created successfully by listing all Docker networks:
```bash
docker network ls
```

### Step 4: Connect Containers to the Network
When you run a container, you can connect it to the created network using the `--network` option:
```bash
docker run -d --name your_container_name --network your_network_name your_image_name
```
Replace `your_container_name` with the desired name for your container, and `your_image_name` with the name of the Docker image you wish to run.

### Step 5: Testing Connectivity
To test if containers are communicating properly within the network, you can run a shell inside one of the containers and ping another container:
```bash
docker exec -it your_container_name /bin/bash
ping other_container_name
```
This will confirm that the containers are able to see each other through the Docker network.
