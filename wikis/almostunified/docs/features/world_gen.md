# World Generation

> [!WARNING] NOTE
> World generation unification is only available on **NeoForge**.

Recipe and loot unification take care of crafting and drops, but every mod still generates its own ores in the world. With world generation unification, Almost Unified removes the ores of variant items from world generation. Only the ores of target items remain.

## Enabling World Generation Unification

World generation unification is disabled by default. To enable it, set `world_gen_unification` to `true` in the [Startup Config](../config/startup.md). Since world generation is set up when the game starts, changing this option requires a full restart of the game.

```json
{
    "server_only": false,
    "world_gen_unification": true
}
```

The unification only affects chunks that are generated after the option was enabled. Existing chunks are not changed.

## How It Works

When the server starts, Almost Unified checks all ore features of the game. An ore feature defines which blocks are placed and which blocks they can replace, for example Silver Ore in stone and Deepslate Silver Ore in deepslate.

For each block in an ore feature, Almost Unified checks whether it's a variant item of a unification tag. If it is, the block is removed from the feature. Ore features that have no blocks left are removed from all biomes.

Stone variants are respected. A Deepslate Silver Ore of Mod B is only removed if there is a Deepslate Silver Ore of a mod with a higher priority. See [Stone Variants](../config/unification.md#stone-variants).

Almost Unified **does not add** any ore generation. It relies on the mod of the target item to generate its ores. Make sure the mods at the top of your `mod_priorities` actually generate their ores, or the resource won't generate at all.

Every changed or removed feature is logged in the [Almost Unified log](debugging.md#log-file).

::: warning
Only ore features that use the vanilla ore configuration are supported. Mods with custom ore generation, such as ore veins or deposits, are not affected. Check their configs to disable or adjust their generation.
:::

## Strip Command

To check the results of the world generation unification, Almost Unified provides a command that removes all regular blocks around you and leaves only the ores.

```
/almostunified strip <radius>
```

The command removes all blocks in a square with the given radius around the player, from the bottom to the top of the world. The radius can be between `0` and `128`. The following blocks are kept:

- air
- bedrock
- blocks with a block entity
- blocks that drop experience, which includes most ores
- blocks that are part of a `c:ores` tag

The command requires operator permissions (level 2) and can only be run by a player. The blocks are removed over multiple ticks to avoid freezing the server.

::: danger
The strip command permanently removes blocks from your world. Only use it in a test world.
:::

![Area after running the strip command, showing only ores](/../img/strip_command.png)

Running `/almostunified` without arguments shows a list of all available commands.
