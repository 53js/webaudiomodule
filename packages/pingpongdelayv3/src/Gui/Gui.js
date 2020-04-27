// This works when youuse a bundler such as rollup
// If you do no wan to use a bundler, then  look at other examples
// that build in pure JS the syles and html template directly
// in the code...
import style from './Gui.css';
import template from './Gui.template.html';

// The GUI is a WebComponent. Not mandatory but useful.
// MANDORY : the GUI should be a DOM node. WebComponents are
// practical as they encapsulate everyhing in a shadow dom
export default class PingPongDelayHTMLElement extends HTMLElement {
	// plugin = the same that is passed in the DSP part. It's the instance
	// of the class that extends WebAudioPlugin. It's an Observable plugin
	constructor(plugin) {
		super();

		this.root = this.attachShadow({ mode: 'open' });

		// MANDATORY for the GUI to observe the plugin state
		this.plugin = plugin;
		this.plugin.on('change:params', this.updateParams);
		this.plugin.on('change:enabled', this.updateStatus);
	}

	updateStatus = (status) => {
		this.shadowRoot.querySelector('#switch1').value = status;
	}

	updateParams = (params) => {
		const {
			feedback,
			mix,
			time,
		} = params;
		this.shadowRoot.querySelector('#knob1').value = feedback * 100;
		this.shadowRoot.querySelector('#knob2').value = time * 100;
		this.shadowRoot.querySelector('#knob3').value = mix * 100;
	}

	// Provided by the WebComponent API, called when the plugin is
	// connected to the DOM
	connectedCallback() {
		this.root.innerHTML = `<style>${style}</style>${template}`;

		this.setKnobs();
		this.setSwitchListener();
		this.updateStatus(this.plugin.state.enabled);
		this.updateParams(this.plugin.state.params);
	}

	setKnobs() {
		this.shadowRoot
			.querySelector('#knob1')
			.addEventListener('input', (e) => {
				this.plugin.setParams({ feedback: e.target.value / 100 });
			});
		this.shadowRoot
			.querySelector('#knob2')
			.addEventListener('input', (e) => {
				this.plugin.setParams({ time: e.target.value / 100 });
			});
		this.shadowRoot
			.querySelector('#knob3')
			.addEventListener('input', (e) => {
				this.plugin.setParams({ mix: e.target.value / 100 });
			});
	}

	setSwitchListener() {
		this.shadowRoot
			.querySelector('#switch1')
			.addEventListener('change', () => {
				this.plugin.setState({ enabled: !this.plugin.state.enabled });
			});
	}

	// name of the custom HTML element associated
	// with the plugin. Will appear in the DOM if
	// the plugin is visible
	static is() {
		return 'wasabi-pingpongdelay';
	}
}

if (!customElements.get(PingPongDelayHTMLElement.is())) {
	customElements.define(PingPongDelayHTMLElement.is(), PingPongDelayHTMLElement);
}