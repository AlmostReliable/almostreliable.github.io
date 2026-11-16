# Ritual Renderer Registration

This event allows you to register custom ritual renderers for specific recipes.

**It is a client event and reloadable.** Keep in mind that client events have to be located inside the `kubejs/client_scripts` folder. Reloading client scripts does not work with `/reload`. Instead you have to invoke an asset reload by pressing `F3` + `T` in-game.

## Overview

The event is fired when client resources are being loaded. The registered renderers will be called every frame for the respective recipe. If a custom renderer throws an error, the error will be logged and the renderer will be removed until the next asset reload. The default renderer will be used instead.

- access in a client script via: `SummoningRituals.ritualRendererRegistration`
- functions
    - `register(Identifier recipeId, CustomRitualRenderer renderer)`
        - description: registers a custom ritual renderer for the specified recipe
        - note: it can't be ensured that the recipe ID points to a valid recipe; make sure it's correct

## Recipe ID

Because a renderer is registered to a specific recipe, you need to specify the recipe ID when registering a renderer. The recipe ID is an `Identifier` that uniquely identifies a recipe. It consists of a namespace and a path, separated by a colon (e.g., `kubejs:forbidden_ritual`).

To assign a custom ID to a recipe, you can use the `id` function in the recipe definition.

```js
event.recipes.summoningrituals.altar(...).id("kubejs:forbidden_ritual")
```

> [!INFO] NOTE
> The `id` function is part of KubeJS, not of Summoning Rituals. You can attach this function to any recipe to specify a custom ID. If not specified, KubeJS will generate a random ID.

## Render Pipeline

Minecraft renders in two phases. First, the game extracts all data that is required for rendering. Afterwards, the actual render calls are submitted. The altar renderer follows the same approach.

