# `LootJS.lootTables` and `LootJS.modifiers`

LootJS offers the two main events `LootJS.lootTables()` and `LootJS.modifiers()`.

## `LootJS.lootTables()`

This event directly modifies the loot tables which are loaded through datapacks. This allows to update the loot table without losing any information about rolls, conditions, loot functions, etc. You can loop over different parts of the loot table and modify them. Because of direct modifications, changes are reflected in recipe viewer mods such as [JER](https://www.curseforge.com/minecraft/mc-mods/just-enough-resources-jer) or [RER](https://www.curseforge.com/minecraft/mc-mods/roughly-enough-resources).

## `LootJS.modifiers()`

The modifications specified in this event are dynamically invoked after a loot table is rolled. They don't hold any information on how the loot table is structured. Modifiers only have information about the items that will be dropped. The event allows to modify the dropped items directly.

NeoForge provides the [Global Loot Modifier](https://docs.neoforged.net/docs/resources/server/loottables/glm/) system which allows mods to dynamically add loot when a specific loot table is rolled. This information does not exist inside a loot table meaning the `LootJS.lootTables()` event can't track any information about them. Instead, they can be modified with the `LootJS.modifiers()` event as it runs after the NeoForge hook.
