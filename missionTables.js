var seed = 1;

function randomDave() {
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

var roll = function() {
	return Math.floor((randomDave() * 100000) % 6 + 1);
};

var complication = function(c, d){
	var that = this;
	
	this.complication = c;
	this.complicationDescription = d;

	this.print = function() {
		debug(String.format(cellTemplate, "Complication", that.complication));
		debug(String.format(cellTemplate, "Complication Description", that.complicationDescription));
	};
};

var misfortune = function(b, c, d){
	var that = this;
	
	this.crewmember = b;0
	this.misfortune = c;
	this.misfortuneDescription = d;

	this.print = function() {
		debug(String.format(headerTemplate, "Misfortune: " + that.crewmember));
		debug(String.format(cellTemplate, "Misfortune", that.misfortune));
		debug(String.format(cellTemplate, "Misfortune Description", that.misfortuneDescription));
	};
};

var landMisfortune = function(c, d){
	var that = this;
	
	this.misfortune = c;
	this.misfortuneDescription = d;

	this.print = function() {
		debug(String.format(headerTemplate, "Land Misfortune"));
		debug(String.format(cellTemplate, "Misfortune", that.misfortune));
		debug(String.format(cellTemplate, "Misfortune Description", that.misfortuneDescription));
	};
};

var mission = function(t, m, d, c, b, e) {
	var that = this;

	this.target = t;
	this.missionType = m;
	this.destination = d;
	this.numComplications = c;
	this.baseReward = b;
	this.extraReward = e;

	this.employer = "";
	this.reward = "";

	this.mission = "";
	this.description = "";

	this.location = "";
	this.locationDescription = "";

	this.complications = [];
	this.addComplication = function(comp) {
		that.complications.push(comp);
	};
	
	this.print = function() {
		debug(String.format(headerTemplate, "Mission: " + that.target));
		debug(String.format(cellTemplate, "Type", that.missionType));
		debug(String.format(cellTemplate, "Destination", that.destination));
		debug(String.format(cellTemplate, "Base Reward", that.baseReward));
		debug(String.format(cellTemplate, "Extra Reward", that.extraReward));
		debug(String.format(cellTemplate, "Employer", that.employer));
		debug(String.format(cellTemplate, "Reward", that.reward));
		debug(String.format(cellTemplate, "Mission", that.mission));
		debug(String.format(cellTemplate, "Mission Description", that.description));
		debug(String.format(cellTemplate, "Location", that.location));
		debug(String.format(cellTemplate, "Location Description", that.locationDescription));
//		debug(String.format(cellTemplate, "# Complications", that.numComplications));
		$.each(that.complications, function(c,i){
			debug(String.format(cellTemplate, "Complication", this.complication));
			debug(String.format(cellTemplate, "Complication Description", this.complicationDescription));			
		});
	};
}

// Table 18
var missionType = function(target) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
	case "14":
	case "15":
		return new mission(target, "Routine", "Within System", 0, roll(), 0);
	case "16":
	case "21":
	case "22":
	case "23":
		return new mission(target, "Routine", "Within System", 1, roll() + 2, 0);
	case "24":
	case "25":
		return new mission(target, "Easy", "Within System", 0, roll() + roll(), 0);
	case "26":
	case "31":
		return new mission(target, "Easy", "Within System", 1, roll() + roll(), 1);
	case "32":
	case "33":
		return new mission(target, "Easy", "Within System", 1, roll() + roll() + 2, 1);
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		return new mission(target, "Normal", "Within System", 1, roll() + roll()
				+ roll(), 0);
	case "44":
	case "45":
		return new mission(target, "Normal", "Nearby System", 1, roll() + roll()
				+ roll(), 0);
	case "46":
	case "51":
		return new mission(target, "Normal", "Nearby System", 1, roll() + roll()
				+ roll(), 1);
	case "52":
	case "53":
		return new mission(target, "Normal", "Nearby System", 1, roll() + roll()
				+ roll() + 2, 1);
	case "54":
		return new mission(target, "Normal", "Faraway System", 1, roll() + roll()
				+ roll() + 4, 0);
	case "55":
		return new mission(target, "Normal", "Faraway System", 1, roll() + roll()
				+ roll() + 4, 1);
	case "56":
	case "61":
		return new mission(target, "Difficult", "Within System", 2, roll() + roll()
				+ roll() + roll(), 1);
	case "62":
	case "63":
		return new mission(target, "Difficult", "Nearby System", 2, roll() + roll()
				+ roll() + roll() + 2, 0);
	case "64":
		return new mission(target, "Difficult", "Nearby System", 2, roll() + roll()
				+ roll() + roll() + 2, 1);
	case "65":
		return new mission(target, "Difficult", "Faraway System", 2, roll() + roll()
				+ roll() + roll() + roll(), 1);
	case "66":
		return new mission(target, "Difficult", "Faraway System", 3, roll() + roll()
				+ roll() + roll() + roll() + 4, 2);
	}
	;
}

// Table 19
var employerAgents = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.employer = "Judicator";
		break;
	case "14":
	case "15":
	case "16":
		m.employer = "Guard";
		break;
	case "21":
	case "22":
	case "23":
		m.employer = "Intelligence Agency";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		m.employer = "Patron";
		break;
	case "44":
	case "45":
	case "46":
		m.employer = "Factionary";
		break;
	case "51":
	case "52":
	case "53":
		m.employer = "Merchant";
		break;
	case "54":
	case "55":
	case "56":
		m.employer = "Diplomat";
		break;
	case "61":
	case "62":
	case "63":
		m.employer = "Military";
		break;
	case "64":
	case "65":
	case "66":
		m.employer = "Criminal";
		break;
	}
};

// Table 20
var rewardsAgents = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.reward = "New Contract";
		break;
	case "14":
	case "15":
	case "16":
		m.reward = "Favor";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
		m.reward = "Birr";
		break;
	case "51":
	case "52":
	case "53":
	case "54":
	case "55":
	case "56":
		m.reward = "Gear";
		break;
	case "61":
	case "62":
	case "63":
		m.reward = "Ship Module";
		break;
	case "64":
	case "65":
	case "66":
		m.reward = "License";
		break;
	}
};