Before your custom renderer is called, the altar renderer extracts the state of the altar, such as the recipe progress and the items inside the altar inventory. The items are also prepared as render states, so they can be rendered without resolving their models again. Your custom renderer is called afterwards during the submit phase. Because of that, you should use the data exposed by the [render context](#altar-render-context) instead of reading it from the altar block entity.

- to render the initiator or the inputs, use `initiatorRenderState` and `inputRenderStates`
- to render any other item, use `renderItem` with the `itemModelResolver` of the [altar renderer](#altar-renderer)
- to submit custom render calls like text, use the `submitNodeCollector` together with the `poseStack`

## Custom Ritual Renderer

The custom ritual renderer is a simple callback function that is called every frame for the respective recipe. Because the altar also renders an idle animation, the custom renderer will only be called once the specified recipe is in progress. This means that the renderer will only be active while the ritual is being performed.

The renderer function receives three parameters and doesn't return anything:

- `AltarRenderer`: the instance of the original renderer
- `AltarRecipe`: the instance of the recipe that is currently being processed
- `AltarRenderContext`: the context for the render operation containing useful data and utility methods

### Altar Renderer

The altar renderer is what handles the animation of the altar and plays the idle animation as well as the crafting animation if no custom renderer is registered. The renderer grants access to useful constants, the `ItemModelResolver` instance, the methods that would be used for rendering if no custom renderer is specified, as well as some utility methods.

You can check its implementation [here](https://github.com/AlmostReliable/summoningrituals/blob/26.1/src/main/java/com/almostreliable/summoningrituals/client/render/AltarRenderer.java).

- properties
    - `itemModelResolver`
        - type: `ItemModelResolver`
        - description: resolves item models; required when rendering items that are not part of the altar inventory
- functions
    - `renderInventoryContents(AltarRenderContext context)`
        - description: renders the default initiator and item orbit, including the movement based on the recipe progress
        - note: the default renderer translates the pose to `[0.5, 0.8, 0.5]` and scales it by `0.5` before calling this function
    - `renderInitiator(AltarRenderContext context)`
        - description: renders the initiator item facing the player
    - `renderItemOrbit(AltarRenderContext context)`
        - description: renders the input items orbiting around the center
        - note: this function scales the current pose by the `orbitScale` of the context; wrap it in `pushPose()` and `popPose()` if you render more things afterwards

### Altar Recipe

The altar recipe is a reference to the recipe that is currently being processed. It grants access to all the data of the recipe. Keep in mind that you should only use that data as reference for logic operations. Do **not** modify any of the data!

You can check its implementation [here](https://github.com/AlmostReliable/summoningrituals/blob/26.1/src/main/java/com/almostreliable/summoningrituals/recipe/AltarRecipe.java).

### Altar Render Context

This class is a container class holding necessary information for rendering the ritual. The default methods also make use of this context object to render the default animations. It also exposes some utility functions.

You can check its implementation [here](https://github.com/AlmostReliable/summoningrituals/blob/26.1/src/main/java/com/almostreliable/summoningrituals/client/render/AltarRenderContext.java).

- properties
    - `level`
        - type: `Level`
        - description: the level where the ritual is being performed
    - `player`
        - type: `Player`
        - description: the client player the render thread is running for
    - `altarPos`
        - type: `BlockPos`
        - description: the position of the altar block
    - `altar`
        - type: `AltarBlockEntity` (nullable)
        - description: the altar block entity at `altarPos`; may be `null` if the block entity doesn't exist anymore, for example if the altar was just broken
        - note: always check for `null` before accessing it; if you only need the position, use `altarPos` instead
    - `gameTime`
        - type: `Long`
        - description: the game time of the level; can be combined with `partialTick` for smooth time-based animations
    - `partialTick`
        - type: `Float`
        - description: the partial tick of the current frame; can be used for smooth animations
    - `playerToAltarDistance`
        - type: `Float`
        - description: the distance from the player to the altar; can be used for distance-based rendering effects
    - `playerToAltarAngle`
        - type: `Float`
        - description: the angle from the player to the altar; can be used for angle-based rendering effects
    - `recipeProgress`
        - type: `Integer`
        - description: the progress of the recipe in ticks
    - `recipeTime`
        - type: `Integer`
        - description: the total time of the recipe in ticks
    - `recipeProgressRatio`
        - type: `Float`
        - description: the progress of the recipe as a ratio from 0 to 1; can be used for progress-based rendering effects
    - `orbitScale`
        - type: `Float`
        - description: the scale of the default item orbit; it shrinks while a ritual is in progress
    - `orbitWaveAnchor`
        - type: `Float`
        - description: the angle in degrees where the wave of the default item orbit is anchored; it follows the player while idle and spins while a ritual is in progress
    - `lightAbove`
        - type: `Integer`
        - description: the packed light value above the altar; can be passed to render calls that require a light value
    - `initiator`
        - type: `ItemStack`
        - description: the initiator item stack from the altar inventory
    - `inputs`
        - type: `List<ItemStack>`
        - description: the input item stacks from the altar inventory for display
    - `initiatorRenderState`
        - type: `ItemStackRenderState`
        - description: the extracted render state of the initiator item; is empty if the altar has no initiator
    - `inputRenderStates`
        - type: `List<ItemStackRenderState>`
        - description: the extracted render states of the input items in the same order as `inputs`
    - `poseStack`
        - type: `PoseStack`
        - description: the pose stack for rendering; has a defensive push/pop to revert any transformations after the render method finishes
    - `submitNodeCollector`
        - type: `SubmitNodeCollector`
        - description: the collector for submitting render calls; can be used to submit custom render calls like text
- functions
    - `pushPose()`
        - description: pushes the current pose; should be used at the beginning of the render method to ensure transformations don't affect other renderers
    - `popPose()`
        - description: pops the current pose; should be used at the end of the render method to ensure transformations don't affect other renderers
    - `translate(float x, float y, float z)`
        - description: translates the pose stack by the specified amounts
    - `scale(float x, float y, float z)`
        - description: scales the pose stack by the specified x, y, z values
    - `scale(float scale)`
        - description: scales the pose stack uniformly by the specified scale
    - `mulPose(Quaternionf quaternion)`
        - description: multiplies the pose stack by the specified quaternion; used for rotations
    - `renderItem(ItemStackRenderState renderState)`
        - description: renders the specified item render state at the current pose
        - note: use this function with `initiatorRenderState` or `inputRenderStates`
    - `renderItem(ItemModelResolver itemModelResolver, ItemStack item)`
        - description: resolves the model of the specified item stack and renders it at the current pose
        - note: you can obtain the `ItemModelResolver` instance from the `AltarRenderer` parameter of the custom renderer

## Block Pattern

If you want to invoke special logic depending on the [block pattern](../recipe/block_patterns.md) defined in the recipe, you can obtain the block pattern condition from the recipe via `recipe.blockPattern()`. The function returns an `Optional` because a recipe doesn't need a block pattern.

The raw entries of the pattern use the default north orientation of the altar. If you defined queries for the pattern entries, you can use the `test(String query)` function of an entry to check whether it matches a query. If you need the offsets rotated to the actual orientation of the altar, use the `queryOffsets(Direction altarFacing, String query)` function of the pattern.

```js
// ... listener and other logic
let pattern = recipe.blockPattern().orElse(null)
if (pattern === null) return // recipe doesn't have a block pattern

pattern.rawEntries.forEach(entry => {
    if (!entry.test("container_blocks")) return
    // do something with the entries matching the "container_blocks" query
})

let altarFacing = context.level
    .getBlockState(context.altarPos)
    .getValue(BlockProperties.HORIZONTAL_FACING)
pattern.queryOffsets(altarFacing, "container_blocks").forEach(offset => {
    // do something with the rotated offsets of entries matching the "container_blocks" query
})
```

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `ritualRendererRegistration` event in a client script.

```js
SummoningRituals.ritualRendererRegistration(event => {
    // ...
})
```

After that, you can access the event properties and functions to implement your desired logic.

## Examples

### Basic

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
        context.renderItem(context.initiatorRenderState)

        // pop the pose to revert our transformations
        context.popPose()
    })
})
```

<video controls="controls" src="/img/custom_animation.mp4" />

### Default Animation

If you only want to add something to the default animation, you can call the default render method from your custom renderer. Make sure to apply the same transformations as the default renderer.

```js
SummoningRituals.ritualRendererRegistration(event => {
    event.register("kubejs:forbidden_ritual", (renderer, recipe, context) => {
        // render the default initiator and item orbit
        context.pushPose()
        context.translate(0.5, 0.8, 0.5)
        context.scale(0.5)
        renderer.renderInventoryContents(context)
        context.popPose()

        // render an additional item above the altar
        context.pushPose()
        context.translate(0.5, 2.5, 0.5)
        context.scale(0.5 + context.recipeProgressRatio * 0.5)
        context.renderItem(renderer.itemModelResolver, Item.of("minecraft:nether_star"))
        context.popPose()
    })
})
```

### Advanced

This example keeps the default animation and adds several custom elements on top of it. The input items are rendered in a helix that tightens and rises with the recipe progress, a Nether Star bobs above everything, and a text label shows information about the ritual. The text is submitted directly through the `submitNodeCollector`.

```js
const Axis = Java.loadClass("com.mojang.math.Axis")
const DisplayMode = Java.loadClass("net.minecraft.client.gui.Font$DisplayMode")

SummoningRituals.ritualRendererRegistration(event => {
    event.register("kubejs:forbidden_ritual", (renderer, recipe, context) => {
        const ratio = context.recipeProgressRatio
        const time = context.gameTime + context.partialTick

        // render the default initiator and item orbit
        context.pushPose()
        context.translate(0.5, 0.8, 0.5)
        context.scale(0.5)
        renderer.renderInventoryContents(context)
        context.popPose()

        // render the inputs in a helix that tightens and rises with the progress
        const inputStates = context.inputRenderStates
        const inputCount = inputStates.size()
        for (let i = 0; i < inputCount; i++) {
            context.pushPose()
            context.translate(0.5, 1.4 + i * 0.2 * ratio, 0.5)
            context.mulPose(Axis.YP.rotationDegrees(time * 6 + (i * 360) / inputCount))
            context.translate(0, 0, 0.4 + 1.2 * (1 - ratio))
            context.scale(0.35)
            context.renderItem(inputStates.get(i))
            context.popPose()
        }

        // render an arbitrary item bobbing above everything
        context.pushPose()
        context.translate(0.5, 2.6 + Math.sin(time / 8) * 0.15, 0.5)
        context.mulPose(Axis.YP.rotationDegrees(time * 4))
        context.scale(0.5 + ratio * 0.5)
        context.renderItem(renderer.itemModelResolver, Item.of("minecraft:nether_star"))
        context.popPose()

        // build a text label with information about the ritual
        let inputItems = 0
        context.inputs.forEach(stack => (inputItems += stack.getCount()))
        const altarInfo = context.altar ? "altar ok" : "altar missing"
        const progress = `${Math.round(ratio * 100)}% ${context.recipeProgress}/${context.recipeTime}`
        const label = Text.of(`${progress} | ${inputItems} items | ${altarInfo}`).getVisualOrderText()
        const font = Client.font

        // render the label facing the player through the submit node collector
        context.pushPose()
        context.translate(0.5, 3.3, 0.5)
        // same transformation as vanilla name tags: face the camera and flip the y-axis for text
        context.mulPose(Client.gameRenderer.mainCamera.rotation())
        context.scale(0.012, -0.012, 0.012)
        context.submitNodeCollector.submitText(
            context.poseStack,
            -font.width(label) / 2,
            0,
            label,
            false,
            DisplayMode.NORMAL,
            context.lightAbove,
            -1,
            0x40000000,
            0
        )
        context.popPose()
    })
})
```

<video controls="controls" src="/img/custom_animation_advanced.mp4" />
