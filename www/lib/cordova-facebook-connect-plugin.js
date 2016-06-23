/*global window, document, FB */
(function () {
    'use strict';

	/*
	* @author Pat Nolan - Modifed fro the original Author Ally Ogilvie
	* @copyright Wizcorp Inc. [ Incorporated Wizards ] 2014
	* @file - facebookConnectPlugin.js
	* @about - JavaScript interface for PhoneGap bridge to Facebook Connect SDK
	*
	*
	*/

	document.addEventListener('DOMContentLoaded', function(e) {
		console.log('DOMContentLoaded', e);
		var facebookConnectPlugin = {};

		if (!window.cordova || window.cordova && window.cordova.platformId === 'browser') {

			facebookConnectPlugin = {

				getLoginStatus: function (s, f) {
					// Try will catch errors when SDK has not been init
					try {
						FB.getLoginStatus(function (response) {
							s(response);
						});
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				},

				showDialog: function (options, s, f) {
					var opts = {
						name: '',
						message: '',
						caption: '',
						description: '',
						href: '',
						picture: ''
					}, opt = '';

					for(opt in options) {
						if(options.hasOwnProperty(opt)) {
							opts[opt] = options[opt];
						}
					}

					// Try will catch errors when SDK has not been init
					try {
						FB.ui(options,
						function (response) {
							if (response && (response.request || !response.error_code)) {
								s(response);
							} else {
								f(response);
							}
						});
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				},
				// Attach this to a UI element, this requires user interaction.
				login: function (permissions, s, f) {
					// JS SDK takes an object here but the native SDKs use array.
					var permissionObj = {};
					if (permissions && permissions.length > 0) {
						permissionObj.scope = permissions.toString();
					}

					FB.login(function (response) {
						if (response.authResponse) {
							s(response);
						} else {
							f(response.status);
						}
					}, permissionObj);
				},

				getAccessToken: function (s, f) {
					var response = FB.getAccessToken();
					if (!response) {
						if (!f) {
							console.error('NO_TOKEN');
						} else {
							f('NO_TOKEN');
						}
					} else {
						s(response);
					}
				},

				/* jshint ignore:start */
				logEvent: function (eventName, params, valueToSum, s, f) { 
					// AppEvents are not avaliable in JS.
					s();
				},

				logPurchase: function (value, currency, s, f) { // jshint ignore:line
					// AppEvents are not avaliable in JS.
					s();
				},
				/* jshint ignore:end */

				logout: function (s, f) {
					// Try will catch errors when SDK has not been init
					try {
						FB.logout( function (response) {
							s(response);
						});
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				},

				api: function (graphPath, permissions, s, f) {
					// JS API does not take additional permissions

					// Try will catch errors when SDK has not been init
					try {
						FB.api(graphPath, function (response) {
							if (response.error) {
								f(response);
							} else {
								s(response);
							}
						});
					} catch (error) {
						if (!f) {
							console.error(error.message);
						} else {
							f(error.message);
						}
					}
				},

				// Browser wrapper API ONLY
				browserInit: function (appId, version) {
					if (!version) {
						version = 'v2.0';
					}
					FB.init({
						appId      : appId,
						cookie     : true,
						xfbml      : true,
						version    : version
					});
				}
			};

			// Bake in the JS SDK
			if (!window.FB) {
				console.log('launching FB SDK');
				var scriptEl = document.createElement('script'),
					fbRootEl;
				scriptEl.src = document.location.protocol !== 'file:' ? '//connect.facebook.net/en_US/sdk.js' : 'http://connect.facebook.net/en_US/sdk.js';
				scriptEl.async = true;

				if(!document.getElementById('fb-root')) {
					fbRootEl = document.createElement('div');
					fbRootEl.id = 'fb-root';
					fbRootEl.appendChild(scriptEl);
					document.body.appendChild(fbRootEl);
				} else {
					document.body.appendChild(scriptEl);
				}

				scriptEl.onload = function() {
					console.log('FacebookSDK loaded from server');
				};
			}

			window.facebookConnectPlugin = facebookConnectPlugin;

		} else {

			console.log('Cordova found and loading JS Bridge');

			var exec = require('cordova/exec');
			
			facebookConnectPlugin = {

					getLoginStatus: function (s, f) {
						exec(s, f, 'FacebookConnectPlugin', 'getLoginStatus', []);
					},

					showDialog: function (options, s, f) {
						exec(s, f, 'FacebookConnectPlugin', 'showDialog', [options]);
					},

					login: function (permissions, s, f) {
						exec(s, f, 'FacebookConnectPlugin', 'login', permissions);
					},

					logEvent: function(name, params, valueToSum, s, f) {
						// Prevent NSNulls getting into iOS, messes up our [command.argument count]
						if (!params && !valueToSum) {
							exec(s, f, 'FacebookConnectPlugin', 'logEvent', [name]);
						} else if (params && !valueToSum) {
							exec(s, f, 'FacebookConnectPlugin', 'logEvent', [name, params]);
						} else if (params && valueToSum) {
							exec(s, f, 'FacebookConnectPlugin', 'logEvent', [name, params, valueToSum]);
						} else {
							f('Invalid arguments');
						}
					},

					logPurchase: function(value, currency, s, f) {
						exec(s, f, 'FacebookConnectPlugin', 'logPurchase', [value, currency]);
					},

					getAccessToken: function(s, f) {
						exec(s, f, 'FacebookConnectPlugin', 'getAccessToken', []);
					},

					logout: function (s, f) {
						exec(s, f, 'FacebookConnectPlugin', 'logout', []);
					},

					api: function (graphPath, permissions, s, f) {
						if (!permissions) { permissions = []; }
						exec(s, f, 'FacebookConnectPlugin', 'graphApi', [graphPath, permissions]);
					}
			};

			module.exports = facebookConnectPlugin;
		}
	});

})();
