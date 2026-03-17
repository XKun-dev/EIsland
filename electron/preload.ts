import { ipcRenderer, contextBridge } from 'electron'



const minimizeCommand = () => {
    ipcRenderer.send('window-min');
}

const maximizeCommand = () => {
    ipcRenderer.send('window-max');
}

const closeCommand = () => {
    ipcRenderer.send('window-close');
}

const setWindowSize = (width: number, height: number): Promise<void> => {
    return ipcRenderer.invoke('set-window-size', width, height);
}

const setWindowPosition = (x: number, y: number): Promise<void> => {
    return ipcRenderer.invoke('set-window-position', x, y);
}

const getSystemWorkAreaSize = (): Promise<{ width: number, height: number }> => {
    return ipcRenderer.invoke('get-system-work-area-size');
}

const getAutoLunchInStartup = (): Promise<boolean> => {
    return ipcRenderer.invoke('get-auto-lunch-in-startup');
}

const setAutoLunchInStartup = (enabled: boolean): Promise<void> => {
    return ipcRenderer.invoke('set-auto-lunch-in-startup', enabled);
}

const getSelectedFilePath = (fileType: string[]): Promise<string[]> => {
    return ipcRenderer.invoke('select-file', fileType);
}

const getSelectedFolderPath = (): Promise<string[]> => {
    return ipcRenderer.invoke('select-folder');
}

const readFileFromPath = (path: string): Promise<{ data: string, error: string }> => {
    return ipcRenderer.invoke('read-file', path);
}

const writeFileToPath = (
    path: string, data: string, 
    options: { encoding: BufferEncoding, flag: string }
): Promise<{status: boolean, error: string}> => {
    return ipcRenderer.invoke('write-file', path, data, options);
}

const getUserDesktopPath = (): Promise<string> => {
    return ipcRenderer.invoke('desktop-path');
}

const checkPath = (path: string): Promise<{ status: boolean, isFile: boolean, error: string}> => {
    return ipcRenderer.invoke('check-path', path);
}

const makeFolder = (path: string): Promise<{ status: boolean, error: string}> => {
    return ipcRenderer.invoke('make-folder', path);
}

const openDefaultBrowser = (url: string): Promise<void> => {
    return ipcRenderer.invoke('open-browser', url);
}

const executeCommand = (command: string, executeLocationAt: string | null = null): Promise<{
    status: boolean,
    stdout: string,
    stderr: string,
    error: string
}> => {
    return ipcRenderer.invoke('execute-cmd', command, executeLocationAt);
}

const copyToClipboard = (text: string): Promise<{
    status: boolean,
    error: string
}> => {
    return ipcRenderer.invoke('copy-to-clipboard', text);
}

const ignoreTransparentBgMouseEvents = (): Promise<void> => {
    return ipcRenderer.invoke('ignore-transparent-bg-mouse-events');
}

const unignoreTransparentBgMouseEvents = (): Promise<void> => {
    return ipcRenderer.invoke('unignore-transparent-bg-mouse-events');
}

const sendNotification = (title: string, content: string): Promise<void> => {
    return ipcRenderer.invoke('send-notification', title, content);
}


interface CommandAPIType {
    minimizeCommand: () => void,
    maximizeCommand: () => void,
    closeCommand: () => void,
    setWindowSize: (width: number, height: number) => Promise<void>,
    setWindowPosition: (x: number, y: number) => Promise<void>,
    getSystemWorkAreaSize: () => Promise<{ width: number, height: number }>,
    getAutoLunchInStartup: () => Promise<boolean>,
    setAutoLunchInStartup: (enabled: boolean) => Promise<void>,
    openDefaultBrowser: (url: string) => Promise<void>,
    executeCommand: (command: string, executeLocationAt?: string | null) => Promise<{
        status: boolean,
        stdout: string,
        stderr: string,
        error: string
    }>,
    copyToClipboard: (text: string) => Promise<{ status: boolean, error: string }>,
}


contextBridge.exposeInMainWorld('commandApi', {
    minimizeCommand,
    maximizeCommand,
    closeCommand,
    setWindowSize,
    setWindowPosition,
    getSystemWorkAreaSize,
    getAutoLunchInStartup,
    setAutoLunchInStartup,
    openDefaultBrowser,
    executeCommand,
    copyToClipboard,
})


interface FileAPIType {
    readFileFromPath: (path: string) => Promise<{ data: string, error: string }>,
    writeFileToPath: (
        path: string, data: string, 
        options: { encoding: BufferEncoding, flag: string }
    ) => Promise<{status: boolean, error: string}>,
    getSelectedFilePath: (fileType: string[]) => Promise<string[]>,
    getSelectedFolderPath: () => Promise<string[]>,
    getUserDesktopPath: () => Promise<string>,
    checkPath: (path: string) => Promise<{ status: boolean, isFile: boolean, error: string}>,
    makeFolder: (path: string) => Promise<{ status: boolean, error: string }>,
}


contextBridge.exposeInMainWorld('fileApi', {
    readFileFromPath,
    writeFileToPath,
    getSelectedFilePath,
    getSelectedFolderPath,
    getUserDesktopPath,
    checkPath,
    makeFolder,
})


interface TransparentBgMouseAPIType {
    ignoreTransparentBgMouseEvents: () => Promise<void>,
    unignoreTransparentBgMouseEvents: () => Promise<void>,
}

contextBridge.exposeInMainWorld('transparentBgMouseApi', {
    ignoreTransparentBgMouseEvents,
    unignoreTransparentBgMouseEvents,
})

interface SystemNotificationAPIType {
    send: (title: string, content: string) => Promise<void>,
}

contextBridge.exposeInMainWorld('systemNotificationApi', {
    send: sendNotification,
})


declare global {
    interface Window {
        commandApi: CommandAPIType,
        fileApi: FileAPIType,
        transparentBgMouseApi: TransparentBgMouseAPIType,
        systemNotificationApi: SystemNotificationAPIType,
    }
}






