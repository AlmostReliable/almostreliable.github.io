# `LootJS.lootTables` or `LootJS.modifiers`

LootJS offers two core main events, `LootJS.lootTables()` and `LootJS.modifiers()`.

# `LootJS.lootTables()`:

Directly modifies the loot tables, which are loaded through datapacks. This allows to update the loot table without losing any information about rolls, conditions, loot functions etc. You can loop over different parts of the loot table and modify them. As `LootJS.lootTables()` modifies the loot tables directly, changes are reflected at recipe viewers mods such as [JER](https://www.curseforge.com/minecraft/mc-mods/just-enough-resources-jer) or [RER](https://www.curseforge.com/minecraft/mc-mods/roughly-enough-resources).

# `LootJS.modifiers()`:

Loot modifiers are dynamically invoked after a loot table is rolled. They don't hold any information on how the loot table is structures, modifiers only know the items that will be dropped. `LootJS.modifiers()` allows to directly modify the items that will be dropped.

Another thing is the [Global Loot Modifier](https://docs.neoforged.net/docs/resources/server/glm/) system from NeoForge which allows mods to dynamically adds loot, when a specific loot table is rolled. This information does not exist inside a loot table, so using `LootJS.lootTables()` can't catch them. `LootJS.modifiers()` allows to modify them, as it runs after the NeoForge hook runs.
