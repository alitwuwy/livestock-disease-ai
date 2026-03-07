// Users Management Module for EagleVET
// Handles user CRUD operations using Firestore ONLY

// Load users table (Firestore only - no localStorage)
async function loadUsersTable() {
    const usersTableBody = document.getElementById('usersTableBody');
    if (usersTableBody) {
        usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">جاري التحميل...</td></tr>';
    }
    
    const result = await getAllUsers();
    
    if (!result.success) {
        console.error("Error loading users:", result.error);
        if (usersTableBody) {
            usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--error);">خطأ في تحميل المستخدمين</td></tr>';
        }
        return;
    }
    
    const users = result.users;
    const currentUser = getCurrentUser();
    const perms = getUserPermissions(currentUser ? currentUser.role : 'visitor');
    
    if (users.length === 0) {
        if (usersTableBody) {
            usersTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">لا يوجد مستخدمين</td></tr>';
        }
        return;
    }
    
    let html = '';
    users.forEach(user => {
        const roleLabel = user.role === 'admin' ? 'مدير نظام' : 
                         user.role === 'manager' ? 'مدير' : 'مشرف';
        const roleClass = user.role === 'admin' ? 'role-admin' : 
                         user.role === 'manager' ? 'role-manager' : 'role-supervisor';
        
        const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('ar') : '-';
        
        html += `<tr>
            <td>${user.name || '-'}</td>
            <td>${user.email}</td>
            <td><span class="role-badge ${roleClass}">${roleLabel}</span></td>
            <td><span style="color:green"><i class="fas fa-check-circle"></i> نشط</span></td>
            <td>${createdDate}</td>
            <td>
                ${perms.canDeleteUsers && currentUser && currentUser.uid !== user.uid ? 
                  `<button class="btn btn-sm btn-danger" onclick="deleteUserById('${user.uid}')"><i class="fas fa-trash"></i></button>` : '-'}
            </td>
        </tr>`;
    });
    
    if (usersTableBody) {
        usersTableBody.innerHTML = html;
    }
}

// Delete user by UID (from Firestore)
async function deleteUserById(uid) {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        return;
    }
    
    const result = await deleteUserAccount(uid);
    
    if (result.success) {
        showToast('تم حذف المستخدم بنجاح', 'success');
        loadUsersTable();
    } else {
        showToast('خطأ في حذف المستخدم: ' + result.error, 'error');
    }
}

// Add new user (Admin function)
async function addNewUser(name, email, password, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            role: role,
            createdAt: new Date().toISOString()
        });
        
        showToast('تم إضافة المستخدم بنجاح', 'success');
        loadUsersTable();
        
        return { success: true };
    } catch (error) {
        console.error("Error adding user:", error);
        showToast('خطأ في إضافة المستخدم: ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}

// Update user role (Admin function)
async function updateUserRole(uid, newRole) {
    try {
        await updateDoc(doc(db, "users", uid), {
            role: newRole
        });
        
        showToast('تم تحديث دور المستخدم بنجاح', 'success');
        loadUsersTable();
        
        return { success: true };
    } catch (error) {
        console.error("Error updating user role:", error);
        showToast('خطأ في تحديث دور المستخدم: ' + error.message, 'error');
        return { success: false, error: error.message };
    }
}

// Check if current user can manage users
function canManageUsers() {
    const user = getCurrentUser();
    if (!user) return false;
    
    const perms = getUserPermissions(user.role);
    return perms.canManageUsers;
}

// Check if current user can add users
function canAddUsers() {
    const user = getCurrentUser();
    if (!user) return false;
    
    const perms = getUserPermissions(user.role);
    return perms.canAddUsers;
}

// Check if current user can delete users
function canDeleteUsers() {
    const user = getCurrentUser();
    if (!user) return false;
    
    const perms = getUserPermissions(user.role);
    return perms.canDeleteUsers;
}

// Export functions to window
window.loadUsersTable = loadUsersTable;
window.deleteUserById = deleteUserById;
window.addNewUser = addNewUser;
window.updateUserRole = updateUserRole;
window.canManageUsers = canManageUsers;
window.canAddUsers = canAddUsers;
window.canDeleteUsers = canDeleteUsers;
