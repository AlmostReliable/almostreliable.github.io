# Examples

## Machine Recipes

### Atomic Reconstructor

```js
ServerEvents.recipes(event => {
    // removes all laser recipes
    event.remove({ type: "actuallyadditions:laser" })

    // adds a recipe that laser-transforms a netherrack into a magma block
    // uses the default energy of 1000 Crystal Flux
    event.recipes.actuallyadditions.laser("magma_block", "netherrack")

    // adds a recipe that laser-transforms a brown mushroom into a red mushroom
    // uses 500 Crystal Flux as energy
    event.recipes.actuallyadditions.laser("minecraft:red_mushroom", "minecraft:brown_mushroom", 500)

    // adds a recipe that laser-transforms a brown mushroom into a red mushroom
    // uses a builder function to define the energy property
    event.recipes.actuallyadditions
        .laser("minecraft:red_mushroom", "minecraft:brown_mushroom")
        .energy(500)
})
```

### Crusher

```js
ServerEvents.recipes(event => {
    // removes all crusher recipes
    event.remove({ type: "actuallyadditions:crushing" })

    // adds a recipe that crushes a cobblestone into 2 gravel
    // uses the default chance of 100%
    // handles both gravel blocks as one output
    event.recipes.actuallyadditions.crushing("2x gravel", "cobblestone")

    // adds a recipe that crushes any stone into 2 gravel and a sand
    // uses the default chance of 100% for both outputs
    // handles the gravel as first output and the sand as second output
    event.recipes.actuallyadditions.crushing(["2x gravel", "sand"], "#c:stones")

    // adds a recipe that crushes a magma block into 2 netherrack and a magma cream
    // uses the default chance of 100% for the netherrack
    // uses the specified chance of 20% for the magma cream
    // handles the netherrack as first output and the magma cream as second output
    event.recipes.actuallyadditions.crushing(
        [Item.of("minecraft:netherrack", 2), CrushingResult.of("magma_cream", 0.2)],
        "minecraft:magma_block"
    )

    // should error because no output
    // event.recipes.actuallyadditions.crushing([], "minecraft:stone");

    // should error because more than two outputs
    // event.recipes.actuallyadditions.crushing(
    //     ["minecraft:stone", "minecraft:stone", "minecraft:stone"],
    //     "minecraft:stone"
    // );
})
```

### Empowerer

```js
ServerEvents.recipes(event => {
    // removes all empowerer recipes
    event.remove({ type: "actuallyadditions:empowering" })

    // adds a recipe that empowers a dirt block with 2 nether warts, a red mushroom and a brown mushroom as modifiers into 2 mycelium
    // uses the default energy of 1000 Crystal Flux
    // uses the default laser color of white (0xFFFF_FFFF)
    // uses the default time of 100 ticks (5 seconds) to process
    event.recipes.actuallyadditions.empowering(Item.of("minecraft:mycelium", 2), "dirt", [
        "nether_wart",
        "minecraft:red_mushroom",
        "nether_wart",
        "minecraft:brown_mushroom",
    ])

    // adds a recipe that empowers any stone with 4 magma cream modifiers into 4 magma blocks
    // uses 2000 Crystal Flux as energy
    // renders with red lasers
    // takes 60 ticks (3 seconds) to process
    event.recipes.actuallyadditions.empowering(
        "4x magma_block",
        "#c:stones",
        ["magma_cream", "magma_cream", "magma_cream", "magma_cream"],
        2000,
        Color.RED.argb,
        60
    )

    // adds a recipe that empowers any stone with 4 magma cream modifiers into 4 magma blocks
    // uses builder functions to define the properties
    event.recipes.actuallyadditions
        .empowering("4x magma_block", "#c:stones", [
            "magma_cream",
            "magma_cream",
            "magma_cream",
            "magma_cream",
        ])
        .energy(2000)
        .color(Color.RED.argb)
        .time(60)

    // should error because no modifiers
    // event.recipes.actuallyadditions.empowering("minecraft:stone", "minecraft:stone", []);

    // should error because more than four modifiers
    // event.recipes.actuallyadditions.empowering("minecraft:stone", "minecraft:stone", [
    //     "minecraft:stone",
    //     "minecraft:stone",
    //     "minecraft:stone",
    //     "minecraft:stone",
    //     "minecraft:stone",
    // ]);
})
```

### Fermenting Barrel

```js
ServerEvents.recipes(event => {
    // removes all fermenting recipes
    event.remove({ type: "actuallyadditions:fermenting" })

    // adds a recipe that ferments a bucket of lava into a bucket of water
    // uses the default time of 100 ticks (5 seconds) to process
    event.recipes.actuallyadditions.fermenting("water", "lava")

    // adds a recipe that ferments a 40 millibuckets of lava into a 20 millibuckets of water
    // takes 20 ticks (1 second) to process
    event.recipes.actuallyadditions.fermenting(Fluid.of("water", 20), Fluid.of("lava", 40), 20)

    // adds a recipe that ferments a 40 millibuckets of lava into a 20 millibuckets of water
    // uses a builder function to define the time property
    event.recipes.actuallyadditions.fermenting(Fluid.of("water", 20), Fluid.of("lava", 40)).time(20)

    // should error because no more than two buckets for result
    // event.recipes.actuallyadditions.fermenting(Fluid.of("water", 2100), "lava");

    // should error because no more than two buckets for ingredient
    // event.recipes.actuallyadditions.fermenting("water", Fluid.of("lava", 2100));
})
```

