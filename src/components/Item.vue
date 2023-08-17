<template>
    <div style="display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
        <div class="edge" ref="edgeRef" @click="onClickItem" style="height: 80px;width: 80px;padding: 4px;display: flex;position: relative;;justify-content: center;align-items: center;margin-bottom: 6px;">
            <div style="position: absolute;height: 82px;width: 50px;background-color: rgb(11,12,7);">

            </div>
            <div style="position: absolute;height: 50px;width: 82px;background-color: rgb(11,12,7);">

            </div>
            <div>
                <div :ref="plusRef" style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 0;top: 0;">

                </div>
                <div :ref="plusRef" style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 0;top: 14px;">

                </div>
                <div :ref="plusRef" style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 14px;top: 0;">

                </div>
                <div :ref="plusRef" style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 14px;top: 14px;">

                </div>
                <div :ref="plusRef" style="position: absolute;height: 22px;width: 4px;z-index: 2;right: 18px;top: 0;">

                </div>
                <div :ref="plusRef" style="position: absolute;height: 4px;width: 22px;z-index: 2;right: 0;top: 18px;">

                </div>
                <div :ref="plusRef" style="position: absolute;height: 4px;width: 22px;z-index: 2;right: 0;top: 0;">

                </div>
                <div :ref="plusRef" style="position: absolute;height: 22px;width: 4px;z-index: 2;right: 0;top: 0;">

                </div>
            </div>
            <div style="height: 100%;width: 100%;background-color: rgb(11,12,7);z-index: 1;">
                <img style="height: 100%;width: 100%;"  :src="props.img"/>
            </div>
        </div>
        <input v-model="count" @mousewheel.prevent="onMouseWheel" @click="onClickNumber" @keydown="onKeyDown"/>
    </div>
</template>
<script lang="ts" setup>
    import {ref,watch,computed,onMounted} from 'vue'
    import { useStore } from 'vuex'
    let edgeRef = ref(null)
    let plusRefs = ref<Array<HTMLDivElement>>([])
    function plusRef(el:any){
        if(el !== null)
            plusRefs.value.push(el as HTMLDivElement)
    }
    function onClickItem(){
        const edgeEl = edgeRef.value as unknown as HTMLDivElement
        if(edgeEl.getAttribute('selected-item') !== null){
            const keyframes = [
                {transform: 'scale(1.05)'},
                {transform: 'scale(1)'}
            ]
            const options = <KeyframeAnimationOptions>{
                // 动画执行次数
                iterations: 2,
                // 动画开始时间点
                iterationStart: 0,
                // 动画开始之前的延迟
                delay: 0,
                // 动画结束之后的延迟
                endDelay: 0,
                // 动画是否在下一周期逆向播放
                direction: 'alternate',
                // 动画时长
                duration: 130,
                // 动画前后保持的状态
                fill: 'both',
                // 动画缓动类型
                easing: 'linear',
            };
            edgeEl.animate(keyframes,options)
            if(count.value > 0)
                count.value -= 1
        }else{
            for(let sle of document.querySelectorAll('[selected-item]')){
                sle.removeAttribute('selected-item')
            }
            for(let ple of plusRefs.value){
                ple.setAttribute('selected-item','true')
            }
            edgeEl.setAttribute('selected-item','true')
        }
    }
    const props = defineProps<{
        img:string,
        group:string,
        index:number
    }>()
    const emits = defineEmits(['changeStorage'])
    let store = useStore()
    let count = ref(0)
    watch(count,(newvalue)=>{
        if(count.value === undefined || (typeof newvalue === "string" && (newvalue as string).length === 0)){
            count.value = 0
            emits('changeStorage',props.group,props.index,count.value)
        }
        if(isSwitch.value){
            isSwitch.value = false
            return
        }
        if(newvalue > 999){
            count.value = 999
            emits('changeStorage',props.group,props.index,count.value)
        }
        emits('changeStorage',props.group,props.index,count.value)
    })
    let isSwitch = ref(false)
    //当需要监视vuex中state状态变化时，可以手动创建一个computed变量，关联该state，再监视该computed。
    let index = computed(()=>{
        return store.state.index
    })
    watch(index,()=>{
        count.value = store.getters['getCurrent'][props.group][props.index]
        isSwitch.value = true
    })
    let day = computed(()=>{
        return store.state.day
    })
    watch(day,()=>{
        count.value = store.getters['getCurrent'][props.group][props.index]
        isSwitch.value = true
    })
    onMounted(()=>{
        if(store.getters['getCurrent'][props.group][props.index] !== undefined)
            count.value = store.getters['getCurrent'][props.group][props.index]
        isSwitch.value = true
    })
    function onMouseWheel(event:WheelEvent){
        if(event.deltaY > 0 && count.value === 0)
            count.value = 0
        else if(event.deltaY > 0)
            count.value -= 1
        else
            count.value += 1
    }
    function onClickNumber(event:MouseEvent){
        const edgeEl = edgeRef.value as unknown as HTMLDivElement
        for(let sle of document.querySelectorAll('[selected-item]')){
            sle.removeAttribute('selected-item')
        }
        for(let ple of plusRefs.value){
            ple.setAttribute('selected-item','true')
        }
        edgeEl.setAttribute('selected-item','true');
        (event.target as HTMLInputElement).select();
    }
    function onKeyDown(event: KeyboardEvent){
        const target = event.target as HTMLDivElement
        
        if(event.key === 'Enter')
            target.blur()
        let isNum = /[0-9]/
        if(!isNum.test(event.key) && event.key.length <= 1)
            event.preventDefault();
        
    }
    defineExpose({
        count
    })
</script>
<style lang="scss" scoped>
    img{
        -webkit-user-drag: none;
        user-select: none;
    }
    input{
        height: 1em;
        width: 36px;
        text-align: center;
        color: aliceblue;
        font-weight: 550;
        font-size: medium;
        white-space: nowrap;
        background-color: rgb(11,12,7,0);
        outline: none;
        overflow: hidden;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom-color: rgba(11,12,7,0);
    }
    input:hover{
        border-bottom-color: aliceblue;
    }
    @keyframes anim-hover{
        0%{
            scale: (1);
        }
        100%{
            scale: (1.05);
        }
    }
    .edge{
        background-color: rgb(255,255,255);
        &:hover:not([selected-item]){
            background-color: rgb(255,127,2);
            animation: anim-hover 130ms linear 0s 1 normal both;
        }
        &[selected-item]{
            transform: scale(1.05);
        }
    }
    [selected-item]{
        background-color: rgb(255,127,2);
    }
</style>