---
title: 🔍 `locate` Command Cheat Sheet
---

# 🔍 `locate` Command Cheat Sheet

## 📘 What is `locate`?

The `locate` command is used to quickly search for files and directories on your system by querying a prebuilt database (updated with `updatedb`).

---

## 🛠️ Installation (if not already installed)

```bash
sudo apt update
sudo apt install mlocate -y
sudo updatedb  # Manually update the database
```

---

## 🧪 Basic Usage

### 🔎 Search for a File or Directory

```bash
locate filename
```

Example:

```bash
locate python
```

---

## 🎯 Pattern Matching & Filtering

### 📌 Match Full or Partial File Names

```bash
locate myfile.txt
locate myfile
locate /etc/hosts
```

### 🧵 Use Wildcards (with `--regex` or pipe to `grep`)

`locate` by default supports substring matching.

For more powerful matching, use:

```bash
locate --regex 'pattern'
```

Or filter with `grep`:

```bash
locate python | grep '/bin/'
```

---

## ✅ Common Use Cases

| Use Case                     | Command                          |
|------------------------------|----------------------------------|
| Find all Python binaries     | `locate python`                 |
| Find all `.conf` files        | `locate .conf`                  |
| Find files in `/etc` directory| `locate /etc`                   |
| Find VS Code files            | `locate code`                   |
| Show only `.sh` scripts       | `locate .sh$`                   |
| Use regex to match `.log` files| `locate --regex '\.log$'`      |

---

## 🔄 Update the Database

```bash
sudo updatedb
```

Use this after adding/removing files to make sure `locate` returns fresh results.

---

## ❗ Tips

- `locate` is faster than `find`, but can be outdated until the next `updatedb` run.
- For real-time search, use `find`.

---

## 🆚 `locate` vs `find`

| Feature           | `locate`         | `find`                     |
|-------------------|------------------|----------------------------|
| Speed             | Very fast        | Slower (scans in real time)|
| Up-to-date        | No (needs `updatedb`) | Yes                     |
| Supports filters  | Needs `grep` or `--regex` | Yes (`-name`, `-type`, etc.) |