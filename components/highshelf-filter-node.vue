<template>
    <v-card width="100%" height="100%">
        <v-card-title>Highshelf Filter Node</v-card-title>
        <v-card-text class="no-drag">
            <div class="subtitle--text text-right">Center: {{ frequency }} Hz</div>
            <v-slider :min="0" :max="1.0" step="0.01" v-model="threshold">
            </v-slider>
            <div class="subtitle--text text-right">Boost: {{ boost }} dB</div>
            <v-slider :min="-24" :max="24" step="0.1" v-model="boost"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "highshelf-filter-node",
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
            boost: 0,
        }
    },
    watch: {
        threshold() {
            this.updateNode();
        },
        boost() {
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
            this.filterNode.type = 'highshelf';
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

            this.filterNode.gain.value = this.boost;

            this.frequency = Math.round(maxValue * multiplier);
        }
    }
}
</script>

<style scoped>

</style>
