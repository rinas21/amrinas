---
title: Connecting Cube.js to Superset (PostgreSQL SQL API)
---

# Connecting Cube.js to Superset (PostgreSQL SQL API)

## 🧩 Goal

Connect Apache Superset to Cube.js using Cube's PostgreSQL SQL API on port `15432`, allowing Superset to query Cube.js pre-aggregated data.

---

## ⚙️ Prerequisites

- Cube.js project configured to expose PostgreSQL SQL API
- Superset installed in a Python virtual environment
- PostgreSQL driver (`psycopg2`) installed in Superset’s environment

---

## 🧱 1. Cube.js Configuration

In your `.env` file for Cube.js:

```env