# Sag Mill Bonus

The `SagMillBonus` is a utility binding that allows you to define the `BonusType` for [Sag Mill recipes](../machine/sagmill.md).

A `BonusType` specifies the behavior of Grinding Balls in Sag Mill recipes.

## Overview

-   access via: `SagMillBonus`
-   values:
    -   `SagMillBonus.NONE`
        -   no multiplier is applied, the recipe will always output the defined outputs with the specified chances
    -   `SagMillBonus.CHANCE_ONLY`
        -   only the bonus multiplier of the Grinding Ball is applied, the output count remains unchanged
    -   `SagMillBonus.MULTIPLY_OUTPUT`
        -   the output multiplier and the bonus multiplier of the Grinding Ball are applied

## Examples

This binding is intended to be used inside [Sag Mill recipes](../machine/sagmill.md). Pass it to the `bonus` parameter to define the bonus type of the recipe.
It's also possible to use the strings `"NONE"`, `"CHANCE_ONLY"`, and `"MULTIPLY_OUTPUT"` instead of the binding.

```js
//...
.bonus(SagMillBonus.MULTIPLY_OUTPUT)
//...

//...
.bonus("CHANCE_ONLY")
//...
```
