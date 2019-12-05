const { stripIndents } = require('common-tags');

exports.setupStart = stripIndents`
	Starting up the Google Calendar integration.
	This Bot has two types of calendars to setup:
	An ***optional*** **availability checker calendar** and your **regular schedule calendar**

	So my first question is do you want an availability checker?
	Please respond with **yes** or **no**.

	You can also **stop** during the setup anytime
`;

exports.setupAvailabilityChannel = stripIndents`
	Do you want me to **create** a calendar for you,
	or would you rather **add** me to one of your existing google calendars instead?

	Please respond with **create** or **add**. You can also **skip** this for now.
`;

exports.setupTimeZone = stripIndents`
	What is the timezone of your server?
	You can get your timezone from here: http://www.timezoneconverter.com/cgi-bin/findzone
`;