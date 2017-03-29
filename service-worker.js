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

var precacheConfig = [["app/src/app.html","54904267134e06709a0a4bb99e4b8afc"],["app/src/app.js","e9f578c7736e4472476d9159d263f536"],["app/src/app.js.map","61d6d9c765b448a54937537e38021361"],["app/src/components/file-list/file-list.html","0f50265d1ed2ea15b59204f872163d45"],["app/src/components/file-list/file-list.js","c0708196ef5acd71f27f1e01b74ec03a"],["app/src/components/file-list/file-list.js.map","cbd85816a9070401efcf4a8ff6f76424"],["app/src/components/icons/icons.html","7ccf8ad35ca976c49535e56b17328584"],["app/src/components/input-composite/input-composite.html","fc062a22c67b2e5d5537ff9c5369e8a7"],["app/src/components/input-composite/input-composite.js","297b09a7bed22b4c02f925a8388ad4e4"],["app/src/components/input-composite/input-composite.js.map","b92713c87c032fbd20853dbaf0d85f1c"],["app/src/components/main-menu/main-menu.html","eafd5a525d670038097d738e81aa44fb"],["app/src/components/main-menu/main-menu.js","1fc96212e585cc5f45d2b53b6aabce8b"],["app/src/components/main-menu/main-menu.js.map","567890f7221bb92b0badf60187f078ab"],["app/src/components/main-menu/menu-items.js","30996acc6e823fbf1d5d4117ffcd4436"],["app/src/components/main-menu/menu-items.js.map","f79369003fd316019eaa627fa9d14593"],["app/src/components/pragma-editor/editor-factory.js","5c5fe4356c3ba06e848f9e35bb0838a3"],["app/src/components/pragma-editor/editor-factory.js.map","43b98813a8996853bc6f99cb064fe6a8"],["app/src/components/pragma-editor/pragma-editor.html","1c621a1952a6aca72b11959538a522bf"],["app/src/components/pragma-editor/pragma-editor.js","a2aa55649da16a3f250f49a3fb7ec298"],["app/src/components/pragma-editor/pragma-editor.js.map","fb3866d915425362608f218650d5e17e"],["app/src/components/pragma-messages/pragma-messages.html","2e7aa04cb8adbf9f4b47e1677e451752"],["app/src/components/pragma-messages/pragma-messages.js","bb192f04aadea1dcf43d8ab7a2ca26d1"],["app/src/components/pragma-messages/pragma-messages.js.map","c3a932fba076be04d9901ef0b036a4bf"],["app/src/lib/code-gen.js","dc576d0f95c87d8a15ae5f125652cd46"],["app/src/lib/code-gen.js.map","e0a5a4584c94c0c3878ac4713fcff104"],["app/src/lib/package.json.js","81a3826e19729ab9df0bdd6cfa8eb9f6"],["app/src/lib/package.json.js.map","ac187c64a8b60ac59d979baf2d0f4d15"],["app/src/lib/task-runner.js","c243140314ea2ef607be9d1de99c55ed"],["app/src/lib/task-runner.js.map","bbe5b7250263ee4db0c850b157f5cf5c"],["app/src/lib/web-project.js","6dda37b42fed2b16340ba9cbb55f550e"],["app/src/lib/web-project.js.map","43b2b1e43090b8b3362f1c4bceeb79c6"],["app/src/main.js","23d4726a2c6fcf09b8038a3ef1a587b3"],["app/src/main.js.map","ad10249dabf81e242e6790ac45febc90"],["app/src/menu-items.js","be60d3d43b806fc10cc2247cdd9980e3"],["app/src/menu-items.js.map","43a8b678f746283df098a76e96105c3a"],["app/src/vendor-build.js","798eb312ae81fa873024548bcc356423"],["app/src/views/new-project/new-project.html","d3168f1584d15ef047e78a56a05515f1"],["app/src/views/new-project/new-project.js","9dbfe6b4985f5769c40b410ec1a2740f"],["app/src/views/new-project/new-project.js.map","ca68cf6b3185802897d1e4644a3bbe1f"],["app/src/views/project/new-component.html","718996616fd4a46e9e1c8a2a864190c3"],["app/src/views/project/new-component.js","9178bd99b8a2f4a72ff101151ffeb9a3"],["app/src/views/project/new-component.js.map","e391b0f04e5264d814824bd1d361f0af"],["app/src/views/project/project-assist.html","a5c409095527808a2a9c865e891c48c3"],["app/src/views/project/project.css","ca2036df86bae61f7cc737f1a7c3d165"],["app/src/views/project/project.css.map","9e3d4a9bb887a04a07e747715be4c70c"],["app/src/views/project/project.html","5daf967d6c59fe28d566d1dde85d7eb3"],["app/src/views/project/project.js","6219a797b485f44208fa44aaaa6ecbe5"],["app/src/views/project/project.js.map","7d358d61b54a3c41320c25e0220ec202"],["app/src/views/screen-templates/screen-templates-assist.html","18c9e431c36ee2339baa1e9c7cfc886d"],["app/src/views/screen-templates/screen-templates.html","27a514ac73116e1dee46fb87963586b6"],["app/src/views/screen-templates/screen-templates.js","69f3f5872a08fa4f0b7c029e2df144d6"],["app/src/views/screen-templates/screen-templates.js.map","96f820663b65117d57fad0bfc82e3bbf"],["app/src/views/view-base.js","840132e3706bdf84d1e0dbe7e1498e62"],["app/src/views/view-base.js.map","97f5930a27415745228595e3227ed97b"],["app/src/views/welcome/welcome-assist.html","5047acf5d17ae977ac3069e1cf427b5b"],["app/src/views/welcome/welcome.html","3447ce59d8704c475865819a00bd326e"],["app/src/views/welcome/welcome.js","f1e26cdb61ec2eafbb5ad0ceef83dcf7"],["app/src/views/welcome/welcome.js.map","166925943b5a106bd49a216ee74f02cf"],["config.js","dd42ae0f9fdd82f320e763128cf2c774"],["images/app.svg","c91b40bf4094f2a92c683600b49d58fc"],["index.html","0fc4d53d870fb5247fc1f5812229dfc7"],["jspm_packages/system.js","eccc019329febb5a1b06bde008ca5614"],["styles/desktop.css","b5713078dbfe74efeafc29ab3cb2a7b3"],["styles/style.css","926780bac6e2ed37494925445c33cdd0"]];
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







