<script setup lang="ts">
    import { ref } from "vue";
    import { useThemeStore } from "../../stores/theme";
    import { NCard, NGrid, NGridItem, NFlex, NIcon } from "naive-ui";
    import { Sunny, Moon } from '@vicons/ionicons5';
    

    const themeStore = useThemeStore();
    
</script>

<template>
    <NGrid cols="2" x-gap="5" y-gap="5" style="padding: 10px;">
        <NGridItem>
            <NCard hoverable embedded :bordered="themeStore.currentTheme.name === 'light'" style="border-width: 2px;" @click="themeStore.changeThemeTo('light')">
                <NFlex justify="center" align="center">
                    <NIcon size="40" :component="Sunny" />
                    <NFlex vertical style="flex: 1;">
                        <h2>浅色主题</h2>
                        <p>白色背景、黑色文字</p>
                    </NFlex>
                </NFlex>
            </NCard>
        </NGridItem>
        <NGridItem>
            <NCard hoverable embedded :bordered="themeStore.currentTheme.name === 'dark'" style="border-width: 2px;" @click="themeStore.changeThemeTo('dark')">
                <NFlex justify="center" align="center">
                    <NIcon size="40" :component="Moon" />
                    <NFlex vertical style="flex: 1;">
                        <h2>深色主题</h2>
                        <p>黑色背景、白色文字</p>
                    </NFlex>
                </NFlex>
            </NCard>
        </NGridItem>
    </NGrid>
</template>

<style lang="scss" scoped>

</style>