# Mob Category

The `MobCategory` is a utility binding of a vanilla enumeration that represents the different mob categories in Minecraft.

## Overview

-   access via: `MobCategory`
-   values:
    -   `MobCategory.AMBIENT`
    -   `MobCategory.AXOLOTLS`
    -   `MobCategory.CREATURE`
    -   `MobCategory.MISC`
    -   `MobCategory.MONSTER`
    -   `MobCategory.UNDERGROUND_WATER_CREATURE`
    -   `MobCategory.WATER_AMBIENT`
    -   `MobCategory.WATER_CREATURE`

## Examples

This binding is intended to be used inside [Soul Binder recipes](../machine/soulbinder.md). Pass it to the `mob_category` parameter to define the mob category soul required for the recipe. Since it's a vanilla enumeration, it's not exclusive to the Soul Binder.

```js
ServerEvents.recipes(event => {
    event.recipes.enderio
        .soul_binding(Item.of("stone", 4), "stick", 5000)
        .mobCategory(MobCategory.AXOLOTLS) // [!code focus]
})
```
