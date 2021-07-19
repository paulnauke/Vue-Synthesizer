# Vue Synthesizer

###[Live Demo](https://paulnauke.github.io/Vue-Synthesizer/)

## Node Structure

```bash
<template>
    <v-card width="100%" height="100%">
        <v-card-title>***NAME***</v-card-title>
        <v-card-text class="no-drag">
            ***INPUT***
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['audioCtx','audioDestination','value','sourceNode','destinationNode',],
    data() {
        return {
            node: null,
            someValue: 1,
        }
    },
    watch: {
        someValue() {
            this.updateNode();
        },
        audioDestination() {
            if (this.audioDestination) this.node.connect(this.audioDestination);
            this.updateNode();
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.node = this.audioCtx.***someNode***();
            this.$emit('input', this.node)
        },
        updateNode() {
            this.node.someValue.setValueAtTime(this.someValue, this.audioCtx.currentTime);
        }
    }
}
</script>

```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
