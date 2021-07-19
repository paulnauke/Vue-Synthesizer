<template>
    <v-card width="100%" height="100%">
        <v-card-title>Track Node</v-card-title>
        <v-card-text class="no-drag">
            <v-file-input v-model="audioFile" accept="audio/*"></v-file-input>
            <div class="d-flex">
                <v-btn v-if="!play" @click="play = true" :disabled="!audio">Play</v-btn>
                <v-btn v-if="play" @click="play = false" :disabled="!audio">Pause</v-btn>
                <v-btn class="ml-2" @click="audio.currentTime = 0" :disabled="!audio">Restart</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "track-node",
    props: {
        audioCtx: {},
        audioDestination: {},
        destinationNode: {},
    },
    data() {
        return {
            trackNode: null,
            audioFile: null,
            audioUrl: '',
            audio: null,
            play: false,
        }
    },
    watch: {
        audioDestination() {
            this.resetConnection();
        },
        play(val) {
            if (val) this.audio.play();
            else this.audio.pause();
        },
        audioFile(file) {
            if (file) {
                this.audioUrl = URL.createObjectURL(file);
                this.init();
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.audioUrl) {
                if (this.audio) {
                    this.audio.pause();
                    this.play = false;
                }
                this.audio = new Audio(this.audioUrl);
                this.trackNode = this.audioCtx.createMediaElementSource(this.audio);

                this.resetConnection();
                this.$emit('input', this.trackNode);
            }
        },
        resetConnection() {
            if (this.trackNode) {
                this.trackNode.disconnect();
                if (this.audioDestination) this.trackNode.connect(this.audioDestination)
            }
        }
    }
}
</script>

<style scoped>

</style>
