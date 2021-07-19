<template>
    <v-card width="100%" height="100%">
        <v-card-title>Vibrato Node</v-card-title>
        <v-card-text class="no-drag">
            <div class="subtitle--text">Amount</div>
            <v-slider :min="0" :max="100" thumb-label v-model="amount"></v-slider>
            <div class="subtitle--text">Speed</div>
            <v-slider :min="0" :max="50" thumb-label v-model="speed"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "vibrato-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            vibratoNode: null,
            gainOsc: null,
            amount: 1,
            speed: 10
        }
    },
    watch: {
        amount() {
            this.updateNode();
        },
        speed() {
            this.updateNode();
        },
        audioDestination() {
            if (this.audioDestination) {
                this.$emit('input', this.audioDestination);
            }
            this.updateNode();
        },
        sourceNode(node) {
            const getOsc = (_node) => {
                if(_node.component === 'oscillator-node'){
                    return _node.audioNodeCtx
                }else if(_node.sourceNode){
                    return getOsc(_node.sourceNode);
                }else{
                    return false;
                }
            }
            const oscNode = getOsc(node);
            if (oscNode) this.vibratoNode.connect(oscNode.frequency);
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {

            this.vibratoNode = this.audioCtx.createGain();
            this.vibratoNode.gain.setValueAtTime(this.amount, 0);

            this.gainOsc = this.audioCtx.createOscillator();
            this.gainOsc.frequency.setValueAtTime(this.speed, 0);
            this.gainOsc.start(0);
            this.gainOsc.connect(this.vibratoNode);
        },
        updateNode() {
            this.vibratoNode.gain.setValueAtTime(this.amount, 0);
            this.gainOsc.frequency.setValueAtTime(this.speed, 0);
        }
    }
}
</script>

<style scoped>

</style>
