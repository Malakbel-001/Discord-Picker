const { stripIndents } = require('common-tags');

exports.setupStart = stripIndents`Starting up the Google Calendar integration.
This Bot has two types of calendars to setup:
An ***optional*** **availability checker calendar** and your **regular schedule calendar**

So my first question is do you want an availability checker?
Please respond to me with yes or no.

If during the setup you want to cancel, just send to me **cancel**`;

