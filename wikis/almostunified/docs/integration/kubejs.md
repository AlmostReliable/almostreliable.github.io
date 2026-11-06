# KubeJS

Almost Unified provides a [KubeJS](https://www.curseforge.com/minecraft/mc-mods/kubejs) binding called `AlmostUnified` that allows your scripts to query unification information.

The binding uses the runtime of Almost Unified, which is only available on the server side after tags are loaded. Calling it in startup or client scripts, or before tags are loaded, throws an error. Server events such as the recipes event or loot modification events are safe to use.

## Functions

| Function                     | Returns                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `getTags()`                  | A set of all unification tags as strings, across all unification configs.                                                        |
| `getTagEntries(tag)`         | A set of the IDs of all items in the given unification tag. Empty if the tag is not a unification tag.                           |
| `getRelevantItemTag(item)`   | The unification tag of the given item as a string, or `null` if the item is not part of a unification tag.                       |
| `getVariantItemTarget(item)` | The target item of the given item as an item stack. Respects stone variants. Empty if the item is not part of a unification tag. |
| `getTagTargetItem(tag)`      | The target item of the given unification tag as an item stack. Empty if the tag is not a unification tag.                        |

Tags are passed without `#`, e.g. `"c:ingots/silver"`. Items can be passed as item IDs or item stacks, e.g. `"mod_b:silver_ingot"`.

## Examples

### Using Target Items in Custom Recipes

Instead of hardcoding the item of a specific mod, use the target item of a tag. This way, your recipes stay correct when you change the mod priorities.

```js
ServerEvents.recipes(event => {
    const silverIngot = AlmostUnified.getTagTargetItem("c:ingots/silver")
    if (silverIngot.isEmpty()) return

    event.shaped(silverIngot.copyWithCount(4), ["SS", "SS"], {
        S: "#c:storage_blocks/silver",
    })
})
```

### Replacing Drops with LootJS

[Loot unification](../features/loot.md) covers most loot tables. If you need more control, you can combine the binding with [LootJS](https://www.curseforge.com/minecraft/mc-mods/lootjs). The following script replaces all raw materials dropped by ores with their target items:

```js
LootJS.modifiers(event => {
    event.addTableModifier(LootType.BLOCK).modifyLoot("#c:raw_materials", item => {
        const target = AlmostUnified.getVariantItemTarget(item)
        if (target.isEmpty()) return item
        return target.copyWithCount(item.count)
    })
})
```

### Listing Unification Information

```js
ServerEvents.loaded(event => {
    for (const tag of AlmostUnified.getTags()) {
        const target = AlmostUnified.getTagTargetItem(tag)
        console.log(`${tag} -> ${target.id} (${AlmostUnified.getTagEntries(tag).size()} items)`)
    }
})
```
