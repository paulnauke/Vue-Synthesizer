<template>
    <v-card width="100%" height="100%">
        <v-card-title>Scope Node</v-card-title>
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
            let timeData = new Uint8Array(this.analyserNode.frequencyBinCount);
            let scaling = height / 256;
            let risingEdge = 0;
            let edgeThreshold = 5;

            this.analyserNode.getByteTimeDomainData(timeData);

            this.canvasCtx.fillStyle = '#131313';
            this.canvasCtx.fillRect(0, 0, width, height);

            this.canvasCtx.lineWidth = 2;
            this.canvasCtx.strokeStyle = '#FF9800';
            this.canvasCtx.beginPath();

            // No buffer overrun protection
            while (timeData[risingEdge++] - 128 > 0 && risingEdge <= width);
            if (risingEdge >= width) risingEdge = 0;

            while (timeData[risingEdge++] - 128 < edgeThreshold && risingEdge <= width);
            if (risingEdge >= width) risingEdge = 0;

            for (let x = risingEdge; x < timeData.length && x - risingEdge < width; x++)
                this.canvasCtx.lineTo(x - risingEdge, height - timeData[x] * scaling);

            this.canvasCtx.stroke();

            requestAnimationFrame(this.draw);
        }
    }
}
</script>

<style scoped>

</style>
