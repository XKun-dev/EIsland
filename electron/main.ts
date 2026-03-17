import { app, BrowserWindow, screen, Tray, Menu } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { ipcHandlerService } from './ipcHandler'



const appSingleInstanceLock = app.requestSingleInstanceLock();
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainWindow: BrowserWindow | null
let tray: Tray | null = null


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 120,
        title: "EIsland",
        show: false,
        autoHideMenuBar: true,
        icon: path.join(process.env.VITE_PUBLIC, 'logo.ico'),
        titleBarStyle: 'hidden',
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true, // The program icon does not appear on the taskbar
        webPreferences: {
            sandbox: false,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.mjs'),
            backgroundThrottling: false,
        },
    })
    
    mainWindow.setIgnoreMouseEvents(true, { forward: true })
    mainWindow.setPosition((screen.getPrimaryDisplay().workAreaSize.width - 500) / 2, 0)

    if (VITE_DEV_SERVER_URL) {
        mainWindow.webContents.openDevTools()
        mainWindow.loadURL(VITE_DEV_SERVER_URL)
    } else {
        mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }

    ipcHandlerService.bind(mainWindow)

    mainWindow.on('ready-to-show', () => {
        mainWindow?.show()
    })

}


function createTray() {
    const iconPath = path.join(process.env.VITE_PUBLIC || '', 'logo.ico');
    tray = new Tray(iconPath);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '显示灵动岛',
            click: () => {
                mainWindow?.show();
            }
        },
        {
            label: '隐藏灵动岛',
            click: () => {
                mainWindow?.hide();
            }
        },
        { type: 'separator' },
        {
            label: '退出程序',
            click: () => {
                app.quit();
                tray?.destroy();
            }
        }
    ]);

    tray.setToolTip('EIsland');
    tray.setContextMenu(contextMenu);

    tray.on('click', () => {
        if (mainWindow?.isVisible()) {
            mainWindow?.hide();
        } else {
            mainWindow?.show();
            mainWindow?.focus();
        }
    });
}


app.on('window-all-closed', () => {
    // When all windows are closed, it does not exit; you need to exit from the tray.
})


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


if (!appSingleInstanceLock) {
    app.quit();
}
else {
    app.whenReady().then(() => {
        createWindow();
        createTray();
    })
}




