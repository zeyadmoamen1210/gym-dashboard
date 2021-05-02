
const memberSheetsRoutes = [
    {
        path: '/sales-sheets/sales',
        name: 'SalesSheet',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/SalesSheet/sales.vue')
    },
    {
        path: '/members-sheets/fitnessTest',
        name: 'FitnessTest',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/FitnessTest.vue')
    },
    {
        path: '/members-sheets/fitness-profile',
        name: 'FitnessProfile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/FitnessProfile.vue')
    },
    {
        path: '/members-sheets/guest-information',
        name: 'GuestInformation',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/GuestInformation.vue')
    },
    {
        path: '/members-sheets/gym-contract',
        name: 'GymContractFitHouse',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/GymContractFitHouse.vue')
    },
    {
        path: '/members-sheets/gym-instructions',
        name: 'GymInstructionsFitHouse',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/GymInstructions.vue')
    },
    {
        path: '/members-sheets/main-price-list',
        name: 'MainPriceList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/MainPriceList.vue')
    },
    {
        path: '/members-sheets/member-lead-form',
        name: 'MemberLeadFormFitHouse',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/MemberLeadFormFitHouse.vue')
    },
    {
        path: '/members-sheets/private-trainer-price-list',
        name: 'PrivateTrainerPriceList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/PrivateTrainerPriceList.vue')
    },
    {
        path: '/members-sheets/visits-price-lists',
        name: 'VisitsPriceLists',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/VisitsPriceLists.vue')
    },

    // Start Arabic Sheets in Member Category

    {
        path: '/members-sheets/confirmation',
        name: 'Confirmation',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/ArabicSheets/Confirmation.vue')
    },

    {
        path: '/members-sheets/confirmation-of-payment',
        name: 'ConfirmationOfPayment',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/ArabicSheets/ConfirmationOfPayment.vue')
    },

    {
        path: '/members-sheets/receipt',
        name: 'Receipt',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/ArabicSheets/Receipt.vue')
    },

    {
        path: '/members-sheets/receipt-of-cash',
        name: 'ReceiptOfCash',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/ArabicSheets/ReceiptOfCash.vue')
    },

    {
        path: '/members-sheets/reconnaissance',
        name: 'Reconnaissance',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/ArabicSheets/Reconnaissance.vue')
    },

    {
        path: '/members-sheets/complaints',
        name: 'Complaints',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/MembersSheets/Complaints.vue')
    },
]

export default memberSheetsRoutes;