# Conditions Tooltip Modification

This event allows you to modify the tooltips displayed for ritual conditions in recipe viewers.

> [!INFO] NOTE
> This event is available since version 3.13.0.

**It is a client event and reloadable.** Keep in mind that client events have to be located inside the `kubejs/client_scripts` folder. Reloading client scripts does not work with `/reload`. Instead you have to invoke an asset reload by pressing `F3` + `T` in-game.

## Overview

The event is fired when recipe viewers collect tooltips for altar recipe displays. Depending on the recipe viewer, this can happen once per recipe or every render tick. The exposed `tooltip` collection contains all components that will be displayed in the tooltip and it's mutable. This means you can add, remove, or modify the components in the tooltip.

To filter tooltip modification to specific recipes, you can use the `recipeId` property of the event. The `recipe` object is also exposed. Make sure to only use this as a reference because the event is client-sided and modifying data inside the recipe could lead to desyncs. The recipe may not contain all information because not all data is synchronized to the client.

If a recipe has no conditions, the event will still be fired. If you add an entry to the tooltip collection, it will be displayed in the tooltip. This allows adding custom tooltips even for recipes that have no conditions.

The tooltip collection always contains the golden "Conditions:" header as the first entry. If you clear the collection, the header will be removed as well.

-   access in a server script via: `SummoningRituals.modifyConditionsTooltip`
-   properties
    -   `recipeId`
        -   type: `ResourceLocation`
        -   description: the ID of the recipe that is being displayed
    -   `recipe`
        -   type: `AltarRecipe`
        -   description: the recipe that is being displayed
    -   `tooltip`
        -   type: `List<Component>`
        -   description: the tooltip collection that is being displayed

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `modifyConditionsTooltip` event in a client script.

```js
SummoningRituals.modifyConditionsTooltip(event => {
    // ...
})
```

After that, you can access the event properties to implement your desired logic.

## Example

```js
SummoningRituals.modifyConditionsTooltip(event => {
    const { recipeId, recipe, tooltip } = event

    // check for a specific recipe
    if (recipeInfo.recipeId.toString() !== "kubejs:forbidden_ritual") {
        return
    }

    // clear existing tooltips
    tooltip.clear()

    // add a new tooltip
    tooltip.add(Text.of("Custom tooltip text").blue())
})
```
