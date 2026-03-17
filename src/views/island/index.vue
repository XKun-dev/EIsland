<script setup lang="ts">
    import { computed, reactive } from "vue";
    import { useThemeStore } from "../../stores/theme";
    import { useIslandStore } from "../../stores/island";
    import { NButton, NFlex, NIcon, NPopconfirm } from "naive-ui";

    import { Settings, Moon, Sunny, Exit, LockClosed, Power } from "@vicons/ionicons5";
    
    import TimeWeather from "./timeWeather.vue";
    import CountdownView from "./countdownView.vue";
    import Countdown from "./countdown.vue";



    const islandStore = useIslandStore();
    islandStore.init()

    const themeStore = useThemeStore();

    const currentComponent = computed(() => {
        switch (islandStore.currentComponent) {
            case 'TimeWeather':
                return TimeWeather;
            case 'Countdown':
                return CountdownView;
            default:
                return TimeWeather;
        }
    });

    const lock = async () => {
        await window.commandApi.executeCommand("Rundll32.exe user32.dll,LockWorkStation");
    };

    const shutdown = reactive({
        isShow: false,
        onSubmit: async () => {
            await window.commandApi.executeCommand("shutdown /s /t 1");
        },
        onShutdownClicked: async () => {
            shutdown.isShow = true;
            islandStore.isDropdownActived = true;
            await window.commandApi.setWindowSize(500, 200);
        },
        onCancelShutdown: async () => {
            shutdown.isShow = false;
            await islandStore.operationSleep(500);
            islandStore.isDropdownActived = false;
            await islandStore.onMouseLeave();
            await window.commandApi.setWindowSize(500, 120);
        }
    })

    const exit = () => {
        window.commandApi.closeCommand()
    }

</script>

<template>
    <div 
        class="islandMainContainer" :class="{ 
            hovered: islandStore.isHovered, clicked: islandStore.isClicked, 
            capsule: islandStore.config.shape === 'capsule', 
            rectangle: islandStore.config.shape === 'rectangle', 
            topFusionBoundary: islandStore.config.shape === 'top-fusion-boundary', 
            bottomRoundedCorner: islandStore.config.shape === 'bottom-rounded-corner'
        }"
        @mouseenter="islandStore.onMouseEnter" @mouseleave="islandStore.onMouseLeave"
        @click="islandStore.isClicked = true"
    >
        <Transition name="slide-fade" mode="out-in">
            <component :is="currentComponent" :key="islandStore.currentComponent" />
        </Transition>
        <NFlex class="actionArea" justify="center" align="center" v-show="islandStore.isClicked">
            <Countdown />
            <NButton text @click="themeStore.changeTheme" :type="themeStore.currentTheme.name == 'dark' ? 'primary' : 'warning'">
                <NIcon size="22" :component="themeStore.currentTheme.name == 'dark' ? Moon : Sunny" />
            </NButton>
            <NButton text type="warning" @click="lock">
                <NIcon size="22" :component="LockClosed" />
            </NButton>
            <NButton text @click="islandStore.toSettingPage" type="primary">
                <NIcon size="22" :component="Settings" />
            </NButton>
            <NPopconfirm trigger="click" :show="shutdown.isShow" @positive-click="shutdown.onSubmit" @negative-click="shutdown.onCancelShutdown" placement="bottom">
                <template #trigger>
                    <NButton text type="error" @click="shutdown.onShutdownClicked">
                        <NIcon size="22" :component="Power" />
                    </NButton>
                </template>
                确定要关机吗？
            </NPopconfirm>
            <NButton text @click="exit" type="error">
                <NIcon size="22" :component="Exit" />
            </NButton>
        </NFlex>
    </div>
</template>

<style lang="scss" scoped>
    .islandMainContainer {
        margin: 0 auto;
        width: 130px;
        height: 40px;
        background-color: var(--div-bg1);
        transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.5s ease;
        cursor: pointer;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        

        &.hovered{
            width: 435px;
        }


        &.clicked {
            height: 100px;
        }

        &.capsule {
            border-radius: 20px;
        }

        &.rectangle {
            border-radius: 0;
        }

        &.topFusionBoundary {
            position: relative;
            border-radius: 0px 0px 20px 20px;
            
            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 0;
                width: 20px;
                height: 20px;
                background: radial-gradient(
                    circle at 0 0, 
                    transparent 19px, 
                    var(--div-bg1) 20px
                );
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
            }
            
            &::before {
                left: -20px;
                transform: rotate(270deg);
            }
            
            &::after {
                right: -20px;
                transform: rotate(180deg);
            }
        }

        &.bottomRoundedCorner {
            border-radius: 0 0 20px 20px;
        }

        .slide-fade-enter-active,
        .slide-fade-leave-active {
            transition: all 0.3s ease;
        }

        .slide-fade-enter-from {
            opacity: 0;
            transform: translateY(10px);
        }

        .slide-fade-leave-to {
            opacity: 0;
            transform: translateY(10px);
        }

    }
</style>