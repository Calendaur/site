/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./worker/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function receivePushNotification(event) {\n  try {\n    const releases = event.data.json()\n\n    let options\n\n    if (releases.length === 1) {\n      const [release] = releases\n\n      options = {\n        title: release.title,\n        data: `https://released.at/release/${release.release_id}`,\n        body: release.description,\n        icon: 'https://released.at/images/logo.png',\n        vibrate: [200, 100, 200],\n        tag: 'Released',\n        image: release.cover,\n        badge: 'https://released.at/images/logo.png',\n      }\n    } else if (releases.length === 2) {\n      options = {\n        title: `Сегодня вышли: ${releases.map(re => re.title).join(', ')}`,\n        data: `https://released.at/me`,\n        icon: 'https://released.at/images/logo.png',\n        vibrate: [200, 100, 200],\n        tag: 'Released',\n        image: releases[0].cover,\n        badge: 'https://released.at/images/logo.png',\n        actions: releases.map(re => ({\n          action: `https://released.at/release/${re.release_id}`,\n          title: re.title,\n        })),\n      }\n    } else {\n      options = {\n        title: `Сегодня вышли: ${releases.map(re => re.title).join(', ')}`,\n        data: `https://released.at/me`,\n        icon: 'https://released.at/images/logo.png',\n        vibrate: [200, 100, 200],\n        tag: 'Released',\n        image: releases[0].cover,\n        badge: 'https://released.at/images/logo.png',\n        actions: [\n          { action: `https://released.at/me`, title: 'В личный кабинет' },\n        ],\n      }\n    }\n\n    const { title, ...rest } = options\n    event.waitUntil(self.registration.showNotification(title, rest))\n  } catch (e) {\n    console.error('receive error', e)\n  }\n}\n\nfunction openPushNotification(event) {\n  try {\n    event.notification.close()\n\n    clients.openWindow('https://released.at/me')\n\n    if (typeof event.action === 'string') {\n      clients.openWindow(event.action)\n    }\n  } catch (e) {\n    console.error('open error', e)\n  }\n}\n\nself.addEventListener('push', receivePushNotification)\nself.addEventListener('notificationclick', openPushNotification)\n\n\n//# sourceURL=webpack:///./worker/index.js?");

/***/ })

/******/ });