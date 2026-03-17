<script setup lang="ts">
    import { computed } from "vue";
    import { ref } from "vue";
    import { useIslandStore } from "../../stores/island";
    import { NFlex, NIcon } from "naive-ui";
    import { Rainy, Navigate, Warning, Sunny, Cloudy, Snow } from "@vicons/ionicons5"

    
    const islandStore = useIslandStore();
    
    function getCurrentTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');

        return `${hour}:${minute}:${second}`;
    }
    const datetime = ref(getCurrentTime());

    setInterval(() => {
        datetime.value = getCurrentTime();
    }, 1000);

    const weatherIcon = computed(() => {
        if (islandStore.weatherCache.weather === '晴') {
            return Sunny;
        } else if (islandStore.weatherCache.weather === '多云') {
            return Cloudy;
        } else if (islandStore.weatherCache.weather.includes('雨')) {
            return Rainy;
        } else if (islandStore.weatherCache.weather.includes('雪')) {
            return Snow;
        } else {
            return Cloudy;
        }
    });

</script>

<template>
    <NFlex :wrap="false" justify="center" align="center" style="gap: 15px;">
        <span style="font-weight: bolder; font-size: 16px;">{{ datetime }}</span>
        <NFlex class="weather" justify="center" align="center" style="gap: 5px;" v-if="islandStore.isHovered && islandStore.weatherCache.district == ''">
            <NIcon size="18" :component="Warning" />
            <span>天气信息获取失败</span>
        </NFlex>
        <NFlex class="weather" justify="center" align="center" style="gap: 5px;" v-show="islandStore.isHovered">
            <NIcon size="18" :component="Navigate" />
            <span>{{ islandStore.weatherCache.district }}</span>
            <NIcon size="18" :component="weatherIcon" />
            <span>{{ islandStore.weatherCache.weather }} {{ islandStore.weatherCache.temperature }}℃</span>
        </NFlex>
    </NFlex>
</template>

<style lang="scss" scoped>
    .weather {
        opacity: 0;
        animation: fadeIn 0.5s ease-in forwards;

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        span {
            font-weight: bolder;
            font-size: 16px;
        }
    }
    
</style>