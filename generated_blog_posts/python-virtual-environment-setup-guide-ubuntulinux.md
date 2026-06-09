---
title: 🐍 Python Virtual Environment Setup Guide (Ubuntu/Linux)
---

# 🐍 Python Virtual Environment Setup Guide (Ubuntu/Linux)

## 📦 Prerequisites

Make sure Python and pip are installed:

```bash
python3 --version
pip3 --version
```

If not installed, run:

```bash
sudo apt update
sudo apt install python3 python3-pip -y
```

## 🔧 Install `virtualenv`

Install `virtualenv` globally using pip:

```bash
pip3 install virtualenv
```

## 🏗️ Create a Virtual Environment

### ✅ Option 1: Using Default Python Version

```bash
virtualenv venv_name
```

This uses your system’s default Python (usually Python 3).

### ✅ Option 2: Using a Specific Python Version

```bash
virtualenv -p /usr/bin/python3.14 myenv
```

Replace `python3.14` with the path to the version you want.

## 🚀 Activate the Virtual Environment

```bash
source myenv/bin/activate
```

You’ll see the environment name in your terminal prompt like this:

```bash
(myenv) user@machine:~$
```

## 📦 Install Packages Inside the Environment

```bash
pip install package-name
```

Example:

```bash
pip install numpy
```

## ❌ Deactivate the Virtual Environment

To exit the virtual environment:

```bash
deactivate
```

## 🧼 Remove a Virtual Environment (Optional)

```bash
rm -rf myenv
```

## 🧠 Tips

- You can keep different environments for different projects.
- Use a `.gitignore` file to ignore virtual environment folders in Git projects:

```plaintext
venv/
myenv/
```

