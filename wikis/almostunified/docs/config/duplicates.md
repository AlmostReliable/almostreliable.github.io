# Duplicates Config

After the unification, many recipes become identical. Two mods might both add a recipe to smelt Raw Silver into a Silver Ingot. Once both recipes output the same target item and accept the same tag, one of them is redundant. The duplicates config defines how such duplicates are detected and which recipe is kept.

Location: `config/almostunified/duplicates.json`

## Options

| Key                        | Description                                                                             | Default                   |
| -------------------------- | --------------------------------------------------------------------------------------- | ------------------------- |
| `ignored_recipe_types`     | List of recipe types to exclude from the duplicate check. Supports regular expressions. | `["cucumber:shaped_tag"]` |
| `ignored_recipe_ids`       | List of recipe IDs to exclude from the duplicate check. Supports regular expressions.   | `[]`                      |
| `default_duplicate_rules`  | The rules used to compare recipes of all recipe types.                                  | see below                 |
| `override_duplicate_rules` | Rules for specific recipe types that replace the default rules.                         | see below                 |
| `compare_all`              | Whether all recipes are compared with each other instead of only unified recipes.       | `false`                   |

## How Duplicates Are Detected

Recipes are only compared with recipes of the same recipe type. Two recipes are duplicates if their JSON is equal, except for the fields listed in `ignored_fields`. If two recipes differ in a field that has a rule, they are still duplicates, and the rule decides which of them is kept.

All duplicates are grouped together. Only one recipe of each group, the master recipe, is kept, and all other recipes are removed. The master recipe keeps its original ID.

For crafting recipes, the recipes must have the same output item. Shaped crafting recipes are compared by their actual layout instead of the raw `pattern` and `key` fields, so two recipes with different key symbols but the same layout are detected as duplicates.

## Duplicate Rules

Both `default_duplicate_rules` and each entry of `override_duplicate_rules` have the following structure:

```json
{
    "ignored_fields": ["group", "category"],
    "rules": {
        "cookingtime": "HigherRule"
    },
    "handle_implicit_counts": false
}
```

### `ignored_fields`

Top-level fields of the recipe JSON that are ignored when comparing two recipes. Good examples are `group` and `category`, which only affect the recipe book, or recipe conditions, which don't change the recipe itself.

### `rules`

Top-level fields that are allowed to differ between duplicates. The value defines which recipe is kept:

- `HigherRule`: keeps the recipe with the higher value
- `LowerRule`: keeps the recipe with the lower value

The default rules prefer the recipe with the higher `cookingtime`, `energy`, and `experience`. Fields with a rule are automatically ignored for the regular comparison.

### `handle_implicit_counts`

Some recipes write an item with a count of `1` explicitly, e.g. `{ "id": "minecraft:iron_ingot", "count": 1 }`, while others leave the count out because it defaults to `1`. When enabled, Almost Unified treats both variants as equal, which detects more duplicates but makes the comparison slower.

### `override_duplicate_rules`

An object that maps recipe types to their own rules. If a recipe type has an override, the default rules are not used for it at all. The override has to contain all ignored fields and rules that should apply.

By default, there is an override for `minecraft:crafting_shaped`, which additionally ignores the `pattern` and `key` fields, because shaped recipes are compared by their layout.

## `compare_all`

By default, only recipes that were changed by the unification are compared with the other recipes of the same type. Recipes that existed before and were not touched are not compared with each other.

When `compare_all` is enabled, all recipes are compared with each other, including recipes that were not unified. This finds duplicates that already existed before the unification, but makes the loading considerably slower in large modpacks.

## Default Config

NeoForge:

```json
{
    "ignored_recipe_types": ["cucumber:shaped_tag"],
    "ignored_recipe_ids": [],
    "default_duplicate_rules": {
        "ignored_fields": ["neoforge:conditions", "group", "category", "show_notification"],
        "rules": {
            "cookingtime": "HigherRule",
            "energy": "HigherRule",
            "experience": "HigherRule"
        },
        "handle_implicit_counts": false
    },
    "override_duplicate_rules": {
        "minecraft:crafting_shaped": {
            "ignored_fields": [
                "neoforge:conditions",
                "group",
                "category",
                "show_notification",
                "pattern",
                "key"
            ],
            "rules": {},
            "handle_implicit_counts": false
        }
    },
    "compare_all": false
}
```

On Fabric, `neoforge:conditions` is replaced with `fabric:load_conditions`.
