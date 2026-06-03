---
title: "How to Install and Use Katalon Studio for Web Testing"
author: "A.M.Rinas"
date: "2026-06-03"
category: "Tech"
image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4LIWV1ubpdqxAV4pUF7qrdvJFHtLpgcvoO2g4DsAshY8HyaZHCx57GKpvAVJ4cGK4JNuA2bFXC58Oi8MoDrrwWtfbnRQ7vBymz2oWasZM5EwDogKWu8OikgUAapsVxGWAeh885uemqU742gz_ZDYsqC2XXRp6d4JCdbV6MLI-U8fxQcWeAf60mRdg/s320/katalon-logo-newbrand2022-top-nav.png"
excerpt: "A step-by-step guide to installing Katalon Studio and creating your first web test."
---

# Step-by-Step Guide to Installing Katalon Studio

Katalon Studio is a powerful tool for automating web, API, and mobile testing. In this guide, we'll walk you through the installation process and show you how to create your first test case for a web application.

### Step 1: Download Katalon Studio
Start by downloading the latest version of Katalon Studio from the official website. Choose the version that suits your operating system.

### Step 2: Extract and Run the Application
Once the download is complete, extract the contents of the downloaded file. Inside the extracted folder, locate the `katalon.sh` file (for Linux users) and run it to launch Katalon Studio:
```bash
./katalon
```
If you're on Windows or macOS, simply follow the installation instructions for your platform.

### Step 3: Open a New Project
After launching Katalon Studio, create a new project by selecting **File** → **New** → **Project**. Give your project a name and choose the appropriate location for saving it.

### Step 4: Start Recording a Web Test
With your new project open, click on the **Record Web** button located in the toolbar. A new window will pop up, allowing you to enter the URL of the web page you want to test. Enter the desired URL and click **OK** to start the recording session.

### Step 5: Create and Record a Test Case
As Katalon Studio records your actions, interact with the web page by performing the steps you want to automate (e.g., filling out forms, clicking buttons). Katalon will capture these actions and create a test case automatically.

Once you're done, click the **Stop** button in the recording window to save your test case.

### Step 6: Run Your Test Case
After saving the test case, you can run it to verify that everything works as expected. Simply select the test case from the test explorer, right-click on it, and choose **Run** → **Chrome** (or another browser of your choice).

Katalon Studio will execute the test case by interacting with the browser, replicating your recorded actions.
