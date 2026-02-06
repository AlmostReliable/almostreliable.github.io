# Tag Events

Oritech allows to control different behaviors via tags. You can use the built-in KubeJS tag events to modify these tags. This page will
give you an overview of the different tags Oritech uses and how to modify them.

**These are server events and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Blacklists

Oritech uses different block tags to determine which blocks should be excluded by different mechanics.

### Black Hole

Tagging a block is required if you want to prevent the Black Hole from sucking in a block. By default, a Block Hole can even suck
in Bedrock.

```js
ServerEvents.tags("block", event => {
    // assigns the black hole blacklist block tag to the bedrock block
    event.add("oritech:blackhole_blacklist", "bedrock")
})
```

### Spawner

Tagging an entity is required if you want to prevent a mob spawner from spawning a certain entity.

```js
ServerEvents.tags("entity_type", event => {
    // assigns the spawner blacklist entity tag to the creeper entity type
    event.add("oritech:spawner_blacklist", "minecraft:creeper")
})
```

## Laser

The [Enderic Laser](../recipe/machine/enderic_laser.md) uses different block tags to determine which blocks to charge, break, or
accelerate. The laser operates in a special check order, which means that if a block is tagged with multiple of these tags, only the
first one will apply. The check order is as follows:

1. try to fill the target with energy
2. try to accelerate the target block (more random tick calls)
3. try to pass through the target block
4. break the block

There is an additional special tag that allows the laser to break specific blocks even faster. The break speed is determined by the
hardness/resistance of a block by default.

```js
ServerEvents.tags("block", event => {
    // let a laser accelerate the growth of the cactus block
    event.add("oritech:laser_accelerated", "cactus")
    // let a laser pass through a cobblestone (not breaking it)
    event.add("oritech:laser_passthrough", "cobblestone")
    // let a laser break a obsidian faster
    event.add("oritech:laser_fast_break", "obsidian")
})
```

## Resource Nodes

> [!DANGER] WARNING
> Because the functionality of the Bedrock Extractor relies on a recipe **and** a tag, it is highly recommended to use the
> [dedicated event](deepdrill_registration.md) for registering new recipes and resource nodes.

Oritech uses the block tag `oritech:resource_nodes` to determine which blocks can be used as resource nodes for the
[Bedrock Extractor](../recipe/machine/bedrock_extractor.md). Tagging a block is required if it's used as an input for the
extractor recipe.

```js
ServerEvents.tags("block", event => {
    // assigns the resource node block tag to the glass block
    event.add("oritech:resource_nodes", "glass")
    // assigns the resource node block tag to the cobblestone block
    event.add("oritech:resource_nodes", "minecraft:cobblestone")
})
```

## Schrödinger's Safe

Oritech uses a variation of the `oritech:unstable_container` block tag to determine how much energy capacity is reached when a block
is captured inside the unstable container. There are 3 different levels of instability, which are determined by the following tags:

-   `oritech:unstable_container/low` -> 0.3
-   `oritech:unstable_container/medium` -> 1.0
-   `oritech:unstable_container/high` -> 5.0

Assigning these tags is also required to capture a block inside of the safe.

```js
ServerEvents.tags("block", event => {
    // assigns the low instability container block tag to the glass block
    event.add("oritech:unstable_container/low", "glass")
    // assigns the medium instability container block tag to the cobblestone block
    event.add("oritech:unstable_container/medium", "minecraft:cobblestone")
})
```
