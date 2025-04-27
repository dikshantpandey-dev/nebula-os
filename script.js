function toggleStartMenu() {
  const menu = document.getElementById('start-menu');
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function shutdown() {
  alert('Goodbye! Nebula OS shutting down...');
  location.reload();
}

function lockNebula() {
  document.getElementById('desktop').style.display = 'none';
  document.getElementById('taskbar').style.display = 'none';
  document.getElementById('start-menu').style.display = 'none';
  document.getElementById('lock-screen').style.display = 'flex';
}

function unlockNebula() {
  document.getElementById('lock-screen').style.display = 'none';
  document.getElementById('desktop').style.display = 'flex';
  document.getElementById('taskbar').style.display = 'flex';
}

window.onload = function() {
  setTimeout(() => {
    document.getElementById('boot-screen').style.display = 'none';
    document.getElementById('desktop').style.display = 'flex';
    document.getElementById('taskbar').style.display = 'flex';
    startClock();

    const savedSize = localStorage.getItem('nebula_icon_size');
    if (savedSize) {
      changeDesktopIconSize(savedSize);
    }

    const savedColor = localStorage.getItem('nebula_background');
    if (savedColor) {
      document.body.style.background = savedColor;
    }
  }, 4000);
};

let windowTop = 10;

function openApp(appFile, iconClass = 'fa-window-maximize', title = 'App') {
  const desktop = document.getElementById('desktop');
  const taskbar = document.getElementById('taskbar-apps');

  const windowDiv = document.createElement('div');
  windowDiv.className = 'window';
  windowDiv.style.top = '100px';
  windowDiv.style.left = '100px';
  windowDiv.style.zIndex = windowTop++;

  windowDiv.innerHTML = `
    <div class="window-header">
      <div class="left">
        <i class="fas ${iconClass}"></i> ${title}
      </div>
      <div class="window-controls">
        <button class="btn-minimize">_</button>
        <button class="btn-maximize">▢</button>
        <button class="btn-close">X</button>
      </div>
    </div>
    <iframe src="apps/${appFile}.html"></iframe>
  `;

  desktop.appendChild(windowDiv);
  makeDraggable(windowDiv);

  const taskButton = document.createElement('div');
  taskButton.className = 'taskbar-button';
  taskButton.innerHTML = `<i class="fas ${iconClass}"></i> ${title}`;
  taskButton.onclick = () => {
    windowDiv.style.display = 'block';
    windowDiv.style.zIndex = windowTop++;
  };
  taskbar.appendChild(taskButton);

  windowDiv.taskButton = taskButton;

  windowDiv.querySelector('.btn-minimize').onclick = () => minimizeWindow(windowDiv);
  windowDiv.querySelector('.btn-maximize').onclick = () => maximizeWindow(windowDiv);
  windowDiv.querySelector('.btn-close').onclick = () => closeWindow(windowDiv);
}

function minimizeWindow(windowDiv) {
  windowDiv.style.display = 'none';
}

function maximizeWindow(windowDiv) {
  if (windowDiv.dataset.maximized === 'true') {
    windowDiv.style.width = '400px';
    windowDiv.style.height = '400px';
    windowDiv.style.top = '100px';
    windowDiv.style.left = '100px';
    windowDiv.querySelector('iframe').style.height = '360px';
    windowDiv.dataset.maximized = 'false';
  } else {
    windowDiv.style.top = '0';
    windowDiv.style.left = '0';
    windowDiv.style.width = '100%';
    windowDiv.style.height = 'calc(100% - 40px)';
    windowDiv.querySelector('iframe').style.height = 'calc(100% - 24px)';
    windowDiv.dataset.maximized = 'true';
  }
}

function closeWindow(windowDiv) {
  if (windowDiv.taskButton) {
    windowDiv.taskButton.remove();
  }
  windowDiv.remove();
}

function startClock() {
  const clock = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    clock.innerText = `${month}/${day}/${year}  ${hours}:${minutes} ${ampm}`;
  }, 1000);
}

function changeDesktopIconSize(size) {
  const icons = document.querySelectorAll('.desktop-icon');
  icons.forEach(icon => {
    if (size === 'small') {
      icon.classList.add('small');
      icon.classList.remove('large');
    } else if (size === 'large') {
      icon.classList.add('large');
      icon.classList.remove('small');
    }
  });
}

let deletedIcons = [];
const recycleBinIcon = document.getElementById('icon-recycle-bin');

document.querySelectorAll('.desktop-icon').forEach(icon => {
  icon.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  });
});

if (recycleBinIcon) {
  recycleBinIcon.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  recycleBinIcon.addEventListener('drop', function(e) {
    e.preventDefault();
    const iconId = e.dataTransfer.getData('text/plain');
    const iconElement = document.getElementById(iconId);

    if (iconElement && iconElement.id !== "icon-recycle-bin") {
      deletedIcons.push({
        id: iconElement.id,
        html: iconElement.outerHTML
      });
      iconElement.remove();
      alert('Icon moved to Recycle Bin!');
      localStorage.setItem('recycle_bin', JSON.stringify(deletedIcons));
    }
  });
}

function crashNebula() {
  document.body.innerHTML = `
    <div style="background:#0000aa; color:white; font-family:monospace; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;">
      <h1>A fatal exception has occurred.</h1>
      <p>Press CTRL+ALT+DEL to restart your computer.</p>
      <p><small>NEBULA OS STOP ERROR</small></p>
    </div>
  `;
}

function restoreIcons() {
  const desktop = document.getElementById('desktop');
  const recycleItems = JSON.parse(localStorage.getItem('recycle_bin')) || [];

  recycleItems.forEach(item => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = item.html;
    const restoredIcon = tempDiv.firstChild;
    desktop.appendChild(restoredIcon);

    restoredIcon.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text/plain', restoredIcon.id);
    });
  });

  deletedIcons = [];
  localStorage.removeItem('recycle_bin');
  alert('All icons restored!');
}
