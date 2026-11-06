# Runtime & Lookups

## `AlmostUnified`

The `AlmostUnified` interface is the entry point of the API. Its instance is available through `AlmostUnified.INSTANCE`. If Almost Unified is not installed, or the runtime is not loaded yet, the instance returns default values (`null` or empty collections).

For the most common queries, it offers shortcut methods that use the combined information of all unification configs:

| Method                           | Returns                                                                  |
| -------------------------------- | ------------------------------------------------------------------------ |
| `isRuntimeLoaded()`              | whether the runtime is available                                         |
| `getRuntime()`                   | the `AlmostUnifiedRuntime`, or `null` if it's not loaded                 |
| `getRuntimeOrThrow()`            | the `AlmostUnifiedRuntime`, or throws if it's not loaded                 |
| `getTags()`                      | all unification tags                                                     |
| `getTagEntries(TagKey<Item>)`    | all items of the given unification tag                                   |
| `getRelevantItemTag(ItemLike)`   | the unification tag of the given item, or `null`                         |
| `getVariantItemTarget(ItemLike)` | the target item for the given item, respecting stone variants, or `null` |
| `getTagTargetItem(TagKey<Item>)` | the target item of the given unification tag, or `null`                  |

```java
TagKey<Item> silverIngots = TagKey.create(Registries.ITEM, ResourceLocation.parse("c:ingots/silver"));
Item target = AlmostUnified.INSTANCE.getTagTargetItem(silverIngots);
if (target != null) {
    // use the target item instead of your own silver ingot
}
```

## `AlmostUnifiedRuntime`

The runtime is the core of Almost Unified. It holds all configs, lookups, and registered unifiers. It's rebuilt every time tags are reloaded, so **don't cache it** or any objects obtained from it across reloads.

| Method                           | Returns                                                                |
| -------------------------------- | ---------------------------------------------------------------------- |
| `getUnificationLookup()`         | a `UnificationLookup` combining all unification configs                |
| `getUnificationSettings()`       | the `UnificationSettings` of all unification configs                   |
| `getUnificationSettings(String)` | the `UnificationSettings` of the config with the given name, or `null` |
| `getTagSubstitutions()`          | the `TagSubstitutions` from the tag config                             |
| `getPlaceholders()`              | the `Placeholders` from the placeholder config                         |

## `UnificationLookup`

A lookup exposes the unification information of one or more unification configs. The lookup returned by `getUnificationLookup()` combines all configs and is the one you usually want. Items are represented as `UnificationEntry<Item>`, which gives access to the item's ID, registry key, holder, value, and its unification tag.

| Method                                                         | Returns                                                                        |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `getTags()`                                                    | all unification tags                                                           |
| `getTagEntries(TagKey<Item>)`                                  | all entries of the given unification tag                                       |
| `getItemEntry(ResourceLocation \| Item \| Holder<Item>)`       | the entry of the given item, or `null` if it's not part of a unification tag   |
| `getRelevantItemTag(ResourceLocation \| Item \| Holder<Item>)` | the unification tag of the given item, or `null`                               |
| `getVariantItemTarget(...)`                                    | the target entry for the given item, respecting stone variants, or `null`      |
| `getTagTargetItem(TagKey<Item>)`                               | the target entry of the given tag, or `null`                                   |
| `getTagTargetItem(TagKey<Item>, Predicate<ResourceLocation>)`  | the target entry among the items matching the filter, or `null`                |
| `isUnifiedIngredientItem(Ingredient, ItemStack)`               | whether the item stack is part of a unification tag that the ingredient covers |

Tag substitutions are respected. If you pass a replaced tag to `getTagTargetItem`, the target item of its substitute tag is returned.

```java
var lookup = AlmostUnified.INSTANCE.getRuntimeOrThrow().getUnificationLookup();
var target = lookup.getVariantItemTarget(stack.getItem());
if (target != null && !target.value().equals(stack.getItem())) {
    stack = new ItemStack(target.value(), stack.getCount());
}
```

## `UnificationSettings`

`UnificationSettings` extends `UnificationLookup` and represents a single unification config. In addition to the lookup methods, it exposes the config-specific settings:

| Method                                      | Returns                                                      |
| ------------------------------------------- | ------------------------------------------------------------ |
| `getName()`                                 | the name of the config, i.e. the file name without extension |
| `getModPriorities()`                        | the `ModPriorities` of the config                            |
| `getStoneVariants()`                        | the `StoneVariants` of the config                            |
| `shouldIncludeRecipe(RecipeData)`           | whether the recipe is unified by this config                 |
| `shouldIncludeRecipeType(ResourceLocation)` | whether the recipe type is unified by this config            |
| `shouldIncludeRecipeId(ResourceLocation)`   | whether the recipe ID is unified by this config              |
| `shouldHideVariantItems()`                  | whether `recipe_viewer_hiding` is enabled                    |
| `shouldUnifyLoot()`                         | whether `loot_unification` is enabled                        |
| `shouldIncludeLootTable(ResourceLocation)`  | whether the loot table is unified by this config             |

Since config-specific settings can't be combined, there is no combined `UnificationSettings` instance.

## Other Helpers

- `ModPriorities`: iterable list of the mod priorities. `getPriorityOverride(tag)` returns the override mod of a tag, and `findTargetItem(tag, items)` resolves the target item among a list of entries.
- `StoneVariants`: `getStoneVariant(item)` returns the stone variant of an ore (an empty string for regular stone), and `isOreTag(tag)` checks whether a tag is treated as an ore tag.
- `TagSubstitutions`: `getSubstituteTag(replacedTag)` and `getReplacedTags(substituteTag)` to resolve tag substitutions.
- `Placeholders`: `apply(string)` expands all placeholders of a string, `getPlaceholders()` and `getReplacements(placeholder)` return the configured values.

For the full documentation, check the Javadoc of the [API package](https://github.com/AlmostReliable/almostunified/tree/1.21.1/Common/src/main/java/com/almostreliable/unified/api).