// Table 21
var missionAgents = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.mission = "Infiltration";
		m.description = "Undercover infiltration of a base, smaller group or outpost to obtain data, identify leaders or investigate the organization";
		break;
	case "14":
	case "15":
	case "16":
		m.mission = "Information gathering";
		m.description = "Gather information from tags, library databases, networks, old scrolls or a living person.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.mission = "Espionage";
		m.description = "Classic espionage with secret meetings, shadowing, burglaries and undercover work.";
		break;
	case "31":
	case "32":
	case "33":
		m.mission = "Kidnapping";
		m.description = "Kidnap someone and deliver the person to the employer.";
		break;
	case "34":
	case "35":
	case "36":
		m.mission = "Couriers";
		m.description = "Make sure sensitive information, resources or goods are delivered safely from the employer to the receiver.";
		break;
	case "41":
	case "42":
	case "43":
		m.mission = "Protection";
		m.description = "Make sure a resource (information, person, object, ship) is safe from an attack or for a specified amount of time.";
		break;
	case "44":
	case "45":
	case "46":
		m.mission = "Manipulation";
		m.description = "Trick a person or organization into believing false information, or make them perform a certain action, or set a chain of events in motion.";
		break;
	case "51":
	case "52":
	case "53":
		m.mission = "Artifact collection";
		m.description = "Acquire an artifact, usually from an unknown, underground location.";
		break;
	case "54":
	case "55":
	case "56":
		m.mission = "Rescue operation";
		m.description = "Rescue a resource (usually a person or group) that is held captive or hostage. It could also be an object or a wrecked spaceship.";
		break;
	case "61":
	case "62":
	case "63":
		m.mission = "Surveillance";
		m.description = "Observe a resource (usually a person) for a specified amount of time.";
		break;
	case "64":
	case "65":
	case "66":
		m.mission = "Assassination";
		m.description = "Murder someone, sometimes so that it looks like an accident. Collateral damage is permitted.";
		break;
	}
};


//Table 22
var locationAgents = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.location = "Underground hideout";
		m.locationDescription = "A bunker, catacombs or caves";
		break;
	case "14":
	case "15":
	case "16":
		m.location = "Hostile forest/jungles/desert";
		m.locationDescription = "Inhospitable planet side wilderness. Usually far from cities or settlements.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.location = "Bazaar";
		m.locationDescription = "A bazaar or market in a city or settlement";
		break;
	case "31":
	case "32":
	case "33":
		m.location = "Spaceport";
		m.locationDescription = "Spaceport on a space station or planet";
		break;
	case "34":
	case "35":
	case "36":
		m.location = "Asteroid/Moon";
		m.locationDescription = "The surface of an asteroid or a smaller moon. Vacuum or dangerous atmosphere";
		break;
	case "41":
	case "42":
	case "43":
		m.location = "Space station";
		m.locationDescription = "On a small space station, anything from an oxygen oasis to a trade or service station";
		break;
	case "44":
	case "45":
	case "46":
		m.location = "Ruins";
		m.locationDescription = "Firstcome or Portal Builder ruins ";
		break;
	case "51":
	case "52":
	case "53":
		m.location = "Colony";
		m.locationDescription = "A small colony, usually no bigger than a small, sparsely populated village. Far from other settlements.";
		break;
	case "54":
	case "55":
	case "56":
		m.location = "Portal station";
		m.locationDescription = "A portal station next to a sun";
		break;
	case "61":
	case "62":
	case "63":
		m.location = "Spaceship";
		m.locationDescription = "Onboard a spaceship during voyage or docking";
		break;
	case "64":
	case "65":
	case "66":
		m.location = "Outpost";
		m.locationDescription = "A small outpost, usually planet side. An outpost is commonly just a single building with a specific function and only a few inhabitants. For example sensor station, dam control station, courier post or someother communications station";
		break;
	}
};

//Table 23
var complicationAgents = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		return new complication( "Third party","Another patron or a person with a similar background as the employer is after the same thing. Could offer the group higher payment or that they will use the information/resource for a different purpose when the mission is completed.");
	case "14":
	case "15":
	case "16":
	case "21":
	case "22":
	case "23":
		return new complication( "Accompanying employer", "The employer wants to come along for the mission, or send an observer or agent along.");
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
		return new complication( "Double agent", "A person the PCs encounter is a double agent for another organization with a conflicting agenda.");
		break;
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		return new complication( "Bad intel", "A piece of information about the mission turns out to be false, either intentionally or by mistake.");
		break;
	case "44":
	case "45":
	case "46":
	case "51":
	case "52":
	case "53":
		return new complication( "Unexpected Reinforcements", "The group's opponent receive backup in the form of reinforcements, more advanced computer systems or some other form of extra assistance.");
		break;
	case "54":
	case "55":
	case "56":
	case "61":
	case "62":
	case "63":
		return new complication( "Scapegoats", "The employer wants the mission to go badly and for the PCs to take the fall for something.");
		break;
	case "64":
	case "65":
	case "66":
		return new complication( "Intelligence agency involvement","An intelligence agency, possibly factionary, with many resources has the same or opposite goals as the PCs");
		break;
	}
};





// Table 24
var employerMercenaries = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.employer = "Fleet captain";
		break;
	case "14":
	case "15":
	case "16":
		m.employer = "Military officer";
		break;
	case "21":
	case "22":
	case "23":
		m.employer = "Legion company";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		m.employer = "Patron";
		break;
	case "44":
	case "45":
	case "46":
		m.employer = "Factionary";
		break;
	case "51":
	case "52":
	case "53":
		m.employer = "Arms dealer";
		break;
	case "54":
	case "55":
	case "56":
		m.employer = "Mercenary";
		break;
	case "61":
	case "62":
	case "63":
		m.employer = "War verteran";
		break;
	case "64":
	case "65":
	case "66":
		m.employer = "Smuggler";
		break;
	}
};

// Table 25
var rewardsMercenaries = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
	case "14":
	case "15":
	case "16":
		m.reward = "Faction Protection";
		break;
	case "21":
	case "22":
	case "23":
		m.reward = "Ship module";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
		m.reward = "Birr";
		break;
	case "51":
	case "52":
	case "53":
	case "54":
	case "55":
	case "56":
		m.reward = "Gear";
		break;
	case "61":
	case "62":
	case "63":
		m.reward = "Cybernetics/Bionics";
		break;
	case "64":
	case "65":
	case "66":
		m.reward = "Medal of Honor";
		break;
	}
};

// Table 26
var missionMercenaries = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.mission = "Reconnaissance";
		m.description = "Scout out an area, a location or the surroundings of a building. Remain unnoticed and report back to the employer";
		break;
	case "14":
	case "15":
	case "16":
		m.mission = "Assault";
		m.description = "Attack and hold a location. Prisoners may be taken.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.mission = "Defend place or area ";
		m.description = "Defend a location or patrol an area; prevent the enemy from seizing it.";
		break;
	case "31":
	case "32":
	case "33":
		m.mission = "Reinforce location";
		m.description = "Support or reinforce a position under attack, repel the enemy.";
		break;
	case "34":
	case "35":
	case "36":
		m.mission = "Seek and destroy";
		m.description = "Find a person, group or location and destroy it. Could be civilians, enemy combatants or vehicles/spaceships.";
		break;
	case "41":
	case "42":
	case "43":
		m.mission = "Protect resource";
		m.description = "Protect a resource. It could be information, a person, an object or a ship. Protect it from an attack or guard it for a specified amount of time.";
		break;
	case "44":
	case "45":
	case "46":
		m.mission = "Locate resource";
		m.description = "Locate a person, group or object and either retrieve it or notify the employer of its location.";
		break;
	case "51":
	case "52":
	case "53":
		m.mission = "Rescue operation";
		m.description = "Rescue a group, squadron or spaceship from an attack, imprisonment, or some other peril";
		break;
	case "54":
	case "55":
	case "56":
		m.mission = "Raid";
		m.description = "Plan and execute a raid on a person, group, convoy or vehicle. The goal is usually to destroy or delay the target.";
		break;
	case "61":
	case "62":
	case "63":
		m.mission = "Investigation";
		m.description = "Locate something important, for example nuclear warheads, antimatter bombs or bionic weapons. The PCs could be accompanied by an agent, a weapons expert or some other officer.";
		break;
	case "64":
	case "65":
	case "66":
		m.mission = "Incursion";
		m.description = "Go behind enemy lines or breach a fortress or garrison to secure a resource that could be a person, information or an object.";
		break;
	}
};


