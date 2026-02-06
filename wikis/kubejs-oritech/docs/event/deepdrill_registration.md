# Deep Drill Registration Event

This event is a utility event to allow registering new materials and recipes mined by the
[Bedrock Extractor](../recipe/machine/bedrock_extractor.md) also known as the Deep Drill. Because the deep drill mechanic depends on a
recipe and a tag, this event handles both of these registrations at the same time.

If you prefer registering both of these separately, check out the Bedrock Extractor recipe page and the
[tag documentation](tags.md#resource-nodes).

**It is a server event and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

Oritech uses the tag `oritech:resource_nodes` to determine which blocks can be mined from by the Bedrock Extractor. The item result
is determined by a recipe. This event allows you to register new resource nodes and recipes for the Bedrock Extractor at the same time.

-   access in a server script via: `EnderIOEvents.deepDrillRegistration`
-   functions
    -   `add(...)`
        -   description: registers the input block as resource node and adds the recipe for the Bedrock Extractor
        -   parameters:
            -   `inputBlock`
                -   type: `Block`
                -   required: yes
                -   description: the block that should be mined as a resource node; this block will be tagged with `oritech:resource_nodes` automatically
            -   `outputItem`
                -   type: `ItemStack`
                -   required: yes
                -   description: the item that should be the result of mining the resource node; can include count
            -   `time`
                -   type: `Integer`
                -   required: no
                -   default: `60`
                -   description: time in ticks for a single extraction operation; can mine multiple ores at once occasionally
            -   `id`
                -   type: `ResourceLocation`
                -   required: yes
                -   description: the recipe ID for the recipe; this must be unique

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `deepDrillRegistration` event in a server script.

```js
EnderIOEvents.deepDrillRegistration(event => {
    // ...
})
```

After that, you can use the `add` function to register new resource nodes and recipes.

## Example

```js
OritechEvents.soulCollection(event => {
    // registers the glass block as a resource node
    // adds a recipe that converts a glass block into a cobblestone
    // defaults to 60 ticks / 3 seconds
    event.add("glass", "cobblestone", "mymodpack:deep_drill/cobblestone")

    // registers the dirt block as a resource node
    // adds a recipe that converts a dirt block into 4 iron ingots
    // requires 100 ticks / 5 seconds
    event.add("dirt", "4x iron_ingot", 100, "mymodpack:deep_drill/iron_ingot")
})
```
