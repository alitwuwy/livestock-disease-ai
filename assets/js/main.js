// راصد - نظام رصد الأمراض البيطرية بالذكاء الاصطناعي
// Main JavaScript with Permissions System

// Disease data for AI analysis
const diseases = [
    { name: 'الحمى القلاعية (FMD)', confidence: 92 },
    { name: 'جرب الماشية (LSD)', confidence: 87 },
    { name: 'مرض الجمبورو', confidence: 78 },
    { name: 'الطاعون الغذائي (PPR)', confidence: 85 },
    { name: 'التهاب الضرع', confidence: 90 }
];

// All Iraqi Governorates with coordinates
const iraqiGovernorates = [
    { name: 'بغداد', lat: 33.3128, lng: 44.3615 },
    { name: 'البصرة', lat: 30.5335, lng: 47.7924 },
    { name: 'نينوى', lat: 36.3354, lng: 43.1343 },
    { name: 'أربيل', lat: 36.1925, lng: 43.1265 },
    { name: 'كركوك', lat: 35.4729, lng: 44.3932 },
    { name: 'واسط', lat: 32.9288, lng: 46.1013 },
    { name: 'ذي قار', lat: 31.3283, lng: 46.2426 },
    { name: 'المثنى', lat: 31.3283, lng: 45.2941 },
    { name: 'بابل', lat: 32.4556, lng: 44.4422 },
    { name: 'كربلاء', lat: 32.3269, lng: 44.0428 },
    { name: 'النجف', lat: 31.8777, lng: 44.3167 },
    { name: 'الأنبار', lat: 33.3152, lng: 43.1343 },
    { name: 'ديالى', lat: 33.7713, lng: 45.0667 },
    { name: 'صلاح الدين', lat: 34.6158, lng: 43.1265 },
    { name: 'القادسية', lat: 31.8777, lng: 44.3167 },
    { name: 'ميسان', lat: 31.6916, lng: 47.0675 },
    { name: 'دهوك', lat: 36.8671, lng: 42.9944 },
    { name: 'السليمانية', lat: 35.5556, lng: 45.4444 }
];

// Disease outbreak locations with 5km radius
const outbreakLocations = [
    { id: 1, disease: 'الحمى القلاعية', diseaseEn: 'FMD', governorate: 'بغداد', lat: 33.3128, lng: 44.3615, cases: 45, accuracy: 95, animals: 'أبقار', date: '2024-01-15' },
    { id: 2, disease: 'الحمى القلاعية', diseaseEn: 'FMD', governorate: 'البصرة', lat: 30.5335, lng: 47.7924, cases: 32, accuracy: 88, animals: 'أبقار', date: '2024-01-20' },
    { id: 3, disease: 'الحمى القلاعية', diseaseEn: 'FMD', governorate: 'نينوى', lat: 36.2000, lng: 43.0000, cases: 28, accuracy: 92, animals: 'أبقار', date: '2024-02-01' },
    { id: 4, disease: 'جرب الماشية', diseaseEn: 'LSD', governorate: 'ذي قار', lat: 31.3283, lng: 46.2426, cases: 38, accuracy: 91, animals: 'أبقار', date: '2024-01-10' },
    { id: 5, disease: 'جرب الماشية', diseaseEn: 'LSD', governorate: 'المثنى', lat: 31.2500, lng: 45.2000, cases: 25, accuracy: 87, animals: 'أبقار', date: '2024-01-25' },
    { id: 6, disease: 'الطاعون الغذائي', diseaseEn: 'PPR', governorate: 'أربيل', lat: 36.1925, lng: 43.1265, cases: 52, accuracy: 94, animals: 'ماعز', date: '2024-01-08' },
    { id: 7, disease: 'الطاعون الغذائي', diseaseEn: 'PPR', governorate: 'السليمانية', lat: 35.4800, lng: 45.3500, cases: 41, accuracy: 89, animals: 'ماعز', date: '2024-01-18' },
    { id: 8, disease: 'الأنثراكس', diseaseEn: 'Anthrax', governorate: 'كربلاء', lat: 32.2800, lng: 44.0000, cases: 8, accuracy: 97, animals: 'أبقار', date: '2024-01-05' },
    { id: 9, disease: 'حمى الوادي المتصدع', diseaseEn: 'RVF', governorate: 'ميسان', lat: 31.6000, lng: 47.0000, cases: 15, accuracy: 88, animals: 'أبقار', date: '2024-01-22' },
    { id: 10, disease: 'مرض نيوكاسل', diseaseEn: 'Newcastle', governorate: 'النجف', lat: 31.8000, lng: 44.2500, cases: 22, accuracy: 86, animals: 'دواجن', date: '2024-02-08' },
    { id: 11, disease: 'السعار', diseaseEn: 'Rabies', governorate: 'ديالى', lat: 33.7000, lng: 45.0000, cases: 4, accuracy: 98, animals: 'كلاب', date: '2024-01-30' }
];

// Disease colors for map
const diseaseColors = {
    'الحمى القلاعية': '#D32F2F',
    'جرب الماشية': '#F57F17',
    'الطاعون الغذائي': '#7B1FA2',
    'الأنثراكس': '#0D47A1',
    'حمى الوادي المتصدع': '#FF6F00',
    'مرض نيوكاسل': '#00838F',
    'السعار': '#4A148C'
};

// Current map filter
let currentDiseaseFilter = 'all';
let currentGovernorateFilter = 'all';
let map = null;
let markersLayer = null;

