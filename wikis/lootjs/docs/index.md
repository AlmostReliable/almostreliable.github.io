# Getting Started

::: info
First of all, this Wiki is for LootJS version 3.0 and above. For previous versions please refer to the [old wiki](https://github.com/AlmostReliable/lootjs/wiki). Everything in this wiki is not compatible with older versions of LootJS.
:::

LootJS is a mod for [NeoForge](https://neoforged.net/) which let's you modify loot tables or dynamically add new loot through [KubeJS](https://kubejs.com/) and JavaScript.

It does not come with any pre defined loot modifications. This is something which has to be done by the modpack developer.

The mod contains two main events `LootJS.lootTables()` and `LootJS.modifiers()` and is server sided, so every script you make has to be inside `server_scripts`, otherwise it will be ignored.

For editing your scripts we highly suggest to use an editor which offers syntax highlighting and error checking for JavaScript. It is recommended to use [VSCode](https://code.visualstudio.com/).
