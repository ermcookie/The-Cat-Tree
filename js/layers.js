addLayer("c", {
    name: "Cats", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: ":3", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "money", // Name of prestige currency
    baseResource: "fish", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("p",12)) mult = mult.times(2)
        if(hasUpgrade("pl",11)) mult = mult.times(1.5)
        if(hasUpgrade("pl",12)) mult = mult.times(2)
        if(hasUpgrade("pl",13)) mult = mult.times(2.5)
        if(hasUpgrade("pl",14)) mult = mult.times(3)
        if(hasUpgrade("pl",21)) mult = mult.times(3.5)
        if(hasUpgrade("pl",22)) mult = mult.times(4)
        if(hasUpgrade("pl",23)) mult = mult.times(4.5)
        if(hasUpgrade("pl",24)) mult = mult.times(5)
        if (hasUpgrade("p",13) && player["c"].points.neq(0)) mult = mult.add(upgradeEffect("p",13))
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
    branches:["c","p"],
    passiveGeneration(){return hasUpgrade("p",11)},
    upgrades:{
        11:{
            title:"cat food",
            description:"buy cat food<br> x2 fish gain",
            cost: new Decimal(5)
        },
        12:{
            title:"cat toys",
            description:"they love the boxes<br> x4 fish gain",
            cost:new Decimal(10),
            unlocked(){return hasUpgrade("c",11)}
        },
        13:{
            title:"businesscats",
            description:"stonks<br> ^1.4 fish gain",
            cost:new Decimal(25),
            unlocked(){return hasUpgrade("c",12)}
        },
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
    color: "#7F9411",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "money", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("a",13)) mult = mult.times(player["c"].points).div(100)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("ac",24)},
    branches:["p","a"],
    passiveGeneration(){return hasUpgrade("a",11)},
    upgrades:{
        11:{
            title:"premium cat food",
            description:"fancy cat food<br>passive money generation",
            cost: new Decimal(1)
        },
        12:{
            title:"fancy cat toys",
            description:"they (still) love the boxes<br> x2 money gain",
            cost:new Decimal(2),
            unlocked(){return hasUpgrade("p",11)}
        },
        13:{
            title:"meow robots",
            description:"boop beep",
            cost:new Decimal(3),
            unlocked(){return hasUpgrade("p",12)},
            effect(){return player["c"].points.pow(0.3)},
            effectDisplay() { return format(this.effect())+"x moneys" }, // Add formatting to the effect
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
    color: "#00003B",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "ascended tuna", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player["p"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade("pl",11)) mult = mult.times(1.5)
        if(hasUpgrade("pl",12)) mult = mult.times(2)
        if(hasUpgrade("pl",13)) mult = mult.times(2.5)
        if(hasUpgrade("pl",14)) mult = mult.times(3)
        if(hasUpgrade("pl",21)) mult = mult.times(3.5)
        if(hasUpgrade("pl",22)) mult = mult.times(4)
        if(hasUpgrade("pl",23)) mult = mult.times(4.5)
        if(hasUpgrade("pl",24)) mult = mult.times(5)
    
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for Ascended tuna", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("ac",22)},
    branches:["a","cs","pl"],
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
addLayer("cs", {
    name: "Constellations", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0000FF",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "stars", // Name of prestige currency
    baseResource: "ascended tuna", // Name of resource prestige is based on
    baseAmount() {return player["a"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for stars", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("ac",23)},
    infoboxes: {
        lore: {
            title: "layer effect",
            body() { return "each constellation gives you ^1.5 gain" },
        },
    },
    upgrades:{
        11:{
            title:"aries",
            cost: new Decimal(10),
        },
        12:{
            title:"taurus",
            cost:new Decimal(20),
        },
        13:{
            title:"gemini",
            cost:new Decimal(30),
        },
        14:{
            title:"cancer",
            cost:new Decimal(40),
        },
        21:{
            title:"leo",
            cost:new Decimal(50),
        },
        22:{
            title:"virgo",
            cost:new Decimal(60),
        },
        23:{
            title:"libra",
            cost:new Decimal(70),
        },
        24:{
            title:"scorpio",
            cost:new Decimal(80),
        },
        31:{
            title:"sagittarius",
            cost:new Decimal(90),
        },
        32:{
            title:"capricorn",
            cost:new Decimal(100),
            },
        33:{
            title:"aquarius",
            cost:new Decimal(110),
        },
        34:{
            title:"pisces",
            cost:new Decimal(120),
        },
    },
})
addLayer("pl", {
    name: "planets", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Pl", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00003B",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "planets", // Name of prestige currency
    baseResource: "ascended tuna", // Name of resource prestige is based on
    baseAmount() {return player["a"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "p: Reset for planets", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasAchievement("ac",31)},
    upgrades:{
        11:{
            title:"mercury",
            description:"x1.5 money gain",
            cost: new Decimal(1),
        },
        12:{
            title:"venus",
            description:"x2 money gain",
            cost: new Decimal(2),
        },
        13:{
            title:"earth",
            description:"x2.5 money gain",
            cost: new Decimal(3),
        },
        14:{
            title:"mars",
            description:"x3 money gain",
            cost: new Decimal(4),
        },
        21:{
            title:"jupiter",
            description:"x3.5 money gain",
            cost: new Decimal(5),
        },
        22:{
            title:"saturn",
            description:"x4 money gain",
            cost: new Decimal(6),
        },
        23:{
            title:"uranus",
            description:"x4.5 money gain",
            cost: new Decimal(7),
        },
        24:{
            title:"neptune",
            description:"x5 money gain",
            cost: new Decimal(8),
        },
    }
})

addLayer("b", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "grey",
    resource: "universes", 
    baseResource: "fish",
    requires: new Decimal(1e100),
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent:2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    baseAmount() {return player.points}, // Get the current amount of baseResource
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Blackhole")
    },
    hotkeys: [
        {key: "u", description: "u: Reset for universes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    milestones: {
        0: {
            requirementDescription: "the end?",
            effectDescription: "2x point gain",
            done() { return player[this.layer].points.gte(1) }
        }
    },
      
},
)
addLayer("ac", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "yellow",
    resource: "achievements", 
    row: "side",
    tooltip() { // Optional, tooltip displays when the layer is locked
        return ("Achievements")
    },
    achievementPopups: true,
    achievements: {
        11: {
            name: "what da tuna",
            done() {return (player["c"].points.neq(0) || hasAchievement("ac",11))}, // This one is a freebie
            doneTooltip: "You did it!", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        12: {
            name: "you know what that means",
            done() {return (player.points.greaterThan(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        13: {
            name: "yippee",
            done() {return (player["p"].points.equals(1) || hasAchievement("ac",13))}, // This one is a freebie
            doneTooltip: "yay!!", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        14: {
            name: "nice",
            done() {return (player["c"].points.equals(69) || hasAchievement("ac",14))}, // This one is a freebie
            doneTooltip: ";)", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        21: {
            name: "h4xx0r",
            done() {return (player.points.greaterThanOrEqualTo(1337) || hasAchievement("ac",21))}, // This one is a freebie
            doneTooltip: "im in", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        22: {
            name: "the honoured one",
            done() {return (hasUpgrade("p",13) || hasAchievement("ac",22))}, // This one is a freebie
            doneTooltip: "go/jo", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        23: {
            name: "the sun is a deadly laser!",
            done() {return (hasUpgrade("pl",24) || hasAchievement("ac",23))}, // This one is a freebie
            doneTooltip: ":fire:", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        24: {
            name: "O-O",
            done() {return (player["c"].points.equals(50) || hasAchievement("ac",24))}, // This one is a freebie
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
            doneTooltip: "BOTTOM TEXT", // Showed when the achievement is completed
        },
        31: {
            name: "planetarium",
            done() {return (hasUpgrade("a",13) || hasAchievement("ac",12))}, // This one is a freebie
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        32: {
            name: "NOT",
            done() {return (player["b"].points.gte(1) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "hehe", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
      /*  33: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        34: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        41: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        42: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        43: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        44: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        51: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        52: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        53: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        54: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        61: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        62: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        63: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        64: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        71: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        72: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        73: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        74: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        81: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        82: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        83: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        84: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        91: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        92: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        93: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        94: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        101: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        102: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        103: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        104: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        111: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        112: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        113: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        114: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        121: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        122: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        123: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        124: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        131: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        132: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        133: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        134: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        141: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        142: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        143: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        144: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        151: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        152: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        153: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        154: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        161: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        162: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        163: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        164: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        171: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        172: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        173: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        174: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        181: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        182: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        183: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        184: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        191: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        192: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        193: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        194: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        201: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        202: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        203: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        204: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        211: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        212: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        213: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        214: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        221: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        222: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        223: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        224: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        231: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        232: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        233: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        234: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        241: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        242: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        243: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        244: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        251: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        252: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        253: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        },
        254: {
            name: "you know what that means",
            done() {return (player.points.equals(1000) || hasAchievement("ac",12))}, // This one is a freebie
            doneTooltip: "fish", // Showed when the achievement is completed
            onComplete(){player["ac"].points = player["ac"].points.add(1)},
        }, */
        
    },
   
},
)