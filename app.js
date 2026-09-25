// Comprehensive Command Database
const COMMANDS_DATA = [
    {
        id: "whoami",
        category: "Identity & System",
        categoryIcon: "🆔",
        name: "whoami",
        intent: "Check current active user session name",
        flags: [
            { flag: "None", desc: "Prints effective username of current shell session" }
        ],
        cmdFull: "whoami",
        output: "ubuntu",
        metric: "Tells you whether you are running as root or a normal user (e.g. ubuntu, spark, dev).",
        tags: ["identity", "user", "whoami", "session"]
    },
    {
        id: "hostname",
        category: "Identity & System",
        categoryIcon: "🆔",
        name: "hostname / hostname -I",
        intent: "Identify server hostname and assigned IP addresses",
        flags: [
            { flag: "-I", desc: "Display all network interface IP addresses for the host" }
        ],
        cmdFull: "hostname -I",
        output: "10.0.1.45 172.17.0.1",
        metric: "Confirms host identity and internal IP before running destructive commands.",
        tags: ["identity", "hostname", "ip", "address", "host"]
    },
    {
        id: "os-release",
        category: "Identity & System",
        categoryIcon: "🆔",
        name: "cat /etc/os-release",
        intent: "Inspect Linux distribution and release version",
        flags: [
            { flag: "cat", desc: "Prints file contents to standard output" }
        ],
        cmdFull: "cat /etc/os-release",
        output: `NAME="Ubuntu"
VERSION="22.04.3 LTS (Jammy Jellyfish)"
ID=ubuntu
PRETTY_NAME="Ubuntu 22.04.3 LTS"`,
        metric: "Check PRETTY_NAME to confirm distro (Ubuntu vs RHEL vs Debian) for package manager rules.",
        tags: ["identity", "os", "distro", "ubuntu", "version", "release"]
    },
    {
        id: "uname",
        category: "Identity & System",
        categoryIcon: "🆔",
        name: "uname -rm",
        intent: "Check Linux kernel release and CPU architecture",
        flags: [
            { flag: "-r", desc: "Print Linux kernel release version" },
            { flag: "-m", desc: "Print machine hardware architecture (x86_64, aarch64)" }
        ],
        cmdFull: "uname -rm",
        output: "5.15.0-1040-aws x86_64",
        metric: "Architecture (x86_64 vs arm64) dictates binary compatibility.",
        tags: ["kernel", "architecture", "uname", "x86_64", "arm64"]
    },
    {
        id: "uptime",
        category: "CPU & System Load",
        categoryIcon: "⚡",
        name: "uptime",
        intent: "Check server uptime and 1m, 5m, 15m load averages",
        flags: [
            { flag: "None", desc: "Prints current time, system uptime, active users, and load averages" }
        ],
        cmdFull: "uptime",
        output: "15:18:01 up 12 days,  load average: 12.04, 11.80, 10.10",
        metric: "RULE: Compare Load Average against nproc (CPU count). If Load (12.04) > nproc (4), 8 tasks are queuing for CPU or I/O!",
        tags: ["cpu", "load", "uptime", "slowness", "lag", "performance"]
    },
    {
        id: "nproc",
        category: "CPU & System Load",
        categoryIcon: "⚡",
        name: "nproc",
        intent: "Count available logical CPU cores",
        flags: [
            { flag: "None", desc: "Prints number of processing units available to current process" }
        ],
        cmdFull: "nproc",
        output: "4",
        metric: "Use as baseline multiplier for load average (e.g. 4 cores = load up to 4.0 is 100% full capacity).",
        tags: ["cpu", "cores", "nproc", "capacity"]
    },
    {
        id: "vmstat",
        category: "CPU & System Load",
        categoryIcon: "⚡",
        name: "vmstat 1 5",
        intent: "Sample system performance to pinpoint CPU, Memory, or I/O bottleneck",
        flags: [
            { flag: "1", desc: "Interval in seconds between output reports" },
            { flag: "5", desc: "Number of report samples to print before exiting" }
        ],
        cmdFull: "vmstat 1 5",
        output: `procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0      0 204800 300000 6000000    0    0     5    12  450  800 85  5 10  0  0
 8  1      0 190000 300000 6000000    0    0  1200  4500 1200 2400 12  8 10 70  0`,
        metric: "READ COLUMNS: 'us' (App CPU%), 'sy' (Kernel CPU%), 'wa' (Disk I/O Wait%), 'r' (Tasks waiting for CPU), 'si/so' (Swap in/out).",
        tags: ["vmstat", "bottleneck", "io", "cpu", "wait", "swap", "performance"]
    },
    {
        id: "top",
        category: "CPU & System Load",
        categoryIcon: "⚡",
        name: "top",
        intent: "Interactive process viewer sorted by CPU or Memory usage",
        flags: [
            { flag: "P", desc: "(Inside top) Press 'P' to sort process list by %CPU" },
            { flag: "M", desc: "(Inside top) Press 'M' to sort process list by RAM" }
        ],
        cmdFull: "top -b -n 1 | head -n 12",
        output: `top - 15:20:00 up 12 days, 4 users,  load average: 12.04, 11.80, 10.10
Tasks: 180 total,   2 running, 178 sleeping,   0 stopped,   0 zombie
%Cpu(s): 80.0 us,  5.0 sy,  0.0 ni, 15.0 id,  0.0 wa,  0.0 hi,  0.0 si
MiB Mem :  16384.0 total,    200.0 free,   9500.0 used,   6684.0 buff/cache
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 2211 spark     20   0 20.1g   2.0g  450m R  80.0  12.5  140:12.45 java`,
        metric: "RES = 2.0g is actual physical RAM held. VIRT = 20.1g is total virtual memory address space.",
        tags: ["top", "process", "pid", "res", "virt", "cpu", "ram"]
    },
    {
        id: "free",
        category: "Memory & Swap",
        categoryIcon: "🧠",
        name: "free -h",
        intent: "Check available RAM and swap space in human-readable units",
        flags: [
            { flag: "-h", desc: "Display values in human readable format (MB/GB)" }
        ],
        cmdFull: "free -h",
        output: `               total        used        free      shared  buff/cache   available
Mem:            16Gi       9.5Gi       200Mi       12Mi       6.3Gi       6.0Gi
Swap:          2.0Gi          0B       2.0Gi`,
        metric: "LOOK AT 'available' (6.0Gi) — NOT 'free' (200Mi)! 'free' ignores Linux disk buffer cache which apps can reclaim instantly.",
        tags: ["free", "memory", "ram", "available", "swap", "cache"]
    },
    {
        id: "dmesg-oom",
        category: "Memory & Swap",
        categoryIcon: "🧠",
        name: "dmesg -T | grep -i oom",
        intent: "Check if Linux kernel Out-Of-Memory killer terminated a process",
        flags: [
            { flag: "-T", desc: "Print human-readable timestamps on kernel log messages" },
            { flag: "grep -i oom", desc: "Case-insensitive filter for 'OOM' (Out Of Memory) events" }
        ],
        cmdFull: "dmesg -T | grep -i oom",
        output: `[Mon Sep 21 14:22:01 2026] Out of memory: Kill process 3412 (python3) score 850 or sacrifice child`,
        metric: "Confirms if a sudden process crash was caused by kernel RAM termination (ExitCode 137).",
        tags: ["oom", "dmesg", "kill", "memory", "crash", "exitcode137"]
    },
    {
        id: "df",
        category: "Disk & Storage",
        categoryIcon: "💾",
        name: "df -h",
        intent: "Check filesystem capacity and mount point space usage",
        flags: [
            { flag: "-h", desc: "Display sizes in human-readable powers of 1024 (1K, 234M, 2G)" }
        ],
        cmdFull: "df -h",
        output: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        50G   48G  2.0G  96% /
tmpfs           7.8G     0  7.8G   0% /dev/shm
/dev/sda2       200G  120G   80G  60% /var`,
        metric: "Check 'Use%' column. If mount point (e.g. '/') hits 100%, services fail to log or write temporary files!",
        tags: ["df", "disk", "space", "filesystem", "full", "capacity"]
    },
    {
        id: "du",
        category: "Disk & Storage",
        categoryIcon: "💾",
        name: "du -h --max-depth=1 /path",
        intent: "Find which specific subfolder is eating disk space",
        flags: [
            { flag: "-h", desc: "Print sizes in human readable format (e.g., 1K 234M 2G)" },
            { flag: "--max-depth=1", desc: "Limit summary depth to immediate subdirectories only" }
        ],
        cmdFull: "du -h --max-depth=1 /var | sort -hr",
        output: `35G     /var
30G     /var/log
4.2G    /var/lib
800M    /var/cache`,
        metric: "Pipes into 'sort -hr' to instantly list largest folders at top (e.g. /var/log taking 30G).",
        tags: ["du", "folder", "size", "disk", "drilldown", "large"]
    },
    {
        id: "lsblk",
        category: "Disk & Storage",
        categoryIcon: "💾",
        name: "lsblk",
        intent: "List block devices, partitions, and mount point hierarchy",
        flags: [
            { flag: "None", desc: "Displays tree structure of storage drives and partitions" }
        ],
        cmdFull: "lsblk",
        output: `NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0   250G  0 disk 
├─sda1   8:1    0    50G  0 part /
└─sda2   8:2    0   200G  0 part /var`,
        metric: "Maps physical disk → partition → mount point path.",
        tags: ["lsblk", "disk", "partition", "block", "storage", "mount"]
    },
    {
        id: "ss",
        category: "Network & Ports",
        categoryIcon: "🌐",
        name: "ss -tulpn",
        intent: "List listening network ports, protocols, and process IDs",
        flags: [
            { flag: "-t", desc: "Display TCP sockets" },
            { flag: "-u", desc: "Display UDP sockets" },
            { flag: "-l", desc: "Display listening sockets only" },
            { flag: "-p", desc: "Show process using socket" },
            { flag: "-n", desc: "Numeric port numbers (e.g. 8080 instead of http-alt)" }
        ],
        cmdFull: "ss -tulpn",
        output: `Netid State  Recv-Q Send-Q Local Address:Port  Peer Address:Port Process                                 
tcp   LISTEN 0      128        127.0.0.1:8080       0.0.0.0:*     users:(("java",pid=2211,fd=7))
tcp   LISTEN 0      128          0.0.0.0:80         0.0.0.0:*     users:(("nginx",pid=1045,fd=6))`,
        metric: "BIND RULE: 127.0.0.1:8080 = Localhost ONLY (off-box clients blocked). 0.0.0.0:80 = Publicly accessible on all interfaces.",
        tags: ["ss", "ports", "listening", "network", "tcp", "udp", "bind"]
    },
    {
        id: "nmap",
        category: "Network & Ports",
        categoryIcon: "🌐",
        name: "nmap -p <port> <host>",
        intent: "Probe network port reachability from a remote vantage point",
        flags: [
            { flag: "-p <port>", desc: "Specify target port number to scan (e.g. -p 8080)" }
        ],
        cmdFull: "nmap -p 8080 192.168.1.50",
        output: `PORT     STATE    SERVICE
8080/tcp filtered http-proxy`,
        metric: "STATE INDICATORS: 'open' = Service reachable; 'closed' = Host reached but no app listening; 'filtered' = Firewall dropped packet!",
        tags: ["nmap", "port", "firewall", "network", "probe", "filtered"]
    },
    {
        id: "ufw",
        category: "Network & Ports",
        categoryIcon: "🌐",
        name: "sudo ufw status",
        intent: "Check Ubuntu Uncomplicated Firewall active rules",
        flags: [
            { flag: "status", desc: "Show firewall status (active/inactive) and rule list" }
        ],
        cmdFull: "sudo ufw status",
        output: `Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
8080/tcp                   DENY        Anywhere`,
        metric: "Confirms if host firewall rules are dropping inbound connection attempts.",
        tags: ["ufw", "firewall", "iptables", "security", "rules"]
    },
    {
        id: "systemctl",
        category: "Services & Logs",
        categoryIcon: "⚙️",
        name: "systemctl status <service>",
        intent: "Check background systemd service status and active state",
        flags: [
            { flag: "status", desc: "Show runtime status, PID, memory, and recent logs" }
        ],
        cmdFull: "systemctl status nginx",
        output: `● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2026-09-21 10:00:00 UTC; 1 days ago
 Main PID: 1045 (nginx)`,
        metric: "Check 'Active: active (running)' vs 'failed' or 'dead'.",
        tags: ["systemctl", "service", "systemd", "status", "daemon"]
    },
    {
        id: "journalctl",
        category: "Services & Logs",
        categoryIcon: "⚙️",
        name: "journalctl -u <service> -n 100 -f",
        intent: "Tail and follow systemd service logs live",
        flags: [
            { flag: "-u <unit>", desc: "Target specific systemd unit/service name" },
            { flag: "-n 100", desc: "Show last 100 lines of log output" },
            { flag: "-f", desc: "Follow live log output as new entries arrive" }
        ],
        cmdFull: "journalctl -u nginx -n 5 -f",
        output: `Sep 21 15:30:10 server nginx[1045]: 192.168.1.10 - - [21/Sep/2026:15:30:10 +0000] "GET /api HTTP/1.1" 200 450
Sep 21 15:30:12 server nginx[1045]: 192.168.1.12 - - [21/Sep/2026:15:30:12 +0000] "POST /login HTTP/1.1" 500 120`,
        metric: "Look for 500 status codes, ERROR strings, or stack trace exceptions.",
        tags: ["journalctl", "logs", "tail", "systemd", "follow", "errors"]
    },
    {
        id: "set-safeguard",
        category: "Services & Logs",
        categoryIcon: "⚙️",
        name: "set -euo pipefail",
        intent: "Enable fail-fast strict mode safeguards in Bash scripts",
        flags: [
            { flag: "-e", desc: "Exit immediately if any command returns non-zero status" },
            { flag: "-u", desc: "Treat unset variables as an error and exit immediately" },
            { flag: "-o pipefail", desc: "Return value of a pipeline is status of last command that failed" }
        ],
        cmdFull: "set -euo pipefail",
        output: "(Enables strict script error handling mode - produces no stdout output)",
        metric: "Prevents subtle script corruption where silently failing subcommands cause downstream chaos.",
        tags: ["bash", "script", "set", "pipefail", "safeguard", "error"]
    }
];

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderMasterGrid(COMMANDS_DATA);
    setupEventListeners();
});

// Render Master Card Grid
function renderMasterGrid(data) {
    const grid = document.getElementById('masterGrid');
    grid.innerHTML = '';

    // Group commands by category
    const categories = {};
    data.forEach(cmd => {
        if (!categories[cmd.category]) {
            categories[cmd.category] = {
                icon: cmd.categoryIcon,
                commands: []
            };
        }
        categories[cmd.category].commands.push(cmd);
    });

    Object.keys(categories).forEach(catName => {
        const catObj = categories[catName];
        const card = document.createElement('div');
        card.className = 'category-card';

        let cmdsHtml = catObj.commands.map(cmd => `
            <div class="cmd-item" onclick="openModal('${cmd.id}')">
                <div class="cmd-left">
                    <span class="cmd-name">${escapeHtml(cmd.name)}</span>
                    <span class="cmd-desc">${escapeHtml(cmd.intent)}</span>
                </div>
                <span class="cmd-arrow">→</span>
            </div>
        `).join('');

        card.innerHTML = `
            <div class="card-header">
                <span class="card-icon">${catObj.icon}</span>
                <h2>${escapeHtml(catName)}</h2>
            </div>
            <div class="commands-list">
                ${cmdsHtml}
            </div>
        `;

        grid.appendChild(card);
    });
}

// Open Detail Modal Page
function openModal(cmdId) {
    const cmd = COMMANDS_DATA.find(c => c.id === cmdId);
    if (!cmd) return;

    document.getElementById('modalCategory').textContent = cmd.category;
    document.getElementById('modalCmdName').textContent = cmd.name;
    document.getElementById('modalIntent').textContent = cmd.intent;
    document.getElementById('modalCmdFull').textContent = cmd.cmdFull;
    document.getElementById('modalOutput').textContent = cmd.output;
    document.getElementById('modalMetric').textContent = cmd.metric;

    // Render Flags Grid
    const flagsGrid = document.getElementById('modalFlags');
    flagsGrid.innerHTML = cmd.flags.map(f => `
        <div class="flag-item">
            <div class="flag-name">${escapeHtml(f.flag)}</div>
            <div class="flag-desc">${escapeHtml(f.desc)}</div>
        </div>
    `).join('');

    // Configure Copy Command Button
    const copyBtn = document.getElementById('copyCmdBtn');
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(cmd.cmdFull).then(() => {
            showToast(`Copied "${cmd.cmdFull}" to clipboard!`);
        });
    };

    document.getElementById('modalOverlay').classList.add('active');
}

// Close Modal Page
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
}

// Setup Event Listeners
function setupEventListeners() {
    // Modal Close
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') closeModal();
    });

    // Keyboard ESC close & Cmd+K search focus
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    });

    // Search Input Filter
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        filterCommands(query);
    });

    // Triage Path Pills Filter
    const triageBtns = document.querySelectorAll('.triage-btn');
    triageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            triageBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const symptom = btn.dataset.symptom;
            filterBySymptom(symptom);
        });
    });
}

// Filter Commands by Text Query
function filterCommands(query) {
    if (!query) {
        renderMasterGrid(COMMANDS_DATA);
        return;
    }

    const filtered = COMMANDS_DATA.filter(cmd => {
        return cmd.name.toLowerCase().includes(query) ||
               cmd.intent.toLowerCase().includes(query) ||
               cmd.category.toLowerCase().includes(query) ||
               cmd.tags.some(t => t.toLowerCase().includes(query));
    });

    renderMasterGrid(filtered);
}

// Filter Commands by Triage Symptom
function filterBySymptom(symptom) {
    if (symptom === 'identity') {
        filterCommands('identity');
    } else if (symptom === 'load') {
        filterCommands('cpu');
    } else if (symptom === 'memory') {
        filterCommands('ram');
    } else if (symptom === 'disk') {
        filterCommands('disk');
    } else if (symptom === 'network') {
        filterCommands('port');
    }
}

// Toast Notification Helper
function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Utility to prevent XSS
function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}
