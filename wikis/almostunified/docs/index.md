# Getting Started

> [!WARNING] NOTE
> This wiki is for Almost Unified for Minecraft 1.21.1 and above. For previous versions, please refer to the [old wiki](https://github.com/AlmostReliable/almostunified/wiki).
>
> If you used Almost Unified with Minecraft 1.20 or earlier, read the [What's New](whats_new.md) page first. The config format has changed completely.

**Almost Unified** is a mod for NeoForge and Fabric that unifies resources added by different mods. Instead of having five different silver ingots in a big modpack, every recipe will produce the same silver ingot while all recipes that consume silver ingots will still accept any of them.

Useful links:

- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/almostunified)
- [Modrinth](https://modrinth.com/mod/almostunified)
- [GitHub](https://github.com/AlmostReliable/almostunified)
- [Discord](https://discord.com/invite/ThFnwZCyYY)

## Why Almost Unified?

Back in the days of Minecraft 1.12.2, mods used the Ore Dictionary to share resources such as ingots, dusts, or ores. While mods could use each other's resources in recipes, every mod still added its own variant of the same material. Big modpacks often ended up with a lot of copper ingots that didn't stack with each other. Mods like [UniDict](https://www.curseforge.com/minecraft/mc-mods/unidict) solved this by picking one dominant item for each resource and changing all recipes to output this item.

The Ore Dictionary has long been replaced by tags, but the problem remains the same. **Almost Unified** works in a similar fashion as UniDict did. You configure a list of tags and a list of mods ordered by priority. For each tag, the mod picks a single target item and changes recipes and other game content to use it.

## Features

- **Recipe Unification**<br>
  Recipe inputs are converted to tags, so all variants of a resource remain usable. Recipe outputs are replaced with the target item of their tag. See [How It Works](features/how_it_works.md).
- **Duplicate Removal**<br>
  Unification often results in identical recipes from different mods. Almost Unified detects these duplicates and only keeps a single recipe. See the [Duplicates Config](config/duplicates.md).
- **Loot Unification**<br>
  Loot tables can be unified so blocks, entities, and chests drop the target items. See [Loot Unification](features/loot.md).
- **World Generation Unification** (NeoForge only)<br>
  Ores of variant items can be removed from world generation, so only the target ores generate. See [World Generation](features/world_gen.md).
- **Recipe Viewer Integration**<br>
  Variant items are hidden in JEI, REI, and EMI. Recipes changed by Almost Unified are marked with an icon. See [Recipe Viewers](integration/recipe_viewers.md).
- **Flexible Configuration**<br>
  Multiple unification configs with their own mod priorities, custom placeholders, custom tags, tag substitutions, and tag inheritance. See the [Configuration Overview](config/index.md).
- **Item Repair Support**<br>
  Tools and armor that are repaired with a unified resource also accept the target item, even if the repair ingredient of the tool only contains the variant item.
- **KubeJS Integration**<br>
  Query unification information from your scripts. See [KubeJS](integration/kubejs.md).
- **API and Plugin System**<br>
  Mod developers can query unification information and register custom unifiers for their recipes. See the [Developer Guide](api/index.md).
- **Reloadable**<br>
  All changes are applied when data packs are loaded. Most configs can be edited while the game is running and applied with the `/reload` command.

Almost Unified does not add any items, blocks, recipes, or world generation of its own. It only changes existing content of other mods.

## Example

Imagine two mods, Mod A and Mod B, that both add a Silver Ore, a Raw Silver, and a Silver Ingot along with recipes to smelt the raw material into ingots. Both ingots are part of the `c:ingots/silver` tag.

Almost Unified picks one of the Silver Ingots as the target item. If `mod_a` is listed above `mod_b` in the `mod_priorities` of the [unification config](config/unification.md), the Silver Ingot of Mod A will be the target item. After the unification:

- all recipes that output a Silver Ingot now output the Silver Ingot of Mod A
- all recipes that accepted a specific Silver Ingot now accept the `c:ingots/silver` tag, so the Silver Ingot of Mod B can still be used if a player already has it
- the smelting recipes of both mods are now identical, so only one of them is kept
- the Silver Ingot of Mod B is hidden in recipe viewers

## Installation

1. Download the mod for your mod loader from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/almostunified) or [Modrinth](https://modrinth.com/mod/almostunified).
2. Put the jar file into the `mods` folder of your instance.
3. Start the game and load a world once. This generates the default configs in `config/almostunified`.

The default configs already cover common materials and tag conventions. To learn how to adjust them, head over to the [Configuration Overview](config/index.md).

::: tip
By default, Almost Unified has to be installed on both the server and the client. If you want to run it on the server only, take a look at the [Startup Config](config/startup.md).
:::
