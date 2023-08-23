/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'search': '&#xe986;',
            'magnifier': '&#xe986;',
            'pen': '&#xe908;',
            'write3': '&#xe908;',
            'film': '&#xe913;',
            'video2': '&#xe913;',
            'spades': '&#xe917;',
            'cards': '&#xe917;',
            'connection': '&#xe91b;',
            'wifi': '&#xe91b;',
            'location2': '&#xe948;',
            'map-marker2': '&#xe948;',
            'compass2': '&#xe94a;',
            'direction2': '&#xe94a;',
            'cogs': '&#xe995;',
            'gears': '&#xe995;',
            'rocket': '&#xe9a5;',
            'jet': '&#xe9a5;',
            'file-text': '&#xe932;',
            'file': '&#xe932;',
            'profile': '&#xe933;',
            'file2': '&#xe933;',
            'compass': '&#xe949;',
            'direction': '&#xe949;',
            'bubble2': '&#xe96e;',
            'comment2': '&#xe96e;',
            'bubbles3': '&#xe96f;',
            'comments3': '&#xe96f;',
            'users': '&#xe972;',
            'group': '&#xe972;',
            'cog': '&#xe994;',
            'gear': '&#xe994;',
            'smile': '&#xe9e1;',
            'emoticon3': '&#xe9e1;',
            'checkmark': '&#xea10;',
            'tick': '&#xea10;',
            'share': '&#xea7d;',
            'out': '&#xea7d;',
            'share2': '&#xea82;',
            'social': '&#xea82;',
            'facebook': '&#xea90;',
            'brand10': '&#xea90;',
            'instagram': '&#xea92;',
            'brand12': '&#xea92;',
            'twitter': '&#xea96;',
            'brand16': '&#xea96;',
            'pinterest2': '&#xead2;',
            'brand73': '&#xead2;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
