addLayer("c", {
    name: "Cats", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: ":3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "money", // Name of prestige currency
    baseResource: "fish", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("p",11)) mult = mult.times(2)
        if (hasUpgrade("p",11)) mult = mult.add(player["c"].points).pow(0.3)
    
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for money", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    autoPrestige(){return hasUpgrade("p",13)},
    upgrades:{
        11:{
            title:"cat food",
            description:"buy cat food",
            cost: new Decimal(5)
        },
        12:{
            title:"cat toys",
            description:"they love the boxes",
            cost:new Decimal(10),
            unlocked(){return hasUpgrade("c",11)}
        },
        13:{
            title:"businesscats",
            description:"stonks",
            cost:new Decimal(25),
            unlocked(){return hasUpgrade("c",12)}
        }
    }
})
addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("a",11)) mult = mult.times(player["c"].points).div(100)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    autoPrestige(){return hasUpgrade("a",13)},
    upgrades:{
        11:{
            title:"premium cat food",
            description:"fancy cat food",
            cost: new Decimal(1)
        },
        12:{
            title:"fancy cat toys",
            description:"they (still) love the boxes",
            cost:new Decimal(2),
            unlocked(){return hasUpgrade("p",11)}
        },
        13:{
            title:"meow robots",
            description:"boop beep",
            cost:new Decimal(3),
            unlocked(){return hasUpgrade("p",12)}
        }
    }
})
addLayer("a", {
    name: "Ascension", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "ascended tuna", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player["p"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades:{
        11:{
            title:"midas cat",
            description:"yummy golden tuna",
            cost: new Decimal(1),
        },
        12:{
            title:"antimatter toys",
            description:"antimatter cats love them",
            cost:new Decimal(2),
            unlocked(){return hasUpgrade("a",11)}
        },
        13:{
            title:"ascended robots",
            description:"beep boop!",
            cost:new Decimal(3),
            unlocked(){return hasUpgrade("a",12)}
        }
    }
})