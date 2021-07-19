<template>
    <v-card width="100%" height="100%">
        <v-card-title>Distortion  Node</v-card-title>
        <v-card-text class="no-drag">
            <v-slider :min="0" :max="200" thumb-label v-model.number="amount"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "distortion-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            distortionNode: null,
            amount: 400
        }
    },
    watch: {
        audioDestination() {
            if (this.audioDestination) this.distortionNode.connect(this.audioDestination);
            this.updateNode();
        },
        amount(){
            this.updateNode();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.distortionNode = this.audioCtx.createWaveShaper();
            this.$emit('input', this.distortionNode);
            this.updateNode();

        },
        updateNode() {
            this.distortionNode.curve = this.makeDistortionCurve(this.amount);
            this.distortionNode.oversample = '4x';
        },
        // makeDistortionCurve(amount) {
        //     let k = typeof amount === 'number' ? amount : 50,
        //         n_samples = 44100,
        //         curve = new Float32Array(n_samples),
        //         deg = Math.PI / 180,
        //         i = 0,
        //         x;
        //     for ( ; i < n_samples; ++i ) {
        //         x = i * 2 / n_samples - 1;
        //         curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        //     }
        //     return curve;
        // },
        makeDistortionCurve(amount) {
            let n_samples = 256, curve = new Float32Array(n_samples);
            for (let i = 0 ; i < n_samples; ++i ) {
                let x = i * 2 / n_samples - 1;
                curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
            }
            return curve;
        }
    }
}
</script>

<style scoped>

</style>
