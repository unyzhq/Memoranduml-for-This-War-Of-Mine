<script setup lang="ts">
  import {onMounted} from 'vue';
  import Item from './components/Item.vue';
  onMounted(()=>{
    const body = document.getElementsByTagName('body')[0] as HTMLBodyElement
    body.style.minWidth = body.clientWidth + 'px'
    body.style.minHeight = body.clientHeight + 'px'
  })
  function getImgs(arr:Array<string>,group:string){
    let result:Array<any> = []
    for(let item of arr){
      result.push(new URL('./assets/' + group + '/Icon_' + item + '.webp', import.meta.url).href)
    }
    return result
  }
  const BasicItems =  [
    'Food_Canned','Raw_Food','Vegetables','Meal','Bandages','Medicine',
    'Herbal_Medicine','Cigarette','Qualityrollup','Cigarettesrollup','Coffee','Tobacco1',
    'Tobacco2','Herbs','Fertilizer','Medingredients']
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
    'Books','Heat_Lamp','Jewel','Mixer','Moonshine','Snowman','Thermo_Regulator'
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
      <div id="scroll" class="row" style="height: 80%;overflow-y: scroll;">
        <div style="height: auto;display: flex;padding: 50px 20px 100px 60px;flex-direction: column;justify-content: flex-start;align-items: center;">
          <div class="group">
            <span>基础物品</span>
            <div>
              <Item v-for="index in 16" :img="BasicItemsImgs[index-1]" ></Item>
            </div>
          </div>
          <div class="group">
            <span>材料</span>
            <div>
              <Item v-for="index in 18" :img="MaterialsImgs[index-1]"></Item>
            </div>
          </div>
          <div class="group">
            <span>消耗品</span>
            <div>
              <Item v-for="index in 2" :img="ConsumablesImgs[index-1]"></Item>
            </div>
          </div>
          <div class="group">
            <span>其他</span>
            <div>
              <Item v-for="index in 7" :img="OtherImgs[index-1]"></Item>
            </div>
          </div>
          <div class="group">
            <span>工具</span>
            <div>
              <Item v-for="index in 5" :img="EquipmentImgs[index-1]"></Item>
            </div>
          </div>
          <div class="group">
            <span>防具</span>
            <div>
              <Item v-for="index in 2" :img="ArmorImgs[index-1]"></Item>
            </div>
          </div>
          <div class="group">
            <span>武器</span>
            <div>
              <Item v-for="index in 6" :img="WeaponsImgs[index-1]"></Item>
            </div>
          </div>
          <div class="group">
            <span>家具</span>
            <div>
              <Item v-for="index in 12" :img="HouseholdItemsImgs[index-1]"></Item>
            </div>
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
</style>
