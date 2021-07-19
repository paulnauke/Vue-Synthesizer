<template>
    <v-card width="100%" height="100%">
        <v-card-title>Oscillator Node</v-card-title>
        <v-card-text>
            <v-select label="Type" :items="types" v-model="type"></v-select>
            <v-text-field label="Frequency" v-model.number="frequency" type="number"></v-text-field>
            <v-switch v-model="on"></v-switch>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "oscillator-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        destinationNode: {},
    },
    data() {
        return {
            types: ['sine', 'square', 'sawtooth', 'triangle'],
            type: 'sine',
            oscillator: null,
            frequency: 50,
            on: true,
        }
    },
    watch: {
        frequency() {
            this.updateNode();
        },
        type() {
            this.updateNode();
        },
        audioDestination(){
            if (this.audioDestination) this.oscillator.connect(this.audioDestination);
        },
        on(v) {
            if (v) {
               if (this.audioDestination) this.oscillator.connect(this.audioDestination);

            } else if (this.audioDestination) this.oscillator.disconnect(this.audioDestination);
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.oscillator = this.audioCtx.createOscillator();
            this.$emit('input', this.oscillator);
            this.updateNode();
            this.oscillator.start();
        },
        updateNode() {
            this.oscillator.type = this.type;
            this.oscillator.frequency.setValueAtTime(this.frequency, this.audioCtx.currentTime);
        }
    }
}
</script>

<style scoped>

</style>
