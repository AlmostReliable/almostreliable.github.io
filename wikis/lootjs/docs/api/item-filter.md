# ItemFilter

Item filters are an essential utility in LootJS for filtering how items should be handled. It's mostly used when removing items or if we want to match specific conditions e. g the main hand of the player.

Everywhere where you can use `ItemFilter` as an argument, you can also simply pass an item id as string or a tag. LootJS will automatically creates the `ItemFilter`.

## `armor`

Matches if the item is an armor item.
::: info
Some mods may create their own `armor` typed items without using the vanilla armor system. For these items, this filter will never match.
:::

-   Syntax:
    -   `ItemFilter.ARMOR`

## `blockItem`

Matches if the item is a block item. Block items are items that can be placed as a block.
::: item
Mods may use their own implementation of block items, so this filter may not match.
:::

-   Syntax:
    -   `ItemFilter.BLOCK_ITEM`

## `custom`

Creates a custom item filter. You can use it to create your own item filters.

-   Syntax:
    -   `ItemFilter.custom(filter: (item: ItemStack) => boolean)`

```js
ItemFilter.custom(item => item.id === "minecraft:apple")

ItemFilter.custom(item => {
    if (item.hasTag("#c:ores")) {
        return true
    }

    return item.count > 16
})
```

## `damageable`

Matches if the item can be damaged.

-   Syntax:
    -   `ItemFilter.DAMAGEABLE`

## `damaged`

Matches if the item is already damaged.

-   Syntax:
    -   `ItemFilter.DAMAGED`

## `edible`

Matches if the item can be eaten.

-   Syntax:
    -   `ItemFilter.EDIBLE`

## `enchanted`

Matches if the item is already enchanted.

-   Syntax:
    -   `ItemFilter.ENCHANTED`

## `empty`

Checks if the item is empty.

-   Syntax:
    -   `ItemFilter.EMPTY`

## `equipmentSlot`

Matches if item has a specific equipment slot. Existing slots: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"`, `"feet"`.

-   Syntax:
    -   `ItemFilter.equipmentSlot(slot: string | EquipmentSlot)`

```js
ItemFilter.equipmentSlot("mainhand")
```

## `equipmentSlotGroup`

Matches if an item is in a specific equipment group. Existing groups: `"any"`, `"mainhand"`, `"offhand"`, `"hand"`, `"feet"`, `"legs"`, `"chest"`, `"head"`, `"armor"`

-   Syntax:
    -   `ItemFilter.equipmentSlotGroup(slot: string | EquipmentSlotGroup)`

```js
ItemFilter.equipmentSlot("armor")
```

## `hasEnchantment`

Used to check if given item matches the enchantments.

-   Syntax:
    -   `ItemFilter.hasEnchantment(filter)`
    -   `ItemFilter.hasEnchantment(filter, levelRange: Range)`, _<sub>see [Range]</sub>_

```js
ItemFilter.hasEnchantment("minecraft:fortune")

// matches all enchantments from `minecraft`
ItemFilter.hasEnchantment("@minecraft")

// matches if any of the enchantments are present
ItemFilter.hasEnchantment(["minecraft:fortune", "minecraft:mending"])

// matches if `unbreaking` is at least level 2 and at most level 3
ItemFilter.hasEnchantment("minecraft:unbreaking", [2, 3])
```

## `hasStoredEnchantment`

Used to check if given book item matches the enchantments. In minecraft `books` do store the enchantments differently.

-   Syntax:
    -   `ItemFilter.hasStoredEnchantment(filter)`
    -   `ItemFilter.hasStoredEnchantment(filter, levelBound: Range)`, _<sub>see [Range]</sub>_

```js
ItemFilter.hasStoredEnchantment("minecraft:fortune")

// matches all enchantments from `minecraft`
ItemFilter.hasStoredEnchantment("@minecraft")

// matches if any of the enchantments are present
ItemFilter.hasStoredEnchantment(["minecraft:fortune", "minecraft:mending"])

// matches if `unbreaking` is at least level 2 and at most level 3
ItemFilter.hasStoredEnchantment("minecraft:unbreaking", [2, 3])
```

## `hasComponent`

Used to check if given item has specific components on it.

-   Syntax:
    -   `ItemFilter.hasComponent(filter)`

```js
ItemFilter.hasComponent("minecraft:tool")

// check against multiple components. Requires the item to have all of the components
ItemFilter.hasComponent("minecraft:tool", "minecraft:custom_name")
```

## `item`

Matches if the item matches. This will not check for count but may check against components.

-   Syntax:
    -   `ItemFilter.item(item: ItemStack | string)`
    -   `ItemFilter.item(item: ItemStack | string, matchComponents: boolean)`

```js
ItemFilter.item("minecraft:diamond")
```

## `not`/`negate`

Inverts the filter. Matches if the filter does not match.

-   Syntax:
    -   `ItemFilter.not(filter: ItemFilter)`
    -   `myFilter.negate()`

```js
ItemFilter.not(ItemFilter.hasEnchantment("minecraft:fortune"))

ItemFilter.hasEnchantment("minecraft:fortune").negate()
```

## `tag`

Matches if item has a specific tag.

-   Syntax:
    -   `ItemFilter.tag(tag: string)`

```js
ItemFilter.tag("#c:ores")
```

## `toolAction`

`NeoForge` adds something called `ToolAction`, which can be used to determine if an item can do specific things. Some mods uses this for multi-tools.

It will match if all actions are present.

-   Syntax:
    -   `ItemFilter.toolAction(...action)`
    -   `ItemFilter.anyToolAction(...action)`

```js
ItemFilter.toolAction("pickaxe_dig")

// We can also match multiple actions.
ItemFilter.toolAction("pickaxe_dig", "shovel_dig")
```

```js
ItemFilter.anyToolAction("pickaxe_dig")

// We can also match multiple actions.
ItemFilter.anyToolAction("pickaxe_dig", "shovel_dig")
```

## Groups

### `allOf`

Combines multiple item filters into one. Matches if all filters match.

-   Syntax:
    -   `ItemFilter.allOf(...filters: ItemFilter[])`

```js
ItemFilter.allOf(ItemFilter.hasEnchantment("minecraft:fortune"), ItemFilter.equipmentSlotGroup("hand"))
```

### `anyOf`

Combines multiple item filters into one. Matches if any filter matches.

-   Syntax:
    -   `ItemFilter.anyOf(...filters: ItemFilter[])`

```js
ItemFilter.anyOf(
    ItemFilter.hasEnchantment("minecraft:silk_touch"),
    ItemFilter.equipmentSlotGroup("armor")
)
```

### `all`

Returns an item filter that matches everything.

-   Syntax:
    -   `ItemFilter.ALL`

### `none`

Returns an item filter that matches nothing.

-   Syntax:
    -   `ItemFilter.NONE`

[Range]: /api/range
