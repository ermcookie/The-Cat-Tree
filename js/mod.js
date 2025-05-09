let modInfo = {
	name: "ermcookie's Cat Tree",
	author: "ermcookie",
	pointsName: "fish",
	modFiles: ["layers.js", "tree.js"],

	discordName: "ermcookie's stuff",
	discordLink: "https://discord.gg/PNuyTFGpzv",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3",
	name: "mao :3",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added 4 layers.<br>
		- Added upgrades.
	<h3>v0.2</h3><br>
		- Added 1 layer.<br>
		- Added upgrades.
	<h3>v0.3</h3><br>
        - Added 10 achievements
 		- Added blackhole reset.<br>
		- Added 1 blackhole milestone.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("c",11)) gain = gain.times(2)
	if (hasUpgrade("c",12))	gain = gain.times(4)
	if (hasUpgrade("c",13)) gain = gain.pow(1.4)
	if (hasUpgrade("a",12)) gain = gain.pow(1.2)	
	if (hasUpgrade("cs",11)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",12)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",13)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",14)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",21)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",22)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",23)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",24)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",31)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",32)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",33)) gain = gain.pow(1.5)
	if (hasUpgrade("cs",34)) gain = gain.pow(1.5)
	if (hasMilestone("b",0)) gain = gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}