//Table 27
var locationMercenaries = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.location = "Underground bunker";
		m.locationDescription = "A bunker, catacombs or caves";
		break;
	case "14":
	case "15":
	case "16":
		m.location = "Hostile forest/jungles/desert";
		m.locationDescription = "Inhospitable planet side wilderness. Usually far from cities or settlements.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.location = "Trenches";
		m.locationDescription = "A trench on a deadlocked frontline. Mine fields, underground tunnels and other soldiers in despair.";
		break;
	case "31":
	case "32":
	case "33":
		m.location = "Spaceport";
		m.locationDescription = "Spaceport on a space station or planet";
		break;
	case "34":
	case "35":
	case "36":
		m.location = "Asteroid/Moon";
		m.locationDescription = "The surface of an asteroid or a smaller moon. Vacuum or dangerous atmosphere";
		break;
	case "41":
	case "42":
	case "43":
		m.location = "Combat station";
		m.locationDescription = "A fortified space station with weapon systems, or some other battle installation such as a larger garrison, hangars or docks.";
		break;
	case "44":
	case "45":
	case "46":
		m.location = "War zone ";
		m.locationDescription = "A larger area where open war is raging. Could be a burned-out city or a wilderness full of fighting combatants.";
		break;
	case "51":
	case "52":
	case "53":
		m.location = "Fortification";
		m.locationDescription = "A fortification could be a wall, modern fort, castle, artillery position, rocket silo or mine field.";
		break;
	case "54":
	case "55":
	case "56":
		m.location = "Space station";
		m.locationDescription = "On a small space station, anything from an oxygen oasis to a trade or service station";
		break;
	case "61":
	case "62":
	case "63":
		m.location = "Spaceship";
		m.locationDescription = "Onboard a spaceship during voyage or docking";
		break;
	case "64":
	case "65":
	case "66":
		m.location = "Outpost";
		m.locationDescription = "A small outpost, usually planet side. An outpost is commonly just a single building with a specific function and only a few inhabitants. For example sensor station, dam control station, courier post or someother communications station";
		break;
	}
};

//Table 28
var complicationMercenaries = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
	case "14":
	case "15":
	case "16":
		return new complication( "Bad intel", "A piece of information about the mission turns out to be false, either intentionally or by mistake.");
	case "21":
	case "22":
	case "23":
		return new complication( "Super cargo", "Someone they must protect during the mission accompanies the group. It could be an observer, a civilian or an agent.");
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
		return new complication( "Gear problem", "The group has gear problems. It could be anything from weapons to vehicles or spaceships.");
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		return new complication( "Underestimated resistance", "The resistance or the attackers are stronger than expected.");
		break;
	case "44":
	case "45":
	case "46":
	case "51":
	case "52":
	case "53":
		return new complication( "Captured employer", "The group's employer is captured during the mission. Fitting if the employer is an officer in the group's company.");
		break;
	case "54":
	case "55":
	case "56":
	case "61":
	case "62":
	case "63":
		return new complication( "New offensive", "A new offensive has just been initiated when the group is about to carry out their mission, either by the enemies or by the PCs' side in the conflict");
		break;
	case "64":
	case "65":
	case "66":
		return new complication( "Bombardments","The area where the mission takes place is being bombed. It could be air raids, torpedo attacks or rebel forces detonating mines and homemade explosives.");
		break;
	}
};


//Table 29
var employerExplorers = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.employer = "Archaeologist";
		break;
	case "14":
	case "15":
	case "16":
		m.employer = "Scientist";
		break;
	case "21":
	case "22":
	case "23":
		m.employer = "Artifact merchant";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		m.employer = "Patron";
		break;
	case "44":
	case "45":
	case "46":
		m.employer = "Factionary";
		break;
	case "51":
	case "52":
	case "53":
		m.employer = "Correspondent";
		break;
	case "54":
	case "55":
	case "56":
		m.employer = "Prospector";
		break;
	case "61":
	case "62":
	case "63":
		m.employer = "Wealthy collector";
		break;
	case "64":
	case "65":
	case "66":
		m.employer = "Criminal";
		break;
	}
};

// Table 30
var rewardsExplorers = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.reward = "Expedition of their own";
		break;
	case "14":
	case "15":
	case "16":
		m.reward = "Ship module";
		break;
	case "21":
	case "22":
	case "23":
		m.reward = "Vehicle";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
		m.reward = "New knowledge";
		break;
	case "51":
	case "52":
	case "53":
	case "54":
	case "55":
	case "56":
		m.reward = "Birr";
		break;
	case "61":
	case "62":
	case "63":
		m.reward = "Gear";
		break;
	case "64":
	case "65":
	case "66":
		m.reward = "Artifact";
		break;
	}
};

// Table 31
var missionExplorers = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.mission = "Excavation";
		m.description = "Perform an excavation, start a dig site or help in an already started excavation.";
		break;
	case "14":
	case "15":
	case "16":
		m.mission = "Collection";
		m.description = "Collect smaller archaeological finds, artifacts, information, scrolls or something similar. Could be from a dig site or some other location.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.mission = "Survey";
		m.description = "Map a location or an area for the employer. Report back with sensor maps and other collected data.";
		break;
	case "31":
	case "32":
	case "33":
		m.mission = "Secure outpost ";
		m.description = "Protect a smaller colony such as a dig site, Bulletin station, sensor station or radio beacon from an attack or from nature's wrath for a specified amount of time";
		break;
	case "34":
	case "35":
	case "36":
		m.mission = "Assist colony ";
		m.description = "Assist a smaller colony with gear, information or expert knowledge about exo use, medicurgy, construction or something else.";
		break;
	case "41":
	case "42":
	case "43":
		m.mission = "Artifact hunt ";
		m.description = "Find an artifact. The location and sometimes the function are unknown. Clues must be tracked down before departure";
		break;
	case "44":
	case "45":
	case "46":
		m.mission = "Investigation";
		m.description = "Locate something important, for example lost ruins, a dig site or a surveyed location. The PCs could be accompanied by an external expert such as an archaeologist, correspondent or diplomat.";
		break;
	case "51":
	case "52":
	case "53":
		m.mission = "Find information ";
		m.description = "Find a specific piece of information for the employer. Sometimes, the group does not know the intended use of the information.";
		break;
	case "54":
	case "55":
	case "56":
		m.mission = "Prospecting";
		m.description = "Command a prospecting expedition or secure a claim somewhere. It could be mining, asteroid harvesting, logging or gas or dust trawling.";
		break;
	case "61":
	case "62":
	case "63":
		m.mission = "Rescue expedition ";
		m.description = "Rescue a group, colony, archaeological expedition or correspondents from an attack or some other peril. Sometimes, the group does not know what has happened to the victims.";
		break;
	case "64":
	case "65":
	case "66":
		m.mission = "Big game hunt";
		m.description = "Command or join in an expedition hunting a monster or some other creature.";
		break;
	}
};


