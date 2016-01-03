// ==UserScript==
// @name           ScratchPadMod.uc.js
// @description    Let you choose which XULWindow to run your code in. Please set devtools.chrome.enabled to true before using this script.
// @namespace      https://github.com/nightson
// @include        chrome://devtools/content/scratchpad/scratchpad.xul
// @version        0.0.2 fix minor bugs
// @version        0.0.1
// ==/UserScript==

(function () {
    function $E(data, parent) {
        parent = parent ? parent : document.createDocumentFragment();
        var i,
            p,
            len = data.length;
        for (i = 0; i < len; i++) {
            let item = data[i];
            let node = document.createElement(item.localName);
            
            if (item.attrs) {
                for (p in item.attrs) {
                    node.setAttribute(p, item.attrs[p]);
                }
            }
            if (item.nodes) {
                $E(item.nodes, node);
            }
            parent.appendChild(node);
        }
        return parent;
    }

    var menu = $E([{
        localName: 'menu',
        attrs: {'id': 'sp-window-menu', 'label':'Window'},
        nodes: [{
            localName: 'menupopup',
            attrs: {'id': 'sp-window-menupopup', 'datasources': 'rdf:window-mediator', 'ref': 'NC:WindowMediatorRoot'},
            nodes: [{
                localName: 'template',
                nodes: [{
                    localName: 'rule',
                    nodes: [{
                        localName: 'menuitem',
                        attrs:{'uri': 'rdf:*', 'label': 'rdf:http://home.netscape.com/NC-rdf#Name', 'type': 'radio', 'oncommand': 'Scratchpad.setBrowserContext();'}
                    }]
                }]
            }]
        }]
        
    }]);

    var menubar = document.getElementById('sp-menubar');
    menubar.insertBefore(menu, document.getElementById('sp-help-menu'));

    if (document.getElementById('sp-menu-content')) document.getElementById('sp-menu-content').setAttribute('onclick', 'Scratchpad.uncheckWindowMenu();');

    Scratchpad.uncheckWindowMenu = function () {
        if (document.querySelector('#sp-window-menupopup menuitem[checked="true"]')) {
            document.querySelector('#sp-window-menupopup menuitem[checked="true"]').removeAttribute('checked');
        }
    }
    Scratchpad.getSelectedWin = function () {
        var wm = Components.classes["@mozilla.org/rdf/datasource;1?name=window-mediator"].getService();
        wm.QueryInterface(Components.interfaces.nsIWindowDataSource);
        var resource = document.querySelector('#sp-window-menupopup menuitem[checked="true"]').getAttribute('id')
        return wm.getWindowForResource(resource);
    }

    Object.defineProperty(Scratchpad, "browserWindow", {
        get: function(){
            if (document.querySelector('#sp-window-menupopup menuitem[checked="true"]')) {
                return this.getSelectedWin();
            } else {
                return Services.wm.getMostRecentWindow("navigator:browser");
            }
        },
    })

}());