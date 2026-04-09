# Ritual Renderer Registration

This event allows you to register custom ritual renderers for specific recipes.

**It is a client event and reloadable.** Keep in mind that client events have to be located inside the `kubejs/client_scripts` folder. Reloading client scripts does not work with `/reload`. Instead you have to invoke an asset reload by pressing `F3` + `T` in-game.

## Overview

The event is fired when client resources are being loaded. The registered renderers will be called every render tick for the respective recipe.

-   access in a server script via: `SummoningRituals.ritualRendererRegistration`
-   functions
    -   `register(ResourceLocation recipeId, CustomRitualRenderer renderer)`
        -   description: registers a custom ritual renderer for the specified recipe
        -   note: it can't be ensured that the recipe ID points to a valid recipe; make sure it's correct

## Recipe ID

Because a renderer is registered to a specific recipe, you need to specify the recipe ID when registering a renderer. The recipe ID is a `ResourceLocation` that uniquely identifies a recipe. It consists of a namespace and a path, separated by a colon (e.g., `kubejs:forbidden_ritual`).

To assign a custom ID to a recipe, you can use the `id` function in the recipe definition.

```js
event.recipes.summoningrituals.altar(...).id("kubejs:forbidden_ritual")
```

> [!INFO] NOTE
> The `id` function is part of KubeJS, not of Summoning Rituals. You can attach this function to any recipe to specify a custom ID. If not specified, KubeJS will generate a random ID.

## Custom Ritual Renderer

The custom ritual renderer is a simple callback function that is called every render tick for the respective recipe. Because the altar also renders an idle animation, the custom renderer will only be called once the specified recipe is in progress. This means that the renderer will only be active while the ritual is being performed.

The renderer function receives three parameters and doesn't return anything:

-   `AltarRenderer`: the instance of the original renderer
-   `AltarRecipe`: the instance of the recipe that is currently being processed
-   `AltarRenderContext`: the context for the render operation containing useful data and utility methods

### Altar Renderer

The altar renderer is what handles the animation of the altar and plays the idle animation as well as the crafting animation if no custom renderer is registered. The renderer grants access to useful constants, the `ItemRenderer` instance, the methods that would be used for rendering if no custom renderer is specified, as well as some utility methods.

You can check its implementation [here](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/client/render/AltarRenderer.java).

### Altar Recipe

The altar recipe is a reference to the recipe that is currently being processed. It grants access to all the data of the recipe. Keep in mind that you should only use that data as reference for logic operations. Do **not** modify any of the data!

You can check its implementation [here](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/recipe/AltarRecipe.java).

### Altar Render Context

This class is a container class holding necessary information for rendering the ritual. The default methods also make use of this context object to render the default animations. It also exposes some utility functions.

You can check its implementation [here](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/client/render/AltarRenderContext.java).

-   properties
    -   `level`
        -   type: `ClientLevel`
        -   description: the level where the ritual is being performed
    -   `player`
        -   type: `Player`
        -   description: the client player the render thread is running for
    -   `altar`
        -   type: `AltarBlockEntity`
        -   description: the altar block entity instance; can be used to access the position and other data of the altar
    -   `playerToAltarDistance`
        -   type: `Float`
        -   description: the distance from the player to the altar; can be used for distance-based rendering effects
    -   `playerToAltarAngle`
        -   type: `Float`
        -   description: the angle from the player to the altar; can be used for angle-based rendering effects
    -   `recipeProgress`
        -   type: `Integer`
        -   description: the progress of the recipe in ticks
    -   `recipeTime`
        -   type: `Integer`
        -   description: the total time of the recipe in ticks
    -   `recipeProgressRatio`
        -   type: `Float`
        -   description: the progress of the recipe as a ratio from 0 to 1; can be used for progress-based rendering effects
    -   `poseStack`
        -   type: `PoseStack`
        -   description: the pose stack for rendering; has a defensive push/pop to revert any transformations after the render method finishes
    -   `bufferSource`
        -   type: `MultiBufferSource`
        -   description: the buffer source for rendering; can be used to get vertex builders for rendering
    -   `lightAbove`
        -   type: `Integer`
        -   description: the light level above the altar; can be used for light-based rendering effects
    -   `packedOverlay`
        -   type: `Integer`
        -   description: the packed overlay for rendering; used for UV transformations in the vertex consumer
    -   `partialTicks`
        -   type: `Float`
        -   description: the partial ticks for rendering; can be used for smooth animations
-   functions
    -   `pushPose()`
        -   description: pushes the current pose; should be used at the beginning of the render method to ensure transformations don't affect other renderers
    -   `popPose()`
        -   description: pops the current pose; should be used at the end of the render method to ensure transformations don't affect other renderers
    -   `translate(float x, float y, float z)`
        -   description: translates the pose stack by the specified amounts
    -   `scale(float x, float y, float z)`
        -   description: scales the pose stack by the specified x, y, z values
    -   `scale(float scale)`
        -   description: scales the pose stack uniformly by the specified scale
    -   `mulPose(Quaternionf quaternion)`
        -   description: multiplies the pose stack by the specified quaternion; used for rotations
    -   `shouldReset()`
        -   description: returns true if the recipe has completed (progress >= time)
        -   note: this is likely not going to work in a custom renderer because the default renderer will run at this point
    -   `getInitiator()`
        -   description: returns the initiator item stack from the altar inventory
    -   `getInputs()`
        -   description: returns a list of input item stacks from the altar inventory for display
    -   `renderItem(ItemRenderer itemRenderer, ItemStack item)`
        -   description: renders the specified item stack using the provided item renderer
        -   note: you can obtain the `ItemRenderer` instance from the `AltarRenderer` parameter of the custom renderer

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `ritualRendererRegistration` event in a client script.

```js
SummoningRituals.ritualRendererRegistration(event => {
    // ...
})
```

After that, you can access the event properties and functions to implement your desired logic.

## Example

```js
SummoningRituals.ritualRendererRegistration(event => {
    event.register("kubejs:forbidden_ritual", (renderer, recipe, context) => {
        // push the pose to ensure our transformations don't affect other renderers
        context.pushPose()

        // translate to the center of the altar and above it
        context.translate(0.5, 1, 0.5)
        // move up the pose depending on the recipe progress
        context.translate(0, context.recipeProgressRatio * 2, 0)

        // scale the pose up for better visibility
        context.scale(1.4)

        // render the initiator item at the current pose
        context.renderItem(renderer.itemRenderer, context.getInitiator())

        // pop the pose to revert our transformations
        context.popPose()
    })
})
```
