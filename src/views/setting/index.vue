<script setup lang="ts">
    import type { Component } from "vue";
    import { ref, h, computed } from "vue";
    import { useRoute, RouterLink } from "vue-router";
    import type { MenuOption } from 'naive-ui'
    import { NMenu, NIcon, NLayoutSider, NLayout } from "naive-ui";

    import TitleBarCustom from '../../components/TitlebarCustom.vue';

    import { ColorFilter, Shapes, Cog } from '@vicons/ionicons5'
    
    const route = useRoute();

    const collapsed = ref<boolean>(true);
    const selectedKeys = computed(() => { return route.name?.toString() });

    const renderIcon = (icon: Component) => {
        return () => h(NIcon, null, { default: () => h(icon) })
    }

    const useRouterLinkLabel = (
        text: string, pathName: string, 
        params: Record<any, any> = {}, query: Record<any, any> = {}) => {

        return () => h(RouterLink, 
            {
                to: {
                    name: pathName,
                    params: { ...params },
                    query: { ...query }
                },
            },
            { default: () => text }
        )
    }

    const menuOptions: MenuOption[] = [
        {
            label: useRouterLinkLabel('形状设置', 'setting.shape'),
            key: 'setting.shape',
            icon: renderIcon(Shapes),
        },
        {
            label: useRouterLinkLabel('主题设置', 'setting.theme'),
            key: 'setting.theme',
            icon: renderIcon(ColorFilter),
        },
        {
            label: useRouterLinkLabel('启动项', 'setting.lunch'),
            key: 'setting.lunch',
            icon: renderIcon(Cog),
        }
    ]



</script>

<template>
    <div class="container">
        <TitleBarCustom />
        <div class="main">
            <NLayout has-sider style="height: 100%;">
                <NLayoutSider
                    bordered
                    collapse-mode="width"
                    :collapsed-width="64"
                    :width="240"
                    :collapsed="collapsed"
                    show-trigger
                    @collapse="collapsed = true"
                    @expand="collapsed = false"
                    style="z-index: 2;"
                >
                    <NMenu
                        :value="selectedKeys"
                        :collapsed="collapsed"
                        :collapsed-width="64"
                        :collapsed-icon-size="22"
                        :root-indent="12"
                        :options="menuOptions"
                        accordion
                    />
                </NLayoutSider>
                <div class="containerView">
                    <RouterView v-slot="{ Component }">
                        <Transition name="slide-fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </RouterView>
                </div>
            </NLayout>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;
        background-color: var(--div-bg1);
        
        .main {
            position: relative;
            width: 100%;
            height: calc(100vh - 36px);
            margin-top: 36px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;


            .containerView {
                width: 100%;
                height: 100%;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }

                &::-webkit-scrollbar-track {
                    background: transparent;
                    border-radius: 3px;
                }

                &::-webkit-scrollbar-thumb {
                    background: rgba(128, 128, 128, 0.6);
                    border-radius: 3px;
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


        }

    }
</style>