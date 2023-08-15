<script setup lang="ts">
  import {onMounted} from 'vue';
  onMounted(()=>{
    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement
    body.style.minWidth = body.clientWidth + 'px'
    body.style.minHeight = body.clientHeight + 'px'
  })
  import Item from './components/Item.vue';
</script>

<template>
  <div id="App-root" class="row" style="height: 100%;width: 100%;">
    <div class="col-4" style="height: 100%;">
      <div class="row" style="height: 20%;">
        <div style="height: 100%;padding:0 130px;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
          <span>前一天</span>
          <span>第{{  }}天</span>
          <span>后一天</span>
        </div>
      </div>
      <div class="row" style="height: 80%;">
        <div style="height: 100%;display: flex;padding: 70px 30px 30px 60px;;flex-direction: column;justify-content: flex-start;align-items: center;">
          <div class="sets" style="width: 100%;display: flex;flex-direction: column;justify-content: flex-start;align-items: flex-start;color:white">
            <span>基础物品</span>
            <Item></Item>
          </div>
        </div>
      </div>
    </div>
    <div class="col" style="height: 100%;">

    </div>
  </div>
</template>

<style lang="scss" scoped>
  #App-root{
    font-weight: 550;
    font-size: x-large;
  }
  .sets *{
    margin: 4px;
  }
</style>
