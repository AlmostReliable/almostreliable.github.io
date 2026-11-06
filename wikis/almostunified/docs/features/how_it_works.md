# How It Works

This page explains what happens when Almost Unified unifies your game. Knowing the order of the steps helps you understand why something is or isn't unified.

Almost Unified runs every time data packs are loaded, which happens when a world is loaded or when the `/reload` command is executed. All work happens on the logical server while loading. There is no performance impact while playing.

## 1. Loading Tags and Configs

When the game has loaded all item and block tags, Almost Unified builds its runtime. During this step, it:

1. loads the [Debug](../config/debug.md), [Placeholder](../config/placeholders.md), and [Tag](../config/tags.md) configs as well as all [unification configs](../config/unification.md)
2. adds the items from `custom_tags` to their tags
3. collects all recipe unifiers and custom ingredient unifiers from [plugins](../api/plugins.md)
4. replaces all placeholders in the `tags` of each unification config and removes tags that are ignored, don't exist, or are already part of another unification config
5. applies [tag substitutions](../config/tags.md#tag-substitutions) by copying the items of replaced tags into their substitute tags
6. assigns each item to its unification tag, unless it's ignored by `ignored_items`
7. applies [tag inheritance](../config/tags.md#tag-inheritance) so target items receive the configured tags of their variant items
8. marks all variant items for hiding in recipe viewers

Since all of this happens after the tags are loaded, tag changes made with data packs or KubeJS are taken into account.

## 2. Choosing Target Items

For each unification tag, Almost Unified picks a target item:

1. If the tag has an entry in `priority_overrides`, the item from the specified mod is used.
2. Otherwise, the mods in `mod_priorities` are checked from top to bottom. The item of the first mod that has an item in the tag is used.
3. If a mod has multiple items in the tag, the item with the shortest ID is preferred.

Items from mods that are not listed in `mod_priorities` are never chosen. If no item of a tag belongs to a listed mod, the tag has no target item.

### Ores and Stone Variants

Ore tags such as `c:ores/silver` usually contain ores of different stone variants, for example Silver Ore, Deepslate Silver Ore, and Nether Silver Ore. Replacing all of them with the same target ore would be wrong.

For ore tags, Almost Unified first determines the stone variant of each ore and only chooses the target item among ores of the same stone variant. A Deepslate Silver Ore from Mod B is replaced with the Deepslate Silver Ore from Mod A, not with the regular Silver Ore. The stone variants are configured with `stone_variants` in the [unification config](../config/unification.md#stone-variants).

## 3. Unifying Recipes

When recipes are loaded, Almost Unified groups them by recipe type and processes each recipe:

1. Recipes that are ignored by `ignored_recipe_types` or `ignored_recipe_ids` are skipped.
2. On NeoForge, recipes with conditions that are not met are skipped.
3. A recipe unifier is chosen for the recipe. Unifiers registered for the recipe type come first, then unifiers registered for the mod ID of the recipe type. If there is no specific unifier, Almost Unified uses its bundled unifiers for smithing recipes, shaped crafting recipes, or the generic unifier for everything else.
4. The unifier changes the recipe JSON:
    - **Inputs** that reference a variant item or the target item are replaced with the unification tag of the item. If the input already uses a tag that is a replaced tag of a tag substitution, the substitute tag is used instead.
    - **Outputs** that reference a variant item are replaced with the target item. Outputs that reference a unification tag are replaced with the target item of the tag.
5. If a recipe was changed by multiple unification configs, all changes are combined.

### Duplicate Detection

After all recipes of a recipe type are unified, Almost Unified compares them to find duplicates. Two recipes are duplicates if their JSON is equal, ignoring the fields configured in the [Duplicates Config](../config/duplicates.md). If duplicates differ in fields that have a rule, such as the cooking time, the rule decides which recipe is kept. All other recipes of the group are removed.

By default, only unified recipes are checked against all other recipes of the same type. With `compare_all`, all recipes are checked against each other.

## 4. Unifying Loot

If `loot_unification` is enabled in at least one unification config, Almost Unified replaces variant items in loot tables with their target items afterwards. See [Loot Unification](loot.md).

## 5. World Generation

On NeoForge, if `world_gen_unification` is enabled in the [Startup Config](../config/startup.md), ores of variant items are removed from world generation when the server starts. See [World Generation](world_gen.md).

## 6. Client Side

Unless `server_only` is enabled, Almost Unified sends information about all unified recipes and duplicates to the client. Recipe viewers use this information to display an indicator on changed recipes. Variant items are hidden through an internal item tag. See [Recipe Viewers](../integration/recipe_viewers.md).

## Item Repair

Tools and armor are usually repaired with a specific item, for example the Silver Ingot of the mod that adds the Silver Sword. If the repair item is a variant item, players couldn't repair the tool with the target item anymore. Almost Unified extends the repair check so all items of the same unification tag are accepted.
