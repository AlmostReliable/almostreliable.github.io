# Player Enchant

## Intro

Event gets called when the player enchants an item through the enchanting table. The event is `cancelable`.

Usable through `MoreJS.playerEnchant((event) => {...})`

## Methods

-   `getEnchantments()`
-   `getEnchantmentIds()`
-   `getRequiredLevel()`
    -   The required level is the minimum level the player needs to have to be able to enchant the item
-   `getPosition()`
-   `getItem()`
-   `getSecondItem()`
-   `getLevel()`
-   `getPlayer()`

## Usage

```js
MoreJS.playerEnchant((event) => {
    const player = event.player
    const rl = event.requiredLevel

    player.tell(
        `Player enchanted '${event.item.id} on level ${rl} and ${event.enchantments.size()}x Enchantments`
    )
    player.tell(`Enchantments: ${event.enchantments}`)
})
```

```js
MoreJS.playerEnchant((event) => {
    if (event.item.id === "minecraft:netherite_pickaxe") {
        event.player.tell("You can't enchant Netherite Pickaxes! Oops!");
        event.cancel();
    }
})
```
