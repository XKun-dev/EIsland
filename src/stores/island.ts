import { defineStore } from 'pinia';
import router from '../router';
import axios from 'axios';


interface IslandConfig {
    shape: 'capsule' | 'rectangle' | 'bottom-rounded-corner' | 'top-fusion-boundary';
}

export interface WeatherInfo {
    province: string;
    city: string;
    district: string;
    adcode: string;
    weather: string;
    weather_icon: string;
    temperature: number;
    wind_direction: string;
    wind_power: string;
    humidity: number;
    report_time: string;
}

export const useIslandStore = defineStore('island', {
    state: () => ({
        currentComponent: 'TimeWeather',
        isClicked: false,
        isHovered: false,
        isDropdownActived: false,
        config: {
            shape: 'capsule'
        } as IslandConfig,
        weatherCache: {
            province: '',
            city: '',
            district: '',
            adcode: '',
            weather: '',
            weather_icon: '',
            temperature: 0,
            wind_direction: '',
            wind_power: '',
            humidity: 0,
            report_time: ''
        } as WeatherInfo,
    }),
    actions: {
        async init() {
            this.config = JSON.parse(localStorage.getItem('islandConfig') || '{}');
            try {
                let response = await axios.get<WeatherInfo>('https://uapis.cn/api/v1/misc/weather');
                this.weatherCache = response.data;
            } catch (error) {
                
            }
        },
        async operationSleep(ms: number) {
            // Continuously operating the window quickly may cause the window to fail to focus; 
            // Or the animation hasn't finished, causing the UI to flicker
            // increasing the delay can effectively resolve this.
            await new Promise(resolve => setTimeout(resolve, ms));
        },
        async onMouseEnter() {
            this.isHovered = true;
            await window.transparentBgMouseApi.unignoreTransparentBgMouseEvents();
        },
        async onMouseLeave() {
            if (this.isDropdownActived) return;
            this.isClicked = false;
            this.isHovered = false;
            await window.transparentBgMouseApi.ignoreTransparentBgMouseEvents();
        },
        async toSettingPage() {
            let { width, height } = await window.commandApi.getSystemWorkAreaSize();
            await window.commandApi.setWindowPosition((width - 800) / 2, (height - 600) / 2);
            await window.commandApi.setWindowSize(800, 600);
            await this.operationSleep(500);
            await window.transparentBgMouseApi.unignoreTransparentBgMouseEvents();
            router.push('/setting');
        },
        async saveConfig() {
            localStorage.setItem('islandConfig', JSON.stringify(this.config));
            let { width } = await window.commandApi.getSystemWorkAreaSize();
            await window.commandApi.setWindowSize(500, 120);
            await window.commandApi.setWindowPosition((width - 500) / 2, 0);
            await window.transparentBgMouseApi.ignoreTransparentBgMouseEvents();
            router.push('/');
        }
    }
})
