# Terminology

This page explains the terms used throughout this wiki, the configs, and the API.

## Unification Tag

An item tag that is listed in the `tags` of a [unification config](config/unification.md) after all [placeholders](#placeholder) are replaced. Only unification tags are considered by the unification. Tags that don't exist in the game are ignored.

Each item can only belong to a single unification tag. If an item is part of multiple unification tags, Almost Unified logs an error and only uses the first tag it encounters.

Example: `c:ingots/silver`

## Target Item

The item of a unification tag with the highest priority. It is chosen by the `priority_overrides` and `mod_priorities` of the unification config. All recipe outputs and loot drops of the tag are replaced with the target item. If none of the items in a tag belong to a mod from the priority list, the tag has no target item and is not unified.

In older versions of the mod, the target item was called the _dominant item_ or _preferred item_.

## Variant Item

Any item of a unification tag that is not the target item. Variant items are replaced by the target item and hidden in recipe viewers.

## Relevant Tag

The unification tag an item belongs to. Since an item can only belong to a single unification tag, each item has at most one relevant tag.

## Unification Config

A JSON file in the `config/almostunified/unification` folder. Each file defines its own mod priorities, stone variants, tags, and ignore lists. The file name without the extension is used as the name of the config. See [Unification Config](config/unification.md).

## Placeholder

A keyword in curly braces that can be used in the `tags` of a unification config, such as `{material}`. Each placeholder is replaced with all values defined for it in the [Placeholder Config](config/placeholders.md).

## Stone Variant

The type of stone an ore is embedded in, such as `deepslate` or `netherrack`. Ores of different stone variants are treated separately, so a Deepslate Silver Ore is only replaced by another Deepslate Silver Ore. Stone variants are detected from the `c:ores_in_ground/<variant>` tags and from the item IDs. See [Unification Config](config/unification.md#stone-variants).

## Tag Substitution

A rule that converts one or more _replaced tags_ to a _substitute tag_. All items of the replaced tags are added to the substitute tag, and all recipes using a replaced tag are changed to use the substitute tag instead. This is useful when mods use different tag conventions for the same resource. See [Tag Config](config/tags.md#tag-substitutions).

## Tag Inheritance

A rule that lets target items inherit tags from variant items. This is useful for game mechanics that depend on tags, such as beacon payment items or multiblock structures. See [Tag Config](config/tags.md#tag-inheritance).

## Duplicate

A recipe that is equal to another recipe of the same recipe type after the unification. Almost Unified only keeps one recipe of each group of duplicates, which is called the _master recipe_. See [Duplicates Config](config/duplicates.md).

## Runtime

The internal state of Almost Unified. It holds all configs, unification lookups, and registered unifiers. The runtime is rebuilt every time tags are reloaded and is only available on the logical server. See [Runtime & Lookups](api/lookup.md).

## Recipe Unifier

A piece of code that tells Almost Unified how to unify the recipes of a specific mod or recipe type. Almost Unified ships with a generic recipe unifier that covers most recipes, as well as specific unifiers for some mods. Mods can register their own unifiers through the [plugin system](api/plugins.md).
