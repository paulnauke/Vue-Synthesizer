<template>
    <v-card width="100%" height="100%">
        <v-card-title>Bandpass Filter Node</v-card-title>
        <v-card-text class="no-drag">
            <div class="subtitle--text text-right">Center: {{ frequency }} Hz</div>
            <v-slider :min="0" :max="1.0" step="0.01" v-model="threshold">
            </v-slider>
            <div class="subtitle--text text-right">Q: {{ bandwidthCalc }}</div>
            <v-slider :min="0" :max="5.62" step="0.01" v-model="bandwidth"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "highpass-filter-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            filterNode: null,
            threshold: 0,
            frequency: 20,
            bandwidth: 1,
            bandwidthCalc: 1,
        }
    },
    watch: {
        threshold() {
            this.updateNode();
        },
        bandwidth() {
            this.updateNode();
        },
        audioDestination() {
            if (this.audioDestination) this.filterNode.connect(this.audioDestination);
            this.updateNode();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.filterNode = this.audioCtx.createBiquadFilter();
            this.filterNode.type = 'bandpass';
            this.filterNode.frequency.value = 20; // in HZ

            this.$emit('input', this.filterNode)
        },
        updateNode() {
            let minValue = 20;
            let maxValue = this.audioCtx.sampleRate / 2;
            let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
            let multiplier = Math.pow(2, numberOfOctaves * (this.threshold - 1.0));
            let val = maxValue * multiplier
            this.filterNode.frequency.value = val > 24000 ? 2400 : val;

            this.bandwidthCalc = Math.round(Math.min(Math.pow(this.bandwidth, 4), 1000) * 100) / 100;
            this.filterNode.Q.value = this.bandwidthCalc;

            this.frequency = Math.round(maxValue * multiplier);
        }
    }
}
</script>

<style scoped>

</style>
