---
title: "Introduction: Overview of Grafana, Prometheus, and Node Exporter"
author: "A.M.Rinas"
date: "2026-06-03"
category: "DevOps"
image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNgtLAt9PRAI7Ka4qtXjkWBZD8gz9auABrwirnhTavjvjHwykatGotDLho4UVyhnDOiBAEv2SqEqZZt9Ns8HpVkBv2kxSMu8m0T8qzbzwt-UfXwiakRuyuk3lnLiLzgyhQmNAHcqgWLZkUGqAJGhrhUUQjiTsYtPVJLWlVGf-i6X4OiSnOtEBQDF-v/s320/Prometheus_software_logo.svg.png"
excerpt: "An overview and installation guide for Grafana, Prometheus, and Node Exporter on Ubuntu."
---

# Introduction: Overview of Grafana, Prometheus, and Node Exporter

### Tool Description
**Grafana:** Grafana is an open-source platform for monitoring and observability that allows you to create, explore, and share dashboards and data visualizations.

**Prometheus:** Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability, known for its dimensional data model and powerful query language (PromQL).

**Node Exporter:** Node Exporter is a Prometheus exporter for system metrics, exposing various system-level metrics about CPU, memory, disk usage, and more, which Prometheus can then scrape and store.

### Benefits of using these tools together
- Unified Monitoring Platform: Integrating Grafana with Prometheus and Node Exporter provides a comprehensive solution for monitoring and observability across various systems and services.
- Rich Visualization Capabilities: Grafana's powerful visualization features allow you to create detailed, interactive dashboards that display data collected by Prometheus and Node Exporter.
- Flexible Data Queries: Prometheus's PromQL query language enables flexible querying of metrics collected by Node Exporter, allowing you to extract specific data points and trends for analysis.
- Real-time Alerting: Prometheus can be configured to monitor metrics from Node Exporter and trigger alerts based on predefined thresholds.
- Scalability and Performance: Node Exporter's lightweight design makes it suitable for monitoring large-scale deployments without significant overhead.
- Open-source Community Support: All three tools are open-source projects with active communities.
- Ecosystem Integration: Grafana supports integration with a wide range of data sources and plugins.
- Historical Analysis: Grafana's ability to visualize historical data stored in Prometheus allows for trend analysis and performance optimization over time.

### Prerequisites
**Necessary permissions and access**

**Firewall Rules (UFW):** Open port 3000 for Grafana: `sudo ufw allow 3000`.

**Hosts File Configuration:** Modify `/etc/hosts` to include:
```text
127.0.0.1:3000      172.16.x.xxx
```
Replace `172.16.x.xxx` with your IP address.

### Installing Grafana on Ubuntu
**Downloading Grafana for Ubuntu:** Download Grafana OSS edition if not using Docker.

**Setting up Grafana:**
- **In Docker:**
  ```bash
  sudo docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
  ```
- **Starting and enabling Grafana service:**
  ```bash
  sudo systemctl start grafana-server
  sudo systemctl status grafana-server
  ```

### Installing Prometheus on Ubuntu
**Downloading Prometheus for Ubuntu:** Download tar.gz from the Prometheus download page.

**Installing Prometheus:**
- Unzip it using:
  ```bash
  tar xzf prometheus-2.xx.x.linux-amd64.tar.gz
  ```
- Move it to `/etc/prometheus`:
  ```bash
  mv prometheus-2.xx.x.linux-amd64 /etc/prometheus
  ```
- Create a systemd service file:
  ```bash
  vi /etc/systemd/system/prometheus.service
  ```
- Enter the following content:
  ```ini
  [Unit]
  Description=Prometheus
  Wants=network-online.target
  After=network-online.target

  [Service]
  ExecStart=/etc/prometheus/prometheus --config.file=/etc/prometheus/prometheus.yml
  Restart=always

  [Install]
  WantedBy=multi-user.target
  ```
- Reload systemd, start, enable, and check status:
  ```bash
  systemctl daemon-reload
  systemctl start prometheus
  systemctl enable prometheus
  systemctl status prometheus
  ```

### Installing Node Exporter on Ubuntu
**Downloading Node Exporter for Ubuntu:** Download from Node Exporter download page.

**Installing Node Exporter:**
- Unzip it using:
  ```bash
  tar xzf node_exporter-1.8.1.linux-amd64
  ```
- Move it to `/etc/node_exporter`:
  ```bash
  mv node_exporter-1.8.1.linux-amd64 /etc/node_exporter
  ```
- Create a systemd service file:
  ```bash
  vi /etc/systemd/system/node_exporter.service
  ```
- Enter the following content:
  ```ini
  [Unit]
  Description=Node Exporter
  Wants=network-online.target
  After=network-online.target

  [Service]
  ExecStart=/etc/node_exporter/node_exporter
  Restart=always

  [Install]
  WantedBy=multi-user.target
  ```
- Reload systemd, start, enable, and check status:
  ```bash
  systemctl daemon-reload
  systemctl start node_exporter
  systemctl enable node_exporter
  systemctl status node_exporter
  ```

### Configuring Node Exporter as a service
Remove existing `prometheus.yml` file:
```bash
rm -rf /etc/prometheus/prometheus.yml
```
Create a new file and enter the following:
```bash
vi /etc/prometheus/prometheus.yml
```
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: node
    static_configs:
      - targets: ['172.16.1.141:9100'] # Replace with your own IP
```
Reload systemd, start Prometheus, and check status:
```bash
systemctl daemon-reload
systemctl restart prometheus
systemctl status prometheus
```

### Accessing Grafana and Creating a New Connection
**Access Grafana:** Open your browser and go to `http://<your_ip>:3000` (e.g., `http://172.16.1.141:3000`).

**Create a New Connection:**
- Navigate to Configuration -> Data Sources.
- Click on Add data source.
- Select Prometheus from the list.
- Enter the URL as `http://<your_ip>:9090` (replace with your IP if different).
- Click Save & Test to verify the connection.
- Create or Import a Dashboard:
  - Go to Dashboards -> Manage.
  - Click New Dashboard to create one, or
  - Click Import to import an existing dashboard.
  - For example, you can import dashboard ID 1860 for system monitoring.
  - If importing, remove any unnecessary links and save the dashboard.
