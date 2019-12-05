const Enum = require('enum');

const questionEnum = new Enum(
	[
		'Yes',
		'No',
		'Stop',
	], { ignoreCase: true }
);

const calendarSetupEnum = new Enum(
	[
		'Create',
		'Add',
		'Skip',
		'Stop',
	], { ignoreCase: true }
);

const questionMap = new Map();
questionMap.set("y", questionEnum.Yes);
questionMap.set("yes", questionEnum.Yes);
questionMap.set("n", questionEnum.No);
questionMap.set("no", questionEnum.No);
questionMap.set("stop", questionEnum.Stop);

const calendarMap = new Map();
calendarMap.set("create", calendarSetupEnum.Create);
calendarMap.set("c", calendarSetupEnum.Create);
calendarMap.set("add", calendarSetupEnum.Add);
calendarMap.set("a", calendarSetupEnum.Add);
calendarMap.set("skip", calendarSetupEnum.Skip);
calendarMap.set("stop", calendarSetupEnum.Stop);

module.exports = {
	questionEnum : questionEnum,
	calendarSetupEnum : calendarSetupEnum,
	questionMap : questionMap,
	calendarMap : calendarMap,
};