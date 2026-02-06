# Bedrock Extractor

Internally, this machine is called the Deep Drill.

The Bedrock Extractor can mine ores from resource nodes that act as infinite sources of ores. These are usually found at Bedrock level.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.deep_drill`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits: exactly 1
    -   item outputs
        -   role: output
        -   required: yes
        -   limits: exactly 1
    -   time
        -   role: misc
        -   required: no
        -   default: `60`
        -   description: time in ticks for a single extraction operation; can mine multiple ores at once occasionally

## Tagging

The recipes only define which resource node results in which items. In order for the Bedrock Extractor to detect a block as a resource
node, the block tag `oritech:resource_nodes` must be assigned to the input block.

Once the block tag and the recipe have been set up, the Bedrock Extractor needs to be rebuilt in order to detect the new resource node.

Read more about tags and how to assign them in the [tags event documentation](../../event/tags.md#resource-nodes).

## Examples

```js
ServerEvents.recipes(event => {
    // removes all bedrock extractor / deep drill recipes
    event.remove({ type: "oritech:deep_drill" })

    // adds a recipe that converts a glass block into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech.deep_drill().itemInputs("glass").itemOutputs("iron_ingot")

    // adds a recipe that converts a cobblestone block into 2 sand
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .deep_drill()
        .itemInputs("minecraft:cobblestone")
        .itemOutputs("2x sand")
        .time(40)
})
```
