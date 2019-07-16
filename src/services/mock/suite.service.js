import store from '@/store/'
import Family from '@/model/Family.model'
import VueAdsTableTreeTransformer from '@/transformers/vueadstabletree.transformer'

export class SuiteService {
  constructor (currentTaskIndex = 0) {
    this.currentTaskIndex = currentTaskIndex
    this.transformer = new VueAdsTableTreeTransformer()
  }

  getSuites () {
    return store.dispatch('suites/setSuites', SuiteService.MOCKED_SUITES)
  }

  // suppressing because it is not used in the mock
  // eslint-disable-next-line no-unused-vars
  getSuiteTasks (suiteId) {
    const mockedFamilyProxies = SuiteService.MOCKED_SUITE_TASKS[this.currentTaskIndex].data.familyProxies
    const familyProxies = mockedFamilyProxies.map((mockedFamilyProxy) => {
      return new Family(mockedFamilyProxy.name, mockedFamilyProxy.cyclePoint, mockedFamilyProxy.state, mockedFamilyProxy.depth, mockedFamilyProxy.childTasks, mockedFamilyProxy.childFamilies)
    })
    return store.dispatch('suites/setTasks', familyProxies)
  }

  // suppressing because it is not used in the mock
  // eslint-disable-next-line no-unused-vars
  fetchSuiteTree (suiteId) {
    const mockedFamilyProxies = SuiteService.MOCKED_SUITE_TASKS[this.currentTaskIndex % SuiteService.MOCKED_SUITE_TASKS.length].data.familyProxies
    const familyProxies = this.transformer.transform(mockedFamilyProxies)
    return store.dispatch('suites/setTree', familyProxies)
  }

  // Mocked data, recorded with vcrpy

  // https://github.com/kinow/cylc-cassettes/tree/master/cassettes/five/suite.yaml
  static MOCKED_SUITES = [
    {
      id: 'kinow/five',
      name: 'five',
      host: 'kinow-VirtualBox',
      owner: 'kinow',
      port: 43027
    }
  ]

