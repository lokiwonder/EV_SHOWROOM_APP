import { app, BrowserWindow, shell, Notification } from 'electron';
import { autoUpdater } from 'electron-updater';
import * as log from 'electron-log'
import { release } from 'os';
import { join } from 'path';

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let win: BrowserWindow | null = null;
// Here you can add more preload scripts
let splash; // = join(__dirname, '../preload/splash.js');
// 🚧 Use ['ENV_NAME'] to avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;

async function createWindow() {
  win = new BrowserWindow({
    title: 'EV SHOWROOM - Electrified',
    width: 1920,
    height: 1080,
    frame: false,
    fullscreen: true,
    icon: join(__dirname, '../resources/icon.png'),
    webPreferences: {
      // preload: splash,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../../index.html'));
  } else {
    win.loadURL(url);
    // win.webContents.openDevTools()
  }

  // if(load) {
  //   if (app.isPackaged) {
  //     win.loadFile(join(__dirname, '../../index.html'));
  //   } else {
  //     win.loadURL(url);
  //     // win.webContents.openDevTools()
  //   }
  // } else {
  //   if (app.isPackaged) {
  //     win.loadFile(join(__dirname, '../preload/splash.html'));
  //   } else {
  //     win.loadFile(join(__dirname, '../../../electron/preload/splash.html'));
  //     // win.webContents.openDevTools()
  //   }
  // }

  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url);
    return { action: 'deny' };
  });

}

autoUpdater.on('checking-for-update', () => {
  new Notification({ title: 'Checking for updates', body: 'Please wait...' }).show();
  log.info('업데이트 확인 중...');
});
autoUpdater.on('update-available', (info) => {
  new Notification({ title: 'Checking for updates', body: 'Please wait...' }).show();
  log.info('업데이트가 가능합니다.');
});
autoUpdater.on('update-not-available', (info) => {
  log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
  log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall(false, true);
        app.relaunch();
        app.exit();
});


app.whenReady().then(() => 
{
  const splash = new BrowserWindow({
    title: 'EV SHOWROOM',
    width: 1920,
    height: 1080,
    frame: false,
    // fullscreen: true,
    webPreferences: {
      // preload: splash,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (app.isPackaged) {
    splash.loadFile(join(__dirname, '../preload/splash.html'));
  } else {
    splash.loadFile(join(__dirname, '../../../electron/preload/splash.html'));
    // win.webContents.openDevTools()
  }
  setTimeout(() => {
    createWindow();
    splash.destroy();
    // setTimeout(() => {
    //   splash.destroy();
    // }, 2000)
  }, 5000);
}
  // {
  //   createWindow(false);
  //   setTimeout(() => {
  //     createWindow(true);
  //   }, 3000);
  // }
);

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows: BrowserWindow[] = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
    // createWindow(false);
    // setTimeout(() => {
    //   createWindow(true);
    // }, 3000);
  }
});
