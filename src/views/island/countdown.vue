<script setup lang="ts">
    import { computed, h } from 'vue';
    import { NDropdown, NButton, NIcon, NFlex, NText, NSlider } from 'naive-ui';
    import { useCountdownStore } from '../../stores/countdown';

    import { Timer } from '@vicons/ionicons5'

    const countdownStore = useCountdownStore();

    const dropdownOptions = computed(() => [
        {
            key: 'countdown',
            type: 'render',
            render: () => h(NFlex, { justify: 'space-between', align: 'center', style: { padding: '15px' } }, {
                default: () => [
                    h(NText, {}, { default: () => '计时器' }),
                    h(NButton, { type: 'error', secondary: true, size: 'tiny', onClick: () => { countdownStore.clearCountdown(); } }, { default: () => '清空' })
                ]
            })
        },
        {
            key: 'header-divider',
            type: 'divider'
        },
        {
            key: 'plan',
            type: 'render',
            render: () => h(NFlex, { justify: 'space-between', align: 'center', style: { padding: '15px' } }, {
                default: () => [
                    h(
                        NButton, 
                        { 
                            secondary: true, size: 'tiny', disabled: countdownStore.isStart, 
                            onClick: () => { countdownStore.setCountdownTimeMin(5); } 
                        }, 
                        { default: () => '5 分钟' }
                    ),
                    h(
                        NButton, 
                        { 
                            secondary: true, size: 'tiny', disabled: countdownStore.isStart, 
                            onClick: () => { countdownStore.setCountdownTimeMin(10); } 
                        }, 
                        { default: () => '10 分钟' }
                    ),
                    h(
                        NButton, 
                        { 
                            secondary: true, size: 'tiny', disabled: countdownStore.isStart, 
                            onClick: () => { countdownStore.setCountdownTimeMin(30); } 
                        }, 
                        { default: () => '30 分钟' }
                    ),
                    h(
                        NButton, 
                        { 
                            secondary: true, size: 'tiny', disabled: countdownStore.isStart, 
                            onClick: () => { countdownStore.setCountdownTimeMin(60); } 
                        }, 
                        { default: () => '60 分钟' }
                    ),
                    h(
                        NSlider, 
                        { 
                            step: 1, min: 1, max: 180, disabled: countdownStore.isStart, 
                            value: countdownStore.countdownTimeMin,
                            onUpdateValue(value) {
                                countdownStore.setCountdownTimeMin(value);
                            }, 
                            formatTooltip(value) { return `${value} Min`;}, 
                            style: { marginTop: '15px' } 
                        }
                    )
                ]
            })
        },
        {
            key: 'submit',
            type: 'render',
            render: () => h(NFlex, { justify: 'center', align: 'center', style: { padding: '15px' } }, {
                default: () => [
                    h(
                        NButton, 
                        { 
                            type: 'primary', size: 'small', disabled: countdownStore.isStart, style: { width: '100%' },
                            onClick: () => { countdownStore.startCountdown(); }
                        }, 
                        { default: () => '开始' }
                    )
                ]
            })
        }
    ]);



</script>

<template>
    <NDropdown
        trigger="click"
        :show-arrow="true"
        :options="dropdownOptions"
        :show="countdownStore.isOpenDropdown"
        placement="bottom"
        @mouseleave="countdownStore.onMouseleaveDropdown"
    >
        <NButton text @click="countdownStore.toggleDropdown" type="info">
            <NIcon size="22" :component="Timer" />
        </NButton>
    </NDropdown>
</template>
