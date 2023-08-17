<script setup lang="ts">
  import {ref,onMounted} from 'vue';
  import Item from './components/Item.vue';
  import Location from './components/Location.vue'
  import { useStore } from 'vuex';
  function getImgs(arr:Array<string>,group:string){
    let result:Array<any> = []
    for(let item of arr){
      result.push(new URL('./assets/' + group + '/Icon_' + item + '.webp', import.meta.url).href)
    }
    return result
  }
  const BasicItems =  [
    'Food_Canned','Raw_Food','Vegetables','Meal','Bandages','Medicine',
    'Herbal_Medicine','Cigarette','Qualityrollup','Cigarettesrollup','Coffee','CoffeeIcon',
    'Tobacco1','Tobacco2','Herbs','Fertilizer','Medingredients']
  let BasicItemsImgs:Array<any> = getImgs(BasicItems,'BasicItems')
  
  const Materials = [
    'Components','Wood','Parts','Electric_Parts','Sugar','Water',
    'Pure_Alcohol','Broken_Guitar','Helmet','Damaged_Vest','Conduct_Pass','Snow',
    'Weapon_Parts','Shells','Gunpowder','Broken_Pistol','Broken_Shotgun','Broken_Assault_Rifle'
  ]
  let MaterialsImgs:Array<any> = getImgs(Materials,'Materials')
  
  const Consumables = [
    'Filter','Fuel'
  ]
  let ConsumablesImgs:Array<any> = getImgs(Consumables,'Consumables')

  const Other = [
    'Books','Heat_Lamp','Jewel','Mixer','Moonshine','Thermo_Regulator','Snowman','Broken_Toy'
  ]
  let OtherImgs:Array<any> = getImgs(Other,'Other')

  const Equipment = [
    'Crowbar','Lock_Pick','Shovel','Saw','Hatchet'
  ]
  let EquipmentImgs:Array<any> = getImgs(Equipment,'Equipment')

  const Armor = [
    'Helmet','Military_Vest'
  ]
  let ArmorImgs:Array<any> = getImgs(Armor,'Armor')

  const Weapons = [
    'Bullet','Knife','Pistol','Rifle1','Rifle2','Shotgun'
  ]
  let WeaponsImgs:Array<any> = getImgs(Weapons,'Weapons')

  const HouseholdItems = [
    'Bed','Sofa','Chair','Heater','Board_Up','Reinforced_Door',
    'Radio','Guitar','Toy_Box','Boll','Jumping_Rope','Swing'
  ]
  let HouseholdItemsImgs = getImgs(HouseholdItems,'Household Items')
  
  interface Storage{
    [index:string]:Array<number>
  }
  let storageList:Array<Storage> = []
  for(let index = 0;index < 32;index++){
    storageList.push({BasicItems:[],Materials:[],Consumables:[],Other:[],Equipment:[],Armor:[],Weapons:[],HouseholdItems:[]})
  }
  let store = useStore()
  store.commit('INITSTORAGELIST',storageList)

  function switchLocation(index:number){
    store.commit('SWITCHSTORAGE',index)
  }
  function changeStorage(group:string,index:number,newcount:number){
    store.commit('UPDATESTORAGE',{group,index,newcount})
  }
  let day = ref(1)
  function onClick(adop:number){
    if(adop === 1){
      localStorage.setItem(`storageList-${day.value}`,JSON.stringify(storageList))
      day.value += adop
      let localData = localStorage.getItem(`storageList-${day.value}`)
      if(localData !== null){
        storageList = JSON.parse(localData)
        store.commit('INITSTORAGELIST',storageList)
        store.commit('UPDATEDAY',day.value)
      }else{
        localStorage.setItem('day',String(day.value))
      }
    }else if(adop === -1 && day.value > 1){
      day.value += adop
      let localData = localStorage.getItem(`storageList-${day.value}`)
      if(localData !== null){
        storageList = JSON.parse(localData)
        store.commit('INITSTORAGELIST',storageList)
        store.commit('UPDATEDAY',day.value)
      }
    }else if(adop === 0){
      storageList = []
      for(let index = 0;index < 32;index++){
        storageList.push({BasicItems:[],Materials:[],Consumables:[],Other:[],Equipment:[],Armor:[],Weapons:[],HouseholdItems:[]})
      }
      store.commit('INITSTORAGELIST',storageList)
      store.commit('SWITCHSTORAGE',0)
      store.commit('UPDATEDAY',1)
      store.commit('CLEAR')
      day.value = 1
      localStorage.clear()
    }
    return
  }
  let isFilter = ref(false)
  let buttonText = ref('仅看拥有')
  function onClickFilter(){
    // for(let it of itemRefs.value){
    //   console.log(it.count)
    // }
    if(isFilter.value){
      isFilter.value = false
      buttonText.value = '仅看拥有'
    }else{
      isFilter.value = true
      buttonText.value = '查看全部'
    }
  }
  let offset:Array<number> = []
  offset.push(BasicItems.length)
  offset.push(offset[0] + Materials.length)
  offset.push(offset[1] + Consumables.length)
  offset.push(offset[2] + Other.length)
  offset.push(offset[3] + Equipment.length)
  offset.push(offset[4] + Armor.length)
  offset.push(offset[5] + Weapons.length)
  let itemRefs = ref<Array<InstanceType<typeof Item>>>([])
  function itemRef(el: any){
    if(el !== null)
      itemRefs.value.push(el as InstanceType<typeof Item>)
  }
  onMounted(()=>{
    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement
    body.style.minWidth = body.clientWidth + 'px'
    body.style.minHeight = body.clientHeight + 'px'
    let localDay = localStorage.getItem('day')
    if(localDay !== null){
      day.value = Number(localDay)
      let localData = localStorage.getItem(`storageList-${day.value - 1}`)
      if(localData !== null){
        storageList = JSON.parse(localData)
        store.commit('INITSTORAGELIST',storageList)
        store.commit('SWITCHSTORAGE',0)
        store.commit('UPDATEDAY',day.value)
        store.commit('CLEAR')
      }
      
    }
  })
