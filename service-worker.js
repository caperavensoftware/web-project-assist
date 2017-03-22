/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["app/src/app.html","94715c21d62c42f3aef0addc3aa3acd6"],["app/src/app.js","548e0ea8b1d34a43a732630c942801c4"],["app/src/app.js.map","fbad07d128110f765eb7db9981194979"],["app/src/components/icons/icons.html","7ccf8ad35ca976c49535e56b17328584"],["app/src/components/input-composite/input-composite.html","fc062a22c67b2e5d5537ff9c5369e8a7"],["app/src/components/input-composite/input-composite.js","297b09a7bed22b4c02f925a8388ad4e4"],["app/src/components/input-composite/input-composite.js.map","b92713c87c032fbd20853dbaf0d85f1c"],["app/src/components/main-menu/main-menu.html","eafd5a525d670038097d738e81aa44fb"],["app/src/components/main-menu/main-menu.js","1fc96212e585cc5f45d2b53b6aabce8b"],["app/src/components/main-menu/main-menu.js.map","567890f7221bb92b0badf60187f078ab"],["app/src/components/main-menu/menu-items.js","30996acc6e823fbf1d5d4117ffcd4436"],["app/src/components/main-menu/menu-items.js.map","f79369003fd316019eaa627fa9d14593"],["app/src/lib/code-gen.js","dc576d0f95c87d8a15ae5f125652cd46"],["app/src/lib/code-gen.js.map","e0a5a4584c94c0c3878ac4713fcff104"],["app/src/lib/package.json.js","81a3826e19729ab9df0bdd6cfa8eb9f6"],["app/src/lib/package.json.js.map","ac187c64a8b60ac59d979baf2d0f4d15"],["app/src/lib/web-project.js","d6c6ca3df429451f52e19c4996973d05"],["app/src/lib/web-project.js.map","c36ba207adc5f98c29bbc6f14c12dd88"],["app/src/main.js","e5af4ca83c722c55e54686455ea8858e"],["app/src/main.js.map","7055f440621ac95ef8d35a017eb76d8c"],["app/src/menu-items.js","6d99de72de76e7044f9dc298e80b8d8d"],["app/src/menu-items.js.map","3ed748330d5edef5da3d5a9cb25dc904"],["app/src/vendor-build.js","58dbbdee87ab9b7ad9f3b740c5bec366"],["app/src/views/new-project/new-project.html","8f1c58da0d9f2fbfb9180bd55c78aa76"],["app/src/views/new-project/new-project.js","e87774a8c9f1c2b65b08eaa674540ae6"],["app/src/views/new-project/new-project.js.map","14f0757de8ee65aac55f18373534b87f"],["app/src/views/project/project.html","3cfd7c9523fe3c1a29ae803947573b31"],["app/src/views/project/project.js","56b10d16f7a8d5c7bbb00dc01eb849f1"],["app/src/views/project/project.js.map","68590c8428a44b1ff2c02738307854ea"],["app/src/views/view-base.js","000012bd1aa0abb47c1c8e177c2b064b"],["app/src/views/view-base.js.map","6dc445bd9cbeecc822169a8457f41850"],["app/src/views/welcome/welcome.html","5b53169cbc504774e8bb09d95749ff80"],["app/src/views/welcome/welcome.js","bc212913bcafb5733cc2f48a7ca3bf1c"],["app/src/views/welcome/welcome.js.map","6614be511e198d0a497174bf8103b028"],["config.js","ba9a464b7c3e6f110069ba0f87681f6e"],["images/app.svg","c91b40bf4094f2a92c683600b49d58fc"],["index.html","613682775d82925c6482f5174f0c4b3e"],["jspm_packages/system.js","79eee2df13bb5a04060affd2fb3afd93"],["styles/desktop.css","fb35149fe8c08660f3e994ddfece80d7"],["styles/desktop/app.css","fbdeebc71d54d551c487a07488b4129b"],["styles/desktop/assistant.css","3504c4a9aafd625dd3806511ee409878"],["styles/desktop/input-composite.css","f72104f7ed3fe8f0cc5b021a6de06ea3"],["styles/desktop/master-detail.css","5b5b72eb5e8228e0ba3de5002a4cfbea"],["styles/desktop/menu.css","104fa80ff6dbb56a8a50045153919846"],["styles/mobile.css","7fbbd7041ea9b4822e0f269e042d7a5d"],["styles/mobile/app.css","285c59514fdd52a9506e98f1bbbb4a34"],["styles/mobile/assistant.css","8cfb0a071683b35b9acf854d6876f1f4"],["styles/normalize.css","761126c20e2413ab7c7126cca83d9f22"],["styles/style.css","b1f34e0dd6a195c65e7ff24de5d51567"]];
var cacheName = 'sw-precache-v2-untitled-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







