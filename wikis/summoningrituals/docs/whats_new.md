# What's New

If you have used **Summoning Rituals** with Minecraft 1.21.1, most things work the same way in 26.1. The recipe builder, the bindings, and the server events are largely unchanged. However, Minecraft 26.1 introduced several technical changes that affect how scripts and datapacks are written.

> [!TIP] NOTE
> This page only covers the changes from Minecraft 1.21.1 to 26.1. If you are coming from Minecraft 1.20.1 or older, switch to the 1.21.1 docs with the version picker dropdown in the top-right of the header and read the What's New page there. It covers the rewrite of the mod that happened in 1.21.1.

## Players

Block pattern highlights no longer show up when automation only simulates inserting items into the altar.

## Developers

The biggest change affects custom ritual renderers. Minecraft 26.1 uses a new render pipeline where the game first extracts all data it needs to render and submits the actual render calls afterwards. The [ritual renderer registration](event/renderer.md) was adjusted to follow this pipeline:

- `renderer.itemRenderer` is now `renderer.itemModelResolver`
- `context.bufferSource` is now `context.submitNodeCollector`
- `context.packedOverlay` and `context.shouldReset()` were removed
- `context.altar` can be `null`; use `context.altarPos` if you only need the position
- `context.altarPos`, `context.orbitScale`, `context.orbitWaveAnchor`, `context.initiatorRenderState`, and `context.inputRenderStates` were added
- `renderer.renderInventoryContents(context)` was added to draw the default initiator and item orbit

KubeJS scripts are stricter now:

- [item outputs](recipe/outputs.md#item-outputs) and the display items of [fake entity inputs](recipe/inputs.md#fake-entity-inputs) reject empty items, for example when an item ID is misspelled
- [block patterns](recipe/block_patterns.md) reject unknown block tags

Minecraft also changed several data formats. Entity data, item components, and text components use the new vanilla formats. Check the [examples page](examples.md) to see how they look in 26.1. For datapack recipes, the following changed:

- the initiator uses the new vanilla ingredient format
- item inputs use `{ "ingredient": ..., "count": n }`
- time conditions (`minecraft:time_check`) need a `clock`

The [moon phase condition](recipe/conditions.md#moon-phase) now uses the vanilla moon phases. Because only the Overworld tracks moon phases, the condition always checks the moon phase of the Overworld, even if the altar is located in another dimension.

Lastly, Minecraft renamed `ResourceLocation` to `Identifier`. This affects the types of recipe IDs in events, but the usage in scripts stays the same.
