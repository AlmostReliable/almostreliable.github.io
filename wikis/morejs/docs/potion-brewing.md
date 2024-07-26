# Potion Brewing

## Methods

-   `addPotionBrewing(ingredient: Ingredient, input: Potion, output: Potion)`
-   `removePotionBrewing(filter: PotionBrewingFilter)`
-   `addContainerRecipe(ingredient: Ingredient, input: Item, output: Item)`
-   `removeContainer(ingredient: Ingredient)`
-   `addCustomBrewing(ingredient: Ingredient, input: Ingredient, output: Item)`
-   `removeCustomBrewing(filter: CustomBrewingFilter)`
-   `getCustomBrewingRecipes()`
    -   Returns a mutable list of all custom brewing recipes. Some mods register their own implementation of a custom brewing recipe. This method can be used to remove them or modify them.

## Usage

### Add brewing

::: info
Remember that the arguments for input and output are `Potion` ids and not items!
:::

This will add a brewing recipe which creates a strong regeneration potion when using apples.

```js
MoreJS.registerPotionBrewing((event) => {
    event.addPotionBrewing("minecraft:apple", "minecraft:water", "minecraft:strong_regeneration")
})
```

### Add custom brewing

Custom brewing allows to not rely on any potion. We can just use any item to convert.

```js
MoreJS.registerPotionBrewing((event) => {
    event.addCustomBrewing("minecraft:emerald", "minecraft:nether_star", "minecraft:diamond")
})
```

### Remove brewing

For removing simple potion brewings we can use a `PotionBrewingFilter` which looks like follow:

```ts
interface PotionBrewingFilter {
    ingredient: Ingredient
    input: Potion | Potion[] | RegEx
    output: Potion | Potion[] | RegEx
}
```

Using the filter does not require to use all the arguments. Arguments which are not given automatically act as wildcards.

```js
MoreJS.registerPotionBrewing((event) => {
    event.removePotionBrewing({
        ingredient: "minecraft:apple",
        input: "minecraft:harming",
        output: "minecraft:strong_harming",
    })
})
```

### Remove custom brewing

For removing custom potion brewings we can use a `CustomBrewingFilter` which looks like follow:

```ts
interface CustomBrewingFilter {
    ingredient: Ingredient
    input: Ingredient
    output: Ingredient
}
```

```js
MoreJS.registerPotionBrewing((event) => {
    event.removeCustomBrewing({
        ingredient: "minecraft:emerald",
        input: "minecraft:nether_star",
        output: "minecraft:diamond",
    })
})
```
