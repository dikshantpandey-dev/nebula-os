const contextMenu = document.getElementById('context-menu');
let desktop = document.getElementById('desktop');
let clickedIcon = null;

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();

  if (e.target.closest('.desktop-icon')) {
    clickedIcon = e.target.closest('.desktop-icon');
  } else {
    clickedIcon = null;
  }

  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.left = `${e.clientX}px`;
  contextMenu.style.display = 'block';
});

document.addEventListener('click', function () {
  contextMenu.style.display = 'none';
});

function refreshPage() {
  location.reload();
}

function createNewFolder() {
  const folder = document.createElement('div');
  folder.className = 'desktop-icon';
  folder.draggable = true;
  folder.innerHTML = `<i class="fas fa-folder"></i><br>New Folder`;

  folder.ondblclick = () => {
    alert('Opening Folder: ' + folder.innerText.trim());
  };

  folder.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('text/plain', folder.id);
  });

  desktop.appendChild(folder);
}

function showProperties() {
  if (!clickedIcon) {
    alert('Please right-click an icon.');
    return;
  }

  const propWindow = document.getElementById('properties-window');
  const nameText = clickedIcon.innerText.trim();
  const createdDate = new Date().toLocaleDateString();

  document.getElementById('prop-name').innerText = `Name: ${nameText}`;
  document.getElementById('prop-type').innerText = `Type: Shortcut`;
  document.getElementById('prop-created').innerText = `Created: ${createdDate}`;

  propWindow.style.display = 'block';
}

function closeProperties() {
  document.getElementById('properties-window').style.display = 'none';
}
