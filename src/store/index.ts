import {createStore} from 'vuex'

const actions = {

}
const mutations = {
    SWITCHSTORAGE(state: { index:number,storageList: { [index:number]: {[index:string]:Array<number>} } },value: number){
        state.index = value
    },
    UPDATESTORAGE(state: { index:number,storageList: { [index:number]: {[index:string]:Array<number>} } },props : {group:string,index:number,newcount:number}){
        state.storageList[state.index][props.group][props.index] = props.newcount
    },
    UPDATEDAY(state: { index:number,storageList: { [index:number]: {[index:string]:Array<number>} },day:number},day:number){
        state.day = day
    },
    CLEAR(state: { index:number,storageList: { [index:number]: {[index:string]:Array<number>} },day:number,clear:symbol}){
        state.clear = Symbol()
    },
    INITSTORAGELIST(state: { index:number,storageList: { [index:number]: {[index:string]:Array<number>} }},value: any){
        state.storageList = value
    }
}
const state = {
    index:0,
    storageList:[],
    day:0,
    clear:Symbol()
}
const getters = {
    getCurrent(state: { index:number,storageList: { [index:number]: {[index:string]:Array<number>} } }){
        return state.storageList[state.index]
    }
}
export default createStore({
    actions,
    mutations,
    state,
    getters
})