//Table 32
var locationExplorers = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.location = "Underground catacombs";
		m.locationDescription = "Catacombs, tombs or underground ruins.";
		break;
	case "14":
	case "15":
	case "16":
		m.location = "Hostile forest/jungles/desert";
		m.locationDescription = "Inhospitable planet side wilderness. Usually far from cities or settlements.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.location = "Library";
		m.locationDescription = "A library or database hub. Could contain anything from scrolls to memory tags and djinn memories";
		break;
	case "31":
	case "32":
	case "33":
		m.location = "Moon";
		m.locationDescription = "The surface of a moon. Usually vacuum or dangerous atmosphere. Planet-like moons count as wilderness (above).";
		break;
	case "34":
	case "35":
	case "36":
		m.location = "Asteroid belt";
		m.locationDescription = "An asteroid belt or a debris or gas cloud.";
		break;
	case "41":
	case "42":
	case "43":
		m.location = "Ruins";
		m.locationDescription = "Ruins, either Firstcome, unknown or created by a conflict.";
		break;
	case "44":
	case "45":
	case "46":
		m.location = "Portal Builder remains";
		m.locationDescription = "Portal Builder remains. Usually mystical but sometimes intact or functioning.";
		break;
	case "51":
	case "52":
	case "53":
		m.location = "Lost colony";
		m.locationDescription = "A colony that lost contact with the Horizon several segments or cycles ago.";
		break;
	case "54":
	case "55":
	case "56":
		m.location = "Space station";
		m.locationDescription = "On a small space station, anything from an oxygen oasis to a trade or service station. Could be abandoned or destroyed.";
		break;
	case "61":
	case "62":
	case "63":
		m.location = "Spaceship";
		m.locationDescription = "Onboard a spaceship during voyage or docking";
		break;
	case "64":
	case "65":
	case "66":
		m.location = "One of the wonders of the Horizon";
		m.locationDescription = "A large size artifact, like artificial moons or micro suns. The GM is free to decide its exact nature.";
		break;
	}
};

//Table 33
var complicationExplorers = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
	case "14":
	case "15":
	case "16":
		return new complication( "Bad intel", "A piece of information about the mission turns out to be false, either intentionally or by mistake.");
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		return new complication( "Nature's wrath", "The expedition is subjected to nature's wrath. It could be anything from ion storms, bad weather and meteorite showers to landslides or flash floods.");
	case "31":
	case "32":
	case "33":
		return new complication( "Corsairs", "Corsairs attack the expedition.");
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		return new complication( "Rival expedition", "A competing party has the same goal as the expedition and tries to get there first or stop the PCs. They have roughly the same gear as the PCs.");
		break;
	case "44":
	case "45":
	case "46":
	case "51":
	case "52":
	case "53":
		return new complication( "Blockade", "The destination is under blockade. It could be anything from tolls or anti-smuggling measures to factionary war.");
		break;
	case "54":
	case "55":
	case "56":
	case "61":
	case "62":
	case "63":
		return new complication( "Quarantine", "The destination is placed under quarantine. It could be because of a contagion, a mind meme, dangerous technology or something else.");
		break;
	case "64":
	case "65":
	case "66":
		return new complication( "Intelligence agency","The expedition's goals interfere with the work of an intelligence agency. Intelligence agencies usually have a lot of resources and few scruples.");
		break;
	}
};

























//Table 34
var employerPilgrims = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.employer = "Nomad mystic";
		break;
	case "14":
	case "15":
	case "16":
		m.employer = "Prophet";
		break;
	case "21":
	case "22":
	case "23":
		m.employer = "Courtesan";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		m.employer = "Patron";
		break;
	case "44":
	case "45":
	case "46":
		m.employer = "Factionary";
		break;
	case "51":
	case "52":
	case "53":
		m.employer = "Merchant";
		break;
	case "54":
	case "55":
	case "56":
		m.employer = "Preacher";
		break;
	case "61":
	case "62":
	case "63":
		m.employer = "Pilgrim";
		break;
	case "64":
	case "65":
	case "66":
		m.employer = "Hermit";
		break;
	}
};

var employerEntertainers = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.employer = "Director";
		break;
	case "14":
	case "15":
	case "16":
		m.employer = "Poet";
		break;
	case "21":
	case "22":
	case "23":
		m.employer = "Courtesan";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		m.employer = "Patron";
		break;
	case "44":
	case "45":
	case "46":
		m.employer = "Factionary";
		break;
	case "51":
	case "52":
	case "53":
		m.employer = "Musician";
		break;
	case "54":
	case "55":
	case "56":
		m.employer = "Circus director ";
		break;
	case "61":
	case "62":
	case "63":
		m.employer = "Tarrab";
		break;
	case "64":
	case "65":
	case "66":
		m.employer = "Acrobat";
		break;
	}
};

var employerNomads = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.employer = "Clan leader";
		break;
	case "14":
	case "15":
	case "16":
		m.employer = "Prophet";
		break;
	case "21":
	case "22":
	case "23":
		m.employer = "Plantation owner";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		m.employer = "Patron";
		break;
	case "44":
	case "45":
	case "46":
		m.employer = "Factionary";
		break;
	case "51":
	case "52":
	case "53":
		m.employer = "Travelling peddler";
		break;
	case "54":
	case "55":
	case "56":
		m.employer = "Nomad warrior";
		break;
	case "61":
	case "62":
	case "63":
		m.employer = "Colonist";
		break;
	case "64":
	case "65":
	case "66":
		m.employer = "Industrialist";
		break;
	}
};


// Table 34
var rewardsPilgrims = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.reward = "Holy relic/artifact ";
		break;
	case "14":
	case "15":
	case "16":
	case "21":
	case "22":
	case "23":
		m.reward = "New voyage funded ";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
		m.reward = "Gear";
		break;
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
		m.reward = "Birr";
		break;
	case "51":
	case "52":
	case "53":
	case "54":
	case "55":
	case "56":
		m.reward = "Ship module/feature ";
		break;
	case "61":
	case "62":
	case "63":
		m.reward = "Temple constructed ";
		break;
	case "64":
	case "65":
	case "66":
		m.reward = "Absolution/blessing ";
		break;
	}
};

