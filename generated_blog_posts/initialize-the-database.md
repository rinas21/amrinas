---
title: Initialize the database
---

# Initialize the database
superset db upgrade
superset fab create-admin  # Create admin user
superset init
```

### 🧠 Run Superset

```bash
superset run -p 8088 --with-threads --reload --debugger
```

Visit: [http://localhost:8088](http://localhost:8088)

---

## 🧩 3. Connect Superset to Cube.js SQL API

In Superset UI:

1. Go to **Settings → Database Connections**
2. Click **+ Database**
3. Select **PostgreSQL**
4. Fill in details:

    - **Display Name:** `Cube.js` (or any name)
    - **SQLAlchemy URI:**  
      ```
      postgresql+psycopg2://admin:admin@localhost:15432/postgres
      ```

5. Click **Connect**

---

## 🧨 Common Errors & Fixes

### ❌ `ModuleNotFoundError: No module named 'psycopg2'`

**Fix:**  
Activate your Superset venv and install the missing driver:

```bash
source venv/bin/activate
pip install psycopg2-binary
```

---

### ❌ Superset logo / favicon 404 errors

You may see logs like:

```
GET /static/assets/images/superset-logo-horiz.png HTTP/1.1" 404 -
```

🟡 *These are not critical — just missing branding assets. UI still works.*

---

### ❌ Unable to load SQLAlchemy dialect `shillelagh.multicorn2`

Superset log:

```
Unable to load SQLAlchemy dialect shillelagh.multicorn2: No module named 'psycopg2'
```

🟢 *This also results from the missing PostgreSQL driver (`psycopg2`). Installing it as shown above fixes both.*

---

### ❌ NPM Error: `package.json` not found

If you ran `npm install` inside Superset folder:

```
npm ERR! enoent ENOENT: no such file or directory, open '.../package.json'
```

🛠️ *You do not need to run `npm install` in Superset. That’s for frontend development. Ignore this.*

---

## ✅ After Connection

- Go to **Datasets** in Superset
- Explore tables exposed by Cube.js schemas
- Build dashboards using those datasets

---

## 🧪 Test the Connection via CLI (optional)

```bash
PGPASSWORD=admin psql -h localhost -p 15432 -U admin postgres
```

This lets you directly inspect what Cube.js is exposing via PostgreSQL.

---

## 🧼 Final Summary

| Component         | Status                        |
|-------------------|------------------------------|
| Cube.js SQL API   | ✅ Running on port 15432      |
| Superset          | ✅ Installed & running        |
| psycopg2          | ✅ Installed in venv          |
| Connection        | ✅ PostgreSQL → Cube.js linked|

