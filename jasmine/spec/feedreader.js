/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

	/* This suite is all about the RSS feeds definitions,
	 * the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function() {

		/* This spec tests to make sure that the allFeeds variable has been defined
		 * and that it is not empty. Setting an empty array generated an error
		 * 'Expected 0 not to be 0', but the allFeeds is still defined
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* This spec loops through each feed in the allFeeds object and tests if
		 * it has a url defined and that the url is not empty.
		 */
		it ('has a url and it is not empty', function() {

			// Checks that url is not undefined, null or an empty string
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBeNull();
				expect(feed.url).not.toEqual('');
			});
		});

		/* This spec loops through each feed in the allFeeds object and tests if
		 * it has a name defined and that the name is not empty.
		 */
		it ('has a name and is not empty' ,function() {

			// Checks that name is not undefined, null or an empty string
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBeNull();
				expect(feed.name).not.toEqual('');
			});
		});
	});


	/* This suite checks the functionality of the pop-up side menu */
	describe('The menu', function() {

		// The element on which the menu's hidden state is dependent
		var $menuNode = $('body');

		/* This spec tests if the menu element is hidden by default. */
		it ('should be hidden by default', function() {
			expect($menuNode.hasClass('menu-hidden')).toEqual(true);
		});

		/* This spec tests if the menu changes visibility when the menu icon is clicked. */
		it ('changes visibility when the menu icon is clicked', function() {

			// The element that is clicked to show/hide the menu
			var $menuIcon = $('.menu-icon-link');

			// Manually initiates a click event to first show the menu
			$menuIcon.trigger('click');
			expect($menuNode.hasClass('menu-hidden')).toEqual(false);

			// This time to hide the menu
			$menuIcon.trigger('click');
			expect($menuNode.hasClass('menu-hidden')).toEqual(true);
		});
	});


	/* This suite checks that an entry loads on the page when the application starts */
	describe('Initial Entries', function() {

		beforeEach(function(done) {
			loadFeed(0, done);
		});

		/* This spec tests if there is at least a single .entry element within the .feed
		 * container when the loadFeed function is called and completes its work
		 */
		it ('load at least one entry to the DOM', function(done) {
			var $feedNode = $('.feed');

			// Checks the number of children (entries) in the feed node
			expect($feedNode.length).not.toEqual(0);
			done();
		});
	});


	/* This test suite checks if new feeds are loaded correctly */
	describe('New Feed Selection', function() {

		// Holds texts from each loaded feed entry
		var textsArray = [];

		// First, we load two feeds and store their content in the textsArray
		beforeEach(function(done) {
			var content;

			loadFeed(0, function() {
				$entryNode = $('.entry');
				content = $entryNode.text();
				textsArray.push(content);

				loadFeed(1, function() {
					$entryNode = $('.entry');
					content = $entryNode.text();
					textsArray.push(content);
					done();
				});
			});
		});

		// Restores the default feed after the test is done
		afterEach(function() {
			loadFeed(0);
		});

		/* This spec tests if the content actually changes when a new feed is
		 * loaded by the loadFeed function
		 */
		it ('successfully loaded', function(done) {

			// Checks that the content of the selected feeds are different
			expect(textsArray[0]).not.toEqual(textsArray[1]);
			done();
		});
	});


	/* This test suite checks the error notifier is displays */
	describe('Error notifier', function() {
		var $notifierNode = $('.notifier');

		it ('is triggered', function() {
			expect($notifierNode.hasClass('.notifier-hidden')).toEqual(false);
		});
	});

	/* This test suite checks the "No feeds detected" message displays */
	describe('No feeds error', function() {
		var $notifierNode = $('.notifier');

		it ('successfully displayed', function() {
			expect($notifierNode.text()).toEqual('No feeds detected');
		});
	});

	/* This test suite checks the "Request error" message displays  */
	describe('Server request error', function() {
		var $notifierNode = $('.notifier');

		it ('successfully displayed', function() {
			expect($notifierNode.text()).toEqual('400');
		});
	});

}());