var rewardsEntertainers = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.reward = "New contract ";
		break;
	case "14":
	case "15":
	case "16":
	case "21":
	case "22":
	case "23":
		m.reward = "New play funded";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
		m.reward = "Gear";
		break;
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
		m.reward = "Birr";
		break;
	case "51":
	case "52":
	case "53":
	case "54":
	case "55":
	case "56":
		m.reward = "Ship module/feature ";
		break;
	case "61":
	case "62":
	case "63":
		m.reward = "Fame";
		break;
	case "64":
	case "65":
	case "66":
		m.reward = "Faction reputation";
		break;
	}
};

var rewardsNomads = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.reward = "New scrap ship/colony";
		break;
	case "14":
	case "15":
	case "16":
	case "21":
	case "22":
	case "23":
		m.reward = "New colony funded";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
		m.reward = "Gear";
		break;
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
		m.reward = "Birr";
		break;
	case "51":
	case "52":
	case "53":
	case "54":
	case "55":
	case "56":
		m.reward = "Ship module/feature ";
		break;
	case "61":
	case "62":
	case "63":
		m.reward = "Vehicle";
		break;
	case "64":
	case "65":
	case "66":
		m.reward = "Faction protection";
		break;
	}
};




// Table 35
var missionPilgrims = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.mission = "Pilgrimage";
		m.description = "A pilgrimage to one of the Horizon's important temples or holy sites.";
		break;
	case "14":
	case "15":
	case "16":
		m.mission = "Supply run";
		m.description = "Bring supplies to somewhere.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.mission = "Monastery visit ";
		m.description = "Travel to a monastery and remain there for some time.";
		break;
	case "31":
	case "32":
	case "33":
		m.mission = "Establish missionary colony";
		m.description = "Establish a missionary colony and spread the faith in an area.";
		break;
	case "34":
	case "35":
	case "36":
		m.mission = "Missionary trip";
		m.description = "Travel to several locations and spread the faith.";
		break;
	case "41":
	case "42":
	case "43":
		m.mission = "Construct temple";
		m.description = "Help build a temple, from construction to inauguration, perhaps staying on to run the temple.";
		break;
	case "44":
	case "45":
	case "46":
		m.mission = "Acquire relic";
		m.description = "Acquire a holy relic. It could be body part from a martyr or a hero, an object with sacred writing on it or a religious symbol";
		break;
	case "51":
	case "52":
	case "53":
		m.mission = "Destroy relic/idol";
		m.description = "Find a dangerous or tainted relic or a heathen idol and destroy it.";
		break;
	case "54":
	case "55":
	case "56":
		m.mission = "Find prophet";
		m.description = "Find a lost prophet, seer, ascetic or preacher.";
		break;
	case "61":
	case "62":
	case "63":
		m.mission = "Fulfill prophecy";
		m.description = "Help the Icons so that a prophecy is fulfilled.";
		break;
	case "64":
	case "65":
	case "66":
		m.mission = "Represent temple";
		m.description = "Represent a temple in another location, such as during a sacred meeting, diplomatic trip or missionary voyage";
		break;
	}
};

var missionEntertainers = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.mission = "Find literature";
		m.description = "Investigate and find lost literature. Could be anything from oral stories to blood operas or songs.";
		break;
	case "14":
	case "15":
	case "16":
		m.mission = "Service a set";
		m.description = "Service a set. Could be anything from make-up, lighting and camera operating to catering or relaxation.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.mission = "Guest performance";
		m.description = "Perform somewhere by special invitation.";
		break;
	case "31":
	case "32":
	case "33":
		m.mission = "Organize a carnival";
		m.description = "Organize a carnival, coordinate with other entertainers, acrobats and circuses.";
		break;
	case "34":
	case "35":
	case "36":
		m.mission = "Bazaar performance";
		m.description = "A series of smaller performances in a bazaar or market.";
		break;
	case "41":
	case "42":
	case "43":
		m.mission = "Holo movie";
		m.description = "Work with a holo movie, acting and/or directing.";
		break;
	case "44":
	case "45":
	case "46":
		m.mission = "Play";
		m.description = "Perform a play in a theater or an opera house.";
		break;
	case "51":
	case "52":
	case "53":
		m.mission = "Circus performance";
		m.description = "Perform in a circus show. Could be acrobatics, magic or animal/monster taming";
		break;
	case "54":
	case "55":
	case "56":
		m.mission = "Pleasure cruise";
		m.description = "Take part in a pleasure cruise for the rich.";
		break;
	case "61":
	case "62":
	case "63":
		m.mission = "Dignitary performance";
		m.description = "Perform for high-ranking dignitaries or factionaries.";
		break;
	case "64":
	case "65":
	case "66":
		m.mission = "Concert";
		m.description = "Put on a concert with musical instruments and/or singing.";
		break;
	}
};

var missionNomads = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.mission = "Plantation construction";
		m.description = "Construct a new plantation and plant crops.";
		break;
	case "14":
	case "15":
	case "16":
		m.mission = "Supply run";
		m.description = "Bring supplies to somewhere.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.mission = "Guest work";
		m.description = "Work in a factory or with service for a shorter period of time or one season. It could be harvesting, transportation, cleaning or servant work.";
		break;
	case "31":
	case "32":
	case "33":
		m.mission = "Start a colony ";
		m.description = "Build a colony or prepare a location before the colonists arrive.";
		break;
	case "34":
	case "35":
	case "36":
		m.mission = "Collect asteroid";
		m.description = "Collect or tow an asteroid or ice block to prospectors or a refinery unit.";
		break;
	case "41":
	case "42":
	case "43":
		m.mission = "Construction work";
		m.description = "Build something big, such as a dam, a mine or a large complex like a spaceport or a station.";
		break;
	case "44":
	case "45":
	case "46":
		m.mission = "Act of revenge";
		m.description = "Exact vengeance on another group of plebeians or non-unionized workers. Could be sabotaging cargo or loading, burning stockpiled goods or destroying a ship or gear while in dock or storage.";
		break;
	case "51":
	case "52":
	case "53":
		m.mission = "Service bulk hauler";
		m.description = "Servicing a bulk hauler with loading and unloading, plus running shuttle traffic down to a planet if necessary.";
		break;
	case "54":
	case "55":
	case "56":
		m.mission = "Loading";
		m.description = "Loading using exos or ground loaders in a market or spaceport.";
		break;
	case "61":
	case "62":
	case "63":
		m.mission = "Repairs";
		m.description = "Repair something. Could be anything from a spaceship, large vehicle or building to harvest machinery, a furnace or logging equipment.";
		break;
	case "64":
	case "65":
	case "66":
		m.mission = "Diplomatic representation";
		m.description = "Represent a group of plebeians, workers or the Free League during negotiations.";
		break;
	}
};



