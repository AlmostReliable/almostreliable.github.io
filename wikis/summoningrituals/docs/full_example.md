# Full Example

This page shows a full example of a very complex altar recipe with all available functions. This example only shows how it looks when you combine the logic described on all other pages. It won't explain any concepts. For that, please read the [usage for developers page](usage_for_developers.md) and navigate from there.

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("#c:ingots")
        .itemInputs([
            "2x cobblestone",
            Item.of("stone", 4),
            Ingredient.of("dirt", 2),
            "#c:glass_blocks",
            "3x #c:ingots/iron",
        ])
        .entityInputs([
            "3x minecraft:elder_guardian",
            "phantom",
            "minecraft:wither",
            SummoningEntity.input("2x silverfish"),
            SummoningEntity.input("cat", 3).tooltip("Meow"),
            SummoningEntity.input("zombie")
                .data({
                    HandItems: [
                        {
                            id: "minecraft:diamond_sword",
                            Count: 1,
                            tag: { ench: [{ id: 16, lvl: 1 }] },
                        },
                    ],
                })
                .tooltip("Needs any sword")
                .validator(e => e.mainHandItem.id.contains("sword")),
        ])
        .itemOutputs([
            "3x carrot",
            Item.of("iron_sword"),
            Item.of("potato", 4),
            SummoningItem.of("3x diamond"),
            SummoningItem.of("emerald", 6).offset([1, 2, 2]).spread([4, 2, 4]),
        ])
        .entityOutputs([
            "bat",
            SummoningEntity.output("fox", 3),
            SummoningEntity.output("2x blaze")
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
                .tooltip("Has a Sword"),
            SummoningEntity.output("ghast").offset([1, 2, 2]).spread([4, 2, 4]),
        ])
        .commands(["say Hi", "/say Hello"], ["Broadcasts a greeting!"], false)
        .sacrificeZone([3, 3, 3])
        .conditions(conditions =>
            conditions
                .biomes(["minecraft:plains", "minecraft:desert"])
                .blockBelow("furnace", { lit: true })
                .dimension("minecraft:overworld")
                .facing(Direction.NORTH)
                .height(0, 30)
                .minLightLevel(5)
                .setOpenSky(false)
                .setSmoked(true)
                .structures("#minecraft:mineshaft")
                .time(SummoningTime.NIGHT)
                .setWaterlogged(true)
                .weather(w => w.setThundering(true))
        )
        .id("kubejs:forbidden_ritual")
})

SummoningRituals.start(event => {
    const { level, pos, recipeInfo, player } = event

    // check for a specific recipe
    if (recipeInfo.recipeId.toString() !== "kubejs:forbidden_ritual") {
        return
    }

    // cancel the ritual if one of the entity inputs has less than their max health
    for (let entity of recipeInfo.inputEntities) {
        if (entity.health < entity.maxHealth) {
            if (player) {
                player.tell("Ritual cancelled: Entity health too low")
            }
            event.cancel()
        }
    }
})

SummoningRituals.complete(event => {
    const { level, pos, recipeInfo, player } = event

    // check for a specific recipe
    if (recipeInfo.recipeId.toString() !== "kubejs:forbidden_ritual") {
        return
    }

    // if an item output is a sword, enchant it with sharpness 3
    for (let itemEntity of recipeInfo.outputItems) {
        if (itemEntity.item.id.contains("sword")) {
            itemEntity.item.enchant("minecraft:sharpness", 3)
        }
    }
})
```

![](/../img/recipe.png)
![](/../img/initiator.png)
![](/../img/cat_tooltip.png)
![](/../img/zombie_tooltip.png)
![](/../img/blaze_tooltip.png)
![](/../img/commands.png)
![](/../img/conditions.png)
