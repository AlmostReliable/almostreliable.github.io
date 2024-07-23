# Wanderer Trades

## Intro

Basic event to modify villager trades. Make sure to understand the difference between a trade and an actual offer, you can read it [here](/understanding-trades)

Event can be used by using `MoreJS.wandererTrades((event) => {...})`

## Methods

-   `.addTrade(level: number, input: Item | Item[], output: Item)`
-   `.addTrade(level: number, trade: Trade)`
-   `.addCustomTrade(level: number, (offer, entity, random) => {})`
-   `.removeTrade(filter: TradeFilter)`
    - Allows better control over trade removal. See [example](#tradefilter) for usage.
-   `.removeVanillaTypedTrades(level: number | Range)`
-   `.removeVanillaTypedTrades()`
-   `.removeModdedTypedTrades(level: number | Range)`
-   `.removeModdedTypedTrades()`

## Usage

The usage is nearly identical to the [villager trades](#villager-trades) events. Just use `MoreJS.wandererTrades` as event with the methods listed in this section. So don't use any professions here.
