# Mod Compatibility

Most mods work with Almost Unified out of the box. The generic recipe unifier covers all JSON recipes that use common property names for their inputs and outputs. This page lists mods with dedicated support and mods that need some manual configuration.

## Generic Support

The generic recipe unifier handles the following top-level recipe properties:

| Type    | Properties                                                   |
| ------- | ------------------------------------------------------------ |
| inputs  | `input`, `inputs`, `ingredient`, `ingredients`, `inputItems` |
| outputs | `output`, `outputs`, `result`, `results`, `outputItems`      |

Nested objects and arrays within these properties are handled as well. In addition, Almost Unified has bundled unifiers for vanilla shaped crafting recipes, recipes that share their structure, and smithing recipes.

On NeoForge, compound ingredients (`neoforge:compound`) are supported as well.

## Built-in Recipe Unifiers

Some mods use their own recipe structures. Almost Unified ships with dedicated recipe unifiers for these mods:

| Mod                                                                         | Platform |
| --------------------------------------------------------------------------- | -------- |
| Amethyst Imbuement                                                          | Fabric   |
| Ars Nouveau, Ars Creo, Ars Elemental, Ars Scalaes                           | NeoForge |
| Create (including sequenced assembly)                                       | both     |
| Cyclic                                                                      | NeoForge |
| EnderIO (Sag Mill)                                                          | NeoForge |
| GregTech CEu Modern                                                         | both     |
| Integrated Dynamics                                                         | NeoForge |
| Mekanism                                                                    | NeoForge |
| Occultism                                                                   | NeoForge |
| Productive Trees                                                            | NeoForge |
| Theurgy                                                                     | NeoForge |
| Immersive Engineering, via the [add-on](../addons/immersive_engineering.md) | NeoForge |

Other mods can provide their own recipe unifiers through the [plugin system](../api/plugins.md). A recipe unifier registered by a mod takes precedence over the built-in one.

## Mods With Their Own Tag Preferences

Some mods choose items from tags at runtime, for example to decide which ore an ore-generating flower produces or which item a machine outputs. They are not affected by recipe unification and usually have their own config to define the preferred mods. Make sure their order matches the `mod_priorities` of your [unification config](../config/unification.md).

::: warning
The following entries are based on older versions of the mods. Config names and options might have changed in the 1.21 versions. If you notice outdated information, please let us know on [Discord](https://discord.com/invite/ThFnwZCyYY).
:::

Configs of mods are not always located in the `config` folder. Server configs are often located in the world folder: `saves/<world>/serverconfig`.

### Botania

The Orechid flower generates ores based on a weighted list and is not changed by Almost Unified. Decide which mod should provide the ores and adjust the `orechidPriorityMods` list in `botania-common.toml`.

### Industrial Foregoing (Titanium)

Industrial Foregoing uses the library Titanium to choose items from tags. Open `titanium-tags.toml` and make sure the `ITEM_PREFERENCE` list has the same order as your `mod_priorities`.

### Mystical Agriculture (Cucumber)

Mystical Agriculture uses the library Cucumber to choose items from tags. Open `cucumber-common.toml` and make sure the `modTagPriorities` list has the same order as your `mod_priorities`. Cucumber caches the chosen items in `cucumber-tags.json`, so delete this file after changing the config.

The recipe type `cucumber:shaped_tag` is ignored by default in the unification and duplicates configs, because unifying it causes errors.

### Productive Bees

Open `productivebees-server.toml` and make sure the `preferredTagSource` list has the same order as your `mod_priorities`. Add the mod ID `productivebees` to the list as well.

### Tinkers' Construct (Mantle)

Tinkers' Construct uses the library Mantle to choose items from tags. Open `mantle-server.toml` and make sure the `tagPreferences` list has the same order as your `mod_priorities`.

### Immersive Engineering

Immersive Engineering has its own preference system for ore deposits of the Excavator and Arc Furnace recycling. Use the [Immersive Engineering add-on](../addons/immersive_engineering.md), which makes these systems use the target items of Almost Unified.

## Limitations

- Recipes that are not defined as JSON, e.g. recipes that are hardcoded in a mod, can't be unified.
- Recipes with custom structures that don't use the common property names are not unified unless a dedicated recipe unifier exists.
- Fluids are not unified.
- Mods that pick items from tags at runtime are not affected by the unification. See [above](#mods-with-their-own-tag-preferences).

If a mod is not unified correctly, reach out to us on [Discord](https://discord.com/invite/ThFnwZCyYY) or use the [issue tracker](https://github.com/AlmostReliable/almostunified/issues).
