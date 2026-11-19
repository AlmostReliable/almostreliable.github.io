# Mob Effect

The `MobEffect` is a utility binding that gives access to all vanilla effects. It can be used to define effects for [Coffee Ingredient recipes](../misc/coffeeingredient.md), either directly or through the [`EffectInstance`](effectinstance.md) binding.

The constants use the field names of the Minecraft code, which differ from the effect IDs for some effects. For effects added by other mods, use the effect ID instead.

## Overview

- access in server scripts via: `MobEffect`
- values:

| Constant                        | Effect ID                       |
| ------------------------------- | ------------------------------- |
| `MobEffect.MOVEMENT_SPEED`      | `minecraft:speed`               |
| `MobEffect.MOVEMENT_SLOWDOWN`   | `minecraft:slowness`            |
| `MobEffect.DIG_SPEED`           | `minecraft:haste`               |
| `MobEffect.DIG_SLOWDOWN`        | `minecraft:mining_fatigue`      |
| `MobEffect.DAMAGE_BOOST`        | `minecraft:strength`            |
| `MobEffect.HEAL`                | `minecraft:instant_health`      |
| `MobEffect.HARM`                | `minecraft:instant_damage`      |
| `MobEffect.JUMP`                | `minecraft:jump_boost`          |
| `MobEffect.CONFUSION`           | `minecraft:nausea`              |
| `MobEffect.REGENERATION`        | `minecraft:regeneration`        |
| `MobEffect.DAMAGE_RESISTANCE`   | `minecraft:resistance`          |
| `MobEffect.FIRE_RESISTANCE`     | `minecraft:fire_resistance`     |
| `MobEffect.WATER_BREATHING`     | `minecraft:water_breathing`     |
| `MobEffect.INVISIBILITY`        | `minecraft:invisibility`        |
| `MobEffect.BLINDNESS`           | `minecraft:blindness`           |
| `MobEffect.NIGHT_VISION`        | `minecraft:night_vision`        |
| `MobEffect.HUNGER`              | `minecraft:hunger`              |
| `MobEffect.WEAKNESS`            | `minecraft:weakness`            |
| `MobEffect.POISON`              | `minecraft:poison`              |
| `MobEffect.WITHER`              | `minecraft:wither`              |
| `MobEffect.HEALTH_BOOST`        | `minecraft:health_boost`        |
| `MobEffect.ABSORPTION`          | `minecraft:absorption`          |
| `MobEffect.SATURATION`          | `minecraft:saturation`          |
| `MobEffect.GLOWING`             | `minecraft:glowing`             |
| `MobEffect.LEVITATION`          | `minecraft:levitation`          |
| `MobEffect.LUCK`                | `minecraft:luck`                |
| `MobEffect.UNLUCK`              | `minecraft:unluck`              |
| `MobEffect.SLOW_FALLING`        | `minecraft:slow_falling`        |
| `MobEffect.CONDUIT_POWER`       | `minecraft:conduit_power`       |
| `MobEffect.DOLPHINS_GRACE`      | `minecraft:dolphins_grace`      |
| `MobEffect.BAD_OMEN`            | `minecraft:bad_omen`            |
| `MobEffect.HERO_OF_THE_VILLAGE` | `minecraft:hero_of_the_village` |
| `MobEffect.DARKNESS`            | `minecraft:darkness`            |
| `MobEffect.TRIAL_OMEN`          | `minecraft:trial_omen`          |
| `MobEffect.RAID_OMEN`           | `minecraft:raid_omen`           |
| `MobEffect.WIND_CHARGED`        | `minecraft:wind_charged`        |
| `MobEffect.WEAVING`             | `minecraft:weaving`             |
| `MobEffect.OOZING`              | `minecraft:oozing`              |
| `MobEffect.INFESTED`            | `minecraft:infested`            |

## Examples

This binding is intended to be used inside [Coffee Ingredient recipes](../misc/coffeeingredient.md). Pass it to the `effects` parameter directly to use the default duration of 10 seconds and amplifier of 0, or pass it to the [`EffectInstance`](effectinstance.md) binding to configure the effect.

```js
ServerEvents.recipes(event => {
    // adds a coffee ingredient that gives Haste I and Regeneration I for 10 seconds for a potato
    event.recipes.actuallyadditions.coffee_ingredient("potato", [
        MobEffect.DIG_SPEED,
        MobEffect.REGENERATION,
    ])

    // adds a coffee ingredient that gives Night Vision I for 120 seconds for a golden carrot
    event.recipes.actuallyadditions.coffee_ingredient("golden_carrot", [
        EffectInstance.ofEffect(MobEffect.NIGHT_VISION, 120),
    ])
})
```
