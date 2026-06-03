---
title: "MySQL General Log Setup and Monitoring: A Comprehensive Guide"
author: "A.M. Rinas"
date: "2026-06-03"
category: "Databases"
image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3sXXkHxnpGiNZvStR-NXigU2BVfCSqtDLeom4SmMpq-npL4iw4-jOCSN_R43Wv471jtjM7zf1iiUJD3vJRVvAQnaDk1bUgHQZdrjUe6Jr6UhdC3a6ET5CkzG8y79QyEq6-rla5VZucn6iqxC-9KiD3iDRLGIP7KRX8n6TI3rZG_0y59SnUA9PkOTi/s650/mysql8.png"
excerpt: "Enable and monitor the MySQL general log on a Linux system."
---

# MySQL General Log Setup Steps

### Step 1: Edit MySQL Configuration File
- Open the MySQL configuration file (`my.cnf` or `my.ini`):
  ```bash
  sudo nano /etc/mysql/my.cnf
  ```
- Add or modify the following lines under the `[mysqld]` section:
  ```ini
  [mysqld]
  general_log = 1
  general_log_file = /var/log/mysql/mysql-general.log
  ```
- Save and close the file.

### Step 2: Restart MySQL Server
- Restart the MySQL service to apply the changes:
  ```bash
  sudo systemctl restart mysql
  ```

### Step 3: Enable General Log Dynamically (Optional)
- Connect to MySQL and enable the general log dynamically:
  ```sql
  mysql -u root -p
  SET GLOBAL general_log = 'ON';
  SET GLOBAL general_log_file = '/var/log/mysql/mysql-general.log';
  ```

### Step 4: Verify General Log Status
- Check the status of the general log:
  ```sql
  mysql -u root -p
  SHOW VARIABLES LIKE 'general_log%';
  ```

### Verification:
Verify the general log by checking the log file at `/var/log/mysql/mysql-general.log` for recorded queries.

# Monitoring MySQL Performance

### Method 1: Using MySQL Workbench
- Open MySQL Workbench and connect to your MySQL server.
- Navigate to the "Server Status" or "Performance Reports" to monitor various metrics.

### Method 2: Using Prometheus and Grafana
- Install and configure `mysqld_exporter` to expose MySQL metrics:
  ```bash
  wget https://github.com/prometheus/mysqld_exporter/releases/download/v0.13.0/mysqld_exporter-0.13.0.linux-amd64.tar.gz
  tar xvf mysqld_exporter-0.13.0.linux-amd64.tar.gz
  cd mysqld_exporter-0.13.0.linux-amd64
  ./mysqld_exporter --config.my-cnf=/path/to/my.cnf
  ```
- Configure Prometheus to scrape metrics from `mysqld_exporter`.
- Set up Grafana dashboards to visualize MySQL metrics.

### Method 3: Using MySQL Enterprise Monitor
- Install MySQL Enterprise Monitor for comprehensive monitoring and performance insights.

For more details on monitoring MySQL, refer to the [MySQL Query Log Documentation](https://dev.mysql.com/doc/refman/8.0/en/query-log.html).
