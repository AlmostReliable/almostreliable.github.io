```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("stick")
        .itemInputs(["cobblestone", "#c:glass_blocks", "3x #c:ingots"])
        .entityInputs([
            "3x minecraft:elder_guardian",
            "phantom",
            "silverfish",
            "3x cow",
            "minecraft:wither",
            SummoningEntity.input("cat").tooltip("Meow"),
        ])
        .itemOutputs([
            "apple",
            "carrot",
            SummoningItem.of("3x diamond"),
            SummoningItem.of("emerald").offset([1, 2, 2]).spread([4, 2, 4]),
        ])
        .entityOutputs([
            "bat",
            "ender_dragon",
            "4x creeper",
            SummoningEntity.output("fox", 2),
            SummoningEntity.output("blaze", 2)
                .data({
                    Health: 50,
                    Attributes: [{ Name: "generic.max_health", Base: 50 }],
                })
                .offset([1, 2, 2])
                .tooltip([Text.of("50 health").aqua()]),
            SummoningEntity.output("zombie", 3)
                .data({
                    HandItems: [
                        {
                            id: "minecraft:diamond_sword",
                            Count: 1,
                            tag: { ench: [{ id: 16, lvl: 1 }] },
                        },
                    ],
                })
                .tooltip("Has Sword lol"),
            SummoningEntity.output("ghast")
                .offset([1, 2, 2])
                .spread([4, 2, 4])
                .data({
                    Health: 50,
                    Attributes: [{ Name: "generic.max_health", Base: 50 }],
                }),
        ])
        .commands(["say Hi", "/say Hello"]) // doesn't matter if with slash or not
        .sacrificeZone([3, 3, 3])
        .conditions(conditions =>
            conditions
                .biomes(["minecraft:plains", "minecraft:desert"])
                .dimension("minecraft:overworld")
                .maxHeight(30)
                .setOpenSky(true)
                .structures("#minecraft:mineshaft")
                .time("night")
                .weather(w => w.setThundering(true))
        )
})
```
