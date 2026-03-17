import { defineStore } from 'pinia'
import { useIslandStore } from './island'


const islandStore = useIslandStore();


export const useCountdownStore = defineStore('countdown', {
    state: () => ({
        isOpenDropdown: false,
        isStart: false,
        countdownTimeMin: 0,
    }),
    actions: {
        setCountdownTimeMin(min: number) {
            this.countdownTimeMin = min;
        },
        startCountdown() {
            this.isStart = true;
            islandStore.currentComponent = 'Countdown';
        },
        stopCountdown() {
            this.isStart = false;
        },
        clearCountdown() {
            this.isStart = false;
            this.countdownTimeMin = 0;
            islandStore.currentComponent = 'TimeWeather';
        },
        onCountdownFinish() {
            window.systemNotificationApi.send('倒计时结束', '您的倒计时已结束。时长：' + this.countdownTimeMin + '分钟');
            this.clearCountdown();
        },
        async operationSleep(ms: number) {
            // Continuously operating the window quickly may cause the window to fail to focus; 
            // Or the animation hasn't finished, causing the UI to flicker
            // increasing the delay can effectively resolve this.
            await new Promise(resolve => setTimeout(resolve, ms));
        },
        async toggleDropdown() {
            this.isOpenDropdown = !this.isOpenDropdown;
            islandStore.isDropdownActived = !islandStore.isDropdownActived;
            if (islandStore.isDropdownActived) {
                await window.commandApi.setWindowSize(500, 400);
            } else {
                await this.operationSleep(500);
                await window.commandApi.setWindowSize(500, 120);
            }
        },
        async onMouseleaveDropdown() {
            this.isOpenDropdown = false;
            islandStore.isDropdownActived = false;
            await this.operationSleep(500);
            await islandStore.onMouseLeave();
            await window.commandApi.setWindowSize(500, 120);
        },
    }
})
