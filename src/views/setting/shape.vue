<script setup lang="ts">
    import { ref } from "vue";
    import { useIslandStore } from '../../stores/island';
    import { NCard, NGrid, NGridItem, NFlex, NIcon } from "naive-ui";
    import { Sunny, Moon } from '@vicons/ionicons5';
    
    const islandStore = useIslandStore();
    
</script>

<template>
    <NGrid cols="2" x-gap="5" y-gap="5" style="padding: 10px;">
        <NGridItem>
            <NCard hoverable embedded style="border-width: 2px;" :bordered="islandStore.config.shape === 'capsule'" @click="islandStore.config.shape = 'capsule'">
                <NFlex justify="center" align="center">
                    <div class="shapeExample capsule"></div>
                    <NFlex vertical style="flex: 1;">
                        <h2>胶囊形</h2>
                        <p>经典胶囊形，四边圆角，视觉柔和</p>
                    </NFlex>
                </NFlex>
            </NCard>
        </NGridItem>
        <NGridItem>
            <NCard hoverable embedded style="border-width: 2px;" :bordered="islandStore.config.shape === 'rectangle'" @click="islandStore.config.shape = 'rectangle'">
                <NFlex justify="center" align="center">
                    <div class="shapeExample rectangle"></div>
                    <NFlex vertical style="flex: 1;">
                        <h2>矩形</h2>
                        <p>经典矩形，四边直角，视觉分明</p>
                    </NFlex>
                </NFlex>
            </NCard>
        </NGridItem>
        <NGridItem>
            <NCard hoverable embedded style="border-width: 2px;" :bordered="islandStore.config.shape === 'top-fusion-boundary'" @click="islandStore.config.shape = 'top-fusion-boundary'">
                <NFlex justify="center" align="center">
                    <div class="shapeExample top-fusion-boundary"></div>
                    <NFlex vertical style="flex: 1;">
                        <h2>上融合边界</h2>
                        <p>上部与屏幕边界融合，下部圆角</p>
                    </NFlex>
                </NFlex>
            </NCard>
        </NGridItem>
        <NGridItem>
            <NCard hoverable embedded style="border-width: 2px;" :bordered="islandStore.config.shape === 'bottom-rounded-corner'" @click="islandStore.config.shape = 'bottom-rounded-corner'">
                <NFlex justify="center" align="center">
                    <div class="shapeExample bottom-rounded-corner"></div>
                    <NFlex vertical style="flex: 1;">
                        <h2>下圆角</h2>
                        <p>下部圆角，上部直角，形状特殊</p>
                    </NFlex>
                </NFlex>
            </NCard>
        </NGridItem>
    </NGrid>
</template>

<style lang="scss" scoped>
    .shapeExample {
        width: 80px;
        height: 40px;
        background-color: rgba(128, 128, 128, 0.5);

        &.capsule {
            border-radius: 20px;
        }

        &.rectangle {
            border-radius: 0;
        }
        &.top-fusion-boundary {
            width: 60px;
            margin: 0px 10px;
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
                    rgba(128, 128, 128, 0.5) 20px
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
        &.bottom-rounded-corner {
            border-radius: 0 0 20px 20px;
        }
    }
</style>