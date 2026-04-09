# Summoning Entity

`SummoningEntity` is a utility binding that allows you to easily create complex instances of `EntityInput`s, `FakeEntityInput`s and `EntityOutput`s via the `EntityInputBuilder` and `EntityOutputBuilder`. The builders offer functionality to add tooltips, offset and spread values, as well as NBT to entities, which is otherwise not possible if you only provide a simple [entity input](../recipe/inputs.md#entity-inputs) or [entity output](../recipe/outputs.md#entity-outputs) instance.

## Overview

-   access in recipes event via: `SummoningEntity`
-   functions:
    -   `input(EntityInfo entity)`
        -   creates an `EntityInputBuilder` with the specified `EntityInfo`
    -   `input(Holder<EntityType<?>> entity, Integer count)`
        -   creates an `EntityInputBuilder` with the specified entity and the specified count
    -   `fakeInput(ItemStack displayItem, Integer count, Predicate<Entity> validator)`
        -   creates a `FakeEntityInput` with the specified display item, count, and validator
        -   the count defines the amount of entities that have to pass the validator for the input to be valid
    -   `output(EntityInfo entity)`
        -   creates an `EntityOutputBuilder` with the specified `EntityInfo`
    -   `output(Holder<EntityType<?>> entity, Integer count)`
        -   creates an `EntityOutputBuilder` with the specified entity and the specified count

```js
SummoningEntity.input("pig")
SummoningEntity.input("5x minecraft:ghast")
SummoningEntity.input("minecraft:fox", 3)

SummoningEntity.fakeInput("minecraft:diamond", 5, e => e.isBaby())

SummoningEntity.output("cow")
SummoningEntity.output("3x sheep")
SummoningEntity.output("iron_golem", 2)
```

## Entity Input Builder

After obtaining the `EntityInputBuilder` instance through the binding, you can chain additional functions to it. It is not required to finish the builder because the `entityInputs` function also accepts builder instances.

-   properties:
    -   `entity`
        -   description: specifies the input entity; defined via the binding function to obtain the builder
        -   type: `Holder<EntityType<?>>`
        -   required: yes
    -   `count`
        -   description: specifies the count of the input entity; defined via the binding function to obtain the builder
        -   type: `Integer`
        -   required: no
        -   default: `1`
    -   `data`
        -   description: specifies the data (NBT) of the input entity; only used for rendering
        -   type: `CompoundTag` (JsonObject)
        -   required: no
        -   default: empty
    -   `tooltip`
        -   description: specifies additional tooltip lines shown in recipe viewer pages
        -   type: `List<Component>`
        -   required: no
        -   default: empty list
    -   `validator`
        -   description: specifies the validator function to check the entity data (NBT)
        -   type: `Predicate<Entity>`
        -   required: no
        -   default: always `true`
-   functions:
    -   `data(CompoundTag data)`
        -   assigns the given NBT data to the `EntityInput`
    -   `tooltip(List<Component> tooltip)`
        -   assigns the given tooltip lines to the `EntityInput`
    -   `validator(Predicate<Entity> validator)`
        -   assigns the given validator to the `EntityInput`

> [!TIP] What is a validator?
> You might ask why a custom `validator` is required if `data` is already provided. For inputs, the `data` property is only used for rendering purposes in recipe viewers. If you give an entity a sword via the `data` property, it will be displayed on the recipe viewer page, but it won't check whether the entity actually has a sword when being sacrificed.
>
> **Why is that?<br>**
> Because vanilla Minecraft only checks entity data (NBT) for exact matches, there is no way to always cover all desired functionality. If you want to ensure that an entity has at least 10 HP, this wouldn't be possible because Minecraft would check only for the exact value. That's why you have to use a custom validator with your own logic to check whether the respective values are correct.

```js
.entityInputs([
    SummoningEntity.input("cat", 3).tooltip("Meow"),  // [!code focus:13]
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
        .validator((e) => e.mainHandItem.id.contains("sword")),
])
```

## Entity Output Builder

After obtaining the `EntityOutputBuilder` instance through the binding, you can chain additional functions to it. It is not required to finish the builder because the `entityOutputs` function also accepts builder instances.

-   properties:
    -   `entity`
        -   description: specifies the output entity; defined via the binding function to obtain the builder
        -   type: `Holder<EntityType<?>>`
        -   required: yes
    -   `count`
        -   description: specifies the count of the output entity; defined via the binding function to obtain the builder
        -   type: `Integer`
        -   required: no
        -   default: `1`
    -   `data`
        -   description: specifies the data (NBT) of the output entity
        -   type: `CompoundTag` (JsonObject)
        -   required: no
        -   default: empty
    -   `tooltip`
        -   description: specifies additional tooltip lines shown in recipe viewer pages
        -   type: `List<Component>`
        -   required: no
        -   default: empty list
    -   `offset`
        -   description: specifies the offset from the altar block where the output entity is spawned
        -   type: `BlockPos`
        -   required: no
        -   default: `[0, 2, 0]`
    -   `spread`
        -   description: specifies the spread of the output entities; output entities are spawned at different positions within the spread area; a single entity can spawn at a position before a new random position is calculated
        -   type: `BlockPos`
        -   required: no
        -   default: `[1, 0, 1]`
-   functions:
    -   `data(CompoundTag data)`
        -   assigns the given NBT data to the `EntityOutput`
    -   `tooltip(List<Component> tooltip)`
        -   assigns the given tooltip lines to the `EntityOutput`
    -   `offset(BlockPos offset)`
        -   assigns the given offset to the `EntityOutput`
    -   `spread(BlockPos spread)`
        -   assigns the given spread to the `EntityOutput`

```js
.entityOutputs([
    SummoningEntity.output("5x creeper").tooltip("Kaboom"), // [!code focus:18]
    SummoningEntity.output("skeleton", 2)
        .data({
            HandItems: [
            {
                id: "minecraft:diamond_sword",
                Count: 1,
                tag: { ench: [{ id: 16, lvl: 1 }] },
            },
            ],
        }),
    SummoningEntity.output("6x sheep")
        .offset([1, 2, 2])
        .spread([4, 2, 4])
        .data({
          Health: 50,
          attributes: [{ id: "generic.max_health", base: 50 }],
        }),
])
```
