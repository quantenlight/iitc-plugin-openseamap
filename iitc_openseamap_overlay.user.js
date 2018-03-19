// ==UserScript==
// @id              iitc-plugin-basemap-openseamap@Quantenstorm
// @name            IITC plugin: OpenSeaMap Overlay
// @category        Map Tiles
// @version         1.0.0
// @description     http://openseamap.org
// @match           https://*.ingress.com/intel*
// @match           http://*.ingress.com/intel*
// @include         /^https?:\/\/.*ingress\.com\/intel.*/
// @grant           none
// ==/UserScript==

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

// PLUGIN START ////////////////////////////////////////////////////////

var setup = function(){

	// https://openseamap.org/
	var OpenSeaMapAttr = 'Map Data: <a href="http://www.openstreetmap.org/copyright">OpenStreetMap.org / OSM Contributors</a>';
	var OpenSeaMapUrl = 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png';
	var OpenSeaMapLayer = new L.TileLayer(OpenSeaMapUrl, {attribution:OpenSeaMapAttr, maxNativeZoom: 18, maxZoom: 40});
	layerChooser.addOverlay(OpenSeaMapLayer, 'OpenSeaMap');
};

// PLUGIN END ////////////////////////////////////////////////////////
setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);