//Table 36
var locationPilgrims = function(m) {
};

//Table 37
var complicationPilgrims = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		return new complication( "Cult", "A cult stands in the PCs' way. They could be withholding relics, blocking roads or trying to stop the construction of a temple or the fulfilling of a prophecy.");
	case "14":
	case "15":
	case "16":
		return new complication( "Nature's wrath", "The party is subjected to nature's wrath. It could be anything from ion storms, bad weather and meteorite showers to landslides or flash floods.");
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		return new complication( "Doomsday prophecy", "The end is nigh! A doomsday prophecy has been spoken that complicates the voyage.");
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
	case "51":
	case "52":
		return new complication( "Lack of resources", "Something important is missing. It could be gear, fuel, raw materials, and knowledge or simply birr.");
	case "53":
	case "54":
	case "55":
	case "56":
		return new complication( "Starvation", "For some reason, the food will not last.");
	case "61":
	case "62":
	case "63":
		return new complication( "Diva", "A diva appears, in the form of a prophet, preacher or temple officer, hindering the group unless they are prepared to grovel.");
	case "64":
	case "65":
	case "66":
		return new complication( "Iconic intervention", "The Icons manifest themselves somehow. Through an avatar, an omen, a miracle or some other way of the GM's choosing.");
	}
};

//Table 37
var complicationEntertainers = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
	case "14":
	case "15":
	case "16":
		return new complication( "Restrictions", "A ban or high fee complicates the voyage.");
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		return new complication( "Nature's wrath", "The party is subjected to nature's wrath. It could be anything from ion storms, bad weather and meteorite showers to landslides or flash floods.");
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
		return new complication( "Rival group ", "A competing party has the same goal as the expedition and tries to get there first or stop the PCs. They have roughly the same gear as the PCs.");
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
	case "51":
	case "52":
		return new complication( "Lack of resources", "Something important is missing. It could be gear, fuel, raw materials, and knowledge or simply birr");
	case "53":
	case "54":
	case "55":
	case "56":
		return new complication( "Wrong equipment", "The group's gear is unfit for the task.");
	case "61":
	case "62":
	case "63":
		return new complication( "Diva", "A diva appears, in the forms of an actor, director or artist, hindering the group unless they are prepared to grovel.");
	case "64":
	case "65":
	case "66":
		return new complication( "War", "A violent event occurs, such as a war breaking out.");
	}
};

//Table 37
var complicationNomads = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
	case "14":
	case "15":
	case "16":
		return new complication( "The crack of the whip", "The employer has thugs pushing the group to work faster. It could be stevedore aqbars, foremen or something similar.");
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		return new complication( "Nature's wrath", "The party is subjected to nature's wrath. It could be anything from ion storms, bad weather and meteorite showers to landslides or flash floods.");
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
		return new complication( "Corsairs", "Corsairs or bandits attack the group's work site.");
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
	case "51":
	case "52":
		return new complication( "Lack of resources", "Something important is missing. It could be gear, fuel, raw materials, and knowledge or simply birr");
	case "53":
	case "54":
	case "55":
	case "56":
		return new complication( "Starvation", "For some reason, the food will not last.");
	case "61":
	case "62":
	case "63":
		return new complication( "Faction", "A faction is blocking the work the group is supposed to do.");
	case "64":
	case "65":
	case "66":
		return new complication( "Rebels", "Rebels violently try to stop the group's work.");
	}
};

//Table 38
var employerFreeTraders = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.employer = "Outpost Rep";
		break;
	case "14":
	case "15":
	case "16":
		m.employer = "Merchant";
		break;
	case "21":
	case "22":
	case "23":
		m.employer = "Colonist";
		break;
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		m.employer = "Patron";
		break;
	case "44":
	case "45":
	case "46":
		m.employer = "Trading house";
		break;
	case "51":
	case "52":
	case "53":
		m.employer = "Military officer";
		break;
	case "54":
	case "55":
	case "56":
		m.employer = "Criminal";
		break;
	case "61":
	case "62":
	case "63":
		m.employer = "Factionary";
		break;
	case "64":
	case "65":
	case "66":
		m.employer = "Privileged";
		break;
	}
};

// Table 39
var rewardsFreeTraders = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.reward = "Discount on new cargo";
		break;
	case "14":
	case "15":
	case "16":
		m.reward = "New contract";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
	case "31":
	case "32":
	case "33":
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
	case "44":
	case "45":
	case "46":
		m.reward = "Birr";
		break;
	case "51":
	case "52":
	case "53":
		m.reward = "Ship module/feature";
		break;
	case "54":
	case "55":
	case "56":
		m.reward = "Faction contact";
		break;
	case "61":
	case "62":
	case "63":
		m.reward = "Extra debt cancellation";
		break;
	case "64":
	case "65":
	case "66":
		m.reward = "Artifact";
		break;
	}
};

