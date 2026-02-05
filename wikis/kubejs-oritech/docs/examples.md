# Examples

While the wiki is being worked on, this page shows available features in a very basic way.

## Recipes

```js
ServerEvents.recipes(event => {
    // pulverizer
    event.remove({ type: "oritech:pulverizer" })
    event.recipes.oritech
        .pulverizer()
        .itemInputs("#c:ingots")
        .itemOutputs(["6x cobblestone", "2x stone"])
        .time(20)

    // grinder aka fragment forge
    event.remove({ type: "oritech:grinder" })
    event.recipes.oritech
        .grinder()
        .itemInputs("#c:ingots")
        .itemOutputs(["6x cobblestone", "2x stone", "3x apple"])
        .time(40)

    // assembler
    event.remove({ type: "oritech:assembler" })
    event.recipes.oritech
        .assembler()
        .itemInputs(["#c:ingots", "#c:dusts", "potato", "golden_carrot"])
        .itemOutputs("4x cobblestone")
        .time(40)

    // refinery
    event.remove({ type: "oritech:refinery" })
    event.recipes.oritech
        .refinery()
        .itemInputs(["#c:ingots"])
        .itemOutputs(["4x cobblestone"])
        .fluidInput("500x #c:water")
        .fluidOutputs(["1500x lava", "lava", Fluid.of("water", 2500)])
        .time(40)

    // foundry
    event.remove({ type: "oritech:foundry" })
    event.recipes.oritech
        .foundry()
        .itemInputs(["#c:ingots", "glass"])
        .itemOutputs(["4x cobblestone"])
        .time(40)

    // centrifuge
    event.remove({ type: "oritech:centrifuge" })
    event.recipes.oritech
        .centrifuge()
        .itemInputs(["glass"])
        .itemOutputs(["4x cobblestone", "sand"])
        .time(40)

    // centrifuge fluid
    // in theory, you could add all normal centrifuge recipes here again so you don't need two different centrifuges
    // one with fluid add-on, one without
    event.remove({ type: "oritech:centrifuge_fluid" })
    event.recipes.oritech
        .centrifuge_fluid()
        .itemInputs(["glass"])
        .itemOutputs(["4x cobblestone", "sand"])
        .time(40)
    event.recipes.oritech
        .centrifuge_fluid()
        .fluidInputs("water")
        .itemOutputs(["4x cobblestone", "sand"])
        .time(40)
    event.recipes.oritech.centrifuge_fluid().fluidInputs("water").fluidOutputs(["2000x lava"]).time(40)
    event.recipes.oritech
        .centrifuge_fluid()
        .itemInputs(["#c:ingots"])
        .fluidInputs("#c:water")
        .itemOutputs(["4x apple", "dirt"])
        .fluidOutputs(["lava"])
        .time(40)

    // atomic forge
    // left, top, bottom
    // machine can't store energy, time defines how much energy is required (depending on config setting)
    event.remove({ type: "oritech:atomic_forge" })
    event.recipes.oritech
        .atomic_forge()
        .itemInputs(["potato"])
        .itemOutputs(["4x cobblestone"])
        .time(40)
    event.recipes.oritech
        .atomic_forge()
        .itemInputs(["glass", "sand"])
        .itemOutputs(["4x cobblestone"])
        .time(40)
    event.recipes.oritech
        .atomic_forge()
        .itemInputs(["#c:ingots", "apple", "carrot"])
        .itemOutputs(["4x cobblestone"])
        .time(60)

    // bio generator
    event.remove({ type: "oritech:bio_generator" })
    event.recipes.oritech.bio_generator().itemInputs(["glass"]).time(400)

    // fuel generator
    // doesn't support water to avoid mixups with boiler
    // the screen has item slots but they are ignored for the fuel generation
    event.remove({ type: "oritech:fuel_generator" })
    event.recipes.oritech.fuel_generator().fluidInput("water").time(400)

    // lava generator
    // doesn't support water to avoid mixups with boiler
    // the screen has item slots but they are ignored for the lava generation
    event.remove({ type: "oritech:lava_generator" })
    event.recipes.oritech.lava_generator().fluidInput("lava").time(400)

    // deep drill aka bedrock extractor
    // block tag needed for resource blocks
    // drill needs to be rebuilt after changing the tag
    event.remove({ type: "oritech:deep_drill" })
    event.recipes.oritech.deep_drill().itemInputs(["glass"]).itemOutputs("2x cobblestone").time(200)

    // particle collision aka particle accelerator
    // time specifies the energy needed for collision in Jules
    event.remove({ type: "oritech:particle_collision" })
    event.recipes.oritech
        .particle_collision()
        .itemInputs(["#c:ingots", "glass"])
        .itemOutputs("2x cobblestone")
        .time(200)

    // cooler aka industrial chiller
    event.remove({ type: "oritech:cooler" })
    event.recipes.oritech.cooler().fluidInput("2000x water").itemOutputs("2x cobblestone").time(40)

    // reactor aka nuclear reactor
    event.remove({ type: "oritech:reactor" })
    event.recipes.oritech.reactor().itemInput("cobblestone").time(40)

    // laser aka enderic laser
    event.remove({ type: "oritech:laser" })
    event.recipes.oritech.laser().itemInput("cobblestone").itemOutput("5x glass").time(40)
})

ServerEvents.tags("block", event => {
    // needed so the bedrock extractor extracts resources from the block
    event.add("oritech:resource_nodes", "glass")

    // needed for the schroedingers safe (unstable container)
    // low 0.3, medium 1, high 5
    event.add("oritech:unstable_container/high", "glass")

    // exclude mobs from mob spawning by the oritech spawner
    event.add("oritech:spawner_blacklist")

    // laser order
    // 1. try to fill the target with energy
    // 2. try to accelerate the block (more random tick calls)
    // 3. pass through check
    // 4. block breaking
    // let a laser pass through a block
    event.add("oritech:laser_passthrough", "cobblestone")
    // let a laser accelerate a block
    event.add("oritech:laser_accelerated", "cactus")
    // let a laser break a block faster
    // initial speed depends on the blocks hardness (resistance)
    event.add("oritech:laser_fast_break", "obsidian")

    // excludes a block from being sucked into a black hole
    event.add("oritech:blackhole_blacklist", "bedrock")
})
```

## Events

```js
OritechEvents.soulCollection(event => {
    let { level, position, blockEntity, entity } = event

    // this happens when it's a soul flower
    // let the soul flower always pass
    if (entity == null) return

    // grab the max health of the entity that died
    let maxHealth = entity.maxHealth

    // pigs, cows, sheep have 10 max health, chicken has 4
    if (maxHealth > 9) {
        // give two souls for entities with more than 9 max health
        event.setSoulValue(2)
    } else if (maxHealth < 5) {
        // enable rain and don't give any souls for entities with less than 5 max health
        level.levelData.setRaining(true)
        event.cancel()
    }
})
```
