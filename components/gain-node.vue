<template>
    <v-card max-width="300">
        <v-card-title>Gain Node</v-card-title>
        <v-card-text>
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
        value: {}
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
            this.init();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.gainNode = this.audioCtx.createGain();
            if (this.audioDestination) this.gainNode.connect(this.audioDestination);
            this.updateNode();
        },
        updateNode() {
            this.gainNode.gain.setValueAtTime(this.gain / 100, this.audioCtx.currentTime);
            this.$emit('input', this.gainNode)
        }
    }
}
</script>

<style scoped>

</style>
