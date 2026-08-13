# Getting Started

> [!WARNING]
> This wiki is for LootJS for Minecraft 1.21+ and above. For previous versions, please refer to the [old wiki](https://github.com/AlmostReliable/lootjs/wiki). Everything in this wiki is not compatible with older versions of LootJS.

LootJS is a mod for [NeoForge](https://neoforged.net/) which lets you programmatically modify loot tables. It's an add-on for [KubeJS](https://kubejs.com/).

It does not come with any pre-defined loot modifications. This is something which has to be done by the modpack developer.

The mod consists of the two main events `LootJS.lootTables()` and `LootJS.modifiers()` and is server-sided. All scripts containing LootJS logic need to be placed inside the `server_scripts` directory.

For editing your scripts, we highly recommend to use an editor which offers syntax highlighting and error checking for JavaScript like [VSCode](https://code.visualstudio.com/).
