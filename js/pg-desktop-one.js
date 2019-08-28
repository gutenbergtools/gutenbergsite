/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.18 Copyright (c) 2010-2015, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */

/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */

/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */

/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */

/*!
 * jQuery UI Menu 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/menu/
 */

/*!
 * jQuery UI Autocomplete 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/autocomplete/
 */

/*!
 * jQuery UI Button 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 */

/*!
 * jQuery UI Mouse 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */

/*!
 * jQuery UI Draggable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */

/*!
 * jQuery UI Resizable 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/resizable/
 */

/*!
 * jQuery UI Dialog 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/dialog/
 */

/*!
 * jQuery UI Tabs 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/tabs/
 */

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */

/*
 * pg-desktop.js Project Gutenberg Website
 *
 * Copyright 2010-2014 Marcello Perathoner <webmaster@gutenberg.org>
 * Licensed under GPL version 3.0 or later.
 */

function open_share_popup(url, target, w, h) {
    var x = (window.screen.width - w) / 2, y = (window.screen.height - h) / 2;
    window.open(url, target, "width=" + w + ",height=" + h + ",left=" + x + ",top=" + y + ",status=1,resizable=0");
}

function init_help_button() {
    $("#help-button").click(function() {
        $("#helpbox").slideToggle("fast");
    }), $("#helpbox").click(function() {
        $(this).slideUp("fast");
    });
}

function dropbox_push(url, filename) {
    $.getScript("https://www.dropbox.com/static/api/2/dropins.js").done(function() {
        Dropbox.appKey = dropbox_app_key;
        var options = {
            files: [ {
                url: url,
                filename: filename
            } ],
            success: function() {
                alert("done");
            },
            error: function(errorMessage) {
                alert(errorMessage);
            }
        };
        Dropbox.save(options);
    });
}

function fb_post_to_feed(url, title, description, icon) {
    function callback() {}
    var obj = {
        method: "feed",
        redirect_uri: "https://www.gutenberg.org/fb_redirect.html",
        link: url,
        picture: icon,
        name: title,
        caption: url,
        description: description,
        ref: "bibrec"
    };
    FB.ui(obj, callback);
}

function get_logo_token() {
    var logo = $("#logo .icon"), token = logo.attr("id");
    $.cookie("bonus", token, {
        path: "/",
        domain: "gutenberg.org"
    });
}

function init_search_dropdown() {
    function extractLast(term) {
        return term.split(/\s+/).pop();
    }
    var search = $("#search-input");
    search.attr("placeholder", search.attr("title")), search.autocomplete({
        minLength: 4,
        delay: 500,
        source: function(request, response) {
            $.ajax({
                url: json_search,
                data: {
                    query: request.term
                },
                dataType: "json",
                cache: !1,
                xhrFields: {
                    withCredentials: !0
                }
            }).done(function(data) {
                response(data[1]);
            });
        },
        search: function() {
            var term = extractLast(this.value);
            return term.length < 4 ? !1 : void 0;
        },
        focus: function() {
            return !1;
        },
        position: {
            my: "left top",
            at: "left bottom",
            of: "#search-input-cell"
        }
    }), search.bind("keydown", function(event) {
        event.keyCode === $.ui.keyCode.TAB && $(this).data("autocomplete").menu.active && event.preventDefault();
    }), search.focus(function() {
        $("#search form").addClass("focused");
    }), search.blur(function() {
        $("#search form").removeClass("focused");
    });
}

function printpage() {
    $("#tabs").tabs("destroy"), $(".noprint").hide(), $(".noscreen").show(), window.print();
}

function screen_mode() {
    $(".noprint").show(), $(".noscreen").hide(), $("#tabs").tabs(), window.location.hash && $("#tabs").tabs("select", window.location.hash);
}

function doc_ready(jquery) {
    jquery(document).ready(function() {
        if (get_logo_token(), screen_mode(), init_help_button(), init_search_dropdown(), 
        "" !== dialog_message) {
            var dlg = jquery("#dialog");
            dlg && (dlg.append("<p>" + dialog_message + "</p>"), dlg.dialog({
                title: dialog_title,
                resizable: !1,
                modal: !0,
                buttons: {
                    Ok: function() {
                        jquery(this).dialog("close");
                    }
                }
            }));
        }
    });
}

var requirejs, require, define;