  // https://github.com/kinow/cylc-cassettes/tree/master/cassettes/kinow/five/tasks-?.yaml
  static MOCKED_SUITE_TASKS = [
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'held',
            stateTotals: {
              runahead: 0,
              waiting: 0,
              held: 3,
              queued: 0,
              expired: 0,
              ready: 0,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 0,
              failed: 0,
              succeeded: 0
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'held',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130808T0000Z/prep',
                task: {
                  name: 'prep'
                },
                state: 'held',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              },
              {
                id: 'kinow/five/20130808T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'held',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              },
              {
                id: 'kinow/five/20130808T0000Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'held',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    },
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'held',
            stateTotals: {
              runahead: 0,
              waiting: 0,
              held: 3,
              queued: 0,
              expired: 0,
              ready: 0,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 0,
              failed: 0,
              succeeded: 0
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'held',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130808T0000Z/prep',
                task: {
                  name: 'prep'
                },
                state: 'held',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              },
              {
                id: 'kinow/five/20130808T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'held',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              },
              {
                id: 'kinow/five/20130808T0000Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'held',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    },
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'running to stop at 20130812T0000Z',
            stateTotals: {
              runahead: 0,
              waiting: 2,
              held: 0,
              queued: 0,
              expired: 0,
              ready: 0,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 0,
              failed: 0,
              succeeded: 1
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'waiting',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130808T0000Z/prep',
                task: {
                  name: 'prep'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130808T0000Z/prep/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15152',
                    submittedTime: '2019-06-05T04:04:33Z',
                    startedTime: '2019-06-05T04:04:33Z',
                    finishedTime: '2019-06-05T04:04:33Z',
                    submitNum: 1
                  }
                ]
              },
              {
                id: 'kinow/five/20130808T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              },
              {
                id: 'kinow/five/20130808T0000Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    },
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'running to stop at 20130812T0000Z',
            stateTotals: {
              runahead: 0,
              waiting: 2,
              held: 0,
              queued: 0,
              expired: 0,
              ready: 0,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 2,
              failed: 0,
              succeeded: 2
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'running',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130808T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130808T0000Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15191',
                    submittedTime: '2019-06-05T04:04:36Z',
                    startedTime: '2019-06-05T04:04:36Z',
                    finishedTime: '2019-06-05T04:04:36Z',
                    submitNum: 1
                  }
                ]
              },
              {
                id: 'kinow/five/20130808T0000Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'running',
                latestMessage: 'started',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130808T0000Z/bar/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15231',
                    submittedTime: '2019-06-05T04:04:39Z',
                    startedTime: '2019-06-05T04:04:39Z',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130808T1200Z',
            state: 'running',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130808T1200Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              },
              {
                id: 'kinow/five/20130808T1200Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'running',
                latestMessage: 'started',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130808T1200Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15232',
                    submittedTime: '2019-06-05T04:04:39Z',
                    startedTime: '2019-06-05T04:04:39Z',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T0000Z',
            state: 'waiting',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130809T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    },
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'running to stop at 20130812T0000Z',
            stateTotals: {
              runahead: 0,
              waiting: 0,
              held: 0,
              queued: 0,
              expired: 0,
              ready: 2,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 0,
              failed: 0,
              succeeded: 6
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130808T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T0000Z',
            state: 'ready',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130809T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130809T0000Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15304',
                    submittedTime: '2019-06-05T04:04:42Z',
                    startedTime: '2019-06-05T04:04:42Z',
                    finishedTime: '2019-06-05T04:04:42Z',
                    submitNum: 1
                  }
                ]
              },
              {
                id: 'kinow/five/20130809T0000Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'ready',
                latestMessage: '',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130809T0000Z/bar/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '',
                    submittedTime: '',
                    startedTime: '',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T1200Z',
            state: 'ready',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130809T1200Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'ready',
                latestMessage: '',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130809T1200Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '',
                    submittedTime: '',
                    startedTime: '',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    },
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'running to stop at 20130812T0000Z',
            stateTotals: {
              runahead: 0,
              waiting: 2,
              held: 0,
              queued: 0,
              expired: 0,
              ready: 0,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 0,
              failed: 0,
              succeeded: 10
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130808T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130809T1200Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130809T1200Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15376',
                    submittedTime: '2019-06-05T04:04:45Z',
                    startedTime: '2019-06-05T04:04:45Z',
                    finishedTime: '2019-06-05T04:04:45Z',
                    submitNum: 1
                  }
                ]
              },
              {
                id: 'kinow/five/20130809T1200Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130809T1200Z/bar/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15449',
                    submittedTime: '2019-06-05T04:04:48Z',
                    startedTime: '2019-06-05T04:04:48Z',
                    finishedTime: '2019-06-05T04:04:48Z',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130810T0000Z',
            state: 'waiting',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130810T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130810T0000Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15450',
                    submittedTime: '2019-06-05T04:04:48Z',
                    startedTime: '2019-06-05T04:04:48Z',
                    finishedTime: '2019-06-05T04:04:48Z',
                    submitNum: 1
                  }
                ]
              },
              {
                id: 'kinow/five/20130810T0000Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130810T1200Z',
            state: 'waiting',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130810T1200Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    },
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'running to stop at 20130812T0000Z',
            stateTotals: {
              runahead: 0,
              waiting: 2,
              held: 0,
              queued: 0,
              expired: 0,
              ready: 0,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 2,
              failed: 0,
              succeeded: 12
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130808T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130810T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130810T1200Z',
            state: 'running',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130810T1200Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130810T1200Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15523',
                    submittedTime: '2019-06-05T04:04:51Z',
                    startedTime: '2019-06-05T04:04:51Z',
                    finishedTime: '2019-06-05T04:04:51Z',
                    submitNum: 1
                  }
                ]
              },
              {
                id: 'kinow/five/20130810T1200Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'running',
                latestMessage: 'started',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130810T1200Z/bar/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15594',
                    submittedTime: '2019-06-05T04:04:54Z',
                    startedTime: '2019-06-05T04:04:54Z',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130811T0000Z',
            state: 'running',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130811T0000Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              },
              {
                id: 'kinow/five/20130811T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'running',
                latestMessage: 'started',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130811T0000Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15595',
                    submittedTime: '2019-06-05T04:04:54Z',
                    startedTime: '2019-06-05T04:04:54Z',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130811T1200Z',
            state: 'waiting',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130811T1200Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'waiting',
                latestMessage: '',
                depth: 1,
                jobs: [

                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    },
    {
      data: {
        workflows: [
          {
            id: 'kinow/five',
            name: 'five',
            status: 'running to stop at 20130812T0000Z',
            stateTotals: {
              runahead: 0,
              waiting: 0,
              held: 0,
              queued: 0,
              expired: 0,
              ready: 2,
              submitFailed: 0,
              submitRetrying: 0,
              submitted: 0,
              retrying: 0,
              running: 0,
              failed: 0,
              succeeded: 16
            },
            treeDepth: 1
          }
        ],
        familyProxies: [
          {
            name: 'root',
            cyclePoint: '20130808T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130808T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130809T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130810T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130810T1200Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130811T0000Z',
            state: 'succeeded',
            depth: 0,
            childTasks: [

            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130811T1200Z',
            state: 'ready',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130811T1200Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'succeeded',
                latestMessage: 'succeeded',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130811T1200Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '15667',
                    submittedTime: '2019-06-05T04:04:57Z',
                    startedTime: '2019-06-05T04:04:57Z',
                    finishedTime: '2019-06-05T04:04:57Z',
                    submitNum: 1
                  }
                ]
              },
              {
                id: 'kinow/five/20130811T1200Z/bar',
                task: {
                  name: 'bar'
                },
                state: 'ready',
                latestMessage: '',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130811T1200Z/bar/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '',
                    submittedTime: '',
                    startedTime: '',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          },
          {
            name: 'root',
            cyclePoint: '20130812T0000Z',
            state: 'ready',
            depth: 0,
            childTasks: [
              {
                id: 'kinow/five/20130812T0000Z/foo',
                task: {
                  name: 'foo'
                },
                state: 'ready',
                latestMessage: '',
                depth: 1,
                jobs: [
                  {
                    id: 'kinow/five/20130812T0000Z/foo/01',
                    host: 'localhost',
                    batchSysName: 'background',
                    batchSysJobId: '',
                    submittedTime: '',
                    startedTime: '',
                    finishedTime: '',
                    submitNum: 1
                  }
                ]
              }
            ],
            childFamilies: [

            ]
          }
        ]
      }
    }
  ]
}
