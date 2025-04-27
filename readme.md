


# Nebula OS - Web Desktop Simulation

An interactive, retro-style web-based desktop simulation, featuring draggable windows, start menu, desktop icons, a taskbar clock, and basic apps like Notepad, Calculator, File Explorer, and more.

---

## 🚀 Live Demo
Try it on:  [https://dikshantpandey-dev.github.io/nebula-os/](https://dikshantpandey-dev.github.io/nebula-os/)

---

## 📦 Project Setup
Follow these simple steps to run it locally:

### 1. Clone the Repository
```bash
git clone https://github.com/dikshantpandey-dev/nebula-os.git
```

### 2. Navigate to Project Folder
```bash
cd nebula-os
```

(No installations required! It's built with pure HTML, CSS, and JavaScript.)

---

## ⚡ Features
- Retro-style boot screen, lock screen, and desktop
- Start Menu with Shutdown, Log Off, and Install Software options
- Multiple draggable, resizable app windows (Notepad, Calculator, Todo, Files, Settings, Chat)
- Taskbar showing open apps + live clock and date
- Desktop icons (draggable) with Recycle Bin functionality
- Right-click context menu (Refresh, New Folder, Properties)
- Blue Screen of Death (Crash simulation)
- Install Wizard to simulate installing new apps
- Customizable background colors via settings
- Fully responsive and lightweight!

---

## 📜 Tech Stack
- HTML5
- CSS3 (Flexbox, Custom Styling)
- Vanilla JavaScript (ES6)

---

## 🔥 Important: Run on Live Server
Because Nebula OS uses **dynamic iframe loading** (`apps/*.html` inside windows), **opening it directly from your file system (file://)** may cause iframe permissions and path errors.

To fix this, you should run it using a **Live Server** (like VS Code’s Live Server extension).

### Run on Live Server (Recommended):
1. Open the project in VS Code.
2. Install and enable the **Live Server** extension.
3. Right-click on `index.html` → **"Open with Live Server"**.
4. Your Nebula OS will open correctly at:  
   [http://127.0.0.1:5500](http://127.0.0.1:5500) or similar.

✅ This ensures iframe apps, windows, and other scripts work properly without restrictions!

---

## 🎯 Todo / Future Enhancements
- Add User Login/Password system
- Bring your own apps and software installation
- Add Sound Effects (bootup, click, error)
- Window snapping to edges
- Multi-user support with user profiles
- Filesystem simulation (create files/folders)

---

## ✨ Contributing
Pull requests are welcome!  
Feel free to submit issues, ideas, or feature requests.

