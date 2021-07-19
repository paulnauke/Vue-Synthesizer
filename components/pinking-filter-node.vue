<template>
    <v-card width="100%" height="100%">
        <v-card-title>Pinking Filter Node</v-card-title>
        <v-card-text class="no-drag">
            <v-slider :min="0" :max="100" v-model="lastOut"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "pinking-filter-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            pinkingFilterNode: null,
            lastOut: 1,
        }
    },
    watch: {
        gain() {
            this.updateNode();
        },
        audioDestination() {
            if (this.audioDestination) this.pinkingFilterNode.connect(this.audioDestination);
            this.updateNode();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let bufferSize = 16384;
            let b0, b1, b2, b3, b4, b5, b6;
            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
            this.pinkingFilterNode = this.audioCtx.createScriptProcessor(bufferSize, 1, 1);
            this.pinkingFilterNode.onaudioprocess = function(e) {
                let input = e.inputBuffer.getChannelData(0);
                let output = e.outputBuffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    b0 = 0.99886 * b0 + input[i] * 0.0555179;
                    b1 = 0.99332 * b1 + input[i] * 0.0750759;
                    b2 = 0.96900 * b2 + input[i] * 0.1538520;
                    b3 = 0.86650 * b3 + input[i] * 0.3104856;
                    b4 = 0.55000 * b4 + input[i] * 0.5329522;
                    b5 = -0.7616 * b5 - input[i] * 0.0168980;
                    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + input[i] * 0.5362;
                    output[i] *= 0.11; // (roughly) compensate for gain
                    b6 = input[i] * 0.115926;
                }
            }
            this.$emit('input', this.pinkingFilterNode)
        },
        updateNode() {
        }
    }
}
</script>

<style scoped>

</style>
