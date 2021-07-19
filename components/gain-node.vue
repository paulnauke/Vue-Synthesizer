<template>
    <v-card width="100%" height="100%">
        <v-card-title>Gain Node</v-card-title>
        <v-card-text class="no-drag">
            <v-slider :min="0" :max="100" v-model="gain"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "gain-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            gainNode: null,
            gain: 1,
        }
    },
    watch: {
        gain() {
            this.updateNode();
        },
        audioDestination() {
            if (this.audioDestination) this.gainNode.connect(this.audioDestination);
            this.updateNode();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.gainNode = this.audioCtx.createGain();
            this.$emit('input', this.gainNode)
        },
        updateNode() {
            this.gainNode.gain.setValueAtTime(this.gain / 100, this.audioCtx.currentTime);
        }
    }
}
</script>

<style scoped>

</style>
