// Load the sdk with an es import (script type="module" necessary)
import { Loader } from 'sdk';

const player = document.querySelector('#player');
const mount = document.querySelector('#mount');

// Safari...
const AudioContext = window.AudioContext // Default
	|| window.webkitAudioContext // Safari and old versions of Chrome
	|| false;

const audioContext = new AudioContext();
const mediaElementSource = audioContext.createMediaElementSource(player);

// Very simple function to connect the plugin audionode to the host
const connectPlugin = (audioNode) => {
	mediaElementSource.connect(audioNode);
	audioNode.connect(audioContext.destination);
};

// Very simple function to append the plugin root dom node to the host
const mountPlugin = (domNode) => {
	mount.innerHtml = '';
	mount.appendChild(domNode);
};

(async () => {
	// Load plugin from the url of its json descriptor
	// Pass the option { noGui: true } to not load the GUI by default
	// IMPORTANT NOTICE :
	// In order to be able to load the plugin in this example host,
	// you must add the plugin to the field webaudioplugins
	// in the package.json. Example :
	// "webaudioplugins": {
	//     "pingpongdelay": "dist", // you should replace dist with the build directory of your plugin
	//     "yourplugin": "dist"
	// }
	const LiveGain = await Loader.loadPluginFromUrl('/livegain/descriptor.json');

	// Create a new instance of the plugin
	// You can can optionnally give more options such as the initial state of the plugin
	const instance = await new LiveGain(audioContext).ready;
	instance.setState({ enabled: true });

	// Connect the audionode to the host
	connectPlugin(instance.audioNode);

	// Load the GUI if need (ie. if the option noGui was set to true)
	// And calls the method createElement of the Gui module
	const pluginDomNode = await instance.createGui();

	mountPlugin(pluginDomNode);

	player.onplay = () => {
		audioContext.resume(); // audio context must be resumed because browser restrictions
	};
})();