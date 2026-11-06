# Debugging & Logs

When something isn't unified the way you expect, Almost Unified offers several tools to find out why.

## Log File

Almost Unified writes all of its output to a dedicated log file:

```
logs/almostunified/almostunified.log
```

The file contains the same messages as the `latest.log` but without the output of other mods, which makes it a lot easier to read. The log of the previous session is kept as `almostunified-backup.log.gz`.

The log includes:

- the loaded configs and configs that were invalid and had to be regenerated
- mods in `mod_priorities` that are not installed
- tags that are invalid or defined in multiple unification configs
- items that are part of multiple unification tags
- tag substitutions and tag inheritance changes
- items that are hidden in recipe viewers
- the number of recipes before and after the unification
- loot tables and world generation features that were changed
- recipes that failed to load after they were unified

::: tip
When you report an issue, always include this log file. It's much more helpful than the `latest.log`.
:::

## Debug Dumps

The [Debug Config](../config/debug.md) can enable additional dumps that are written to:

```
logs/almostunified/debug
```

| File                 | Option             | Content                                                            |
| -------------------- | ------------------ | ------------------------------------------------------------------ |
| `tags.txt`           | `dump_tags`        | all unification tags and the items they contain                    |
| `overview.txt`       | `dump_overview`    | statistics and a summary of unified and duplicate recipes per type |
| `unification.txt`    | `dump_unification` | all unified recipes with their original and unified JSON           |
| `duplicates.txt`     | `dump_duplicates`  | all duplicate groups and the recipe that was kept                  |
| `recipes_before.txt` | `dump_recipes`     | all recipes before the unification                                 |
| `recipes_after.txt`  | `dump_recipes`     | all recipes after the unification                                  |

All dumps are overwritten on each reload. The first line of each file shows the time of the last run.

## Recipe Viewer Indicator

Recipes that were changed by Almost Unified are marked with a small icon in JEI, REI, and EMI. Hovering over the icon shows whether the recipe was unified and whether it had duplicates. See [Recipe Viewers](../integration/recipe_viewers.md).

## Troubleshooting Steps

1. Check `logs/almostunified/almostunified.log` for errors and warnings.
2. Enable `dump_tags` and check whether the tag of the item is a unification tag and contains the expected items.
3. Check whether the mod of the expected target item is part of `mod_priorities`.
4. Enable `dump_unification` and search for the recipe ID to see how the recipe was changed.
5. Enable `dump_duplicates` if a recipe is missing after the unification.
6. If a recipe broke after the unification, add it to `ignored_recipe_ids` and report it on the [issue tracker](https://github.com/AlmostReliable/almostunified/issues).

The [FAQ](../faq.md) also covers the most common reasons why something is not unified.
