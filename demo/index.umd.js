
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
    typeof define === 'function' && define.amd ? define(['vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.demo = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) { if (Object.prototype.hasOwnProperty.call(b, p)) { d[p] = b[p]; } } };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") { r = Reflect.decorate(decorators, target, key, desc); }
        else { for (var i = decorators.length - 1; i >= 0; i--) { if (d = decorators[i]) { r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r; } } }
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    /**
      * vue-class-component v7.2.6
      * (c) 2015-present Evan You
      * @license MIT
      */

    function _typeof(obj) {
      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function (obj) {
          return typeof obj;
        };
      } else {
        _typeof = function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; }

        return arr2;
      }
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); }
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    // The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
    // which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
    // Without this check consumers will encounter hard to track down runtime errors.
    function reflectionIsSupported() {
      return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
    }
    function copyReflectionMetadata(to, from) {
      forwardMetadata(to, from);
      Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
      });
      Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
      });
    }

    function forwardMetadata(to, from, propertyKey) {
      var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
      metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

        if (propertyKey) {
          Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        } else {
          Reflect.defineMetadata(metaKey, metadata, to);
        }
      });
    }

    var fakeArray = {
      __proto__: []
    };
    var hasProto = fakeArray instanceof Array;
    function isPrimitive(value) {
      var type = _typeof(value);

      return value == null || type !== 'object' && type !== 'function';
    }

    function collectDataFromConstructor(vm, Component) {
      // override _init to prevent to init as Vue instance
      var originalInit = Component.prototype._init;

      Component.prototype._init = function () {
        var _this = this;

        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

        if (vm.$options.props) {
          for (var key in vm.$options.props) {
            if (!vm.hasOwnProperty(key)) {
              keys.push(key);
            }
          }
        }

        keys.forEach(function (key) {
          Object.defineProperty(_this, key, {
            get: function get() {
              return vm[key];
            },
            set: function set(value) {
              vm[key] = value;
            },
            configurable: true
          });
        });
      }; // should be acquired class property values


      var data = new Component(); // restore original _init to avoid memory leak (#209)

      Component.prototype._init = originalInit; // create plain data object

      var plainData = {};
      Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
          plainData[key] = data[key];
        }
      });

      return plainData;
    }

    var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
    ];
    function componentFactory(Component) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      options.name = options.name || Component._componentTag || Component.name; // prototype props.

      var proto = Component.prototype;
      Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
          return;
        } // hooks


        if ($internalHooks.indexOf(key) > -1) {
          options[key] = proto[key];
          return;
        }

        var descriptor = Object.getOwnPropertyDescriptor(proto, key);

        if (descriptor.value !== void 0) {
          // methods
          if (typeof descriptor.value === 'function') {
            (options.methods || (options.methods = {}))[key] = descriptor.value;
          } else {
            // typescript decorated data
            (options.mixins || (options.mixins = [])).push({
              data: function data() {
                return _defineProperty({}, key, descriptor.value);
              }
            });
          }
        } else if (descriptor.get || descriptor.set) {
          // computed properties
          (options.computed || (options.computed = {}))[key] = {
            get: descriptor.get,
            set: descriptor.set
          };
        }
      });
      (options.mixins || (options.mixins = [])).push({
        data: function data() {
          return collectDataFromConstructor(this, Component);
        }
      }); // decorate options

      var decorators = Component.__decorators__;

      if (decorators) {
        decorators.forEach(function (fn) {
          return fn(options);
        });
        delete Component.__decorators__;
      } // find super


      var superProto = Object.getPrototypeOf(Component.prototype);
      var Super = superProto instanceof Vue__default['default'] ? superProto.constructor : Vue__default['default'];
      var Extended = Super.extend(options);
      forwardStaticMembers(Extended, Component, Super);

      if (reflectionIsSupported()) {
        copyReflectionMetadata(Extended, Component);
      }

      return Extended;
    }
    var shouldIgnore = {
      prototype: true,
      arguments: true,
      callee: true,
      caller: true
    };

    function forwardStaticMembers(Extended, Original, Super) {
      // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
      Object.getOwnPropertyNames(Original).forEach(function (key) {
        // Skip the properties that should not be overwritten
        if (shouldIgnore[key]) {
          return;
        } // Some browsers does not allow reconfigure built-in properties


        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

        if (extendedDescriptor && !extendedDescriptor.configurable) {
          return;
        }

        var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.

        if (!hasProto) {
          // Only `cid` is explicitly exluded from property forwarding
          // because we cannot detect whether it is a inherited property or not
          // on the no `__proto__` environment even though the property is reserved.
          if (key === 'cid') {
            return;
          }

          var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

          if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
            return;
          }
        } // Warn if the users manually declare reserved properties

        Object.defineProperty(Extended, key, descriptor);
      });
    }

    function Component(options) {
      if (typeof options === 'function') {
        return componentFactory(options);
      }

      return function (Component) {
        return componentFactory(Component, options);
      };
    }

    Component.registerHooks = function registerHooks(keys) {
      $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
    };

    (undefined && undefined.__spreadArrays) || function () {
        var arguments$1 = arguments;

        for (var s = 0, i = 0, il = arguments.length; i < il; i++) { s += arguments$1[i].length; }
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            { for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                { r[k] = a[j]; } }
        return r;
    };

    var Demo = /** @class */ (function (_super) {
        __extends(Demo, _super);
        function Demo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.message = 'vue+ts+rollup';
            return _this;
        }
        // 防止在ts-vue 使用use 方法出错
        Demo.install = function (vue) { };
        Demo = __decorate([
            Component({
                name: 'demo',
            })
        ], Demo);
        return Demo;
    }(Vue__default['default']));

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    var isOldIE = typeof navigator !== 'undefined' &&
        /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
    function createInjector(context) {
        return function (id, style) { return addStyle(id, style); };
    }
    var HEAD;
    var styles = {};
    function addStyle(id, css) {
        var group = isOldIE ? css.media || 'default' : id;
        var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
        if (!style.ids.has(id)) {
            style.ids.add(id);
            var code = css.source;
            if (css.map) {
                // https://developer.chrome.com/devtools/docs/javascript-debugging
                // this makes source maps inside style tags work properly in Chrome
                code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
                // http://stackoverflow.com/a/26603875
                code +=
                    '\n/*# sourceMappingURL=data:application/json;base64,' +
                        btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                        ' */';
            }
            if (!style.element) {
                style.element = document.createElement('style');
                style.element.type = 'text/css';
                if (css.media)
                    { style.element.setAttribute('media', css.media); }
                if (HEAD === undefined) {
                    HEAD = document.head || document.getElementsByTagName('head')[0];
                }
                HEAD.appendChild(style.element);
            }
            if ('styleSheet' in style.element) {
                style.styles.push(code);
                style.element.styleSheet.cssText = style.styles
                    .filter(Boolean)
                    .join('\n');
            }
            else {
                var index = style.ids.size - 1;
                var textNode = document.createTextNode(code);
                var nodes = style.element.childNodes;
                if (nodes[index])
                    { style.element.removeChild(nodes[index]); }
                if (nodes.length)
                    { style.element.insertBefore(textNode, nodes[index]); }
                else
                    { style.element.appendChild(textNode); }
            }
        }
    }

    /* script */
    var __vue_script__ = Demo;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c("div", { staticClass: "demo" }, [_vm._v(_vm._s(_vm.message))])
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = function (inject) {
        if (!inject) { return }
        inject("data-v-21c09ea8_0", { source: ".demo[data-v-21c09ea8] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  font-size: 20px;\n}\n\n/*# sourceMappingURL=demo.vue.map */", map: {"version":3,"sources":["/Users/opera/Documents/npm/rollup-vue-components-ts/src/demo.vue","demo.vue"],"names":[],"mappings":"AAkBA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,qBAAA;EACA,eAAA;ACjBA;;AAEA,mCAAmC","file":"demo.vue","sourcesContent":["<template>\n  <div class=\"demo\">{{ message }}</div>\n</template>\n\n<script lang=\"ts\">\nimport { Component, Vue } from 'vue-property-decorator'\n\n@Component({\n  name: 'demo',\n})\nexport default class Demo extends Vue {\n  // 防止在ts-vue 使用use 方法出错\n  static install(vue: typeof Vue): void {}\n  message: string = 'vue+ts+rollup'\n}\n</script>\n\n<style lang=\"scss\" scoped>\n.demo {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  font-size: 20px;\n}\n</style>\n",".demo {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-content: center;\n  font-size: 20px;\n}\n\n/*# sourceMappingURL=demo.vue.map */"]}, media: undefined });

      };
      /* scoped */
      var __vue_scope_id__ = "data-v-21c09ea8";
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        createInjector,
        undefined,
        undefined
      );

    var components = [__vue_component__];
    var install = function (Vue) {
        if (install.installed)
            { return; }
        install.installed = true;
        components.forEach(function (component) {
            Vue.component(component.extendOptions.name, component);
        });
    };
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue);
    }
    var index = {
        install: install,
    };

    return index;

})));
