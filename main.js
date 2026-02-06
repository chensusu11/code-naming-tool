const { app, BrowserWindow } = require('electron');
const path = require('path');

// 禁止多开
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

// 创建窗口
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    resizable: true,  // 允许调整窗口大小
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'icon.ico')  // 可选：自定义图标，没有就删掉这行
  });

  // 加载本地 HTML 文件
  mainWindow.loadFile('index.html');
  
  // 禁止打开开发者工具（打包前可以注释掉，方便调试）
  // mainWindow.webContents.openDevTools();
}

// Electron 初始化完成后创建窗口
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 所有窗口关闭后退出（Mac 除外）
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});