<script setup lang="ts">
    import { ref, onMounted } from "vue";
    import { NFlex, NSwitch, NCard } from "naive-ui";

    const autoLunchInStartup = ref(false);

    const setAutoLunchInStartup = async (enabled: boolean) => {
        await window.commandApi.setAutoLunchInStartup(enabled);
    };

    onMounted(async () => {
        autoLunchInStartup.value = await window.commandApi.getAutoLunchInStartup();
    });

</script>

<template>
    <NFlex vertical style="padding: 10px;">
        <NCard size="small" embedded hoverable>
            <NFlex justify="space-between" align="center">
                <NFlex vertical style="gap: 5px;">
                    <h2>开机自动启动</h2>
                    <p>实现开机自动启动</p>
                </NFlex>
                <NSwitch v-model:value="autoLunchInStartup" @update:value="setAutoLunchInStartup" />
            </NFlex>
        </NCard>
    </NFlex>
</template>

<style lang="scss" scoped>

</style>