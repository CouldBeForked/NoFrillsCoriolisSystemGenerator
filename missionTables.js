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

var mission = function(m, d, c, b, e) {
	var that = this;

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
		debug(String.format(headerTemplate, "Mission"));
		debug(String.format(cellTemplate, "Type", that.missionType));
		debug(String.format(cellTemplate, "Destination", that.destination));
		debug(String.format(cellTemplate, "# Complications", that.numComplications));
		debug(String.format(cellTemplate, "Base Reward", that.baseReward));
		debug(String.format(cellTemplate, "Extra Reward", that.extraReward));
		debug(String.format(cellTemplate, "Employer", that.employer));
		debug(String.format(cellTemplate, "Reward", that.reward));
		debug(String.format(cellTemplate, "Mission", that.mission));
		debug(String.format(cellTemplate, "Mission Description", that.description));
		debug(String.format(cellTemplate, "Location", that.location));
		debug(String.format(cellTemplate, "location Description", that.locationDescription));
		$.each(that.complications, function(c,i){
			debug(String.format(cellTemplate, "Complication", this.complication));
			debug(String.format(cellTemplate, "Complication Description", this.complicationDescription));			
		});
	};
}

// Table 18
var missionType = function() {
	var r = "" + roll() + roll();
	switch (r) {
	case "11":
	case "12":
	case "13":
	case "14":
	case "15":
		return new mission("Routine", "Within System", 0, roll(), 0);
	case "16":
	case "21":
	case "22":
	case "23":
		return new mission("Routine", "Within System", 1, roll() + 2, 0);
	case "24":
	case "25":
		return new mission("Easy", "Within System", 0, roll() + roll(), 0);
	case "26":
	case "31":
		return new mission("Easy", "Within System", 1, roll() + roll(), 1);
	case "32":
	case "33":
		return new mission("Easy", "Within System", 1, roll() + roll() + 2, 1);
	case "34":
	case "35":
	case "36":
	case "41":
	case "42":
	case "43":
		return new mission("Normal", "Within System", 1, roll() + roll()
				+ roll(), 0);
	case "44":
	case "45":
		return new mission("Normal", "Nearby System", 1, roll() + roll()
				+ roll(), 0);
	case "46":
	case "51":
		return new mission("Normal", "Nearby System", 1, roll() + roll()
				+ roll(), 1);
	case "52":
	case "53":
		return new mission("Normal", "Nearby System", 1, roll() + roll()
				+ roll() + 2, 1);
	case "54":
		return new mission("Normal", "Faraway System", 1, roll() + roll()
				+ roll() + 4, 0);
	case "55":
		return new mission("Normal", "Faraway System", 1, roll() + roll()
				+ roll() + 4, 1);
	case "56":
	case "61":
		return new mission("Difficult", "Within System", 2, roll() + roll()
				+ roll() + roll(), 1);
	case "62":
	case "63":
		return new mission("Difficult", "Nearby System", 2, roll() + roll()
				+ roll() + roll() + 2, 0);
	case "64":
		return new mission("Difficult", "Nearby System", 2, roll() + roll()
				+ roll() + roll() + 2, 1);
	case "65":
		return new mission("Difficult", "Faraway System", 2, roll() + roll()
				+ roll() + roll() + roll(), 1);
	case "66":
		return new mission("Difficult", "Faraway System", 3, roll() + roll()
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