<template>
    <v-card width="100%" height="100%">
        <v-card-title>Spectrum Node</v-card-title>
        <v-card-text>
            <canvas :id="id"></canvas>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "scope-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        value: {},
        sourceNode: {},
        destinationNode: {},
    },
    data() {
        return {
            analyserNode: null,
            canvas: null,
            canvasCtx: null,
            bufferLength: null,
            dataArray: null,
            id: Date.now()
        }
    },
    watch: {
        audioDestination() {
            if (this.audioDestination) this.analyserNode.connect(this.audioDestination);
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.analyserNode = this.audioCtx.createAnalyser();
            this.analyserNode.fftSize = 2048;
            this.bufferLength = this.analyserNode.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);
            this.analyserNode.getByteTimeDomainData(this.dataArray);

            this.canvas = document.getElementById(this.id.toString());
            this.canvasCtx = this.canvas.getContext("2d");

            this.draw();

            this.$emit('input', this.analyserNode)
        },
        draw() {
            let width = this.canvasCtx.canvas.width;
            let height = this.canvasCtx.canvas.height;
            let freqData = new Uint8Array(this.analyserNode.frequencyBinCount);
            let scaling = height / 256;

            this.analyserNode.getByteFrequencyData(freqData);

            this.canvasCtx.fillStyle = '#131313';
            this.canvasCtx.fillRect(0, 0, width, height);

            this.canvasCtx.lineWidth = 2;
            this.canvasCtx.strokeStyle = '#FF9800';
            this.canvasCtx.beginPath();

            for (let x = 0; x < width; x++)
                this.canvasCtx.lineTo(x, height - freqData[x] * scaling);

            this.canvasCtx.stroke();

            requestAnimationFrame(this.draw);
        }
    }
}
</script>

<style scoped>

</style>
