# Coffee Ingredient

Coffee Ingredient recipes define which items can be added to coffee in the Coffee Maker and which effects they give.

## Effects

Each ingredient can give any number of effects. An effect consists of the effect itself, a duration, and an amplifier. The duration is measured in **seconds**, not ticks. The amplifier starts at `0`, which is level I.

Effects can be passed in different ways:

- as an effect ID like `"minecraft:speed"`, which uses a duration of 10 seconds and an amplifier of 0
- as a constant of the [`MobEffect` binding](../binding/mobeffect.md) like `MobEffect.MOVEMENT_SPEED`, which uses the same defaults
- as a configured effect of the [`EffectInstance` binding](../binding/effectinstance.md) to set the duration and amplifier

Adding the same ingredient to a coffee multiple times raises the level of its effects. Each additional ingredient raises the amplifier of an effect by the amplifier of that effect, or by 1 for effects with an amplifier of 0. This only happens while the level of the effect is below the max amplifier. For effects with an amplifier of 0, the max amplifier is the highest level they can reach. With a max amplifier of 3, three carrots can raise Speed up to level III. JEI shows this value as "Max Amount". The durations don't add up, and an ingredient is only used up when it adds or raises an effect, so a fourth carrot stays in the Coffee Maker.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.coffee_ingredient`
- properties:
    - `ingredient`
        - description: specifies the item that can be added to coffee
        - type: `Ingredient`
        - role: input
        - required: yes
        - usage: needs to be passed as the first argument
    - `effects`
        - description: specifies the effects the ingredient gives
        - type: `<EffectInstance | MobEffect | ResourceLocation>[]`
        - role: other
        - required: no
        - default: empty list
        - usage: can be passed as the second argument
    - `max_amplifier`
        - description: specifies up to which level adding the ingredient multiple times raises its effects, more information [above](#effects)
        - type: `int`
        - role: other
        - required: no
        - default: `1`
        - usage: can be passed as the third argument or by chaining the function `.maxAmplifier(int)`
    - `extra_text`
        - description: specifies an extra text that is shown as "Special Feature" in JEI
        - type: `string`
        - role: other
        - required: no
        - default: empty string
        - usage: can be passed as the fourth argument or by chaining the function `.extraText(string)`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all coffee ingredient recipes
    event.remove({ type: "actuallyadditions:coffee_ingredient" })

    // adds a coffee ingredient without any effects for any wool
    event.recipes.actuallyadditions.coffee_ingredient("#minecraft:wool")

    // adds a coffee ingredient that gives Strength I for 10 seconds for any sapling
    // uses the default duration of 10 seconds and the default amplifier of 0 (level I)
    // uses the default max amplifier of 1
    event.recipes.actuallyadditions.coffee_ingredient("#minecraft:saplings", ["minecraft:strength"])

    // adds a coffee ingredient that gives Speed for a carrot
    // uses the MobEffect binding to define the effect
    // uses a max amplifier of 3, adding more carrots raises the level up to Speed III
    // shows "Carrot Edition" as special feature in JEI
    event.recipes.actuallyadditions.coffee_ingredient(
        "carrot",
        [MobEffect.MOVEMENT_SPEED],
        3,
        "Carrot Edition"
    )

    // adds a coffee ingredient that gives 3 different effects for a potato
    // uses the EffectInstance binding to create configured effects
    // Haste IV (30 seconds), Regeneration I (10 seconds), Strength III (60 seconds)
    // uses chaining functions for max amplifier and extra text
    event.recipes.actuallyadditions
        .coffee_ingredient("potato", [
            EffectInstance.ofEffect(MobEffect.DIG_SPEED, 30, 3),
            EffectInstance.ofEffect(MobEffect.REGENERATION),
            EffectInstance.ofId("minecraft:strength", 60, 2),
        ])
        .maxAmplifier(2)
        .extraText("Multi Effect")
})
```

The carrot and potato recipes in JEI:

![](/../img/coffee-text.png)
![](/../img/coffee-multi-effect.png)
