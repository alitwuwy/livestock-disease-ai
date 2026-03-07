// Firebase Configuration for EagleVET
// Using existing Firebase config from the project

const firebaseConfig = {
    apiKey: "AIzaSyDAe7PoqZ4YkELcsnnXbriy336bN9lLOJM",
    authDomain: "eaglevet.firebaseapp.com",
    projectId: "eaglevet",
    storageBucket: "eaglevet.firebasestorage.app",
    messagingSenderId: "871444624073",
    appId: "1:871444624073:web:41b0660e53a5b1827a5318",
    measurementId: "G-NXV7P6D6BY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Default roles for the application
const defaultRoles = {
    admin: {
        name: 'مدير نظام',
        canViewStats: true,
        canViewDiseases: true,
        canManageDiseases: true,
        canViewMap: true,
        canViewReport: true,
        canUseAI: true,
        canManageUsers: true,
        canAddUsers: true,
        canDeleteUsers: true,
        canEditSettings: true,
        canDeleteReports: true
    },
    manager: {
        name: 'مدير',
        canViewStats: true,
        canViewDiseases: true,
        canManageDiseases: true,
        canViewMap: true,
        canViewReport: true,
        canUseAI: true,
        canManageUsers: true,
        canAddUsers: true,
        canDeleteUsers: false,
        canEditSettings: false,
        canDeleteReports: true
    },
    supervisor: {
        name: 'مشرف',
        canViewStats: true,
        canViewDiseases: true,
        canManageDiseases: false,
        canViewMap: true,
        canViewReport: true,
        canUseAI: true,
        canManageUsers: false,
        canAddUsers: false,
        canDeleteUsers: false,
        canEditSettings: false,
        canDeleteReports: false
    },
    visitor: {
        name: 'زائر',
        canViewStats: true,
        canViewDiseases: true,
        canManageDiseases: false,
        canViewMap: true,
        canViewReport: true,
        canUseAI: true,
        canManageUsers: false,
        canAddUsers: false,
        canDeleteUsers: false,
        canEditSettings: false,
        canDeleteReports: false
    }
};

// Export for use in other files
window.firebaseConfig = firebaseConfig;
window.defaultRoles = defaultRoles;