// Table 40
var missionFreeTraders = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
		m.mission = "Ore";
		m.description = "Bauxite (aluminum), lead glance, gold-quartz, cassiterite (tin), malachite (copper), magnetite (iron), platinum-bearing sand, sphalerite (zinc)";
		break;
	case "13":
		m.mission = "Minerals";
		m.description = "Pure minerals, salt";
		break;
	case "14":
		m.mission = "Metals";
		m.description = "Bars of metal";
		break;
	case "15":
	case "16":
		m.mission = "Nobel gasses";
		m.description = "Argon, helium, neon, krypton, radon, xenon";
		break;
	case "21":
		m.mission = "Timber";
		m.description = "Pine, jacaranda, mahogany, oak";
		break;
	case "22":
		m.mission = "Ice";
		m.description = "Water ice or rare frozen solution";
		break;
	case "23":
		m.mission = "Chemicals";
		m.description = "Industrial chemicals";
		break;
	case "24":
		m.mission = "Fertilizer";
		m.description = "Natural (droppings) or synthetic";
		break;
	case "25":
	case "26":
		m.mission = "Textiles";
		m.description = "Fabrics (wool, velvet, silk) or clothing";
		break;
	case "31":
	case "32":
		m.mission = "Foodstuffs";
		m.description = "Base foods such as chickpeas, soybeans and other legumes, grains (corn, barley, rice, wheat) or refined versions thereof (such as couscous) or vegetables such as aubergine, spinach, zucchini, cucumber or tomato";
		break;
	case "33":
		m.mission = "Spices";
		m.description = "Jasmine, cinnamon, cloves, cumin, mint, basil, oregano, rose water, saffron";
		break;
	case "34":
		m.mission = "Delicacies";
		m.description = "Apricots, bananas, baklava, dates, coconut, almonds, marzipan, nuts (pecans, pistachios, walnuts), raisins, oysters, caviar, testicles, ants";
		break;
	case "35":
	case "36":
		m.mission = "Mechanical goods";
		m.description = "Vaccines, medicines, m- and t-doses, surgical gear for bionics or cybernetics";
		break;
	case "41":
		m.mission = "Religious paraphernalia";
		m.description = "Altars, prayer towers, dismantled chapels, icons, reliquaries, religious art, talismans, relics, scrolls";
		break;
	case "42":
	case "43":
		m.mission = "Spare parts";
		m.description = "Different makes and types, for exos, vehicles, cybernetics, medical technology, prospecting gear, drones, weapons, armor, spaceships or colony life support systems";
		break;
	case "44":
	case "45":
		m.mission = "Ship parts";
		m.description = "Modules, features, parts for/from dismantled ships";
		break;
	case "46":
		m.mission = "Exos";
		m.description = "Exo shells, loader exos, diver exos, carrier exos etc. Stacked effective use of cargo space.";
		break;
	case "51":
		m.mission = "Drones";
		m.description = "Parts or ready-to-use automatic systems";
		break;
	case "52":
		m.mission = "Vehicles";
		m.description = "Disassembled";
		break;
	case "53":
	case "54":
		m.mission = "Weapons";
		m.description = "Choose from the Gear chapter";
		break;
	case "55":
	case "56":
		m.mission = "Body armor";
		m.description = "Choose from the Gear chapter";
		break;
	case "61":
	case "62":
		m.mission = "Surival gear";
		m.description = "Basic gear for survival or for a specific environment";
		break;
	case "63":
		m.mission = "Animal feed";
		m.description = "Alfalfa, tailored animal or livestock feed, synthetic fodder";
		break;
	case "64":
	case "65":
		m.mission = "Livestock/animals";
		m.description = "Work animals or pets, usually alive if loaded in a primitive environment or in stasis if from ordinary or advanced environments";
		break;
	case "66":
		m.mission = "Semi-intelligences";
		m.description = "Ekilibri or nekatra are the most common, the former as plantation workers or pets, the latter as guards, soldiers or gladiators";
		break;
	}
};


//Table 41
var locationFreeTraders = function(m) {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		m.location = "Coordinates";
		m.locationDescription = "Coordinates for an area or secret base.";
		break;
	case "14":
	case "15":
	case "16":
		m.location = "Hostile forest/jungles/desert";
		m.locationDescription = "Inhospitable planet side wilderness. Usually far from cities or settlements.";
		break;
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		m.location = "Bazaar";
		m.locationDescription = "A bazaar or market in a city or settlement";
		break;
	case "31":
	case "32":
	case "33":
		m.location = "Spaceport";
		m.locationDescription = "Spaceport on a space station or planet";
		break;
	case "34":
	case "35":
	case "36":
		m.location = "Asteroid/Moon";
		m.locationDescription = "The surface of an asteroid or a smaller moon. Vacuum or dangerous atmosphere";
		break;
	case "41":
	case "42":
	case "43":
		m.location = "Space station";
		m.locationDescription = "On a small space station, anything from an oxygen oasis to a trade or service station";
		break;
	case "44":
	case "45":
	case "46":
		m.location = "Soulk";
		m.locationDescription = "A larger souk where trading partners meet. Usually in a larger city or station, sometimes seasonal";
		break;
	case "51":
	case "52":
	case "53":
		m.location = "Colony";
		m.locationDescription = "A small colony, usually no bigger than a small, sparsely populated village. Far from other settlements.";
		break;
	case "54":
	case "55":
	case "56":
		m.location = "Portal station";
		m.locationDescription = "A portal station next to a sun";
		break;
	case "61":
	case "62":
	case "63":
		m.location = "Spaceship";
		m.locationDescription = "Onboard a spaceship during voyage or docking";
		break;
	case "64":
	case "65":
	case "66":
		m.location = "Outpost";
		m.locationDescription = "A small outpost, usually planet side. An outpost is commonly just a single building with a specific function and only a few inhabitants. For example sensor station, dam control station, courier post or someother communications station";
		break;
	}
};

//Table 42
var complicationFreeTraders = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
		return new complication( "Embargo/Quarantine","The destination is placed under quarantine or an embargo.");
	case "14":
	case "15":
	case "16":
		return new complication( "Customs inspection","A tolling vessel or some other customs ship approaches and demands to be allowed to board.");
	case "21":
	case "22":
	case "23":
	case "24":
	case "25":
	case "26":
		return new complication( "Corrupt customs officer","A customs officer demands to be bribed to allow the PCs through or will make sure their cargo gets tangled up in bureaucracy.");
	case "31":
	case "32":
	case "33":
		return new complication( "Corsairs","Corsairs or pirates attack the group's work site or ship.");
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		return new complication( "Break-down","Some form of breakdown occurs onboard, during either loading or unloading.");
	case "44":
	case "45":
	case "46":
	case "51":
	case "52":
	case "53":
		return new complication( "Lost","The group strays from their planned route and is lost on a planet or in space.");
	case "54":
	case "55":
	case "56":
		return new complication( "Tracky merchant","The PCs encounter a merchant who hinders them from selling at a profit or tricks them in some other way.");
	case "61":
	case "62":
	case "63":
	case "64":
	case "65":
	case "66":
		return new complication( "Saturated market","The market at the destination recently received a big shipment of goods similar to the PCs' and the prices have dropped.");
	}
};

//Table 44
var misfortuneTable = function (){
	var r = "" + roll();
	switch(r) {
	case "1":
		return captainMisfortune();
	case "2":
		return sensorOparatorMisfortune();
	case "3":
		return gunnerMisfortune();
	case "4":
		return engineerMisfortune();
	case "5":
		return pilotMisfortune();
	case "6":
		return crewMisfortune();
	};
	
};

var captainMisfortune = function() {
	var r = "" + roll();
	switch(r) {
	case "1":
		return new misfortune("Captain", "Stowaways", "An uninvited guest has snuck onboard and pleads with the captain's conscience. Who is the stowaway? And how will the captain handle the situation?");
	case "2":
		return new misfortune("Captain", "Distress Call", "A signal on the emergency frequency is intercepted. Who or what is seeking aid?");
	case "3":
		return new misfortune("Captain", "Unexpected Encounter", " Roll on the Encounters table. Can the captain avoid the encounter or not?");
	case "4":
		return new misfortune("Captain", "Illegal Cargo", "Someone is using the ship's cargo containers for smuggling. Who, and for what?");
	case "5":
		return new misfortune("Captain", "Haunting", "The lights flicker and systems turn on and off. Who or what is haunting the ship? Can the journey continue?");
	case "6":
		return new misfortune("Captain", "Bad Navigation", "The computer reports one set of coordinates, but the navigation beacon reports another. Where is the ship and what has happened?");
	};
};

