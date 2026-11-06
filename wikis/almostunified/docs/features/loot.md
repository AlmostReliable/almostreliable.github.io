# Loot Unification

Loot tables define what blocks drop when they are mined, what entities drop when they are killed, and what can be found in chests. When multiple mods add the same resource, their ores will still drop their own raw materials, even if all recipes have been unified.

With loot unification, Almost Unified replaces variant items in loot tables with their target items. A Silver Ore from Mod B will then drop the Raw Silver of Mod A if Mod A has the higher priority.

## Enabling Loot Unification

Loot unification is disabled by default. To enable it, set `loot_unification` to `true` in your [unification config](../config/unification.md):

```json
{
    "loot_unification": true,
    "ignored_loot_tables": []
}
```

The option is defined per unification config. Only tags of configs that have loot unification enabled are considered.

To exclude specific loot tables, add their IDs to `ignored_loot_tables`. The entries are regular expressions, so you can exclude all loot tables of a mod at once:

```json
{
    "ignored_loot_tables": ["minecraft:chests/.*", "some_mod:blocks/silver_ore"]
}
```

## How It Works

After recipes are loaded, Almost Unified goes through all loot tables of the game. Every loot entry that drops a specific item is checked. If the item is a variant item, it's replaced with its target item. Stone variants are respected, so an ore block that drops itself keeps dropping an ore of the same stone variant.

Loot entries that drop a whole tag are not changed.

Every changed loot table is logged in the [Almost Unified log](debugging.md#log-file), including the names of the unification configs that changed it.

::: tip
Loot unification also covers ore blocks. If you don't want to change the world generation, enabling loot unification is a good way to make all ores drop the target raw materials.
:::