</script>

<template>
  <div id="App-root" class="row" style="height: 100%;width: 100%;">
    <div class="col-4" style="height: 100%;">
      <div class="row" style="height: 20%;">
        <div style="height: 100%;padding:0 130px;display: flex;flex-direction: row;justify-content: center;align-items: center;position: relative;">
          <button id="past" @click="onClick(-1)">回到前一天</button>
          <button id="clear" @click="onClick(0)">清空数据</button>
          <span>第&nbsp;{{ day }}&nbsp;天</span>
          <button id="next" @click="onClick(1)">保存并进入到下一天</button>
          <button id="filter" @click="onClickFilter">{{ buttonText }}</button>
        </div>
      </div>
      <div id="scroll" class="row" style="height: 80%;overflow-y: scroll;">
        <div style="height: auto;display: flex;padding: 50px 20px 100px 60px;flex-direction: column;justify-content: flex-start;align-items: center;">
          <div class="group">
            <span>基础物品</span>
            <div>
              <template v-for="index in BasicItems.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[index - 1].count > 0" :img="BasicItemsImgs[index-1]" group="BasicItems" :index="index-1" ></Item>
              </template>
            </div>
          </div>
          <div class="group">
            <span>材料</span>
            <div>
              <template v-for="index in Materials.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[offset[0] + index - 1].count > 0" :img="MaterialsImgs[index-1]" group="Materials" :index="index-1"></Item>
              </template>
            </div>
          </div>
          <div class="group">
            <span>消耗品</span>
            <div>
              <template v-for="index in Consumables.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[offset[1] + index - 1].count > 0" :img="ConsumablesImgs[index-1]" group="Consumables" :index="index-1"></Item>
              </template>
            </div>
          </div>
          <div class="group">
            <span>其他</span>
            <div>
              <template  v-for="index in Other.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[offset[2] + index - 1].count > 0" :img="OtherImgs[index-1]" group="Other" :index="index-1"></Item>
              </template>
            </div>
          </div>
          <div class="group">
            <span>工具</span>
            <div>
              <template v-for="index in Equipment.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[offset[3] + index - 1].count > 0" :img="EquipmentImgs[index-1]" group="Equipment" :index="index-1"></Item>
              </template>
            </div>
          </div>
          <div class="group">
            <span>防具</span>
            <div>
              <template v-for="index in Armor.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[offset[4] + index - 1].count > 0" :img="ArmorImgs[index-1]" group="Armor" :index="index-1"></Item>
              </template>
            </div>
          </div>
          <div class="group">
            <span>武器</span>
            <div>
              <template v-for="index in Weapons.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[offset[5] + index - 1].count > 0" :img="WeaponsImgs[index-1]" group="Weapons" :index="index-1"></Item>
              </template>
            </div>
          </div>
          <div class="group">
            <span>家具</span>
            <div>
              <template v-for="index in HouseholdItems.length">
                <Item :ref="itemRef" @changeStorage="changeStorage" v-show="!isFilter || itemRefs[offset[6] + index - 1].count > 0" :img="HouseholdItemsImgs[index-1]" group="HouseholdItems" :index="index-1"></Item>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col" style="height: 100%;">
      <div class="locate" style="left:36px;top:670px;">
        <Location @switchLocation="switchLocation(0)" :isBase="true">废弃小屋</Location>
      </div>
      <div class="locate" style="left:197px;top:55px;">
        <Location @switchLocation="switchLocation(1)">建筑工地</Location>
      </div>
      <div class="locate" style="left:169px;top:120px;">
        <Location @switchLocation="switchLocation(2)">公园</Location>
      </div>
      <div class="locate" style="left:82px;top:174px;">
        <Location @switchLocation="switchLocation(3)">别墅废墟</Location>
      </div>
      <div class="locate" style="left:310px;top:158px;">
        <Location @switchLocation="switchLocation(4)">半毁的房屋</Location>
      </div>
      <div class="locate" style="left:1px;top:268px;">
        <Location @switchLocation="switchLocation(5)">仓库</Location>
      </div>
      <div class="locate" style="left:418px;top:214px;">
        <Location @switchLocation="switchLocation(6)">被炮击的学校</Location>
      </div>
      <div class="locate" style="left:51px;top:368px;">
        <Location @switchLocation="switchLocation(7)">贫民窟</Location>
      </div>
      <div class="locate" style="left:246px;top:328px;">
        <Location @switchLocation="switchLocation(8)">面包房</Location>
      </div>
      <div class="locate" style="left:401px;top:304px;">
        <Location @switchLocation="switchLocation(9)">药房</Location>
      </div>
      <div class="locate" style="left:321px;top:372px;">
        <Location @switchLocation="switchLocation(10)">旧城区</Location>
      </div>
      <div class="locate" style="left:85px;top:427px;">
        <Location @switchLocation="switchLocation(11)">城市医院</Location>
      </div>
      <div class="locate" style="left:427px;top:416px;">
        <Location @switchLocation="switchLocation(12)">旅馆</Location>
      </div>
      <div class="locate" style="left:-18px;top:484px;">
        <Location @switchLocation="switchLocation(13)">玩具商店废墟</Location>
      </div>
      <div class="locate" style="left:397px;top:498px;">
        <Location @switchLocation="switchLocation(14)">妓院</Location>
      </div>
      <div class="locate" style="left:-22px;top:549px;">
        <Location @switchLocation="switchLocation(15)">小型公寓楼</Location>
      </div>
      <div class="locate" style="left:290px;top:538px;">
        <Location @switchLocation="switchLocation(16)">军队岗哨</Location>
      </div>
      <div class="locate" style="left:166px;top:612px;">
        <Location @switchLocation="switchLocation(17)">汽修店</Location>
      </div>
      <div class="locate" style="left:671px;top:538px;">
        <Location @switchLocation="switchLocation(18)">被洗劫的加油站</Location>
      </div>
      <div class="locate" style="left:618px;top:602px;">
        <Location @switchLocation="switchLocation(19)">鬼屋</Location>
      </div>
      <div class="locate" style="left:922px;top:565px;">
        <Location @switchLocation="switchLocation(20)">码头</Location>
      </div>
      <div class="locate" style="left:822px;top:608px;">
        <Location @switchLocation="switchLocation(21)">音乐俱乐部</Location>
      </div>
      <div class="locate" style="left:419px;top:654px;">
        <Location @switchLocation="switchLocation(22)">狙击中心</Location>
      </div>
      <div class="locate" style="left:764px;top:676px;">
        <Location @switchLocation="switchLocation(23)">机场</Location>
      </div>
      <div class="locate" style="left:550px;top:723px;">
        <Location @switchLocation="switchLocation(24)">公寓废墟</Location>
      </div>
      <div class="locate" style="left:-5px;top:772px;">
        <Location @switchLocation="switchLocation(25)">圣玛丽教堂</Location>
      </div>
      <div class="locate" style="left:440px;top:768px;">
        <Location @switchLocation="switchLocation(26)">寂静小屋</Location>
      </div>
      <div class="locate" style="left:732px;top:792px;">
        <Location @switchLocation="switchLocation(27)">塞缪尔研究院</Location>
      </div>
      <div class="locate" style="left:338px;top:818px;">
        <Location @switchLocation="switchLocation(28)">被炮击的小屋</Location>
      </div>
      <div class="locate" style="left:42px;top:858px;">
        <Location @switchLocation="switchLocation(29)">超市</Location>
      </div>
      <div class="locate" style="left:636px;top:872px;">
        <Location @switchLocation="switchLocation(30)">被炸的酒厂</Location>
      </div>
      <div class="locate" style="left:117px;top:940px;">
        <Location @switchLocation="switchLocation(31)">火车站</Location>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #App-root{
    font-weight: 550;
    font-size: x-large;
    button{
      position: absolute;
      font-weight: 550;
      font-size: medium;
      background-color: rgb(11,12,7);
      color:aliceblue;
      outline: none;
      transform: rotate(-3deg);
      &:hover:not(:active){
        border:3px solid rgb(255,127,2);
      }
    }
  }
  #past{
    left: 0px;
    top: 45px;
  }
  #clear{
    right: -10px;
    top: 28px;
  }
  #next{
    right: -15px;
    bottom: 41px;
  }
  #filter{
    left: 5px;
    bottom: 22px;
  }
  #scroll::-webkit-scrollbar {
    width: 0 !important
  }
  .group{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    color:white;
    margin: 4px;
    > div{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      > *{
        margin: 5px;
      }
    }
  }
  .locate{
    position: relative;
  }
</style>
