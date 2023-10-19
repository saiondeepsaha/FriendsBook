// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appConstants: {
    // for new routes kindly define the url here in one word or hyphen separated words in smallercase.
    routes: {
      LOGIN: 'login',
      LOGOUT: 'logout',
      REGISTER: 'register',
      FGTPWD: 'forgot-password',
      LANDING: {
        USER: 'user',
        ADMIN: 'admin'
      },
      USER: {
        HOME: 'home',
        FRIENDS: 'friends',
        SETTINGS: 'settings',
        NETWORK: 'network'
      },
      ADMIN: {
        USERLIST: 'users-list',
      }
    },
    inAppVars: {
      IS_LOGGEDIN: 'loggedIn',
      IS_LOGGEDOUT: 'loggedOut',
      FOR_ADMIN: 'isAdmin'
    },
  },
  restEndPoints: {
    appBaseURL: 'http://3.17.216.66:3000',
    registerUserURL: '/users/register', // completed
    userByEmailURL: '/users/finduserbyemail',// completed
    loginURL: '/users/authenticate', // completed
    updateUserURL: '/users/', // completed,
    getAllPostsURL: '/posts/', // done for admin
    createPostURL: '/posts/createpost',// done
    getPostsURL: '/posts/findpostbyuserid', // sending blank response
    sendFriendReqURL: '/friends/createrequest', //done
    getFriendsURL: '/friends/',
    appHeader: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': ''
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
