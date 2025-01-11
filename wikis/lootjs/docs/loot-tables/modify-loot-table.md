# Modify your first loot table

Let's get started with modifying your first loot table. LootJS offers different functions you can use for that. You will be able to add, remove or even just change the weight of an item in the loot table. Before starting make sure to have a basic knowledge on how loot tables work, check out the [minecraft wiki](https://minecraft.wiki/w/Loot_table) for that.

First create a javascript file in `server_scripts` and you can call the file however you want but make sure the file extension will be `.js`, e.g `more_loot.js`.

We will use the `minecraft:chests/desert_pyramide` loot table as an example. You can see [here](https://misode.github.io/loot-table/?preset=chests/desert_pyramid) how the loot table is structured to get a better understanding of what we will.

## Add Item

Let's add a simple `apple` to our chest loot.

```js
LootJS.lootTables(event => {
    event.getLootTable("minecraft:chests/desert_pyramid").firstPool().addEntry("minecraft:apple")
})
```

Note that we use `firstPool()` here. We will use this a lot to always get the first loot pool. Most vanilla tables do have one pool which will roll multiple times, see `rolls`.

### With weight

But what if we want to add the apple with a specific weight? For this we can simply use [`LootEntry`](/api/loot-entry), which has the functionality to set the weight.

```js
LootJS.lootTables(event => {
    event
        .getLootTable("minecraft:chests/desert_pyramid")
        .firstPool()
        .addEntry(LootEntry.of("minecraft:apple").withWeight(20))
})
```

### Set quantity

Let's also change the quantity of the apple, so it will drop 2 - 5 apples each time an apple is rolled. We can use the [`setCount`](/api/loot-entry#setcount) function.

```js
LootJS.lootTables(event => {
    event
        .getLootTable("minecraft:chests/desert_pyramid")
        .firstPool()
        .addEntry(LootEntry.of("minecraft:apple").withWeight(20).setCount([2, 5]))
})
```

## Modify Item

Now we want to modify an existing entry inside our loot table. You can see that diamonds have a weight of 5, let's change it to 1 to make it less likely to be rolled.

```js
LootJS.lootTables(event => {
    event
        .getLootTable("minecraft:chests/desert_pyramid")
        .firstPool()
        .modifyItemEntry(itemEntry => {
            if (itemEntry.item.id === "minecraft:diamond") {
                itemEntry.setWeight(1)
            }

            return itemEntry
        })
})
```

You can see that we return `itemEntry` again. This is required because `modify` operations always require a result. In our example we just modify the given `itemEntry` and return it, this will ensure that all conditions and loot modifiers will still be applied for the entry. Alternative you can just return a new [`LootEntry`](/api/loot-entry) with the desired modifications.

## Remove Item

We also want to remove `minecraft:bone` from our desert pyramids loot table. `removeItem` takes an [ItemFilter](/api/item-filter) as an argument, in our case we just want to remove bones, so we can simply use the item id as argument.

```js
LootJS.lootTables(event => {
    event.getLootTable("minecraft:chests/desert_pyramid").firstPool().removeItem("minecraft:bone")
})
```
