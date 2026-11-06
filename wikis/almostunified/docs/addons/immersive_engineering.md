# Immersive Engineering

**AU: Immersive Engineering** is an add-on for Almost Unified that adds integration for [Immersive Engineering](https://www.curseforge.com/minecraft/mc-mods/immersive-engineering). It's available for NeoForge on Minecraft 1.21.1.

Useful links:

- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/almost-unified-ie)
- [Modrinth](https://modrinth.com/mod/almost-unified-ie)
- [GitHub](https://github.com/AlmostReliable/almostunified-ie)

## Why an Add-on?

Earlier versions of Almost Unified had built-in support for Immersive Engineering. With an increasing number of compatibility issues, a direct integration in Immersive Engineering was proposed, but declined. To keep supporting the mod, the integration was moved to this add-on in Almost Unified 1.3.0.

As a separate mod, the add-on can go further than the built-in integration did. Besides recipes, it also covers the internal priority system Immersive Engineering uses to choose items from tags.

## Features

### Recipe Unification

Immersive Engineering stores inputs and outputs of its machines in custom recipe properties that the generic unifier of Almost Unified doesn't know. The add-on registers a dedicated recipe unifier for all Immersive Engineering recipes, including:

- alloy inputs and outputs
- Arc Furnace additives, results, slag, and secondary outputs
- Crusher secondary outputs
- Cloche soil
- Metal Press molds
- Refinery catalysts
- Sawmill secondary outputs and stripping outputs
- inputs and outputs wrapped in `basePredicate`

### Preferred Items

Immersive Engineering has its own system to choose an item from a tag when it needs to output something that is only defined by a tag. This is used, for example, by the ore deposits of the Excavator and by the recycling of the Arc Furnace. The order is configured by the `preferredOres` option of Immersive Engineering.

With the add-on installed, Immersive Engineering uses the target items of Almost Unified for all tags that are part of the unification. The preferences in the Immersive Engineering config are only used for tags that Almost Unified doesn't handle.

This means you no longer have to keep the Immersive Engineering config in sync with your `mod_priorities` for unified resources.

## Installation

1. Install [NeoForge](https://neoforged.net/) for Minecraft 1.21.1.
2. Install [Almost Unified](https://www.curseforge.com/minecraft/mc-mods/almostunified) 1.2.7 or newer.
3. Install [Immersive Engineering](https://www.curseforge.com/minecraft/mc-mods/immersive-engineering).
4. Download the add-on from [CurseForge](https://www.curseforge.com/minecraft/mc-mods/almost-unified-ie) or [Modrinth](https://modrinth.com/mod/almost-unified-ie) and put it into your `mods` folder.

The add-on doesn't have any configs.

::: tip
If you update from Almost Unified 1.2.x or older, you don't have to change anything in your configs. Simply install the add-on to keep the support for Immersive Engineering recipes.
:::
