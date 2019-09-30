<template>
  <div id='container'>
    <SyncLoader :loading='loading' :color='color' :size='size' class='spinner'></SyncLoader>
    <ul class='menu'>
      <li>
        <label>Node size</label>
        <input type='range' min='1' max='100' v-model='nodeSize' />
        {{ options.nodeSize }}
      </li>
    </ul>
    <div id='sigma-container' :options='options' :pre-config='preConfig'></div>
  </div>
</template>

<script>
import SyncLoader from 'vue-spinner/src/SyncLoader.vue'
import getUuid from 'uuid-by-string'
import { mixin } from '@/mixins/index'
import { debounce, each, has, isEmpty, isUndefined } from 'lodash'
import sigmaService from '@/services/sigma.service'
import Tippy from 'tippy.js'
import sigma from 'sigma'
import Vue from 'vue'
Vue.prototype.$sigma = sigma

let s

const STATES = Object.freeze({
  expired: { state: 'expired', icon: 'baseline-donut_large-24px.svg', colour: '#fefaff' },
  failed: { state: 'failed', icon: 'outline-cancel-24px.svg', colour: '#ff3a2b' },
  queued: { state: 'queued', icon: 'baseline-donut_large-24px.svg', colour: '#fff138' },
  ready: { state: 'ready', icon: 'outline-radio_button_unchecked-24px.svg', colour: '#7093FF' },
  retrying: { state: 'retrying', icon: 'outline-refresh-24px.svg', colour: '#ff3a2b' },
  running: { state: 'running', icon: 'outline-adjust-24px.svg', colour: '#4ab7ff' },
  subfailed: { state: 'subfailed', icon: 'outline-filter_tilt_shift-24px.svg', colour: '#d453ff' },
  submitted: { state: 'submitted', icon: 'outline-adjust-24px.svg', colour: '#9ef9ff' },
  succeeded: { state: 'succeeded', icon: 'outline-radio_button_unchecked-24px.svg', colour: '#31ff53' },
  waiting: { state: 'waiting', icon: 'outline-radio_button_unchecked-24px.svg', colour: '#666' },
  default: { state: 'default', icon: 'baseline-donut_large-24px.svg', colour: '#555' }
})

const QUERIES = {
  root: `
        {
          workflows(ids: ["WORKFLOW_ID"]) {
            id
            nodesEdges {
              nodes {
                id
                label: id
                parent: firstParent {
                  id
                  state
                }
                state
              }
              edges {
                id
                source
                target
                label: id
                cond
                suicide
              }
            }
          }
        }
    `
}

let tippy

