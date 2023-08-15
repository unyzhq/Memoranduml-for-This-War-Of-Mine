<template>
    <div class="edge" @mouseover="onMouseOver" @mouseleave="onMouseLeave" style="height: 80px;width: 80px;padding: 4px;display: flex;position: relative;;justify-content: center;align-items: center;">
        <div style="position: absolute;height: 100%;width: 50px;background-color: rgb(11,12,7);">

        </div>
        <div style="position: absolute;height: 50px;width: 100%;background-color: rgb(11,12,7);">

        </div>
        <div class="edge" add style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 0;top: 0;">

        </div>
        <div class="edge" add style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 0;top: 14px;">

        </div>
        <div class="edge" add style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 14px;top: 0;">

        </div>
        <div class="edge" add style="position: absolute;height: 8px;width: 8px;z-index: 2;right: 14px;top: 14px;">

        </div>
        <div class="edge" add style="position: absolute;height: 22px;width: 4px;z-index: 2;right: 18px;top: 0;">

        </div>
        <div class="edge" add style="position: absolute;height: 4px;width: 22px;z-index: 2;right: 0;top: 18px;">

        </div>
        <div class="edge" add style="position: absolute;height: 4px;width: 22px;z-index: 2;right: 0;top: 0;">

        </div>
        <div class="edge" add style="position: absolute;height: 22px;width: 4px;z-index: 2;right: 0;top: 0;">

        </div>
        <div style="height: 100%;width: 100%;background-color: rgb(11,12,7);z-index: 1;">
            
        </div>
    </div>
</template>
<script lang="ts" setup>
    function onMouseOver(){
        for(let el of document.getElementsByClassName('edge')){
            const El = el as HTMLDivElement
            El.style.backgroundColor = 'rgb(255,127,2)'
        }
    }
    function onMouseLeave(){
        for(let el of document.getElementsByClassName('edge')){
            const El = el as HTMLDivElement
            El.style.backgroundColor = 'rgb(255,255,255)'
        }
    }
</script>
<style lang="scss">
    .edge{
        background-color: rgb(255,255,255);
    }
</style>