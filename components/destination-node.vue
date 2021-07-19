<template>
    <v-card width="100%" height="100%">
        <v-card-title>Destination Node</v-card-title>
    </v-card>
</template>

<script>
export default {
    name: "destination-node",
    props: {
        audioCtx: {},
        value: {},
        sourceNode: {},
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$emit('input', this.audioCtx.destination)
        }
    }
}
</script>

<style scoped>

</style>
