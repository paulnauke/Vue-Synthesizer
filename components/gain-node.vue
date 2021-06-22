<template>
    <v-card max-width="300">
        <v-card-title>Gain Node</v-card-title>
        <v-card-text>

        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "gain-node",
    props: {
        value: {},
        audioCtx: {}
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
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.gainNode = this.audioCtx.createGain();
            this.gainNode.connect(this.audioCtx.destination);
            this.updateNode();
        },
        updateNode() {
            this.gainNode.gain.setValueAtTime(this.gain, this.audioCtx.currentTime);
        }
    }
}
</script>

<style scoped>

</style>