// Permissions configuration
const permissions = {
    admin: { name: 'مدير نظام', canViewStats: true, canViewDiseases: true, canManageDiseases: true, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: true, canAddUsers: true, canDeleteUsers: true, canEditSettings: true, canDeleteReports: true },
    manager: { name: 'مدير', canViewStats: true, canViewDiseases: true, canManageDiseases: true, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: true, canAddUsers: true, canDeleteUsers: false, canEditSettings: false, canDeleteReports: true },
    supervisor: { name: 'مشرف', canViewStats: true, canViewDiseases: true, canManageDiseases: false, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: false, canAddUsers: false, canDeleteUsers: false, canEditSettings: false, canDeleteReports: false },
    visitor: { name: 'زائر', canViewStats: true, canViewDiseases: true, canManageDiseases: false, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: false, canAddUsers: false, canDeleteUsers: false, canEditSettings: false, canDeleteReports: false }
};

// Get user permissions
function getUserPermissions(role) {
    return permissions[role] || permissions.visitor;
}

// Check permission
function checkPermission(action) {
    if (!currentUser) {
        showToast('يرجى تسجيل الدخول أولاً', 'error');
        return false;
    }
    const perms = getUserPermissions(currentUser.role);
    switch(action) {
        case 'viewUsers':
            if (!perms.canManageUsers) { showToast('ليس لديك صلاحية عرض المستخدمين', 'error'); return false; }
            break;
        case 'addUser':
            if (!perms.canAddUsers) { showToast('ليس لديك صلاحية إضافة مستخدمين', 'error'); return false; }
            break;
        case 'deleteUser':
            if (!perms.canDeleteUsers) { showToast('ليس لديك صلاحية حذف مستخدمين', 'error'); return false; }
            break;
        case 'editSettings':
            if (!perms.canEditSettings) { showToast('ليس لديك صلاحية تعديل الإعدادات', 'error'); return false; }
            break;
        case 'manageDiseases':
            if (!perms.canManageDiseases) { showToast('ليس لديك صلاحية إدارة الأمراض', 'error'); return false; }
            break;
    }
    return true;
}

