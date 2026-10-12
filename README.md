# ak1t4 // Portfolio

Portfolio personal de **Adrián Sepúlveda Ramos** (`ak1t4`) — ciberseguridad y CTF, Red & Blue Team.

Interfaz con estética anime / tech en negro y rojo, totalmente responsive, con una terminal
interactiva integrada y los writeups de máquinas abriéndose en un popup (con enlace directo a cada uno).

## 🔗 Web

Publicado con GitHub Pages: **https://ak1ta4.github.io/ak1t4-portfolio/**

## ✨ Características

- **Diseño** en negro y rojo con tipografías técnicas, cursor propio y efecto CRT opcional.
- **Índice lateral** plegable y desplegable, con los subapartados de cada sección.
- **Terminal integrada**: `help`, `whoami`, `cat bio.txt`, `ls`, `cd`, `writeups`, `open`, `tool`, `certs`, `social`.
- **Writeups en popup**: cada máquina se abre sin salir de la página, con sus fases (reconocimiento,
  explotación, escalada), comandos reales y un informe de vulnerabilidades (CWE / OWASP / impacto / mitigación).
  Cada writeup tiene su propio enlace copiable (`#wu-<máquina>`).
- **Escalado** para monitores 2K / 4K y disposición a dos columnas en pantallas anchas.
- Páginas de **aviso legal, privacidad y cookies** a juego con el diseño.

## 📁 Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal |
| `styles.css` | Estilos |
| `app.js` | Lógica: terminal, writeups, índice, animaciones |
| `aviso-legal.html` · `privacidad.html` · `cookies.html` | Páginas legales |

## 🛠️ Desarrollo local

Al ser estático, basta con servir la carpeta:

```bash
python -m http.server 5173
```

Y abrir `http://localhost:5173`.

## ⚠️ Nota sobre los writeups

Los writeups describen máquinas de laboratorio (DockerLabs) resueltas en entornos controlados y
autorizados, con fines educativos. La IP del equipo atacante aparece como `<IP_ATACANTE>` para que
cada cual la sustituya por la suya.

---

© 2026 Adrián Sepúlveda Ramos · ak1t4