var sensorOparatorMisfortune = function() {
	var r = "" + roll();
	switch(r) {
	case "1":
		return new misfortune("Sensor Operator", "Sensor Ghosts", "There is a quick flash on the screen. Is there something out there?");
	case "2":
		return new misfortune("Sensor Operator", "Sensor Glitch", "There is something wrong with the sensors. Is it because of broken internal wiring, or will the repairs require a spacewalk?");
	case "3":
		return new misfortune("Sensor Operator", "Transponder Malfunction", "There is something wrong with the ship's transponder. What is the ship claiming to be?");
	case "4":
		return new misfortune("Sensor Operator", "Overload", "Vital panels flicker and go dark. Something must be done before the systems fry.");
	case "5":
		return new misfortune("Sensor Operator", "Faulty Calibration", "There is someone following the ship! Or is there? The sensors give contradicting information. What has gone wrong?");
	case "6":
		return new misfortune("Sensor Operator", "Virus", "The screens are flooded with unintelligible symbols, and nothing works like it should.");
	};			
};

var gunnerMisfortune = function() {
	var r = "" + roll();
	switch(r) {
	case "1":
		return new misfortune("Gunner", "Disconnected systems", "One or more weapon systems stop responding. What has happened?");
	case "2":
		return new misfortune("Gunner", "Overheating", "A weapon system suddenly warns about over- heating. Why?");
	case "3":
		return new misfortune("Gunner", "Unintentional lock-on", "The lock-on signal whines loudly across the bridge. A weapon system has locked onto an object or another ship. What is going on?");
	case "4":
		return new misfortune("Gunner", "Sudden discahrge", "A weapon system fires a salvo. What triggered the firing?");
	case "5":
		return new misfortune("Gunner", "Armed torpedo", "The launch control djinn warns of an armed torpedo in the torpedo room. Will you be able to disarm it?");
	case "6":
		return new misfortune("Gunner", "Poor service", "Dirt or vermin have gotten deep into the core of a weapon system. Can it be cleaned out?");
	};
};


var engineerMisfortune = function() {
	var r = "" + roll();
	switch(r) {
	case "1":
		return new misfortune("Engineer", "Coughing grav projector", "The graviton flow is fluctuating. What is the problem?");
	case "2":
		return new misfortune("Engineer", "Transformer short circuit", "The power supply to some parts of the ship shuts down. What is causing it?");
	case "3":
		return new misfortune("Engineer", "Malfunctiong climate control", "The ship suddenly turns very hot or very cold. How can the problem be fixed?");
	case "4":
		return new misfortune("Engineer", "Vent problems", "The air becomes dry and increasingly stuffy. What has happened?");
	case "5":
		return new misfortune("Engineer", "Uninvited guest in the eingine room", "A pest of some sort is wreaking havoc in the engine room. What is it and how can it be caught?");
	case "6":
		return new misfortune("Engineer", "Striking trash compactor", "The trash compactor is not working like it should and gives off a rotten smell. How can it be repaired?");
	};
};

var pilotMisfortune = function() {
	var r = "" + roll();
	switch(r) {
	case "1":
		return new misfortune("Pilot", "Sudden evasive manuevers", "Something comes shooting right towards the ship. Will the pilot be able to evade a collision? What are the consequences of the maneuver?");
	case "2":
		return new misfortune("Pilot", "Manfunctioning thrusters", "The thrusters are acting strangely, the ship shakes and rolls. Why?");
	case "3":
		return new misfortune("Pilot", "Ion storm", "An ion storm hits the ship! Can the pilot navigate through it without it harming the passengers?");
	case "4":
		return new misfortune("Pilot", "Meteorite field", "A sudden bang, and then another. The ship has entered a meteorite field. Can the pilot escape the field before the ship is hit by a larger rock?");
	case "5":
		return new misfortune("Pilot", "Space debris", "The ship enters a field of junk and debris. What does it contain? And can the pilot get the ship to safety?");
	case "6":
		return new misfortune("Pilot", "Autonomous autopilot", " The ship suddenly changes course and speed, as if the controls have been possessed. What is causing this?");
	};
};


var crewMisfortune = function() {
	var r = "" + roll();
	switch(r) {
	case "1":
		return new misfortune("Crew", "Hull breach", "The breach alarm goes off! The ship is venting oxygen into space and the hole is rapidly getting bigger. Can the group find and repair the hole fast enough?");
	case "2":
		return new misfortune("Crew", "Disabled gravity", " The artificial gravity switches off. Crewmembers and loose gear float around freely onboard. What is wrong?");
	case "3":
		return new misfortune("Crew", "Intruders", "Someone has snuck onboard. Who? And why?");
	case "4":
		return new misfortune("Crew", "Contagion", "One by one, the crewmembers start to feel sick. What is causing it?");
	case "5":
		return new misfortune("Crew", "Fire", " Smoke is pouring out of the vents – there is a fire some- where! Can the crew put it out before they lose control?");
	case "6":
		return new misfortune("Crew", "Radiation storm", "A violent radiation storm hits the ship and the crew must find shelter quickly. Will they make it?");
	};
};


// Table 45
var landMisfortuneTable = function (){
	var r = "" + (roll() + roll());
	switch(r) {
	case "2":
		return new landMisfortune("Spoiled provisions", "The group's food has somehow gone bad. If they fail to find new food, they will suffer the effects of Hunger (page 98 in the Coriolis core rulebook).");
	case "3":
		return new landMisfortune("Contagion", "Nausea and disease spread through the group. Everyone must test survival. A failed test results in 1 point of damage/day for D6 days.");
	case "4":
		return new landMisfortune("Bad weather", "Rain, snow and strong winds make the journey difficult. The PCs become wet, tired and cold and they all must test survival. A failed test results in 2 points of damage.");
	case "5":
		return new landMisfortune("Wild animals", "The PCs encounter wild animals. They might attack.");
	case "6":
		return new landMisfortune("Poor camp", "The camp is either poorly made or suffers an incident during the night. The PCs get little sleep and suffer 1 stress point from lack of sleep.");
	case "7":
		return new landMisfortune("Lost", " The group get lost and must struggle to find their way back. The PCs must test survival. A passed roll means that they find the path within the hour; failure means that they are lost for 3D6 hours.");
	case "8":
		return new landMisfortune("Insects/vermin", "Insects or vermin of some sort attack The PCs.");
	case "9":
		return new landMisfortune("Sinkhole/Landslide", "All PCs must test dexterity. Those who pass find safe ground, but those who fail fall into a hole or get stuck.");
	case "10":
		return new landMisfortune("Chased", " The group are being followed by someone or some- thing. All PCs must test survival; those who fail suffer 2 stress points from fear. And what if the pursuers catch up?");
	case "11":
		return new landMisfortune("Storm", "Dark clouds appear and a storm comes crashing down. The PCs must find shelter!");
	case "12":
		return new landMisfortune("Cold/Heat", " The temperature suddenly drops or rises. Unless the PCs find cover, use the rules for Cold (page 99 in the Coriolis core rulebook).");
	};	
};

