<template>
    <v-card width="100%" height="100%">
        <v-card-title>Lowpass Filter Node</v-card-title>
        <v-card-text class="no-drag">
            <div class="subtitle--text text-right">{{frequency}} Hz</div>
            <v-slider :min="0" :max="1.0" step="0.01" v-model="threshold"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "lowpass-filter-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            lowpassFilterNode: null,
            threshold: 1,
            frequency: 24000
        }
    },
    watch: {
        threshold() {
            this.updateNode();
        },
        audioDestination() {
            if (this.audioDestination) this.lowpassFilterNode.connect(this.audioDestination);
            this.updateNode();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.lowpassFilterNode = this.audioCtx.createBiquadFilter();
            this.lowpassFilterNode.type = 'lowpass'; // Low-pass filter
            this.lowpassFilterNode.frequency.value = 440; // in HZ
            this.lowpassFilterNode.Q.value = 20;

            this.$emit('input', this.lowpassFilterNode)
        },
        updateNode() {
            let minValue = 20;
            let maxValue = this.audioCtx.sampleRate / 2;
            let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
            let multiplier = Math.pow(2, numberOfOctaves * (this.threshold - 1.0));
            this.lowpassFilterNode.frequency.value = maxValue * multiplier;
            this.frequency = Math.round(maxValue * multiplier);
        }
    }
}
</script>

<style scoped>

</style>
