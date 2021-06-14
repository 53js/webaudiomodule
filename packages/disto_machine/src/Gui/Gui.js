// https://github.com/g200kg/webaudio-controls/blob/master/webaudio-controls.js
import '../utils/webaudio-controls.js';

// This works when youuse a bundler such as rollup
// If you do no wan to use a bundler, then  look at other examples
// that build in pure JS the syles and html template directly
// in the code...
let style = `
@font-face {
	font-family: 'BouWeste';
	src: url('./assets/BouWeste.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;

}
:host {
	font: 'BouWeste', 'Arial Black';
	display: block;
	width: 450px;
	height: 150px;
	user-select: none;
	border-radius: 10px;
	position: relative;
	z-index: 9;
}

.webaudioctrl-tooltip {
	color: #000 !important;
	font-family: "Arial Black" !important;
	font-size: 11px !important;
}


#background-image {
	width: 450px;
	height: 150px;
	opacity: 1;

	box-shadow: 4px 5px 6px rgba(0, 0, 0, 0.7),
		inset -2px -2px 5px 0px rgba(0, 0, 0, 0.2),
		inset 3px 1px 1px 4px rgba(255, 255, 255, 0.2),
		1px 0px 1px 0px rgba(0, 0, 0, 0.9),
		0 2px 1px 0 rgba(0, 0, 0, 0.9),
		1px 1px 1px 0px rgba(0, 0, 0, 0.9);
}

.knob,
.switch,
.icon,
.label {
	position: absolute;
	cursor: pointer;
}

#switch1 {
	bottom: 20px;
	right: 20px;
}

#presence {
	left: 375px;
	top: 20px;
}

#presence div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}


#reverb {
	left: 325px;
	top: 20px;
}

#reverb div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}

#treble {
	left: 275px;
	top: 20px;
}

#treble div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}

#middle {
	left: 225px;
	top: 20px;
}

#middle div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}

#bass {
	left: 175px;
	top: 20px;
}

#bass div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}

#drive {
	left: 125px;
	top: 20px;
}

#drive div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}

#master {
	left: 75px;
	top: 20px;
}

#master div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}

#volume {
	left: 25px;
	top: 20px;
}

#volume div {
	color: #000000;
	font-family: "BouWeste";
	font-size: 9px;

}

#label_713 {
	left: 120px;
	top: 98px;
	color: #000000;
	font-family: "BouWeste";
	font-size: 23px;
}

#menuPresets {
	border-style: solid;
	border-width: 2px;
	border-color: #000000;
	background-color: rgba(236, 236, 236, 0.767);
	position: absolute;
	width: 100px;
	left: 30px;
	top: 100px;
	color: #000000;
	font-family: "Arial Black";
	font-size: 9px;
}
`;

let template = `
<img id="background-image">

	<div class="switchCont" id="switch1">
		<webaudio-switch class="switch" value="1" id="switch1" height="30" width="60"></webaudio-switch>
	</div>

	<div class="knob  " id="presence">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="9.4" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Presence</div>
	</div>
	<div class="knob  " id="reverb">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="0.7" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Reverb</div>
	</div>
	<div class="knob " id="treble">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="3.8" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Treble</div>
	</div>
	<div class="knob " id="middle">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="8" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Middle</div>
	</div>
	<div class="knob " id="bass">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="8.7" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Bass</div>
	</div>
	<div class="knob " id="drive">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="5.2" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Drive</div>
	</div>
	<div class="knob " id="master">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="5.5" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Master</div>
	</div>
	<div class="knob " id="volume">
		<webaudio-knob height="40" width="40" sprites="100" min="0" max="10" step="0.1" value="2" midilearn="1">
		</webaudio-knob>
		<div style="text-align:center">Volume</div>
	</div>
	<select id="menuPresets" style="display:none">
		<option value=0>Default</option>
		<option value=1>Jimmy HDX</option>
		<option value=2>Slasher</option>
		<option value=3>Metal</option>
		<option value=4>Hard Rock Classic 1</option>
		<option value=5 selected>Hard Rock Classic 2</option>
		<option value=6>Clean and Warm</option>
		<option value=7>Strong and Warm</option>
		<option value=8>Another Clean Sound</option>
		<option value=9>HR3</option>
	</select>
	<div class="label" id="label_713">Disto Machine</div>
`;


let backgroundImg = './assets/background.png';
let knobImg = './assets/MiniMoog_Main.png';
let switchImg = './assets/switch_1.png';

const getAssetUrl = (asset) => {
	const base = new URL('.', import.meta.url);
	return `${base}${asset}`;
};


