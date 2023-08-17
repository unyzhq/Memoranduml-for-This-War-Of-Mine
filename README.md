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
## 使用备忘录
当你需要一种物资，却不知道哪里有这种物质时，就可以打开备忘录查看访问过的地点，相对使用纸笔或是Excel等其他工具，备忘录更加方便快捷。
## 可以进行的操作
1. 将光标移动至数字上方后，可以通过鼠标滚轮更改物品数量。
2. 选中一个物品后，再次点击该物品时会使该物品数量-1。
3. 选中数字，使用键盘修改物品数量。
4. 每个地点单独储存一份物品清单，互不干扰，点击地点进行切换。
5. 点击“保存并进入到下一天”将所有地点的数据保存到本地，点击该按钮不要刷新，否则数据将丢失。
6. 点击“回到前一天”将展示前一天的数据，并可以对它修改，但修改的数据仅保存在这一天的本地数据中(所以修改没有意义)。
7. 点击“清空数据”将清空所有数据，包括已经保存的本地数据。
8. 点击“仅看拥有”将只展示数量不为零的物品。