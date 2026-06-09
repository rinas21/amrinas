---
title: Optional: Load modular configs from ~/.bashrc.d/
---

# Optional: Load modular configs from ~/.bashrc.d/
if [ -d ~/.bashrc.d ]; then
    for rc in ~/.bashrc.d/*; do
        if [ -f "$rc" ]; then
            . "$rc"
        fi
    done
fi

unset rc
```

---

## 🛠️ Explanation of Key Sections

- **Global Definitions:**  
  Sources `/etc/bashrc` for system-wide defaults.

- **PATH Setup:**  
  Ensures `~/.local/bin` and `~/bin` are included in `$PATH`.

- **Modular Configuration Support:**  
  If `~/.bashrc.d/` exists, loads all scripts in it.  
  Useful for organizing aliases, environment variables, and tool configs.

---

## 🔄 After Editing

Apply changes with:

```bash
source ~/.bashrc
```

---

## 🗃️ Optional: Modular Setup

Create and use `~/.bashrc.d/` for custom scripts:

```bash
mkdir -p ~/.bashrc.d
echo "alias ll='ls -alF'" > ~/.bashrc.d/aliases.sh
```

---

## 🔎 Confirm OS (for context)

Check your OS version:

```bash
cat /etc/os-release
```

Example output:

```
Red Hat Enterprise Linux 8.10 (Ootpa)
```

---

## ✅ Status

If you see no errors when running:

```bash
echo $PATH
```

your `.bashrc` is working as expected.