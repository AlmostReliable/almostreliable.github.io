# Functions

While loot functions can be used in different ways, from now on the examples on this page will shown with `LootEntries` but they can easily be used in other places.

## `addAttributes`

Add attribute modifiers to the item. In the callback, you can use multiple functions to add attributes. `Probability` can be used to have a random chance the attribute will be applied.

If using simple, it will use the default equipment slot for the item.

-   `.simple(attribute, amount: NumberProvider)`_<sub>, see [NumberProvider]</sub>_
-   `.simple(probability, attribute, amount: NumberProvider)`
-   `.forSlots(attribute, amount: NumberProvider, slots: EquipmentSlot[])`
-   `.forSlots(probability, attribute, amount: NumberProvider, slots: EquipmentSlot[])`

Possible attributes for vanilla can be found in the [Minecraft Wiki](https://minecraft.wiki/w/Attribute#Attributes_available_on_all_living_entities). Also mods may add own attributes, for that you should take a look at the corresponding mod page.

Possible slots are: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"`, `"feet"`.

-   Syntax:
    -   `.addAttributes(callback => {})`
    -   `LootFunction.addAttributes(callback => {})`

```js
LootEntry.of("minecraft:potion").addAttributes((attr) => {
    attr.simple("generic.max_health", 1)
    attr.simple(0.99, "generic.max_health", 2)
    attr.forSlots("generic.max_health", 3, [SLOT_MAINHAND])
    attr.forSlots(0.99, "generic.max_health", 4, [SLOT_OFFHAND])
})
```

## `addPotion`

-   Syntax:
    -   `.addPotion(potion)`
    -   `LootFunction.addPotion(potion)`

```js
LootEntry.of("minecraft:potion").addPotion("minecraft:poison")
```

## `applyBonus`

Applies a uniform bonus based on given multiplier. The item count will be increased between `0` and `multiplier * enchantmentLevel`.<br>
_Minecraft uses this for `sea_lantern` or `redstone_ore` as an example by applying `apply_bonus` with `uniform_bonus_count` as formula._

-   Syntax:
    -   `.applyBonus(enchantment, multiplier: number)`
    -   `LootFunction.applyBonus(enchantment, multiplier: number)`

## `applyOreBonus`

Applies a bonus based on special formula Minecraft uses for ore drops: <br>
`count * max(1; randomInt(0, enchantmentLevel + 2))`

-   Syntax:
    -   `.applyOreBonus(enchantment)`
    -   `LootFunction.applyOreBonus(enchantment)`

```js
// In vanilla minecraft often uses fortune here. Of course you can use any enchantment here.
LootEntry.of("minecraft:emerald_ore").applyOreBonus("minecraft:fortune")
```

## `applyBinomialDistributionBonus`

Applies a bonus based on the binomial distribution, where `n = enchantmentLevel + extra` and `p = probability`.

-   Syntax:
    -   `.applyBinomialDistributionBonus(enchantment, p: number, extra: number)`
    -   `LootFunction.applyBinomialDistributionBonus(enchantment, p: number, extra: number)`

```js
LootEntry.of("minecraft:emerald_ore").applyBinomialDistributionBonus(
    "minecraft:fortune",
    0.2,
    3,
)
```

## `applyEnchantmentBonus`

Applies a bonus, when player uses a specific enchantment. If no enchantment is provided, "minecraft:looting" is used as default.

-   Syntax:
    -   `.applyEnchantmentBonus(bonus: NumberProvider)`_<sub>, see [NumberProvider]</sub>_
    -   `.applyEnchantmentBonus(enchantment: Enchantment, bonus: NumberProvider)`
    -   `LootFunction.applyEnchantmentBonus(bonus: NumberProvider)`
    -   `LootFunction.applyEnchantmentBonus(enchantment: Enchantment, bonus: NumberProvider)`

```js
LootEntry.of("minecraft:emerald_ore").applyEnchantmentBonus([2, 5])
```

```js
LootEntry.of("minecraft:emerald_ore").applyEnchantmentBonus("minecraft:fortune", [2, 5])
```

## `setCount`

::: tip Info
For `LootEntries` we often want to change the existing count instead of adding a new one. Because of that using `setCount` on a loot entry will replace the existing count function if one exists, otherwise it will add it. If you still wish to add multiple count functions you can use `.addFunction(LootFunction.setCount(count: NumberProvider))`

**This behavior does not apply for `LootModifiers` through `LootJS.modifiers()` event!**
:::

-   Syntax:
    -   `.setCount(count: NumberProvider)`_<sub>, see [NumberProvider]</sub>_
    -   `LootFunction.setCount(count: NumberProvider)`

```js
LootEntry.of("minecraft:emerald_ore").setCount(20)
```

```js
LootEntry.of("minecraft:emerald_ore").setCount([2, 10])
```

## `limitCount`

Limits the item count between `min` and `max`. Min and max both can be optional by using `null` as value.

-   Syntax:
    -   `.limitCount(min: NumberProvider | null, max: NumberProvider | null)`_<sub>, see [NumberProvider]</sub>_
    -   `LootFunction.limitCount(min: NumberProvider | null, max: NumberProvider | null)`

```js
LootEntry.of("minecraft:emerald_ore").limitCount(2, 10)
```

```js
// Or this. Always have at least 10 but never more than [30, 35]
LootEntry.of("minecraft:emerald_ore").limitCount(10, [30, 35])
```

## `setCustomData`

Set the custom data tag of the item.

-   Syntax:
    -   `.setCustomData(nbt)`

```js
LootEntry.of("minecraft:emerald_ore").setCustomData({ someCustomStuff: true })
```

## `setName`

-   Syntax:
    -   `.setName(name: Component)`
    -   `LootFunction.setName(name: Component)`

```js
LootEntry.of("minecraft:emerald_ore").setName(
    Component.translatable("item.minecraft.emerald_ore"),
)
```

```js
LootEntry.of("minecraft:emerald_ore").setName("Emerald Ore with new name")
```

## `enchantRandomly`

-   Syntax:
    -   `.enchantRandomly()`
    -   `.enchantRandomly(enchantments: Enchantment | Tag | Enchantment[])`
    -   `LootFunction.enchantRandomly()`
    -   `LootFunction.enchantRandomly(enchantments: Enchantment | Tag | Enchantment[])`

```js
LootEntry.of("minecraft:emerald_ore").enchantRandomly()
```

```js
LootEntry.of("minecraft:emerald_ore").enchantRandomly([
    "minecraft:fortune",
    "minecraft:unbreaking",
])
```

## `enchantWithLevels`

-   Syntax:
    -   `.enchantWithLevels(levelRange: NumberProvider)`

```js
LootEntry.of("minecraft:netherite_sword").enchantWithLevels([20, 39])
```

## `enchant`

-   Syntax:
    -   `.enchant(add: boolean, (builder) => { ... })`
    -   `.enchant((builder) => { ... })`
    -   `LootFunction.enchant(add: boolean, (builder) => { ... })`
    -   `LootFunction.enchant((builder) => { ... })`

The builder has a method `.withEnchantment(enchantment: id, level: NumberProvider)` you can use to apply enchantments.

```js
LootEntry.of("minecraft:netherite_sword").enchant((builder) => {
    builder.withEnchantment("minecraft:sharpness", [4, 5])
    builder.withEnchantment("minecraft:unbreaking", 3)
    builder.withEnchantment("minecraft:knockback", 2)
    builder.withEnchantment("minecraft:mending", 1)
})
```

## `addLore`

-   Syntax:
    -   `.addLore(lore: Component)`
    -   `LootFunction.addLore(lore: Component)`

```js
LootEntry.of("minecraft:emerald_ore").addLore("Enchanted")
```

## `replaceLore`

-   Syntax:
    -   `.replaceLore(lore: Component)`
    -   `LootFunction.replaceLore(lore: Component)`

```js
LootEntry.of("minecraft:emerald_ore").replaceLore("Enchanted")
```

## `damage`

-   Syntax:
    -   `.damage(damage: NumberProvider)`_<sub>, see [NumberProvider]</sub>_
    -   `LootFunction.damage(damage: NumberProvider)`

```js
LootEntry.of("minecraft:diamond_sword").damage(5)
```

```js
LootEntry.of("minecraft:diamond_sword").damage([5, 10])
```

## `simulateExplosionDecay`

-   Syntax:
    -   `.simulateExplosionDecay()`
    -   `LootFunction.simulateExplosionDecay()`

```js
LootEntry.of("minecraft:diamond_sword").simulateExplosionDecay()
```

## `smelt`

-   Syntax:
    -   `.smelt()`
    -   `LootFunction.smelt()`

```js
LootEntry.of("minecraft:diamond_sword").smelt()
```

## `toggleTooltips`

Allows to toggle rendering tooltips for specific DataComponents

-   Syntax:
    -   `.toggleTooltips(data: { componentId: boolean })`
    -   `LootFunction.toggleTooltips(data: { componentId: boolean })`

```js
LootEntry.of("minecraft:diamond_boots").toggleTooltips({
    "minecraft:enchantments": false,
    "minecraft:trim": true,
})
```

## `jsonFunction`

-   Syntax:
    -   `.jsonFunction(json)`
    -   `LootFunction.fromJson(json)`

```js
LootEntry.of("minecraft:diamond_sword").jsonFunction({
    function: "minecraft:limit_count",
    limit: {
        max: 5.0,
        min: 1.0,
    },
})
```

[NumberProvider]: /api/number-provider
[conditions]: /api/loot-condition
