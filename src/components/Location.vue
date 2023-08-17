<template>
    <div @mouseover="onMouseOver" @mouseleave="onMouseLeave" @click="onClick">
        <img id="ring" ref="el" style="height: 55px;width: 55px;position: absolute;transform: translate(5px,-1px);" src="../assets/Ring.png"/>
        <img v-if="!isHover" style="height: 45px;width: 45px;margin: 0px 10px;" src="../assets/Location.png"/>
        <img v-if="isHover" style="height: 45px;width: 45px;margin: 0px 10px;" src="../assets/Location-Hover.png"/>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup>
    import {ref,watch,computed,nextTick,onMounted} from 'vue'
    import { useStore } from 'vuex';
    let isHover = ref(false)
    function onMouseOver(){
        if(!isHover.value){
            nextTick(()=>{
                isHover.value = true
            })
        }
    }
    function onMouseLeave(){
        if(isHover.value){
            nextTick(()=>{
                isHover.value = false
            })
        }
    }
    let el = ref(null)
    function onClick(){
        document.querySelector('[selected-location]')?.removeAttribute('selected-location');
        (el.value as unknown as HTMLImageElement).setAttribute('selected-location','true');
        emits('switchLocation')
    }
    const emits = defineEmits(['switchLocation'])
    const props = defineProps<{isBase?:boolean}>()
    onMounted(()=>{
        if(props.isBase){
            document.querySelector('[selected-location]')?.removeAttribute('selected-location');
            (el.value as unknown as HTMLImageElement).setAttribute('selected-location','true');
            emits('switchLocation')
        }
    })
    let store = useStore()
    let clear = computed(()=>{
        return store.state.clear
    })
    watch(clear,()=>{
        if(props.isBase){
            document.querySelector('[selected-location]')?.removeAttribute('selected-location');
            (el.value as unknown as HTMLImageElement).setAttribute('selected-location','true');
            emits('switchLocation')
        }
    })
</script>
<style lang="scss" scoped>
    div{
        cursor: default;
        height: auto;
        width: auto;
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: aliceblue;
        font-weight: normal;
        font-size: medium;
    }
    img{
        -webkit-user-drag: none;
        user-select: none;
    }
    #ring{
        display: none;
    }
    #ring[selected-location]{
        display: block;
    }
</style>