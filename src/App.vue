<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import { useThemeStore } from './stores/theme'
    import { NConfigProvider, NMessageProvider, zhCN, dateZhCN, NDialogProvider } from 'naive-ui'
    import type { GlobalThemeOverrides } from 'naive-ui'

    import InitNaiveUIApi from './components/InitNaiveUIApi.vue'

    const themeStore = useThemeStore()
    themeStore.initTheme()

    const themeOverrides: GlobalThemeOverrides = {}


</script>

<template>
    <div class="mainContext">
        <NConfigProvider 
            :theme="themeStore.currentTheme" :theme-overrides="themeOverrides"
            :locale="zhCN" :date-locale="dateZhCN" 
        >
            <NMessageProvider 
                placement="top-right" :closable="true" 
                :max="5" :keep-alive-on-hover="true" container-style="top: 48px;"
            >
                <NDialogProvider>
                    <InitNaiveUIApi />
                    <RouterView v-slot="{ Component }">
                        <Transition name="slide-fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </RouterView>
                </NDialogProvider>
            </NMessageProvider>
        </NConfigProvider>
    </div>
</template>

<style lang="scss" scoped>
    .mainContext {
        overflow: hidden;

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


 