export default {
  name: 'Sigma',
  data: function () {
    return {
      // vue-spinner
      color: '#5e9aff',
      height: '35px',
      width: '4px',
      margin: '2px',
      radius: '2px',
      size: '1em',
      loading: true,
      //
      status: 'pending',
      subscriptions: {},
      workflows: [],
      workflowId: '',
      graphData: {
        nodes: [],
        edges: []
      },
      nodeSize: 30,
      canvas: false
    }
  },

  watch: {
    graphData: debounce(function (newVal) {
      this.debouncer.call()
    }, 100),

    workflows: {
      handler: function (newval, oldval) {
        this.workflowUpdated(newval)
      },
      deep: true
    }
  },

  computed: {
    options () {
      return {
        force: 3000,
        // size: { w: 1200, h: 800 },
        nodeSize: this.nodeSize,
        canvas: this.canvas
      }
    }
  },

  mixins: [mixin],

  metaInfo () {
    return {
      title: this.getPageTitle('App.sigma', { name: this.workflowId })
    }
  },

  beforeDestroy () {
    sigmaService.unregister(this)
  },

  beforeRouteLeave (to, from, next) {
    if (tippy) {
      tippy.hide()
    }
    next()
  },

  mounted () {
    console.debug('SIGMA')
    console.debug(`MOUNTED called, status: ${this.status}`)
    this.debouncer = debounce(this.updateGraph, 100)
    this.loading = false
    this.handleMounted()
    this.$store.watch((store) => {
      this.workflows = store.workflows
    })
  },

  created () {
    console.debug('CREATED')
    this.workflowId = this.$route.params.workflowid
    sigmaService.register(this)
    this.subscribe('root')
  },

  components: {
    SyncLoader
    // sigma
  },

  methods: {
    subscribe (queryName) {
      const id = sigmaService.subscribe(
        this,
        QUERIES[queryName].replace('WORKFLOW_ID', this.workflowId)
      )
      if (!(queryName in this.subscriptions)) {
        this.subscriptions[queryName] = { id }
      }
    },

    unsubscribe (queryName) {
      if (queryName in this.subscriptions) {
        sigmaService.unsubscribe(this.subscriptions[queryName].id)
      }
    },

    async preConfig (sigma) {
      try {
        console.debug('PRE-CONFIG')
        this.debouncer = debounce(this.updateGraph, 100)
      } catch (error) {
        console.error('preConfig error: ', error)
      }
    },

    async handleMounted () {
      try {
        this.status = 'success'
      } catch (error) {
        console.error('handleMounted error: ', error)
        this.status = 'error'
      }
    },

    async workflowUpdated (workflows) {
      console.debug('WORKFLOWS UPDATED')
      try {
        let elements = {
          nodes: [],
          edges: []
        }
        if (!isUndefined(workflows)) {
          each(workflows, (value, key) => {
            each(value, (workflow, key) => {
              if (has(workflow.nodesEdges, 'edges') && !isUndefined(workflow.nodesEdges.edges)) {
                elements.edges = this.getEdges(workflow.nodesEdges.edges)
              }
              if (has(workflow.nodesEdges, 'nodes') && !isUndefined(workflow.nodesEdges.nodes)) {
                elements.nodes = this.getNodes(workflow.nodesEdges.nodes)
              }
            })
          })
        }
        if (!isEmpty(elements)) {
          elements = this.getRandomGraphData() // random test
          console.debug('elements ==>>>> ', elements)
          // this.updateGraph(elements)
          this.updateGraph(elements)
        }
      } catch (error) {
        console.error('workflowUpdated error: ', error)
      }
    },

    getRandomGraphData () {
      try {
        let i
        const N = 100
        const E = 500
        const g = {
          nodes: [],
          edges: []
        }
        for (i = 0; i < N; i++) {
          g.nodes.push({
            id: `n${i}`,
            label: `Node ${i}`,
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            color: '#666'
          })
        }
        for (i = 0; i < E; i++) {
          g.edges.push({
            id: `e${i}`,
            source: `n${Math.random() * N | 0}`,
            target: `n${Math.random() * N | 0}`,
            size: Math.random(),
            color: '#ccc'
          })
        }
        return g
      } catch (error) {
        console.error('getRandomGraphData error: ', error)
      }
    },

    getNodes (nodes) {
      try {
        const nodesArray = []
        let nodeObj = {}
        let parentId = ''
        let todo = 0
        each(nodes, (node, key) => {
          nodeObj = {
            id: '',
            state: 'undefined',
            parent: '',
            label: '',
            shape: 'ellipse',
            runpercent: 0,
            todo: 0,
            _color: '#ccc',
            position: {
            },
            group: 1,
            removed: false,
            selected: false,
            selectable: true,
            locked: false,
            grabbable: true,
            classes: ''
          }
          has(node, 'id') && !isEmpty(node.id) ? nodeObj.id = getUuid(node.id) : console.warn('workflowUpdated - node id is empty')
          has(node, 'label') && !isEmpty(node.label) ? nodeObj.label = node.label : console.warn('workflowUpdated - node label is empty')
          has(node, 'label') && !isEmpty(node.label) ? nodeObj.name = node.label : console.warn('workflowUpdated - node label is empty')
          has(node, 'state') && !isEmpty(node.state) ? nodeObj.state = node.state : nodeObj.state = 'undefined'
          if (has(node, 'state') && !isEmpty(node.state)) {
            console.log('STATE >> ', node.state)
            nodeObj.state = node.state
            nodeObj._color = STATES[node.state].colour
            console.log('COLOUR >> ', nodeObj._color)
          } else {
            nodeObj.state = 'undefined'
            nodeObj._color = STATES.default.colour
          }
          if (has(node, 'runpercent') && !isEmpty(node.runpercent) && (parseInt(node.runpercent) > 0)) {
            nodeObj.runpercent = parseInt(node.runpercent)
            nodeObj.running = nodeObj.runpercent
            todo = (100 - parseInt(node.runpercent))
            nodeObj.todo = todo
          }
          if (has(node.parent, 'id') && !isEmpty(node.parent.id)) {
            parentId = getUuid(node.parent.id)
            nodeObj.parent = parentId
          }
          nodesArray.push(nodeObj)
        })
        // console.debug('NODES ::: ', nodesArray)
        return nodesArray
      } catch (error) {
        console.error('getNodes error: ', error)
      }
    },

    getEdges (edges) {
      try {
        const edgesArray = []
        let edgeObj = {}
        each(edges, (edge, key) => {
          edgeObj = {
            id: '',
            source: '',
            target: '',
            label: '',
            type: 'line',
            position: {
            },
            value: 1,
            removed: false,
            selected: false,
            selectable: true,
            locked: false,
            grabbable: true,
            classes: ''
          }
          has(edge, 'id') && !isEmpty(edge.id) ? edgeObj.id = getUuid(edge.id) : console.debug('workflowUpdated - edge id is empty')
          has(edge, 'source') && !isEmpty(edge.source) ? edgeObj.source = getUuid(edge.source) : edgeObj.source = undefined
          has(edge, 'target') && !isEmpty(edge.target) ? edgeObj.target = getUuid(edge.target) : edge.target = undefined
          has(edge, 'label') && !isEmpty(edge.label) ? edgeObj.name = edge.label : edgeObj.name = ''
          edgeObj.source !== undefined || edgeObj.target !== undefined ? edgesArray.push(edgeObj)
            : console.debug('skipping adding edge with empty source or target')
        })
        // console.debug('EDGES ::: ', edgesArray)
        return edgesArray
      } catch (error) {
        console.error('getEdges error: ', error)
      }
    },

    async updateGraph (elements) {
      try {
        console.log('UPDATE GRAPH')
        const g = {
          nodes: [],
          edges: []
        }
        if (tippy) {
          tippy.hide()
        }
        if (!isEmpty(elements)) {
          console.debug('GRAPH DATA ===> ', elements)
          this.nodes = elements.nodes
          this.edges = elements.edges
          /* eslint new-cap: [0] */
          s = new sigma({
            graph: g,
            container: 'sigma-container',
            renderer: {
              container: document.getElementById('sigma-container'),
              type: 'canvas'
            },
            settings: {
              minEdgeSize: 0.1,
              maxEdgeSize: 2,
              minNodeSize: 1,
              maxNodeSize: 8
            }
          })
          s.refresh()

        // sigma.parsers.json(graphdata, s, function() {
        // // this below adds x, y attributes as well as size = degree of the node
        //     let i, nodes = s.graph.nodes(), len = nodes.length;
        //     for (i = 0; i < len; i++) {
        //         nodes[i].x = Math.random();
        //         nodes[i].y = Math.random();
        //         nodes[i].size = s.graph.degree(nodes[i].id);
        //         nodes[i].color = nodes[i].center ? '#333' : '#666';
        //     }
          // s.refresh()
        //   s.startForceAtlas2();
        // }
        // )
        }
      } catch (error) {
        console.error('updateGraph error: ', error)
      }
    },

    getInteractivity (instance) {
      try {
        instance.on('tap', 'node', (event) => {
          const node = event.target
          console.debug('tapped ' + node.id(), node.data())
          const ref = node.popperRef()
          // using tippy ^4.0.0
          tippy = new Tippy(ref, {
            content: () => {
              const content = document.createElement('div')
              const children = node.collapsedChildren
              let runpercent = 0
              const parent = node('parent')
              if (has(node, 'runpercent')) {
                runpercent = node('runpercent')
              }
              let state = node('state')
              if (!isUndefined(children)) {
                state = 'compound node'
              }
              const parentstring =
                '<br><strong>parent <span style="color: aqua;">' +
                parent +
                '%</span></strong>'
              const progress =
                '<br><strong>progress <span style="color: aqua;">' +
                runpercent +
                '%</span></strong>'
              content.innerHTML =
                'node<br>' +
                '<strong>id <span style="color: aqua;">' +
                node.data('id') +
                '</span></strong><br>' +
                '<strong>label <span style="color: aqua;">' +
                node.data('label') +
                '</span></strong><br>' +
                '<strong>state <span style="color: aqua;">' +
                state +
                '</span></strong>'
              if (state === 'running') {
                content.innerHTML += progress
              }
              if (parent !== undefined) {
                content.innerHTML += parentstring
              }
              content.align = 'left'
              return content
            },
            trigger: 'manual',
            arrow: true,
            placement: 'left',
            hideOnClick: 'true',
            delay: [0, 2000],
            animation: 'fade',
            multiple: false,
            sticky: true,
            flip: true,
            duration: [250, 275],
            allowHTML: false,
            interactive: true
          })
          tippy.show()
        })
      } catch (error) {
        console.error('getInteractivity error: ', error)
      }
    }
  }
}

</script>

<style>
@import '~@/styles/sigma/sigma.css';
</style>
