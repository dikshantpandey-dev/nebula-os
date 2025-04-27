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
  }
  