import { FlowRouter } from 'meteor/kadira:flow-router';

FlowRouter.route('/', {
	name: 'layout',
	action (params, queryParams) {
		BlazeLayout.render('layout');
	}
});