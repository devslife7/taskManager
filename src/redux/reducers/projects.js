// Helper function to get Unix timestamp for dates
const getUnixTimestamp = (daysOffset) => {
  const date = new Date()
  date.setDate(date.getDate() + daysOffset)
  return Math.floor(date.getTime() / 1000)
}

const initialState = {
  allProjects: [
    {
      id: 1,
      name: 'Website Redesign',
      end_date: getUnixTimestamp(30),
      progress: 65,
      milestones: [
        {
          id: 1,
          name: 'UI/UX Design',
          progress: 100,
          hours: 40,
          start_date: getUnixTimestamp(-30),
          end_date: getUnixTimestamp(-10),
          tasks: [
            {
              id: 1,
              name: 'Wireframes',
              progress: 100,
              hours: 15,
              start_date: getUnixTimestamp(-30),
              end_date: getUnixTimestamp(-20),
              notes: 'Complete wireframes for all pages',
              entries: [
                {
                  id: 1,
                  progress: 50,
                  date: getUnixTimestamp(-28),
                  notes: 'Initial wireframes for homepage',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 2,
                  progress: 100,
                  date: getUnixTimestamp(-22),
                  notes: 'Completed all wireframes',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 2,
              name: 'Visual Design',
              progress: 100,
              hours: 25,
              start_date: getUnixTimestamp(-20),
              end_date: getUnixTimestamp(-10),
              notes: 'High-fidelity mockups',
              entries: [
                {
                  id: 3,
                  progress: 40,
                  date: getUnixTimestamp(-18),
                  notes: 'Color palette and typography',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 4,
                  progress: 80,
                  date: getUnixTimestamp(-14),
                  notes: 'Homepage and product pages',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 5,
                  progress: 100,
                  date: getUnixTimestamp(-11),
                  notes: 'All mockups finalized',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Frontend Development',
          progress: 70,
          hours: 80,
          start_date: getUnixTimestamp(-10),
          end_date: getUnixTimestamp(15),
          tasks: [
            {
              id: 3,
              name: 'Component Library',
              progress: 90,
              hours: 30,
              start_date: getUnixTimestamp(-10),
              end_date: getUnixTimestamp(5),
              notes: 'Reusable React components',
              entries: [
                {
                  id: 6,
                  progress: 50,
                  date: getUnixTimestamp(-8),
                  notes: 'Built Button, Input, Card components',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 7,
                  progress: 90,
                  date: getUnixTimestamp(-3),
                  notes: 'Added Modal, Dropdown, Table components',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 4,
              name: 'Page Implementation',
              progress: 60,
              hours: 50,
              start_date: getUnixTimestamp(-5),
              end_date: getUnixTimestamp(15),
              notes: 'Implement all pages with components',
              entries: [
                {
                  id: 8,
                  progress: 35,
                  date: getUnixTimestamp(-4),
                  notes: 'Homepage and navigation',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 9,
                  progress: 60,
                  date: getUnixTimestamp(-1),
                  notes: 'Product pages and cart',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            }
          ]
        },
        {
          id: 3,
          name: 'Testing & Launch',
          progress: 20,
          hours: 40,
          start_date: getUnixTimestamp(10),
          end_date: getUnixTimestamp(30),
          tasks: [
            {
              id: 5,
              name: 'QA Testing',
              progress: 20,
              hours: 20,
              start_date: getUnixTimestamp(10),
              end_date: getUnixTimestamp(20),
              notes: 'Cross-browser and device testing',
              entries: [
                {
                  id: 10,
                  progress: 20,
                  date: getUnixTimestamp(12),
                  notes: 'Initial testing on Chrome and Safari',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 6,
              name: 'Deployment',
              progress: 0,
              hours: 20,
              start_date: getUnixTimestamp(20),
              end_date: getUnixTimestamp(30),
              notes: 'Deploy to production',
              entries: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      end_date: getUnixTimestamp(60),
      progress: 45,
      milestones: [
        {
          id: 4,
          name: 'Backend API',
          progress: 80,
          hours: 60,
          start_date: getUnixTimestamp(-20),
          end_date: getUnixTimestamp(10),
          tasks: [
            {
              id: 7,
              name: 'Authentication Service',
              progress: 100,
              hours: 20,
              start_date: getUnixTimestamp(-20),
              end_date: getUnixTimestamp(-10),
              notes: 'JWT-based authentication',
              entries: [
                {
                  id: 11,
                  progress: 100,
                  date: getUnixTimestamp(-15),
                  notes: 'Implemented JWT auth with refresh tokens',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 8,
              name: 'User Management',
              progress: 80,
              hours: 40,
              start_date: getUnixTimestamp(-15),
              end_date: getUnixTimestamp(10),
              notes: 'User CRUD operations',
              entries: [
                {
                  id: 12,
                  progress: 60,
                  date: getUnixTimestamp(-10),
                  notes: 'Basic CRUD endpoints',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 13,
                  progress: 80,
                  date: getUnixTimestamp(-5),
                  notes: 'Added profile image upload',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            }
          ]
        },
        {
          id: 5,
          name: 'Mobile UI',
          progress: 30,
          hours: 70,
          start_date: getUnixTimestamp(-5),
          end_date: getUnixTimestamp(40),
          tasks: [
            {
              id: 9,
              name: 'Screens Design',
              progress: 60,
              hours: 30,
              start_date: getUnixTimestamp(-5),
              end_date: getUnixTimestamp(15),
              notes: 'Design all app screens',
              entries: [
                {
                  id: 14,
                  progress: 40,
                  date: getUnixTimestamp(-3),
                  notes: 'Login, signup, home screens',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 15,
                  progress: 60,
                  date: getUnixTimestamp(-1),
                  notes: 'Profile and settings screens',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 10,
              name: 'Implementation',
              progress: 15,
              hours: 40,
              start_date: getUnixTimestamp(5),
              end_date: getUnixTimestamp(40),
              notes: 'React Native implementation',
              entries: [
                {
                  id: 16,
                  progress: 15,
                  date: getUnixTimestamp(7),
                  notes: 'Started login and signup screens',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Marketing Campaign',
      end_date: getUnixTimestamp(-5),
      progress: 100,
      milestones: [
        {
          id: 6,
          name: 'Content Creation',
          progress: 100,
          hours: 50,
          start_date: getUnixTimestamp(-60),
          end_date: getUnixTimestamp(-30),
          tasks: [
            {
              id: 11,
              name: 'Blog Posts',
              progress: 100,
              hours: 30,
              start_date: getUnixTimestamp(-60),
              end_date: getUnixTimestamp(-35),
              notes: 'Write 10 blog posts',
              entries: [
                {
                  id: 17,
                  progress: 100,
                  date: getUnixTimestamp(-40),
                  notes: 'All blog posts completed and scheduled',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 12,
              name: 'Social Media Content',
              progress: 100,
              hours: 20,
              start_date: getUnixTimestamp(-50),
              end_date: getUnixTimestamp(-30),
              notes: 'Create social media posts',
              entries: [
                {
                  id: 18,
                  progress: 100,
                  date: getUnixTimestamp(-35),
                  notes: 'Created 30 days of content',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            }
          ]
        },
        {
          id: 7,
          name: 'Campaign Launch',
          progress: 100,
          hours: 30,
          start_date: getUnixTimestamp(-30),
          end_date: getUnixTimestamp(-5),
          tasks: [
            {
              id: 13,
              name: 'Email Campaign',
              progress: 100,
              hours: 15,
              start_date: getUnixTimestamp(-30),
              end_date: getUnixTimestamp(-10),
              notes: 'Send to 10,000 subscribers',
              entries: [
                {
                  id: 19,
                  progress: 100,
                  date: getUnixTimestamp(-15),
                  notes: 'Campaign sent successfully',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 14,
              name: 'Social Media Ads',
              progress: 100,
              hours: 15,
              start_date: getUnixTimestamp(-20),
              end_date: getUnixTimestamp(-5),
              notes: 'Run ads on Facebook and Instagram',
              entries: [
                {
                  id: 20,
                  progress: 100,
                  date: getUnixTimestamp(-7),
                  notes: 'Ads performing well, reached 50K people',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Data Migration Project',
      end_date: getUnixTimestamp(90),
      progress: 15,
      milestones: [
        {
          id: 8,
          name: 'Planning & Analysis',
          progress: 50,
          hours: 40,
          start_date: getUnixTimestamp(-10),
          end_date: getUnixTimestamp(20),
          tasks: [
            {
              id: 15,
              name: 'Data Audit',
              progress: 80,
              hours: 20,
              start_date: getUnixTimestamp(-10),
              end_date: getUnixTimestamp(5),
              notes: 'Audit existing database',
              entries: [
                {
                  id: 21,
                  progress: 50,
                  date: getUnixTimestamp(-7),
                  notes: 'Identified data structure',
                  users: [{ first_name: 'Dev' }]
                },
                {
                  id: 22,
                  progress: 80,
                  date: getUnixTimestamp(-3),
                  notes: 'Completed audit report',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            },
            {
              id: 16,
              name: 'Migration Strategy',
              progress: 30,
              hours: 20,
              start_date: getUnixTimestamp(0),
              end_date: getUnixTimestamp(20),
              notes: 'Plan migration approach',
              entries: [
                {
                  id: 23,
                  progress: 30,
                  date: getUnixTimestamp(2),
                  notes: 'Initial strategy draft',
                  users: [{ first_name: 'Dev' }]
                }
              ]
            }
          ]
        },
        {
          id: 9,
          name: 'Execution',
          progress: 0,
          hours: 100,
          start_date: getUnixTimestamp(20),
          end_date: getUnixTimestamp(90),
          tasks: [
            {
              id: 17,
              name: 'Data Transformation',
              progress: 0,
              hours: 50,
              start_date: getUnixTimestamp(20),
              end_date: getUnixTimestamp(60),
              notes: 'Transform data to new format',
              entries: []
            },
            {
              id: 18,
              name: 'Migration Execution',
              progress: 0,
              hours: 50,
              start_date: getUnixTimestamp(60),
              end_date: getUnixTimestamp(90),
              notes: 'Execute the migration',
              entries: []
            }
          ]
        }
      ]
    }
  ],
  currentProject: {
    milestones: [],
  },
  loadingProject: false,
}

const projectsReducer = (state = initialState, action) => {
  let idx

  switch (action.type) {
    case 'LOADING_PROJECT':
      return {
        ...state,
        loadingProject: true,
      }

    case 'SET_ALL_PROJECTS':
      return {
        ...state,
        allProjects: action.payload,
        loadingProject: false,
      }

    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
        loadingProject: false,
      }

    case 'CLEAR_CURRENT_PROJECT':
      localStorage.removeItem('currentProjectId')
      return {
        ...state,
        currentProject: { milestones: [] },
      }

    case 'UPDATE_PROJECT':
      let idx1 = state.allProjects.findIndex(project => project.id === action.payload.project.id)
      let idx2 = state.currentProject.milestones.findIndex(
        milestone => milestone.id === action.payload.milestone.id
      )
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idx1),
          { ...state.allProjects[idx1], progress: action.payload.project.progress },
          ...state.allProjects.slice(idx1 + 1),
        ],
        currentProject: {
          ...state.currentProject,
          progress: action.payload.project.progress,
          milestones: [
            ...state.currentProject.milestones.slice(0, idx2),
            { ...state.currentProject.milestones[idx2], progress: action.payload.milestone.progress },
            ...state.currentProject.milestones.slice(idx2 + 1),
          ],
        },
      }

    case 'ADD_MILESTONE':
      idx = state.allProjects.findIndex(project => project.id === action.payload.project.id)
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idx),
          { ...state.allProjects[idx], progress: action.payload.project.progress },
          ...state.allProjects.slice(idx + 1),
        ],
        currentProject: {
          ...state.currentProject,
          progress: action.payload.project.progress,
          milestones: [...state.currentProject.milestones, action.payload.milestone],
        },
      }

    case 'EDIT_MILESTONE':
      idx = state.currentProject.milestones.findIndex(item => item.id === action.payload.milestone.id)
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          milestones: [
            ...state.currentProject.milestones.slice(0, idx),
            action.payload.milestone,
            ...state.currentProject.milestones.slice(idx + 1),
          ],
        },
      }

    case 'DELETE_MILESTONE':
      idx = state.currentProject.milestones.findIndex(item => item.id === action.payload.milestone.id)
      let idx3 = state.allProjects.findIndex(item => item.id === action.payload.project.id)
      return {
        ...state,
        allProjects: [
          ...state.allProjects.slice(0, idx3),
          { ...state.allProjects[idx3], progress: action.payload.project.progress },
          ...state.allProjects.slice(idx3 + 1),
        ],
        currentProject: {
          ...state.currentProject,
          progress: action.payload.project.progress,
          milestones: [
            ...state.currentProject.milestones.slice(0, idx),
            ...state.currentProject.milestones.slice(idx + 1),
          ],
        },
      }

    case 'ADD_PROJECT':
      return {
        ...state,
        allProjects: [...state.allProjects, action.payload.project],
      }

    case 'EDIT_PROJECT':
      idx = state.allProjects.findIndex(item => item.id === action.payload.project.id)
      let proj = action.payload.project
      let simpleProj = {
        id: proj.id,
        name: proj.name,
        progress: proj.progress,
        end_date: proj.end_date,
      }
      return {
        ...state,
        allProjects: [...state.allProjects.slice(0, idx), simpleProj, ...state.allProjects.slice(idx + 1)],
        currentProject: action.payload.project,
      }

    case 'DELETE_PROJECT':
      idx = state.allProjects.findIndex(item => item.id === action.payload.project.id)
      return {
        ...state,
        allProjects: [...state.allProjects.slice(0, idx), ...state.allProjects.slice(idx + 1)],
      }

    default:
      return state
  }
}

export default projectsReducer
