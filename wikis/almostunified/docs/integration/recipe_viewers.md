# Recipe Viewers

Almost Unified integrates with [JEI](https://www.curseforge.com/minecraft/mc-mods/jei), [REI](https://www.curseforge.com/minecraft/mc-mods/roughly-enough-items), and [EMI](https://www.curseforge.com/minecraft/mc-mods/emi) on both NeoForge and Fabric. The integration requires Almost Unified to be installed on the client.

## Hiding Variant Items

After the unification, variant items can no longer be obtained through recipes or loot. To avoid confusion, Almost Unified hides them in recipe viewers. This also prevents players from accidentally using variant items in automation setups, for example when encoding patterns for Applied Energistics 2 or Refined Storage.

Hiding is enabled by default and can be toggled per unification config with the `recipe_viewer_hiding` option. See [Unification Config](../config/unification.md).

Items are not hidden if:

- `recipe_viewer_hiding` is disabled in the unification config the tag belongs to
- all items of the unification tag belong to the same mod
- the item is the target item of its tag, or of its stone variant for ores

Hidden items are added to the `almostunified:hide` item tag. This tag is synced to the client and read by the recipe viewer integrations. Every hidden item is also listed in the [log](../features/debugging.md#log-file).

| Without Almost Unified                                                               | With Almost Unified                                                                    |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| ![Recipe viewer showing many Silver Ingots](/../img/recipe_viewer_hiding_before.png) | ![Recipe viewer showing a single Silver Ingot](/../img/recipe_viewer_hiding_after.png) |

### EMI

EMI supports two ways of hiding items, which can be selected with the `emi_strict_hiding` option in the [Tag Config](../config/tags.md#emi-strict-hiding):

- **strict** (`true`, default): Variant items are disabled completely. They are removed from the item list and all recipes that use them are hidden as well.
- **non-strict** (`false`): Variant items are only removed from the item list. Recipes that use them remain visible.

## Recipe Indicator

Every recipe that was changed by Almost Unified is marked with a small icon in the recipe view. Hovering over the icon shows a tooltip with the following information:

- whether the recipe was unified
- whether the recipe had duplicates that were removed

![Recipe indicator with its tooltip](/../img/recipe_indicator.png)

The tooltip also contains a reminder not to report recipe issues to the original mod author, because the recipe was changed by Almost Unified. If a unified recipe is broken, please report it on the [Almost Unified issue tracker](https://github.com/AlmostReliable/almostunified/issues) instead.

The position of the icon depends on the recipe viewer:

| Recipe Viewer | Position                                                      |
| ------------- | ------------------------------------------------------------- |
| JEI           | bottom right corner of the recipe                             |
| REI           | above the `+` button, or the top left corner if there is none |
| EMI           | bottom right corner of the recipe                             |

::: info
The indicator requires Almost Unified on both the server and the client. It's not available when `server_only` is enabled in the [Startup Config](../config/startup.md).
:::
