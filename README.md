# 🥑 Linux Data Engineering Playbook

My personal notebook and cheat sheet focusing on the practical Linux stuff I actually use as a Data Engineer (PySpark, Airflow, Docker, Postgres, and log debugging). 

This doesn't cover every single Linux command out there - just the essential tools, metrics, and production incident notes that keep data pipelines running smoothly.

---

## What's Inside

- **Cheatsheet Poster (`handnote_cheatsheet.html`)**: 16:9 poster grid in Avocado & Sage Green.
- **Interactive Playbook (`linux_cheatsheet.html`)**: Real-world DE incident matrix (OOMs, disk leaks, socket binds).
- **Quick Search (`index.html`)**: Instant `⌘K` search across 78 production commands.

---

## Incident Diagnostic Cheat Sheet

Quick reference notes for common pipeline headaches documented in this playbook:

| Symptom | Diagnostic Intention | Key Commands |
| :--- | :--- | :--- |
| **PySpark Executor OOM (Exit Code 137)** | Check physical RAM vs. swap & kernel OOM killer logs | `free -h`<br>`dmesg -T \| grep -i oom` |
| **Disk Full (`NOSPACE`), but `du` is small** | Find deleted files held open by active processes | `df -h`<br>`lsof +L1` |
| **Airflow Worker Stalls & High Load** | Compare load average against CPU cores & wait state | `nproc`<br>`vmstat 1 5`<br>`top` |
| **Port Conflict (`EADDRINUSE`)** | Identify process binding to port `5432` / `8080` | `ss -tulpn \| grep 5432`<br>`lsof -i :5432` |
| **Missing S3/Cloud SDK Keys in `sudo`** | Preserve user environment variables under root elevation | `whoami`<br>`sudo -E env` |

---

## DE Systems Scope

1. **Identity & Permissions**: `whoami`, `env`, `sudo -E`, `getcap/setcap`, `chmod`, `chown`
2. **CPU & Load**: `uptime`, `nproc`, `vmstat`, `top`, `btop`, `mpstat`, `taskset`
3. **Memory & OOM**: `free -h`, `swappiness`, `max_map_count`, `dmesg`
4. **Disk & Inodes**: `df -h`, `df -i`, `du -sh`, `truncate`, `find`, `lsof +L1`
5. **Processes & Streams**: `ps -eo`, `pgrep`, `pkill`, `SIGTERM/SIGKILL`, `ulimit`
6. **Network & Sockets**: `ss -tulpn`, `nc -zv`, `curl -I`, `0.0.0.0 vs 127.0.0.1`
7. **Services & Logs**: `systemctl`, `journalctl -u`, `docker/podman logs`
8. **Text ETL**: `grep/zgrep`, `head`, `sort -nr`, `uniq -c`, `awk`, `sed`
9. **Packages & Scripts**: `tar`, `zstd`, `rsync`, `set -euo pipefail`

---

## License

MIT License.
