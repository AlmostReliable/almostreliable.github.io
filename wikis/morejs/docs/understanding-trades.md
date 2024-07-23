# Understanding villager trades

In Minecraft the concept of villager trades is separated into a `trade` and an `offer`. 
Offers are what the user sees in the trading UI when interacting with a villager. It contains information about the costs and the output of the offer. 

Offers are generated from a trade, this also means that a trade may not have information about the sold items. One example is the enchanted book trade, it contains the costs in emeralds and what enchantments are possible. 

Offer generation is triggered when a villager gets a profession or level up. For wanderer trades this happens on spawn. 

From a technical standpoint a trade is just a function `(villager, level) => MerchantOffer`. This means that modded trades have a chance that they can't be filtered by MoreJS. 
