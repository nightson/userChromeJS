// ==UserScript==
// @name           Reload For Me, Please
// @author         NightsoN
// @namespace      nightson1988@gmail.com
// @description    Reload tab automatically. If you want more options, check out Tab Reloader(https://github.com/james-fray/tab-reloader).
// @include        main
// @version        0.1
// @icon           Icons from https://www.flaticon.com/free-icon/reloading_5690443
// ==/UserScript==

if (!window.RFMP) {
  window.RFMP = {
    reloadOnIcon: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKZSURBVDiNdZJPSFRRFMZ/972nz3HUSadmTNMs0rAmjP5SEWaYQSFtItoULSJpleEm2rRp1X9qWdE23EQQCKZZYGVKk6UFOhVmjdVMo+M8Z9R5M++2aJ6J2YEDl3O+77vn3PvBv+EDbgCDwFQmBzM130KwNu+cDVz36trh65UVH+rcBZpTUQCIW5baFYnVNA+NdIbMVCvQAiQBxDxyW1OpJ/dSVZlPIPIWmQwpMVoCo+/vBENx4ACQVDO9m02lnvLLVeXbBUJfjAwgBPp+t6skbKbCfiPuA9oE4PPqWsfwzhqnQOSNTM/2AMK0ZPrhrwnpUBXrqNdd4M7SauYmgVhld/9MyEztVYHzt6tXq2udjiqAZ1Hj46G3w5v8Rnz2VJk37lI16/jgp+I8VfFvyM9dldlbX+nQ+x6EJpYrwL66ovwSW92pKGI6beX2G4mKVTn6ktrC/Nre7b7CK6M/KqOp9DsbV+92FQP7BBCbrNss7IcTkDCljGhClAKKTXgUjj6dMFPqsZKlu/+sIadcXa/lHMAOU8oJVQjXfDKAJsCUlvz7JUKSAX1NWDJo1zsjscCFT8GBBbrTF0fGyhqXFTnsQsKygsAXBWjvjMS+242Gpa6tPZNG0bnA15ffZpK9gemZF439Q5/rC11jy7K1rTbu8fjkD6BdAOs9WdqTwK6NDiHIt2/sGJ981fpz3JmjCOv0Cm+62unYQcZ4EmJruvtnw2Zqj+3EWydLPVuuVZVvW7j7ImGdGRrpuzf2qwdotp3Y6TfiR8JmKtzgdhUIWNSNEmJnh0ff3hsLG8AJwLIF0sB9vxH33Q2Gqiscel9Zjj6TpQgHyGQiLT+3RaKDB98MFT2PGm0Zsvm/EdcD14ABwMjkAHAVWLcQ/BtNEgNXjsHazAAAAABJRU5ErkJggg==)',
    reloadOffIcon: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASTSURBVFiFtZdfbFRFFMZ/Z/Zud7t0F4r8sQWUFhITEaSWVkrUtIVIrdRGfTAmaGMiPoi+gH8iCJoIEYKaoPFRYyQiEh4wIiiGtkGwYitQxWAjtAVsN0gotLv0z+7ee3xYC8W2e1ek39PMvd853zd35p6ZEdLEX6VzsjIJPKyiZUABkAeMBwToBtqBZkVrE35rzy37jvSkk1fcCJEH500hlrFOhWeAcWn67QN2AJtDdU0tN2RAH5rti/Znv6roS0AwTeF/IwG8H+z3vi4NDX1pG7j8QHGex+PsUrjnBoWvh9JoGe+jgdqGDlcDkbKiOYruB3Jvivg1dNo2y7IPNh0b1cCl0oUzPZI4PAbigwhb4i0a+iXMYEMLC70eSewYQ3GAnDjxrzqrCgPDDERC8jJw7xiKAyBKQTAiG6/2AXpKCychchoIjRRkldwHHovEofp/ogwmfxZm8lQ0NoBzph29eOG/+EiI7cwLHjx60kq6kLU6ijiAf/3biOUlWr2YjCeW4616HJmQfR3HbjlJ7LOPr5lMDUs95jXgadGSksyIPx4mWdVGRHDfIfD5cMIdmJxpAGjXRZz2VvD7MXmzkMzktMa/2UP/uxvAtt1M9NuayLEimXYFOro4gNo2ApicaTgd54h9sY34/q8hFgNAAuPwVlbjW7ESb8UycGz639ngZsBvxHrEiOOUuzGxE1ebJnc6/lVr8K9ac81g7xViu7bTu/p5GBjAW1mNVbzINa3AYqPI3W5EjUaH9nDCHdgnmof7PNHMwPZPAMh4ssbVgMI86SlbcA6Ynopo8mdjZubjnG3HOXcGBgZG5UowRNbu70AhWr0YvRIdlQv0WKRY/YNwWk/htJ5yowGgkR6cs2cwt+chudPQP1JuhkGT6u0NQ5IVXozHlWqA1AcHY/DVPIdVXJKeuM+HTJoCgHPhvBs7YqHShuioa8BMvZWMmhVoNMKVpx5Duy+nzOgtX4oEAjhtp9Guiym5Cq1GRI+nIjnhTuxfjyNZQXwrV4OMPmsmJxffsysBiO3emVIcQJBmo6q1bsT+rZvRvl68SyrIXL8RmTBxGMdTUETmlg+R7InYv/1CfO+XrgZU9IBoaak/ItEwMCEV2TN3PpmbtiZLbjxG4ofvcc6HwRg8c+fjueNOAOyTJ+hbuwq9fMl1XLYmcgQgUrrgAxVecIsw02fgW/Ei1v1lw0cT6SG+eycD2z6CRGKE6GH4NFTXVCMAXUsKb7NsaQH86USa6TPwFBQlp6I3ihPuJNH4I8Rj6YRD8rB6V6iuqeXqkay7fMGboryRbob/ifdCdU2rYciJKNStG1HqxlpZ4Gg0S9cN6V9D99KSiRKLHwFmj5F+2FJPcaD+yJ+DD677qcd/29CFahXQdvO1tcOoVA4VH2YAIFT/8+8YUwTiWh/SlhaOWbYpyapvHFb0RixroQM/XQz2OBWKvAWMvve6Iw5sCTlZiwIHG8+NRHC9nF4qXTjTiP2KoMtJ844o0KvwuaqzaXz90ZT7uKuBQXRWFQaCEal0RMoleT3PBx16PW8DjotKbX88Y+/kw4cj6eT9G5Uqp0sdQTvpAAAAAElFTkSuQmCC)',

    reloadTab: function (interval) {
      var tab = gBrowser.selectedTab;
      this.reloadTabInterval = setInterval(func, interval);
      function func() {
        gBrowser.reloadTab(tab);
      }
      RFMP.setIcon('on');
    },

    reloadTabMod: function (interval) {
      var tab = gBrowser.selectedTab;
      var interval = prompt('Reload tab every ... (in seconds)', '') * 1000;
      this.reloadTabInterval = setInterval(func, interval);
      function func() {
        gBrowser.reloadTab(tab);
      }
      RFMP.setIcon('on');
    },

    stopReload: function () {
      clearInterval(this.reloadTabInterval);
      RFMP.setIcon('off');
    },

    setIcon: function (type) {
      var node = document.getElementById('rfmp-menu');
      switch (type) {
      case 'on':
        node.style.listStyleImage = RFMP.reloadOnIcon;
        break;
      case 'off':
        node.style.listStyleImage = RFMP.reloadOffIcon;
        break;
      default:
        console.log('Invalid icon type. Please use on or off.');
      }
    },

    jsonToDOM: function (json, doc, nodes) {
      var namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
      };
      var defaultNamespace = namespaces.html;

      function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);
        return [namespaces[m[1]], m[2]];
      }

      function tag(name, attr) {
        if (Array.isArray(name)) {
          var frag = doc.createDocumentFragment();
          Array.prototype.forEach(arguments, function (arg) {
            if (!Array.isArray(arg[0]))
              frag.appendChild(tag.apply(null, arg));
            else
              arg.forEach(function (arg) {
                frag.appendChild(tag.apply(null, arg));
              });
          });
          return frag;
        }

        var args = Array.prototype.slice.call(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || defaultNamespace, vals[1]);

        for (var key in attr) {
          var val = attr[key];
          if (nodes && key == 'id')
            nodes[val] = elem;

          vals = namespace(key);
          if (typeof val == 'function')
            elem.addEventListener(key.replace(/^on/, ''), val, false);
          else
            elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function (e) {
          try {
            elem.appendChild(
              Object.prototype.toString.call(e) == '[object Array]'
               ?
              tag.apply(null, e)
               :
              e instanceof doc.defaultView.Node
               ?
              e
               :
              doc.createTextNode(e));
          } catch (ex) {
            elem.appendChild(doc.createTextNode(ex));
          }
        });
        return elem;
      }
      return tag.apply(null, json);
    },

    init: function () {
      if (document.getElementById('rfmp-menu') === null) {
        CustomizableUI.createWidget({
          id: 'rfmp-menu',
          type: 'custom',
          defaultArea: CustomizableUI.AREA_NAVBAR,
          label: 'Reload For Me, Please.',
          tooltiptext: 'Simple Session Manager',
          onBuild: function (aDoc) {
            var node = aDoc.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
            node.setAttribute('id', 'rfmp-menu');
            node.setAttribute('class', 'toolbarbutton-1 chromeclass-toolbar-additional');
            node.setAttribute('type', 'menu');
            node.style.listStyleImage = RFMP.reloadOffIcon;
            var mymenupopup = ['xul:menupopup', {
                id: 'rfmp-menupopup'
              },
              ['xul:menuitem', {
                  label: 'Every 10 Seconds',
                  class: 'menuitem-non-iconic',
                  oncommand: 'RFMP.reloadTab(10000);',
                }
              ],
              ['xul:menuitem', {
                  label: 'Every 1 Minutes',
                  class: 'menuitem-non-iconic',
                  oncommand: 'RFMP.reloadTab(60000);'
                }
              ],
              ['xul:menuitem', {
                  label: 'Every 5 Minutes',
                  class: 'menuitem-non-iconic',
                  oncommand: 'RFMP.reloadTab(300000);'
                }
              ],
              ['xul:menuitem', {
                  label: 'Don\'t Choose For Me!',
                  class: 'menuitem-non-iconic',
                  oncommand: 'RFMP.reloadTabMod();'
                }
              ],
              ['xul:menuitem', {
                  label: 'Freeze, TaBI!',
                  class: 'menuitem-non-iconic',
                  oncommand: 'RFMP.stopReload();'
                }
              ]
            ];
            var menupopup = RFMP.jsonToDOM(mymenupopup, node.ownerDocument, {});
            node.appendChild(menupopup);
            return node;
          }
        });
      }
    }
  }
  RFMP.init();
}
