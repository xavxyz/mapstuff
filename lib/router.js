FlowRouter.route('/', {
	name: 'layout',
	action (params, queryParams) {
		BlazeLayout.render('layout');
	}
});