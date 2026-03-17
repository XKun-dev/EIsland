import { app, BrowserWindow, dialog, ipcMain, clipboard, screen, Notification } from 'electron'
import { readFile, writeFile, mkdir, access, constants, stat } from 'node:fs/promises'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import iconv from 'iconv-lite'


const execAsync = promisify(exec)


class IPCHandlerService {
    private mainWindow!: BrowserWindow;

    public bind(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
        this._initCommandApi();
        this._initFileApi();
        this._initTransparentBgMouseEvents();
        this._initSystemNotification();
    }

    private _initCommandApi() {
        ipcMain.on('window-min', () => {
            this.mainWindow.minimize();
        })
        ipcMain.on('window-max', () => {
            if (this.mainWindow.isMaximized()) {
                this.mainWindow.restore();
            } else {
                this.mainWindow.maximize();
            }
        })
        ipcMain.on('window-close', () => {
            this.mainWindow.close();
            app.quit();
        })
        ipcMain.handle('set-window-size', async (_, width: number, height: number) => {
            this.mainWindow.setMinimumSize(width, height);
            return this.mainWindow.setSize(width, height, false);
        })
        ipcMain.handle('set-window-position', async (_, x: number, y: number) => {
            return this.mainWindow.setPosition(x, y);
        })
        ipcMain.handle('get-system-work-area-size', async () => {
            const size = screen.getPrimaryDisplay().workAreaSize
            return {
                width: size.width || 0,
                height: size.height || 0
            };
        })
        ipcMain.handle('get-auto-lunch-in-startup', async () => {
            const settings = app.getLoginItemSettings()
            return settings.openAtLogin
        })
        ipcMain.handle('set-auto-lunch-in-startup', async (_, enabled: boolean) => {
            const settings = app.getLoginItemSettings()
            if (enabled != settings.openAtLogin) {
                app.setLoginItemSettings({
                    openAtLogin: enabled,
                    openAsHidden: false
                })
            }
        })
        ipcMain.handle('open-browser', async (_, url: string) => {
            switch (process.platform) {
                case "darwin":
                    await execAsync('open ' + url);
                    break;
                case "win32":
                    await execAsync('start ' + url);
                    break;
                default:
                    await execAsync('xdg-open ' + url);
            }
        })
        ipcMain.handle('execute-cmd', async (_, command: string, executeLocationAt: string | null = null) => {
            try {
                let options: any = {
                    timeout: 10000,
                    maxBuffer: 1024 * 1024 * 10,
                    encoding: "buffer"
                }
                if (executeLocationAt) {
                    options.cwd = executeLocationAt
                }
                const { stdout, stderr } = await execAsync("chcp 65001 > nul && " + command, options);
                
                return {
                    status: true,
                    stdout: iconv.decode(stdout, 'gbk') || '',
                    stderr: iconv.decode(stderr, 'gbk') || '',
                    error: ''
                };
            } catch (error: any) {
                return {
                    status: false,
                    stdout: '',
                    stderr: iconv.decode(error.stderr, 'gbk'),
                    error: '命令执行失败'
                };
            }
        });
        ipcMain.handle('copy-to-clipboard', (_, text: string) => {
            try {
                clipboard.writeText(text);
                return {
                    status: true,
                    error: ''
                };
            }
            catch (error) {
                return {
                    status: false,
                    error: (error as Error).message
                };
            }
        })
    }

    private _initFileApi() {
        ipcMain.handle('select-file', async (_, fileType: string[]) => {
            const filepath = await dialog.showOpenDialog(this.mainWindow, {
                properties: ['openFile'],
                filters: [
                    { name: `${fileType.join(',')} files`, extensions: fileType }
                ]
            })
            return filepath.filePaths;
        })
        ipcMain.handle('select-folder', async () => {
            const folderPath = await dialog.showOpenDialog(this.mainWindow, {
                properties: ['openDirectory'],
            })
            return folderPath.filePaths;
        })
        ipcMain.handle('desktop-path', () => {
            return app.getPath('desktop');
        })
        ipcMain.handle('check-path', async (_, path: string) => {
            try {
                await access(path, constants.F_OK);
                return {
                    status: true,
                    isFile: (await stat(path)).isFile(),
                    error: '',
                }
            } 
            catch (err) {
                return {
                    status: false,
                    isFile: false,
                    error: (err as Error).message,
                }
            }
        })
        ipcMain.handle('make-folder', async (_, path: string) => {
            try {
                await mkdir(path, { recursive: true });
                return {
                    status: true,
                    error: '',
                }
            }
            catch (err) {
                return {
                    error: (err as Error).message,
                    status: false,
                }
            }
            
        })


        ipcMain.handle('read-file', async (_, path: string) => {
            try {
                const data = await readFile(path, 'utf-8')
                return {
                    err: '',
                    data: data
                }
            } catch (err) {
                return {
                    err: err,
                    data: ''
                }
            }
        })
        ipcMain.handle('write-file', async (_, path: string, data: string, options: { encoding: BufferEncoding, flag: string }) => {
            try {
                await writeFile(path, data, { ...options })
                return {
                    status: true,
                    err: ''
                }
            } catch (err) {
                return {
                    status: false,
                    err: err
                }
            }
        })
    }

    private _initTransparentBgMouseEvents() {
        ipcMain.handle('ignore-transparent-bg-mouse-events', async (_) => {
            this.mainWindow.setIgnoreMouseEvents(true, { forward: true });
            this.mainWindow.blur();
        })
        ipcMain.handle('unignore-transparent-bg-mouse-events', async (_) => {
            this.mainWindow.setIgnoreMouseEvents(false);
            this.mainWindow.focus();
        })
    }

    private _initSystemNotification() {
        ipcMain.handle('send-notification', async (_, title: string, content: string) => {
            const notification = new Notification({
                title: title,
                body: content
            })
            notification.show()
        })
    }

}



const ipcHandlerService = new IPCHandlerService()

export { ipcHandlerService }