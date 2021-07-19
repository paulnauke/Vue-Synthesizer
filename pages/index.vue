<template>
    <div>
        <v-dialog :value="audioCtx && audioCtx.state !== 'running'" width="500" @click:outside="init">
            <v-card @click="init">
                <v-card-title class="justify-center">
                    Click on page to create audio context
                </v-card-title>
            </v-card>
        </v-dialog>
        <div>
            <v-card class="d-flex">
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">Sources</v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="node in nodeSelectionSources" :key="node.name" @click="addNode(node)">
                            <v-list-item-title>{{ node.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">Manipulators</v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="node in nodeSelectionManipulators" :key="node.name" @click="addNode(node)">
                            <v-list-item-title>{{ node.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">Filters</v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="node in nodeSelectionFilters" :key="node.name" @click="addNode(node)">
                            <v-list-item-title>{{ node.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">Visuals</v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="node in nodeSelectionVisuals" :key="node.name" @click="addNode(node)">
                            <v-list-item-title>{{ node.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <v-btn @click="init" text>Clear</v-btn>
            </v-card>
        </div>
        <grid-layout ref="ref_nodeLayout" style="height: 100%"
                     :layout.sync="nodes"
                     :col-num="colNum"
                     :row-height="1"
                     :is-draggable="true"
                     :is-resizable="false"
                     :is-mirrored="false"
                     :vertical-compact="false"
                     :margin="[14, 14]"
                     :autoSize="false"
                     :responsive="false"
                     :useStyleCursor="false"
                     :use-css-transforms="true">
            <grid-item v-for="item in nodes"
                       style="touch-action: none"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       :key="item.i"
                       @move="moveEvent(item)"
                       @moved="moveEnded(item)"
                       drag-allow-from=".vue-draggable-handle"
                       drag-ignore-from=".no-drag">
                <div>
                    <div class="d-flex align-center">
                        <div v-if="item.hasInput" :id="'input' + item.i">
                            <v-icon :disabled="!currentSource && !item.sourceNode" @click="endDraw(item)" color="primary">mdi-circle</v-icon>
                        </div>
                        <component class="vue-draggable-handle" :is="item.component" :audioCtx="audioCtx"
                                   :sourceNode="item.sourceNode"
                                   :destinationNode="item.destinationNode"
                                   :audioDestination="item.audioDestination"
                                   v-model="item.audioNodeCtx"
                                   @input="onAudioNodeCtxChange(item)"></component>
                        <div v-if="item.hasOutput" :id="'output' + item.i">
                            <v-icon @click="beginDraw(item)">mdi-arrow-right-circle</v-icon>
                        </div>
                    </div>
                </div>
            </grid-item>
        </grid-layout>
    </div>
</template>

<script>
import {GridLayout, GridItem} from "vue-grid-layout"
import LeaderLine from 'leader-line-vue';

export default {
    components: {GridLayout, GridItem},
    data() {
        return {
            audioCtx: null,
            colNum: 32,
            currentSource: null,
            lines: [],
            nodes: [],
            nodeSelectionSources: [
                {
                    name: "Oscillator Node",
                    component: "oscillator-node",
                    width: 4,
                    height: 20,
                    hasInput: false,
                    hasOutput: true
                },
                {
                    name: "Track Node",
                    component: "track-node",
                    width: 4,
                    height: 11,
                    hasInput: false,
                    hasOutput: true
                }
            ],
            nodeSelectionFilters: [
                {
                    name: "Lowpass Filter Node",
                    component: "lowpass-filter-node",
                    width: 4,
                    height: 10,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Highpass Filter Node",
                    component: "highpass-filter-node",
                    width: 4,
                    height: 10,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Bandpass Filter Node",
                    component: "bandpass-filter-node",
                    width: 4,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Notch Filter Node",
                    component: "notch-filter-node",
                    width: 4,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Allpass Filter Node",
                    component: "allpass-filter-node",
                    width: 4,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Lowshelf Filter Node",
                    component: "lowshelf-filter-node",
                    width: 4,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Highshelf Filter Node",
                    component: "highshelf-filter-node",
                    width: 4,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Distortion Node",
                    component: "distortion-node",
                    width: 4,
                    height: 10,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Pinking Filter Node",
                    component: "pinking-filter-node",
                    width: 4,
                    height: 10,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Bitcrusher Filter Node",
                    component: "bitcrusher-filter-node",
                    width: 5,
                    height: 18,
                    hasInput: true,
                    hasOutput: true
                }
            ],
            nodeSelectionVisuals: [
                {
                    name: "Scope Node",
                    component: "scope-node",
                    width: 5,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Spectrum Node",
                    component: "spectrum-node",
                    width: 5,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                }
            ],
            nodeSelectionManipulators: [
                {
                    name: "Gain Node",
                    component: "gain-node",
                    width: 3,
                    height: 10,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Vibrato Node",
                    component: "vibrato-node",
                    width: 4,
                    height: 17,
                    hasInput: true,
                    hasOutput: true
                }
            ]
        }
    },
    mounted() {
        this.setColNum();
        window.addEventListener('resize', this.setColNum);

        this.init();
    },
    methods: {
        async init() {
            await this.createAudioContext();
            if (this.audioCtx && this.audioCtx.state === 'running')
                this.initNodeLayout();
        },
        initNodeLayout() {
            this.nodes = [
                {
                    x: this.colNum - 4,
                    y: 4,
                    w: 4,
                    h: 4,
                    i: Date.now(),
                    component: "destination-node",
                    hasInput: true,
                    hasOutput: false,
                    sourceNode: null,
                    destinationNode: null,
                    audioDestination: null,
                    audioNodeCtx: null,
                    inputLine: null,
                    outputLine: null
                }
            ]
            this.lines.forEach(line => {
                line.remove();
            })
            this.lines = [];
        },
        setColNum() {
            this.colNum = Math.round(window.innerWidth / 75);
        },
        async createAudioContext() {
            if (this.audioCtx) await this.audioCtx.close();
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        },
        addNode(node) {
            // Add a new item. It must have a unique key!
            this.nodes.push({
                x: (this.nodes.length * 2) % (this.colNum || 12),
                y: 0, // puts it at the bottom
                w: node.width,
                h: node.height,
                i: Date.now(),
                component: node.component,
                hasInput: node.hasInput,
                hasOutput: node.hasOutput,
                sourceNode: null,
                destinationNode: null,
                audioDestination: null,
                audioNodeCtx: null,
                inputLine: null,
                outputLine: null
            });
        },
        removeNode: function (val) {
            const index = this.layout.map(item => item.i).indexOf(val);
            this.layout.splice(index, 1);
        },
        beginDraw(source) {
            this.currentSource = source;
        },
        endDraw(destination) {
            if (!this.currentSource || !destination.hasInput) return;

            let line = LeaderLine.setLine(document.getElementById('output' + this.currentSource.i),
                document.getElementById('input' + destination.i)
            );
            line.color = '#FF9800';
            this.currentSource.outputLine = line;
            this.currentSource.audioDestination = destination.audioNodeCtx;
            this.currentSource.destinationNode = destination;
            destination.sourceNode = this.currentSource;
            destination.inputLine = line;
            this.lines.push(line);
        },
        onAudioNodeCtxChange(node) {
            if (node.sourceNode && node.audioNodeCtx)
                node.sourceNode.audioDestination = node.audioNodeCtx;
        },
        moveEvent(item) {
            if (item.inputLine) item.inputLine.position();
            if (item.outputLine) item.outputLine.position();
        },
        moveEnded(item) {
            const func = () => {
                this.lines.forEach(line => {
                    line.position();
                })
            }
            let interval = setInterval(func, 50);
            setTimeout(() => {
                clearInterval(interval)
            }, 2000)
        }
    }
}
</script>

<style>
.hidden-ghost {
    display: none;
}
</style>