!function(global) {
    function isFunction(it) {
        return "[object Function]" === ostring.call(it);
    }
    function isArray(it) {
        return "[object Array]" === ostring.call(it);
    }
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length && (!ary[i] || !func(ary[i], i, ary)); i += 1) ;
        }
    }
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1 && (!ary[i] || !func(ary[i], i, ary)); i -= 1) ;
        }
    }
    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }
    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) if (hasProp(obj, prop) && func(obj[prop], prop)) break;
    }
    function mixin(target, source, force, deepStringMixin) {
        return source && eachProp(source, function(value, prop) {
            (force || !hasProp(target, prop)) && (!deepStringMixin || "object" != typeof value || !value || isArray(value) || isFunction(value) || value instanceof RegExp ? target[prop] = value : (target[prop] || (target[prop] = {}), 
            mixin(target[prop], value, force, deepStringMixin)));
        }), target;
    }
    function bind(obj, fn) {
        return function() {
            return fn.apply(obj, arguments);
        };
    }
    function scripts() {
        return document.getElementsByTagName("script");
    }
    function defaultOnError(err) {
        throw err;
    }
    function getGlobal(value) {
        if (!value) return value;
        var g = global;
        return each(value.split("."), function(part) {
            g = g[part];
        }), g;
    }
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + "\nhttp://requirejs.org/docs/errors.html#" + id);
        return e.requireType = id, e.requireModules = requireModules, err && (e.originalError = err), 
        e;
    }
    function newContext(contextName) {
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) if (part = ary[i], "." === part) ary.splice(i, 1), 
            i -= 1; else if (".." === part) {
                if (0 === i || 1 === i && ".." === ary[2] || ".." === ary[i - 1]) continue;
                i > 0 && (ary.splice(i - 1, 2), i -= 2);
            }
        }
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex, foundMap, foundI, foundStarMap, starI, normalizedBaseParts, baseParts = baseName && baseName.split("/"), map = config.map, starMap = map && map["*"];
            if (name && (name = name.split("/"), lastIndex = name.length - 1, config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex]) && (name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, "")), 
            "." === name[0].charAt(0) && baseParts && (normalizedBaseParts = baseParts.slice(0, baseParts.length - 1), 
            name = normalizedBaseParts.concat(name)), trimDots(name), name = name.join("/")), 
            applyMap && map && (baseParts || starMap)) {
                nameParts = name.split("/");
                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    if (nameSegment = nameParts.slice(0, i).join("/"), baseParts) for (j = baseParts.length; j > 0; j -= 1) if (mapValue = getOwn(map, baseParts.slice(0, j).join("/")), 
                    mapValue && (mapValue = getOwn(mapValue, nameSegment))) {
                        foundMap = mapValue, foundI = i;
                        break outerLoop;
                    }
                    !foundStarMap && starMap && getOwn(starMap, nameSegment) && (foundStarMap = getOwn(starMap, nameSegment), 
                    starI = i);
                }
                !foundMap && foundStarMap && (foundMap = foundStarMap, foundI = starI), foundMap && (nameParts.splice(0, foundI, foundMap), 
                name = nameParts.join("/"));
            }
            return pkgMain = getOwn(config.pkgs, name), pkgMain ? pkgMain : name;
        }
        function removeScript(name) {
            isBrowser && each(scripts(), function(scriptNode) {
                return scriptNode.getAttribute("data-requiremodule") === name && scriptNode.getAttribute("data-requirecontext") === context.contextName ? (scriptNode.parentNode.removeChild(scriptNode), 
                !0) : void 0;
            });
        }
        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            return pathConfig && isArray(pathConfig) && pathConfig.length > 1 ? (pathConfig.shift(), 
            context.require.undef(id), context.makeRequire(null, {
                skipMap: !0
            })([ id ]), !0) : void 0;
        }
        function splitPrefix(name) {
            var prefix, index = name ? name.indexOf("!") : -1;
            return index > -1 && (prefix = name.substring(0, index), name = name.substring(index + 1, name.length)), 
            [ prefix, name ];
        }
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts, prefix = null, parentName = parentModuleMap ? parentModuleMap.name : null, originalName = name, isDefine = !0, normalizedName = "";
            return name || (isDefine = !1, name = "_@r" + (requireCounter += 1)), nameParts = splitPrefix(name), 
            prefix = nameParts[0], name = nameParts[1], prefix && (prefix = normalize(prefix, parentName, applyMap), 
            pluginModule = getOwn(defined, prefix)), name && (prefix ? normalizedName = pluginModule && pluginModule.normalize ? pluginModule.normalize(name, function(name) {
                return normalize(name, parentName, applyMap);
            }) : -1 === name.indexOf("!") ? normalize(name, parentName, applyMap) : name : (normalizedName = normalize(name, parentName, applyMap), 
            nameParts = splitPrefix(normalizedName), prefix = nameParts[0], normalizedName = nameParts[1], 
            isNormalized = !0, url = context.nameToUrl(normalizedName))), suffix = !prefix || pluginModule || isNormalized ? "" : "_unnormalized" + (unnormalizedCounter += 1), 
            {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ? prefix + "!" + normalizedName : normalizedName) + suffix
            };
        }
        function getModule(depMap) {
            var id = depMap.id, mod = getOwn(registry, id);
            return mod || (mod = registry[id] = new context.Module(depMap)), mod;
        }
        function on(depMap, name, fn) {
            var id = depMap.id, mod = getOwn(registry, id);
            !hasProp(defined, id) || mod && !mod.defineEmitComplete ? (mod = getModule(depMap), 
            mod.error && "error" === name ? fn(mod.error) : mod.on(name, fn)) : "defined" === name && fn(defined[id]);
        }
        function onError(err, errback) {
            var ids = err.requireModules, notified = !1;
            errback ? errback(err) : (each(ids, function(id) {
                var mod = getOwn(registry, id);
                mod && (mod.error = err, mod.events.error && (notified = !0, mod.emit("error", err)));
            }), notified || req.onError(err));
        }
        function takeGlobalQueue() {
            globalDefQueue.length && (apsp.apply(defQueue, [ defQueue.length, 0 ].concat(globalDefQueue)), 
            globalDefQueue = []);
        }
        function cleanRegistry(id) {
            delete registry[id], delete enabledRegistry[id];
        }
        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;
            mod.error ? mod.emit("error", mod.error) : (traced[id] = !0, each(mod.depMaps, function(depMap, i) {
                var depId = depMap.id, dep = getOwn(registry, depId);
                !dep || mod.depMatched[i] || processed[depId] || (getOwn(traced, depId) ? (mod.defineDep(i, defined[depId]), 
                mod.check()) : breakCycle(dep, traced, processed));
            }), processed[id] = !0);
        }
        function checkLoaded() {
            var err, usingPathFallback, waitInterval = 1e3 * config.waitSeconds, expired = waitInterval && context.startTime + waitInterval < new Date().getTime(), noLoads = [], reqCalls = [], stillLoading = !1, needCycleCheck = !0;
            if (!inCheckLoaded) {
                if (inCheckLoaded = !0, eachProp(enabledRegistry, function(mod) {
                    var map = mod.map, modId = map.id;
                    if (mod.enabled && (map.isDefine || reqCalls.push(mod), !mod.error)) if (!mod.inited && expired) hasPathFallback(modId) ? (usingPathFallback = !0, 
                    stillLoading = !0) : (noLoads.push(modId), removeScript(modId)); else if (!mod.inited && mod.fetched && map.isDefine && (stillLoading = !0, 
                    !map.prefix)) return needCycleCheck = !1;
                }), expired && noLoads.length) return err = makeError("timeout", "Load timeout for modules: " + noLoads, null, noLoads), 
                err.contextName = context.contextName, onError(err);
                needCycleCheck && each(reqCalls, function(mod) {
                    breakCycle(mod, {}, {});
                }), expired && !usingPathFallback || !stillLoading || !isBrowser && !isWebWorker || checkLoadedTimeoutId || (checkLoadedTimeoutId = setTimeout(function() {
                    checkLoadedTimeoutId = 0, checkLoaded();
                }, 50)), inCheckLoaded = !1;
            }
        }
        function callGetModule(args) {
            hasProp(defined, args[0]) || getModule(makeModuleMap(args[0], null, !0)).init(args[1], args[2]);
        }
        function removeListener(node, func, name, ieName) {
            node.detachEvent && !isOpera ? ieName && node.detachEvent(ieName, func) : node.removeEventListener(name, func, !1);
        }
        function getScriptData(evt) {
            var node = evt.currentTarget || evt.srcElement;
            return removeListener(node, context.onScriptLoad, "load", "onreadystatechange"), 
            removeListener(node, context.onScriptError, "error"), {
                node: node,
                id: node && node.getAttribute("data-requiremodule")
            };
        }
        function intakeDefines() {
            var args;
            for (takeGlobalQueue(); defQueue.length; ) {
                if (args = defQueue.shift(), null === args[0]) return onError(makeError("mismatch", "Mismatched anonymous define() module: " + args[args.length - 1]));
                callGetModule(args);
            }
        }
        var inCheckLoaded, Module, context, handlers, checkLoadedTimeoutId, config = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        }, registry = {}, enabledRegistry = {}, undefEvents = {}, defQueue = [], defined = {}, urlFetched = {}, bundlesMap = {}, requireCounter = 1, unnormalizedCounter = 1;
        return handlers = {
            require: function(mod) {
                return mod.require ? mod.require : mod.require = context.makeRequire(mod.map);
            },
            exports: function(mod) {
                return mod.usingExports = !0, mod.map.isDefine ? mod.exports ? defined[mod.map.id] = mod.exports : mod.exports = defined[mod.map.id] = {} : void 0;
            },
            module: function(mod) {
                return mod.module ? mod.module : mod.module = {
                    id: mod.map.id,
                    uri: mod.map.url,
                    config: function() {
                        return getOwn(config.config, mod.map.id) || {};
                    },
                    exports: mod.exports || (mod.exports = {})
                };
            }
        }, Module = function(map) {
            this.events = getOwn(undefEvents, map.id) || {}, this.map = map, this.shim = getOwn(config.shim, map.id), 
            this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, 
            this.depCount = 0;
        }, Module.prototype = {
            init: function(depMaps, factory, errback, options) {
                options = options || {}, this.inited || (this.factory = factory, errback ? this.on("error", errback) : this.events.error && (errback = bind(this, function(err) {
                    this.emit("error", err);
                })), this.depMaps = depMaps && depMaps.slice(0), this.errback = errback, this.inited = !0, 
                this.ignore = options.ignore, options.enabled || this.enabled ? this.enable() : this.check());
            },
            defineDep: function(i, depExports) {
                this.depMatched[i] || (this.depMatched[i] = !0, this.depCount -= 1, this.depExports[i] = depExports);
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, context.startTime = new Date().getTime();
                    var map = this.map;
                    return this.shim ? void context.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return map.prefix ? this.callPlugin() : this.load();
                    })) : map.prefix ? this.callPlugin() : this.load();
                }
            },
            load: function() {
                var url = this.map.url;
                urlFetched[url] || (urlFetched[url] = !0, context.load(this.map.id, url));
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var err, cjsModule, id = this.map.id, depExports = this.depExports, exports = this.exports, factory = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error); else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(factory)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        exports = context.execCb(id, factory, depExports, exports);
                                    } catch (e) {
                                        err = e;
                                    } else exports = context.execCb(id, factory, depExports, exports);
                                    if (this.map.isDefine && void 0 === exports && (cjsModule = this.module, cjsModule ? exports = cjsModule.exports : this.usingExports && (exports = this.exports)), 
                                    err) return err.requireMap = this.map, err.requireModules = this.map.isDefine ? [ this.map.id ] : null, 
                                    err.requireType = this.map.isDefine ? "define" : "require", onError(this.error = err);
                                } else exports = factory;
                                this.exports = exports, this.map.isDefine && !this.ignore && (defined[id] = exports, 
                                req.onResourceLoad && req.onResourceLoad(context, this.map, this.depMaps)), cleanRegistry(id), 
                                this.defined = !0;
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, 
                            this.emit("defined", this.exports), this.defineEmitComplete = !0);
                        }
                    } else this.fetch();
                }
            },
            callPlugin: function() {
                var map = this.map, id = map.id, pluginMap = makeModuleMap(map.prefix);
                this.depMaps.push(pluginMap), on(pluginMap, "defined", bind(this, function(plugin) {
                    var load, normalizedMap, normalizedMod, bundleId = getOwn(bundlesMap, this.map.id), name = this.map.name, parentName = this.map.parentMap ? this.map.parentMap.name : null, localRequire = context.makeRequire(map.parentMap, {
                        enableBuildCallback: !0
                    });
                    return this.map.unnormalized ? (plugin.normalize && (name = plugin.normalize(name, function(name) {
                        return normalize(name, parentName, !0);
                    }) || ""), normalizedMap = makeModuleMap(map.prefix + "!" + name, this.map.parentMap), 
                    on(normalizedMap, "defined", bind(this, function(value) {
                        this.init([], function() {
                            return value;
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        });
                    })), normalizedMod = getOwn(registry, normalizedMap.id), void (normalizedMod && (this.depMaps.push(normalizedMap), 
                    this.events.error && normalizedMod.on("error", bind(this, function(err) {
                        this.emit("error", err);
                    })), normalizedMod.enable()))) : bundleId ? (this.map.url = context.nameToUrl(bundleId), 
                    void this.load()) : (load = bind(this, function(value) {
                        this.init([], function() {
                            return value;
                        }, null, {
                            enabled: !0
                        });
                    }), load.error = bind(this, function(err) {
                        this.inited = !0, this.error = err, err.requireModules = [ id ], eachProp(registry, function(mod) {
                            0 === mod.map.id.indexOf(id + "_unnormalized") && cleanRegistry(mod.map.id);
                        }), onError(err);
                    }), load.fromText = bind(this, function(text, textAlt) {
                        var moduleName = map.name, moduleMap = makeModuleMap(moduleName), hasInteractive = useInteractive;
                        textAlt && (text = textAlt), hasInteractive && (useInteractive = !1), getModule(moduleMap), 
                        hasProp(config.config, id) && (config.config[moduleName] = config.config[id]);
                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError("fromtexteval", "fromText eval for " + id + " failed: " + e, e, [ id ]));
                        }
                        hasInteractive && (useInteractive = !0), this.depMaps.push(moduleMap), context.completeLoad(moduleName), 
                        localRequire([ moduleName ], load);
                    }), void plugin.load(map.name, localRequire, load, config));
                })), context.enable(pluginMap, this), this.pluginMaps[pluginMap.id] = pluginMap;
            },
            enable: function() {
                enabledRegistry[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(depMap, i) {
                    var id, mod, handler;
                    if ("string" == typeof depMap) {
                        if (depMap = makeModuleMap(depMap, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), 
                        this.depMaps[i] = depMap, handler = getOwn(handlers, depMap.id)) return void (this.depExports[i] = handler(this));
                        this.depCount += 1, on(depMap, "defined", bind(this, function(depExports) {
                            this.undefed || (this.defineDep(i, depExports), this.check());
                        })), this.errback ? on(depMap, "error", bind(this, this.errback)) : this.events.error && on(depMap, "error", bind(this, function(err) {
                            this.emit("error", err);
                        }));
                    }
                    id = depMap.id, mod = registry[id], hasProp(handlers, id) || !mod || mod.enabled || context.enable(depMap, this);
                })), eachProp(this.pluginMaps, bind(this, function(pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    mod && !mod.enabled && context.enable(pluginMap, this);
                })), this.enabling = !1, this.check();
            },
            on: function(name, cb) {
                var cbs = this.events[name];
                cbs || (cbs = this.events[name] = []), cbs.push(cb);
            },
            emit: function(name, evt) {
                each(this.events[name], function(cb) {
                    cb(evt);
                }), "error" === name && delete this.events[name];
            }
        }, context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,
            configure: function(cfg) {
                cfg.baseUrl && "/" !== cfg.baseUrl.charAt(cfg.baseUrl.length - 1) && (cfg.baseUrl += "/");
                var shim = config.shim, objs = {
                    paths: !0,
                    bundles: !0,
                    config: !0,
                    map: !0
                };
                eachProp(cfg, function(value, prop) {
                    objs[prop] ? (config[prop] || (config[prop] = {}), mixin(config[prop], value, !0, !0)) : config[prop] = value;
                }), cfg.bundles && eachProp(cfg.bundles, function(value, prop) {
                    each(value, function(v) {
                        v !== prop && (bundlesMap[v] = prop);
                    });
                }), cfg.shim && (eachProp(cfg.shim, function(value, id) {
                    isArray(value) && (value = {
                        deps: value
                    }), !value.exports && !value.init || value.exportsFn || (value.exportsFn = context.makeShimExports(value)), 
                    shim[id] = value;
                }), config.shim = shim), cfg.packages && each(cfg.packages, function(pkgObj) {
                    var location, name;
                    pkgObj = "string" == typeof pkgObj ? {
                        name: pkgObj
                    } : pkgObj, name = pkgObj.name, location = pkgObj.location, location && (config.paths[name] = pkgObj.location), 
                    config.pkgs[name] = pkgObj.name + "/" + (pkgObj.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "");
                }), eachProp(registry, function(mod, id) {
                    mod.inited || mod.map.unnormalized || (mod.map = makeModuleMap(id, null, !0));
                }), (cfg.deps || cfg.callback) && context.require(cfg.deps || [], cfg.callback);
            },
            makeShimExports: function(value) {
                function fn() {
                    var ret;
                    return value.init && (ret = value.init.apply(global, arguments)), ret || value.exports && getGlobal(value.exports);
                }
                return fn;
            },
            makeRequire: function(relMap, options) {
                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;
                    return options.enableBuildCallback && callback && isFunction(callback) && (callback.__requireJsBuild = !0), 
                    "string" == typeof deps ? isFunction(callback) ? onError(makeError("requireargs", "Invalid require call"), errback) : relMap && hasProp(handlers, deps) ? handlers[deps](registry[relMap.id]) : req.get ? req.get(context, deps, relMap, localRequire) : (map = makeModuleMap(deps, relMap, !1, !0), 
                    id = map.id, hasProp(defined, id) ? defined[id] : onError(makeError("notloaded", 'Module name "' + id + '" has not been loaded yet for context: ' + contextName + (relMap ? "" : ". Use require([])")))) : (intakeDefines(), 
                    context.nextTick(function() {
                        intakeDefines(), requireMod = getModule(makeModuleMap(null, relMap)), requireMod.skipMap = options.skipMap, 
                        requireMod.init(deps, callback, errback, {
                            enabled: !0
                        }), checkLoaded();
                    }), localRequire);
                }
                return options = options || {}, mixin(localRequire, {
                    isBrowser: isBrowser,
                    toUrl: function(moduleNamePlusExt) {
                        var ext, index = moduleNamePlusExt.lastIndexOf("."), segment = moduleNamePlusExt.split("/")[0], isRelative = "." === segment || ".." === segment;
                        return -1 !== index && (!isRelative || index > 1) && (ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length), 
                        moduleNamePlusExt = moduleNamePlusExt.substring(0, index)), context.nameToUrl(normalize(moduleNamePlusExt, relMap && relMap.id, !0), ext, !0);
                    },
                    defined: function(id) {
                        return hasProp(defined, makeModuleMap(id, relMap, !1, !0).id);
                    },
                    specified: function(id) {
                        return id = makeModuleMap(id, relMap, !1, !0).id, hasProp(defined, id) || hasProp(registry, id);
                    }
                }), relMap || (localRequire.undef = function(id) {
                    takeGlobalQueue();
                    var map = makeModuleMap(id, relMap, !0), mod = getOwn(registry, id);
                    mod.undefed = !0, removeScript(id), delete defined[id], delete urlFetched[map.url], 
                    delete undefEvents[id], eachReverse(defQueue, function(args, i) {
                        args[0] === id && defQueue.splice(i, 1);
                    }), mod && (mod.events.defined && (undefEvents[id] = mod.events), cleanRegistry(id));
                }), localRequire;
            },
            enable: function(depMap) {
                var mod = getOwn(registry, depMap.id);
                mod && getModule(depMap).enable();
            },
            completeLoad: function(moduleName) {
                var found, args, mod, shim = getOwn(config.shim, moduleName) || {}, shExports = shim.exports;
                for (takeGlobalQueue(); defQueue.length; ) {
                    if (args = defQueue.shift(), null === args[0]) {
                        if (args[0] = moduleName, found) break;
                        found = !0;
                    } else args[0] === moduleName && (found = !0);
                    callGetModule(args);
                }
                if (mod = getOwn(registry, moduleName), !found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (!(!config.enforceDefine || shExports && getGlobal(shExports))) return hasPathFallback(moduleName) ? void 0 : onError(makeError("nodefine", "No define call for " + moduleName, null, [ moduleName ]));
                    callGetModule([ moduleName, shim.deps || [], shim.exportsFn ]);
                }
                checkLoaded();
            },
            nameToUrl: function(moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url, parentPath, bundleId, pkgMain = getOwn(config.pkgs, moduleName);
                if (pkgMain && (moduleName = pkgMain), bundleId = getOwn(bundlesMap, moduleName)) return context.nameToUrl(bundleId, ext, skipExt);
                if (req.jsExtRegExp.test(moduleName)) url = moduleName + (ext || ""); else {
                    for (paths = config.paths, syms = moduleName.split("/"), i = syms.length; i > 0; i -= 1) if (parentModule = syms.slice(0, i).join("/"), 
                    parentPath = getOwn(paths, parentModule)) {
                        isArray(parentPath) && (parentPath = parentPath[0]), syms.splice(0, i, parentPath);
                        break;
                    }
                    url = syms.join("/"), url += ext || (/^data\:|\?/.test(url) || skipExt ? "" : ".js"), 
                    url = ("/" === url.charAt(0) || url.match(/^[\w\+\.\-]+:/) ? "" : config.baseUrl) + url;
                }
                return config.urlArgs ? url + ((-1 === url.indexOf("?") ? "?" : "&") + config.urlArgs) : url;
            },
            load: function(id, url) {
                req.load(context, id, url);
            },
            execCb: function(name, callback, args, exports) {
                return callback.apply(exports, args);
            },
            onScriptLoad: function(evt) {
                if ("load" === evt.type || readyRegExp.test((evt.currentTarget || evt.srcElement).readyState)) {
                    interactiveScript = null;
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },
            onScriptError: function(evt) {
                var data = getScriptData(evt);
                return hasPathFallback(data.id) ? void 0 : onError(makeError("scripterror", "Script error for: " + data.id, evt, [ data.id ]));
            }
        }, context.require = context.makeRequire(), context;
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(script) {
            return "interactive" === script.readyState ? interactiveScript = script : void 0;
        }), interactiveScript);
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.18", commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm, cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/, currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty, ap = Array.prototype, apsp = ap.splice, isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document), isWebWorker = !isBrowser && "undefined" != typeof importScripts, readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/, defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(), contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0;
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), 
        req = requirejs = function(deps, callback, errback, optional) {
            var context, config, contextName = defContextName;
            return isArray(deps) || "string" == typeof deps || (config = deps, isArray(callback) ? (deps = callback, 
            callback = errback, errback = optional) : deps = []), config && config.context && (contextName = config.context), 
            context = getOwn(contexts, contextName), context || (context = contexts[contextName] = req.s.newContext(contextName)), 
            config && context.configure(config), context.require(deps, callback, errback);
        }, req.config = function(config) {
            return req(config);
        }, req.nextTick = "undefined" != typeof setTimeout ? function(fn) {
            setTimeout(fn, 4);
        } : function(fn) {
            fn();
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, 
        req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each([ "toUrl", "undef", "defined", "specified" ], function(prop) {
            req[prop] = function() {
                var ctx = contexts[defContextName];
                return ctx.require[prop].apply(ctx, arguments);
            };
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], 
        baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, 
        req.createNode = function(config) {
            var node = config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return node.type = config.scriptType || "text/javascript", node.charset = "utf-8", 
            node.async = !0, node;
        }, req.load = function(context, moduleName, url) {
            var node, config = context && context.config || {};
            if (isBrowser) return node = req.createNode(config, moduleName, url), node.setAttribute("data-requirecontext", context.contextName), 
            node.setAttribute("data-requiremodule", moduleName), !node.attachEvent || node.attachEvent.toString && node.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (node.addEventListener("load", context.onScriptLoad, !1), 
            node.addEventListener("error", context.onScriptError, !1)) : (useInteractive = !0, 
            node.attachEvent("onreadystatechange", context.onScriptLoad)), node.src = url, currentlyAddingScript = node, 
            baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node), currentlyAddingScript = null, 
            node;
            if (isWebWorker) try {
                importScripts(url), context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError("importscripts", "importScripts failed for " + moduleName + " at " + url, e, [ moduleName ]));
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(script) {
            return head || (head = script.parentNode), dataMain = script.getAttribute("data-main"), 
            dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), 
            mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), 
            mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), 
            cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [ mainScript ], !0) : void 0;
        }), define = function(name, deps, callback) {
            var node, context;
            "string" != typeof name && (callback = deps, deps = name, name = null), isArray(deps) || (callback = deps, 
            deps = null), !deps && isFunction(callback) && (deps = [], callback.length && (callback.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(match, dep) {
                deps.push(dep);
            }), deps = (1 === callback.length ? [ "require" ] : [ "require", "exports", "module" ]).concat(deps))), 
            useInteractive && (node = currentlyAddingScript || getInteractiveScript(), node && (name || (name = node.getAttribute("data-requiremodule")), 
            context = contexts[node.getAttribute("data-requirecontext")])), (context ? context.defQueue : globalDefQueue).push([ name, deps, callback ]);
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text);
        }, req(cfg);
    }
}(this), define("requirejs", function() {}), function(global, factory) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = global.document ? factory(global, !0) : function(w) {
        if (!w.document) throw new Error("jQuery requires a window with a document");
        return factory(w);
    } : factory(global);
}("undefined" != typeof window ? window : this, function(window, noGlobal) {
    function isArraylike(obj) {
        var length = "length" in obj && obj.length, type = jQuery.type(obj);
        return "function" === type || jQuery.isWindow(obj) ? !1 : 1 === obj.nodeType && length ? !0 : "array" === type || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj;
    }
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
        });
        if (qualifier.nodeType) return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
        });
        if ("string" == typeof qualifier) {
            if (risSimple.test(qualifier)) return jQuery.filter(qualifier, elements, not);
            qualifier = jQuery.filter(qualifier, elements);
        }
        return jQuery.grep(elements, function(elem) {
            return jQuery.inArray(elem, qualifier) >= 0 !== not;
        });
    }
    function sibling(cur, dir) {
        do cur = cur[dir]; while (cur && 1 !== cur.nodeType);
        return cur;
    }
    function createOptions(options) {
        var object = optionsCache[options] = {};
        return jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = !0;
        }), object;
    }
    function detach() {
        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", completed, !1), 
        window.removeEventListener("load", completed, !1)) : (document.detachEvent("onreadystatechange", completed), 
        window.detachEvent("onload", completed));
    }
    function completed() {
        (document.addEventListener || "load" === event.type || "complete" === document.readyState) && (detach(), 
        jQuery.ready());
    }
    function dataAttr(elem, key, data) {
        if (void 0 === data && 1 === elem.nodeType) {
            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
            if (data = elem.getAttribute(name), "string" == typeof data) {
                try {
                    data = "true" === data ? !0 : "false" === data ? !1 : "null" === data ? null : +data + "" === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } catch (e) {}
                jQuery.data(elem, key, data);
            } else data = void 0;
        }
        return data;
    }
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) if (("data" !== name || !jQuery.isEmptyObject(obj[name])) && "toJSON" !== name) return !1;
        return !0;
    }
    function internalData(elem, name, data, pvt) {
        if (jQuery.acceptData(elem)) {
            var ret, thisCache, internalKey = jQuery.expando, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
            if (id && cache[id] && (pvt || cache[id].data) || void 0 !== data || "string" != typeof name) return id || (id = isNode ? elem[internalKey] = deletedIds.pop() || jQuery.guid++ : internalKey), 
            cache[id] || (cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            }), ("object" == typeof name || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = jQuery.extend(cache[id].data, name)), 
            thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), 
            void 0 !== data && (thisCache[jQuery.camelCase(name)] = data), "string" == typeof name ? (ret = thisCache[name], 
            null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
        }
    }
    function internalRemoveData(elem, name, pvt) {
        if (jQuery.acceptData(elem)) {
            var thisCache, i, isNode = elem.nodeType, cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
            if (cache[id]) {
                if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
                    jQuery.isArray(name) ? name = name.concat(jQuery.map(name, jQuery.camelCase)) : name in thisCache ? name = [ name ] : (name = jQuery.camelCase(name), 
                    name = name in thisCache ? [ name ] : name.split(" ")), i = name.length;
                    for (;i--; ) delete thisCache[name[i]];
                    if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) return;
                }
                (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) && (isNode ? jQuery.cleanData([ elem ], !0) : support.deleteExpando || cache != cache.window ? delete cache[id] : cache[id] = null);
            }
        }
    }
    function returnTrue() {
        return !0;
    }
    function returnFalse() {
        return !1;
    }
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }
    function createSafeFragment(document) {
        var list = nodeNames.split("|"), safeFrag = document.createDocumentFragment();
        if (safeFrag.createElement) for (;list.length; ) safeFrag.createElement(list.pop());
        return safeFrag;
    }
    function getAll(context, tag) {
        var elems, elem, i = 0, found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName(tag || "*") : typeof context.querySelectorAll !== strundefined ? context.querySelectorAll(tag || "*") : void 0;
        if (!found) for (found = [], elems = context.childNodes || context; null != (elem = elems[i]); i++) !tag || jQuery.nodeName(elem, tag) ? found.push(elem) : jQuery.merge(found, getAll(elem, tag));
        return void 0 === tag || tag && jQuery.nodeName(context, tag) ? jQuery.merge([ context ], found) : found;
    }
    function fixDefaultChecked(elem) {
        rcheckableType.test(elem.type) && (elem.defaultChecked = elem.checked);
    }
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") && jQuery.nodeName(11 !== content.nodeType ? content : content.firstChild, "tr") ? elem.getElementsByTagName("tbody")[0] || elem.appendChild(elem.ownerDocument.createElement("tbody")) : elem;
    }
    function disableScript(elem) {
        return elem.type = (null !== jQuery.find.attr(elem, "type")) + "/" + elem.type, 
        elem;
    }
    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
    }
    function setGlobalEval(elems, refElements) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
    function cloneCopyEvent(src, dest) {
        if (1 === dest.nodeType && jQuery.hasData(src)) {
            var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
            if (events) {
                delete curData.handle, curData.events = {};
                for (type in events) for (i = 0, l = events[type].length; l > i; i++) jQuery.event.add(dest, type, events[type][i]);
            }
            curData.data && (curData.data = jQuery.extend({}, curData.data));
        }
    }
    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;
        if (1 === dest.nodeType) {
            if (nodeName = dest.nodeName.toLowerCase(), !support.noCloneEvent && dest[jQuery.expando]) {
                data = jQuery._data(dest);
                for (e in data.events) jQuery.removeEvent(dest, e, data.handle);
                dest.removeAttribute(jQuery.expando);
            }
            "script" === nodeName && dest.text !== src.text ? (disableScript(dest).text = src.text, 
            restoreScript(dest)) : "object" === nodeName ? (dest.parentNode && (dest.outerHTML = src.outerHTML), 
            support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML) && (dest.innerHTML = src.innerHTML)) : "input" === nodeName && rcheckableType.test(src.type) ? (dest.defaultChecked = dest.checked = src.checked, 
            dest.value !== src.value && (dest.value = src.value)) : "option" === nodeName ? dest.defaultSelected = dest.selected = src.defaultSelected : ("input" === nodeName || "textarea" === nodeName) && (dest.defaultValue = src.defaultValue);
        }
    }
    function actualDisplay(name, doc) {
        var style, elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = window.getDefaultComputedStyle && (style = window.getDefaultComputedStyle(elem[0])) ? style.display : jQuery.css(elem[0], "display");
        return elem.detach(), display;
    }
    function defaultDisplay(nodeName) {
        var doc = document, display = elemdisplay[nodeName];
        return display || (display = actualDisplay(nodeName, doc), "none" !== display && display || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")).appendTo(doc.documentElement), 
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write(), 
        doc.close(), display = actualDisplay(nodeName, doc), iframe.detach()), elemdisplay[nodeName] = display), 
        display;
    }
    function addGetHookIf(conditionFn, hookFn) {
        return {
            get: function() {
                var condition = conditionFn();
                if (null != condition) return condition ? void delete this.get : (this.get = hookFn).apply(this, arguments);
            }
        };
    }
    function vendorPropName(style, name) {
        if (name in style) return name;
        for (var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length; i--; ) if (name = cssPrefixes[i] + capName, 
        name in style) return name;
        return origName;
    }
    function showHide(elements, show) {
        for (var display, elem, hidden, values = [], index = 0, length = elements.length; length > index; index++) elem = elements[index], 
        elem.style && (values[index] = jQuery._data(elem, "olddisplay"), display = elem.style.display, 
        show ? (values[index] || "none" !== display || (elem.style.display = ""), "" === elem.style.display && isHidden(elem) && (values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName)))) : (hidden = isHidden(elem), 
        (display && "none" !== display || !hidden) && jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"))));
        for (index = 0; length > index; index++) elem = elements[index], elem.style && (show && "none" !== elem.style.display && "" !== elem.style.display || (elem.style.display = show ? values[index] || "" : "none"));
        return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        for (var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0, val = 0; 4 > i; i += 2) "margin" === extra && (val += jQuery.css(elem, extra + cssExpand[i], !0, styles)), 
        isBorderBox ? ("content" === extra && (val -= jQuery.css(elem, "padding" + cssExpand[i], !0, styles)), 
        "margin" !== extra && (val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles))) : (val += jQuery.css(elem, "padding" + cssExpand[i], !0, styles), 
        "padding" !== extra && (val += jQuery.css(elem, "border" + cssExpand[i] + "Width", !0, styles)));
        return val;
    }
    function getWidthOrHeight(elem, name, extra) {
        var valueIsBorderBox = !0, val = "width" === name ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles);
        if (0 >= val || null == val) {
            if (val = curCSS(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), 
            rnumnonpx.test(val)) return val;
            valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]), 
            val = parseFloat(val) || 0;
        }
        return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
    }
    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    function createFxNow() {
        return setTimeout(function() {
            fxNow = void 0;
        }), fxNow = jQuery.now();
    }
    function genFx(type, includeWidth) {
        var which, attrs = {
            height: type
        }, i = 0;
        for (includeWidth = includeWidth ? 1 : 0; 4 > i; i += 2 - includeWidth) which = cssExpand[i], 
        attrs["margin" + which] = attrs["padding" + which] = type;
        return includeWidth && (attrs.opacity = attrs.width = type), attrs;
    }
    function createTween(value, prop, animation) {
        for (var tween, collection = (tweeners[prop] || []).concat(tweeners["*"]), index = 0, length = collection.length; length > index; index++) if (tween = collection[index].call(animation, prop, value)) return tween;
    }
    function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = jQuery._data(elem, "fxshow");
        opts.queue || (hooks = jQuery._queueHooks(elem, "fx"), null == hooks.unqueued && (hooks.unqueued = 0, 
        oldfire = hooks.empty.fire, hooks.empty.fire = function() {
            hooks.unqueued || oldfire();
        }), hooks.unqueued++, anim.always(function() {
            anim.always(function() {
                hooks.unqueued--, jQuery.queue(elem, "fx").length || hooks.empty.fire();
            });
        })), 1 === elem.nodeType && ("height" in props || "width" in props) && (opts.overflow = [ style.overflow, style.overflowX, style.overflowY ], 
        display = jQuery.css(elem, "display"), checkDisplay = "none" === display ? jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display, 
        "inline" === checkDisplay && "none" === jQuery.css(elem, "float") && (support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName) ? style.zoom = 1 : style.display = "inline-block")), 
        opts.overflow && (style.overflow = "hidden", support.shrinkWrapBlocks() || anim.always(function() {
            style.overflow = opts.overflow[0], style.overflowX = opts.overflow[1], style.overflowY = opts.overflow[2];
        }));
        for (prop in props) if (value = props[prop], rfxtypes.exec(value)) {
            if (delete props[prop], toggle = toggle || "toggle" === value, value === (hidden ? "hide" : "show")) {
                if ("show" !== value || !dataShow || void 0 === dataShow[prop]) continue;
                hidden = !0;
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
        } else display = void 0;
        if (jQuery.isEmptyObject(orig)) "inline" === ("none" === display ? defaultDisplay(elem.nodeName) : display) && (style.display = display); else {
            dataShow ? "hidden" in dataShow && (hidden = dataShow.hidden) : dataShow = jQuery._data(elem, "fxshow", {}), 
            toggle && (dataShow.hidden = !hidden), hidden ? jQuery(elem).show() : anim.done(function() {
                jQuery(elem).hide();
            }), anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) jQuery.style(elem, prop, orig[prop]);
            });
            for (prop in orig) tween = createTween(hidden ? dataShow[prop] : 0, prop, anim), 
            prop in dataShow || (dataShow[prop] = tween.start, hidden && (tween.end = tween.start, 
            tween.start = "width" === prop || "height" === prop ? 1 : 0));
        }
    }
    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) if (name = jQuery.camelCase(index), easing = specialEasing[name], 
        value = props[index], jQuery.isArray(value) && (easing = value[1], value = props[index] = value[0]), 
        index !== name && (props[name] = value, delete props[index]), hooks = jQuery.cssHooks[name], 
        hooks && "expand" in hooks) {
            value = hooks.expand(value), delete props[name];
            for (index in value) index in props || (props[index] = value[index], specialEasing[index] = easing);
        } else specialEasing[name] = easing;
    }
    function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
        }), tick = function() {
            if (stopped) return !1;
            for (var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length; length > index; index++) animation.tweens[index].run(percent);
            return deferred.notifyWith(elem, [ animation, percent, remaining ]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [ animation ]), 
            !1);
        }, animation = deferred.promise({
            elem: elem,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(!0, {
                specialEasing: {}
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
                var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
                return animation.tweens.push(tween), tween;
            },
            stop: function(gotoEnd) {
                var index = 0, length = gotoEnd ? animation.tweens.length : 0;
                if (stopped) return this;
                for (stopped = !0; length > index; index++) animation.tweens[index].run(1);
                return gotoEnd ? deferred.resolveWith(elem, [ animation, gotoEnd ]) : deferred.rejectWith(elem, [ animation, gotoEnd ]), 
                this;
            }
        }), props = animation.props;
        for (propFilter(props, animation.opts.specialEasing); length > index; index++) if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) return result;
        return jQuery.map(props, createTween, animation), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), 
        jQuery.fx.timer(jQuery.extend(tick, {
            elem: elem,
            anim: animation,
            queue: animation.opts.queue
        })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    }
    function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
            "string" != typeof dataTypeExpression && (func = dataTypeExpression, dataTypeExpression = "*");
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
            if (jQuery.isFunction(func)) for (;dataType = dataTypes[i++]; ) "+" === dataType.charAt(0) ? (dataType = dataType.slice(1) || "*", 
            (structure[dataType] = structure[dataType] || []).unshift(func)) : (structure[dataType] = structure[dataType] || []).push(func);
        };
    }
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        function inspect(dataType) {
            var selected;
            return inspected[dataType] = !0, jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), 
                inspect(dataTypeOrTransport), !1);
            }), selected;
        }
        var inspected = {}, seekingTransport = structure === transports;
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }
    function ajaxExtend(target, src) {
        var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) void 0 !== src[key] && ((flatOptions[key] ? target : deep || (deep = {}))[key] = src[key]);
        return deep && jQuery.extend(!0, target, deep), target;
    }
    function ajaxHandleResponses(s, jqXHR, responses) {
        for (var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes; "*" === dataTypes[0]; ) dataTypes.shift(), 
        void 0 === ct && (ct = s.mimeType || jqXHR.getResponseHeader("Content-Type"));
        if (ct) for (type in contents) if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
        }
        if (dataTypes[0] in responses) finalDataType = dataTypes[0]; else {
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                firstDataType || (firstDataType = type);
            }
            finalDataType = finalDataType || firstDataType;
        }
        return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), 
        responses[finalDataType]) : void 0;
    }
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) for (conv in s.converters) converters[conv.toLowerCase()] = s.converters[conv];
        for (current = dataTypes.shift(); current; ) if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), 
        !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), 
        prev = current, current = dataTypes.shift()) if ("*" === current) current = prev; else if ("*" !== prev && prev !== current) {
            if (conv = converters[prev + " " + current] || converters["* " + current], !conv) for (conv2 in converters) if (tmp = conv2.split(" "), 
            tmp[1] === current && (conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]])) {
                conv === !0 ? conv = converters[conv2] : converters[conv2] !== !0 && (current = tmp[0], 
                dataTypes.unshift(tmp[1]));
                break;
            }
            if (conv !== !0) if (conv && s["throws"]) response = conv(response); else try {
                response = conv(response);
            } catch (e) {
                return {
                    state: "parsererror",
                    error: conv ? e : "No conversion from " + prev + " to " + current
                };
            }
        }
        return {
            state: "success",
            data: response
        };
    }
    function buildParams(prefix, obj, traditional, add) {
        var name;
        if (jQuery.isArray(obj)) jQuery.each(obj, function(i, v) {
            traditional || rbracket.test(prefix) ? add(prefix, v) : buildParams(prefix + "[" + ("object" == typeof v ? i : "") + "]", v, traditional, add);
        }); else if (traditional || "object" !== jQuery.type(obj)) add(prefix, obj); else for (name in obj) buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
    }
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }
    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
    function getWindow(elem) {
        return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : !1;
    }
    var deletedIds = [], slice = deletedIds.slice, concat = deletedIds.concat, push = deletedIds.push, indexOf = deletedIds.indexOf, class2type = {}, toString = class2type.toString, hasOwn = class2type.hasOwnProperty, support = {}, version = "1.11.3", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
    }, rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function(all, letter) {
        return letter.toUpperCase();
    };
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,
        selector: "",
        length: 0,
        toArray: function() {
            return slice.call(this);
        },
        get: function(num) {
            return null != num ? 0 > num ? this[num + this.length] : this[num] : slice.call(this);
        },
        pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            return ret.prevObject = this, ret.context = this.context, ret;
        },
        each: function(callback, args) {
            return jQuery.each(this, callback, args);
        },
        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(i) {
            var len = this.length, j = +i + (0 > i ? len : 0);
            return this.pushStack(j >= 0 && len > j ? [ this[j] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    }, jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = !1;
        for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, 
        i++), "object" == typeof target || jQuery.isFunction(target) || (target = {}), i === length && (target = this, 
        i--); length > i; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], 
        copy = options[name], target !== copy && (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy))) ? (copyIsArray ? (copyIsArray = !1, 
        clone = src && jQuery.isArray(src) ? src : []) : clone = src && jQuery.isPlainObject(src) ? src : {}, 
        target[name] = jQuery.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
        return target;
    }, jQuery.extend({
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(msg) {
            throw new Error(msg);
        },
        noop: function() {},
        isFunction: function(obj) {
            return "function" === jQuery.type(obj);
        },
        isArray: Array.isArray || function(obj) {
            return "array" === jQuery.type(obj);
        },
        isWindow: function(obj) {
            return null != obj && obj == obj.window;
        },
        isNumeric: function(obj) {
            return !jQuery.isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
        },
        isEmptyObject: function(obj) {
            var name;
            for (name in obj) return !1;
            return !0;
        },
        isPlainObject: function(obj) {
            var key;
            if (!obj || "object" !== jQuery.type(obj) || obj.nodeType || jQuery.isWindow(obj)) return !1;
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return !1;
            } catch (e) {
                return !1;
            }
            if (support.ownLast) for (key in obj) return hasOwn.call(obj, key);
            for (key in obj) ;
            return void 0 === key || hasOwn.call(obj, key);
        },
        type: function(obj) {
            return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        },
        globalEval: function(data) {
            data && jQuery.trim(data) && (window.execScript || function(data) {
                window.eval.call(window, data);
            })(data);
        },
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },
        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },
        each: function(obj, callback, args) {
            var value, i = 0, length = obj.length, isArray = isArraylike(obj);
            if (args) {
                if (isArray) for (;length > i && (value = callback.apply(obj[i], args), value !== !1); i++) ; else for (i in obj) if (value = callback.apply(obj[i], args), 
                value === !1) break;
            } else if (isArray) for (;length > i && (value = callback.call(obj[i], i, obj[i]), 
            value !== !1); i++) ; else for (i in obj) if (value = callback.call(obj[i], i, obj[i]), 
            value === !1) break;
            return obj;
        },
        trim: function(text) {
            return null == text ? "" : (text + "").replace(rtrim, "");
        },
        makeArray: function(arr, results) {
            var ret = results || [];
            return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(ret, "string" == typeof arr ? [ arr ] : arr) : push.call(ret, arr)), 
            ret;
        },
        inArray: function(elem, arr, i) {
            var len;
            if (arr) {
                if (indexOf) return indexOf.call(arr, elem, i);
                for (len = arr.length, i = i ? 0 > i ? Math.max(0, len + i) : i : 0; len > i; i++) if (i in arr && arr[i] === elem) return i;
            }
            return -1;
        },
        merge: function(first, second) {
            for (var len = +second.length, j = 0, i = first.length; len > j; ) first[i++] = second[j++];
            if (len !== len) for (;void 0 !== second[j]; ) first[i++] = second[j++];
            return first.length = i, first;
        },
        grep: function(elems, callback, invert) {
            for (var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert; length > i; i++) callbackInverse = !callback(elems[i], i), 
            callbackInverse !== callbackExpect && matches.push(elems[i]);
            return matches;
        },
        map: function(elems, callback, arg) {
            var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
            if (isArray) for (;length > i; i++) value = callback(elems[i], i, arg), null != value && ret.push(value); else for (i in elems) value = callback(elems[i], i, arg), 
            null != value && ret.push(value);
            return concat.apply([], ret);
        },
        guid: 1,
        proxy: function(fn, context) {
            var args, proxy, tmp;
            return "string" == typeof context && (tmp = fn[context], context = fn, fn = tmp), 
            jQuery.isFunction(fn) ? (args = slice.call(arguments, 2), proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            }, proxy.guid = fn.guid = fn.guid || jQuery.guid++, proxy) : void 0;
        },
        now: function() {
            return +new Date();
        },
        support: support
    }), jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    var Sizzle = function(window) {
        function Sizzle(selector, context, results, seed) {
            var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
            if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), 
            context = context || document, results = results || [], nodeType = context.nodeType, 
            "string" != typeof selector || !selector || 1 !== nodeType && 9 !== nodeType && 11 !== nodeType) return results;
            if (!seed && documentIsHTML) {
                if (11 !== nodeType && (match = rquickExpr.exec(selector))) if (m = match[1]) {
                    if (9 === nodeType) {
                        if (elem = context.getElementById(m), !elem || !elem.parentNode) return results;
                        if (elem.id === m) return results.push(elem), results;
                    } else if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) return results.push(elem), 
                    results;
                } else {
                    if (match[2]) return push.apply(results, context.getElementsByTagName(selector)), 
                    results;
                    if ((m = match[3]) && support.getElementsByClassName) return push.apply(results, context.getElementsByClassName(m)), 
                    results;
                }
                if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
                    if (nid = old = expando, newContext = context, newSelector = 1 !== nodeType && selector, 
                    1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
                        for (groups = tokenize(selector), (old = context.getAttribute("id")) ? nid = old.replace(rescape, "\\$&") : context.setAttribute("id", nid), 
                        nid = "[id='" + nid + "'] ", i = groups.length; i--; ) groups[i] = nid + toSelector(groups[i]);
                        newContext = rsibling.test(selector) && testContext(context.parentNode) || context, 
                        newSelector = groups.join(",");
                    }
                    if (newSelector) try {
                        return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                    } catch (qsaError) {} finally {
                        old || context.removeAttribute("id");
                    }
                }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
        }
        function createCache() {
            function cache(key, value) {
                return keys.push(key + " ") > Expr.cacheLength && delete cache[keys.shift()], cache[key + " "] = value;
            }
            var keys = [];
            return cache;
        }
        function markFunction(fn) {
            return fn[expando] = !0, fn;
        }
        function assert(fn) {
            var div = document.createElement("div");
            try {
                return !!fn(div);
            } catch (e) {
                return !1;
            } finally {
                div.parentNode && div.parentNode.removeChild(div), div = null;
            }
        }
        function addHandle(attrs, handler) {
            for (var arr = attrs.split("|"), i = attrs.length; i--; ) Expr.attrHandle[arr[i]] = handler;
        }
        function siblingCheck(a, b) {
            var cur = b && a, diff = cur && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
            if (diff) return diff;
            if (cur) for (;cur = cur.nextSibling; ) if (cur === b) return -1;
            return a ? 1 : -1;
        }
        function createInputPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return "input" === name && elem.type === type;
            };
        }
        function createButtonPseudo(type) {
            return function(elem) {
                var name = elem.nodeName.toLowerCase();
                return ("input" === name || "button" === name) && elem.type === type;
            };
        }
        function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
                return argument = +argument, markFunction(function(seed, matches) {
                    for (var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length; i--; ) seed[j = matchIndexes[i]] && (seed[j] = !(matches[j] = seed[j]));
                });
            });
        }
        function testContext(context) {
            return context && "undefined" != typeof context.getElementsByTagName && context;
        }
        function setFilters() {}
        function toSelector(tokens) {
            for (var i = 0, len = tokens.length, selector = ""; len > i; i++) selector += tokens[i].value;
            return selector;
        }
        function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir, checkNonElements = base && "parentNode" === dir, doneName = done++;
            return combinator.first ? function(elem, context, xml) {
                for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) return matcher(elem, context, xml);
            } : function(elem, context, xml) {
                var oldCache, outerCache, newCache = [ dirruns, doneName ];
                if (xml) {
                    for (;elem = elem[dir]; ) if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) return !0;
                } else for (;elem = elem[dir]; ) if (1 === elem.nodeType || checkNonElements) {
                    if (outerCache = elem[expando] || (elem[expando] = {}), (oldCache = outerCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) return newCache[2] = oldCache[2];
                    if (outerCache[dir] = newCache, newCache[2] = matcher(elem, context, xml)) return !0;
                }
            };
        }
        function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
                for (var i = matchers.length; i--; ) if (!matchers[i](elem, context, xml)) return !1;
                return !0;
            } : matchers[0];
        }
        function multipleContexts(selector, contexts, results) {
            for (var i = 0, len = contexts.length; len > i; i++) Sizzle(selector, contexts[i], results);
            return results;
        }
        function condense(unmatched, map, filter, context, xml) {
            for (var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = null != map; len > i; i++) (elem = unmatched[i]) && (!filter || filter(elem, context, xml)) && (newUnmatched.push(elem), 
            mapped && map.push(i));
            return newUnmatched;
        }
        function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            return postFilter && !postFilter[expando] && (postFilter = setMatcher(postFilter)), 
            postFinder && !postFinder[expando] && (postFinder = setMatcher(postFinder, postSelector)), 
            markFunction(function(seed, results, context, xml) {
                var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || "*", context.nodeType ? [ context ] : context, []), matcherIn = !preFilter || !seed && selector ? elems : condense(elems, preMap, preFilter, context, xml), matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
                if (matcher && matcher(matcherIn, matcherOut, context, xml), postFilter) for (temp = condense(matcherOut, postMap), 
                postFilter(temp, [], context, xml), i = temp.length; i--; ) (elem = temp[i]) && (matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem));
                if (seed) {
                    if (postFinder || preFilter) {
                        if (postFinder) {
                            for (temp = [], i = matcherOut.length; i--; ) (elem = matcherOut[i]) && temp.push(matcherIn[i] = elem);
                            postFinder(null, matcherOut = [], temp, xml);
                        }
                        for (i = matcherOut.length; i--; ) (elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1 && (seed[temp] = !(results[temp] = elem));
                    }
                } else matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut), 
                postFinder ? postFinder(null, results, matcherOut, xml) : push.apply(results, matcherOut);
            });
        }
        function matcherFromTokens(tokens) {
            for (var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
                return elem === checkContext;
            }, implicitRelative, !0), matchAnyContext = addCombinator(function(elem) {
                return indexOf(checkContext, elem) > -1;
            }, implicitRelative, !0), matchers = [ function(elem, context, xml) {
                var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
                return checkContext = null, ret;
            } ]; len > i; i++) if (matcher = Expr.relative[tokens[i].type]) matchers = [ addCombinator(elementMatcher(matchers), matcher) ]; else {
                if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
                    for (j = ++i; len > j && !Expr.relative[tokens[j].type]; j++) ;
                    return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                        value: " " === tokens[i - 2].type ? "*" : ""
                    })).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), len > j && matcherFromTokens(tokens = tokens.slice(j)), len > j && toSelector(tokens));
                }
                matchers.push(matcher);
            }
            return elementMatcher(matchers);
        }
        function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
                var elem, j, matcher, matchedCount = 0, i = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find.TAG("*", outermost), dirrunsUnique = dirruns += null == contextBackup ? 1 : Math.random() || .1, len = elems.length;
                for (outermost && (outermostContext = context !== document && context); i !== len && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                        for (j = 0; matcher = elementMatchers[j++]; ) if (matcher(elem, context, xml)) {
                            results.push(elem);
                            break;
                        }
                        outermost && (dirruns = dirrunsUnique);
                    }
                    bySet && ((elem = !matcher && elem) && matchedCount--, seed && unmatched.push(elem));
                }
                if (matchedCount += i, bySet && i !== matchedCount) {
                    for (j = 0; matcher = setMatchers[j++]; ) matcher(unmatched, setMatched, context, xml);
                    if (seed) {
                        if (matchedCount > 0) for (;i--; ) unmatched[i] || setMatched[i] || (setMatched[i] = pop.call(results));
                        setMatched = condense(setMatched);
                    }
                    push.apply(results, setMatched), outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1 && Sizzle.uniqueSort(results);
                }
                return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), 
                unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
        }
        var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function(a, b) {
            return a === b && (hasDuplicate = !0), 0;
        }, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = function(list, elem) {
            for (var i = 0, len = list.length; len > i; i++) if (list[i] === elem) return i;
            return -1;
        }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", identifier = characterEncoding.replace("w", "w#"), attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + characterEncoding + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            ID: new RegExp("^#(" + characterEncoding + ")"),
            CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
            TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + attributes),
            PSEUDO: new RegExp("^" + pseudos),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + booleans + ")$", "i"),
            needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
        }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g, runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"), funescape = function(_, escaped, escapedWhitespace) {
            var high = "0x" + escaped - 65536;
            return high !== high || escapedWhitespace ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, 1023 & high | 56320);
        }, unloadHandler = function() {
            setDocument();
        };
        try {
            push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes), 
            arr[preferredDoc.childNodes.length].nodeType;
        } catch (e) {
            push = {
                apply: arr.length ? function(target, els) {
                    push_native.apply(target, slice.call(els));
                } : function(target, els) {
                    for (var j = target.length, i = 0; target[j++] = els[i++]; ) ;
                    target.length = j - 1;
                }
            };
        }
        support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var documentElement = elem && (elem.ownerDocument || elem).documentElement;
            return documentElement ? "HTML" !== documentElement.nodeName : !1;
        }, setDocument = Sizzle.setDocument = function(node) {
            var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
            return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, 
            docElem = doc.documentElement, parent = doc.defaultView, parent && parent !== parent.top && (parent.addEventListener ? parent.addEventListener("unload", unloadHandler, !1) : parent.attachEvent && parent.attachEvent("onunload", unloadHandler)), 
            documentIsHTML = !isXML(doc), support.attributes = assert(function(div) {
                return div.className = "i", !div.getAttribute("className");
            }), support.getElementsByTagName = assert(function(div) {
                return div.appendChild(doc.createComment("")), !div.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(doc.getElementsByClassName), support.getById = assert(function(div) {
                return docElem.appendChild(div).id = expando, !doc.getElementsByName || !doc.getElementsByName(expando).length;
            }), support.getById ? (Expr.find.ID = function(id, context) {
                if ("undefined" != typeof context.getElementById && documentIsHTML) {
                    var m = context.getElementById(id);
                    return m && m.parentNode ? [ m ] : [];
                }
            }, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    return elem.getAttribute("id") === attrId;
                };
            }) : (delete Expr.find.ID, Expr.filter.ID = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                    var node = "undefined" != typeof elem.getAttributeNode && elem.getAttributeNode("id");
                    return node && node.value === attrId;
                };
            }), Expr.find.TAG = support.getElementsByTagName ? function(tag, context) {
                return "undefined" != typeof context.getElementsByTagName ? context.getElementsByTagName(tag) : support.qsa ? context.querySelectorAll(tag) : void 0;
            } : function(tag, context) {
                var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
                if ("*" === tag) {
                    for (;elem = results[i++]; ) 1 === elem.nodeType && tmp.push(elem);
                    return tmp;
                }
                return results;
            }, Expr.find.CLASS = support.getElementsByClassName && function(className, context) {
                return documentIsHTML ? context.getElementsByClassName(className) : void 0;
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(doc.querySelectorAll)) && (assert(function(div) {
                docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\f]' msallowcapture=''><option selected=''></option></select>", 
                div.querySelectorAll("[msallowcapture^='']").length && rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")"), 
                div.querySelectorAll("[selected]").length || rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")"), 
                div.querySelectorAll("[id~=" + expando + "-]").length || rbuggyQSA.push("~="), div.querySelectorAll(":checked").length || rbuggyQSA.push(":checked"), 
                div.querySelectorAll("a#" + expando + "+*").length || rbuggyQSA.push(".#.+[+~]");
            }), assert(function(div) {
                var input = doc.createElement("input");
                input.setAttribute("type", "hidden"), div.appendChild(input).setAttribute("name", "D"), 
                div.querySelectorAll("[name=d]").length && rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?="), 
                div.querySelectorAll(":enabled").length || rbuggyQSA.push(":enabled", ":disabled"), 
                div.querySelectorAll("*,:x"), rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(div) {
                support.disconnectedMatch = matches.call(div, "div"), matches.call(div, "[s!='']:x"), 
                rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), 
            hasCompare = rnative.test(docElem.compareDocumentPosition), contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
                var adown = 9 === a.nodeType ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(a, b) {
                if (b) for (;b = b.parentNode; ) if (b === a) return !0;
                return !1;
            }, sortOrder = hasCompare ? function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return compare ? compare : (compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 
                1 & compare || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ? -1 : b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
                if (a === b) return hasDuplicate = !0, 0;
                var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [ a ], bp = [ b ];
                if (!aup || !bup) return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
                if (aup === bup) return siblingCheck(a, b);
                for (cur = a; cur = cur.parentNode; ) ap.unshift(cur);
                for (cur = b; cur = cur.parentNode; ) bp.unshift(cur);
                for (;ap[i] === bp[i]; ) i++;
                return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
            }, doc) : document;
        }, Sizzle.matches = function(expr, elements) {
            return Sizzle(expr, null, null, elements);
        }, Sizzle.matchesSelector = function(elem, expr) {
            if ((elem.ownerDocument || elem) !== document && setDocument(elem), expr = expr.replace(rattributeQuotes, "='$1']"), 
            !(!support.matchesSelector || !documentIsHTML || rbuggyMatches && rbuggyMatches.test(expr) || rbuggyQSA && rbuggyQSA.test(expr))) try {
                var ret = matches.call(elem, expr);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) return ret;
            } catch (e) {}
            return Sizzle(expr, document, null, [ elem ]).length > 0;
        }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) !== document && setDocument(context), 
            contains(context, elem);
        }, Sizzle.attr = function(elem, name) {
            (elem.ownerDocument || elem) !== document && setDocument(elem);
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }, Sizzle.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
        }, Sizzle.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i = 0;
            if (hasDuplicate = !support.detectDuplicates, sortInput = !support.sortStable && results.slice(0), 
            results.sort(sortOrder), hasDuplicate) {
                for (;elem = results[i++]; ) elem === results[i] && (j = duplicates.push(i));
                for (;j--; ) results.splice(duplicates[j], 1);
            }
            return sortInput = null, results;
        }, getText = Sizzle.getText = function(elem) {
            var node, ret = "", i = 0, nodeType = elem.nodeType;
            if (nodeType) {
                if (1 === nodeType || 9 === nodeType || 11 === nodeType) {
                    if ("string" == typeof elem.textContent) return elem.textContent;
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) ret += getText(elem);
                } else if (3 === nodeType || 4 === nodeType) return elem.nodeValue;
            } else for (;node = elem[i++]; ) ret += getText(node);
            return ret;
        }, Expr = Sizzle.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(match) {
                    return match[1] = match[1].replace(runescape, funescape), match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape), 
                    "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
                },
                CHILD: function(match) {
                    return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), 
                    match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), 
                    match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), 
                    match;
                },
                PSEUDO: function(match) {
                    var excess, unquoted = !match[6] && match[2];
                    return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, !0)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), 
                    match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
                }
            },
            filter: {
                TAG: function(nodeNameSelector) {
                    var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                    return "*" === nodeNameSelector ? function() {
                        return !0;
                    } : function(elem) {
                        return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                    };
                },
                CLASS: function(className) {
                    var pattern = classCache[className + " "];
                    return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function(elem) {
                        return pattern.test("string" == typeof elem.className && elem.className || "undefined" != typeof elem.getAttribute && elem.getAttribute("class") || "");
                    });
                },
                ATTR: function(name, operator, check) {
                    return function(elem) {
                        var result = Sizzle.attr(elem, name);
                        return null == result ? "!=" === operator : operator ? (result += "", "=" === operator ? result === check : "!=" === operator ? result !== check : "^=" === operator ? check && 0 === result.indexOf(check) : "*=" === operator ? check && result.indexOf(check) > -1 : "$=" === operator ? check && result.slice(-check.length) === check : "~=" === operator ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : "|=" === operator ? result === check || result.slice(0, check.length + 1) === check + "-" : !1) : !0;
                    };
                },
                CHILD: function(type, what, argument, first, last) {
                    var simple = "nth" !== type.slice(0, 3), forward = "last" !== type.slice(-4), ofType = "of-type" === what;
                    return 1 === first && 0 === last ? function(elem) {
                        return !!elem.parentNode;
                    } : function(elem, context, xml) {
                        var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
                        if (parent) {
                            if (simple) {
                                for (;dir; ) {
                                    for (node = elem; node = node[dir]; ) if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) return !1;
                                    start = dir = "only" === type && !start && "nextSibling";
                                }
                                return !0;
                            }
                            if (start = [ forward ? parent.firstChild : parent.lastChild ], forward && useCache) {
                                for (outerCache = parent[expando] || (parent[expando] = {}), cache = outerCache[type] || [], 
                                nodeIndex = cache[0] === dirruns && cache[1], diff = cache[0] === dirruns && cache[2], 
                                node = nodeIndex && parent.childNodes[nodeIndex]; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop(); ) if (1 === node.nodeType && ++diff && node === elem) {
                                    outerCache[type] = [ dirruns, nodeIndex, diff ];
                                    break;
                                }
                            } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) diff = cache[1]; else for (;(node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((ofType ? node.nodeName.toLowerCase() !== name : 1 !== node.nodeType) || !++diff || (useCache && ((node[expando] || (node[expando] = {}))[type] = [ dirruns, diff ]), 
                            node !== elem)); ) ;
                            return diff -= last, diff === first || diff % first === 0 && diff / first >= 0;
                        }
                    };
                },
                PSEUDO: function(pseudo, argument) {
                    var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                    return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [ pseudo, pseudo, "", argument ], 
                    Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches) {
                        for (var idx, matched = fn(seed, argument), i = matched.length; i--; ) idx = indexOf(seed, matched[i]), 
                        seed[idx] = !(matches[idx] = matched[i]);
                    }) : function(elem) {
                        return fn(elem, 0, args);
                    }) : fn;
                }
            },
            pseudos: {
                not: markFunction(function(selector) {
                    var input = [], results = [], matcher = compile(selector.replace(rtrim, "$1"));
                    return matcher[expando] ? markFunction(function(seed, matches, context, xml) {
                        for (var elem, unmatched = matcher(seed, null, xml, []), i = seed.length; i--; ) (elem = unmatched[i]) && (seed[i] = !(matches[i] = elem));
                    }) : function(elem, context, xml) {
                        return input[0] = elem, matcher(input, null, xml, results), input[0] = null, !results.pop();
                    };
                }),
                has: markFunction(function(selector) {
                    return function(elem) {
                        return Sizzle(selector, elem).length > 0;
                    };
                }),
                contains: markFunction(function(text) {
                    return text = text.replace(runescape, funescape), function(elem) {
                        return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                    };
                }),
                lang: markFunction(function(lang) {
                    return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), 
                    lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
                        var elemLang;
                        do if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) return elemLang = elemLang.toLowerCase(), 
                        elemLang === lang || 0 === elemLang.indexOf(lang + "-"); while ((elem = elem.parentNode) && 1 === elem.nodeType);
                        return !1;
                    };
                }),
                target: function(elem) {
                    var hash = window.location && window.location.hash;
                    return hash && hash.slice(1) === elem.id;
                },
                root: function(elem) {
                    return elem === docElem;
                },
                focus: function(elem) {
                    return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                },
                enabled: function(elem) {
                    return elem.disabled === !1;
                },
                disabled: function(elem) {
                    return elem.disabled === !0;
                },
                checked: function(elem) {
                    var nodeName = elem.nodeName.toLowerCase();
                    return "input" === nodeName && !!elem.checked || "option" === nodeName && !!elem.selected;
                },
                selected: function(elem) {
                    return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === !0;
                },
                empty: function(elem) {
                    for (elem = elem.firstChild; elem; elem = elem.nextSibling) if (elem.nodeType < 6) return !1;
                    return !0;
                },
                parent: function(elem) {
                    return !Expr.pseudos.empty(elem);
                },
                header: function(elem) {
                    return rheader.test(elem.nodeName);
                },
                input: function(elem) {
                    return rinputs.test(elem.nodeName);
                },
                button: function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return "input" === name && "button" === elem.type || "button" === name;
                },
                text: function(elem) {
                    var attr;
                    return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (attr = elem.getAttribute("type")) || "text" === attr.toLowerCase());
                },
                first: createPositionalPseudo(function() {
                    return [ 0 ];
                }),
                last: createPositionalPseudo(function(matchIndexes, length) {
                    return [ length - 1 ];
                }),
                eq: createPositionalPseudo(function(matchIndexes, length, argument) {
                    return [ 0 > argument ? argument + length : argument ];
                }),
                even: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 0; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                odd: createPositionalPseudo(function(matchIndexes, length) {
                    for (var i = 1; length > i; i += 2) matchIndexes.push(i);
                    return matchIndexes;
                }),
                lt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; --i >= 0; ) matchIndexes.push(i);
                    return matchIndexes;
                }),
                gt: createPositionalPseudo(function(matchIndexes, length, argument) {
                    for (var i = 0 > argument ? argument + length : argument; ++i < length; ) matchIndexes.push(i);
                    return matchIndexes;
                })
            }
        }, Expr.pseudos.nth = Expr.pseudos.eq;
        for (i in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) Expr.pseudos[i] = createInputPseudo(i);
        for (i in {
            submit: !0,
            reset: !0
        }) Expr.pseudos[i] = createButtonPseudo(i);
        return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters(), 
        tokenize = Sizzle.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) return parseOnly ? 0 : cached.slice(0);
            for (soFar = selector, groups = [], preFilters = Expr.preFilter; soFar; ) {
                (!matched || (match = rcomma.exec(soFar))) && (match && (soFar = soFar.slice(match[0].length) || soFar), 
                groups.push(tokens = [])), matched = !1, (match = rcombinators.exec(soFar)) && (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: match[0].replace(rtrim, " ")
                }), soFar = soFar.slice(matched.length));
                for (type in Expr.filter) !(match = matchExpr[type].exec(soFar)) || preFilters[type] && !(match = preFilters[type](match)) || (matched = match.shift(), 
                tokens.push({
                    value: matched,
                    type: type,
                    matches: match
                }), soFar = soFar.slice(matched.length));
                if (!matched) break;
            }
            return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
        }, compile = Sizzle.compile = function(selector, match) {
            var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
                for (match || (match = tokenize(selector)), i = match.length; i--; ) cached = matcherFromTokens(match[i]), 
                cached[expando] ? setMatchers.push(cached) : elementMatchers.push(cached);
                cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers)), 
                cached.selector = selector;
            }
            return cached;
        }, select = Sizzle.select = function(selector, context, results, seed) {
            var i, tokens, token, type, find, compiled = "function" == typeof selector && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
                if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && support.getById && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                    if (context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0], 
                    !context) return results;
                    compiled && (context = context.parentNode), selector = selector.slice(tokens.shift().value.length);
                }
                for (i = matchExpr.needsContext.test(selector) ? 0 : tokens.length; i-- && (token = tokens[i], 
                !Expr.relative[type = token.type]); ) if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                    if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) return push.apply(results, seed), 
                    results;
                    break;
                }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, rsibling.test(selector) && testContext(context.parentNode) || context), 
            results;
        }, support.sortStable = expando.split("").sort(sortOrder).join("") === expando, 
        support.detectDuplicates = !!hasDuplicate, setDocument(), support.sortDetached = assert(function(div1) {
            return 1 & div1.compareDocumentPosition(document.createElement("div"));
        }), assert(function(div) {
            return div.innerHTML = "<a href='#'></a>", "#" === div.firstChild.getAttribute("href");
        }) || addHandle("type|href|height|width", function(elem, name, isXML) {
            return isXML ? void 0 : elem.getAttribute(name, "type" === name.toLowerCase() ? 1 : 2);
        }), support.attributes && assert(function(div) {
            return div.innerHTML = "<input/>", div.firstChild.setAttribute("value", ""), "" === div.firstChild.getAttribute("value");
        }) || addHandle("value", function(elem, name, isXML) {
            return isXML || "input" !== elem.nodeName.toLowerCase() ? void 0 : elem.defaultValue;
        }), assert(function(div) {
            return null == div.getAttribute("disabled");
        }) || addHandle(booleans, function(elem, name, isXML) {
            var val;
            return isXML ? void 0 : elem[name] === !0 ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }), Sizzle;
    }(window);
    jQuery.find = Sizzle, jQuery.expr = Sizzle.selectors, jQuery.expr[":"] = jQuery.expr.pseudos, 
    jQuery.unique = Sizzle.uniqueSort, jQuery.text = Sizzle.getText, jQuery.isXMLDoc = Sizzle.isXML, 
    jQuery.contains = Sizzle.contains;
    var rneedsContext = jQuery.expr.match.needsContext, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, risSimple = /^.[^:#\[\.,]*$/;
    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [ elem ] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
            return 1 === elem.nodeType;
        }));
    }, jQuery.fn.extend({
        find: function(selector) {
            var i, ret = [], self = this, len = self.length;
            if ("string" != typeof selector) return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(self[i], this)) return !0;
            }));
            for (i = 0; len > i; i++) jQuery.find(selector, self[i], ret);
            return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = this.selector ? this.selector + " " + selector : selector, 
            ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], !1));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], !0));
        },
        is: function(selector) {
            return !!winnow(this, "string" == typeof selector && rneedsContext.test(selector) ? jQuery(selector) : selector || [], !1).length;
        }
    });
    var rootjQuery, document = window.document, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function(selector, context) {
        var match, elem;
        if (!selector) return this;
        if ("string" == typeof selector) {
            if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [ null, selector, null ] : rquickExpr.exec(selector), 
            !match || !match[1] && context) return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
            if (match[1]) {
                if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, !0)), 
                rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) for (match in context) jQuery.isFunction(this[match]) ? this[match](context[match]) : this.attr(match, context[match]);
                return this;
            }
            if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
                if (elem.id !== match[2]) return rootjQuery.find(selector);
                this.length = 1, this[0] = elem;
            }
            return this.context = document, this.selector = selector, this;
        }
        return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, 
        this) : jQuery.isFunction(selector) ? "undefined" != typeof rootjQuery.ready ? rootjQuery.ready(selector) : selector(jQuery) : (void 0 !== selector.selector && (this.selector = selector.selector, 
        this.context = selector.context), jQuery.makeArray(selector, this));
    };
    init.prototype = jQuery.fn, rootjQuery = jQuery(document);
    var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    jQuery.extend({
        dir: function(elem, dir, until) {
            for (var matched = [], cur = elem[dir]; cur && 9 !== cur.nodeType && (void 0 === until || 1 !== cur.nodeType || !jQuery(cur).is(until)); ) 1 === cur.nodeType && matched.push(cur), 
            cur = cur[dir];
            return matched;
        },
        sibling: function(n, elem) {
            for (var r = []; n; n = n.nextSibling) 1 === n.nodeType && n !== elem && r.push(n);
            return r;
        }
    }), jQuery.fn.extend({
        has: function(target) {
            var i, targets = jQuery(target, this), len = targets.length;
            return this.filter(function() {
                for (i = 0; len > i; i++) if (jQuery.contains(this, targets[i])) return !0;
            });
        },
        closest: function(selectors, context) {
            for (var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || "string" != typeof selectors ? jQuery(selectors, context || this.context) : 0; l > i; i++) for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selectors))) {
                matched.push(cur);
                break;
            }
            return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
        },
        index: function(elem) {
            return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(selector, context) {
            return this.pushStack(jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context))));
        },
        addBack: function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
        }
    }), jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
        },
        parents: function(elem) {
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);
            return "Until" !== name.slice(-5) && (selector = until), selector && "string" == typeof selector && (ret = jQuery.filter(selector, ret)), 
            this.length > 1 && (guaranteedUnique[name] || (ret = jQuery.unique(ret)), rparentsprev.test(name) && (ret = ret.reverse())), 
            this.pushStack(ret);
        };
    });
    var rnotwhite = /\S+/g, optionsCache = {};
    jQuery.Callbacks = function(options) {
        options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, firingLength, firingIndex, firingStart, list = [], stack = !options.once && [], fire = function(data) {
            for (memory = options.memory && data, fired = !0, firingIndex = firingStart || 0, 
            firingStart = 0, firingLength = list.length, firing = !0; list && firingLength > firingIndex; firingIndex++) if (list[firingIndex].apply(data[0], data[1]) === !1 && options.stopOnFalse) {
                memory = !1;
                break;
            }
            firing = !1, list && (stack ? stack.length && fire(stack.shift()) : memory ? list = [] : self.disable());
        }, self = {
            add: function() {
                if (list) {
                    var start = list.length;
                    !function add(args) {
                        jQuery.each(args, function(_, arg) {
                            var type = jQuery.type(arg);
                            "function" === type ? options.unique && self.has(arg) || list.push(arg) : arg && arg.length && "string" !== type && add(arg);
                        });
                    }(arguments), firing ? firingLength = list.length : memory && (firingStart = start, 
                    fire(memory));
                }
                return this;
            },
            remove: function() {
                return list && jQuery.each(arguments, function(_, arg) {
                    for (var index; (index = jQuery.inArray(arg, list, index)) > -1; ) list.splice(index, 1), 
                    firing && (firingLength >= index && firingLength--, firingIndex >= index && firingIndex--);
                }), this;
            },
            has: function(fn) {
                return fn ? jQuery.inArray(fn, list) > -1 : !(!list || !list.length);
            },
            empty: function() {
                return list = [], firingLength = 0, this;
            },
            disable: function() {
                return list = stack = memory = void 0, this;
            },
            disabled: function() {
                return !list;
            },
            lock: function() {
                return stack = void 0, memory || self.disable(), this;
            },
            locked: function() {
                return !stack;
            },
            fireWith: function(context, args) {
                return !list || fired && !stack || (args = args || [], args = [ context, args.slice ? args.slice() : args ], 
                firing ? stack.push(args) : fire(args)), this;
            },
            fire: function() {
                return self.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!fired;
            }
        };
        return self;
    }, jQuery.extend({
        Deferred: function(func) {
            var tuples = [ [ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ], [ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ], [ "notify", "progress", jQuery.Callbacks("memory") ] ], state = "pending", promise = {
                state: function() {
                    return state;
                },
                always: function() {
                    return deferred.done(arguments).fail(arguments), this;
                },
                then: function() {
                    var fns = arguments;
                    return jQuery.Deferred(function(newDefer) {
                        jQuery.each(tuples, function(i, tuple) {
                            var fn = jQuery.isFunction(fns[i]) && fns[i];
                            deferred[tuple[1]](function() {
                                var returned = fn && fn.apply(this, arguments);
                                returned && jQuery.isFunction(returned.promise) ? returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify) : newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments);
                            });
                        }), fns = null;
                    }).promise();
                },
                promise: function(obj) {
                    return null != obj ? jQuery.extend(obj, promise) : promise;
                }
            }, deferred = {};
            return promise.pipe = promise.then, jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2], stateString = tuple[3];
                promise[tuple[1]] = list.add, stateString && list.add(function() {
                    state = stateString;
                }, tuples[1 ^ i][2].disable, tuples[2][2].lock), deferred[tuple[0]] = function() {
                    return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), 
                    this;
                }, deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
        },
        when: function(subordinate) {
            var progressValues, progressContexts, resolveContexts, i = 0, resolveValues = slice.call(arguments), length = resolveValues.length, remaining = 1 !== length || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = 1 === remaining ? subordinate : jQuery.Deferred(), updateFunc = function(i, contexts, values) {
                return function(value) {
                    contexts[i] = this, values[i] = arguments.length > 1 ? slice.call(arguments) : value, 
                    values === progressValues ? deferred.notifyWith(contexts, values) : --remaining || deferred.resolveWith(contexts, values);
                };
            };
            if (length > 1) for (progressValues = new Array(length), progressContexts = new Array(length), 
            resolveContexts = new Array(length); length > i; i++) resolveValues[i] && jQuery.isFunction(resolveValues[i].promise) ? resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues)) : --remaining;
            return remaining || deferred.resolveWith(resolveContexts, resolveValues), deferred.promise();
        }
    });
    var readyList;
    jQuery.fn.ready = function(fn) {
        return jQuery.ready.promise().done(fn), this;
    }, jQuery.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(hold) {
            hold ? jQuery.readyWait++ : jQuery.ready(!0);
        },
        ready: function(wait) {
            if (wait === !0 ? !--jQuery.readyWait : !jQuery.isReady) {
                if (!document.body) return setTimeout(jQuery.ready);
                jQuery.isReady = !0, wait !== !0 && --jQuery.readyWait > 0 || (readyList.resolveWith(document, [ jQuery ]), 
                jQuery.fn.triggerHandler && (jQuery(document).triggerHandler("ready"), jQuery(document).off("ready")));
            }
        }
    }), jQuery.ready.promise = function(obj) {
        if (!readyList) if (readyList = jQuery.Deferred(), "complete" === document.readyState) setTimeout(jQuery.ready); else if (document.addEventListener) document.addEventListener("DOMContentLoaded", completed, !1), 
        window.addEventListener("load", completed, !1); else {
            document.attachEvent("onreadystatechange", completed), window.attachEvent("onload", completed);
            var top = !1;
            try {
                top = null == window.frameElement && document.documentElement;
            } catch (e) {}
            top && top.doScroll && !function doScrollCheck() {
                if (!jQuery.isReady) {
                    try {
                        top.doScroll("left");
                    } catch (e) {
                        return setTimeout(doScrollCheck, 50);
                    }
                    detach(), jQuery.ready();
                }
            }();
        }
        return readyList.promise(obj);
    };
    var i, strundefined = "undefined";
    for (i in jQuery(support)) break;
    support.ownLast = "0" !== i, support.inlineBlockNeedsLayout = !1, jQuery(function() {
        var val, div, body, container;
        body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), 
        container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
        body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", 
        support.inlineBlockNeedsLayout = val = 3 === div.offsetWidth, val && (body.style.zoom = 1)), 
        body.removeChild(container));
    }), function() {
        var div = document.createElement("div");
        if (null == support.deleteExpando) {
            support.deleteExpando = !0;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = !1;
            }
        }
        div = null;
    }(), jQuery.acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()], nodeType = +elem.nodeType || 1;
        return 1 !== nodeType && 9 !== nodeType ? !1 : !noData || noData !== !0 && elem.getAttribute("classid") === noData;
    };
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    jQuery.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(elem) {
            return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], 
            !!elem && !isEmptyDataObject(elem);
        },
        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },
        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },
        _data: function(elem, name, data) {
            return internalData(elem, name, data, !0);
        },
        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, !0);
        }
    }), jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data, elem = this[0], attrs = elem && elem.attributes;
            if (void 0 === key) {
                if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
                    for (i = attrs.length; i--; ) attrs[i] && (name = attrs[i].name, 0 === name.indexOf("data-") && (name = jQuery.camelCase(name.slice(5)), 
                    dataAttr(elem, name, data[name])));
                    jQuery._data(elem, "parsedAttrs", !0);
                }
                return data;
            }
            return "object" == typeof key ? this.each(function() {
                jQuery.data(this, key);
            }) : arguments.length > 1 ? this.each(function() {
                jQuery.data(this, key, value);
            }) : elem ? dataAttr(elem, key, jQuery.data(elem, key)) : void 0;
        },
        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    }), jQuery.extend({
        queue: function(elem, type, data) {
            var queue;
            return elem ? (type = (type || "fx") + "queue", queue = jQuery._data(elem, type), 
            data && (!queue || jQuery.isArray(data) ? queue = jQuery._data(elem, type, jQuery.makeArray(data)) : queue.push(data)), 
            queue || []) : void 0;
        },
        dequeue: function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
                jQuery.dequeue(elem, type);
            };
            "inprogress" === fn && (fn = queue.shift(), startLength--), fn && ("fx" === type && queue.unshift("inprogress"), 
            delete hooks.stop, fn.call(elem, next, hooks)), !startLength && hooks && hooks.empty.fire();
        },
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue"), jQuery._removeData(elem, key);
                })
            });
        }
    }), jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
                var queue = jQuery.queue(this, type, data);
                jQuery._queueHooks(this, type), "fx" === type && "inprogress" !== queue[0] && jQuery.dequeue(this, type);
            });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },
        promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
                --count || defer.resolveWith(elements, [ elements ]);
            };
            for ("string" != typeof type && (obj = type, type = void 0), type = type || "fx"; i--; ) tmp = jQuery._data(elements[i], type + "queueHooks"), 
            tmp && tmp.empty && (count++, tmp.empty.add(resolve));
            return resolve(), defer.promise(obj);
        }
    });
    var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, cssExpand = [ "Top", "Right", "Bottom", "Left" ], isHidden = function(elem, el) {
        return elem = el || elem, "none" === jQuery.css(elem, "display") || !jQuery.contains(elem.ownerDocument, elem);
    }, access = jQuery.access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, length = elems.length, bulk = null == key;
        if ("object" === jQuery.type(key)) {
            chainable = !0;
            for (i in key) jQuery.access(elems, fn, i, key[i], !0, emptyGet, raw);
        } else if (void 0 !== value && (chainable = !0, jQuery.isFunction(value) || (raw = !0), 
        bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, key, value) {
            return bulk.call(jQuery(elem), value);
        })), fn)) for (;length > i; i++) fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    }, rcheckableType = /^(?:checkbox|radio)$/i;
    !function() {
        var input = document.createElement("input"), div = document.createElement("div"), fragment = document.createDocumentFragment();
        if (div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        support.leadingWhitespace = 3 === div.firstChild.nodeType, support.tbody = !div.getElementsByTagName("tbody").length, 
        support.htmlSerialize = !!div.getElementsByTagName("link").length, support.html5Clone = "<:nav></:nav>" !== document.createElement("nav").cloneNode(!0).outerHTML, 
        input.type = "checkbox", input.checked = !0, fragment.appendChild(input), support.appendChecked = input.checked, 
        div.innerHTML = "<textarea>x</textarea>", support.noCloneChecked = !!div.cloneNode(!0).lastChild.defaultValue, 
        fragment.appendChild(div), div.innerHTML = "<input type='radio' checked='checked' name='t'/>", 
        support.checkClone = div.cloneNode(!0).cloneNode(!0).lastChild.checked, support.noCloneEvent = !0, 
        div.attachEvent && (div.attachEvent("onclick", function() {
            support.noCloneEvent = !1;
        }), div.cloneNode(!0).click()), null == support.deleteExpando) {
            support.deleteExpando = !0;
            try {
                delete div.test;
            } catch (e) {
                support.deleteExpando = !1;
            }
        }
    }(), function() {
        var i, eventName, div = document.createElement("div");
        for (i in {
            submit: !0,
            change: !0,
            focusin: !0
        }) eventName = "on" + i, (support[i + "Bubbles"] = eventName in window) || (div.setAttribute(eventName, "t"), 
        support[i + "Bubbles"] = div.attributes[eventName].expando === !1);
        div = null;
    }();
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
    jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
            if (elemData) {
                for (handler.handler && (handleObjIn = handler, handler = handleObjIn.handler, selector = handleObjIn.selector), 
                handler.guid || (handler.guid = jQuery.guid++), (events = elemData.events) || (events = elemData.events = {}), 
                (eventHandle = elemData.handle) || (eventHandle = elemData.handle = function(e) {
                    return typeof jQuery === strundefined || e && jQuery.event.triggered === e.type ? void 0 : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
                }, eventHandle.elem = elem), types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type && (special = jQuery.event.special[type] || {}, 
                type = (selector ? special.delegateType : special.bindType) || type, special = jQuery.event.special[type] || {}, 
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn), (handlers = events[type]) || (handlers = events[type] = [], handlers.delegateCount = 0, 
                special.setup && special.setup.call(elem, data, namespaces, eventHandle) !== !1 || (elem.addEventListener ? elem.addEventListener(type, eventHandle, !1) : elem.attachEvent && elem.attachEvent("on" + type, eventHandle))), 
                special.add && (special.add.call(elem, handleObj), handleObj.handler.guid || (handleObj.handler.guid = handler.guid)), 
                selector ? handlers.splice(handlers.delegateCount++, 0, handleObj) : handlers.push(handleObj), 
                jQuery.event.global[type] = !0);
                elem = null;
            }
        },
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
            if (elemData && (events = elemData.events)) {
                for (types = (types || "").match(rnotwhite) || [ "" ], t = types.length; t--; ) if (tmp = rtypenamespace.exec(types[t]) || [], 
                type = origType = tmp[1], namespaces = (tmp[2] || "").split(".").sort(), type) {
                    for (special = jQuery.event.special[type] || {}, type = (selector ? special.delegateType : special.bindType) || type, 
                    handlers = events[type] || [], tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)"), 
                    origCount = j = handlers.length; j--; ) handleObj = handlers[j], !mappedTypes && origType !== handleObj.origType || handler && handler.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector) || (handlers.splice(j, 1), 
                    handleObj.selector && handlers.delegateCount--, special.remove && special.remove.call(elem, handleObj));
                    origCount && !handlers.length && (special.teardown && special.teardown.call(elem, namespaces, elemData.handle) !== !1 || jQuery.removeEvent(elem, type, elemData.handle), 
                    delete events[type]);
                } else for (type in events) jQuery.event.remove(elem, type + types[t], handler, selector, !0);
                jQuery.isEmptyObject(events) && (delete elemData.handle, jQuery._removeData(elem, "events"));
            }
        },
        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [ elem || document ], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (namespaces = type.split("."), 
            type = namespaces.shift(), namespaces.sort()), ontype = type.indexOf(":") < 0 && "on" + type, 
            event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event), 
            event.isTrigger = onlyHandlers ? 2 : 3, event.namespace = namespaces.join("."), 
            event.namespace_re = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            event.result = void 0, event.target || (event.target = elem), data = null == data ? [ event ] : jQuery.makeArray(data, [ event ]), 
            special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || special.trigger.apply(elem, data) !== !1)) {
                if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
                    for (bubbleType = special.delegateType || type, rfocusMorph.test(bubbleType + type) || (cur = cur.parentNode); cur; cur = cur.parentNode) eventPath.push(cur), 
                    tmp = cur;
                    tmp === (elem.ownerDocument || document) && eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
                for (i = 0; (cur = eventPath[i++]) && !event.isPropagationStopped(); ) event.type = i > 1 ? bubbleType : special.bindType || type, 
                handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle"), 
                handle && handle.apply(cur, data), handle = ontype && cur[ontype], handle && handle.apply && jQuery.acceptData(cur) && (event.result = handle.apply(cur, data), 
                event.result === !1 && event.preventDefault());
                if (event.type = type, !onlyHandlers && !event.isDefaultPrevented() && (!special._default || special._default.apply(eventPath.pop(), data) === !1) && jQuery.acceptData(elem) && ontype && elem[type] && !jQuery.isWindow(elem)) {
                    tmp = elem[ontype], tmp && (elem[ontype] = null), jQuery.event.triggered = type;
                    try {
                        elem[type]();
                    } catch (e) {}
                    jQuery.event.triggered = void 0, tmp && (elem[ontype] = tmp);
                }
                return event.result;
            }
        },
        dispatch: function(event) {
            event = jQuery.event.fix(event);
            var i, ret, handleObj, matched, j, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, "events") || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
            if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== !1) {
                for (handlerQueue = jQuery.event.handlers.call(this, event, handlers), i = 0; (matched = handlerQueue[i++]) && !event.isPropagationStopped(); ) for (event.currentTarget = matched.elem, 
                j = 0; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped(); ) (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) && (event.handleObj = handleObj, 
                event.data = handleObj.data, ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args), 
                void 0 !== ret && (event.result = ret) === !1 && (event.preventDefault(), event.stopPropagation()));
                return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
        },
        handlers: function(event, handlers) {
            var sel, handleObj, matches, i, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) for (;cur != this; cur = cur.parentNode || this) if (1 === cur.nodeType && (cur.disabled !== !0 || "click" !== event.type)) {
                for (matches = [], i = 0; delegateCount > i; i++) handleObj = handlers[i], sel = handleObj.selector + " ", 
                void 0 === matches[sel] && (matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [ cur ]).length), 
                matches[sel] && matches.push(handleObj);
                matches.length && handlerQueue.push({
                    elem: cur,
                    handlers: matches
                });
            }
            return delegateCount < handlers.length && handlerQueue.push({
                elem: this,
                handlers: handlers.slice(delegateCount)
            }), handlerQueue;
        },
        fix: function(event) {
            if (event[jQuery.expando]) return event;
            var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
            for (fixHook || (this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {}), 
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props, event = new jQuery.Event(originalEvent), 
            i = copy.length; i--; ) prop = copy[i], event[prop] = originalEvent[prop];
            return event.target || (event.target = originalEvent.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), 
            event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {
                return null == event.which && (event.which = null != original.charCode ? original.charCode : original.keyCode), 
                event;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
                return null == event.pageX && null != original.clientX && (eventDoc = event.target.ownerDocument || document, 
                doc = eventDoc.documentElement, body = eventDoc.body, event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), 
                event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), 
                !event.relatedTarget && fromElement && (event.relatedTarget = fromElement === event.target ? original.toElement : fromElement), 
                event.which || void 0 === button || (event.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), 
                event;
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) try {
                        return this.focus(), !1;
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === safeActiveElement() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), 
                    !1) : void 0;
                },
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(event) {
                    void 0 !== event.result && event.originalEvent && (event.originalEvent.returnValue = event.result);
                }
            }
        },
        simulate: function(type, elem, event, bubble) {
            var e = jQuery.extend(new jQuery.Event(), event, {
                type: type,
                isSimulated: !0,
                originalEvent: {}
            });
            bubble ? jQuery.event.trigger(e, null, elem) : jQuery.event.dispatch.call(elem, e), 
            e.isDefaultPrevented() && event.preventDefault();
        }
    }, jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle) {
        elem.removeEventListener && elem.removeEventListener(type, handle, !1);
    } : function(elem, type, handle) {
        var name = "on" + type;
        elem.detachEvent && (typeof elem[name] === strundefined && (elem[name] = null), 
        elem.detachEvent(name, handle));
    }, jQuery.Event = function(src, props) {
        return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, 
        this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && src.returnValue === !1 ? returnTrue : returnFalse) : this.type = src, 
        props && jQuery.extend(this, props), this.timeStamp = src && src.timeStamp || jQuery.now(), 
        void (this[jQuery.expando] = !0)) : new jQuery.Event(src, props);
    }, jQuery.Event.prototype = {
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue, e && (e.stopPropagation && e.stopPropagation(), 
            e.cancelBubble = !0);
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), 
            this.stopPropagation();
        }
    }, jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
                var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
                return (!related || related !== target && !jQuery.contains(target, related)) && (event.type = handleObj.origType, 
                ret = handleObj.handler.apply(this, arguments), event.type = fix), ret;
            }
        };
    }), support.submitBubbles || (jQuery.event.special.submit = {
        setup: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.add(this, "click._submit keypress._submit", function(e) {
                var elem = e.target, form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : void 0;
                form && !jQuery._data(form, "submitBubbles") && (jQuery.event.add(form, "submit._submit", function(event) {
                    event._submit_bubble = !0;
                }), jQuery._data(form, "submitBubbles", !0));
            });
        },
        postDispatch: function(event) {
            event._submit_bubble && (delete event._submit_bubble, this.parentNode && !event.isTrigger && jQuery.event.simulate("submit", this.parentNode, event, !0));
        },
        teardown: function() {
            return jQuery.nodeName(this, "form") ? !1 : void jQuery.event.remove(this, "._submit");
        }
    }), support.changeBubbles || (jQuery.event.special.change = {
        setup: function() {
            return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
                "checked" === event.originalEvent.propertyName && (this._just_changed = !0);
            }), jQuery.event.add(this, "click._change", function(event) {
                this._just_changed && !event.isTrigger && (this._just_changed = !1), jQuery.event.simulate("change", this, event, !0);
            })), !1) : void jQuery.event.add(this, "beforeactivate._change", function(e) {
                var elem = e.target;
                rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles") && (jQuery.event.add(elem, "change._change", function(event) {
                    !this.parentNode || event.isSimulated || event.isTrigger || jQuery.event.simulate("change", this.parentNode, event, !0);
                }), jQuery._data(elem, "changeBubbles", !0));
            });
        },
        handle: function(event) {
            var elem = event.target;
            return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : void 0;
        },
        teardown: function() {
            return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
        }
    }), support.focusinBubbles || jQuery.each({
        focus: "focusin",
        blur: "focusout"
    }, function(orig, fix) {
        var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), !0);
        };
        jQuery.event.special[fix] = {
            setup: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
                attaches || doc.addEventListener(orig, handler, !0), jQuery._data(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
                var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
                attaches ? jQuery._data(doc, fix, attaches) : (doc.removeEventListener(orig, handler, !0), 
                jQuery._removeData(doc, fix));
            }
        };
    }), jQuery.fn.extend({
        on: function(types, selector, data, fn, one) {
            var type, origFn;
            if ("object" == typeof types) {
                "string" != typeof selector && (data = data || selector, selector = void 0);
                for (type in types) this.on(type, selector, data, types[type], one);
                return this;
            }
            if (null == data && null == fn ? (fn = selector, data = selector = void 0) : null == fn && ("string" == typeof selector ? (fn = data, 
            data = void 0) : (fn = data, data = selector, selector = void 0)), fn === !1) fn = returnFalse; else if (!fn) return this;
            return 1 === one && (origFn = fn, fn = function(event) {
                return jQuery().off(event), origFn.apply(this, arguments);
            }, fn.guid = origFn.guid || (origFn.guid = jQuery.guid++)), this.each(function() {
                jQuery.event.add(this, types, fn, data, selector);
            });
        },
        one: function(types, selector, data, fn) {
            return this.on(types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) return handleObj = types.handleObj, 
            jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), 
            this;
            if ("object" == typeof types) {
                for (type in types) this.off(type, selector, types[type]);
                return this;
            }
            return (selector === !1 || "function" == typeof selector) && (fn = selector, selector = void 0), 
            fn === !1 && (fn = returnFalse), this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },
        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            return elem ? jQuery.event.trigger(type, data, elem, !0) : void 0;
        }
    });
    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"), rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        area: [ 1, "<map>", "</map>" ],
        param: [ 1, "<object>", "</object>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
    }, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement("div"));
    wrapMap.optgroup = wrapMap.option, wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead, 
    wrapMap.th = wrapMap.td, jQuery.extend({
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
            if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(!0) : (fragmentDiv.innerHTML = elem.outerHTML, 
            fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(support.noCloneEvent && support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) for (destElements = getAll(clone), 
            srcElements = getAll(elem), i = 0; null != (node = srcElements[i]); ++i) destElements[i] && fixCloneNodeIssues(node, destElements[i]);
            if (dataAndEvents) if (deepDataAndEvents) for (srcElements = srcElements || getAll(elem), 
            destElements = destElements || getAll(clone), i = 0; null != (node = srcElements[i]); i++) cloneCopyEvent(node, destElements[i]); else cloneCopyEvent(elem, clone);
            return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), 
            destElements = srcElements = node = null, clone;
        },
        buildFragment: function(elems, context, scripts, selection) {
            for (var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length, safe = createSafeFragment(context), nodes = [], i = 0; l > i; i++) if (elem = elems[i], 
            elem || 0 === elem) if ("object" === jQuery.type(elem)) jQuery.merge(nodes, elem.nodeType ? [ elem ] : elem); else if (rhtml.test(elem)) {
                for (tmp = tmp || safe.appendChild(context.createElement("div")), tag = (rtagName.exec(elem) || [ "", "" ])[1].toLowerCase(), 
                wrap = wrapMap[tag] || wrapMap._default, tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2], 
                j = wrap[0]; j--; ) tmp = tmp.lastChild;
                if (!support.leadingWhitespace && rleadingWhitespace.test(elem) && nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0])), 
                !support.tbody) for (elem = "table" !== tag || rtbody.test(elem) ? "<table>" !== wrap[1] || rtbody.test(elem) ? 0 : tmp : tmp.firstChild, 
                j = elem && elem.childNodes.length; j--; ) jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length && elem.removeChild(tbody);
                for (jQuery.merge(nodes, tmp.childNodes), tmp.textContent = ""; tmp.firstChild; ) tmp.removeChild(tmp.firstChild);
                tmp = safe.lastChild;
            } else nodes.push(context.createTextNode(elem));
            for (tmp && safe.removeChild(tmp), support.appendChecked || jQuery.grep(getAll(nodes, "input"), fixDefaultChecked), 
            i = 0; elem = nodes[i++]; ) if ((!selection || -1 === jQuery.inArray(elem, selection)) && (contains = jQuery.contains(elem.ownerDocument, elem), 
            tmp = getAll(safe.appendChild(elem), "script"), contains && setGlobalEval(tmp), 
            scripts)) for (j = 0; elem = tmp[j++]; ) rscriptType.test(elem.type || "") && scripts.push(elem);
            return tmp = null, safe;
        },
        cleanData: function(elems, acceptData) {
            for (var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, deleteExpando = support.deleteExpando, special = jQuery.event.special; null != (elem = elems[i]); i++) if ((acceptData || jQuery.acceptData(elem)) && (id = elem[internalKey], 
            data = id && cache[id])) {
                if (data.events) for (type in data.events) special[type] ? jQuery.event.remove(elem, type) : jQuery.removeEvent(elem, type, data.handle);
                cache[id] && (delete cache[id], deleteExpando ? delete elem[internalKey] : typeof elem.removeAttribute !== strundefined ? elem.removeAttribute(internalKey) : elem[internalKey] = null, 
                deletedIds.push(id));
            }
        }
    }), jQuery.fn.extend({
        text: function(value) {
            return access(this, function(value) {
                return void 0 === value ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
            }, null, value, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(elem) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this);
            });
        },
        after: function() {
            return this.domManip(arguments, function(elem) {
                this.parentNode && this.parentNode.insertBefore(elem, this.nextSibling);
            });
        },
        remove: function(selector, keepData) {
            for (var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0; null != (elem = elems[i]); i++) keepData || 1 !== elem.nodeType || jQuery.cleanData(getAll(elem)), 
            elem.parentNode && (keepData && jQuery.contains(elem.ownerDocument, elem) && setGlobalEval(getAll(elem, "script")), 
            elem.parentNode.removeChild(elem));
            return this;
        },
        empty: function() {
            for (var elem, i = 0; null != (elem = this[i]); i++) {
                for (1 === elem.nodeType && jQuery.cleanData(getAll(elem, !1)); elem.firstChild; ) elem.removeChild(elem.firstChild);
                elem.options && jQuery.nodeName(elem, "select") && (elem.options.length = 0);
            }
            return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
            return dataAndEvents = null == dataAndEvents ? !1 : dataAndEvents, deepDataAndEvents = null == deepDataAndEvents ? dataAndEvents : deepDataAndEvents, 
            this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },
        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {}, i = 0, l = this.length;
                if (void 0 === value) return 1 === elem.nodeType ? elem.innerHTML.replace(rinlinejQuery, "") : void 0;
                if (!("string" != typeof value || rnoInnerhtml.test(value) || !support.htmlSerialize && rnoshimcache.test(value) || !support.leadingWhitespace && rleadingWhitespace.test(value) || wrapMap[(rtagName.exec(value) || [ "", "" ])[1].toLowerCase()])) {
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    try {
                        for (;l > i; i++) elem = this[i] || {}, 1 === elem.nodeType && (jQuery.cleanData(getAll(elem, !1)), 
                        elem.innerHTML = value);
                        elem = 0;
                    } catch (e) {}
                }
                elem && this.empty().append(value);
            }, null, value, arguments.length);
        },
        replaceWith: function() {
            var arg = arguments[0];
            return this.domManip(arguments, function(elem) {
                arg = this.parentNode, jQuery.cleanData(getAll(this)), arg && arg.replaceChild(elem, this);
            }), arg && (arg.length || arg.nodeType) ? this : this.remove();
        },
        detach: function(selector) {
            return this.remove(selector, !0);
        },
        domManip: function(args, callback) {
            args = concat.apply([], args);
            var first, node, hasScripts, scripts, doc, fragment, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
            if (isFunction || l > 1 && "string" == typeof value && !support.checkClone && rchecked.test(value)) return this.each(function(index) {
                var self = set.eq(index);
                isFunction && (args[0] = value.call(this, index, self.html())), self.domManip(args, callback);
            });
            if (l && (fragment = jQuery.buildFragment(args, this[0].ownerDocument, !1, this), 
            first = fragment.firstChild, 1 === fragment.childNodes.length && (fragment = first), 
            first)) {
                for (scripts = jQuery.map(getAll(fragment, "script"), disableScript), hasScripts = scripts.length; l > i; i++) node = fragment, 
                i !== iNoClone && (node = jQuery.clone(node, !0, !0), hasScripts && jQuery.merge(scripts, getAll(node, "script"))), 
                callback.call(this[i], node, i);
                if (hasScripts) for (doc = scripts[scripts.length - 1].ownerDocument, jQuery.map(scripts, restoreScript), 
                i = 0; hasScripts > i; i++) node = scripts[i], rscriptType.test(node.type || "") && !jQuery._data(node, "globalEval") && jQuery.contains(doc, node) && (node.src ? jQuery._evalUrl && jQuery._evalUrl(node.src) : jQuery.globalEval((node.text || node.textContent || node.innerHTML || "").replace(rcleanScript, "")));
                fragment = first = null;
            }
            return this;
        }
    }), jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            for (var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1; last >= i; i++) elems = i === last ? this : this.clone(!0), 
            jQuery(insert[i])[original](elems), push.apply(ret, elems.get());
            return this.pushStack(ret);
        };
    });
    var iframe, elemdisplay = {};
    !function() {
        var shrinkWrapBlocksVal;
        support.shrinkWrapBlocks = function() {
            if (null != shrinkWrapBlocksVal) return shrinkWrapBlocksVal;
            shrinkWrapBlocksVal = !1;
            var div, body, container;
            return body = document.getElementsByTagName("body")[0], body && body.style ? (div = document.createElement("div"), 
            container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            body.appendChild(container).appendChild(div), typeof div.style.zoom !== strundefined && (div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", 
            div.appendChild(document.createElement("div")).style.width = "5px", shrinkWrapBlocksVal = 3 !== div.offsetWidth), 
            body.removeChild(container), shrinkWrapBlocksVal) : void 0;
        };
    }();
    var getStyles, curCSS, rmargin = /^margin/, rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i"), rposition = /^(top|right|bottom|left)$/;
    window.getComputedStyle ? (getStyles = function(elem) {
        return elem.ownerDocument.defaultView.opener ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : window.getComputedStyle(elem, null);
    }, curCSS = function(elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : void 0, 
        computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), 
        rnumnonpx.test(ret) && rmargin.test(name) && (width = style.width, minWidth = style.minWidth, 
        maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, 
        ret = computed.width, style.width = width, style.minWidth = minWidth, style.maxWidth = maxWidth)), 
        void 0 === ret ? ret : ret + "";
    }) : document.documentElement.currentStyle && (getStyles = function(elem) {
        return elem.currentStyle;
    }, curCSS = function(elem, name, computed) {
        var left, rs, rsLeft, ret, style = elem.style;
        return computed = computed || getStyles(elem), ret = computed ? computed[name] : void 0, 
        null == ret && style && style[name] && (ret = style[name]), rnumnonpx.test(ret) && !rposition.test(name) && (left = style.left, 
        rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), 
        style.left = "fontSize" === name ? "1em" : ret, ret = style.pixelLeft + "px", style.left = left, 
        rsLeft && (rs.left = rsLeft)), void 0 === ret ? ret : ret + "" || "auto";
    }), function() {
        function computeStyleTests() {
            var div, body, container, contents;
            body = document.getElementsByTagName("body")[0], body && body.style && (div = document.createElement("div"), 
            container = document.createElement("div"), container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", 
            body.appendChild(container).appendChild(div), div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", 
            pixelPositionVal = boxSizingReliableVal = !1, reliableMarginRightVal = !0, window.getComputedStyle && (pixelPositionVal = "1%" !== (window.getComputedStyle(div, null) || {}).top, 
            boxSizingReliableVal = "4px" === (window.getComputedStyle(div, null) || {
                width: "4px"
            }).width, contents = div.appendChild(document.createElement("div")), contents.style.cssText = div.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
            contents.style.marginRight = contents.style.width = "0", div.style.width = "1px", 
            reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents, null) || {}).marginRight), 
            div.removeChild(contents)), div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", 
            contents = div.getElementsByTagName("td"), contents[0].style.cssText = "margin:0;border:0;padding:0;display:none", 
            reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight, reliableHiddenOffsetsVal && (contents[0].style.display = "", 
            contents[1].style.display = "none", reliableHiddenOffsetsVal = 0 === contents[0].offsetHeight), 
            body.removeChild(container));
        }
        var div, style, a, pixelPositionVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal;
        div = document.createElement("div"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = div.getElementsByTagName("a")[0], style = a && a.style, style && (style.cssText = "float:left;opacity:.5", 
        support.opacity = "0.5" === style.opacity, support.cssFloat = !!style.cssFloat, 
        div.style.backgroundClip = "content-box", div.cloneNode(!0).style.backgroundClip = "", 
        support.clearCloneStyle = "content-box" === div.style.backgroundClip, support.boxSizing = "" === style.boxSizing || "" === style.MozBoxSizing || "" === style.WebkitBoxSizing, 
        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                return null == reliableHiddenOffsetsVal && computeStyleTests(), reliableHiddenOffsetsVal;
            },
            boxSizingReliable: function() {
                return null == boxSizingReliableVal && computeStyleTests(), boxSizingReliableVal;
            },
            pixelPosition: function() {
                return null == pixelPositionVal && computeStyleTests(), pixelPositionVal;
            },
            reliableMarginRight: function() {
                return null == reliableMarginRightVal && computeStyleTests(), reliableMarginRightVal;
            }
        }));
    }(), jQuery.swap = function(elem, options, callback, args) {
        var ret, name, old = {};
        for (name in options) old[name] = elem.style[name], elem.style[name] = options[name];
        ret = callback.apply(elem, args || []);
        for (name in options) elem.style[name] = old[name];
        return ret;
    };
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"), rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"), cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
    }, cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
    jQuery.extend({
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {
                        var ret = curCSS(elem, "opacity");
                        return "" === ret ? "1" : ret;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
                var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
                if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), 
                hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], void 0 === value) return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, !1, extra)) ? ret : style[name];
                if (type = typeof value, "string" === type && (ret = rrelNum.exec(value)) && (value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name)), 
                type = "number"), null != value && value === value && ("number" !== type || jQuery.cssNumber[origName] || (value += "px"), 
                support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), 
                !(hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra))))) try {
                    style[name] = value;
                } catch (e) {}
            }
        },
        css: function(elem, name, extra, styles) {
            var num, val, hooks, origName = jQuery.camelCase(name);
            return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), 
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, !0, extra)), 
            void 0 === val && (val = curCSS(elem, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), 
            "" === extra || extra ? (num = parseFloat(val), extra === !0 || jQuery.isNumeric(num) ? num || 0 : val) : val;
        }
    }), jQuery.each([ "height", "width" ], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                return computed ? rdisplayswap.test(jQuery.css(elem, "display")) && 0 === elem.offsetWidth ? jQuery.swap(elem, cssShow, function() {
                    return getWidthOrHeight(elem, name, extra);
                }) : getWidthOrHeight(elem, name, extra) : void 0;
            },
            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", !1, styles), styles) : 0);
            }
        };
    }), support.opacity || (jQuery.cssHooks.opacity = {
        get: function(elem, computed) {
            return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : computed ? "1" : "";
        },
        set: function(elem, value) {
            var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "", filter = currentStyle && currentStyle.filter || style.filter || "";
            style.zoom = 1, (value >= 1 || "" === value) && "" === jQuery.trim(filter.replace(ralpha, "")) && style.removeAttribute && (style.removeAttribute("filter"), 
            "" === value || currentStyle && !currentStyle.filter) || (style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity);
        }
    }), jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function(elem, computed) {
        return computed ? jQuery.swap(elem, {
            display: "inline-block"
        }, curCSS, [ elem, "marginRight" ]) : void 0;
    }), jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                for (var i = 0, expanded = {}, parts = "string" == typeof value ? value.split(" ") : [ value ]; 4 > i; i++) expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
                return expanded;
            }
        }, rmargin.test(prefix) || (jQuery.cssHooks[prefix + suffix].set = setPositiveNumber);
    }), jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len, map = {}, i = 0;
                if (jQuery.isArray(name)) {
                    for (styles = getStyles(elem), len = name.length; len > i; i++) map[name[i]] = jQuery.css(elem, name[i], !1, styles);
                    return map;
                }
                return void 0 !== value ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, !0);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
                isHidden(this) ? jQuery(this).show() : jQuery(this).hide();
            });
        }
    }), jQuery.Tween = Tween, Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem, this.prop = prop, this.easing = easing || "swing", this.options = options, 
            this.start = this.now = this.cur(), this.end = end, this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, 
            this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
            hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
        }
    }, Tween.prototype.init.prototype = Tween.prototype, Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;
                return null == tween.elem[tween.prop] || tween.elem.style && null != tween.elem.style[tween.prop] ? (result = jQuery.css(tween.elem, tween.prop, ""), 
                result && "auto" !== result ? result : 0) : tween.elem[tween.prop];
            },
            set: function(tween) {
                jQuery.fx.step[tween.prop] ? jQuery.fx.step[tween.prop](tween) : tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop]) ? jQuery.style(tween.elem, tween.prop, tween.now + tween.unit) : tween.elem[tween.prop] = tween.now;
            }
        }
    }, Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            tween.elem.nodeType && tween.elem.parentNode && (tween.elem[tween.prop] = tween.now);
        }
    }, jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
        }
    }, jQuery.fx = Tween.prototype.init, jQuery.fx.step = {};
    var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"), rrun = /queueHooks$/, animationPrefilters = [ defaultPrefilter ], tweeners = {
        "*": [ function(prop, value) {
            var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), start = (jQuery.cssNumber[prop] || "px" !== unit && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
            if (start && start[3] !== unit) {
                unit = unit || start[3], parts = parts || [], start = +target || 1;
                do scale = scale || ".5", start /= scale, jQuery.style(tween.elem, prop, start + unit); while (scale !== (scale = tween.cur() / target) && 1 !== scale && --maxIterations);
            }
            return parts && (start = tween.start = +start || +target || 0, tween.unit = unit, 
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2]), tween;
        } ]
    };
    jQuery.Animation = jQuery.extend(Animation, {
        tweener: function(props, callback) {
            jQuery.isFunction(props) ? (callback = props, props = [ "*" ]) : props = props.split(" ");
            for (var prop, index = 0, length = props.length; length > index; index++) prop = props[index], 
            tweeners[prop] = tweeners[prop] || [], tweeners[prop].unshift(callback);
        },
        prefilter: function(callback, prepend) {
            prepend ? animationPrefilters.unshift(callback) : animationPrefilters.push(callback);
        }
    }), jQuery.speed = function(speed, easing, fn) {
        var opt = speed && "object" == typeof speed ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };
        return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, 
        (null == opt.queue || opt.queue === !0) && (opt.queue = "fx"), opt.old = opt.complete, 
        opt.complete = function() {
            jQuery.isFunction(opt.old) && opt.old.call(this), opt.queue && jQuery.dequeue(this, opt.queue);
        }, opt;
    }, jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
                var anim = Animation(this, jQuery.extend({}, prop), optall);
                (empty || jQuery._data(this, "finish")) && anim.stop(!0);
            };
            return doAnimation.finish = doAnimation, empty || optall.queue === !1 ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop, stop(gotoEnd);
            };
            return "string" != typeof type && (gotoEnd = clearQueue, clearQueue = type, type = void 0), 
            clearQueue && type !== !1 && this.queue(type || "fx", []), this.each(function() {
                var dequeue = !0, index = null != type && type + "queueHooks", timers = jQuery.timers, data = jQuery._data(this);
                if (index) data[index] && data[index].stop && stopQueue(data[index]); else for (index in data) data[index] && data[index].stop && rrun.test(index) && stopQueue(data[index]);
                for (index = timers.length; index--; ) timers[index].elem !== this || null != type && timers[index].queue !== type || (timers[index].anim.stop(gotoEnd), 
                dequeue = !1, timers.splice(index, 1));
                (dequeue || !gotoEnd) && jQuery.dequeue(this, type);
            });
        },
        finish: function(type) {
            return type !== !1 && (type = type || "fx"), this.each(function() {
                var index, data = jQuery._data(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
                for (data.finish = !0, jQuery.queue(this, type, []), hooks && hooks.stop && hooks.stop.call(this, !0), 
                index = timers.length; index--; ) timers[index].elem === this && timers[index].queue === type && (timers[index].anim.stop(!0), 
                timers.splice(index, 1));
                for (index = 0; length > index; index++) queue[index] && queue[index].finish && queue[index].finish.call(this);
                delete data.finish;
            });
        }
    }), jQuery.each([ "toggle", "show", "hide" ], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return null == speed || "boolean" == typeof speed ? cssFn.apply(this, arguments) : this.animate(genFx(name, !0), speed, easing, callback);
        };
    }), jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    }), jQuery.timers = [], jQuery.fx.tick = function() {
        var timer, timers = jQuery.timers, i = 0;
        for (fxNow = jQuery.now(); i < timers.length; i++) timer = timers[i], timer() || timers[i] !== timer || timers.splice(i--, 1);
        timers.length || jQuery.fx.stop(), fxNow = void 0;
    }, jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer), timer() ? jQuery.fx.start() : jQuery.timers.pop();
    }, jQuery.fx.interval = 13, jQuery.fx.start = function() {
        timerId || (timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval));
    }, jQuery.fx.stop = function() {
        clearInterval(timerId), timerId = null;
    }, jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, jQuery.fn.delay = function(time, type) {
        return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", 
        this.queue(type, function(next, hooks) {
            var timeout = setTimeout(next, time);
            hooks.stop = function() {
                clearTimeout(timeout);
            };
        });
    }, function() {
        var input, div, select, a, opt;
        div = document.createElement("div"), div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", 
        a = div.getElementsByTagName("a")[0], select = document.createElement("select"), 
        opt = select.appendChild(document.createElement("option")), input = div.getElementsByTagName("input")[0], 
        a.style.cssText = "top:1px", support.getSetAttribute = "t" !== div.className, support.style = /top/.test(a.getAttribute("style")), 
        support.hrefNormalized = "/a" === a.getAttribute("href"), support.checkOn = !!input.value, 
        support.optSelected = opt.selected, support.enctype = !!document.createElement("form").enctype, 
        select.disabled = !0, support.optDisabled = !opt.disabled, input = document.createElement("input"), 
        input.setAttribute("value", ""), support.input = "" === input.getAttribute("value"), 
        input.value = "t", input.setAttribute("type", "radio"), support.radioValue = "t" === input.value;
    }();
    var rreturn = /\r/g;
    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction, elem = this[0];
            {
                if (arguments.length) return isFunction = jQuery.isFunction(value), this.each(function(i) {
                    var val;
                    1 === this.nodeType && (val = isFunction ? value.call(this, i, jQuery(this).val()) : value, 
                    null == val ? val = "" : "number" == typeof val ? val += "" : jQuery.isArray(val) && (val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                    })), hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()], 
                    hooks && "set" in hooks && void 0 !== hooks.set(this, val, "value") || (this.value = val));
                });
                if (elem) return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], 
                hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, "value")) ? ret : (ret = elem.value, 
                "string" == typeof ret ? ret.replace(rreturn, "") : null == ret ? "" : ret);
            }
        }
    }), jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return null != val ? val : jQuery.trim(jQuery.text(elem));
                }
            },
            select: {
                get: function(elem) {
                    for (var value, option, options = elem.options, index = elem.selectedIndex, one = "select-one" === elem.type || 0 > index, values = one ? null : [], max = one ? index + 1 : options.length, i = 0 > index ? max : one ? index : 0; max > i; i++) if (option = options[i], 
                    !(!option.selected && i !== index || (support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
                        if (value = jQuery(option).val(), one) return value;
                        values.push(value);
                    }
                    return values;
                },
                set: function(elem, value) {
                    for (var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length; i--; ) if (option = options[i], 
                    jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0) try {
                        option.selected = optionSet = !0;
                    } catch (_) {
                        option.scrollHeight;
                    } else option.selected = !1;
                    return optionSet || (elem.selectedIndex = -1), options;
                }
            }
        }
    }), jQuery.each([ "radio", "checkbox" ], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : void 0;
            }
        }, support.checkOn || (jQuery.valHooks[this].get = function(elem) {
            return null === elem.getAttribute("value") ? "on" : elem.value;
        });
    });
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    }), jQuery.extend({
        attr: function(elem, name, value) {
            var hooks, ret, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return typeof elem.getAttribute === strundefined ? jQuery.prop(elem, name, value) : (1 === nType && jQuery.isXMLDoc(elem) || (name = name.toLowerCase(), 
            hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook)), 
            void 0 === value ? hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : (ret = jQuery.find.attr(elem, name), 
            null == ret ? void 0 : ret) : null !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), 
            value) : void jQuery.removeAttr(elem, name));
        },
        removeAttr: function(elem, value) {
            var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
            if (attrNames && 1 === elem.nodeType) for (;name = attrNames[i++]; ) propName = jQuery.propFix[name] || name, 
            jQuery.expr.match.bool.test(name) ? getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem[propName] = !1 : elem[jQuery.camelCase("default-" + name)] = elem[propName] = !1 : jQuery.attr(elem, name, ""), 
            elem.removeAttribute(getSetAttribute ? name : propName);
        },
        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && "radio" === value && jQuery.nodeName(elem, "input")) {
                        var val = elem.value;
                        return elem.setAttribute("type", value), val && (elem.value = val), value;
                    }
                }
            }
        }
    }), boolHook = {
        set: function(elem, value, name) {
            return value === !1 ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !ruseDefault.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = !0, 
            name;
        }
    }, jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = getSetInput && getSetAttribute || !ruseDefault.test(name) ? function(elem, name, isXML) {
            var ret, handle;
            return isXML || (handle = attrHandle[name], attrHandle[name] = ret, ret = null != getter(elem, name, isXML) ? name.toLowerCase() : null, 
            attrHandle[name] = handle), ret;
        } : function(elem, name, isXML) {
            return isXML ? void 0 : elem[jQuery.camelCase("default-" + name)] ? name.toLowerCase() : null;
        };
    }), getSetInput && getSetAttribute || (jQuery.attrHooks.value = {
        set: function(elem, value, name) {
            return jQuery.nodeName(elem, "input") ? void (elem.defaultValue = value) : nodeHook && nodeHook.set(elem, value, name);
        }
    }), getSetAttribute || (nodeHook = {
        set: function(elem, value, name) {
            var ret = elem.getAttributeNode(name);
            return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), 
            ret.value = value += "", "value" === name || value === elem.getAttribute(name) ? value : void 0;
        }
    }, attrHandle.id = attrHandle.name = attrHandle.coords = function(elem, name, isXML) {
        var ret;
        return isXML ? void 0 : (ret = elem.getAttributeNode(name)) && "" !== ret.value ? ret.value : null;
    }, jQuery.valHooks.button = {
        get: function(elem, name) {
            var ret = elem.getAttributeNode(name);
            return ret && ret.specified ? ret.value : void 0;
        },
        set: nodeHook.set
    }, jQuery.attrHooks.contenteditable = {
        set: function(elem, value, name) {
            nodeHook.set(elem, "" === value ? !1 : value, name);
        }
    }, jQuery.each([ "width", "height" ], function(i, name) {
        jQuery.attrHooks[name] = {
            set: function(elem, value) {
                return "" === value ? (elem.setAttribute(name, "auto"), value) : void 0;
            }
        };
    })), support.style || (jQuery.attrHooks.style = {
        get: function(elem) {
            return elem.style.cssText || void 0;
        },
        set: function(elem, value) {
            return elem.style.cssText = value + "";
        }
    });
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
            return name = jQuery.propFix[name] || name, this.each(function() {
                try {
                    this[name] = void 0, delete this[name];
                } catch (e) {}
            });
        }
    }), jQuery.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(elem, name, value) {
            var ret, hooks, notxml, nType = elem.nodeType;
            if (elem && 3 !== nType && 8 !== nType && 2 !== nType) return notxml = 1 !== nType || !jQuery.isXMLDoc(elem), 
            notxml && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), 
            void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
        },
        propHooks: {
            tabIndex: {
                get: function(elem) {
                    var tabindex = jQuery.find.attr(elem, "tabindex");
                    return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
                }
            }
        }
    }), support.hrefNormalized || jQuery.each([ "href", "src" ], function(i, name) {
        jQuery.propHooks[name] = {
            get: function(elem) {
                return elem.getAttribute(name, 4);
            }
        };
    }), support.optSelected || (jQuery.propHooks.selected = {
        get: function(elem) {
            var parent = elem.parentNode;
            return parent && (parent.selectedIndex, parent.parentNode && parent.parentNode.selectedIndex), 
            null;
        }
    }), jQuery.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    }), support.enctype || (jQuery.propFix.enctype = "encoding");
    var rclass = /[\t\r\n\f]/g;
    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).addClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : " ")) {
                for (j = 0; clazz = classes[j++]; ) cur.indexOf(" " + clazz + " ") < 0 && (cur += clazz + " ");
                finalValue = jQuery.trim(cur), elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        removeClass: function(value) {
            var classes, elem, cur, clazz, j, finalValue, i = 0, len = this.length, proceed = 0 === arguments.length || "string" == typeof value && value;
            if (jQuery.isFunction(value)) return this.each(function(j) {
                jQuery(this).removeClass(value.call(this, j, this.className));
            });
            if (proceed) for (classes = (value || "").match(rnotwhite) || []; len > i; i++) if (elem = this[i], 
            cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
                for (j = 0; clazz = classes[j++]; ) for (;cur.indexOf(" " + clazz + " ") >= 0; ) cur = cur.replace(" " + clazz + " ", " ");
                finalValue = value ? jQuery.trim(cur) : "", elem.className !== finalValue && (elem.className = finalValue);
            }
            return this;
        },
        toggleClass: function(value, stateVal) {
            var type = typeof value;
            return "boolean" == typeof stateVal && "string" === type ? stateVal ? this.addClass(value) : this.removeClass(value) : this.each(jQuery.isFunction(value) ? function(i) {
                jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
            } : function() {
                if ("string" === type) for (var className, i = 0, self = jQuery(this), classNames = value.match(rnotwhite) || []; className = classNames[i++]; ) self.hasClass(className) ? self.removeClass(className) : self.addClass(className); else (type === strundefined || "boolean" === type) && (this.className && jQuery._data(this, "__className__", this.className), 
                this.className = this.className || value === !1 ? "" : jQuery._data(this, "__className__") || "");
            });
        },
        hasClass: function(selector) {
            for (var className = " " + selector + " ", i = 0, l = this.length; l > i; i++) if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(className) >= 0) return !0;
            return !1;
        }
    }), jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(i, name) {
        jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
        };
    }), jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        },
        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        }
    });
    var nonce = jQuery.now(), rquery = /\?/, rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function(data) {
        if (window.JSON && window.JSON.parse) return window.JSON.parse(data + "");
        var requireNonComma, depth = null, str = jQuery.trim(data + "");
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {
            return requireNonComma && comma && (depth = 0), 0 === depth ? token : (requireNonComma = open || comma, 
            depth += !close - !open, "");
        })) ? Function("return " + str)() : jQuery.error("Invalid JSON: " + data);
    }, jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || "string" != typeof data) return null;
        try {
            window.DOMParser ? (tmp = new DOMParser(), xml = tmp.parseFromString(data, "text/xml")) : (xml = new ActiveXObject("Microsoft.XMLDOM"), 
            xml.async = "false", xml.loadXML(data));
        } catch (e) {
            xml = void 0;
        }
        return xml && xml.documentElement && !xml.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), 
        xml;
    };
    var ajaxLocParts, ajaxLocation, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, prefilters = {}, transports = {}, allTypes = "*/".concat("*");
    try {
        ajaxLocation = location.href;
    } catch (e) {
        ajaxLocation = document.createElement("a"), ajaxLocation.href = "", ajaxLocation = ajaxLocation.href;
    }
    ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [], jQuery.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": jQuery.parseJSON,
                "text xml": jQuery.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        ajax: function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified, statusText = nativeStatusText;
                2 !== state && (state = 2, timeoutTimer && clearTimeout(timeoutTimer), transport = void 0, 
                responseHeadersString = headers || "", jqXHR.readyState = status > 0 ? 4 : 0, isSuccess = status >= 200 && 300 > status || 304 === status, 
                responses && (response = ajaxHandleResponses(s, jqXHR, responses)), response = ajaxConvert(s, response, jqXHR, isSuccess), 
                isSuccess ? (s.ifModified && (modified = jqXHR.getResponseHeader("Last-Modified"), 
                modified && (jQuery.lastModified[cacheURL] = modified), modified = jqXHR.getResponseHeader("etag"), 
                modified && (jQuery.etag[cacheURL] = modified)), 204 === status || "HEAD" === s.type ? statusText = "nocontent" : 304 === status ? statusText = "notmodified" : (statusText = response.state, 
                success = response.data, error = response.error, isSuccess = !error)) : (error = statusText, 
                (status || !statusText) && (statusText = "error", 0 > status && (status = 0))), 
                jqXHR.status = status, jqXHR.statusText = (nativeStatusText || statusText) + "", 
                isSuccess ? deferred.resolveWith(callbackContext, [ success, statusText, jqXHR ]) : deferred.rejectWith(callbackContext, [ jqXHR, statusText, error ]), 
                jqXHR.statusCode(statusCode), statusCode = void 0, fireGlobals && globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [ jqXHR, s, isSuccess ? success : error ]), 
                completeDeferred.fireWith(callbackContext, [ jqXHR, statusText ]), fireGlobals && (globalEventContext.trigger("ajaxComplete", [ jqXHR, s ]), 
                --jQuery.active || jQuery.event.trigger("ajaxStop")));
            }
            "object" == typeof url && (options = url, url = void 0), options = options || {};
            var parts, i, cacheURL, responseHeadersString, timeoutTimer, fireGlobals, transport, responseHeaders, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = "canceled", jqXHR = {
                readyState: 0,
                getResponseHeader: function(key) {
                    var match;
                    if (2 === state) {
                        if (!responseHeaders) for (responseHeaders = {}; match = rheaders.exec(responseHeadersString); ) responseHeaders[match[1].toLowerCase()] = match[2];
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return null == match ? null : match;
                },
                getAllResponseHeaders: function() {
                    return 2 === state ? responseHeadersString : null;
                },
                setRequestHeader: function(name, value) {
                    var lname = name.toLowerCase();
                    return state || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, 
                    requestHeaders[name] = value), this;
                },
                overrideMimeType: function(type) {
                    return state || (s.mimeType = type), this;
                },
                statusCode: function(map) {
                    var code;
                    if (map) if (2 > state) for (code in map) statusCode[code] = [ statusCode[code], map[code] ]; else jqXHR.always(map[jqXHR.status]);
                    return this;
                },
                abort: function(statusText) {
                    var finalText = statusText || strAbort;
                    return transport && transport.abort(finalText), done(0, finalText), this;
                }
            };
            if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, 
            jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(rhash, "").replace(rprotocol, ajaxLocParts[1] + "//"), 
            s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [ "" ], 
            null == s.crossDomain && (parts = rurl.exec(s.url.toLowerCase()), s.crossDomain = !(!parts || parts[1] === ajaxLocParts[1] && parts[2] === ajaxLocParts[2] && (parts[3] || ("http:" === parts[1] ? "80" : "443")) === (ajaxLocParts[3] || ("http:" === ajaxLocParts[1] ? "80" : "443")))), 
            s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), 
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === state) return jqXHR;
            fireGlobals = jQuery.event && s.global, fireGlobals && 0 === jQuery.active++ && jQuery.event.trigger("ajaxStart"), 
            s.type = s.type.toUpperCase(), s.hasContent = !rnoContent.test(s.type), cacheURL = s.url, 
            s.hasContent || (s.data && (cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data, 
            delete s.data), s.cache === !1 && (s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + nonce++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++)), 
            s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), 
            jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), 
            (s.data && s.hasContent && s.contentType !== !1 || options.contentType) && jqXHR.setRequestHeader("Content-Type", s.contentType), 
            jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);
            for (i in s.headers) jqXHR.setRequestHeader(i, s.headers[i]);
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === !1 || 2 === state)) return jqXHR.abort();
            strAbort = "abort";
            for (i in {
                success: 1,
                error: 1,
                complete: 1
            }) jqXHR[i](s[i]);
            if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
                jqXHR.readyState = 1, fireGlobals && globalEventContext.trigger("ajaxSend", [ jqXHR, s ]), 
                s.async && s.timeout > 0 && (timeoutTimer = setTimeout(function() {
                    jqXHR.abort("timeout");
                }, s.timeout));
                try {
                    state = 1, transport.send(requestHeaders, done);
                } catch (e) {
                    if (!(2 > state)) throw e;
                    done(-1, e);
                }
            } else done(-1, "No Transport");
            return jqXHR;
        },
        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
        }
    }), jQuery.each([ "get", "post" ], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {
            return jQuery.isFunction(data) && (type = type || callback, callback = data, data = void 0), 
            jQuery.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    }), jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        });
    }, jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) return this.each(function(i) {
                jQuery(this).wrapAll(html.call(this, i));
            });
            if (this[0]) {
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && wrap.insertBefore(this[0]), wrap.map(function() {
                    for (var elem = this; elem.firstChild && 1 === elem.firstChild.nodeType; ) elem = elem.firstChild;
                    return elem;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(html) {
            return this.each(jQuery.isFunction(html) ? function(i) {
                jQuery(this).wrapInner(html.call(this, i));
            } : function() {
                var self = jQuery(this), contents = self.contents();
                contents.length ? contents.wrapAll(html) : self.append(html);
            });
        },
        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);
            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                jQuery.nodeName(this, "body") || jQuery(this).replaceWith(this.childNodes);
            }).end();
        }
    }), jQuery.expr.filters.hidden = function(elem) {
        return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 || !support.reliableHiddenOffsets() && "none" === (elem.style && elem.style.display || jQuery.css(elem, "display"));
    }, jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, value) {
            value = jQuery.isFunction(value) ? value() : null == value ? "" : value, s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
        };
        if (void 0 === traditional && (traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), 
        jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) jQuery.each(a, function() {
            add(this.name, this.value);
        }); else for (prefix in a) buildParams(prefix, a[prefix], traditional, add);
        return s.join("&").replace(r20, "+");
    }, jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var elements = jQuery.prop(this, "elements");
                return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
                var type = this.type;
                return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(i, elem) {
                var val = jQuery(this).val();
                return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
                    return {
                        name: elem.name,
                        value: val.replace(rCRLF, "\r\n")
                    };
                }) : {
                    name: elem.name,
                    value: val.replace(rCRLF, "\r\n")
                };
            }).get();
        }
    }), jQuery.ajaxSettings.xhr = void 0 !== window.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    window.attachEvent && window.attachEvent("onunload", function() {
        for (var key in xhrCallbacks) xhrCallbacks[key](void 0, !0);
    }), support.cors = !!xhrSupported && "withCredentials" in xhrSupported, xhrSupported = support.ajax = !!xhrSupported, 
    xhrSupported && jQuery.ajaxTransport(function(options) {
        if (!options.crossDomain || support.cors) {
            var callback;
            return {
                send: function(headers, complete) {
                    var i, xhr = options.xhr(), id = ++xhrId;
                    if (xhr.open(options.type, options.url, options.async, options.username, options.password), 
                    options.xhrFields) for (i in options.xhrFields) xhr[i] = options.xhrFields[i];
                    options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), 
                    options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest");
                    for (i in headers) void 0 !== headers[i] && xhr.setRequestHeader(i, headers[i] + "");
                    xhr.send(options.hasContent && options.data || null), callback = function(_, isAbort) {
                        var status, statusText, responses;
                        if (callback && (isAbort || 4 === xhr.readyState)) if (delete xhrCallbacks[id], 
                        callback = void 0, xhr.onreadystatechange = jQuery.noop, isAbort) 4 !== xhr.readyState && xhr.abort(); else {
                            responses = {}, status = xhr.status, "string" == typeof xhr.responseText && (responses.text = xhr.responseText);
                            try {
                                statusText = xhr.statusText;
                            } catch (e) {
                                statusText = "";
                            }
                            status || !options.isLocal || options.crossDomain ? 1223 === status && (status = 204) : status = responses.text ? 200 : 404;
                        }
                        responses && complete(status, statusText, responses, xhr.getAllResponseHeaders());
                    }, options.async ? 4 === xhr.readyState ? setTimeout(callback) : xhr.onreadystatechange = xhrCallbacks[id] = callback : callback();
                },
                abort: function() {
                    callback && callback(void 0, !0);
                }
            };
        }
    }), jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(text) {
                return jQuery.globalEval(text), text;
            }
        }
    }), jQuery.ajaxPrefilter("script", function(s) {
        void 0 === s.cache && (s.cache = !1), s.crossDomain && (s.type = "GET", s.global = !1);
    }), jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain) {
            var script, head = document.head || jQuery("head")[0] || document.documentElement;
            return {
                send: function(_, callback) {
                    script = document.createElement("script"), script.async = !0, s.scriptCharset && (script.charset = s.scriptCharset), 
                    script.src = s.url, script.onload = script.onreadystatechange = function(_, isAbort) {
                        (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) && (script.onload = script.onreadystatechange = null, 
                        script.parentNode && script.parentNode.removeChild(script), script = null, isAbort || callback(200, "success"));
                    }, head.insertBefore(script, head.firstChild);
                },
                abort: function() {
                    script && script.onload(void 0, !0);
                }
            };
        }
    });
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
            return this[callback] = !0, callback;
        }
    }), jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== !1 && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
        return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, 
        jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== !1 && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), 
        s.converters["script json"] = function() {
            return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
        }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
            responseContainer = arguments;
        }, jqXHR.always(function() {
            window[callbackName] = overwritten, s[callbackName] && (s.jsonpCallback = originalSettings.jsonpCallback, 
            oldCallbacks.push(callbackName)), responseContainer && jQuery.isFunction(overwritten) && overwritten(responseContainer[0]), 
            responseContainer = overwritten = void 0;
        }), "script") : void 0;
    }), jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || "string" != typeof data) return null;
        "boolean" == typeof context && (keepScripts = context, context = !1), context = context || document;
        var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
        return parsed ? [ context.createElement(parsed[1]) ] : (parsed = jQuery.buildFragment([ data ], context, scripts), 
        scripts && scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    };
    var _load = jQuery.fn.load;
    jQuery.fn.load = function(url, params, callback) {
        if ("string" != typeof url && _load) return _load.apply(this, arguments);
        var selector, response, type, self = this, off = url.indexOf(" ");
        return off >= 0 && (selector = jQuery.trim(url.slice(off, url.length)), url = url.slice(0, off)), 
        jQuery.isFunction(params) ? (callback = params, params = void 0) : params && "object" == typeof params && (type = "POST"), 
        self.length > 0 && jQuery.ajax({
            url: url,
            type: type,
            dataType: "html",
            data: params
        }).done(function(responseText) {
            response = arguments, self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
        }).complete(callback && function(jqXHR, status) {
            self.each(callback, response || [ jqXHR.responseText, status, jqXHR ]);
        }), this;
    }, jQuery.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    }), jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };
    var docElem = window.document.documentElement;
    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
            "static" === position && (elem.style.position = "relative"), curOffset = curElem.offset(), 
            curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [ curCSSTop, curCSSLeft ]) > -1, 
            calculatePosition ? (curPosition = curElem.position(), curTop = curPosition.top, 
            curLeft = curPosition.left) : (curTop = parseFloat(curCSSTop) || 0, curLeft = parseFloat(curCSSLeft) || 0), 
            jQuery.isFunction(options) && (options = options.call(elem, i, curOffset)), null != options.top && (props.top = options.top - curOffset.top + curTop), 
            null != options.left && (props.left = options.left - curOffset.left + curLeft), 
            "using" in options ? options.using.call(elem, props) : curElem.css(props);
        }
    }, jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) return void 0 === options ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
            });
            var docElem, win, box = {
                top: 0,
                left: 0
            }, elem = this[0], doc = elem && elem.ownerDocument;
            if (doc) return docElem = doc.documentElement, jQuery.contains(docElem, elem) ? (typeof elem.getBoundingClientRect !== strundefined && (box = elem.getBoundingClientRect()), 
            win = getWindow(doc), {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            }) : box;
        },
        position: function() {
            if (this[0]) {
                var offsetParent, offset, parentOffset = {
                    top: 0,
                    left: 0
                }, elem = this[0];
                return "fixed" === jQuery.css(elem, "position") ? offset = elem.getBoundingClientRect() : (offsetParent = this.offsetParent(), 
                offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), 
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", !0), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", !0)), 
                {
                    top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", !0),
                    left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var offsetParent = this.offsetParent || docElem; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position"); ) offsetParent = offsetParent.offsetParent;
                return offsetParent || docElem;
            });
        }
    }), jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);
        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);
                return void 0 === val ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : void (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val);
            }, method, val, arguments.length, null);
        };
    }), jQuery.each([ "top", "left" ], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(elem, computed) {
            return computed ? (computed = curCSS(elem, prop), rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed) : void 0;
        });
    }), jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
            padding: "inner" + name,
            content: type,
            "": "outer" + name
        }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value) {
                var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin), extra = defaultExtra || (margin === !0 || value === !0 ? "margin" : "border");
                return access(this, function(elem, type, value) {
                    var doc;
                    return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, 
                    Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === value ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
                }, type, chainable ? margin : void 0, chainable, null);
            };
        });
    }), jQuery.fn.size = function() {
        return this.length;
    }, jQuery.fn.andSelf = jQuery.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return jQuery;
    });
    var _jQuery = window.jQuery, _$ = window.$;
    return jQuery.noConflict = function(deep) {
        return window.$ === jQuery && (window.$ = _$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), 
        jQuery;
    }, typeof noGlobal === strundefined && (window.jQuery = window.$ = jQuery), jQuery;
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/core", [ "jquery" ], factory) : factory(jQuery);
}(function($) {
    function focusable(element, isTabIndexNotNaN) {
        var map, mapName, img, nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (map = element.parentNode, mapName = map.name, element.href && mapName && "map" === map.nodeName.toLowerCase() ? (img = $("img[usemap='#" + mapName + "']")[0], 
        !!img && visible(img)) : !1) : (/^(input|select|textarea|button|object)$/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
    }
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return "hidden" === $.css(this, "visibility");
        }).length;
    }
    $.ui = $.ui || {}, $.extend($.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), $.fn.extend({
        scrollParent: function(includeHidden) {
            var position = this.css("position"), excludeStaticParent = "absolute" === position, overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/, scrollParent = this.parents().filter(function() {
                var parent = $(this);
                return excludeStaticParent && "static" === parent.css("position") ? !1 : overflowRegex.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
            }).eq(0);
            return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document);
        },
        uniqueId: function() {
            var uuid = 0;
            return function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++uuid);
                });
            };
        }(),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && $(this).removeAttr("id");
            });
        }
    }), $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName);
            };
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3]);
        },
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")));
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex"), isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
        }
    }), $("<a>").outerWidth(1).jquery || $.each([ "Width", "Height" ], function(i, name) {
        function reduce(elem, size, border, margin) {
            return $.each(side, function() {
                size -= parseFloat($.css(elem, "padding" + this)) || 0, border && (size -= parseFloat($.css(elem, "border" + this + "Width")) || 0), 
                margin && (size -= parseFloat($.css(elem, "margin" + this)) || 0);
            }), size;
        }
        var side = "Width" === name ? [ "Left", "Right" ] : [ "Top", "Bottom" ], type = name.toLowerCase(), orig = {
            innerWidth: $.fn.innerWidth,
            innerHeight: $.fn.innerHeight,
            outerWidth: $.fn.outerWidth,
            outerHeight: $.fn.outerHeight
        };
        $.fn["inner" + name] = function(size) {
            return void 0 === size ? orig["inner" + name].call(this) : this.each(function() {
                $(this).css(type, reduce(this, size) + "px");
            });
        }, $.fn["outer" + name] = function(size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                $(this).css(type, reduce(this, size, !0, margin) + "px");
            });
        };
    }), $.fn.addBack || ($.fn.addBack = function(selector) {
        return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
    }), $("<a>").data("a-b", "a").removeData("a-b").data("a-b") && ($.fn.removeData = function(removeData) {
        return function(key) {
            return arguments.length ? removeData.call(this, $.camelCase(key)) : removeData.call(this);
        };
    }($.fn.removeData)), $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), 
    $.fn.extend({
        focus: function(orig) {
            return function(delay, fn) {
                return "number" == typeof delay ? this.each(function() {
                    var elem = this;
                    setTimeout(function() {
                        $(elem).focus(), fn && fn.call(elem);
                    }, delay);
                }) : orig.apply(this, arguments);
            };
        }($.fn.focus),
        disableSelection: function() {
            var eventType = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(eventType + ".ui-disableSelection", function(event) {
                    event.preventDefault();
                });
            };
        }(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection");
        },
        zIndex: function(zIndex) {
            if (void 0 !== zIndex) return this.css("zIndex", zIndex);
            if (this.length) for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document; ) {
                if (position = elem.css("position"), ("absolute" === position || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10), 
                !isNaN(value) && 0 !== value)) return value;
                elem = elem.parent();
            }
            return 0;
        }
    }), $.ui.plugin = {
        add: function(module, option, set) {
            var i, proto = $.ui[module].prototype;
            for (i in set) proto.plugins[i] = proto.plugins[i] || [], proto.plugins[i].push([ option, set[i] ]);
        },
        call: function(instance, name, args, allowDisconnected) {
            var i, set = instance.plugins[name];
            if (set && (allowDisconnected || instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType)) for (i = 0; i < set.length; i++) instance.options[set[i][0]] && set[i][1].apply(instance.element, args);
        }
    };
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/widget", [ "jquery" ], factory) : factory(jQuery);
}(function($) {
    var widget_uuid = 0, widget_slice = Array.prototype.slice;
    return $.cleanData = function(orig) {
        return function(elems) {
            var events, elem, i;
            for (i = 0; null != (elem = elems[i]); i++) try {
                events = $._data(elem, "events"), events && events.remove && $(elem).triggerHandler("remove");
            } catch (e) {}
            orig(elems);
        };
    }($.cleanData), $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {}, namespace = name.split(".")[0];
        return name = name.split(".")[1], fullName = namespace + "-" + name, prototype || (prototype = base, 
        base = $.Widget), $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName);
        }, $[namespace] = $[namespace] || {}, existingConstructor = $[namespace][name], 
        constructor = $[namespace][name] = function(options, element) {
            return this._createWidget ? void (arguments.length && this._createWidget(options, element)) : new constructor(options, element);
        }, $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        }), basePrototype = new base(), basePrototype.options = $.widget.extend({}, basePrototype.options), 
        $.each(prototype, function(prop, value) {
            return $.isFunction(value) ? void (proxiedPrototype[prop] = function() {
                var _super = function() {
                    return base.prototype[prop].apply(this, arguments);
                }, _superApply = function(args) {
                    return base.prototype[prop].apply(this, args);
                };
                return function() {
                    var returnValue, __super = this._super, __superApply = this._superApply;
                    return this._super = _super, this._superApply = _superApply, returnValue = value.apply(this, arguments), 
                    this._super = __super, this._superApply = __superApply, returnValue;
                };
            }()) : void (proxiedPrototype[prop] = value);
        }), constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        }), existingConstructor ? ($.each(existingConstructor._childConstructors, function(i, child) {
            var childPrototype = child.prototype;
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto);
        }), delete existingConstructor._childConstructors) : base._childConstructors.push(constructor), 
        $.widget.bridge(name, constructor), constructor;
    }, $.widget.extend = function(target) {
        for (var key, value, input = widget_slice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputLength > inputIndex; inputIndex++) for (key in input[inputIndex]) value = input[inputIndex][key], 
        input[inputIndex].hasOwnProperty(key) && void 0 !== value && (target[key] = $.isPlainObject(value) ? $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : value);
        return target;
    }, $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options, args = widget_slice.call(arguments, 1), returnValue = this;
            return isMethodCall ? this.each(function() {
                var methodValue, instance = $.data(this, fullName);
                return "instance" === options ? (returnValue = instance, !1) : instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args), 
                methodValue !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue, 
                !1) : void 0) : $.error("no such method '" + options + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'");
            }) : (args.length && (options = $.widget.extend.apply(null, [ options ].concat(args))), 
            this.each(function() {
                var instance = $.data(this, fullName);
                instance ? (instance.option(options || {}), instance._init && instance._init()) : $.data(this, fullName, new object(options, this));
            })), returnValue;
        };
    }, $.Widget = function() {}, $.Widget._childConstructors = [], $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0], this.element = $(element), 
            this.uuid = widget_uuid++, this.eventNamespace = "." + this.widgetName + this.uuid, 
            this.bindings = $(), this.hoverable = $(), this.focusable = $(), element !== this && ($.data(element, this.widgetFullName, this), 
            this._on(!0, this.element, {
                remove: function(event) {
                    event.target === element && this.destroy();
                }
            }), this.document = $(element.style ? element.ownerDocument : element.document || element), 
            this.window = $(this.document[0].defaultView || this.document[0].parentWindow)), 
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options), 
            this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)), 
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), 
            this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: $.noop,
        widget: function() {
            return this.element;
        },
        option: function(key, value) {
            var parts, curOption, i, options = key;
            if (0 === arguments.length) return $.widget.extend({}, this.options);
            if ("string" == typeof key) if (options = {}, parts = key.split("."), key = parts.shift(), 
            parts.length) {
                for (curOption = options[key] = $.widget.extend({}, this.options[key]), i = 0; i < parts.length - 1; i++) curOption[parts[i]] = curOption[parts[i]] || {}, 
                curOption = curOption[parts[i]];
                if (key = parts.pop(), 1 === arguments.length) return void 0 === curOption[key] ? null : curOption[key];
                curOption[key] = value;
            } else {
                if (1 === arguments.length) return void 0 === this.options[key] ? null : this.options[key];
                options[key] = value;
            }
            return this._setOptions(options), this;
        },
        _setOptions: function(options) {
            var key;
            for (key in options) this._setOption(key, options[key]);
            return this;
        },
        _setOption: function(key, value) {
            return this.options[key] = value, "disabled" === key && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!value), 
            value && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), 
            this;
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            });
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            });
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            "boolean" != typeof suppressDisabledCheck && (handlers = element, element = suppressDisabledCheck, 
            suppressDisabledCheck = !1), handlers ? (element = delegateElement = $(element), 
            this.bindings = this.bindings.add(element)) : (handlers = element, element = this.element, 
            delegateElement = this.widget()), $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    return suppressDisabledCheck || instance.options.disabled !== !0 && !$(this).hasClass("ui-state-disabled") ? ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments) : void 0;
                }
                "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
                var match = event.match(/^([\w:-]*)\s*(.*)$/), eventName = match[1] + instance.eventNamespace, selector = match[2];
                selector ? delegateElement.delegate(selector, eventName, handlerProxy) : element.bind(eventName, handlerProxy);
            });
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
            element.unbind(eventName).undelegate(eventName), this.bindings = $(this.bindings.not(element).get()), 
            this.focusable = $(this.focusable.not(element).get()), this.hoverable = $(this.hoverable.not(element).get());
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments);
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0);
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element), this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover");
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover");
                }
            });
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element), this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus");
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus");
                }
            });
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            if (data = data || {}, event = $.Event(event), event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(), 
            event.target = this.element[0], orig = event.originalEvent) for (prop in orig) prop in event || (event[prop] = orig[prop]);
            return this.element.trigger(event, data), !($.isFunction(callback) && callback.apply(this.element[0], [ event ].concat(data)) === !1 || event.isDefaultPrevented());
        }
    }, $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            "string" == typeof options && (options = {
                effect: options
            });
            var hasOptions, effectName = options ? options === !0 || "number" == typeof options ? defaultEffect : options.effect || defaultEffect : method;
            options = options || {}, "number" == typeof options && (options = {
                duration: options
            }), hasOptions = !$.isEmptyObject(options), options.complete = callback, options.delay && element.delay(options.delay), 
            hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
                $(this)[method](), callback && callback.call(element[0]), next();
            });
        };
    }), $.widget;
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/position", [ "jquery" ], factory) : factory(jQuery);
}(function($) {
    return function() {
        function getOffsets(offsets, width, height) {
            return [ parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1) ];
        }
        function parseCss(element, property) {
            return parseInt($.css(element, property), 10) || 0;
        }
        function getDimensions(elem) {
            var raw = elem[0];
            return 9 === raw.nodeType ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : $.isWindow(raw) ? {
                width: elem.width(),
                height: elem.height(),
                offset: {
                    top: elem.scrollTop(),
                    left: elem.scrollLeft()
                }
            } : raw.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: raw.pageY,
                    left: raw.pageX
                }
            } : {
                width: elem.outerWidth(),
                height: elem.outerHeight(),
                offset: elem.offset()
            };
        }
        $.ui = $.ui || {};
        var cachedScrollbarWidth, supportsOffsetFractions, max = Math.max, abs = Math.abs, round = Math.round, rhorizontal = /left|center|right/, rvertical = /top|center|bottom/, roffset = /[\+\-]\d+(\.[\d]+)?%?/, rposition = /^\w+/, rpercent = /%$/, _position = $.fn.position;
        $.position = {
            scrollbarWidth: function() {
                if (void 0 !== cachedScrollbarWidth) return cachedScrollbarWidth;
                var w1, w2, div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), innerDiv = div.children()[0];
                return $("body").append(div), w1 = innerDiv.offsetWidth, div.css("overflow", "scroll"), 
                w2 = innerDiv.offsetWidth, w1 === w2 && (w2 = div[0].clientWidth), div.remove(), 
                cachedScrollbarWidth = w1 - w2;
            },
            getScrollInfo: function(within) {
                var overflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x"), overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y"), hasOverflowX = "scroll" === overflowX || "auto" === overflowX && within.width < within.element[0].scrollWidth, hasOverflowY = "scroll" === overflowY || "auto" === overflowY && within.height < within.element[0].scrollHeight;
                return {
                    width: hasOverflowY ? $.position.scrollbarWidth() : 0,
                    height: hasOverflowX ? $.position.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(element) {
                var withinElement = $(element || window), isWindow = $.isWindow(withinElement[0]), isDocument = !!withinElement[0] && 9 === withinElement[0].nodeType;
                return {
                    element: withinElement,
                    isWindow: isWindow,
                    isDocument: isDocument,
                    offset: withinElement.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: withinElement.scrollLeft(),
                    scrollTop: withinElement.scrollTop(),
                    width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
                    height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
                };
            }
        }, $.fn.position = function(options) {
            if (!options || !options.of) return _position.apply(this, arguments);
            options = $.extend({}, options);
            var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions, target = $(options.of), within = $.position.getWithinInfo(options.within), scrollInfo = $.position.getScrollInfo(within), collision = (options.collision || "flip").split(" "), offsets = {};
            return dimensions = getDimensions(target), target[0].preventDefault && (options.at = "left top"), 
            targetWidth = dimensions.width, targetHeight = dimensions.height, targetOffset = dimensions.offset, 
            basePosition = $.extend({}, targetOffset), $.each([ "my", "at" ], function() {
                var horizontalOffset, verticalOffset, pos = (options[this] || "").split(" ");
                1 === pos.length && (pos = rhorizontal.test(pos[0]) ? pos.concat([ "center" ]) : rvertical.test(pos[0]) ? [ "center" ].concat(pos) : [ "center", "center" ]), 
                pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center", pos[1] = rvertical.test(pos[1]) ? pos[1] : "center", 
                horizontalOffset = roffset.exec(pos[0]), verticalOffset = roffset.exec(pos[1]), 
                offsets[this] = [ horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0 ], 
                options[this] = [ rposition.exec(pos[0])[0], rposition.exec(pos[1])[0] ];
            }), 1 === collision.length && (collision[1] = collision[0]), "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2), 
            "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2), 
            atOffset = getOffsets(offsets.at, targetWidth, targetHeight), basePosition.left += atOffset[0], 
            basePosition.top += atOffset[1], this.each(function() {
                var collisionPosition, using, elem = $(this), elemWidth = elem.outerWidth(), elemHeight = elem.outerHeight(), marginLeft = parseCss(this, "marginLeft"), marginTop = parseCss(this, "marginTop"), collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width, collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height, position = $.extend({}, basePosition), myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
                "right" === options.my[0] ? position.left -= elemWidth : "center" === options.my[0] && (position.left -= elemWidth / 2), 
                "bottom" === options.my[1] ? position.top -= elemHeight : "center" === options.my[1] && (position.top -= elemHeight / 2), 
                position.left += myOffset[0], position.top += myOffset[1], supportsOffsetFractions || (position.left = round(position.left), 
                position.top = round(position.top)), collisionPosition = {
                    marginLeft: marginLeft,
                    marginTop: marginTop
                }, $.each([ "left", "top" ], function(i, dir) {
                    $.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
                        targetWidth: targetWidth,
                        targetHeight: targetHeight,
                        elemWidth: elemWidth,
                        elemHeight: elemHeight,
                        collisionPosition: collisionPosition,
                        collisionWidth: collisionWidth,
                        collisionHeight: collisionHeight,
                        offset: [ atOffset[0] + myOffset[0], atOffset[1] + myOffset[1] ],
                        my: options.my,
                        at: options.at,
                        within: within,
                        elem: elem
                    });
                }), options.using && (using = function(props) {
                    var left = targetOffset.left - position.left, right = left + targetWidth - elemWidth, top = targetOffset.top - position.top, bottom = top + targetHeight - elemHeight, feedback = {
                        target: {
                            element: target,
                            left: targetOffset.left,
                            top: targetOffset.top,
                            width: targetWidth,
                            height: targetHeight
                        },
                        element: {
                            element: elem,
                            left: position.left,
                            top: position.top,
                            width: elemWidth,
                            height: elemHeight
                        },
                        horizontal: 0 > right ? "left" : left > 0 ? "right" : "center",
                        vertical: 0 > bottom ? "top" : top > 0 ? "bottom" : "middle"
                    };
                    elemWidth > targetWidth && abs(left + right) < targetWidth && (feedback.horizontal = "center"), 
                    elemHeight > targetHeight && abs(top + bottom) < targetHeight && (feedback.vertical = "middle"), 
                    feedback.important = max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? "horizontal" : "vertical", 
                    options.using.call(this, props, feedback);
                }), elem.offset($.extend(position, {
                    using: using
                }));
            });
        }, $.ui.position = {
            fit: {
                left: function(position, data) {
                    var newOverRight, within = data.within, withinOffset = within.isWindow ? within.scrollLeft : within.offset.left, outerWidth = within.width, collisionPosLeft = position.left - data.collisionPosition.marginLeft, overLeft = withinOffset - collisionPosLeft, overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                    data.collisionWidth > outerWidth ? overLeft > 0 && 0 >= overRight ? (newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset, 
                    position.left += overLeft - newOverRight) : position.left = overRight > 0 && 0 >= overLeft ? withinOffset : overLeft > overRight ? withinOffset + outerWidth - data.collisionWidth : withinOffset : overLeft > 0 ? position.left += overLeft : overRight > 0 ? position.left -= overRight : position.left = max(position.left - collisionPosLeft, position.left);
                },
                top: function(position, data) {
                    var newOverBottom, within = data.within, withinOffset = within.isWindow ? within.scrollTop : within.offset.top, outerHeight = data.within.height, collisionPosTop = position.top - data.collisionPosition.marginTop, overTop = withinOffset - collisionPosTop, overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                    data.collisionHeight > outerHeight ? overTop > 0 && 0 >= overBottom ? (newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset, 
                    position.top += overTop - newOverBottom) : position.top = overBottom > 0 && 0 >= overTop ? withinOffset : overTop > overBottom ? withinOffset + outerHeight - data.collisionHeight : withinOffset : overTop > 0 ? position.top += overTop : overBottom > 0 ? position.top -= overBottom : position.top = max(position.top - collisionPosTop, position.top);
                }
            },
            flip: {
                left: function(position, data) {
                    var newOverRight, newOverLeft, within = data.within, withinOffset = within.offset.left + within.scrollLeft, outerWidth = within.width, offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left, collisionPosLeft = position.left - data.collisionPosition.marginLeft, overLeft = collisionPosLeft - offsetLeft, overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft, myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0, atOffset = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0, offset = -2 * data.offset[0];
                    0 > overLeft ? (newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset, 
                    (0 > newOverRight || newOverRight < abs(overLeft)) && (position.left += myOffset + atOffset + offset)) : overRight > 0 && (newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft, 
                    (newOverLeft > 0 || abs(newOverLeft) < overRight) && (position.left += myOffset + atOffset + offset));
                },
                top: function(position, data) {
                    var newOverTop, newOverBottom, within = data.within, withinOffset = within.offset.top + within.scrollTop, outerHeight = within.height, offsetTop = within.isWindow ? within.scrollTop : within.offset.top, collisionPosTop = position.top - data.collisionPosition.marginTop, overTop = collisionPosTop - offsetTop, overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop, top = "top" === data.my[1], myOffset = top ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0, atOffset = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0, offset = -2 * data.offset[1];
                    0 > overTop ? (newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset, 
                    (0 > newOverBottom || newOverBottom < abs(overTop)) && (position.top += myOffset + atOffset + offset)) : overBottom > 0 && (newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop, 
                    (newOverTop > 0 || abs(newOverTop) < overBottom) && (position.top += myOffset + atOffset + offset));
                }
            },
            flipfit: {
                left: function() {
                    $.ui.position.flip.left.apply(this, arguments), $.ui.position.fit.left.apply(this, arguments);
                },
                top: function() {
                    $.ui.position.flip.top.apply(this, arguments), $.ui.position.fit.top.apply(this, arguments);
                }
            }
        }, function() {
            var testElement, testElementParent, testElementStyle, offsetLeft, i, body = document.getElementsByTagName("body")[0], div = document.createElement("div");
            testElement = document.createElement(body ? "div" : "body"), testElementStyle = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            }, body && $.extend(testElementStyle, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (i in testElementStyle) testElement.style[i] = testElementStyle[i];
            testElement.appendChild(div), testElementParent = body || document.documentElement, 
            testElementParent.insertBefore(testElement, testElementParent.firstChild), div.style.cssText = "position: absolute; left: 10.7432222px;", 
            offsetLeft = $(div).offset().left, supportsOffsetFractions = offsetLeft > 10 && 11 > offsetLeft, 
            testElement.innerHTML = "", testElementParent.removeChild(testElement);
        }();
    }(), $.ui.position;
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/menu", [ "jquery", "./core", "./widget", "./position" ], factory) : factory(jQuery);
}(function($) {
    return $.widget("ui.menu", {
        version: "1.11.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left-1 top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), 
            this._on({
                "mousedown .ui-menu-item": function(event) {
                    event.preventDefault();
                },
                "click .ui-menu-item": function(event) {
                    var target = $(event.target);
                    !this.mouseHandled && target.not(".ui-state-disabled").length && (this.select(event), 
                    event.isPropagationStopped() || (this.mouseHandled = !0), target.has(".ui-menu").length ? this.expand(event) : !this.element.is(":focus") && $(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [ !0 ]), 
                    this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)));
                },
                "mouseenter .ui-menu-item": function(event) {
                    if (!this.previousFilter) {
                        var target = $(event.currentTarget);
                        target.siblings(".ui-state-active").removeClass("ui-state-active"), this.focus(event, target);
                    }
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(event, keepActiveItem) {
                    var item = this.active || this.element.find(this.options.items).eq(0);
                    keepActiveItem || this.focus(event, item);
                },
                blur: function(event) {
                    this._delay(function() {
                        $.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(event);
                    });
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function(event) {
                    this._closeOnDocumentClick(event) && this.collapseAll(event), this.mouseHandled = !1;
                }
            });
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-menu-icons ui-front").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), 
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").removeUniqueId().removeClass("ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var elem = $(this);
                elem.data("ui-menu-submenu-carat") && elem.remove();
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content");
        },
        _keydown: function(event) {
            var match, prev, character, skip, preventDefault = !0;
            switch (event.keyCode) {
              case $.ui.keyCode.PAGE_UP:
                this.previousPage(event);
                break;

              case $.ui.keyCode.PAGE_DOWN:
                this.nextPage(event);
                break;

              case $.ui.keyCode.HOME:
                this._move("first", "first", event);
                break;

              case $.ui.keyCode.END:
                this._move("last", "last", event);
                break;

              case $.ui.keyCode.UP:
                this.previous(event);
                break;

              case $.ui.keyCode.DOWN:
                this.next(event);
                break;

              case $.ui.keyCode.LEFT:
                this.collapse(event);
                break;

              case $.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(event);
                break;

              case $.ui.keyCode.ENTER:
              case $.ui.keyCode.SPACE:
                this._activate(event);
                break;

              case $.ui.keyCode.ESCAPE:
                this.collapse(event);
                break;

              default:
                preventDefault = !1, prev = this.previousFilter || "", character = String.fromCharCode(event.keyCode), 
                skip = !1, clearTimeout(this.filterTimer), character === prev ? skip = !0 : character = prev + character, 
                match = this._filterMenuItems(character), match = skip && -1 !== match.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : match, 
                match.length || (character = String.fromCharCode(event.keyCode), match = this._filterMenuItems(character)), 
                match.length ? (this.focus(event, match), this.previousFilter = character, this.filterTimer = this._delay(function() {
                    delete this.previousFilter;
                }, 1e3)) : delete this.previousFilter;
            }
            preventDefault && event.preventDefault();
        },
        _activate: function(event) {
            this.active.is(".ui-state-disabled") || (this.active.is("[aria-haspopup='true']") ? this.expand(event) : this.select(event));
        },
        refresh: function() {
            var menus, items, that = this, icon = this.options.icons.submenu, submenus = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length), 
            submenus.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-front").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var menu = $(this), item = menu.parent(), submenuCarat = $("<span>").addClass("ui-menu-icon ui-icon " + icon).data("ui-menu-submenu-carat", !0);
                item.attr("aria-haspopup", "true").prepend(submenuCarat), menu.attr("aria-labelledby", item.attr("id"));
            }), menus = submenus.add(this.element), items = menus.find(this.options.items), 
            items.not(".ui-menu-item").each(function() {
                var item = $(this);
                that._isDivider(item) && item.addClass("ui-widget-content ui-menu-divider");
            }), items.not(".ui-menu-item, .ui-menu-divider").addClass("ui-menu-item").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }), items.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !$.contains(this.element[0], this.active[0]) && this.blur();
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role];
        },
        _setOption: function(key, value) {
            "icons" === key && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(value.submenu), 
            "disabled" === key && this.element.toggleClass("ui-state-disabled", !!value).attr("aria-disabled", value), 
            this._super(key, value);
        },
        focus: function(event, item) {
            var nested, focused;
            this.blur(event, event && "focus" === event.type), this._scrollIntoView(item), this.active = item.first(), 
            focused = this.active.addClass("ui-state-focus").removeClass("ui-state-active"), 
            this.options.role && this.element.attr("aria-activedescendant", focused.attr("id")), 
            this.active.parent().closest(".ui-menu-item").addClass("ui-state-active"), event && "keydown" === event.type ? this._close() : this.timer = this._delay(function() {
                this._close();
            }, this.delay), nested = item.children(".ui-menu"), nested.length && event && /^mouse/.test(event.type) && this._startOpening(nested), 
            this.activeMenu = item.parent(), this._trigger("focus", event, {
                item: item
            });
        },
        _scrollIntoView: function(item) {
            var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
            this._hasScroll() && (borderTop = parseFloat($.css(this.activeMenu[0], "borderTopWidth")) || 0, 
            paddingTop = parseFloat($.css(this.activeMenu[0], "paddingTop")) || 0, offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop, 
            scroll = this.activeMenu.scrollTop(), elementHeight = this.activeMenu.height(), 
            itemHeight = item.outerHeight(), 0 > offset ? this.activeMenu.scrollTop(scroll + offset) : offset + itemHeight > elementHeight && this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight));
        },
        blur: function(event, fromFocus) {
            fromFocus || clearTimeout(this.timer), this.active && (this.active.removeClass("ui-state-focus"), 
            this.active = null, this._trigger("blur", event, {
                item: this.active
            }));
        },
        _startOpening: function(submenu) {
            clearTimeout(this.timer), "true" === submenu.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(), this._open(submenu);
            }, this.delay));
        },
        _open: function(submenu) {
            var position = $.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden", "true"), 
            submenu.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(position);
        },
        collapseAll: function(event, all) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var currentMenu = all ? this.element : $(event && event.target).closest(this.element.find(".ui-menu"));
                currentMenu.length || (currentMenu = this.element), this._close(currentMenu), this.blur(event), 
                this.activeMenu = currentMenu;
            }, this.delay);
        },
        _close: function(startMenu) {
            startMenu || (startMenu = this.active ? this.active.parent() : this.element), startMenu.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find(".ui-state-active").not(".ui-state-focus").removeClass("ui-state-active");
        },
        _closeOnDocumentClick: function(event) {
            return !$(event.target).closest(".ui-menu").length;
        },
        _isDivider: function(item) {
            return !/[^\-\u2014\u2013\s]/.test(item.text());
        },
        collapse: function(event) {
            var newItem = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            newItem && newItem.length && (this._close(), this.focus(event, newItem));
        },
        expand: function(event) {
            var newItem = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            newItem && newItem.length && (this._open(newItem.parent()), this._delay(function() {
                this.focus(event, newItem);
            }));
        },
        next: function(event) {
            this._move("next", "first", event);
        },
        previous: function(event) {
            this._move("prev", "last", event);
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length;
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length;
        },
        _move: function(direction, filter, event) {
            var next;
            this.active && (next = "first" === direction || "last" === direction ? this.active["first" === direction ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[direction + "All"](".ui-menu-item").eq(0)), 
            next && next.length && this.active || (next = this.activeMenu.find(this.options.items)[filter]()), 
            this.focus(event, next);
        },
        nextPage: function(event) {
            var item, base, height;
            return this.active ? void (this.isLastItem() || (this._hasScroll() ? (base = this.active.offset().top, 
            height = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return item = $(this), item.offset().top - base - height < 0;
            }), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]()))) : void this.next(event);
        },
        previousPage: function(event) {
            var item, base, height;
            return this.active ? void (this.isFirstItem() || (this._hasScroll() ? (base = this.active.offset().top, 
            height = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return item = $(this), item.offset().top - base + height > 0;
            }), this.focus(event, item)) : this.focus(event, this.activeMenu.find(this.options.items).first()))) : void this.next(event);
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight");
        },
        select: function(event) {
            this.active = this.active || $(event.target).closest(".ui-menu-item");
            var ui = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(event, !0), this._trigger("select", event, ui);
        },
        _filterMenuItems: function(character) {
            var escapedCharacter = character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), regex = new RegExp("^" + escapedCharacter, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                return regex.test($.trim($(this).text()));
            });
        }
    });
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/autocomplete", [ "jquery", "./core", "./widget", "./position", "./menu" ], factory) : factory(jQuery);
}(function($) {
    return $.widget("ui.autocomplete", {
        version: "1.11.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var suppressKeyPress, suppressKeyPressRepeat, suppressInput, nodeName = this.element[0].nodeName.toLowerCase(), isTextarea = "textarea" === nodeName, isInput = "input" === nodeName;
            this.isMultiLine = isTextarea ? !0 : isInput ? !1 : this.element.prop("isContentEditable"), 
            this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"], this.isNewMenu = !0, 
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function(event) {
                    if (this.element.prop("readOnly")) return suppressKeyPress = !0, suppressInput = !0, 
                    void (suppressKeyPressRepeat = !0);
                    suppressKeyPress = !1, suppressInput = !1, suppressKeyPressRepeat = !1;
                    var keyCode = $.ui.keyCode;
                    switch (event.keyCode) {
                      case keyCode.PAGE_UP:
                        suppressKeyPress = !0, this._move("previousPage", event);
                        break;

                      case keyCode.PAGE_DOWN:
                        suppressKeyPress = !0, this._move("nextPage", event);
                        break;

                      case keyCode.UP:
                        suppressKeyPress = !0, this._keyEvent("previous", event);
                        break;

                      case keyCode.DOWN:
                        suppressKeyPress = !0, this._keyEvent("next", event);
                        break;

                      case keyCode.ENTER:
                        this.menu.active && (suppressKeyPress = !0, event.preventDefault(), this.menu.select(event));
                        break;

                      case keyCode.TAB:
                        this.menu.active && this.menu.select(event);
                        break;

                      case keyCode.ESCAPE:
                        this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), 
                        this.close(event), event.preventDefault());
                        break;

                      default:
                        suppressKeyPressRepeat = !0, this._searchTimeout(event);
                    }
                },
                keypress: function(event) {
                    if (suppressKeyPress) return suppressKeyPress = !1, void ((!this.isMultiLine || this.menu.element.is(":visible")) && event.preventDefault());
                    if (!suppressKeyPressRepeat) {
                        var keyCode = $.ui.keyCode;
                        switch (event.keyCode) {
                          case keyCode.PAGE_UP:
                            this._move("previousPage", event);
                            break;

                          case keyCode.PAGE_DOWN:
                            this._move("nextPage", event);
                            break;

                          case keyCode.UP:
                            this._keyEvent("previous", event);
                            break;

                          case keyCode.DOWN:
                            this._keyEvent("next", event);
                        }
                    }
                },
                input: function(event) {
                    return suppressInput ? (suppressInput = !1, void event.preventDefault()) : void this._searchTimeout(event);
                },
                focus: function() {
                    this.selectedItem = null, this.previous = this._value();
                },
                blur: function(event) {
                    return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), 
                    this.close(event), void this._change(event));
                }
            }), this._initSource(), this.menu = $("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().menu("instance"), this._on(this.menu.element, {
                mousedown: function(event) {
                    event.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur;
                    });
                    var menuElement = this.menu.element[0];
                    $(event.target).closest(".ui-menu-item").length || this._delay(function() {
                        var that = this;
                        this.document.one("mousedown", function(event) {
                            event.target === that.element[0] || event.target === menuElement || $.contains(menuElement, event.target) || that.close();
                        });
                    });
                },
                menufocus: function(event, ui) {
                    var label, item;
                    return this.isNewMenu && (this.isNewMenu = !1, event.originalEvent && /^mouse/.test(event.originalEvent.type)) ? (this.menu.blur(), 
                    void this.document.one("mousemove", function() {
                        $(event.target).trigger(event.originalEvent);
                    })) : (item = ui.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", event, {
                        item: item
                    }) && event.originalEvent && /^key/.test(event.originalEvent.type) && this._value(item.value), 
                    label = ui.item.attr("aria-label") || item.value, void (label && $.trim(label).length && (this.liveRegion.children().hide(), 
                    $("<div>").text(label).appendTo(this.liveRegion))));
                },
                menuselect: function(event, ui) {
                    var item = ui.item.data("ui-autocomplete-item"), previous = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = previous, 
                    this._delay(function() {
                        this.previous = previous, this.selectedItem = item;
                    })), !1 !== this._trigger("select", event, {
                        item: item
                    }) && this._value(item.value), this.term = this._value(), this.close(event), this.selectedItem = item;
                }
            }), this.liveRegion = $("<span>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete");
                }
            });
        },
        _destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), 
            this.menu.element.remove(), this.liveRegion.remove();
        },
        _setOption: function(key, value) {
            this._super(key, value), "source" === key && this._initSource(), "appendTo" === key && this.menu.element.appendTo(this._appendTo()), 
            "disabled" === key && value && this.xhr && this.xhr.abort();
        },
        _appendTo: function() {
            var element = this.options.appendTo;
            return element && (element = element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0)), 
            element && element[0] || (element = this.element.closest(".ui-front")), element.length || (element = this.document[0].body), 
            element;
        },
        _initSource: function() {
            var array, url, that = this;
            $.isArray(this.options.source) ? (array = this.options.source, this.source = function(request, response) {
                response($.ui.autocomplete.filter(array, request.term));
            }) : "string" == typeof this.options.source ? (url = this.options.source, this.source = function(request, response) {
                that.xhr && that.xhr.abort(), that.xhr = $.ajax({
                    url: url,
                    data: request,
                    dataType: "json",
                    success: function(data) {
                        response(data);
                    },
                    error: function() {
                        response([]);
                    }
                });
            }) : this.source = this.options.source;
        },
        _searchTimeout: function(event) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                var equalValues = this.term === this._value(), menuVisible = this.menu.element.is(":visible"), modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
                (!equalValues || equalValues && !menuVisible && !modifierKey) && (this.selectedItem = null, 
                this.search(null, event));
            }, this.options.delay);
        },
        search: function(value, event) {
            return value = null != value ? value : this._value(), this.term = this._value(), 
            value.length < this.options.minLength ? this.close(event) : this._trigger("search", event) !== !1 ? this._search(value) : void 0;
        },
        _search: function(value) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, 
            this.source({
                term: value
            }, this._response());
        },
        _response: function() {
            var index = ++this.requestIndex;
            return $.proxy(function(content) {
                index === this.requestIndex && this.__response(content), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading");
            }, this);
        },
        __response: function(content) {
            content && (content = this._normalize(content)), this._trigger("response", null, {
                content: content
            }), !this.options.disabled && content && content.length && !this.cancelSearch ? (this._suggest(content), 
            this._trigger("open")) : this._close();
        },
        close: function(event) {
            this.cancelSearch = !0, this._close(event);
        },
        _close: function(event) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), 
            this.isNewMenu = !0, this._trigger("close", event));
        },
        _change: function(event) {
            this.previous !== this._value() && this._trigger("change", event, {
                item: this.selectedItem
            });
        },
        _normalize: function(items) {
            return items.length && items[0].label && items[0].value ? items : $.map(items, function(item) {
                return "string" == typeof item ? {
                    label: item,
                    value: item
                } : $.extend({}, item, {
                    label: item.label || item.value,
                    value: item.value || item.label
                });
            });
        },
        _suggest: function(items) {
            var ul = this.menu.element.empty();
            this._renderMenu(ul, items), this.isNewMenu = !0, this.menu.refresh(), ul.show(), 
            this._resizeMenu(), ul.position($.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next();
        },
        _resizeMenu: function() {
            var ul = this.menu.element;
            ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()));
        },
        _renderMenu: function(ul, items) {
            var that = this;
            $.each(items, function(index, item) {
                that._renderItemData(ul, item);
            });
        },
        _renderItemData: function(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item);
        },
        _renderItem: function(ul, item) {
            return $("<li>").text(item.label).appendTo(ul);
        },
        _move: function(direction, event) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction) ? (this.isMultiLine || this._value(this.term), 
            void this.menu.blur()) : void this.menu[direction](event) : void this.search(null, event);
        },
        widget: function() {
            return this.menu.element;
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments);
        },
        _keyEvent: function(keyEvent, event) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(keyEvent, event), 
            event.preventDefault());
        }
    }), $.extend($.ui.autocomplete, {
        escapeRegex: function(value) {
            return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        },
        filter: function(array, term) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function(value) {
                return matcher.test(value.label || value.value || value);
            });
        }
    }), $.widget("ui.autocomplete", $.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(amount) {
                    return amount + (amount > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate.";
                }
            }
        },
        __response: function(content) {
            var message;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (message = content && content.length ? this.options.messages.results(content.length) : this.options.messages.noResults, 
            this.liveRegion.children().hide(), $("<div>").text(message).appendTo(this.liveRegion));
        }
    }), $.ui.autocomplete;
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/button", [ "jquery", "./core", "./widget" ], factory) : factory(jQuery);
}(function($) {
    var lastActive, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all", typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only", formResetHandler = function() {
        var form = $(this);
        setTimeout(function() {
            form.find(":ui-button").button("refresh");
        }, 1);
    }, radioGroup = function(radio) {
        var name = radio.name, form = radio.form, radios = $([]);
        return name && (name = name.replace(/'/g, "\\'"), radios = form ? $(form).find("[name='" + name + "'][type=radio]") : $("[name='" + name + "'][type=radio]", radio.ownerDocument).filter(function() {
            return !this.form;
        })), radios;
    };
    return $.widget("ui.button", {
        version: "1.11.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, formResetHandler), 
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), 
            this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
            var that = this, options = this.options, toggleButton = "checkbox" === this.type || "radio" === this.type, activeClass = toggleButton ? "" : "ui-state-active";
            null === options.label && (options.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), 
            this._hoverable(this.buttonElement), this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                options.disabled || this === lastActive && $(this).addClass("ui-state-active");
            }).bind("mouseleave" + this.eventNamespace, function() {
                options.disabled || $(this).removeClass(activeClass);
            }).bind("click" + this.eventNamespace, function(event) {
                options.disabled && (event.preventDefault(), event.stopImmediatePropagation());
            }), this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus");
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus");
                }
            }), toggleButton && this.element.bind("change" + this.eventNamespace, function() {
                that.refresh();
            }), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                return options.disabled ? !1 : void 0;
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (options.disabled) return !1;
                $(this).addClass("ui-state-active"), that.buttonElement.attr("aria-pressed", "true");
                var radio = that.element[0];
                radioGroup(radio).not(radio).map(function() {
                    return $(this).button("widget")[0];
                }).removeClass("ui-state-active").attr("aria-pressed", "false");
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return options.disabled ? !1 : ($(this).addClass("ui-state-active"), lastActive = this, 
                void that.document.one("mouseup", function() {
                    lastActive = null;
                }));
            }).bind("mouseup" + this.eventNamespace, function() {
                return options.disabled ? !1 : void $(this).removeClass("ui-state-active");
            }).bind("keydown" + this.eventNamespace, function(event) {
                return options.disabled ? !1 : void ((event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER) && $(this).addClass("ui-state-active"));
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                $(this).removeClass("ui-state-active");
            }), this.buttonElement.is("a") && this.buttonElement.keyup(function(event) {
                event.keyCode === $.ui.keyCode.SPACE && $(this).click();
            })), this._setOption("disabled", options.disabled), this._resetButton();
        },
        _determineButtonType: function() {
            var ancestor, labelSelector, checked;
            this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", 
            "checkbox" === this.type || "radio" === this.type ? (ancestor = this.element.parents().last(), 
            labelSelector = "label[for='" + this.element.attr("id") + "']", this.buttonElement = ancestor.find(labelSelector), 
            this.buttonElement.length || (ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings(), 
            this.buttonElement = ancestor.filter(labelSelector), this.buttonElement.length || (this.buttonElement = ancestor.find(labelSelector))), 
            this.element.addClass("ui-helper-hidden-accessible"), checked = this.element.is(":checked"), 
            checked && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", checked)) : this.buttonElement = this.element;
        },
        widget: function() {
            return this.buttonElement;
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(baseClasses + " ui-state-active " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), 
            this.hasTitle || this.buttonElement.removeAttr("title");
        },
        _setOption: function(key, value) {
            return this._super(key, value), "disabled" === key ? (this.widget().toggleClass("ui-state-disabled", !!value), 
            this.element.prop("disabled", !!value), void (value && this.buttonElement.removeClass("checkbox" === this.type || "radio" === this.type ? "ui-state-focus" : "ui-state-focus ui-state-active"))) : void this._resetButton();
        },
        refresh: function() {
            var isDisabled = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled), 
            "radio" === this.type ? radioGroup(this.element[0]).each(function() {
                $(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false");
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"));
        },
        _resetButton: function() {
            if ("input" === this.type) return void (this.options.label && this.element.val(this.options.label));
            var buttonElement = this.buttonElement.removeClass(typeClasses), buttonText = $("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(), icons = this.options.icons, multipleIcons = icons.primary && icons.secondary, buttonClasses = [];
            icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : icons.primary ? "-primary" : "-secondary")), 
            icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"), 
            icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"), 
            this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only"), 
            this.hasTitle || buttonElement.attr("title", $.trim(buttonText)))) : buttonClasses.push("ui-button-text-only"), 
            buttonElement.addClass(buttonClasses.join(" "));
        }
    }), $.widget("ui.buttonset", {
        version: "1.11.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset");
        },
        _init: function() {
            this.refresh();
        },
        _setOption: function(key, value) {
            "disabled" === key && this.buttons.button("option", key, value), this._super(key, value);
        },
        refresh: function() {
            var rtl = "rtl" === this.element.css("direction"), allButtons = this.element.find(this.options.items), existingButtons = allButtons.filter(":ui-button");
            allButtons.not(":ui-button").button(), existingButtons.button("refresh"), this.buttons = allButtons.map(function() {
                return $(this).button("widget")[0];
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" : "ui-corner-right").end().end();
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
                return $(this).button("widget")[0];
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
        }
    }), $.ui.button;
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/mouse", [ "jquery", "./widget" ], factory) : factory(jQuery);
}(function($) {
    var mouseHandled = !1;
    return $(document).mouseup(function() {
        mouseHandled = !1;
    }), $.widget("ui.mouse", {
        version: "1.11.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var that = this;
            this.element.bind("mousedown." + this.widgetName, function(event) {
                return that._mouseDown(event);
            }).bind("click." + this.widgetName, function(event) {
                return !0 === $.data(event.target, that.widgetName + ".preventClickEvent") ? ($.removeData(event.target, that.widgetName + ".preventClickEvent"), 
                event.stopImmediatePropagation(), !1) : void 0;
            }), this.started = !1;
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
        },
        _mouseDown: function(event) {
            if (!mouseHandled) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(event), this._mouseDownEvent = event;
                var that = this, btnIsLeft = 1 === event.which, elIsCancel = "string" == typeof this.options.cancel && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : !1;
                return btnIsLeft && !elIsCancel && this._mouseCapture(event) ? (this.mouseDelayMet = !this.options.delay, 
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    that.mouseDelayMet = !0;
                }, this.options.delay)), this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(event) !== !1, 
                !this._mouseStarted) ? (event.preventDefault(), !0) : (!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"), 
                this._mouseMoveDelegate = function(event) {
                    return that._mouseMove(event);
                }, this._mouseUpDelegate = function(event) {
                    return that._mouseUp(event);
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), 
                event.preventDefault(), mouseHandled = !0, !0)) : !0;
            }
        },
        _mouseMove: function(event) {
            if (this._mouseMoved) {
                if ($.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button) return this._mouseUp(event);
                if (!event.which) return this._mouseUp(event);
            }
            return (event.which || event.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(event), 
            event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, event) !== !1, 
            this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)), !this._mouseStarted);
        },
        _mouseUp: function(event) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), 
            this._mouseStarted && (this._mouseStarted = !1, event.target === this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0), 
            this._mouseStop(event)), mouseHandled = !1, !1;
        },
        _mouseDistanceMet: function(event) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance;
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet;
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0;
        }
    });
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/draggable", [ "jquery", "./core", "./mouse", "./widget" ], factory) : factory(jQuery);
}(function($) {
    return $.widget("ui.draggable", $.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), 
            this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), 
            this._mouseInit();
        },
        _setOption: function(key, value) {
            this._super(key, value), "handle" === key && (this._removeHandleClassName(), this._setHandleClassName());
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? void (this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), 
            this._removeHandleClassName(), void this._mouseDestroy());
        },
        _mouseCapture: function(event) {
            var o = this.options;
            return this._blurActiveElement(event), this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(event), 
            this.handle ? (this._blockFrames(o.iframeFix === !0 ? "iframe" : o.iframeFix), !0) : !1);
        },
        _blockFrames: function(selector) {
            this.iframeBlocks = this.document.find(selector).map(function() {
                var iframe = $(this);
                return $("<div>").css("position", "absolute").appendTo(iframe.parent()).outerWidth(iframe.outerWidth()).outerHeight(iframe.outerHeight()).offset(iframe.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _blurActiveElement: function(event) {
            var document = this.document[0];
            if (this.handleElement.is(event.target)) try {
                document.activeElement && "body" !== document.activeElement.nodeName.toLowerCase() && $(document.activeElement).blur();
            } catch (error) {}
        },
        _mouseStart: function(event) {
            var o = this.options;
            return this.helper = this._createHelper(event), this.helper.addClass("ui-draggable-dragging"), 
            this._cacheHelperProportions(), $.ui.ddmanager && ($.ui.ddmanager.current = this), 
            this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), 
            this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                return "fixed" === $(this).css("position");
            }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(event), 
            this.originalPosition = this.position = this._generatePosition(event, !1), this.originalPageX = event.pageX, 
            this.originalPageY = event.pageY, o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt), 
            this._setContainment(), this._trigger("start", event) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), 
            $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event), 
            this._normalizeRightBottom(), this._mouseDrag(event, !0), $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event), 
            !0);
        },
        _refreshOffsets: function(event) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {
                left: event.pageX - this.offset.left,
                top: event.pageY - this.offset.top
            };
        },
        _mouseDrag: function(event, noPropagation) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(event, !0), 
            this.positionAbs = this._convertPositionTo("absolute"), !noPropagation) {
                var ui = this._uiHash();
                if (this._trigger("drag", event, ui) === !1) return this._mouseUp({}), !1;
                this.position = ui.position;
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", 
            $.ui.ddmanager && $.ui.ddmanager.drag(this, event), !1;
        },
        _mouseStop: function(event) {
            var that = this, dropped = !1;
            return $.ui.ddmanager && !this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event)), 
            this.dropped && (dropped = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !dropped || "valid" === this.options.revert && dropped || this.options.revert === !0 || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped) ? $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                that._trigger("stop", event) !== !1 && that._clear();
            }) : this._trigger("stop", event) !== !1 && this._clear(), !1;
        },
        _mouseUp: function(event) {
            return this._unblockFrames(), $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event), 
            this.handleElement.is(event.target) && this.element.focus(), $.ui.mouse.prototype._mouseUp.call(this, event);
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), 
            this;
        },
        _getHandle: function(event) {
            return this.options.handle ? !!$(event.target).closest(this.element.find(this.options.handle)).length : !0;
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, 
            this.handleElement.addClass("ui-draggable-handle");
        },
        _removeHandleClassName: function() {
            this.handleElement.removeClass("ui-draggable-handle");
        },
        _createHelper: function(event) {
            var o = this.options, helperIsFunction = $.isFunction(o.helper), helper = helperIsFunction ? $(o.helper.apply(this.element[0], [ event ])) : "clone" === o.helper ? this.element.clone().removeAttr("id") : this.element;
            return helper.parents("body").length || helper.appendTo("parent" === o.appendTo ? this.element[0].parentNode : o.appendTo), 
            helperIsFunction && helper[0] === this.element[0] && this._setPositionRelative(), 
            helper[0] === this.element[0] || /(fixed|absolute)/.test(helper.css("position")) || helper.css("position", "absolute"), 
            helper;
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative");
        },
        _adjustOffsetFromHelper: function(obj) {
            "string" == typeof obj && (obj = obj.split(" ")), $.isArray(obj) && (obj = {
                left: +obj[0],
                top: +obj[1] || 0
            }), "left" in obj && (this.offset.click.left = obj.left + this.margins.left), "right" in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left), 
            "top" in obj && (this.offset.click.top = obj.top + this.margins.top), "bottom" in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top);
        },
        _isRootNode: function(element) {
            return /(html|body)/i.test(element.tagName) || element === this.document[0];
        },
        _getParentOffset: function() {
            var po = this.offsetParent.offset(), document = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(), 
            po.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (po = {
                top: 0,
                left: 0
            }), {
                top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            };
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var p = this.element.position(), scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
            return {
                top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + (scrollIsRootNode ? 0 : this.scrollParent.scrollTop()),
                left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + (scrollIsRootNode ? 0 : this.scrollParent.scrollLeft())
            };
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            };
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            };
        },
        _setContainment: function() {
            var isUserScrollable, c, ce, o = this.options, document = this.document[0];
            return this.relativeContainer = null, o.containment ? "window" === o.containment ? void (this.containment = [ $(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : "document" === o.containment ? void (this.containment = [ 0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top ]) : o.containment.constructor === Array ? void (this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode), 
            c = $(o.containment), ce = c[0], void (ce && (isUserScrollable = /(scroll|auto)/.test(c.css("overflow")), 
            this.containment = [ (parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (isUserScrollable ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (isUserScrollable ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom ], 
            this.relativeContainer = c))) : void (this.containment = null);
        },
        _convertPositionTo: function(d, pos) {
            pos || (pos = this.position);
            var mod = "absolute" === d ? 1 : -1, scrollIsRootNode = this._isRootNode(this.scrollParent[0]);
            return {
                top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top) * mod,
                left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left) * mod
            };
        },
        _generatePosition: function(event, constrainPosition) {
            var containment, co, top, left, o = this.options, scrollIsRootNode = this._isRootNode(this.scrollParent[0]), pageX = event.pageX, pageY = event.pageY;
            return scrollIsRootNode && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), constrainPosition && (this.containment && (this.relativeContainer ? (co = this.relativeContainer.offset(), 
            containment = [ this.containment[0] + co.left, this.containment[1] + co.top, this.containment[2] + co.left, this.containment[3] + co.top ]) : containment = this.containment, 
            event.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left), 
            event.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top), 
            event.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left), 
            event.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top)), 
            o.grid && (top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, 
            pageY = containment ? top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3] ? top : top - this.offset.click.top >= containment[1] ? top - o.grid[1] : top + o.grid[1] : top, 
            left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, 
            pageX = containment ? left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0] : left), 
            "y" === o.axis && (pageX = this.originalPageX), "x" === o.axis && (pageY = this.originalPageY)), 
            {
                top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : scrollIsRootNode ? 0 : this.offset.scroll.top),
                left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : scrollIsRootNode ? 0 : this.offset.scroll.left)
            };
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), 
            this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy();
        },
        _normalizeRightBottom: function() {
            "y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), 
            this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), 
            this.helper.css("bottom", "auto"));
        },
        _trigger: function(type, event, ui) {
            return ui = ui || this._uiHash(), $.ui.plugin.call(this, type, [ event, ui, this ], !0), 
            /^(drag|start|stop)/.test(type) && (this.positionAbs = this._convertPositionTo("absolute"), 
            ui.offset = this.positionAbs), $.Widget.prototype._trigger.call(this, type, event, ui);
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            };
        }
    }), $.ui.plugin.add("draggable", "connectToSortable", {
        start: function(event, ui, draggable) {
            var uiSortable = $.extend({}, ui, {
                item: draggable.element
            });
            draggable.sortables = [], $(draggable.options.connectToSortable).each(function() {
                var sortable = $(this).sortable("instance");
                sortable && !sortable.options.disabled && (draggable.sortables.push(sortable), sortable.refreshPositions(), 
                sortable._trigger("activate", event, uiSortable));
            });
        },
        stop: function(event, ui, draggable) {
            var uiSortable = $.extend({}, ui, {
                item: draggable.element
            });
            draggable.cancelHelperRemoval = !1, $.each(draggable.sortables, function() {
                var sortable = this;
                sortable.isOver ? (sortable.isOver = 0, draggable.cancelHelperRemoval = !0, sortable.cancelHelperRemoval = !1, 
                sortable._storedCSS = {
                    position: sortable.placeholder.css("position"),
                    top: sortable.placeholder.css("top"),
                    left: sortable.placeholder.css("left")
                }, sortable._mouseStop(event), sortable.options.helper = sortable.options._helper) : (sortable.cancelHelperRemoval = !0, 
                sortable._trigger("deactivate", event, uiSortable));
            });
        },
        drag: function(event, ui, draggable) {
            $.each(draggable.sortables, function() {
                var innermostIntersecting = !1, sortable = this;
                sortable.positionAbs = draggable.positionAbs, sortable.helperProportions = draggable.helperProportions, 
                sortable.offset.click = draggable.offset.click, sortable._intersectsWith(sortable.containerCache) && (innermostIntersecting = !0, 
                $.each(draggable.sortables, function() {
                    return this.positionAbs = draggable.positionAbs, this.helperProportions = draggable.helperProportions, 
                    this.offset.click = draggable.offset.click, this !== sortable && this._intersectsWith(this.containerCache) && $.contains(sortable.element[0], this.element[0]) && (innermostIntersecting = !1), 
                    innermostIntersecting;
                })), innermostIntersecting ? (sortable.isOver || (sortable.isOver = 1, draggable._parent = ui.helper.parent(), 
                sortable.currentItem = ui.helper.appendTo(sortable.element).data("ui-sortable-item", !0), 
                sortable.options._helper = sortable.options.helper, sortable.options.helper = function() {
                    return ui.helper[0];
                }, event.target = sortable.currentItem[0], sortable._mouseCapture(event, !0), sortable._mouseStart(event, !0, !0), 
                sortable.offset.click.top = draggable.offset.click.top, sortable.offset.click.left = draggable.offset.click.left, 
                sortable.offset.parent.left -= draggable.offset.parent.left - sortable.offset.parent.left, 
                sortable.offset.parent.top -= draggable.offset.parent.top - sortable.offset.parent.top, 
                draggable._trigger("toSortable", event), draggable.dropped = sortable.element, $.each(draggable.sortables, function() {
                    this.refreshPositions();
                }), draggable.currentItem = draggable.element, sortable.fromOutside = draggable), 
                sortable.currentItem && (sortable._mouseDrag(event), ui.position = sortable.position)) : sortable.isOver && (sortable.isOver = 0, 
                sortable.cancelHelperRemoval = !0, sortable.options._revert = sortable.options.revert, 
                sortable.options.revert = !1, sortable._trigger("out", event, sortable._uiHash(sortable)), 
                sortable._mouseStop(event, !0), sortable.options.revert = sortable.options._revert, 
                sortable.options.helper = sortable.options._helper, sortable.placeholder && sortable.placeholder.remove(), 
                ui.helper.appendTo(draggable._parent), draggable._refreshOffsets(event), ui.position = draggable._generatePosition(event, !0), 
                draggable._trigger("fromSortable", event), draggable.dropped = !1, $.each(draggable.sortables, function() {
                    this.refreshPositions();
                }));
            });
        }
    }), $.ui.plugin.add("draggable", "cursor", {
        start: function(event, ui, instance) {
            var t = $("body"), o = instance.options;
            t.css("cursor") && (o._cursor = t.css("cursor")), t.css("cursor", o.cursor);
        },
        stop: function(event, ui, instance) {
            var o = instance.options;
            o._cursor && $("body").css("cursor", o._cursor);
        }
    }), $.ui.plugin.add("draggable", "opacity", {
        start: function(event, ui, instance) {
            var t = $(ui.helper), o = instance.options;
            t.css("opacity") && (o._opacity = t.css("opacity")), t.css("opacity", o.opacity);
        },
        stop: function(event, ui, instance) {
            var o = instance.options;
            o._opacity && $(ui.helper).css("opacity", o._opacity);
        }
    }), $.ui.plugin.add("draggable", "scroll", {
        start: function(event, ui, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), 
            i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset());
        },
        drag: function(event, ui, i) {
            var o = i.options, scrolled = !1, scrollParent = i.scrollParentNotHidden[0], document = i.document[0];
            scrollParent !== document && "HTML" !== scrollParent.tagName ? (o.axis && "x" === o.axis || (i.overflowOffset.top + scrollParent.offsetHeight - event.pageY < o.scrollSensitivity ? scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed : event.pageY - i.overflowOffset.top < o.scrollSensitivity && (scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed)), 
            o.axis && "y" === o.axis || (i.overflowOffset.left + scrollParent.offsetWidth - event.pageX < o.scrollSensitivity ? scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed : event.pageX - i.overflowOffset.left < o.scrollSensitivity && (scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed))), 
            o.axis && "y" === o.axis || (event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)))), 
            scrolled !== !1 && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(i, event);
        }
    }), $.ui.plugin.add("draggable", "snap", {
        start: function(event, ui, i) {
            var o = i.options;
            i.snapElements = [], $(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                var $t = $(this), $o = $t.offset();
                this !== i.element[0] && i.snapElements.push({
                    item: this,
                    width: $t.outerWidth(),
                    height: $t.outerHeight(),
                    top: $o.top,
                    left: $o.left
                });
            });
        },
        drag: function(event, ui, inst) {
            var ts, bs, ls, rs, l, r, t, b, i, first, o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;
            for (i = inst.snapElements.length - 1; i >= 0; i--) l = inst.snapElements[i].left - inst.margins.left, 
            r = l + inst.snapElements[i].width, t = inst.snapElements[i].top - inst.margins.top, 
            b = t + inst.snapElements[i].height, l - d > x2 || x1 > r + d || t - d > y2 || y1 > b + d || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item) ? (inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                snapItem: inst.snapElements[i].item
            })), inst.snapElements[i].snapping = !1) : ("inner" !== o.snapMode && (ts = Math.abs(t - y2) <= d, 
            bs = Math.abs(b - y1) <= d, ls = Math.abs(l - x2) <= d, rs = Math.abs(r - x1) <= d, 
            ts && (ui.position.top = inst._convertPositionTo("relative", {
                top: t - inst.helperProportions.height,
                left: 0
            }).top), bs && (ui.position.top = inst._convertPositionTo("relative", {
                top: b,
                left: 0
            }).top), ls && (ui.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: l - inst.helperProportions.width
            }).left), rs && (ui.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: r
            }).left)), first = ts || bs || ls || rs, "outer" !== o.snapMode && (ts = Math.abs(t - y1) <= d, 
            bs = Math.abs(b - y2) <= d, ls = Math.abs(l - x1) <= d, rs = Math.abs(r - x2) <= d, 
            ts && (ui.position.top = inst._convertPositionTo("relative", {
                top: t,
                left: 0
            }).top), bs && (ui.position.top = inst._convertPositionTo("relative", {
                top: b - inst.helperProportions.height,
                left: 0
            }).top), ls && (ui.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left), rs && (ui.position.left = inst._convertPositionTo("relative", {
                top: 0,
                left: r - inst.helperProportions.width
            }).left)), !inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                snapItem: inst.snapElements[i].item
            })), inst.snapElements[i].snapping = ts || bs || ls || rs || first);
        }
    }), $.ui.plugin.add("draggable", "stack", {
        start: function(event, ui, instance) {
            var min, o = instance.options, group = $.makeArray($(o.stack)).sort(function(a, b) {
                return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
            });
            group.length && (min = parseInt($(group[0]).css("zIndex"), 10) || 0, $(group).each(function(i) {
                $(this).css("zIndex", min + i);
            }), this.css("zIndex", min + group.length));
        }
    }), $.ui.plugin.add("draggable", "zIndex", {
        start: function(event, ui, instance) {
            var t = $(ui.helper), o = instance.options;
            t.css("zIndex") && (o._zIndex = t.css("zIndex")), t.css("zIndex", o.zIndex);
        },
        stop: function(event, ui, instance) {
            var o = instance.options;
            o._zIndex && $(ui.helper).css("zIndex", o._zIndex);
        }
    }), $.ui.draggable;
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/resizable", [ "jquery", "./core", "./mouse", "./widget" ], factory) : factory(jQuery);
}(function($) {
    return $.widget("ui.resizable", $.ui.mouse, {
        version: "1.11.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(value) {
            return parseInt(value, 10) || 0;
        },
        _isNumber: function(value) {
            return !isNaN(parseInt(value, 10));
        },
        _hasScroll: function(el, a) {
            if ("hidden" === $(el).css("overflow")) return !1;
            var scroll = a && "left" === a ? "scrollLeft" : "scrollTop", has = !1;
            return el[scroll] > 0 ? !0 : (el[scroll] = 1, has = el[scroll] > 0, el[scroll] = 0, 
            has);
        },
        _create: function() {
            var n, i, handle, axis, hname, that = this, o = this.options;
            if (this.element.addClass("ui-resizable"), $.extend(this, {
                _aspectRatio: !!o.aspectRatio,
                aspectRatio: o.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), 
            this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), 
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this._handles = $(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), 
            n = this.handles.split(","), this.handles = {}, i = 0; i < n.length; i++) handle = $.trim(n[i]), 
            hname = "ui-resizable-" + handle, axis = $("<div class='ui-resizable-handle " + hname + "'></div>"), 
            axis.css({
                zIndex: o.zIndex
            }), "se" === handle && axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[handle] = ".ui-resizable-" + handle, 
            this.element.append(axis);
            this._renderAxis = function(target) {
                var i, axis, padPos, padWrapper;
                target = target || this.element;
                for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = $(this.handles[i]), 
                this._on(this.handles[i], {
                    mousedown: that._mouseDown
                })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (axis = $(this.handles[i], this.element), 
                padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth(), 
                padPos = [ "padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left" ].join(""), 
                target.css(padPos, padWrapper), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i]);
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), 
            this._handles.disableSelection(), this._handles.mouseover(function() {
                that.resizing || (this.className && (axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), 
                that.axis = axis && axis[1] ? axis[1] : "se");
            }), o.autoHide && (this._handles.hide(), $(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                o.disabled || ($(this).removeClass("ui-resizable-autohide"), that._handles.show());
            }).mouseleave(function() {
                o.disabled || that.resizing || ($(this).addClass("ui-resizable-autohide"), that._handles.hide());
            })), this._mouseInit();
        },
        _destroy: function() {
            this._mouseDestroy();
            var wrapper, _destroy = function(exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove();
            };
            return this.elementIsWrapper && (_destroy(this.element), wrapper = this.element, 
            this.originalElement.css({
                position: wrapper.css("position"),
                width: wrapper.outerWidth(),
                height: wrapper.outerHeight(),
                top: wrapper.css("top"),
                left: wrapper.css("left")
            }).insertAfter(wrapper), wrapper.remove()), this.originalElement.css("resize", this.originalResizeStyle), 
            _destroy(this.originalElement), this;
        },
        _mouseCapture: function(event) {
            var i, handle, capture = !1;
            for (i in this.handles) handle = $(this.handles[i])[0], (handle === event.target || $.contains(handle, event.target)) && (capture = !0);
            return !this.options.disabled && capture;
        },
        _mouseStart: function(event) {
            var curleft, curtop, cursor, o = this.options, el = this.element;
            return this.resizing = !0, this._renderProxy(), curleft = this._num(this.helper.css("left")), 
            curtop = this._num(this.helper.css("top")), o.containment && (curleft += $(o.containment).scrollLeft() || 0, 
            curtop += $(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), 
            this.position = {
                left: curleft,
                top: curtop
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: el.width(),
                height: el.height()
            }, this.originalSize = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            } : {
                width: el.width(),
                height: el.height()
            }, this.sizeDiff = {
                width: el.outerWidth() - el.width(),
                height: el.outerHeight() - el.height()
            }, this.originalPosition = {
                left: curleft,
                top: curtop
            }, this.originalMousePosition = {
                left: event.pageX,
                top: event.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, 
            cursor = $(".ui-resizable-" + this.axis).css("cursor"), $("body").css("cursor", "auto" === cursor ? this.axis + "-resize" : cursor), 
            el.addClass("ui-resizable-resizing"), this._propagate("start", event), !0;
        },
        _mouseDrag: function(event) {
            var data, props, smp = this.originalMousePosition, a = this.axis, dx = event.pageX - smp.left || 0, dy = event.pageY - smp.top || 0, trigger = this._change[a];
            return this._updatePrevProperties(), trigger ? (data = trigger.apply(this, [ event, dx, dy ]), 
            this._updateVirtualBoundaries(event.shiftKey), (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)), 
            data = this._respectSize(data, event), this._updateCache(data), this._propagate("resize", event), 
            props = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), 
            $.isEmptyObject(props) || (this._updatePrevProperties(), this._trigger("resize", event, this.ui()), 
            this._applyChanges()), !1) : !1;
        },
        _mouseStop: function(event) {
            this.resizing = !1;
            var pr, ista, soffseth, soffsetw, s, left, top, o = this.options, that = this;
            return this._helper && (pr = this._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), 
            soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, 
            s = {
                width: that.helper.width() - soffsetw,
                height: that.helper.height() - soffseth
            }, left = parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left) || null, 
            top = parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top) || null, 
            o.animate || this.element.css($.extend(s, {
                top: top,
                left: left
            })), that.helper.height(that.size.height), that.helper.width(that.size.width), this._helper && !o.animate && this._proportionallyResize()), 
            $("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), 
            this._propagate("stop", event), this._helper && this.helper.remove(), !1;
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {
                width: this.size.width,
                height: this.size.height
            };
        },
        _applyChanges: function() {
            var props = {};
            return this.position.top !== this.prevPosition.top && (props.top = this.position.top + "px"), 
            this.position.left !== this.prevPosition.left && (props.left = this.position.left + "px"), 
            this.size.width !== this.prevSize.width && (props.width = this.size.width + "px"), 
            this.size.height !== this.prevSize.height && (props.height = this.size.height + "px"), 
            this.helper.css(props), props;
        },
        _updateVirtualBoundaries: function(forceAspectRatio) {
            var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b, o = this.options;
            b = {
                minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
                maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : 1/0,
                minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
                maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : 1/0
            }, (this._aspectRatio || forceAspectRatio) && (pMinWidth = b.minHeight * this.aspectRatio, 
            pMinHeight = b.minWidth / this.aspectRatio, pMaxWidth = b.maxHeight * this.aspectRatio, 
            pMaxHeight = b.maxWidth / this.aspectRatio, pMinWidth > b.minWidth && (b.minWidth = pMinWidth), 
            pMinHeight > b.minHeight && (b.minHeight = pMinHeight), pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth), 
            pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)), this._vBoundaries = b;
        },
        _updateCache: function(data) {
            this.offset = this.helper.offset(), this._isNumber(data.left) && (this.position.left = data.left), 
            this._isNumber(data.top) && (this.position.top = data.top), this._isNumber(data.height) && (this.size.height = data.height), 
            this._isNumber(data.width) && (this.size.width = data.width);
        },
        _updateRatio: function(data) {
            var cpos = this.position, csize = this.size, a = this.axis;
            return this._isNumber(data.height) ? data.width = data.height * this.aspectRatio : this._isNumber(data.width) && (data.height = data.width / this.aspectRatio), 
            "sw" === a && (data.left = cpos.left + (csize.width - data.width), data.top = null), 
            "nw" === a && (data.top = cpos.top + (csize.height - data.height), data.left = cpos.left + (csize.width - data.width)), 
            data;
        },
        _respectSize: function(data) {
            var o = this._vBoundaries, a = this.axis, ismaxw = this._isNumber(data.width) && o.maxWidth && o.maxWidth < data.width, ismaxh = this._isNumber(data.height) && o.maxHeight && o.maxHeight < data.height, isminw = this._isNumber(data.width) && o.minWidth && o.minWidth > data.width, isminh = this._isNumber(data.height) && o.minHeight && o.minHeight > data.height, dw = this.originalPosition.left + this.originalSize.width, dh = this.position.top + this.size.height, cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
            return isminw && (data.width = o.minWidth), isminh && (data.height = o.minHeight), 
            ismaxw && (data.width = o.maxWidth), ismaxh && (data.height = o.maxHeight), isminw && cw && (data.left = dw - o.minWidth), 
            ismaxw && cw && (data.left = dw - o.maxWidth), isminh && ch && (data.top = dh - o.minHeight), 
            ismaxh && ch && (data.top = dh - o.maxHeight), data.width || data.height || data.left || !data.top ? data.width || data.height || data.top || !data.left || (data.left = null) : data.top = null, 
            data;
        },
        _getPaddingPlusBorderDimensions: function(element) {
            for (var i = 0, widths = [], borders = [ element.css("borderTopWidth"), element.css("borderRightWidth"), element.css("borderBottomWidth"), element.css("borderLeftWidth") ], paddings = [ element.css("paddingTop"), element.css("paddingRight"), element.css("paddingBottom"), element.css("paddingLeft") ]; 4 > i; i++) widths[i] = parseInt(borders[i], 10) || 0, 
            widths[i] += parseInt(paddings[i], 10) || 0;
            return {
                height: widths[0] + widths[2],
                width: widths[1] + widths[3]
            };
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) for (var prel, i = 0, element = this.helper || this.element; i < this._proportionallyResizeElements.length; i++) prel = this._proportionallyResizeElements[i], 
            this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(prel)), 
            prel.css({
                height: element.height() - this.outerDimensions.height || 0,
                width: element.width() - this.outerDimensions.width || 0
            });
        },
        _renderProxy: function() {
            var el = this.element, o = this.options;
            this.elementOffset = el.offset(), this._helper ? (this.helper = this.helper || $("<div style='overflow:hidden;'></div>"), 
            this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++o.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element;
        },
        _change: {
            e: function(event, dx) {
                return {
                    width: this.originalSize.width + dx
                };
            },
            w: function(event, dx) {
                var cs = this.originalSize, sp = this.originalPosition;
                return {
                    left: sp.left + dx,
                    width: cs.width - dx
                };
            },
            n: function(event, dx, dy) {
                var cs = this.originalSize, sp = this.originalPosition;
                return {
                    top: sp.top + dy,
                    height: cs.height - dy
                };
            },
            s: function(event, dx, dy) {
                return {
                    height: this.originalSize.height + dy
                };
            },
            se: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
            },
            sw: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
            },
            ne: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [ event, dx, dy ]));
            },
            nw: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [ event, dx, dy ]));
            }
        },
        _propagate: function(n, event) {
            $.ui.plugin.call(this, n, [ event, this.ui() ]), "resize" !== n && this._trigger(n, event, this.ui());
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            };
        }
    }), $.ui.plugin.add("resizable", "animate", {
        stop: function(event) {
            var that = $(this).resizable("instance"), o = that.options, pr = that._proportionallyResizeElements, ista = pr.length && /textarea/i.test(pr[0].nodeName), soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height, soffsetw = ista ? 0 : that.sizeDiff.width, style = {
                width: that.size.width - soffsetw,
                height: that.size.height - soffseth
            }, left = parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left) || null, top = parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top) || null;
            that.element.animate($.extend(style, top && left ? {
                top: top,
                left: left
            } : {}), {
                duration: o.animateDuration,
                easing: o.animateEasing,
                step: function() {
                    var data = {
                        width: parseInt(that.element.css("width"), 10),
                        height: parseInt(that.element.css("height"), 10),
                        top: parseInt(that.element.css("top"), 10),
                        left: parseInt(that.element.css("left"), 10)
                    };
                    pr && pr.length && $(pr[0]).css({
                        width: data.width,
                        height: data.height
                    }), that._updateCache(data), that._propagate("resize", event);
                }
            });
        }
    }), $.ui.plugin.add("resizable", "containment", {
        start: function() {
            var element, p, co, ch, cw, width, height, that = $(this).resizable("instance"), o = that.options, el = that.element, oc = o.containment, ce = oc instanceof $ ? oc.get(0) : /parent/.test(oc) ? el.parent().get(0) : oc;
            ce && (that.containerElement = $(ce), /document/.test(oc) || oc === document ? (that.containerOffset = {
                left: 0,
                top: 0
            }, that.containerPosition = {
                left: 0,
                top: 0
            }, that.parentData = {
                element: $(document),
                left: 0,
                top: 0,
                width: $(document).width(),
                height: $(document).height() || document.body.parentNode.scrollHeight
            }) : (element = $(ce), p = [], $([ "Top", "Right", "Left", "Bottom" ]).each(function(i, name) {
                p[i] = that._num(element.css("padding" + name));
            }), that.containerOffset = element.offset(), that.containerPosition = element.position(), 
            that.containerSize = {
                height: element.innerHeight() - p[3],
                width: element.innerWidth() - p[1]
            }, co = that.containerOffset, ch = that.containerSize.height, cw = that.containerSize.width, 
            width = that._hasScroll(ce, "left") ? ce.scrollWidth : cw, height = that._hasScroll(ce) ? ce.scrollHeight : ch, 
            that.parentData = {
                element: ce,
                left: co.left,
                top: co.top,
                width: width,
                height: height
            }));
        },
        resize: function(event) {
            var woset, hoset, isParent, isOffsetRelative, that = $(this).resizable("instance"), o = that.options, co = that.containerOffset, cp = that.position, pRatio = that._aspectRatio || event.shiftKey, cop = {
                top: 0,
                left: 0
            }, ce = that.containerElement, continueResize = !0;
            ce[0] !== document && /static/.test(ce.css("position")) && (cop = co), cp.left < (that._helper ? co.left : 0) && (that.size.width = that.size.width + (that._helper ? that.position.left - co.left : that.position.left - cop.left), 
            pRatio && (that.size.height = that.size.width / that.aspectRatio, continueResize = !1), 
            that.position.left = o.helper ? co.left : 0), cp.top < (that._helper ? co.top : 0) && (that.size.height = that.size.height + (that._helper ? that.position.top - co.top : that.position.top), 
            pRatio && (that.size.width = that.size.height * that.aspectRatio, continueResize = !1), 
            that.position.top = that._helper ? co.top : 0), isParent = that.containerElement.get(0) === that.element.parent().get(0), 
            isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position")), 
            isParent && isOffsetRelative ? (that.offset.left = that.parentData.left + that.position.left, 
            that.offset.top = that.parentData.top + that.position.top) : (that.offset.left = that.element.offset().left, 
            that.offset.top = that.element.offset().top), woset = Math.abs(that.sizeDiff.width + (that._helper ? that.offset.left - cop.left : that.offset.left - co.left)), 
            hoset = Math.abs(that.sizeDiff.height + (that._helper ? that.offset.top - cop.top : that.offset.top - co.top)), 
            woset + that.size.width >= that.parentData.width && (that.size.width = that.parentData.width - woset, 
            pRatio && (that.size.height = that.size.width / that.aspectRatio, continueResize = !1)), 
            hoset + that.size.height >= that.parentData.height && (that.size.height = that.parentData.height - hoset, 
            pRatio && (that.size.width = that.size.height * that.aspectRatio, continueResize = !1)), 
            continueResize || (that.position.left = that.prevPosition.left, that.position.top = that.prevPosition.top, 
            that.size.width = that.prevSize.width, that.size.height = that.prevSize.height);
        },
        stop: function() {
            var that = $(this).resizable("instance"), o = that.options, co = that.containerOffset, cop = that.containerPosition, ce = that.containerElement, helper = $(that.helper), ho = helper.offset(), w = helper.outerWidth() - that.sizeDiff.width, h = helper.outerHeight() - that.sizeDiff.height;
            that._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            }), that._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            });
        }
    }), $.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var that = $(this).resizable("instance"), o = that.options;
            $(o.alsoResize).each(function() {
                var el = $(this);
                el.data("ui-resizable-alsoresize", {
                    width: parseInt(el.width(), 10),
                    height: parseInt(el.height(), 10),
                    left: parseInt(el.css("left"), 10),
                    top: parseInt(el.css("top"), 10)
                });
            });
        },
        resize: function(event, ui) {
            var that = $(this).resizable("instance"), o = that.options, os = that.originalSize, op = that.originalPosition, delta = {
                height: that.size.height - os.height || 0,
                width: that.size.width - os.width || 0,
                top: that.position.top - op.top || 0,
                left: that.position.left - op.left || 0
            };
            $(o.alsoResize).each(function() {
                var el = $(this), start = $(this).data("ui-resizable-alsoresize"), style = {}, css = el.parents(ui.originalElement[0]).length ? [ "width", "height" ] : [ "width", "height", "top", "left" ];
                $.each(css, function(i, prop) {
                    var sum = (start[prop] || 0) + (delta[prop] || 0);
                    sum && sum >= 0 && (style[prop] = sum || null);
                }), el.css(style);
            });
        },
        stop: function() {
            $(this).removeData("resizable-alsoresize");
        }
    }), $.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var that = $(this).resizable("instance"), o = that.options, cs = that.size;
            that.ghost = that.originalElement.clone(), that.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: cs.height,
                width: cs.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof o.ghost ? o.ghost : ""), 
            that.ghost.appendTo(that.helper);
        },
        resize: function() {
            var that = $(this).resizable("instance");
            that.ghost && that.ghost.css({
                position: "relative",
                height: that.size.height,
                width: that.size.width
            });
        },
        stop: function() {
            var that = $(this).resizable("instance");
            that.ghost && that.helper && that.helper.get(0).removeChild(that.ghost.get(0));
        }
    }), $.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var outerDimensions, that = $(this).resizable("instance"), o = that.options, cs = that.size, os = that.originalSize, op = that.originalPosition, a = that.axis, grid = "number" == typeof o.grid ? [ o.grid, o.grid ] : o.grid, gridX = grid[0] || 1, gridY = grid[1] || 1, ox = Math.round((cs.width - os.width) / gridX) * gridX, oy = Math.round((cs.height - os.height) / gridY) * gridY, newWidth = os.width + ox, newHeight = os.height + oy, isMaxWidth = o.maxWidth && o.maxWidth < newWidth, isMaxHeight = o.maxHeight && o.maxHeight < newHeight, isMinWidth = o.minWidth && o.minWidth > newWidth, isMinHeight = o.minHeight && o.minHeight > newHeight;
            o.grid = grid, isMinWidth && (newWidth += gridX), isMinHeight && (newHeight += gridY), 
            isMaxWidth && (newWidth -= gridX), isMaxHeight && (newHeight -= gridY), /^(se|s|e)$/.test(a) ? (that.size.width = newWidth, 
            that.size.height = newHeight) : /^(ne)$/.test(a) ? (that.size.width = newWidth, 
            that.size.height = newHeight, that.position.top = op.top - oy) : /^(sw)$/.test(a) ? (that.size.width = newWidth, 
            that.size.height = newHeight, that.position.left = op.left - ox) : ((0 >= newHeight - gridY || 0 >= newWidth - gridX) && (outerDimensions = that._getPaddingPlusBorderDimensions(this)), 
            newHeight - gridY > 0 ? (that.size.height = newHeight, that.position.top = op.top - oy) : (newHeight = gridY - outerDimensions.height, 
            that.size.height = newHeight, that.position.top = op.top + os.height - newHeight), 
            newWidth - gridX > 0 ? (that.size.width = newWidth, that.position.left = op.left - ox) : (newWidth = gridX - outerDimensions.width, 
            that.size.width = newWidth, that.position.left = op.left + os.width - newWidth));
        }
    }), $.ui.resizable;
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/dialog", [ "jquery", "./core", "./widget", "./button", "./draggable", "./mouse", "./position", "./resizable" ], factory) : factory(jQuery);
}(function($) {
    return $.widget("ui.dialog", {
        version: "1.11.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "Close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    0 > topOffset && $(this).css("top", pos.top - topOffset);
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, 
            this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), 
            this._createTitlebar(), this._createButtonPane(), this.options.draggable && $.fn.draggable && this._makeDraggable(), 
            this.options.resizable && $.fn.resizable && this._makeResizable(), this._isOpen = !1, 
            this._trackFocus();
        },
        _init: function() {
            this.options.autoOpen && this.open();
        },
        _appendTo: function() {
            var element = this.options.appendTo;
            return element && (element.jquery || element.nodeType) ? $(element) : this.document.find(element || "body").eq(0);
        },
        _destroy: function() {
            var next, originalPosition = this.originalPosition;
            this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), 
            this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), 
            next = originalPosition.parent.children().eq(originalPosition.index), next.length && next[0] !== this.element[0] ? next.before(this.element) : originalPosition.parent.append(this.element);
        },
        widget: function() {
            return this.uiDialog;
        },
        disable: $.noop,
        enable: $.noop,
        close: function(event) {
            var activeElement, that = this;
            if (this._isOpen && this._trigger("beforeClose", event) !== !1) {
                if (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), 
                !this.opener.filter(":focusable").focus().length) try {
                    activeElement = this.document[0].activeElement, activeElement && "body" !== activeElement.nodeName.toLowerCase() && $(activeElement).blur();
                } catch (error) {}
                this._hide(this.uiDialog, this.options.hide, function() {
                    that._trigger("close", event);
                });
            }
        },
        isOpen: function() {
            return this._isOpen;
        },
        moveToTop: function() {
            this._moveToTop();
        },
        _moveToTop: function(event, silent) {
            var moved = !1, zIndices = this.uiDialog.siblings(".ui-front:visible").map(function() {
                return +$(this).css("z-index");
            }).get(), zIndexMax = Math.max.apply(null, zIndices);
            return zIndexMax >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", zIndexMax + 1), 
            moved = !0), moved && !silent && this._trigger("focus", event), moved;
        },
        open: function() {
            var that = this;
            return this._isOpen ? void (this._moveToTop() && this._focusTabbable()) : (this._isOpen = !0, 
            this.opener = $(this.document[0].activeElement), this._size(), this._position(), 
            this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), 
            this._show(this.uiDialog, this.options.show, function() {
                that._focusTabbable(), that._trigger("focus");
            }), this._makeFocusTarget(), void this._trigger("open"));
        },
        _focusTabbable: function() {
            var hasFocus = this._focusedElement;
            hasFocus || (hasFocus = this.element.find("[autofocus]")), hasFocus.length || (hasFocus = this.element.find(":tabbable")), 
            hasFocus.length || (hasFocus = this.uiDialogButtonPane.find(":tabbable")), hasFocus.length || (hasFocus = this.uiDialogTitlebarClose.filter(":tabbable")), 
            hasFocus.length || (hasFocus = this.uiDialog), hasFocus.eq(0).focus();
        },
        _keepFocus: function(event) {
            function checkFocus() {
                var activeElement = this.document[0].activeElement, isActive = this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0], activeElement);
                isActive || this._focusTabbable();
            }
            event.preventDefault(), checkFocus.call(this), this._delay(checkFocus);
        },
        _createWrapper: function() {
            this.uiDialog = $("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._on(this.uiDialog, {
                keydown: function(event) {
                    if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE) return event.preventDefault(), 
                    void this.close(event);
                    if (event.keyCode === $.ui.keyCode.TAB && !event.isDefaultPrevented()) {
                        var tabbables = this.uiDialog.find(":tabbable"), first = tabbables.filter(":first"), last = tabbables.filter(":last");
                        event.target !== last[0] && event.target !== this.uiDialog[0] || event.shiftKey ? event.target !== first[0] && event.target !== this.uiDialog[0] || !event.shiftKey || (this._delay(function() {
                            last.focus();
                        }), event.preventDefault()) : (this._delay(function() {
                            first.focus();
                        }), event.preventDefault());
                    }
                },
                mousedown: function(event) {
                    this._moveToTop(event) && this._focusTabbable();
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            });
        },
        _createTitlebar: function() {
            var uiDialogTitle;
            this.uiDialogTitlebar = $("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), 
            this._on(this.uiDialogTitlebar, {
                mousedown: function(event) {
                    $(event.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus();
                }
            }), this.uiDialogTitlebarClose = $("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
                click: function(event) {
                    event.preventDefault(), this.close(event);
                }
            }), uiDialogTitle = $("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), 
            this._title(uiDialogTitle), this.uiDialog.attr({
                "aria-labelledby": uiDialogTitle.attr("id")
            });
        },
        _title: function(title) {
            this.options.title || title.html("&#160;"), title.text(this.options.title);
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = $("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), 
            this.uiButtonSet = $("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), 
            this._createButtons();
        },
        _createButtons: function() {
            var that = this, buttons = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), $.isEmptyObject(buttons) || $.isArray(buttons) && !buttons.length ? void this.uiDialog.removeClass("ui-dialog-buttons") : ($.each(buttons, function(name, props) {
                var click, buttonOptions;
                props = $.isFunction(props) ? {
                    click: props,
                    text: name
                } : props, props = $.extend({
                    type: "button"
                }, props), click = props.click, props.click = function() {
                    click.apply(that.element[0], arguments);
                }, buttonOptions = {
                    icons: props.icons,
                    text: props.showText
                }, delete props.icons, delete props.showText, $("<button></button>", props).button(buttonOptions).appendTo(that.uiButtonSet);
            }), this.uiDialog.addClass("ui-dialog-buttons"), void this.uiDialogButtonPane.appendTo(this.uiDialog));
        },
        _makeDraggable: function() {
            function filteredUi(ui) {
                return {
                    position: ui.position,
                    offset: ui.offset
                };
            }
            var that = this, options = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(event, ui) {
                    $(this).addClass("ui-dialog-dragging"), that._blockFrames(), that._trigger("dragStart", event, filteredUi(ui));
                },
                drag: function(event, ui) {
                    that._trigger("drag", event, filteredUi(ui));
                },
                stop: function(event, ui) {
                    var left = ui.offset.left - that.document.scrollLeft(), top = ui.offset.top - that.document.scrollTop();
                    options.position = {
                        my: "left top",
                        at: "left" + (left >= 0 ? "+" : "") + left + " top" + (top >= 0 ? "+" : "") + top,
                        of: that.window
                    }, $(this).removeClass("ui-dialog-dragging"), that._unblockFrames(), that._trigger("dragStop", event, filteredUi(ui));
                }
            });
        },
        _makeResizable: function() {
            function filteredUi(ui) {
                return {
                    originalPosition: ui.originalPosition,
                    originalSize: ui.originalSize,
                    position: ui.position,
                    size: ui.size
                };
            }
            var that = this, options = this.options, handles = options.resizable, position = this.uiDialog.css("position"), resizeHandles = "string" == typeof handles ? handles : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: options.maxWidth,
                maxHeight: options.maxHeight,
                minWidth: options.minWidth,
                minHeight: this._minHeight(),
                handles: resizeHandles,
                start: function(event, ui) {
                    $(this).addClass("ui-dialog-resizing"), that._blockFrames(), that._trigger("resizeStart", event, filteredUi(ui));
                },
                resize: function(event, ui) {
                    that._trigger("resize", event, filteredUi(ui));
                },
                stop: function(event, ui) {
                    var offset = that.uiDialog.offset(), left = offset.left - that.document.scrollLeft(), top = offset.top - that.document.scrollTop();
                    options.height = that.uiDialog.height(), options.width = that.uiDialog.width(), 
                    options.position = {
                        my: "left top",
                        at: "left" + (left >= 0 ? "+" : "") + left + " top" + (top >= 0 ? "+" : "") + top,
                        of: that.window
                    }, $(this).removeClass("ui-dialog-resizing"), that._unblockFrames(), that._trigger("resizeStop", event, filteredUi(ui));
                }
            }).css("position", position);
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(event) {
                    this._makeFocusTarget(), this._focusedElement = $(event.target);
                }
            });
        },
        _makeFocusTarget: function() {
            this._untrackInstance(), this._trackingInstances().unshift(this);
        },
        _untrackInstance: function() {
            var instances = this._trackingInstances(), exists = $.inArray(this, instances);
            -1 !== exists && instances.splice(exists, 1);
        },
        _trackingInstances: function() {
            var instances = this.document.data("ui-dialog-instances");
            return instances || (instances = [], this.document.data("ui-dialog-instances", instances)), 
            instances;
        },
        _minHeight: function() {
            var options = this.options;
            return "auto" === options.height ? options.minHeight : Math.min(options.minHeight, options.height);
        },
        _position: function() {
            var isVisible = this.uiDialog.is(":visible");
            isVisible || this.uiDialog.show(), this.uiDialog.position(this.options.position), 
            isVisible || this.uiDialog.hide();
        },
        _setOptions: function(options) {
            var that = this, resize = !1, resizableOptions = {};
            $.each(options, function(key, value) {
                that._setOption(key, value), key in that.sizeRelatedOptions && (resize = !0), key in that.resizableRelatedOptions && (resizableOptions[key] = value);
            }), resize && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", resizableOptions);
        },
        _setOption: function(key, value) {
            var isDraggable, isResizable, uiDialog = this.uiDialog;
            "dialogClass" === key && uiDialog.removeClass(this.options.dialogClass).addClass(value), 
            "disabled" !== key && (this._super(key, value), "appendTo" === key && this.uiDialog.appendTo(this._appendTo()), 
            "buttons" === key && this._createButtons(), "closeText" === key && this.uiDialogTitlebarClose.button({
                label: "" + value
            }), "draggable" === key && (isDraggable = uiDialog.is(":data(ui-draggable)"), isDraggable && !value && uiDialog.draggable("destroy"), 
            !isDraggable && value && this._makeDraggable()), "position" === key && this._position(), 
            "resizable" === key && (isResizable = uiDialog.is(":data(ui-resizable)"), isResizable && !value && uiDialog.resizable("destroy"), 
            isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value), 
            isResizable || value === !1 || this._makeResizable()), "title" === key && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
        },
        _size: function() {
            var nonContentHeight, minContentHeight, maxContentHeight, options = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), options.minWidth > options.width && (options.width = options.minWidth), nonContentHeight = this.uiDialog.css({
                height: "auto",
                width: options.width
            }).outerHeight(), minContentHeight = Math.max(0, options.minHeight - nonContentHeight), 
            maxContentHeight = "number" == typeof options.maxHeight ? Math.max(0, options.maxHeight - nonContentHeight) : "none", 
            "auto" === options.height ? this.element.css({
                minHeight: minContentHeight,
                maxHeight: maxContentHeight,
                height: "auto"
            }) : this.element.height(Math.max(0, options.height - nonContentHeight)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight());
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var iframe = $(this);
                return $("<div>").css({
                    position: "absolute",
                    width: iframe.outerWidth(),
                    height: iframe.outerHeight()
                }).appendTo(iframe.parent()).offset(iframe.offset())[0];
            });
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks);
        },
        _allowInteraction: function(event) {
            return $(event.target).closest(".ui-dialog").length ? !0 : !!$(event.target).closest(".ui-datepicker").length;
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var isOpening = !0;
                this._delay(function() {
                    isOpening = !1;
                }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function(event) {
                        isOpening || this._allowInteraction(event) || (event.preventDefault(), this._trackingInstances()[0]._focusTabbable());
                    }
                }), this.overlay = $("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), 
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                }), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1);
            }
        },
        _destroyOverlay: function() {
            if (this.options.modal && this.overlay) {
                var overlays = this.document.data("ui-dialog-overlays") - 1;
                overlays ? this.document.data("ui-dialog-overlays", overlays) : this.document.unbind("focusin").removeData("ui-dialog-overlays"), 
                this.overlay.remove(), this.overlay = null;
            }
        }
    });
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery-ui/tabs", [ "jquery", "./core", "./widget" ], factory) : factory(jQuery);
}(function($) {
    return $.widget("ui.tabs", {
        version: "1.11.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: function() {
            var rhash = /#.*$/;
            return function(anchor) {
                var anchorUrl, locationUrl;
                anchor = anchor.cloneNode(!1), anchorUrl = anchor.href.replace(rhash, ""), locationUrl = location.href.replace(rhash, "");
                try {
                    anchorUrl = decodeURIComponent(anchorUrl);
                } catch (error) {}
                try {
                    locationUrl = decodeURIComponent(locationUrl);
                } catch (error) {}
                return anchor.hash.length > 1 && anchorUrl === locationUrl;
            };
        }(),
        _create: function() {
            var that = this, options = this.options;
            this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", options.collapsible), 
            this._processTabs(), options.active = this._initialActive(), $.isArray(options.disabled) && (options.disabled = $.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"), function(li) {
                return that.tabs.index(li);
            }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(options.active) : $(), 
            this._refresh(), this.active.length && this.load(options.active);
        },
        _initialActive: function() {
            var active = this.options.active, collapsible = this.options.collapsible, locationHash = location.hash.substring(1);
            return null === active && (locationHash && this.tabs.each(function(i, tab) {
                return $(tab).attr("aria-controls") === locationHash ? (active = i, !1) : void 0;
            }), null === active && (active = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), 
            (null === active || -1 === active) && (active = this.tabs.length ? 0 : !1)), active !== !1 && (active = this.tabs.index(this.tabs.eq(active)), 
            -1 === active && (active = collapsible ? !1 : 0)), !collapsible && active === !1 && this.anchors.length && (active = 0), 
            active;
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : $()
            };
        },
        _tabKeydown: function(event) {
            var focusedTab = $(this.document[0].activeElement).closest("li"), selectedIndex = this.tabs.index(focusedTab), goingForward = !0;
            if (!this._handlePageNav(event)) {
                switch (event.keyCode) {
                  case $.ui.keyCode.RIGHT:
                  case $.ui.keyCode.DOWN:
                    selectedIndex++;
                    break;

                  case $.ui.keyCode.UP:
                  case $.ui.keyCode.LEFT:
                    goingForward = !1, selectedIndex--;
                    break;

                  case $.ui.keyCode.END:
                    selectedIndex = this.anchors.length - 1;
                    break;

                  case $.ui.keyCode.HOME:
                    selectedIndex = 0;
                    break;

                  case $.ui.keyCode.SPACE:
                    return event.preventDefault(), clearTimeout(this.activating), void this._activate(selectedIndex);

                  case $.ui.keyCode.ENTER:
                    return event.preventDefault(), clearTimeout(this.activating), void this._activate(selectedIndex === this.options.active ? !1 : selectedIndex);

                  default:
                    return;
                }
                event.preventDefault(), clearTimeout(this.activating), selectedIndex = this._focusNextTab(selectedIndex, goingForward), 
                event.ctrlKey || event.metaKey || (focusedTab.attr("aria-selected", "false"), this.tabs.eq(selectedIndex).attr("aria-selected", "true"), 
                this.activating = this._delay(function() {
                    this.option("active", selectedIndex);
                }, this.delay));
            }
        },
        _panelKeydown: function(event) {
            this._handlePageNav(event) || event.ctrlKey && event.keyCode === $.ui.keyCode.UP && (event.preventDefault(), 
            this.active.focus());
        },
        _handlePageNav: function(event) {
            return event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), 
            !0) : event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), 
            !0) : void 0;
        },
        _findNextTab: function(index, goingForward) {
            function constrain() {
                return index > lastTabIndex && (index = 0), 0 > index && (index = lastTabIndex), 
                index;
            }
            for (var lastTabIndex = this.tabs.length - 1; -1 !== $.inArray(constrain(), this.options.disabled); ) index = goingForward ? index + 1 : index - 1;
            return index;
        },
        _focusNextTab: function(index, goingForward) {
            return index = this._findNextTab(index, goingForward), this.tabs.eq(index).focus(), 
            index;
        },
        _setOption: function(key, value) {
            return "active" === key ? void this._activate(value) : "disabled" === key ? void this._setupDisabled(value) : (this._super(key, value), 
            "collapsible" === key && (this.element.toggleClass("ui-tabs-collapsible", value), 
            value || this.options.active !== !1 || this._activate(0)), "event" === key && this._setupEvents(value), 
            void ("heightStyle" === key && this._setupHeightStyle(value)));
        },
        _sanitizeSelector: function(hash) {
            return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : "";
        },
        refresh: function() {
            var options = this.options, lis = this.tablist.children(":has(a[href])");
            options.disabled = $.map(lis.filter(".ui-state-disabled"), function(tab) {
                return lis.index(tab);
            }), this._processTabs(), options.active !== !1 && this.anchors.length ? this.active.length && !$.contains(this.tablist[0], this.active[0]) ? this.tabs.length === options.disabled.length ? (options.active = !1, 
            this.active = $()) : this._activate(this._findNextTab(Math.max(0, options.active - 1), !1)) : options.active = this.tabs.index(this.active) : (options.active = !1, 
            this.active = $()), this._refresh();
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), 
            this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0);
        },
        _processTabs: function() {
            var that = this, prevTabs = this.tabs, prevAnchors = this.anchors, prevPanels = this.panels;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist").delegate("> li", "mousedown" + this.eventNamespace, function(event) {
                $(this).is(".ui-state-disabled") && event.preventDefault();
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                $(this).closest("li").is(".ui-state-disabled") && this.blur();
            }), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }), this.anchors = this.tabs.map(function() {
                return $("a", this)[0];
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }), this.panels = $(), this.anchors.each(function(i, anchor) {
                var selector, panel, panelId, anchorId = $(anchor).uniqueId().attr("id"), tab = $(anchor).closest("li"), originalAriaControls = tab.attr("aria-controls");
                that._isLocal(anchor) ? (selector = anchor.hash, panelId = selector.substring(1), 
                panel = that.element.find(that._sanitizeSelector(selector))) : (panelId = tab.attr("aria-controls") || $({}).uniqueId()[0].id, 
                selector = "#" + panelId, panel = that.element.find(selector), panel.length || (panel = that._createPanel(panelId), 
                panel.insertAfter(that.panels[i - 1] || that.tablist)), panel.attr("aria-live", "polite")), 
                panel.length && (that.panels = that.panels.add(panel)), originalAriaControls && tab.data("ui-tabs-aria-controls", originalAriaControls), 
                tab.attr({
                    "aria-controls": panelId,
                    "aria-labelledby": anchorId
                }), panel.attr("aria-labelledby", anchorId);
            }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel"), 
            prevTabs && (this._off(prevTabs.not(this.tabs)), this._off(prevAnchors.not(this.anchors)), 
            this._off(prevPanels.not(this.panels)));
        },
        _getList: function() {
            return this.tablist || this.element.find("ol,ul").eq(0);
        },
        _createPanel: function(id) {
            return $("<div>").attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0);
        },
        _setupDisabled: function(disabled) {
            $.isArray(disabled) && (disabled.length ? disabled.length === this.anchors.length && (disabled = !0) : disabled = !1);
            for (var li, i = 0; li = this.tabs[i]; i++) disabled === !0 || -1 !== $.inArray(i, disabled) ? $(li).addClass("ui-state-disabled").attr("aria-disabled", "true") : $(li).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = disabled;
        },
        _setupEvents: function(event) {
            var events = {};
            event && $.each(event.split(" "), function(index, eventName) {
                events[eventName] = "_eventHandler";
            }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(!0, this.anchors, {
                click: function(event) {
                    event.preventDefault();
                }
            }), this._on(this.anchors, events), this._on(this.tabs, {
                keydown: "_tabKeydown"
            }), this._on(this.panels, {
                keydown: "_panelKeydown"
            }), this._focusable(this.tabs), this._hoverable(this.tabs);
        },
        _setupHeightStyle: function(heightStyle) {
            var maxHeight, parent = this.element.parent();
            "fill" === heightStyle ? (maxHeight = parent.height(), maxHeight -= this.element.outerHeight() - this.element.height(), 
            this.element.siblings(":visible").each(function() {
                var elem = $(this), position = elem.css("position");
                "absolute" !== position && "fixed" !== position && (maxHeight -= elem.outerHeight(!0));
            }), this.element.children().not(this.panels).each(function() {
                maxHeight -= $(this).outerHeight(!0);
            }), this.panels.each(function() {
                $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()));
            }).css("overflow", "auto")) : "auto" === heightStyle && (maxHeight = 0, this.panels.each(function() {
                maxHeight = Math.max(maxHeight, $(this).height("").height());
            }).height(maxHeight));
        },
        _eventHandler: function(event) {
            var options = this.options, active = this.active, anchor = $(event.currentTarget), tab = anchor.closest("li"), clickedIsActive = tab[0] === active[0], collapsing = clickedIsActive && options.collapsible, toShow = collapsing ? $() : this._getPanelForTab(tab), toHide = active.length ? this._getPanelForTab(active) : $(), eventData = {
                oldTab: active,
                oldPanel: toHide,
                newTab: collapsing ? $() : tab,
                newPanel: toShow
            };
            event.preventDefault(), tab.hasClass("ui-state-disabled") || tab.hasClass("ui-tabs-loading") || this.running || clickedIsActive && !options.collapsible || this._trigger("beforeActivate", event, eventData) === !1 || (options.active = collapsing ? !1 : this.tabs.index(tab), 
            this.active = clickedIsActive ? $() : tab, this.xhr && this.xhr.abort(), toHide.length || toShow.length || $.error("jQuery UI Tabs: Mismatching fragment identifier."), 
            toShow.length && this.load(this.tabs.index(tab), event), this._toggle(event, eventData));
        },
        _toggle: function(event, eventData) {
            function complete() {
                that.running = !1, that._trigger("activate", event, eventData);
            }
            function show() {
                eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), toShow.length && that.options.show ? that._show(toShow, that.options.show, complete) : (toShow.show(), 
                complete());
            }
            var that = this, toShow = eventData.newPanel, toHide = eventData.oldPanel;
            this.running = !0, toHide.length && this.options.hide ? this._hide(toHide, this.options.hide, function() {
                eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), show();
            }) : (eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), 
            toHide.hide(), show()), toHide.attr("aria-hidden", "true"), eventData.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }), toShow.length && toHide.length ? eventData.oldTab.attr("tabIndex", -1) : toShow.length && this.tabs.filter(function() {
                return 0 === $(this).attr("tabIndex");
            }).attr("tabIndex", -1), toShow.attr("aria-hidden", "false"), eventData.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            });
        },
        _activate: function(index) {
            var anchor, active = this._findActive(index);
            active[0] !== this.active[0] && (active.length || (active = this.active), anchor = active.find(".ui-tabs-anchor")[0], 
            this._eventHandler({
                target: anchor,
                currentTarget: anchor,
                preventDefault: $.noop
            }));
        },
        _findActive: function(index) {
            return index === !1 ? $() : this.tabs.eq(index);
        },
        _getIndex: function(index) {
            return "string" == typeof index && (index = this.anchors.index(this.anchors.filter("[href$='" + index + "']"))), 
            index;
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), 
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), 
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), 
            this.tablist.unbind(this.eventNamespace), this.tabs.add(this.panels).each(function() {
                $.data(this, "ui-tabs-destroy") ? $(this).remove() : $(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role");
            }), this.tabs.each(function() {
                var li = $(this), prev = li.data("ui-tabs-aria-controls");
                prev ? li.attr("aria-controls", prev).removeData("ui-tabs-aria-controls") : li.removeAttr("aria-controls");
            }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "");
        },
        enable: function(index) {
            var disabled = this.options.disabled;
            disabled !== !1 && (void 0 === index ? disabled = !1 : (index = this._getIndex(index), 
            disabled = $.isArray(disabled) ? $.map(disabled, function(num) {
                return num !== index ? num : null;
            }) : $.map(this.tabs, function(li, num) {
                return num !== index ? num : null;
            })), this._setupDisabled(disabled));
        },
        disable: function(index) {
            var disabled = this.options.disabled;
            if (disabled !== !0) {
                if (void 0 === index) disabled = !0; else {
                    if (index = this._getIndex(index), -1 !== $.inArray(index, disabled)) return;
                    disabled = $.isArray(disabled) ? $.merge([ index ], disabled).sort() : [ index ];
                }
                this._setupDisabled(disabled);
            }
        },
        load: function(index, event) {
            index = this._getIndex(index);
            var that = this, tab = this.tabs.eq(index), anchor = tab.find(".ui-tabs-anchor"), panel = this._getPanelForTab(tab), eventData = {
                tab: tab,
                panel: panel
            }, complete = function(jqXHR, status) {
                "abort" === status && that.panels.stop(!1, !0), tab.removeClass("ui-tabs-loading"), 
                panel.removeAttr("aria-busy"), jqXHR === that.xhr && delete that.xhr;
            };
            this._isLocal(anchor[0]) || (this.xhr = $.ajax(this._ajaxSettings(anchor, event, eventData)), 
            this.xhr && "canceled" !== this.xhr.statusText && (tab.addClass("ui-tabs-loading"), 
            panel.attr("aria-busy", "true"), this.xhr.done(function(response, status, jqXHR) {
                setTimeout(function() {
                    panel.html(response), that._trigger("load", event, eventData), complete(jqXHR, status);
                }, 1);
            }).fail(function(jqXHR, status) {
                setTimeout(function() {
                    complete(jqXHR, status);
                }, 1);
            })));
        },
        _ajaxSettings: function(anchor, event, eventData) {
            var that = this;
            return {
                url: anchor.attr("href"),
                beforeSend: function(jqXHR, settings) {
                    return that._trigger("beforeLoad", event, $.extend({
                        jqXHR: jqXHR,
                        ajaxSettings: settings
                    }, eventData));
                }
            };
        },
        _getPanelForTab: function(tab) {
            var id = $(tab).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + id));
        }
    });
}), function(factory) {
    "function" == typeof define && define.amd ? define("jquery.cookie/jquery.cookie", [ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }
    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }
    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }
    function parseCookieValue(s) {
        0 === s.indexOf('"') && (s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return s = decodeURIComponent(s.replace(pluses, " ")), config.json ? JSON.parse(s) : s;
        } catch (e) {}
    }
    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }
    var pluses = /\+/g, config = $.cookie = function(key, value, options) {
        if (void 0 !== value && !$.isFunction(value)) {
            if (options = $.extend({}, config.defaults, options), "number" == typeof options.expires) {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + 864e5 * days);
            }
            return document.cookie = [ encode(key), "=", stringifyCookieValue(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : "" ].join("");
        }
        for (var result = key ? void 0 : {}, cookies = document.cookie ? document.cookie.split("; ") : [], i = 0, l = cookies.length; l > i; i++) {
            var parts = cookies[i].split("="), name = decode(parts.shift()), cookie = parts.join("=");
            if (key && key === name) {
                result = read(cookie, value);
                break;
            }
            key || void 0 === (cookie = read(cookie)) || (result[name] = cookie);
        }
        return result;
    };
    config.defaults = {}, $.removeCookie = function(key, options) {
        return void 0 === $.cookie(key) ? !1 : ($.cookie(key, "", $.extend({}, options, {
            expires: -1
        })), !$.cookie(key));
    };
}), requirejs.config({
    baseUrl: "/js/lib",
    paths: {
        jquery: "./jquery/dist/jquery",
        "jquery-ui": "./jquery-ui/ui"
    }
}), require([ "jquery", "jquery-ui/autocomplete", "jquery-ui/dialog", "jquery-ui/tabs", "jquery.cookie/jquery.cookie" ], doc_ready), 
define("../pg-desktop", function() {});