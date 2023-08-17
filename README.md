# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

![image](https://github.com/unyzhq/Memoranduml-for-This-War-Of-Mine/blob/main/public/%E7%A4%BA%E4%BE%8B.png)

这个备忘录工具需要配合收集策略使用，具体请看：
## 收集策略
进入地图后，依照以下步骤进行：
1. 按顺序收集资源点的物资，直到遇见第一个背包无法全部带走的资源点。
2. 此时将所有物品丢弃，与该资源点合并，但保留需要用到的工具。
3. 继续收集物资，背包装满时立刻返回之前丢弃的资源点，重复步骤2。
4. 重复步骤3，直到所有资源收集完毕。
5. 带走需要的资源，打开备忘录工具，记录该地点无法带走的全部物资。
6. 点击保存并进入到下一天，回到游戏，返程回家。