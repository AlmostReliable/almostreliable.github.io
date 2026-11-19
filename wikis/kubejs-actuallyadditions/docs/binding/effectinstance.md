# Effect Instance

The `EffectInstance` is a utility binding that allows you to easily create configured effects for [Coffee Ingredient recipes](../misc/coffeeingredient.md).

An effect ID like `"minecraft:speed"` or a [`MobEffect`](mobeffect.md) constant can be used as an effect as well. They use the default duration and amplifier. Use this binding when you need a different duration or amplifier.

## Overview

- access in server scripts via: `EffectInstance`
- properties:
    - `effect`
        - description: specifies the effect, either by its ID or as a [`MobEffect`](mobeffect.md) constant
        - type: `ResourceLocation | Holder<MobEffect>`
        - required: yes
    - `duration`
        - description: specifies the duration of the effect in **seconds**
        - type: `int`
        - required: no
        - default: `10`
    - `amplifier`
        - description: specifies the amplifier of the effect, `0` is level I
        - type: `int`
        - required: no
        - default: `0`
- methods:
    - `ofId(ResourceLocation effect, int duration, int amplifier)`
        - creates an effect from its ID with a custom duration and amplifier
    - `ofId(ResourceLocation effect, int duration)`
        - creates an effect from its ID with a custom duration (sets amplifier to 0)
    - `ofId(ResourceLocation effect)`
        - creates an effect from its ID (sets duration to 10 and amplifier to 0)
    - `ofEffect(Holder<MobEffect> effect, int duration, int amplifier)`
        - creates an effect from a [`MobEffect`](mobeffect.md) constant with a custom duration and amplifier
    - `ofEffect(Holder<MobEffect> effect, int duration)`
        - creates an effect from a [`MobEffect`](mobeffect.md) constant with a custom duration (sets amplifier to 0)
    - `ofEffect(Holder<MobEffect> effect)`
        - creates an effect from a [`MobEffect`](mobeffect.md) constant (sets duration to 10 and amplifier to 0)

## Examples

This binding is intended to be used inside [Coffee Ingredient recipes](../misc/coffeeingredient.md). Pass it to the `effects` parameter to define configured effects.

```js
ServerEvents.recipes(event => {
    // adds a coffee ingredient that gives Strength II for 60 seconds and Speed I for 30 seconds for a carrot
    event.recipes.actuallyadditions.coffee_ingredient("carrot", [
        EffectInstance.ofId("minecraft:strength", 60, 1),
        EffectInstance.ofEffect(MobEffect.MOVEMENT_SPEED, 30),
    ])
})
```
