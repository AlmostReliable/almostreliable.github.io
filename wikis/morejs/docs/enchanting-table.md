# Enchanting Table

## Intro

Called when the player inserts an item into the enchanting table. Event can be called by using `MoreJS.enchantmentTableChanged((event) => {...})`

## Methods

-   `get(row: number): EnchantmentData`
    -   Returns the enchantment data for the given row inside the enchanting table. Row `0` is the top row, `1` is the second row and `2` is the bottom row.
-   `getPosition()`
-   `getItem()`
-   `setItem(item: ItemStack)`
-   `getSecondItem()`
-   `getLevel()`
-   `getPlayer()`

## EnchantmentData

Enchantment data contains all information about a specific row inside the enchanting table.

If you modify any enchantments inside the data, you should either call `randomClue()` or `setClue()` to update the clue tooltip in the enchanting table. This will not happen automatically.

```ts
interface EnchantmentData {
    requiredLevel: number,
    enchantments: EnchantmentInstance[],
    enchantmentIds: string[],
    hasEnchantment(enchantment: Enchantment): boolean,
    hasEnchantment(enchantment: Enchantment, level: number | number[]): boolean,
    removeEnchantments((enchantment: Enchantment, level: number) => boolean),
    addEnchantment(enchantment: Enchantment, level: number),
    randomClue(),
    setClue(enchantment: Enchantment, level: number),
    setClue(enchantmentInstance: EnchantmentInstance),
    clearClue(),
}

interface EnchantmentInstance {
    enchantment: Enchantment,
    level: number,
}
```

## Usage

```js
MoreJS.enchantmentTableChanged((event) => {
    const data = event.get(2)
    data.addEnchantment("minecraft:mending", 1)
    data.randomClue()
})
```

```js
MoreJS.enchantmentTableChanged((event) => {
    const data = event.get(2)

    // removes sharpness if level > 3
    data.removeEnchantments((enchantment, level) => {
        return enchantment.key === "minecraft:sharpness" && level > 3
    })
    data.randomClue()
})
```