// The GUI is a WebComponent. Not mandatory but useful.
// MANDORY : the GUI should be a DOM node. WebComponents are
// practical as they encapsulate everyhing in a shadow dom
export default class DistoMachineHTMLElement extends HTMLElement {
	// plugin = the same that is passed in the DSP part. It's the instance
	// of the class that extends WebAudioModule. It's an Observable plugin

	constructor(plug) {

		super();

		this.root = this.attachShadow({ mode: 'open' });
		this.root.innerHTML = `<style>${style}</style>${template}`;

		// MANDATORY for the GUI to observe the plugin state
		this.plugin = plugin;

		this._plug = plug;
		this._plug.gui = this;

		this.knobs = this._root.querySelectorAll(".knob");
		this.isOn;
		this.state = new Object();
		this.menu = this._root.querySelector("#menuPresets");
		this.index = this.menu.value;
		this.setKnobs();
		this.setSwitchListener();
		this.setResources();
		this.avoidDrag();

		console.log("### calling reactivate")
		this.reactivate();

		window.requestAnimationFrame(this.handleAnimationFrame);
	}

	/*
	constructor(plugin) {
		super();

		this.root = this.attachShadow({ mode: 'open' });
		this.root.innerHTML = `<style>${style}</style>${template}`;

		// MANDATORY for the GUI to observe the plugin state
		this.plugin = plugin;

		this.setResources();
		this.setKnobs();
		this.setSwitchListener();


		window.requestAnimationFrame(this.handleAnimationFrame);
	}
*/

	updateStatus = (status) => {
		this.shadowRoot.querySelector('#switch1').value = status;
	}

	handleAnimationFrame = () => {
		/*
		const {
			lowGain,
			midLowGain,
			midHighGain,
			highGain,
			enabled,
		} = this.plugin.audioNode.getParamsValues();
		this.shadowRoot.querySelector('#knob1').value = lowGain;
		this.shadowRoot.querySelector('#knob2').value = midLowGain;
		this.shadowRoot.querySelector('#knob3').value = midHighGain;
		this.shadowRoot.querySelector('#knob4').value = highGain;
		this.shadowRoot.querySelector('#switch1').value = enabled;
		window.requestAnimationFrame(this.handleAnimationFrame);
		*/
	}

	/**
	 * Change relative URLS to absolute URLs for CSS assets, webaudio controls spritesheets etc.
	 */
	setResources() {
		// Set up the background img & style
		const background = this.root.querySelector("img");
		background.src = getAssetUrl(backgroundImg);
		//background.src = bgImage;
		background.style = 'border-radius : 5px;'
		// Setting up the knobs imgs, those are loaded from the assets
		this.root.querySelectorAll(".knob").forEach((knob) => {
			knob.querySelector("webaudio-knob").setAttribute('src', getAssetUrl(knobImg));
		});
		// Setting up the switches imgs, those are loaded from the assets
		this.root.querySelector("webaudio-switch").setAttribute('src', getAssetUrl(switchImg));
	}

	get properties() {
		this.boundingRect = {
			dataWidth: {
				type: Number,
				value: 450
			},
			dataHeight: {
				type: Number,
				value: 150
			}
		};
		return this.boundingRect;

	}

	setKnobs() {
		this.shadowRoot
			.querySelector('#knob1')
			.addEventListener('input', (e) => {
				this.plugin.audioNode.setParamsValues({ lowGain: e.target.value});
			});
		this.shadowRoot
			.querySelector('#knob2')
			.addEventListener('input', (e) => {
				this.plugin.audioNode.setParamsValues({ midLowGain: e.target.value});
			});
			this.shadowRoot
			.querySelector('#knob3')
			.addEventListener('input', (e) => {
				this.plugin.audioNode.setParamsValues({ midHighGain: e.target.value });
			});
			this.shadowRoot
			.querySelector('#knob4')
			.addEventListener('input', (e) => {
				this.plugin.audioNode.setParamsValues({ highGain: e.target.value });
			});
	}

	setSwitchListener() {
		console.log("DistoMachine : set switch listener");
		const { plugin } = this;
		// by default, plugin is disabled
		plugin.audioNode.setParamsValues({ enabled: 1 });

		this.shadowRoot
			.querySelector('#switch1')
			.addEventListener('change', function onChange() {
				plugin.audioNode.setParamsValues({ enabled: +!!this.checked });
			});
	}

	// name of the custom HTML element associated
	// with the plugin. Will appear in the DOM if
	// the plugin is visible
	static is() {
        return 'wasabi-distomachine-without-builder';
    }
}

if (!customElements.get(DistoMachineHTMLElement.is())) {
	customElements.define(DistoMachineHTMLElement.is(), DistoMachineHTMLElement);
}
