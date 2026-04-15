# Examples

This page shows some examples of a altar recipes with most available functions. They only shows how it looks when you combine the logic described on other pages. It won't explain any concepts. For that, please read the [usage for developers page](usage_for_developers.md) and navigate from there.

## KubeJS

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
        .fakeEntityInputs(
            SummoningEntity.fakeInput(
                `minecraft:iron_ingot[custom_name='{"color":"gold","text":"Special Mob"}',lore=['{"color":"gray","text":"Checks for a custom entity."}']]`,
                1,
                entity => {
                    return entity.type === "minecraft:pig"
                }
            )
        )
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
        .displayOutputs(["diamond"])
        .commands(["say Hi", "/say Hello"], ["Broadcasts a greeting!"], false)
        .sacrificeZone([3, 3, 3])
        .blockPattern(pattern =>
            pattern
                .name(Text.of("Test-Pattern").darkRed())
                .tooltip(["- line 1", Text.of("- line 2").aqua()])
                .block([0, 0, 2], "furnace", { facing: "north" })
                .block([-2, 0, 0], "furnace", { facing: "east" })
                .block([0, 0, -2], "furnace", { facing: "south" })
                .block([2, 0, 0], "furnace", { facing: "west" })
        )
        .blockPatternExtension(pattern => pattern.block([-2, 0, -2], "cobblestone"))
        .conditions(conditions =>
            conditions
                .biomes(["minecraft:plains", "minecraft:desert"])
                .dimension("minecraft:overworld")
                .facing(Direction.NORTH)
                .height(0, 30)
                .minLightLevel(5)
                .setOpenSky(false)
                .setSmoked(true)
                .structures("#minecraft:mineshaft")
                .time(SummoningTime.NIGHT)
                .moonPhase("full_moon")
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
        if (player) {
            player.tell("Ritual cancelled: Entity health too low")
        }
        event.cancel()
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

    // retrieve info if block pattern extension matched
    let extensionMatched = recipeInfo.blockPatternExtensionMatched
    if (extensionMatched) {
        // if it matched, enable rain
        level.levelData.setRaining(true)
    }
})
```

## Datapack

```json
{
    "type": "summoningrituals:altar",
    "initiator": { "tag": "c:ingots" },
    "item_outputs": [
        { "item": { "id": "minecraft:carrot", "count": 3 } },
        { "item": { "id": "minecraft:iron_sword", "count": 1 } },
        { "item": { "id": "minecraft:potato", "count": 4 } },
        { "item": { "id": "minecraft:diamond", "count": 3 } },
        { "item": { "id": "minecraft:emerald", "count": 6 }, "offset": [1, 2, 2], "spread": [4, 2, 4] }
    ],
    "entity_outputs": [
        { "entity": { "id": "minecraft:bat" } },
        { "entity": { "id": "minecraft:fox", "count": 3 } },
        {
            "entity": {
                "id": "minecraft:blaze",
                "count": 2,
                "data": {
                    "Health": 50.0,
                    "attributes": [{ "id": "generic.max_health", "base": 50.0 }]
                },
                "tooltip": [{ "text": "50 health", "color": "aqua" }]
            },
            "offset": [1, 2, 2]
        },
        {
            "entity": {
                "id": "minecraft:zombie",
                "count": 3,
                "data": {
                    "HandItems": [
                        {
                            "id": "minecraft:diamond_sword",
                            "Count": 1.0,
                            "tag": { "ench": [{ "id": 16.0, "lvl": 1.0 }] }
                        }
                    ]
                },
                "tooltip": ["Has a Sword"]
            }
        },
        { "entity": { "id": "minecraft:ghast" }, "offset": [1, 2, 2], "spread": [4, 2, 4] }
    ],
    "commands": {
        "commands": ["say Hi", "say Hello"],
        "tooltip": ["Broadcasts a greeting!"],
        "requires_player": false
    },
    "display_outputs": [{ "id": "minecraft:diamond", "count": 1 }],
    "item_inputs": [
        { "item": "minecraft:cobblestone", "count": 2 },
        { "item": "minecraft:stone", "count": 4 },
        { "item": "minecraft:dirt", "count": 2 },
        { "tag": "c:glass_blocks", "count": 1 },
        { "tag": "c:ingots/iron", "count": 3 }
    ],
    "entity_inputs": [
        { "entity": { "id": "minecraft:elder_guardian", "count": 3 } },
        { "entity": { "id": "minecraft:phantom" } },
        { "entity": { "id": "minecraft:wither" } },
        { "entity": { "id": "minecraft:silverfish", "count": 2 } },
        { "entity": { "id": "minecraft:cat", "count": 3, "tooltip": ["Meow"] } },
        {
            "entity": {
                "id": "minecraft:zombie",
                "data": {
                    "HandItems": [
                        {
                            "id": "minecraft:diamond_sword",
                            "Count": 1.0,
                            "tag": { "ench": [{ "id": 16.0, "lvl": 1.0 }] }
                        }
                    ]
                },
                "tooltip": ["Needs any sword"]
            }
        }
    ],
    "fake_entity_inputs": [
        {
            "item": {
                "id": "minecraft:iron_ingot",
                "count": 1,
                "components": {
                    "minecraft:custom_name": "{\"color\":\"gold\",\"text\":\"Special Mob\"}",
                    "minecraft:lore": ["{\"color\":\"gray\",\"text\":\"Checks for a custom entity.\"}"]
                }
            },
            "count": 1
        }
    ],
    "block_pattern": {
        "entries": [
            {
                "offset": [-2, 0, 0],
                "predicate": { "blocks": "minecraft:furnace", "properties": { "facing": "east" } }
            },
            {
                "offset": [0, 0, -2],
                "predicate": { "blocks": "minecraft:furnace", "properties": { "facing": "south" } }
            },
            {
                "offset": [0, 0, 2],
                "predicate": { "blocks": "minecraft:furnace", "properties": { "facing": "north" } }
            },
            {
                "offset": [2, 0, 0],
                "predicate": { "blocks": "minecraft:furnace", "properties": { "facing": "west" } }
            }
        ],
        "name": { "text": "Test-Pattern", "color": "dark_red" },
        "tooltip": ["- line 1", { "text": "- line 2", "color": "aqua" }]
    },
    "block_pattern_extension": {
        "entries": [{ "offset": [-2, 0, -2], "predicate": { "blocks": "minecraft:cobblestone" } }]
    },
    "zone": [3, 3, 3],
    "conditions": [
        {
            "period": 24000,
            "value": { "min": 12000.0, "max": 24000.0 },
            "condition": "minecraft:time_check"
        },
        { "moon_phase": 0, "condition": "summoningrituals:moon_phase" },
        { "thundering": true, "condition": "minecraft:weather_check" },
        {
            "predicate": {
                "can_see_sky": false,
                "smokey": true,
                "light": { "light": { "min": 5 } },
                "position": { "y": { "min": 0.0, "max": 30.0 } },
                "biomes": ["minecraft:plains", "minecraft:desert"],
                "structures": "#minecraft:mineshaft",
                "dimension": "minecraft:overworld"
            },
            "condition": "minecraft:location_check"
        },
        {
            "properties": { "waterlogged": "true", "facing": "north" },
            "condition": "summoningrituals:block_tag_block_state"
        }
    ]
}
```
