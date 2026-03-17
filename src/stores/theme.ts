import { defineStore } from 'pinia'
import { useOsTheme, lightTheme, darkTheme } from 'naive-ui'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        currentTheme: lightTheme,
    }),
    actions: {
        setTheme(theme: string) {
            document.body.setAttribute("data-theme", theme);
        },
        initTheme() {
            const localTheme = localStorage.getItem("theme");
            if (localTheme) {
                if (localTheme === "dark") {
                    this.currentTheme = darkTheme;
                }
                else {
                    this.currentTheme = lightTheme;
                }
            }
            else {
                const osTheme = useOsTheme();
                this.currentTheme = osTheme.value === "dark" ? darkTheme : lightTheme;
            }
            this.setTheme(this.currentTheme.name)
        },
        changeTheme() {
            if (this.currentTheme.name == "light") {
                this.currentTheme = darkTheme;
                localStorage.setItem("theme", "dark");
            }
            else {
                this.currentTheme = lightTheme;
                localStorage.setItem("theme", "light")
            }            
            this.setTheme(this.currentTheme.name)
        },
        changeThemeTo(theme: string) {
            this.currentTheme = theme === "light" ? lightTheme : darkTheme;
            this.setTheme(this.currentTheme.name)
        },
    }
})
