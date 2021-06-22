<template>
    <div>
        <div>
            <v-card>
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">+ Add</v-btn>
                    </template>
                    <v-list>
                        <v-list-item v-for="node in nodeSelection" :key="node.name" @click="addNode(node)">
                            <v-list-item-title>{{ node.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-card>
        </div>
        <grid-layout ref="ref_nodeLayout" style="height: 100%"
                     :layout.sync="nodes"
                     :col-num="32"
                     :row-height="16"
                     :is-draggable="true"
                     :is-resizable="false"
                     :is-mirrored="false"
                     :vertical-compact="false"
                     :margin="[14, 14]"
                     :autoSize="false"
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
                            <v-icon @click="endDraw(item)">mdi-circle</v-icon>
                        </div>
                        <component class="vue-draggable-handle" :is="item.component" :audioCtx="audioCtx"
                                   :audioDestination="item.audioDestination" v-model="item.audioNodeCtx"></component>
                        <div v-if="item.hasOutput" :id="'output' + item.i">
                            <v-icon @click="beginDraw(item)">mdi-circle</v-icon>
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
            nodes: [],
            nodeSelection: [
                {
                    name: "Oscillator Node",
                    component: "oscillator-node",
                    width: 5,
                    height: 10,
                    hasInput: false,
                    hasOutput: true
                },
                {
                    name: "Gain Node",
                    component: "gain-node",
                    width: 5,
                    height: 3,
                    hasInput: true,
                    hasOutput: true
                },
                {
                    name: "Destination Node",
                    component: "destination-node",
                    width: 5,
                    height: 3,
                    hasInput: true,
                    hasOutput: false
                },
            ],
            colNum: 32,
            currentSource: null,
            lines: [],
        }
    },
    mounted() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    },
    methods: {
        addNode(node) {
            // Add a new item. It must have a unique key!
            this.nodes.push({
                x: (this.nodes.length * 2) % (this.colNum || 12),
                y: this.nodes.length + (this.colNum || 12), // puts it at the bottom
                w: node.width,
                h: node.height,
                i: Date.now(),
                component: node.component,
                hasInput: node.hasInput,
                hasOutput: node.hasOutput,
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
            let line = LeaderLine.setLine(document.getElementById('output' + this.currentSource.i),
                document.getElementById('input' + destination.i)
            );
            this.currentSource.outputLine = line;
            this.currentSource.audioDestination = destination.audioNodeCtx;
            destination.inputLine = line;
        },
        moveEvent(item) {
            if (item.inputLine) item.inputLine.position();
            if (item.outputLine) item.outputLine.position();
        },
        moveEnded(item){
            const func = () => {
                this.moveEvent(item)
            }
            let interval = setInterval(func, 50);
            setTimeout(()=>{clearInterval(interval)},1100)
        }
    }
}
</script>
