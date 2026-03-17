<script setup lang="ts">
    import { useThemeStore } from "../stores/theme";
    import { useIslandStore } from "../stores/island";
    import { NIcon } from 'naive-ui'
    import { Close } from '@vicons/ionicons5'
    import logoBlack from '../assets/resource/logo-black.ico';
    import logoWhite from '../assets/resource/logo-white.ico';

    const themeStore = useThemeStore();
    const islandStore = useIslandStore();


</script>

<template>
    <div class="titlebar" align="center">
        <img 
            :src="themeStore.currentTheme.name == 'dark' ? logoWhite : logoBlack" 
            alt="" width="24px" height="24px" style="margin-left: 10px;"
        >
        <span>EIsland</span>
        <button class="close" id="close" @click="islandStore.saveConfig">
            <NIcon size="18">
                <Close />
            </NIcon>
        </button>
    </div>
</template>

<style lang="scss" scoped>
    .titlebar {
        position: fixed;
        top: 0;
        left: 0;

        width: 100%;
        height: 36px;
        background-color: var(--div-bg1);
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(128, 128, 128, 0.2);

        display: flex;
        align-items: center;
        gap: 2px;

        z-index: 9999;

        span {
            flex: 1;
            height: 36px;
            margin-left: 5px;
            margin-right: auto;
            text-align: left;
            font-size: 15px;
            color: var(--font-color);
            line-height: 36px;
            -webkit-app-region: drag;
        }

        button {
            height: 36px;
            width: 36px;
            color: var(--font-color);
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;

            display: flex;
            align-items: center;
            justify-content: center;

            
            &:hover {
                background-color: rgba(128, 128, 128, 0.1);
            }

        }

        .close:hover {
            color: white;
            background-color: red !important;
        }

    }

</style>