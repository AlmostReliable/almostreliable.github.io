# Full Example

This page shows a full example of a very complex altar recipe with all available functions. This example only shows how it looks when you combine the logic described on all other pages. It won't explain any concepts. For that, please read the [usage for developers page](usage_for_developers.md) and navigate from there.

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
                    attributes: [{ id: "generic.max_health", base: 50 }],
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
                    attributes: [{ id: "generic.max_health", base: 50 }],
                }),
        ])
        .commands(["say Foo", "/say Bar"])
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
