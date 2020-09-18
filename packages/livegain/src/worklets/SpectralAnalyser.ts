/* eslint-disable import/no-unresolved */
// import { TContext } from "standardized-audio-context";
import processorURL from "omt:./SpectralAnalyser.worklet.ts"; // eslint-disable-line import/extensions
import AudioWorkletProxyNode from "./AudioWorkletProxyNode";
import { ISpectralAnalyserNode, ISpectralAnalyserProcessor, SpectralAnalyserParameters } from "./SpectralAnalyserWorklet.types";
import AudioWorkletRegister from "./AudioWorkletRegister";

export const processorID = "__WebAudioModule_LiveGain_SpectralAnalyser";
export class SpectralAnalyserNode extends AudioWorkletProxyNode<ISpectralAnalyserNode, ISpectralAnalyserProcessor, SpectralAnalyserParameters> implements ISpectralAnalyserNode {
    static fnNames: (keyof ISpectralAnalyserProcessor)[] = ["getAllAmplitudes", "getLastAmplitudes", "getCentroid", "getEstimatedFreq", "getEstimatedFreq", "getBuffer", "destroy"];
    constructor(context: BaseAudioContext) {
        super(context, processorID, { numberOfInputs: 1, numberOfOutputs: 0 });
        const _destroy = this.destroy;
        this.destroy = async () => {
            await _destroy.call(this);
            this.port.close();
        };
    }
}
export const register = (audioWorklet: AudioWorklet) => AudioWorkletRegister.register(audioWorklet, processorID, processorURL);
export const Node = SpectralAnalyserNode;