

const employeeSheetsRoutes = [
    {
        path: '/members-sheets/appraisal',
        name: 'Appraisal',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/Appraisal.vue')
    },
    {
        path: '/members-sheets/attendance',
        name: 'Attendance',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/Attendance.vue')
    },
    {
        path: '/members-sheets/break-sheet',
        name: 'BreakSheet',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/BreakSheet.vue')
    },
    {
        path: '/members-sheets/classes-attendance',
        name: 'ClassesAttendance',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/ClassesAttendance.vue')
    },
    {
        path: '/members-sheets/employee-record',
        name: 'EmployeeRecord',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/EmployeeRecord.vue')
    },
    {
        path: '/members-sheets/maintenace',
        name: 'Maintenace',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/Maintenace.vue')
    },
    {
        path: '/members-sheets/personal-trainer-contract',
        name: 'PersonalTrainerContract',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/PersonalTrainerContract.vue')
    },
    {
        path: '/members-sheets/phone-call',
        name: 'PhoneCall',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/PhoneCall.vue')
    },
    {
        path: '/members-sheets/program-design',
        name: 'ProgramDesign',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/ProgramDesign.vue')
    },
    {
        path: '/members-sheets/sales-indoor',
        name: 'SalesIndoor',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/SalesIndoor.vue')
    },
    {
        path: '/members-sheets/warm-up',
        name: 'WarmUp',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/EmployeeSheets/WarmUp.vue')
    },
]

export default employeeSheetsRoutes;