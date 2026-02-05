# Recipe Basics

Oritech uses a base class for all its recipes. Each recipe type has different requirements and constraints it must follow. KubeJS Oritech
adds validation for all recipe types it adds support for ensuring you never accidentally create an invalid recipe. To assist you in
development, there are a lot of custom error messages that appear upon `/reload`ing or restarting the game.

## Overview

The base layout for each Oritech recipe is the following:

-   item inputs
    -   type: `List<Ingredient>`
    -   supports amounts: no
    -   default: empty list
    -   description: inputs can be specified by tags, items, or stacks; each entry can only ever have a count of 1
    -   primary access: `itemInputs(...)`
    -   aliases: `ingredients`, `inputs`, `itemInput`, `ingredient`, `input`
-   item outputs
    -   type: `List<ItemStack>`
    -   supports amounts: yes
    -   default: empty list
    -   description: outputs can be specified by items or stacks; a single input could produce multiple outputs
    -   primary access: `itemOutputs(...)`
    -   aliases: `results`, `outputs`, `itemOutput`, `result`, `output`
-   fluid input
    -   type: `FluidIngredient`
    -   supports amounts: yes
    -   default: `FluidIngredient.EMPTY` (nothing)
    -   description: this is a special type by Oritech, read more about it in the [dedicated section below](#fluid-ingredient)
    -   primary access: `fluidInputs(...)`
    -   aliases: `fluidIngredient`, `fluid`, `fluidInputs`, `fluidIngredient`, `fluids`
-   fluid outputs
    -   type: `List<FluidStack>`
    -   supports amounts: yes
    -   default: empty list
    -   description: outputs can be specified by fluids or fluid stacks; a single input could produce multiple outputs
    -   primary access: `fluidOutputs(...)`
    -   aliases: `fluidResults`, `fluidOutput`, `fluidResult`
-   time
    -   type: `Integer`
    -   default: 60
    -   description: Oritech uses this property for various purposes, read more about it in the [dedicated section below](#time)
    -   primary access: `time(...)`
    -   aliases: `ticks`, `timeInTicks`, `duration`
    -   helper accessors: `seconds`, `timeInSeconds`
        -   these helpers assign the passed amount multiplied by 20

All recipe types theoretically support all of these properties. However, because of slot limitations and logic, most recipes have
special constraints and make use of the time property in different ways. Some recipe only support items, some only fluids and some
accept both types in different ratios.

There is special handling to accept a single parameter when a list is required. This means instead of `itemOutputs(['cobblestone'])`, you
can also write `itemOutputs('cobblestone')`. However, when multiple entries are required, you **have** to pass them as an array
(with the `[]` brackets).

If you want to know more about the limitations and requirements for specific recipes, read the respective recipe page.

## Fluid Ingredient

`FluidIngredient` is a special type by Oritech. Usually, ingredients do not support amounts (also known as count). However, this custom
implementation does support it. A `FluidIngredient` can either refer to a fluid `TagKey` or a fluid.

A fluid tag groups multiple fluids in a simple entry. A built-in example for a fluid tag is `c:water`, which groups the still water and
the flowing water variant. Making use of this tag doesn't really make sense, but if multiple mods add the same liquid, you can cover
them all by making use of a tag.

The amount of a `FluidIngredient` is measured in millibuckets. 1000 millibuckets are one bucket. If the amount is not set, it will default
to `1000` millibuckets / 1 bucket.

KubeJS Oritech adds a custom component that supports the custom `FluidIngredient` by default. Conventional KubeJS ways to define fluids
and fluid ingredients are natively supported.

### Examples

The following examples show how an instance of a `FluidIngredient` can be obtained. The different syntaxes all result in the same output.

```
// 1 bucket of water
Fluid.of("water", 1000)
"1000x water"
"1000x minecraft:water"
"water"

// 2500 millibuckets / 2,5 buckets of lava
Fluid.of("lava", 2500)
"2500x lava"

// 1500 millibuckets / 1,5 buckets of all fluids contained in the water tag
Fluid.of("#c:water", 1500)
"1500x #c:water"
```

## Time

The time property is mostly used for defining how long a machine has to operate to finish a single recipe. However, because Oritech
uses the base recipe type for all of its recipes, it is often reused to define different data.

If the time is not specified, it defaults to `60`. Time is always measured in game ticks. 20 game ticks are one second in real life.
That means 60 ticks would be 3 seconds.

Sometimes, the time property is used to define how much energy is required to finish a certain recipes. You can read more about the
specific usages on each recipe page.