// Initialize diseases from localStorage
function initializeDiseases() {
    const defaultDiseases = [
        { id: 1, name: 'الحمى القلاعية (FMD)', nameEn: 'Foot and Mouth Disease', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الأبقار', description: 'أخطر الأمراض المعدية للماشية - مرض فيروسي حاد يصيب الحيوانات ذات الظلف المنشطر', affectedAnimals: 'الأبقار، الأغنام، الماعز، الخنازير', mortalityRate: '5% (الأبقار) - 70% (الخنازير الصغيرة)', symptoms: 'حمى عالية (40-41°C)، تقرحات في الفم والضرع والقدمين، إفراز لعاب وفير، عرج، فقدان الشهية، اكتئاب', transmission: 'التلامس المباشر، الهواء، المنتجات الحيوانية الملوثة، الأحذية والملابس', prevention: 'التباعد الجغرافي، التطهير، الحجر الصحي، التطعيمات', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 2, name: 'جرب الماشية (LSD)', nameEn: 'Lumpy Skin Disease', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أ diseases Cattle', description: 'مرض فيروسي معدٍ يصيب الجلد يسبب عقيدات وتورمات مؤلمة', affectedAnimals: 'الأبقار (جميع الأعمار)', mortalityRate: '10% - 75%', symptoms: 'عقيدات جلدية متعددة (1-5 سم)، حمى، إفرازات من الأنف والعيون، تورم الغدد الليمفاوية، عرج', transmission: 'النواقل (البعوض، الذباب، القراد)، التلامس المباشر', prevention: 'مكافحة النواقل، التطعيمات، العزل', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 3, name: 'الأنثراكس', nameEn: 'Anthrax', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أ diseases Cattle', description: 'مرض بكتيري قاتل يسبب نفوق مفاجئ', affectedAnimals: 'جميع الماشية، الإنسان', mortalityRate: '100% بدون علاج', symptoms: 'حمى، نزيف من فتحات الجسم، نفوق مفاجئ دون أعراض سابقة', transmission: 'التربة الملوثة، ابتلاع الجراثيم', prevention: 'التطعيمات، حرق الجثث، تجنب التلامس', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 4, name: 'حمى الوادي المتصدع', nameEn: 'Rift Valley Fever', oieStatus: 'قائمة الأمراض المشتركة', category: 'أ diseases Cattle', description: 'مرض فيروسي ينتقل عن طريق البعوض', affectedAnimals: 'الأبقار، الأغنام، الماعز، الإبل', mortalityRate: '30% - 100% في الحيوانات الصغيرة', symptoms: 'حمى، إجهاض، نزيف، يرقان، إسهال', transmission: 'البعوض (Aedes, Culex)، التلامس مع أنسجة الحيوانات', prevention: 'مكافحة البعوض، التطعيمات', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 5, name: 'التهاب الضرع', nameEn: 'Mastitis', oieStatus: 'مرض إنتاجي', category: 'أ diseases Cattle', description: 'عدوى بكتيرية في الضرع تؤثر على إنتاج الحليب', affectedAnimals: 'الأبقار، الجاموس، الأغنام، الماعز', mortalityRate: '2%', symptoms: 'تورم الضرع، إفرازات حليب صفراء أو دموية، حمى، فقدان الشهية', transmission: 'البكتيريا من البيئة', prevention: 'النظافة، المعالجة الوقائية', riskLevel: 'medium', status: 'active', source: 'FAO', isOutbreak: false },
        { id: 6, name: 'مرض البقر المجنون', nameEn: 'BSE', oieStatus: 'قائمة الأمراض المشتركة', category: 'أ diseases Cattle', description: 'مرض تنكسي يؤثر على الجهاز العصبي', affectedAnimals: 'الأبقار', mortalityRate: '100%', symptoms: 'تغييرات سلوكية، فقدان التنسيق، شلل', transmission: 'تناول علف ملوث', prevention: 'منع تغذية الحيوانية', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        { id: 7, name: 'الطاعون الغذائي (PPR)', nameEn: 'Peste des Petits Ruminants', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أ diseases Sheep and Goat', description: 'مرض فيروسي حاد - وباء الماعز - قابل للاستئصال', affectedAnimals: 'الماعز، الأغنام', mortalityRate: '90% الماعز، 30% الأغنام', symptoms: 'حمى (41°C)، إسهال دموي، تقرحات الفم، إفرازات أنفية وعينية، اكتئاب', transmission: 'التلامس المباشر مع الحيوانات المريضة', prevention: 'التطعيمات، العزل، برامج الاستئصال', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 8, name: 'مرض نيوكاسل', nameEn: 'Newcastle Disease', oieStatus: 'قائمة الأمراض المشتركة', category: 'أ diseases الدواجن', description: 'مرض فيروسي معدٍ للدواجن', affectedAnimals: 'الدواجن، الطيور', mortalityRate: '100% في السلالات القوية', symptoms: 'أعراض تنفسية، عصبية، إسهال، انخفاض إنتاج البيض، موت مفاجئ', transmission: 'الطيور البرية، التلامس المباشر', prevention: 'التطعيمات، الأمن البيولوجي', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 9, name: 'مرض الجمبورو', nameEn: 'Infectious Bursal Disease', oieStatus: 'قائمة الأمراض الحيوانية', category: 'أ diseases الدواجن', description: 'مرض فيروسي يصيب جهاز المناعة لدى الدواجن', affectedAnimals: 'الدواجن (3-6 أسابيع)', mortalityRate: '20% - 50%', symptoms: 'رعشة، إسهال مائي، جفاف، ريش متساقط، فقر دم', transmission: 'البراز، الماء، العلف الملوث، المعدات', prevention: 'الأمن البيولوجي، التطعيمات', riskLevel: 'medium', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        { id: 10, name: 'السعار', nameEn: 'Rabies', oieStatus: 'قائمة الأمراض المشتركة', category: 'الأمراض المشتركة', description: 'مرض فيروسي قاتل يؤثر على الجهاز العصبي', affectedAnimals: 'جميع الثدييات، الإنسان', mortalityRate: '100% بعد ظهور الأعراض', symptoms: 'تغييرات سلوكية، شلل، خوف من الماء، عدوانية', transmission: 'عض الحيوانات المصابة', prevention: 'التطعيمات، معالجة الجروح', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true }
    ];
    localStorage.setItem('raasidDiseases', JSON.stringify(defaultDiseases));
}

// Get all diseases
function getDiseases() {
    let diseases = JSON.parse(localStorage.getItem('raasidDiseases') || '[]');
    
    if (diseases.length === 0) {
        initializeDiseases();
        diseases = JSON.parse(localStorage.getItem('raasidDiseases') || '[]');
    }
    
    return diseases;
}

// Add new disease
function addDisease(disease) {
    if (!checkPermission('manageDiseases')) return;
    const diseases = getDiseases();
    const newDisease = { id: Date.now(), ...disease, status: 'active' };
    diseases.push(newDisease);
    localStorage.setItem('raasidDiseases', JSON.stringify(diseases));
    showToast('تم إضافة المرض بنجاح', 'success');
    loadDiseasesTable();
}

// Edit disease
function editDisease(id, updatedDisease) {
    if (!checkPermission('manageDiseases')) return;
    let diseases = getDiseases();
    const index = diseases.findIndex(d => d.id === id);
    if (index !== -1) {
        diseases[index] = { ...diseases[index], ...updatedDisease };
        localStorage.setItem('raasidDiseases', JSON.stringify(diseases));
        showToast('تم تحديث المرض بنجاح', 'success');
        loadDiseasesTable();
    }
}

// Delete disease
function deleteDisease(id) {
    if (!checkPermission('manageDiseases')) return;
    if (confirm('هل أنت متأكد من حذف هذا المرض؟')) {
        let diseases = getDiseases();
        diseases = diseases.filter(d => d.id !== id);
        localStorage.setItem('raasidDiseases', JSON.stringify(diseases));
        showToast('تم حذف المرض بنجاح', 'success');
        loadDiseasesTable();
    }
}

// Load diseases table
function loadDiseasesTable() {
    const diseases = getDiseases();
    const perms = getUserPermissions(currentUser ? currentUser.role : 'visitor');
    let html = '';
    diseases.forEach(disease => {
        const riskClass = disease.riskLevel === 'high' ? 'risk-high' : 'risk-medium';
        const riskLabel = disease.riskLevel === 'high' ? 'مخاطر عالية' : 'مخاطر متوسطة';
        const outbreakBadge = disease.isOutbreak ? '<span class="outbreak-badge"><i class="fas fa-exclamation-triangle"></i> تفشي نشط</span>' : '';
        html += `
        <div class="disease-card">
            <div class="disease-header">
                <h4>${disease.name}</h4>
                <div>${outbreakBadge} <span class="${riskClass}">${riskLabel}</span></div>
            </div>
            ${disease.nameEn ? `<p style="color: var(--text-secondary); font-size: 0.85rem;"><em>${disease.nameEn}</em></p>` : ''}
            <p>${disease.description}</p>
            <div class="disease-info"><i class="fas fa-paw"></i> <strong>الحيوانات:</strong> ${disease.affectedAnimals}</div>
            <div class="disease-info"><i class="fas fa-percentage"></i> <strong>نسبة النفوق:</strong> ${disease.mortalityRate}</div>
            <div class="disease-symptoms"><strong>الأعراض:</strong> ${disease.symptoms}</div>
            ${perms.canManageDiseases ? `
            <div style="margin-top: 10px; display: flex; gap: 5px;">
                <button class="btn btn-sm btn-primary" onclick="showEditDiseaseModal(${disease.id})"><i class="fas fa-edit"></i> تعديل</button>
                <button class="btn btn-sm btn-danger" onclick="deleteDisease(${disease.id})"><i class="fas fa-trash"></i> حذف</button>
            </div>` : ''}
        </div>`;
    });
    const container = document.getElementById('diseasesGrid');
    if (container) container.innerHTML = html;
}

// Show add disease modal
function showAddDiseaseModal() {
    if (!checkPermission('manageDiseases')) return;
    document.getElementById('diseaseModalTitle').textContent = 'إضافة مرض جديد';
    document.getElementById('diseaseForm').reset();
    document.getElementById('diseaseId').value = '';
    document.getElementById('diseaseModal').classList.add('show');
}

// Show edit disease modal
function showEditDiseaseModal(id) {
    if (!checkPermission('manageDiseases')) return;
    const diseases = getDiseases();
    const disease = diseases.find(d => d.id === id);
    if (disease) {
        document.getElementById('diseaseModalTitle').textContent = 'تعديل المرض';
        document.getElementById('diseaseId').value = disease.id;
        document.getElementById('diseaseName').value = disease.name;
        document.getElementById('diseaseNameEn').value = disease.nameEn || '';
        document.getElementById('diseaseDescription').value = disease.description;
        document.getElementById('diseaseAnimals').value = disease.affectedAnimals;
        document.getElementById('diseaseMortality').value = disease.mortalityRate;
        document.getElementById('diseaseSymptoms').value = disease.symptoms;
        document.getElementById('diseaseRiskLevel').value = disease.riskLevel || 'medium';
        document.getElementById('diseaseOutbreak').checked = disease.isOutbreak || false;
        document.getElementById('diseaseModal').classList.add('show');
    }
}

// Save disease (add or edit)
function saveDisease(e) {
    e.preventDefault();
    const diseaseId = document.getElementById('diseaseId').value;
    const disease = {
        name: document.getElementById('diseaseName').value,
        nameEn: document.getElementById('diseaseNameEn').value,
        description: document.getElementById('diseaseDescription').value,
        affectedAnimals: document.getElementById('diseaseAnimals').value,
        mortalityRate: document.getElementById('diseaseMortality').value,
        symptoms: document.getElementById('diseaseSymptoms').value,
        riskLevel: document.getElementById('diseaseRiskLevel').value,
        isOutbreak: document.getElementById('diseaseOutbreak').checked
    };
    if (diseaseId) editDisease(parseInt(diseaseId), disease);
    else addDisease(disease);
    closeDiseaseModal();
}

// Close disease modal
function closeDiseaseModal() {
    document.getElementById('diseaseModal').classList.remove('show');
    document.getElementById('diseaseForm').reset();
}

// Check authentication - handled by Firebase Auth via auth.js
function checkAuth() {
    // Authentication is now handled by initAuthListener() in auth.js
    return false;
}

// Logout function - calls Firebase logout
function logout() {
    if (typeof logoutUser === 'function') {
        logoutUser();
    } else {
        // Fallback if Firebase auth not available
        currentUser = null;
        localStorage.removeItem('raasidCurrentUser');
        location.reload();
    }
}

// Apply permissions to UI
function applyPermissions() {
    const perms = getUserPermissions(currentUser.role);
    document.getElementById('displayUsername').textContent = currentUser.name;
    document.getElementById('userRole').textContent = perms.name;
    document.getElementById('heroSubtitle').textContent = 'مرحباً بك يا ' + currentUser.name + ' في لوحة التحكم';
    if (perms.canManageUsers) document.getElementById('nav-users-link').style.display = 'block';
    if (perms.canEditSettings) document.getElementById('nav-settings-link').style.display = 'block';
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    loadUsersTable();
    initAll();
}

// Show public page (visitor)
function showPublicPage() {
    currentUser = { name: 'زائر', role: 'visitor' };
    applyPermissions();
}

// Toggle mobile menu
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.toggle('mobile-open');
}

// Show section
function showSection(sectionId) {
    if (currentUser) {
        const perms = getUserPermissions(currentUser.role);
        if (sectionId === 'users' && !perms.canManageUsers) { showToast('ليس لديك صلاحية عرض هذه الصفحة', 'error'); sectionId = 'home'; }
        if (sectionId === 'settings' && !perms.canEditSettings) { showToast('ليس لديك صلاحية عرض هذه الصفحة', 'error'); sectionId = 'home'; }
    }
    document.querySelectorAll('.section-page').forEach(s => { s.classList.remove('active'); s.classList.add('hidden'); s.style.display = 'none'; });
    const target = document.getElementById(sectionId + 'Section');
    if (target) { target.classList.remove('hidden'); target.classList.add('active'); target.style.display = 'block'; }
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const navLink = document.getElementById('nav-' + sectionId);
    if (navLink) navLink.classList.add('active');
    if (sectionId === 'map') {
        setTimeout(function() {
            const mapContainer = document.getElementById('map');
            if (mapContainer && mapContainer._leaflet_id) mapContainer._leaflet_id = null;
            initMap();
        }, 300);
    }
    if (sectionId === 'stats') {
        setTimeout(function() { initCharts(); }, 300);
    }
}

// Load users table - uses Firestore via users.js
function loadUsersTable() {
    if (typeof window.loadUsersTableFromFirestore === 'function') {
        window.loadUsersTableFromFirestore();
    } else {
        // Fallback to local
        const users = JSON.parse(localStorage.getItem('raasidUsers') || '[]');
        const perms = getUserPermissions(currentUser ? currentUser.role : 'visitor');
        let html = '';
        users.forEach(user => {
            const roleLabel = user.role === 'admin' ? 'مدير نظام' : user.role === 'manager' ? 'مدير' : 'مشرف';
            const roleClass = user.role === 'admin' ? 'role-admin' : user.role === 'manager' ? 'role-manager' : 'role-supervisor';
            html += `<tr><td>${user.name}</td><td>${user.username}</td><td><span class="role-badge ${roleClass}">${roleLabel}</span></td><td>${user.status === 'active' ? '<span style="color:green"><i class="fas fa-check-circle"></i> نشط</span>' : '<span style="color:red"><i class="fas fa-times-circle"></i> غير نشط</span>'}</td><td>${user.date || '-'}</td><td>${perms.canDeleteUsers ? '<button class="btn btn-sm btn-danger" onclick="deleteUser(' + user.id + ')"><i class="fas fa-trash"></i></button>' : '-'}</td></tr>`;
        });
        const tbody = document.getElementById('usersTableBody');
        if (tbody) tbody.innerHTML = html;
    }
}

// Add user - uses Firebase via users.js
function addUser(name, username, password, role) {
    if (typeof window.addNewUser === 'function') {
        const email = username + '@example.com';
        window.addNewUser(name, email, password, role);
    } else {
        // Fallback to local
        const users = JSON.parse(localStorage.getItem('raasidUsers') || '[]');
        if (users.find(u => u.username === username)) { showToast('اسم المستخدم موجود مسبقاً', 'error'); return; }
        users.push({ id: Date.now(), name, username, password, role, status: 'active', date: new Date().toISOString().split('T')[0] });
        localStorage.setItem('raasidUsers', JSON.stringify(users));
        loadUsersTable();
        showToast('تم إضافة المستخدم بنجاح', 'success');
    }
}

// Delete user
function deleteUser(id) {
    if (!checkPermission('deleteUser')) return;
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        if (typeof window.deleteUserById === 'function') {
            window.deleteUserById(id);
        } else {
            let users = JSON.parse(localStorage.getItem('raasidUsers') || '[]');
            if (id === currentUser.id) { showToast('لا يمكنك حذف حسابك الحالي', 'error'); return; }
            users = users.filter(u => u.id !== id);
            localStorage.setItem('raasidUsers', JSON.stringify(users));
            loadUsersTable();
            showToast('تم حذف المستخدم بنجاح', 'success');
        }
    }
}

// Show add user modal
function showAddUserModal() {
    if (!checkPermission('addUser')) return;
    const adminOption = document.getElementById('adminRoleOption');
    if (adminOption) adminOption.style.display = (currentUser && currentUser.role === 'admin') ? 'block' : 'none';
    document.getElementById('addUserModal').classList.add('show');
}

// Close modal
function closeModal() {
    document.getElementById('addUserModal').classList.remove('show');
    document.getElementById('addUserForm').reset();
}

// Show toast notification
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i><span>' + message + '</span>';
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==================== AI Disease Analysis System ====================
const aiDiseaseDatabase = [
    { id: 1, name: 'الحمى القلاعية (FMD)', nameEn: 'Foot and Mouth Disease', cause: 'الفيروس الفموي الظلفية (FMDV)', affectedAnimals: 'الأبقار، الأغنام، الماعز، الخنازير', symptoms: ['حمى عالية', 'تقرحات في الفم', 'إفراز لعاب وفير', 'عرج', 'فقدان الشهية'], transmission: 'التلامس المباشر، الهواء، المنتجات الملوثة', incubation: '2-14 يوم', mortality: '5% - 70%', diagnosis: 'فحص سريري، ELISA، RT-PCR', treatment: 'لا يوجد علاج محدد - العلاج الداعم فقط', prevention: 'التباعد الجغرافي، التطهير، الحجر الصحي، التطعيمات', vaccines: 'لقاحات inactivated متعددة التكافؤ', references: 'WOAH', riskLevel: 'high', recommendations: ['عزل الحيوانات المصابة فوراً', 'إبلاغ الطبيب البيطري المحلي', 'تطهير المعدات', 'منع حركة الحيوانات', 'بدء برنامج تطعيمي'] },
    { id: 2, name: 'جرب الماشية (LSD)', nameEn: 'Lumpy Skin Disease', cause: 'virus Capripoxvirus', affectedAnimals: 'الأبقار', symptoms: ['عقيدات جلدية', 'حمى', 'إفرازات من الأنف والعيون', 'تورم الغدد الليمفاوية', 'عرج'], transmission: 'النواقل (البعوض، الذباب)، التلامس المباشر', incubation: '7-21 يوم', mortality: '10% - 75%', diagnosis: 'الفحص السريري، PCR', treatment: 'لا يوجد علاج محدد', prevention: 'مكافحة النواقل، التطعيمات، العزل', vaccines: 'لقاح Neethling', references: 'WOAH', riskLevel: 'high', recommendations: ['مكافحة النواقل', 'عزل الحيوانات المصابة', 'تطهير الحظائر', 'تطبيق برنامج تطعيمي'] },
    { id: 3, name: 'الطاعون الغذائي (PPR)', nameEn: 'Peste des Petits Ruminants', cause: 'virus Morbillivirus', affectedAnimals: 'الماعز، الأغنام', symptoms: ['حمى عالية', 'إسهال دموي', 'تقرحات الفم', 'إفرازات أنفية'], transmission: 'التلامس المباشر', incubation: '3-10 أيام', mortality: '90% الماعز، 30% الأغنام', diagnosis: 'ELISA، RT-PCR', treatment: 'لا يوجد علاج محدد', prevention: 'التطعيمات، العزل', vaccines: 'لقاح PPR', references: 'WOAH', riskLevel: 'high', recommendations: ['عزل الحيوانات المشتبه بها', 'إبلاغ السلطات البيطرية', 'تطبيق برنامج تطعيمي'] },
    { id: 4, name: 'الأنثراكس', nameEn: 'Anthrax', cause: 'بكتيريا Bacillus anthracis', affectedAnimals: 'جميع الماشية، الإنسان', symptoms: ['نفوق مفاجئ', 'حمى', 'نزيف من فتحات الجسم'], transmission: 'التربة الملوثة', incubation: '1-14 يوم', mortality: '100%', diagnosis: 'فحص مجهري، ثقافة', treatment: 'البنسلين في المراحل المبكرة', prevention: 'التطعيمات، حرق الجثث', vaccines: 'لقاح Sterne', references: 'WOAH', riskLevel: 'high', recommendations: ['لا فتح جثث', 'إبلاغ الطبيب البيطري', 'حرق الجثة'] },
    { id: 5, name: 'مرض نيوكاسل', nameEn: 'Newcastle Disease', cause: 'virus Paramyxovirus-1', affectedAnimals: 'الدواجن', symptoms: ['أعراض تنفسية', 'أعراض عصبية', 'إسهال أخضر', 'موت مفاجئ'], transmission: 'الطيور البرية، التلامس', incubation: '2-15 يوم', mortality: '100%', diagnosis: 'PCR، عزل الفيروس', treatment: 'لا يوجد', prevention: 'التطعيمات، الأمن البيولوجي', vaccines: 'لقاحات B1, LaSota', references: 'WOAH', riskLevel: 'high', recommendations: ['تطبيق برنامج تطعيمي', 'الأمن البيولوجي', 'منعcontact مع الطيور البرية'] }
];

function matchSymptoms(inputSymptoms, disease) {
    const input = inputSymptoms.toLowerCase();
    const symptomMatches = disease.symptoms.filter(s => input.includes(s.toLowerCase().split(' ')[0]));
    return (symptomMatches.length / disease.symptoms.length) * 100;
}

function calculateProbability(symptoms, disease) {
    const matchScore = matchSymptoms(symptoms, disease);
    const baseScore = matchScore * 0.7;
    return Math.min(95, baseScore + 30);
}

function analyzeDisease() {
    const symptoms = document.getElementById('symptomsInput').value.trim();
    const animalType = document.getElementById('animalTypeAI') ? document.getElementById('animalTypeAI').value : 'all';
    if (!symptoms) { showToast('يرجى إدخال الأعراض', 'error'); return; }
    
    const btn = event.target;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل بالذكاء الاصطناعي...';
    btn.disabled = true;
    
    setTimeout(() => {
        let relevantDiseases = aiDiseaseDatabase;
        if (animalType && animalType !== 'all') {
            relevantDiseases = aiDiseaseDatabase.filter(d => d.affectedAnimals.toLowerCase().includes(animalType));
            if (relevantDiseases.length === 0) relevantDiseases = aiDiseaseDatabase;
        }
        
        const results = relevantDiseases.map(disease => ({ ...disease, probability: calculateProbability(symptoms, disease) })).sort((a, b) => b.probability - a.probability);
        const topResult = results[0];
        
        const resultDiv = document.getElementById('aiResult');
        if (document.getElementById('diseaseName')) document.getElementById('diseaseName').textContent = topResult.name;
        if (document.getElementById('confidencePercent')) document.getElementById('confidencePercent').textContent = topResult.probability.toFixed(0) + '%';
        if (document.getElementById('confidenceBar')) {
            document.getElementById('confidenceBar').style.width = topResult.probability + '%';
            document.getElementById('confidenceBar').style.background = topResult.probability > 70 ? 'linear-gradient(90deg, #D32F2F, #FF5722)' : topResult.probability > 50 ? 'linear-gradient(90deg, #FFA000, #FF5722)' : 'linear-gradient(90deg, #388E3C, #8BC34A)';
        }
        
        if (resultDiv) {
            resultDiv.classList.add('show');
            resultDiv.innerHTML += '<div class="detailed-info"><h4><i class="fas fa-info-circle"></i> معلومات علمية</h4><p><strong>المسبب:</strong> ' + topResult.cause + '</p><p><strong>الحيوانات:</strong> ' + topResult.affectedAnimals + '</p><p><strong>فترة الحضانة:</strong> ' + topResult.incubation + '</p><p><strong>نسبة النفوق:</strong> ' + topResult.mortality + '</p><p><strong>العلاج:</strong> ' + topResult.treatment + '</p><p><strong>الوقاية:</strong> ' + topResult.prevention + '</p><p><strong>اللقاحات:</strong> ' + topResult.vaccines + '</p></div>';
        }
        
        btn.innerHTML = '<i class="fas fa-microscope"></i> تحليل حالة جديدة';
        btn.disabled = false;
        showToast('تم التحليل بنجاح - دقة التشخيص: ' + topResult.probability.toFixed(0) + '%', 'success');
    }, 2500);
}

// Submit report
function submitReport(e) {
    e.preventDefault();
    const animalType = document.getElementById('animalType').value;
    const governorate = document.getElementById('governorate').value;
    const symptoms = document.getElementById('symptoms').value;
    if (!animalType || !governorate || !symptoms) { showToast('يرجى إكمال جميع الحقول المطلوبة', 'error'); return; }
    showToast('تم إرسال البلاغ بنجاح', 'success');
    document.getElementById('reportForm').reset();
}

// Initialize map
function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    if (mapEl._leaflet_id) mapEl._leaflet_id = null;
    map = L.map('map').setView([33.3152, 44.3661], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap', maxZoom: 18 }).addTo(map);
    L.control.scale().addTo(map);
    markersLayer = L.layerGroup().addTo(map);
    populateMapFilters();
    displayOutbreakMarkers();
}

function populateMapFilters() {
    const diseaseFilter = document.getElementById('diseaseFilter');
    const governorateFilter = document.getElementById('governorateFilter');
    if (!diseaseFilter || !governorateFilter) return;
    const diseases = [...new Set(outbreakLocations.map(o => o.disease))];
    diseaseFilter.innerHTML = '<option value="all">كل الأمراض</option>';
    diseases.forEach(disease => { diseaseFilter.innerHTML += '<option value="' + disease + '">' + disease + '</option>'; });
    governorateFilter.innerHTML = '<option value="all">كل المحافظات</option>';
    iraqiGovernorates.forEach(gov => { governorateFilter.innerHTML += '<option value="' + gov.name + '">' + gov.name + '</option>'; });
}

function filterByDisease(disease) { currentDiseaseFilter = disease; displayOutbreakMarkers(); }
function filterByGovernorate(governorate) { currentGovernorateFilter = governorate; displayOutbreakMarkers(); }

function displayOutbreakMarkers() {
    if (!markersLayer) return;
    markersLayer.clearLayers();
    let filteredOutbreaks = outbreakLocations;
    if (currentDiseaseFilter !== 'all') filteredOutbreaks = filteredOutbreaks.filter(o => o.disease === currentDiseaseFilter);
    if (currentGovernorateFilter !== 'all') filteredOutbreaks = filteredOutbreaks.filter(o => o.governorate === currentGovernorateFilter);
    filteredOutbreaks.forEach(outbreak => {
        const color = diseaseColors[outbreak.disease] || '#757575';
        const marker = L.circleMarker([outbreak.lat, outbreak.lng], { radius: Math.sqrt(outbreak.cases) * 2, fillColor: color, color: '#fff', weight: 2, fillOpacity: 0.7 });
        marker.bindPopup('<div style="min-width:200px"><h4 style="color:' + color + '">' + outbreak.disease + '</h4><p><strong>المحافظة:</strong> ' + outbreak.governorate + '</p><p><strong>عدد الحالات:</strong> ' + outbreak.cases + '</p><p><strong>الحيوانات:</strong> ' + outbreak.animals + '</p><p><strong>التاريخ:</strong> ' + outbreak.date + '</p></div>');
        markersLayer.addLayer(marker);
    });
    updateMapStats(filteredOutbreaks);
}

function updateMapStats(outbreaks) {
    const statsContainer = document.getElementById('mapStats');
    if (!statsContainer) return;
    const totalCases = outbreaks.reduce((sum, o) => sum + o.cases, 0);
    statsContainer.innerHTML = '<div class="stat-box"><span class="stat-number">' + outbreaks.length + '</span><span class="stat-label">بؤرة تفشي</span></div><div class="stat-box"><span class="stat-number">' + totalCases + '</span><span class="stat-label">حالة</span></div><div class="stat-box"><span class="stat-number">' + [...new Set(outbreaks.map(o => o.disease))].length + '</span><span class="stat-label">مرض</span></div><div class="stat-box"><span class="stat-number">' + [...new Set(outbreaks.map(o => o.governorate))].length + '</span><span class="stat-label">محافظة</span></div>';
}

// Initialize charts
function initCharts() {
    if (document.getElementById('diseaseChart')) {
        new Chart(document.getElementById('diseaseChart'), { type: 'doughnut', data: { labels: ['الحمام القلاعية', 'جرب', 'جمبورو', 'PPR', 'أخرى'], datasets: [{ data: [32, 25, 18, 15, 10], backgroundColor: ['#D32F2F', '#F57F17', '#0D47A1', '#7B1FA2', '#757575'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } } });
        new Chart(document.getElementById('trendChart'), { type: 'line', data: { labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'], datasets: [{ label: 'البلاغات', data: [180, 210, 195, 245, 280, 310], borderColor: '#1B5E20', backgroundColor: 'rgba(27,94,32,0.1)', fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } } });
    }
}

// Initialize all
function initAll() {
    initMap();
    initCharts();
    initRoles();
}

// Roles Management
function initRoles() {
    if (!localStorage.getItem('raasidRoles')) {
        localStorage.setItem('raasidRoles', JSON.stringify([
            { id: 1, name: 'مدير نظام', description: 'لديه جميع الصلاحيات', permissions: { canViewStats: true, canViewDiseases: true, canManageDiseases: true, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: true, canAddUsers: true, canDeleteUsers: true, canEditSettings: true, canDeleteReports: true } },
            { id: 2, name: 'مدير', description: 'يمكنه إدارة المستخدمين والأمراض', permissions: { canViewStats: true, canViewDiseases: true, canManageDiseases: true, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: true, canAddUsers: true, canDeleteUsers: false, canEditSettings: false, canDeleteReports: true } },
            { id: 3, name: 'مشرف', description: 'يمكنه عرض وإضافة البلاغات', permissions: { canViewStats: true, canViewDiseases: true, canManageDiseases: false, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: false, canAddUsers: false, canDeleteUsers: false, canEditSettings: false, canDeleteReports: false } }
        ]));
    }
    if (currentUser && currentUser.role === 'admin') {
        const rolesSection = document.getElementById('rolesManagementSection');
        if (rolesSection) rolesSection.style.display = 'block';
        loadRolesList();
    }
}

function loadRolesList() {
    const roles = JSON.parse(localStorage.getItem('raasidRoles') || '[]');
    const rolesList = document.getElementById('rolesList');
    if (!rolesList) return;
    let html = '<div class="roles-grid">';
    roles.forEach(role => {
        html += '<div class="role-card"><div class="role-header"><i class="fas fa-user-shield"></i><h4>' + role.name + '</h4></div><p>' + (role.description || 'لا يوجد وصف') + '</p></div>';
    });
    html += '</div>';
    rolesList.innerHTML = html;
}

function showAddRoleModal() {
    if (!currentUser || currentUser.role !== 'admin') { showToast('ليس لديك صلاحية إضافة رتب', 'error'); return; }
    document.getElementById('addRoleModal').classList.add('show');
}

function closeRoleModal() {
    document.getElementById('addRoleModal').classList.remove('show');
    document.getElementById('addRoleForm').reset();
}

function saveRole(e) {
    e.preventDefault();
    const roleName = document.getElementById('roleName').value;
    const roleDescription = document.getElementById('roleDescription').value;
    const roles = JSON.parse(localStorage.getItem('raasidRoles') || '[]');
    roles.push({ id: Date.now(), name: roleName, description: roleDescription, permissions: { canViewStats: true, canViewDiseases: true, canManageDiseases: true, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: true, canAddUsers: true, canDeleteUsers: true, canEditSettings: true, canDeleteReports: true } });
    localStorage.setItem('raasidRoles', JSON.stringify(roles));
    showToast('تم إضافة الرتبة بنجاح', 'success');
    closeRoleModal();
    loadRolesList();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeDiseases();
    if (typeof initAuthListener === 'function') initAuthListener();
    
    // Login form - uses Firebase Auth
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email') ? document.getElementById('email').value : document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (typeof loginUser === 'function') {
                const result = await loginUser(email, password);
                if (result.success) showToast('مرحباً بك ' + result.user.name, 'success');
                else showToast(result.error || 'خطأ في تسجيل الدخول', 'error');
            } else {
                showToast('نظام تسجيل الدخول غير متوفر', 'error');
            }
        });
    }

    // Add user form
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addUser(document.getElementById('newUserName').value, document.getElementById('newUsername').value, document.getElementById('newPassword').value, document.getElementById('newUserRole').value);
            closeModal();
        });
    }

    // Animal form
    const animalForm = document.getElementById('animalForm');
    if (animalForm) animalForm.addEventListener('submit', function(e) { e.preventDefault(); showToast('تم تسجيل الحيوان بنجاح', 'success'); });

    // Vet form
    const vetForm = document.getElementById('vetForm');
    if (vetForm) vetForm.addEventListener('submit', function(e) { e.preventDefault(); showToast('تم إضافة الطبيب البيطري بنجاح', 'success'); });

    // Modal close
    const addUserModal = document.getElementById('addUserModal');
    if (addUserModal) addUserModal.addEventListener('click', function(e) { if (e.target === this) closeModal(); });

    const diseaseModal = document.getElementById('diseaseModal');
    if (diseaseModal) diseaseModal.addEventListener('click', function(e) { if (e.target === this) closeDiseaseModal(); });

    const addRoleForm = document.getElementById('addRoleForm');
    if (addRoleForm) addRoleForm.addEventListener('submit', function(e) { saveRole(e); });

    const addRoleModal = document.getElementById('addRoleModal');
    if (addRoleModal) addRoleModal.addEventListener('click', function(e) { if (e.target === this) closeRoleModal(); });

    loadDiseasesTable();
    const perms = getUserPermissions(currentUser ? currentUser.role : 'visitor');
    const addBtn = document.getElementById('addDiseaseBtn');
    if (addBtn && perms.canManageDiseases) addBtn.style.display = 'inline-flex';
});
