# Debug Config

The debug config enables additional output that helps you find problems with your unification setup.

Location: `config/almostunified/debug.json`<br>
Dump location: `logs/almostunified/debug`

::: warning
Don't ship this config with your modpack. Dumps can produce large files and slow down the loading. Almost Unified creates a `.gitignore` file that excludes this config.
:::

## Options

| Key                       | Description                                                                                                            | Default |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- |
| `dump_tags`               | Writes all unification tags and their items to `tags.txt`.                                                             | `false` |
| `dump_overview`           | Writes statistics and a summary of unified and duplicate recipes per recipe type to `overview.txt`.                    | `false` |
| `dump_unification`        | Writes all unified recipes with their original and unified JSON to `unification.txt`.                                  | `false` |
| `dump_duplicates`         | Writes all groups of duplicate recipes and the kept recipe to `duplicates.txt`.                                        | `false` |
| `dump_recipes`            | Writes all recipes before and after the unification to `recipes_before.txt` and `recipes_after.txt`.                   | `false` |
| `log_invalid_tags`        | Logs all configured unification tags that don't exist in the game, e.g. tags created by placeholders that no mod uses. | `false` |
| `cache_recipe_conditions` | NeoForge only. Caches the result of recipe conditions, so they don't have to be evaluated again after the unification. | `true`  |

See [Debugging & Logs](../features/debugging.md) for more information about the dumps and how to use them.

### `cache_recipe_conditions`

On NeoForge, Almost Unified evaluates the conditions of every recipe to skip recipes that won't be loaded. When this option is enabled, the result of the evaluation is stored in the recipe, so NeoForge doesn't have to evaluate the conditions a second time. Only disable this option if you experience problems with recipe conditions.

## Default Config

```json
{
    "dump_duplicates": false,
    "dump_overview": false,
    "dump_recipes": false,
    "dump_tags": false,
    "dump_unification": false,
    "log_invalid_tags": false,
    "cache_recipe_conditions": true
}
```
