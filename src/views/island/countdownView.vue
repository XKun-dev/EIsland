<script setup lang="ts">
    import { useIslandStore } from "../../stores/island";
    import { useCountdownStore } from "../../stores/countdown";
    import { NFlex, NCountdown, NIcon, NButton } from "naive-ui";
    import { Timer, CloseCircle, StopCircle, PlayCircle } from '@vicons/ionicons5';

    const islandStore = useIslandStore();
    const countdownStore = useCountdownStore();

</script>

<template>
    <NFlex :wrap="false" justify="center" align="center" style="gap: 5px;">
        <NButton text type="info"><NIcon size="22" :component="Timer" /></NButton>
        <span style="font-weight: bolder; font-size: 16px;" >
            <NCountdown 
                :duration="countdownStore.countdownTimeMin * 60 * 1000" 
                :active="countdownStore.isStart" 
                @finish="countdownStore.onCountdownFinish" 
            />
        </span>
        <NButton
            v-if="countdownStore.isStart"
            style="margin-left: 5px;"
            text type="warning" v-show="islandStore.isHovered" 
            @click.stop="countdownStore.stopCountdown"
        >
            <NIcon size="22" :component="StopCircle" />
        </NButton>
        <NButton
            v-else
            style="margin-left: 5px;"
            text type="primary" v-show="islandStore.isHovered" 
            @click.stop="countdownStore.startCountdown"
        >
            <NIcon size="22" :component="PlayCircle" />
        </NButton>
        <NButton 
            text type="error" v-show="islandStore.isHovered" 
            @click.stop="countdownStore.clearCountdown"
        >
            <NIcon size="22" :component="CloseCircle" />
        </NButton>
    </NFlex>
</template>

<style lang="scss" scoped>

</style>