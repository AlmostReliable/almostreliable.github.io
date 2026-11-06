# What's New

> [!WARNING] NOTE
> This wiki is for Almost Unified for Minecraft 1.21.1 and above. For previous versions, please refer to the [old wiki](https://github.com/AlmostReliable/almostunified/wiki).

This page lists the changes between Almost Unified for Minecraft 1.20.1 and Almost Unified 1.0.0 for Minecraft 1.21.1, which is the base for all future releases. It is **not** a changelog. For a detailed list of changes between releases, check the [changelog](https://github.com/AlmostReliable/almostunified/blob/1.21.1/CHANGELOG.md).

Almost Unified 1.0.0 is a major rewrite. The goal of the unification is still the same, but the config structure, the API, and the KubeJS integration have changed. **Old configs can't be reused.** Delete the `config/almostunified` folder and let the mod generate new defaults, then transfer your changes with the help of the [migration table](#config-migration) below.

## Major Changes

- **Data-driven unification configs**<br>
  The single `unify.json` config was split into multiple files. Unification settings now live in the `config/almostunified/unification` folder, where each JSON file is a separate unification config with its own mod priorities, stone variants, tags, and ignore lists. See [Unification Config](config/unification.md).
- **Custom placeholders**<br>
  The `materials` list was replaced by the [Placeholder Config](config/placeholders.md). The `{material}` placeholder still exists, but you can now define any number of custom placeholders.
- **Separate tag config**<br>
  All tag related options were moved to the new [Tag Config](config/tags.md). This includes custom tags, tag substitutions (formerly tag ownerships), and tag inheritance.
- **snake_case config keys**<br>
  All config keys now use snake_case instead of camelCase, e.g. `modPriorities` is now `mod_priorities`.
- **New API and plugin system**<br>
  The API was rewritten from scratch. Mods can now register their own recipe unifiers and custom ingredient unifiers through plugins, and query detailed unification information through the runtime. See the [Developer Guide](api/index.md).
- **New terminology**<br>
  The dominant item is now called the **target item**, and all other items of a unification tag are called **variant items**. Stone strata are now called **stone variants**. See [Terminology](terminology.md).
- **Common tag conventions**<br>
  Forge is no longer supported. On Minecraft 1.21, NeoForge and Fabric share the `c` tag namespace, so the default configs use tags like `c:ingots/{material}` on both platforms.

## New Features

- [Loot unification](features/loot.md) to make loot tables drop target items
- [World generation unification](features/world_gen.md) to remove variant ores from world generation (NeoForge only)
- `/almostunified strip` command to inspect ore generation (NeoForge only)
- multiple unification configs with config-specific settings
- custom placeholders
- `ignored_loot_tables` option to exclude loot tables from the unification
- `emi_strict_hiding` option to control how variant items are hidden in EMI
- `handle_implicit_counts` option for duplicate rules, replacing `shouldSanitize`
- `log_invalid_tags` and `cache_recipe_conditions` options in the [Debug Config](config/debug.md)
- a dedicated log file at `logs/almostunified/almostunified.log` that contains all output of the mod
- a dedicated directory for debug dumps at `logs/almostunified/debug`
- support for custom ingredient types, including NeoForge compound ingredients
- recipes with unmet NeoForge conditions are skipped, which removes a lot of unfixable warnings
- invalid configs are backed up as `.bak` files before they are regenerated
- warnings for mods in `mod_priorities` that are not installed, tags that are defined in multiple unification configs, and items that are part of multiple unification tags

## Removed Features

- Forge support, replaced by NeoForge
- the `dumpUncoveredRecipes` debug option
- the built-in recipe unifier for Immersive Engineering, which is now part of the [Immersive Engineering add-on](addons/immersive_engineering.md)
- the built-in recipe unifiers for Modern Industrialization and Extended Industrialization
- the KubeJS functions `getItemIds` and `getUnifyConfig`, see [KubeJS](integration/kubejs.md)

## Config Migration

The following table maps the old config keys to their new counterparts. For explanations of each option, follow the links to the respective config pages.

### `unify.json`

| Old key                   | New file                  | New key                      |
| ------------------------- | ------------------------- | ---------------------------- |
| `modPriorities`           | `unification/<name>.json` | `mod_priorities`             |
| `priorityOverrides`       | `unification/<name>.json` | `priority_overrides`         |
| `stoneStrata`             | `unification/<name>.json` | `stone_variants`             |
| `tags`                    | `unification/<name>.json` | `tags`                       |
| `materials`               | `placeholders.json`       | `material`                   |
| `ignoredTags`             | `unification/<name>.json` | `ignored_tags`               |
| `ignoredItems`            | `unification/<name>.json` | `ignored_items`              |
| `ignoredRecipeTypes`      | `unification/<name>.json` | `ignored_recipe_types`       |
| `ignoredRecipes`          | `unification/<name>.json` | `ignored_recipe_ids`         |
| `itemsHidingJeiRei`       | `unification/<name>.json` | `recipe_viewer_hiding`       |
| `customTags`              | `tags.json`               | `custom_tags`                |
| `tagOwnerships`           | `tags.json`               | `tag_substitutions`          |
| `itemTagInheritanceMode`  | `tags.json`               | `item_tag_inheritance_mode`  |
| `itemTagInheritance`      | `tags.json`               | `item_tag_inheritance`       |
| `blockTagInheritanceMode` | `tags.json`               | `block_tag_inheritance_mode` |
| `blockTagInheritance`     | `tags.json`               | `block_tag_inheritance`      |

### `duplicates.json`

| Old key                  | New key                    |
| ------------------------ | -------------------------- |
| `ignoredRecipeTypes`     | `ignored_recipe_types`     |
| `ignoredRecipes`         | `ignored_recipe_ids`       |
| `defaultDuplicateRules`  | `default_duplicate_rules`  |
| `overrideDuplicateRules` | `override_duplicate_rules` |
| `ignoredFields`          | `ignored_fields`           |
| `shouldSanitize`         | `handle_implicit_counts`   |
| `strictMode`             | `compare_all`              |

### `debug.json`

| Old key                | New key            |
| ---------------------- | ------------------ |
| `dumpTagMap`           | `dump_tags`        |
| `dumpDuplicates`       | `dump_duplicates`  |
| `dumpUnification`      | `dump_unification` |
| `dumpOverview`         | `dump_overview`    |
| `dumpRecipes`          | `dump_recipes`     |
| `dumpUncoveredRecipes` | removed            |

### `startup.json`

| Old key      | New key       |
| ------------ | ------------- |
| `serverOnly` | `server_only` |

### KubeJS

| Old function             | New function           |
| ------------------------ | ---------------------- |
| `getPreferredTagForItem` | `getRelevantItemTag`   |
| `getReplacementForItem`  | `getVariantItemTarget` |
| `getPreferredItemForTag` | `getTagTargetItem`     |
| `getTags`                | `getTags`              |
| `getItemIds`             | `getTagEntries`        |
| `getUnifyConfig`         | removed                |
