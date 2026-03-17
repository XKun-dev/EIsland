
declare interface Window {
    $message: {
        success: (msg: string) => void,
        error: (msg: string) => void,
        warning: (msg: string) => void,
        info: (msg: string) => void
    }
}

