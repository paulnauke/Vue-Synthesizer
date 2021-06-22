<template>
    <v-card max-width="300">
        <v-card-title>Destination Node</v-card-title>
    </v-card>
</template>

<script>
export default {
    name: "destination-node",
    props: {
        audioCtx: {},
        input: {},
        value: {}
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