### Press

```js
ServerEvents.recipes(event => {
    // removes all press recipes
    event.remove({ type: "actuallyadditions:pressing" })

    // adds a recipe that presses any sapling into 250 millibuckets of water
    event.recipes.actuallyadditions.pressing(Fluid.of("water", 250), "#minecraft:saplings")

    // adds a recipe that presses a magma block into a bucket of lava
    event.recipes.actuallyadditions.pressing("lava", "magma_block")

    // should error because no more than two buckets for result
    // event.recipes.actuallyadditions.pressing(Fluid.of("water", 2100), "minecraft:stone");
})
```

## Misc Recipes

### Coffee Ingredients

```js
ServerEvents.recipes(event => {
    // removes all coffee ingredient recipes
    event.remove({ type: "actuallyadditions:coffee_ingredient" })

    // adds a recipe that produces a coffee with a strength effect from any sapling
    // uses the default effect duration of 10 seconds
    // uses the default effect amplifier of 0 (level 1)
    // uses the default maxAmplifier of 1
    // uses the default extraText of an empty string
    event.recipes.actuallyadditions.coffee_ingredient("minecraft:strength", "#minecraft:saplings")

    // adds a recipe that produces a coffee with a speed effect from a carrot
    // uses the MobEffect binding to define the effect
    // uses the default effect duration of 10 seconds
    // uses the default effect amplifier of 0 (level 1)
    // uses the default maxAmplifier of 1
    // uses the an extra text of "Carrot Edition"
    event.recipes.actuallyadditions.coffee_ingredient(
        MobEffect.MOVEMENT_SPEED,
        "carrot",
        3,
        "Carrot Edition"
    )

    // adds a recipe that produces a coffee 3 different effects from a potato
    // uses the EffectInstance binding to create configured effects
    // uses a mix of MobEffect binding and id effects
    // Haste 4 (30 seconds), Regeneration 1 (10 seconds), Strength 3 (1 minute)
    // uses builder functions to define the maxAmplifier and extraText properties
    event.recipes.actuallyadditions
        .coffee_ingredient(
            [
                EffectInstance.ofEffect(MobEffect.DIG_SPEED, 30, 3),
                EffectInstance.ofEffect(MobEffect.REGENERATION, 10),
                EffectInstance.ofId("minecraft:strength", 60, 2),
            ],
            "potato"
        )
        .maxAmplifier(2)
        .extraText("Multi Effect")
})
```

![](/../img/coffee-text.png)
![](/../img/coffee-multi-effect.png)

### Color Change

```js
ServerEvents.recipes(event => {
    // removes all color change recipes
    event.remove({ type: "actuallyadditions:color_change" })

    // adds a recipe that color-changes a stone into a diorite
    event.recipes.actuallyadditions.color_change("diorite", "stone")
})
```

### Liquid Fuel

```js
ServerEvents.recipes(event => {
    // removes all liquid fuel recipes
    event.remove({ type: "actuallyadditions:liquid_fuel" })

    // adds a recipe that generates energy from a bucket of lava
    // uses the default energy of 1000 Crystal Flux
    // uses the default time of 100 ticks (5 seconds) to process
    event.recipes.actuallyadditions.liquid_fuel("lava")

    // adds a recipe that generates energy from a 200 millibuckets of water
    // uses 2000 Crystal Flux as energy
    // takes 50 ticks (2,5 seconds) to process
    event.recipes.actuallyadditions.liquid_fuel(Fluid.of("water", 200), 2000, 50)

    // adds a recipe that generates energy from a 200 millibuckets of water
    // uses buidler functions to define the energy and time properties
    event.recipes.actuallyadditions.liquid_fuel(Fluid.of("water", 200)).energy(2000).time(50)

    // should error because no more than two buckets for fuel
    // event.recipes.actuallyadditions.liquid_fuel(Fluid.of("water", 2100));
})
```

### Mining Lens

```js
ServerEvents.recipes(event => {
    // removes all mining lens recipes
    event.remove({ type: "actuallyadditions:mining_lens" })

    // adds a recipe that converts any stone into diorite
    // uses the default weight of 10
    event.recipes.actuallyadditions.mining_lens("diorite", "#c:stones")

    // adds a recipe that converts coal ore into diamond ore
    // uses a weight of 200
    event.recipes.actuallyadditions.mining_lens("diamond_ore", "coal_ore", 200)

    // adds a recipe that converts coal ore into diamond ore
    // uses a builder function to define the weight property
    event.recipes.actuallyadditions.mining_lens("diamond_ore", "coal_ore").weight(200)
})
```

## Events

```js
ActuallyAdditionsEvents.empower(event => {
    // spawn a lightning bolt at the position of empowerer when the recipe finishes
    event.level.spawnLightning(event.pos.x, event.pos.y, event.pos.z, true)
})
```

<video controls="controls" src="/../img/empowerer-lightning.mp4" />
