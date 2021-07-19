<template>
    <v-card width="100%" height="100%">
        <v-card-title>Bitcrusher Filter Node</v-card-title>
        <v-card-text class="no-drag">
            <v-text-field label="Bits" v-model.number="bits" type="number"></v-text-field>
            <v-slider label="Bits" :min="1" :max="16" :step="1" v-model.number="bits"></v-slider>
            <v-slider label="Ramp" :min=".1" :max="1" :step="0.05" v-model.number="revIntensity"></v-slider>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "bitcrusher-filter-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            bitcrusherFilterNode: null,
            bits: 4,
            revIntensity: 0.1,
        }
    },
    watch: {
        bits() {
            this.updateNode();
        },
        revIntensity() {
            this.updateNode();
        },
        audioDestination() {
            if (this.audioDestination) this.bitcrusherFilterNode.connect(this.audioDestination);
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            //if (this.bitcrusherFilterNode) this.bitcrusherFilterNode.disconnect();
            this.bitcrusherFilterNode = this.audioCtx.createScriptProcessor(16384, 1, 1);
            this.updateNode();
            this.$emit('input', this.bitcrusherFilterNode)
            if (this.audioDestination) this.bitcrusherFilterNode.connect(this.audioDestination);
        },
        updateNode(){
            let step = Math.pow(1 / 2, this.bits);

            let phaser = 0;
            let last = 0;

            this.bitcrusherFilterNode.onaudioprocess = (e) => {
                let input = e.inputBuffer.getChannelData(0);
                let output = e.outputBuffer.getChannelData(0);
                if (this.revIntensity === 1) {
                    for (let i = 0; i < 16384; i++) {
                        output[i] = input[i];
                    }
                } else {
                    for (let i = 0; i < 16384; i++) {
                        phaser += this.revIntensity;
                        if (phaser >= 1.0) {
                            phaser -= 1.0;
                            last = step * Math.floor(input[i] / step + 0.5);
                        }
                        output[i] = last;
                    }
                }
            };
        }
    }
}
</script>

<style scoped>

</style>
