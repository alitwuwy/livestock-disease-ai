// Firebase Authentication Module for EagleVET
// Handles user registration, login, logout, and auth state changes

// Current user state - uses defaultRoles from firebase-config.js
let currentUser = null;

// Special admin email
const ADMIN_EMAIL = "kknafh@gmail.com";

// Register a new user with email and password
async function registerUser(name, email, password) {
    try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: "supervisor", // Default role for new users
            createdAt: new Date().toISOString()
        });
        
        // Set current user
        currentUser = {
            uid: user.uid,
            name: name,
            email: email,
            role: "supervisor"
        };
        
        alert("تم إنشاء الحساب بنجاح!");
        return { success: true, user: currentUser };
    } catch (error) {
        console.error("Registration error:", error);
        alert("خطأ في إنشاء الحساب: " + error.message);
        return { success: false, error: error.message };
    }
}

// Login user with email and password
async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (userDoc.exists()) {
            currentUser = userDoc.data();
            currentUser.uid = user.uid;
            
            // If user is the special Admin email and doesn't have admin role, upgrade them
            if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && currentUser.role !== "admin") {
                currentUser.role = "admin";
                await updateDoc(doc(db, "users", user.uid), { role: "admin" });
            }
        } else {
            // If no document exists, create basic user data
            // Check if this is the special Admin email
            const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
            
            currentUser = {
                uid: user.uid,
                name: user.displayName || email.split('@')[0],
                email: user.email,
                role: isAdmin ? "admin" : "supervisor"
            };
            
            // Save to Firestore
            await setDoc(doc(db, "users", user.uid), currentUser);
        }
        
        alert("تم تسجيل الدخول بنجاح!");
        return { success: true, user: currentUser };
    } catch (error) {
        console.error("Login error:", error);
        alert("خطأ في تسجيل الدخول: " + error.message);
        return { success: false, error: error.message };
    }
}

// Logout user
async function logoutUser() {
    try {
        await signOut(auth);
        currentUser = null;
        
        // Clear localStorage
        localStorage.removeItem('raasidCurrentUser');
        
        // Reload page to show login
        location.reload();
        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        alert("خطأ في تسجيل الخروج: " + error.message);
        return { success: false, error: error.message };
    }
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Get user permissions based on role
function getUserPermissions(role) {
    return defaultRoles[role] || defaultRoles.visitor;
}

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Listen for auth state changes
function initAuthListener() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is logged in
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                
                if (userDoc.exists()) {
                    currentUser = userDoc.data();
                    currentUser.uid = user.uid;
                    
                    // If user is the special Admin email and doesn't have admin role, upgrade them
                    if (user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && currentUser.role !== "admin") {
                        currentUser.role = "admin";
                        await updateDoc(doc(db, "users", user.uid), { role: "admin" });
                    }
                } else {
                    // Create basic user data if not exists
                    const isAdmin = user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
                    
                    currentUser = {
                        uid: user.uid,
                        name: user.displayName || user.email.split('@')[0],
                        email: user.email,
                        role: isAdmin ? "admin" : "supervisor"
                    };
                    
                    await setDoc(doc(db, "users", user.uid), currentUser);
                }
                
                // Apply user to UI
                applyUserToUI(currentUser);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            // User is logged out
            currentUser = null;
            // Show login page
            showLoginPage();
        }
    });
}

// Apply user data to UI
function applyUserToUI(user) {
    if (!user) return;
    
    const perms = getUserPermissions(user.role);
    
    // Update user info
    const displayUsername = document.getElementById('displayUsername');
    const userRole = document.getElementById('userRole');
    const heroSubtitle = document.getElementById('heroSubtitle');
    
    if (displayUsername) displayUsername.textContent = user.name || user.email;
    if (userRole) userRole.textContent = perms.name;
    if (heroSubtitle) heroSubtitle.textContent = 'مرحباً بك يا ' + (user.name || 'زائر') + ' في لوحة التحكم';
    
    // Show/hide admin sections
    const navUsersLink = document.getElementById('nav-users-link');
    const navSettingsLink = document.getElementById('nav-settings-link');
    
    if (navUsersLink) {
        navUsersLink.style.display = perms.canManageUsers ? 'block' : 'none';
    }
    if (navSettingsLink) {
        navSettingsLink.style.display = perms.canEditSettings ? 'block' : 'none';
    }
    
    // Show main app, hide login
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    
    if (loginPage) loginPage.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');
    
    // Initialize app
    initAll();
}

// Show login page
function showLoginPage() {
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    
    if (loginPage) loginPage.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');
}

// Update user profile in Firestore
async function updateUserProfile(uid, data) {
    try {
        await updateDoc(doc(db, "users", uid), data);
        
        // Update local currentUser
        if (currentUser && currentUser.uid === uid) {
            currentUser = { ...currentUser, ...data };
        }
        
        return { success: true };
    } catch (error) {
        console.error("Update profile error:", error);
        return { success: false, error: error.message };
    }
}

// Get user by ID
async function getUserById(uid) {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return { success: true, user: userDoc.data() };
        }
        return { success: false, error: "User not found" };
    } catch (error) {
        console.error("Get user error:", error);
        return { success: false, error: error.message };
    }
}

// Get all users (for admin)
async function getAllUsers() {
    try {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
        
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        
        return { success: true, users: users };
    } catch (error) {
        console.error("Get all users error:", error);
        return { success: false, error: error.message };
    }
}

// Delete user (for admin)
async function deleteUserAccount(uid) {
    try {
        // Delete from Firestore
        await deleteDoc(doc(db, "users", uid));
        
        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { success: false, error: error.message };
    }
}

// Export functions to window
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.getCurrentUser = getCurrentUser;
window.getUserPermissions = getUserPermissions;
window.isLoggedIn = isLoggedIn;
window.initAuthListener = initAuthListener;
window.applyUserToUI = applyUserToUI;
window.showLoginPage = showLoginPage;
window.updateUserProfile = updateUserProfile;
window.getUserById = getUserById;
window.getAllUsers = getAllUsers;
window.deleteUserAccount = deleteUserAccount;
