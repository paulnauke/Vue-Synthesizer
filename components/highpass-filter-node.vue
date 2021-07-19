<template>
    <v-card width="100%" height="100%">
        <v-card-title>Highpass Filter Node</v-card-title>
        <v-card-text class="no-drag">
            <div class="subtitle--text text-right">{{frequency}} Hz</div>
            <v-slider :min="0" :max="1.0" step="0.01" v-model="threshold"></v-slider>
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
            frequency: 20
        }
    },
    watch: {
        threshold() {
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
            this.filterNode.type = 'highpass';
            this.filterNode.frequency.value = 20; // in HZ

            this.$emit('input', this.filterNode)
        },
        updateNode() {
            let minValue = 20;
            let maxValue = this.audioCtx.sampleRate / 2;
            let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
            let multiplier = Math.pow(2, numberOfOctaves * (this.threshold - 1.0));
            this.filterNode.frequency.value = maxValue * multiplier;
            this.frequency = Math.round(maxValue * multiplier);
        }
    }
}
</script>

<style scoped>

</style>
