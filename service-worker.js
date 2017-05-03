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

var precacheConfig = [["app/src/app.html","54904267134e06709a0a4bb99e4b8afc"],["app/src/app.js","9d5198a2483a7a32d57b837e6aa502b3"],["app/src/app.js.map","1b47b955da24872ddd08990fc8c938ae"],["app/src/components/checkbox.html","16601f77b957fcc0a8e61272b980fa27"],["app/src/components/file-list/file-list.html","31053dc40553cb10190005eaa6d29bb9"],["app/src/components/file-list/file-list.js","3af9b2d19a56a7b1e8fb6a1add04a7b2"],["app/src/components/file-list/file-list.js.map","7062c39202db0d59e62f53fe931e9893"],["app/src/components/icons/icons.html","467e0e1272b09fa74b6d9982397a05a9"],["app/src/components/pragma-editor/pragma-editor.html","1c621a1952a6aca72b11959538a522bf"],["app/src/components/pragma-editor/pragma-editor.js","a2aa55649da16a3f250f49a3fb7ec298"],["app/src/components/pragma-editor/pragma-editor.js.map","fb3866d915425362608f218650d5e17e"],["app/src/lib/code-gen.js","bd94026f5f2f0acce891e5369cbffd3c"],["app/src/lib/code-gen.js.map","cf893f6042a754f5f039fb8ebeab3c39"],["app/src/lib/package.json.js","f89cf88dc4bd256f6932b7e3b64f57d4"],["app/src/lib/package.json.js.map","5dcd113030f7b3d66840880e76a4c8e4"],["app/src/lib/task-runner.js","41c7ae3577a9495f7ff1dfb1beedcc96"],["app/src/lib/task-runner.js.map","62a75f12f553f8fa1543ceb56bab15e5"],["app/src/lib/web-project.js","6dda37b42fed2b16340ba9cbb55f550e"],["app/src/lib/web-project.js.map","43b2b1e43090b8b3362f1c4bceeb79c6"],["app/src/main.js","9188ff1617319be33aaadfb05789b2bf"],["app/src/main.js.map","5cf4acce0426a01eac2abb3528741a0a"],["app/src/menu-items.js","50c2ac71d08c28ee456a46cf7d1d8b62"],["app/src/menu-items.js.map","b6b4d33f5ee7588335e09aba33557426"],["app/src/vendor-build.js","85aff1fc036be0b8f1cf94314e8a6c4d"],["app/src/views/icons/icons-assist.html","9fc8165ab8fef2b9346887fba421f4d8"],["app/src/views/icons/icons.css","7b93aa35cb34058f728ec1059b462718"],["app/src/views/icons/icons.css.map","797d65fddf1f3344c23860b4708c782f"],["app/src/views/icons/icons.html","cc464e28f50fd9f99668deaef369aab3"],["app/src/views/icons/icons.js","e0b4363a3d41caafd60de0de6dbece95"],["app/src/views/icons/icons.js.map","e5f392b9a3cac40d69c7b14677d53b20"],["app/src/views/new-project/new-project.html","d3168f1584d15ef047e78a56a05515f1"],["app/src/views/new-project/new-project.js","9dbfe6b4985f5769c40b410ec1a2740f"],["app/src/views/new-project/new-project.js.map","ca68cf6b3185802897d1e4644a3bbe1f"],["app/src/views/packages/packages.html","cc464e28f50fd9f99668deaef369aab3"],["app/src/views/packages/packages.js","38ab8cdf9405f8f79857e2227ba7ae58"],["app/src/views/packages/packages.js.map","e40845a064a40785db048317fd11c750"],["app/src/views/project/project-assist.html","33c919ad3c0f12144e72a418c162a401"],["app/src/views/project/project.css","a3cd198cd067434f141306804c8815bc"],["app/src/views/project/project.css.map","d13f22b93a91ef5870e1dab7aafb899a"],["app/src/views/project/project.html","5daf967d6c59fe28d566d1dde85d7eb3"],["app/src/views/project/project.js","3305fc78e562fc65097cf8c88b57c93f"],["app/src/views/project/project.js.map","b025e1dc5f229f20776544924a5d7bde"],["app/src/views/screen-templates/screen-templates-assist.html","18c9e431c36ee2339baa1e9c7cfc886d"],["app/src/views/screen-templates/screen-templates.html","cc464e28f50fd9f99668deaef369aab3"],["app/src/views/screen-templates/screen-templates.js","337ae349a2bce952cb9da54fc200cc88"],["app/src/views/screen-templates/screen-templates.js.map","ead649c163422845918c8adab99ee0aa"],["app/src/views/view-base.js","840132e3706bdf84d1e0dbe7e1498e62"],["app/src/views/view-base.js.map","97f5930a27415745228595e3227ed97b"],["app/src/views/welcome/welcome-assist.html","5047acf5d17ae977ac3069e1cf427b5b"],["app/src/views/welcome/welcome.html","3447ce59d8704c475865819a00bd326e"],["app/src/views/welcome/welcome.js","f1e26cdb61ec2eafbb5ad0ceef83dcf7"],["app/src/views/welcome/welcome.js.map","166925943b5a106bd49a216ee74f02cf"],["config.js","97d2b1a3bbd64a4057c972e19f0d02f4"],["images/app.svg","c91b40bf4094f2a92c683600b49d58fc"],["index.html","0fc4d53d870fb5247fc1f5812229dfc7"],["jspm_packages/system.js","79eee2df13bb5a04060affd2fb3afd93"],["styles/desktop.css","b5713078dbfe74efeafc29ab3cb2a7b3"],["styles/style.css","ceccc1a238c522628c2e8d254f8c111f"],["styles/views/icons.css","07284c4f104a2811b418754ea1ee1d0a"]];
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







