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
    { name: 'القادسية', lat: 31.8777, lng: 44.3167 },
    { name: 'السليمانية', lat: 35.5556, lng: 45.4444 }
];

// Disease outbreak locations with 5km radius (5000 meters)
const outbreakLocations = [
    // الحمى القلاعية - FMD outbreaks
    { id: 1, disease: 'الحمى القلاعية', diseaseEn: 'FMD', governorate: 'بغداد', lat: 33.3128, lng: 44.3615, cases: 45, accuracy: 95, animals: 'أبقار', date: '2024-01-15' },
    { id: 2, disease: 'الحمى القلاعية', diseaseEn: 'FMD', governorate: 'البصرة', lat: 30.5335, lng: 47.7924, cases: 32, accuracy: 88, animals: 'أبقار', date: '2024-01-20' },
    { id: 3, disease: 'الحمى القلاعية', diseaseEn: 'FMD', governorate: 'نينوى', lat: 36.2000, lng: 43.0000, cases: 28, accuracy: 92, animals: 'أبقار', date: '2024-02-01' },
    { id: 4, disease: 'الحمية القلاعية', diseaseEn: 'FMD', governorate: 'واسط', lat: 32.8500, lng: 46.0500, cases: 22, accuracy: 85, animals: 'أبقار', date: '2024-02-10' },
    
    // جرب الماشية - LSD outbreaks
    { id: 5, disease: 'جرب الماشية', diseaseEn: 'LSD', governorate: 'ذي قار', lat: 31.3283, lng: 46.2426, cases: 38, accuracy: 91, animals: 'أبقار', date: '2024-01-10' },
    { id: 6, disease: 'جرب الماشية', diseaseEn: 'LSD', governorate: 'المثنى', lat: 31.2500, lng: 45.2000, cases: 25, accuracy: 87, animals: 'أبقار', date: '2024-01-25' },
    { id: 7, disease: 'جرب الماشية', diseaseEn: 'LSD', governorate: 'بابل', lat: 32.4000, lng: 44.3500, cases: 18, accuracy: 90, animals: 'أبقار', date: '2024-02-05' },
    
    // الطاعون الغذائي - PPR outbreaks
    { id: 8, disease: 'الطاعون الغذائي', diseaseEn: 'PPR', governorate: 'أربيل', lat: 36.1925, lng: 43.1265, cases: 52, accuracy: 94, animals: 'ماعز', date: '2024-01-08' },
    { id: 9, disease: 'الطاعون الغذائي', diseaseEn: 'PPR', governorate: 'السليمانية', lat: 35.4800, lng: 45.3500, cases: 41, accuracy: 89, animals: 'ماعز', date: '2024-01-18' },
    { id: 10, disease: 'الطاعون الغذائي', diseaseEn: 'PPR', governorate: 'دهوك', lat: 36.7800, lng: 42.9500, cases: 35, accuracy: 92, animals: 'ماعز', date: '2024-02-02' },
    
    // الأنثراكس - Anthrax
    { id: 11, disease: 'الأنثراكس', diseaseEn: 'Anthrax', governorate: 'كربلاء', lat: 32.2800, lng: 44.0000, cases: 8, accuracy: 97, animals: 'أبقار', date: '2024-01-05' },
    { id: 12, disease: 'الأنثراكس', diseaseEn: 'Anthrax', governorate: 'الأنبار', lat: 33.2000, lng: 43.0000, cases: 6, accuracy: 95, animals: 'أبقار', date: '2024-01-12' },
    
    // حمى الوادي المتصدع - RVF
    { id: 13, disease: 'حمى الوادي المتصدع', diseaseEn: 'RVF', governorate: 'ميسان', lat: 31.6000, lng: 47.0000, cases: 15, accuracy: 88, animals: 'أبقار', date: '2024-01-22' },
    
    // مرض نيوكاسل - Newcastle
    { id: 14, disease: 'مرض نيوكاسل', diseaseEn: 'Newcastle', governorate: 'النجف', lat: 31.8000, lng: 44.2500, cases: 22, accuracy: 86, animals: 'دواجن', date: '2024-02-08' },
    
    // السعار - Rabies
    { id: 15, disease: 'السعار', diseaseEn: 'Rabies', governorate: 'ديالى', lat: 33.7000, lng: 45.0000, cases: 4, accuracy: 98, animals: 'كلاب', date: '2024-01-30' }
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

// Current user
let currentUser = null;

// Initialize default users
function initializeUsers() {
    if (!localStorage.getItem('raasidUsers')) {
        localStorage.setItem('raasidUsers', JSON.stringify([
            { id: 1, name: 'علي غالب', username: 'admin', password: 'admin123', role: 'admin', status: 'active', date: '2024-01-01' },
            { id: 2, name: 'محمد علي', username: 'manager', password: 'manager123', role: 'manager', status: 'active', date: '2024-01-15' },
            { id: 3, name: 'سارة كريم', username: 'super', password: 'super123', role: 'supervisor', status: 'active', date: '2024-02-01' },
            { id: 4, name: 'خالد عمر', username: 'user1', password: 'user123', role: 'supervisor', status: 'active', date: '2024-03-01' }
        ]));
    }
}

// Login function
function login(username, password) {
    const users = JSON.parse(localStorage.getItem('raasidUsers') || '[]');
    return users.find(u => u.username === username && u.password === password && u.status === 'active');
}

// Logout function
function logout() {
    localStorage.removeItem('raasidCurrentUser');
    currentUser = null;
    location.reload();
}

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
            if (!perms.canManageUsers) {
                showToast('ليس لديك صلاحية عرض المستخدمين', 'error');
                return false;
            }
            break;
        case 'addUser':
            if (!perms.canAddUsers) {
                showToast('ليس لديك صلاحية إضافة مستخدمين', 'error');
                return false;
            }
            break;
        case 'deleteUser':
            if (!perms.canDeleteUsers) {
                showToast('ليس لديك صلاحية حذف مستخدمين', 'error');
                return false;
            }
            break;
        case 'editSettings':
            if (!perms.canEditSettings) {
                showToast('ليس لديك صلاحية تعديل الإعدادات', 'error');
                return false;
            }
            break;
        case 'manageDiseases':
            if (!perms.canManageDiseases) {
                showToast('ليس لديك صلاحية إدارة الأمراض', 'error');
                return false;
            }
            break;
    }
    return true;
}

// Initialize diseases from localStorage - always reload with new data
function initializeDiseases() {
    const defaultDiseases = [
        // Diseases of Cattle (أمراض الأبقار)
        { id: 1, name: 'الحمى القلاعية (FMD)', nameEn: 'Foot and Mouth Disease', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الأبقار', description: 'أخطر الأمراض المعدية للماشية - مرض فيروسي حاد يصيب الحيوانات ذات الظلف المنشطر', affectedAnimals: 'الأبقار، الأغنام، الماعز، الخنازير', mortalityRate: '5% (الأبقار) - 70% (الخنازير الصغيرة)', symptoms: 'حمى عالية (40-41°C)، تقرحات في الفم والضرع والقدمين، إفراز لعاب وفير، عرج، فقدان الشهية، اكتئاب', transmission: 'التلامس المباشر، الهواء، المنتجات الحيوانية الملوثة، الأحذية والملابس', prevention: 'التباعد الجغرافي، التطهير، الحجر الصحي، التطعيمات', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 2, name: 'جرب الماشية (LSD)', nameEn: 'Lumpy Skin Disease', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الأبقار', description: 'مرض فيروسي معدٍ يصيب الجلد يسبب عقيدات وتورمات مؤلمة', affectedAnimals: 'الأبقار (جميع الأعمار)', mortalityRate: '10% - 75%', symptoms: 'عقيدات جلدية متعددة (1-5 سم)، حمى، إفرازات من الأنف والعيون، تورم الغدد الليمفاوية، عرج', transmission: 'النواقل (البعوض، الذباب، القراد)، التلامس المباشر', prevention: 'مكافحة النواقل، التطعيمات، العزل', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 3, name: 'الأنثراكس', nameEn: 'Anthrax', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الأبقار', description: 'مرض بكتيري قاتل يسبب نفوق مفاجئ', affectedAnimals: 'جميع الماشية، الإنسان', mortalityRate: '100% بدون علاج', symptoms: 'حمى، نزيف من فتحات الجسم، نفوق مفاجئ دون أعراض سابقة', transmission: 'التربة الملوثة، ابتلاع الجراثيم', prevention: 'التطعيمات، حرق الجثث، تجنب التلامس', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 4, name: 'حمى الوادي المتصدع', nameEn: 'Rift Valley Fever', oieStatus: 'قائمة الأمراض المشتركة', category: 'أمراض الأبقار', description: 'مرض فيروسي ينتقل عن طريق البعوض', affectedAnimals: 'الأبقار، الأغنام، الماعز، الإبل', mortalityRate: '30% - 100% في الحيوانات الصغيرة', symptoms: 'حمى، إجهاض، نزيف، يرقان، إسهال', transmission: 'البعوض (Aedes, Culex)، التلامس مع أنسجة الحيوانات', prevention: 'مكافحة البعوض، التطعيمات', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 5, name: 'التهاب الضرع', nameEn: 'Mastitis', oieStatus: 'مرض إنتاجي', category: 'أمراض الأبقار', description: 'عدوى بكتيرية في الضرع تؤثر على إنتاج الحليب', affectedAnimals: 'الأبقار، الجاموس، الأغنام، الماعز', mortalityRate: '2%', symptoms: 'تورم الضرع، إفرازات حليب صفراء أو دموية، حمى، فقدان الشهية', transmission: 'البكتيريا من البيئة', prevention: 'النظافة، المعالجة الوقائية', riskLevel: 'medium', status: 'active', source: 'FAO', isOutbreak: false },
        { id: 6, name: 'مرض البقر المجنون', nameEn: 'BSE (Mad Cow Disease)', oieStatus: 'قائمة الأمراض المشتركة', category: 'أمراض الأبقار', description: 'مرض تنكسي يؤثر على الجهاز العصبي', affectedAnimals: 'الأبقار', mortalityRate: '100%', symptoms: 'تغييرات سلوكية، فقدان التنسيق، شلل', transmission: 'تناول علف ملوث', prevention: 'منع تغذية الحيوانية', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        { id: 7, name: 'الإسهال الفيروسي للبقر', nameEn: 'BVD', oieStatus: 'قائمة الأمراض الحيوانية', category: 'أمراض الأبقار', description: 'مرض فيروسي يسبب الإسهال والجهاز التنفسي', affectedAnimals: 'الأبقار', mortalityRate: '5% - 30%', symptoms: 'إسهال، حمى، قرحات الفم، إجهاض', transmission: 'التلامس المباشر، الإفرازات', prevention: 'التطعيمات، العزل', riskLevel: 'medium', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        { id: 8, name: 'التهاب الكبد المعدي', nameEn: 'Infectious Bovine Rhinotracheitis', oieStatus: 'قائمة الأمراض الحيوانية', category: 'أمراض الأبقار', description: 'مرض فيروسي يصيب الجهاز التنفسي', affectedAnimals: 'الأبقار', mortalityRate: '2% - 10%', symptoms: 'سيلان أنفي، حمى، سعال، تقرحات الأنف', transmission: 'التلامس المباشر، الهواء', prevention: 'التطعيمات، العزل', riskLevel: 'medium', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        
        // Diseases of Sheep and Goats
        { id: 9, name: 'الطاعون الغذائي (PPR)', nameEn: 'Peste des Petits Ruminants', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الأغنام والماعز', description: 'مرض فيروسي حاد - وباء الماعز - قابل للاستئصال', affectedAnimals: 'الماعز، الأغنام', mortalityRate: '90% الماعز، 30% الأغنام', symptoms: 'حمى (41°C)، إسهال دموي، تقرحات الفم، إفرازات أنفية وعينية، اكتئاب', transmission: 'التلامس المباشر مع الحيوانات المريضة', prevention: 'التطعيمات، العزل، برامج الاستئصال', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 10, name: 'الجدري', nameEn: 'Sheep and Goat Pox', oieStatus: 'قائمة الأمراض المشتركة', category: 'أمراض الأغنام والماعز', description: 'مرض فيروسي يصيب الأغنام والماعز', affectedAnimals: 'الأغنام، الماعز', mortalityRate: '5% - 50%', symptoms: 'عقيدات جلدية، حمى، إفرازات أنفية، تقرحات في الفم، إجهاض', transmission: 'التلامس المباشر، النواقل', prevention: 'التطعيمات، العزل', riskLevel: 'medium', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        { id: 11, name: 'مرض الكبد المعدي للأغنام', nameEn: 'Contagious Agalactia', oieStatus: 'قائمة الأمراض المشتركة', category: 'أمراض الأغنام والماعز', description: 'مرض بكتيري يصيب الأغنام والماعز', affectedAnimals: 'الأغنام، الماعز', mortalityRate: '30% - 50%', symptoms: 'حمى، إجهاض، عمى، شلل', transmission: 'التلامس المباشر، الحشرات', prevention: 'التطعيمات، العزل', riskLevel: 'medium', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        
        // Diseases of Poultry
        { id: 12, name: 'مرض نيوكاسل', nameEn: 'Newcastle Disease', oieStatus: 'قائمة الأمراض المشتركة', category: 'أمراض الدواجن', description: 'مرض فيروسي معدٍ للدواجن', affectedAnimals: 'الدواجن، الطيور', mortalityRate: '100% في السلالات القوية', symptoms: 'أعراض تنفسية، عصبية، إسهال، انخفاض إنتاج البيض، موت مفاجئ', transmission: 'الطيور البرية، التلامس المباشر', prevention: 'التطعيمات، الأمن البيولوجي', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 13, name: 'مرض الجمبورو', nameEn: 'Infectious Bursal Disease (Gumboro)', oieStatus: 'قائمة الأمراض الحيوانية', category: 'أمراض الدواجن', description: 'مرض فيروسي يصيب جهاز المناعة لدى الدواجن', affectedAnimals: 'الدواجن (3-6 أسابيع)', mortalityRate: '20% - 50%', symptoms: 'رعشة، إسهال مائي، جفاف، ريش متساقط، فقر دم', transmission: 'البراز، الماء، العلف الملوث، المعدات', prevention: 'الأمن البيولوجي، التطعيمات', riskLevel: 'medium', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        { id: 14, name: 'أنفلونزا الطيور', nameEn: 'Avian Influenza', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الدواجن', description: 'مرض فيروسي معدٍ ومميت للطيور', affectedAnimals: 'الدواجن، الطيور البرية', mortalityRate: '100% في السلالات المميتة', symptoms: 'أعراض تنفسية، عصبية، إسهال، نفوق مفاجئ', transmission: 'الطيور البرية، التلامس المباشر', prevention: 'الأمن البيولوجي، الذبح', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 15, name: 'مرض مارك', nameEn: 'Marek\'s Disease', oieStatus: 'قائمة الأمراض الحيوانية', category: 'أمراض الدواجن', description: 'مرض فيروسي يسبب أوراماً', affectedAnimals: 'الدواجن', mortalityRate: '50% - 80%', symptoms: 'شلل، أورام، عمى', transmission: 'الريش الملوث، الهواء', prevention: 'التطعيمات', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        
        // Diseases of Camels
        { id: 16, name: 'مرض التربانوسوما', nameEn: 'Trypanosomiasis (Surra)', oieStatus: 'قائمة الأمراض المشتركة', category: 'أمراض الإبل', description: 'مرض طفيلي ينتقل عن طريق الذباب', affectedAnimals: 'الإبل، الخيول، الماشية', mortalityRate: '30% - 50%', symptoms: 'حمى، فقر دم، فقدان وزن، وذمات', transmission: 'ذباب تسي تسي، الذباب الأسود', prevention: 'مكافحة النواقل، العلاج الوقائي', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        
        // Diseases of Horses
        { id: 17, name: 'الأنفلونزا equine', nameEn: 'Equine Influenza', oieStatus: 'قائمة الأمراض المشتركة', category: 'أمراض الخيول', description: 'مرض فيروسي تنفسي', affectedAnimals: 'الخيول', mortalityRate: 'low', symptoms: 'سعال، حمى، إفرازات أنفية', transmission: 'الهواء، التلامس المباشر', prevention: 'التطعيمات', riskLevel: 'medium', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        
        // Diseases of Pigs
        { id: 18, name: 'حمى الخنازير الأفريقية', nameEn: 'African Swine Fever', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الخنازير', description: 'مرض فيروسي مميت للخنازير', affectedAnimals: 'الخنازير', mortalityRate: '100%', symptoms: 'حمى عالية، نزيف، موت مفاجئ', transmission: 'القراد، التلامس المباشر', prevention: 'الذبح، السيطرة على الحركة', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 19, name: 'حمى الخنازير الكلاسيكية', nameEn: 'Classical Swine Fever', oieStatus: 'قائمة الأمراض المشتركة (List A)', category: 'أمراض الخنازير', description: 'مرض فيروسي مميت', affectedAnimals: 'الخنازير', mortalityRate: '100%', symptoms: 'حمى، نزيف، فشل نمو', transmission: 'التلامس المباشر، المعدات', prevention: 'التطعيمات، الذبح', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        
        // Zoonotic Diseases (الأمراض المشتركة)
        { id: 20, name: 'السعار', nameEn: 'Rabies', oieStatus: 'قائمة الأمراض المشتركة', category: 'الأمراض المشتركة', description: 'مرض فيروسي قاتل يؤثر على الجهاز العصبي', affectedAnimals: 'جميع الثدييات، الإنسان', mortalityRate: '100% بعد ظهور الأعراض', symptoms: 'تغييرات سلوكية، شلل، خوف من الماء، عدوانية', transmission: 'عض الحيوانات المصابة', prevention: 'التطعيمات، معالجة الجروح', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: true },
        { id: 21, name: 'السل البقري', nameEn: 'Bovine Tuberculosis', oieStatus: 'قائمة الأمراض المشتركة', category: 'الأمراض المشتركة', description: 'مرض بكتيري مزمن', affectedAnimals: 'الأبقار، الإنسان', mortalityRate: '50%', symptoms: 'سعال مزمن، فقدان وزن، عقد ليمفاوية', transmission: 'التلامس، استنشاق', prevention: 'الفحص، الذبح', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        { id: 22, name: 'البروسيلوز', nameEn: 'Brucellosis', oieStatus: 'قائمة الأمراض المشتركة', category: 'الأمراض المشتركة', description: 'مرض بكتيري معدٍ', affectedAnimals: 'الأبقار، الماعز، الأغنام، الإنسان', mortalityRate: 'low', symptoms: 'إجهاض، حمى، آلام المفاصل', transmission: 'التلامس مع الإجهاض، منتجات الألبان', prevention: 'التطعيمات، الفحص', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        
        // Metabolic Diseases
        { id: 23, name: 'حمى الحليب', nameEn: 'Milk Fever (Hypocalcemia)', oieStatus: 'أمراض الأيض', category: 'أمراض الأيض', description: 'نقص الكالسيوم بعد الولادة', affectedAnimals: 'الأبقار، الأغنام، الماعز', mortalityRate: 'varies', symptoms: 'شلل، ارتعاش، نفوق', transmission: 'لا يوجد', prevention: 'التغذية المتوازنة', riskLevel: 'medium', status: 'active', source: 'FAO', isOutbreak: false },
        { id: 24, name: 'ال ketosis', nameEn: 'Ketosis', oieStatus: 'أمراض الأيض', category: 'أمراض الأيض', description: 'اضطراب الأيض', affectedAnimals: 'الأبقار', mortalityRate: 'low', symptoms: 'فقدان شهية، رائحة أسيتون', transmission: 'لا يوجد', prevention: 'التغذية السليمة', riskLevel: 'medium', status: 'active', source: 'FAO', isOutbreak: false },
        
        // Bee Diseases
        { id: 25, name: 'التيفوس النحلي', nameEn: 'American Foulbrood', oieStatus: 'أمراض النحل', category: 'أمراض النحل', description: 'مرض بكتيري مدمر للنحل', affectedAnimals: 'النحل', mortalityRate: '100% في الحالات الشديدة', symptoms: 'يرقات ميتة برائحة كريهة', transmission: 'التغذية، المعدات', prevention: 'التطهير، تدمير الخلية', riskLevel: 'high', status: 'active', source: 'WOAH/OIE', isOutbreak: false },
        
        // Fish Diseases
        { id: 26, name: 'أمراض الأسماك الفيروسية', nameEn: 'Fish Viral Disease', oieStatus: 'أمراض الأسماك', category: 'أمراض الأسماك', description: 'أمراض فيروسية تصيب الأسماك', affectedAnimals: 'الأسماك', mortalityRate: 'varies', symptoms: 'أعراض جلدية، فشل نشاط', transmission: 'الماء الملوث', prevention: 'النظافة، الحجر', riskLevel: 'medium', status: 'active', source: 'FAO', isOutbreak: false }
    ];
    localStorage.setItem('raasidDiseases', JSON.stringify(defaultDiseases));
}

// Get all diseases
function getDiseases() {
    return JSON.parse(localStorage.getItem('raasidDiseases') || '[]');
}

// Add new disease
function addDisease(disease) {
    if (!checkPermission('manageDiseases')) return;
    
    const diseases = getDiseases();
    const newDisease = {
        id: Date.now(),
        ...disease,
        status: 'active'
    };
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
                <div>
                    ${outbreakBadge}
                    <span class="${riskClass}">${riskLabel}</span>
                </div>
            </div>
            ${disease.nameEn ? `<p style="color: var(--text-secondary); font-size: 0.85rem;"><em>${disease.nameEn}</em></p>` : ''}
            <p>${disease.description}</p>
            <div class="disease-info">
                <i class="fas fa-paw"></i> <strong>الحيوانات:</strong> ${disease.affectedAnimals}
            </div>
            <div class="disease-info">
                <i class="fas fa-percentage"></i> <strong>نسبة النفوق:</strong> ${disease.mortalityRate}
            </div>
            ${disease.oiStatus ? `
            <div class="disease-info">
                <i class="fas fa-globe"></i> <strong>الوضع في WOAH:</strong> ${disease.oiStatus}
            </div>
            ` : ''}
            ${disease.transmission ? `
            <div class="disease-info">
                <i class="fas fa-spread"></i> <strong>طرق الانتقال:</strong> ${disease.transmission}
            </div>
            ` : ''}
            <div class="disease-symptoms">
                <strong>الأعراض:</strong> ${disease.symptoms}
            </div>
            ${disease.source ? `
            <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-secondary);">
                <i class="fas fa-source"></i> المصدر: ${disease.source}
            </div>
            ` : ''}
            ${perms.canManageDiseases ? `
            <div style="margin-top: 10px; display: flex; gap: 5px;">
                <button class="btn btn-sm btn-primary" onclick="showEditDiseaseModal(${disease.id})">
                    <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteDisease(${disease.id})">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
            ` : ''}
        </div>`;
    });
    
    const container = document.getElementById('diseasesGrid');
    if (container) {
        container.innerHTML = html;
    }
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
    
    if (diseaseId) {
        editDisease(parseInt(diseaseId), disease);
    } else {
        addDisease(disease);
    }
    
    closeDiseaseModal();
}

// Close disease modal
function closeDiseaseModal() {
    document.getElementById('diseaseModal').classList.remove('show');
    document.getElementById('diseaseForm').reset();
}

// Check authentication
function checkAuth() {
    const userData = localStorage.getItem('raasidCurrentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        applyPermissions();
        return true;
    }
    return false;
}

// Apply permissions to UI
function applyPermissions() {
    const perms = getUserPermissions(currentUser.role);
    
    // Update user info
    document.getElementById('displayUsername').textContent = currentUser.name;
    document.getElementById('userRole').textContent = perms.name;
    document.getElementById('heroSubtitle').textContent = 'مرحباً بك يا ' + currentUser.name + ' في لوحة التحكم';
    
    // Show/hide admin sections
    if (perms.canManageUsers) {
        document.getElementById('nav-users-link').style.display = 'block';
    }
    if (perms.canEditSettings) {
        document.getElementById('nav-settings-link').style.display = 'block';
    }
    
    // Show main app
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    // Initialize components
    loadUsersTable();
    initAll();
}

// Show public page (visitor)
function showPublicPage() {
    currentUser = { name: 'زائر', role: 'visitor' };
    applyPermissions();
}

// Show section
function showSection(sectionId) {
    // Check permissions first
    if (currentUser) {
        const perms = getUserPermissions(currentUser.role);
        if (sectionId === 'users' && !perms.canManageUsers) {
            showToast('ليس لديك صلاحية عرض هذه الصفحة', 'error');
            sectionId = 'home';
        }
        if (sectionId === 'settings' && !perms.canEditSettings) {
            showToast('ليس لديك صلاحية عرض هذه الصفحة', 'error');
            sectionId = 'home';
        }
    }
    
    // Hide all sections
    document.querySelectorAll('.section-page').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
        s.style.display = 'none';
    });
    
    // Show target section
    const target = document.getElementById(sectionId + 'Section');
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
        target.style.display = 'block';
    }
    
    // Update nav
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const navLink = document.getElementById('nav-' + sectionId);
    if (navLink) {
        navLink.classList.add('active');
    }
    
    // Reinitialize map when showing map section
    if (sectionId === 'map') {
        setTimeout(function() {
            const mapContainer = document.getElementById('map');
            if (mapContainer && mapContainer._leaflet_id) {
                mapContainer._leaflet_id = null;
            }
            initMap();
        }, 300);
    }
    
    // Reinitialize charts when showing stats section
    if (sectionId === 'stats') {
        setTimeout(function() {
            initCharts();
        }, 300);
    }
}

// Load users table
function loadUsersTable() {
    const users = JSON.parse(localStorage.getItem('raasidUsers') || '[]');
    const perms = getUserPermissions(currentUser ? currentUser.role : 'visitor');
    
    let html = '';
    users.forEach(user => {
        const roleLabel = user.role === 'admin' ? 'مدير نظام' : 
                         user.role === 'manager' ? 'مدير' : 'مشرف';
        const roleClass = user.role === 'admin' ? 'role-admin' : 
                         user.role === 'manager' ? 'role-manager' : 'role-supervisor';
        const statusBadge = user.status === 'active' ? 
            '<span style="color:green"><i class="fas fa-check-circle"></i> نشط</span>' : 
            '<span style="color:red"><i class="fas fa-times-circle"></i> غير نشط</span>';
        
        html += `<tr>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td><span class="role-badge ${roleClass}">${roleLabel}</span></td>
            <td>${statusBadge}</td>
            <td>${user.date}</td>
            <td>
                ${perms.canDeleteUsers ? `<button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})"><i class="fas fa-trash"></i></button>` : '-'}
            </td>
        </tr>`;
    });
    document.getElementById('usersTableBody').innerHTML = html;
}

// Add user
function addUser(name, username, password, role) {
    const users = JSON.parse(localStorage.getItem('raasidUsers') || '[]');
    
    // Check if username exists
    if (users.find(u => u.username === username)) {
        showToast('اسم المستخدم موجود مسبقاً', 'error');
        return;
    }
    
    users.push({
        id: Date.now(),
        name,
        username,
        password,
        role,
        status: 'active',
        date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('raasidUsers', JSON.stringify(users));
    loadUsersTable();
    showToast('تم إضافة المستخدم بنجاح', 'success');
}

// Delete user
function deleteUser(id) {
    if (!checkPermission('deleteUser')) return;
    
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
        let users = JSON.parse(localStorage.getItem('raasidUsers') || '[]');
        
        // Prevent deleting self
        if (id === currentUser.id) {
            showToast('لا يمكنك حذف حسابك الحالي', 'error');
            return;
        }
        
        users = users.filter(u => u.id !== id);
        localStorage.setItem('raasidUsers', JSON.stringify(users));
        loadUsersTable();
        showToast('تم حذف المستخدم بنجاح', 'success');
    }
}

// Show add user modal
function showAddUserModal() {
    if (!checkPermission('addUser')) return;
    
    // Show/hide admin role option based on current user role
    const adminOption = document.getElementById('adminRoleOption');
    if (adminOption) {
        if (currentUser && currentUser.role === 'admin') {
            adminOption.style.display = 'block';
        } else {
            adminOption.style.display = 'none';
        }
    }
    
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
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ==================== AI Disease Analysis System ====================
// Comprehensive veterinary disease diagnostic AI

// Disease database with detailed scientific information
const aiDiseaseDatabase = [
    {
        id: 1,
        name: 'الحمى القلاعية (FMD)',
        nameEn: 'Foot and Mouth Disease',
        cause: 'الفيروس الفموي الظلفية (FMDV) - عائلة Picornaviridae',
        affectedAnimals: 'الأبقار، الأغنام، الماعز، الخنازير، الجاموس',
        symptoms: ['حمى عالية (40-41°C)', 'تقرحات في الفم والضرع والقدمين', 'إفراز لعاب وفير', 'عرج', 'فقدان الشهية', 'اكتئاب', 'إفرازات أنفية'],
        transmission: 'التلامس المباشر مع الحيوانات المريضة، الهواء، المنتجات الحيوانية الملوثة، الأحذية والملابس، المعدات',
        incubation: '2-14 يوم',
        mortality: '5% في الأبقار البالغة، حتى 70% في الخنازير الصغيرة',
        diagnosis: 'فحص سريري، ELISA، RT-PCR، زراعة الخلايا',
        treatment: 'لا يوجد علاج محدد - العلاج الداعم فقط',
        prevention: 'التباعد الجغرافي، التطهير، الحجر الصحي، التطعيمات الروتينية',
        vaccines: 'لقاحات inactivated متعددة التكافؤ',
        control: 'الإبلاغ الفوري، ذبح الحيوانات المصابة، التطهير الشامل',
        references: 'WOAH (المنظمة العالمية لصحة الحيوان)',
        riskLevel: 'high',
        recommendations: [
            'عزل الحيوانات المصابة فوراً',
            'إبلاغ الطبيب البيطري المحلي',
            'تطهير جميع المعدات والأحذية',
            'منع حركة الحيوانات',
            'بدء برنامج تطعيمي',
            'مراقبة الحيوانات المحيطة'
        ]
    },
    {
        id: 2,
        name: 'جرب الماشية (LSD)',
        nameEn: 'Lumpy Skin Disease',
        cause: 'virus Capripoxvirus - عائلة Poxviridae',
        affectedAnimals: 'الأبقار (جميع الأعمار)',
        symptoms: ['عقيدات جلدية متعددة (1-5 سم)', 'حمى', 'إفرازات من الأنف والعيون', 'تورم الغدد الليمفاوية', 'عرج', 'تقرحات على الضرع', 'فقدان الشهية', 'اكتئاب'],
        transmission: 'النواقل (البعوض، الذباب، القراد)، التلامس المباشر',
        incubation: '7-21 يوم',
        mortality: '10% - 75% حسب السلالة',
        diagnosis: 'الفحص السريري، PCR، خزعة جلدية',
        treatment: 'لا يوجد علاج محدد - المضادات الحيوية لمنع العدوى الثانوية',
        prevention: 'مكافحة النواقل، التطعيمات، العزل',
        vaccines: 'لقاح الحيادي (Neethling)',
        control: 'مكافحة النواقل، الذبح الانتقالي، التطعيمات',
        references: 'WOAH',
        riskLevel: 'high',
        recommendations: [
            'مكافحة النواقل (البعوض والذباب)',
            'عزل الحيوانات المصابة',
            'استخدام المضادات الحيوية للعدوى الثانوية',
            'تطهير الحظائر',
            'تطبيق برنامج تطعيمي وقائي',
            'مراقبة مستمرة'
        ]
    },
    {
        id: 3,
        name: 'الطاعون الغذائي (PPR)',
        nameEn: 'Peste des Petits Ruminants',
        cause: 'virus Morbillivirus - عائلة Paramyxoviridae',
        affectedAnimals: 'الماعز (أكثر حساسية)، الأغنام،CAMEL',
        symptoms: ['حمى عالية (41°C)', 'إسهال دموي', 'تقرحات الفم', 'إفرازات أنفية وعينية', 'اكتئاب', 'فقدان الوزن', 'التهاب رئوي', 'تورم الغدد الليمفاوية'],
        transmission: 'التلامس المباشر مع الحيوانات المريضة، الإفرازات التنفسية والهضمية',
        incubation: '3-10 أيام',
        mortality: '90% في الماعز، 30% في الأغنام',
        diagnosis: 'ELISA، RT-PCR، فحص سريري',
        treatment: 'لا يوجد علاج محدد - العلاج الداعم',
        prevention: 'التطعيمات، العزل، برامج الاستئصال',
        vaccines: 'لقاح PPR Lebedev',
        control: 'الإبلاغ، العزل، التطعيمات الجماعية',
        references: 'WOAH',
        riskLevel: 'high',
        recommendations: [
            'عزل الحيوانات المشتبه بها',
            'إبلاغ السلطات البيطرية',
            'تطهير المعدات',
            'منع استيراد الحيوانات من مناطق موبوءة',
            'تطبيق برنامج تطعيمي وقائي',
            'مراقبة الحيوانات لمدة 21 يوم'
        ]
    },
    {
        id: 4,
        name: 'الأنثراكس',
        nameEn: 'Anthrax',
        cause: 'بكتيريا Bacillus anthracis',
        affectedAnimals: 'جميع الماشية، الإنسان',
        symptoms: ['نفوق مفاجئ دون أعراض سابقة', 'حمى', 'نزيف من فتحات الجسم', 'اكتئاب', 'صعوبة في التنفس', 'تورم الرقبة'],
        transmission: 'التربة الملوثة، ابتلاع الجراثيم من المراعي الملوثة',
        incubation: '1-14 يوم',
        mortality: '100% بدون علاج',
        diagnosis: 'فحص مجهري، ثقافة، PCR',
        treatment: 'البنسلين والسيبروفلوكساسين فعالين في المراحل المبكرة',
        prevention: 'التطعيمات السنوية، حرق الجثث، تجنب التلامس',
        vaccines: 'لقاح Sterne',
        control: 'حرق أو دفن الجثث بعمق، تطهير الموقع',
        references: 'WOAH, CDC',
        riskLevel: 'high',
        recommendations: [
            'لا فتح جثث الحيوانات النافقة',
            'إبلاغ الطبيب البيطري فوراً',
            'حرق الجثة في مكانها',
            'تطهير التربة',
            'منع الرعي في المنطقة',
            'علاج وقائي للحيوانات المحيطة'
        ]
    },
    {
        id: 5,
        name: 'حمى الوادي المتصدع',
        nameEn: 'Rift Valley Fever',
        cause: 'virus Phlebovirus - عائلة Phenuiviridae',
        affectedAnimals: 'الأبقار، الأغنام، الماعز، الإبل',
        symptoms: ['حمى', 'إجهاض', 'نزيف', 'يرقان', 'إسهال', 'موت حديثي الولادة', 'التهاب العين'],
        transmission: 'البعوض (Aedes, Culex)، التلامس مع أنسجة الحيوانات',
        incubation: '2-6 أيام',
        mortality: '30-100% في الحيوانات الصغيرة',
        diagnosis: 'PCR، ELISA',
        treatment: 'لا يوجد علاج - العلاج الداعم',
        prevention: 'مكافحة البعوض، التطعيمات',
        vaccines: 'لقاح MVRI',
        control: 'مكافحة النواقل، التطعيمات',
        references: 'WOAH, FAO',
        riskLevel: 'high',
        recommendations: [
            'مكافحة بعوض Aedes',
            'تطبيق برنامج تطعيمي',
            'تجنب ذبح الحيوانات في موسم الأمطار',
            'استخدام الناموسيات',
            'إبلاغ الحالات المشتبه بها',
            'مراقبة الإجهاض'
        ]
    },
    {
        id: 6,
        name: 'مرض نيوكاسل',
        nameEn: 'Newcastle Disease',
        cause: 'virus Paramyxovirus 1',
        affectedAnimals: 'الدواجن (الدجاج، الرومي، الحمام، النعام)',
        symptoms: ['أعراض تنفسية (سعال، صفير)', 'أعراض عصبية (شلل، دوران)', 'إسهال أخضر', 'انخفاض إنتاج البيض', 'تورم الجيوب الأنفية', 'موت مفاجئ'],
        transmission: 'الطيور البرية، التلامس المباشر، الهواء، المعدات',
        incubation: '2-15 يوم',
        mortality: '100% في السلالات القوية',
        diagnosis: 'PCR، عزل الفيروس، HA/HI',
        treatment: 'لا يوجد علاج',
        prevention: 'التطعيمات، الأمن البيولوجي',
        vaccines: 'لقاحات (B1, LaSota, Clone 30)',
        control: 'الإبلاغ، الذبح، التطهير',
        references: 'WOAH',
        riskLevel: 'high',
        recommendations: [
            'تطبيق برنامج تطعيمي منتظم',
            'تطبيق الأمن البيولوجي',
            'منعcontact مع الطيور البرية',
            'تطهير المعدات',
            'شراء الطيور من مصادر موثوقة',
            'إبلاغ الحالات المشتبه بها'
        ]
    },
    {
        id: 7,
        name: 'السعار',
        nameEn: 'Rabies',
        cause: 'virus Lyssavirus',
        affectedAnimals: 'جميع الثدييات (الكلاب، القطط، الثعالب، الخفافيش)',
        symptoms: ['تغييرات سلوكية', 'شلل', 'خوف من الماء', 'عدوانية', 'سيلان اللعاب', 'صعوبة في البلع', 'موت'],
        transmission: 'عض الحيوانات المصابة',
        incubation: 'أسابيع إلى شهور',
        mortality: '100% بعد ظهور الأعراض',
        diagnosis: 'مجهري Flourescent Antibody Test',
        treatment: 'لا يوجد علاج - العلاج الوقائي فقط',
        prevention: 'تطعيمات الكلاب والقطط، معالجة الجروح',
        vaccines: 'PEP و Pre-exposure',
        control: 'تطعيم الحيوانات الأليفة',
        references: 'WHO, WOAH',
        riskLevel: 'high',
        recommendations: [
            'تطعيم الحيوانات الأليفة سنوياً',
            'معالجة الجروح فوراً',
            'غسل الجروح بالماء والصابون',
            'استشارة الطبيب',
            'مراقبة الحيوان المصدر',
            'إبلاغ حالات السعار'
        ]
    },
    {
        id: 8,
        name: 'التهاب الضرع',
        nameEn: 'Mastitis',
        cause: 'بكتيريا (Staphylococcus, Streptococcus, E. coli)',
        affectedAnimals: 'الأبقار، الجاموس، الأغنام، الماعز',
        symptoms: ['تورم الضرع', 'إفرازات حليب صفراء أو دموية', 'حمى', 'فقدان الشهية', 'قلة إنتاج الحليب', 'ألم'],
        transmission: 'البكتيريا من البيئة، عدوى أثناء الحلب',
        incubation: '12-72 ساعة',
        mortality: '2% (لكن经济损失 عالية)',
        diagnosis: 'اختبار كاليفورنيا للضرع، مزرعة بكتيرية',
        treatment: 'المضادات الحيوية، مسكنات الألم',
        prevention: 'النظافة، المعالجة الوقائية',
        vaccines: 'لقاحات متاحة',
        control: 'نظافة الحظيرة، الحلابة الصحيحة',
        references: 'FAO',
        riskLevel: 'medium',
        recommendations: [
            'تنظيف الضرع قبل الحلب',
            'استخدام المضادات الحيوية حسب الوصفة',
            'تجفيف الأبقار بشكل صحيح',
            'استخدام بطانيات ضرع',
            'فحص الخلايا الجسدية بانتظام',
            'عزل الأبقار المصابة'
        ]
    },
    {
        id: 9,
        name: 'مرض الجمبورو',
        nameEn: 'Infectious Bursal Disease (Gumboro)',
        cause: 'virus Birnavirus',
        affectedAnimals: 'الدواجن (3-6 أسابيع)',
        symptoms: ['رعشة', 'إسهال مائي', 'جفاف', 'ريش متساقط', 'فقر دم', 'فقدان الشهية', 'نتوء حول فتحة الشرج'],
        transmission: 'البراز، الماء، العلف الملوث، المعدات',
        incubation: '2-3 أيام',
        mortality: '20-50%',
        diagnosis: 'PCR، فحص سريري، تشريح',
        treatment: 'لا يوجد علاج محدد',
        prevention: 'الأمن البيولوجي، التطعيمات',
        vaccines: 'لقاحات حية ومُ inactivated',
        control: 'التطهير، برنامج تطعيمي',
        references: 'WOAH',
        riskLevel: 'medium',
        recommendations: [
            'تطبيق برنامج تطعيمي',
            'تحسين الأمن البيولوجي',
            'تطهير الحظائر',
            'تحسين التغذية',
            'تجنب الضغط على الطيور',
            'مراقبة مستمرة'
        ]
    },
    {
        id: 10,
        name: 'الجدري',
        nameEn: 'Sheep and Goat Pox',
        cause: 'virus Capripoxvirus',
        affectedAnimals: 'الأغنام، الماعز',
        symptoms: ['عقيدات جلدية', 'حمى', 'إفرازات أنفية', 'تقرحات في الفم', 'إجهاض', 'موت في الحيوانات الصغيرة'],
        transmission: 'التلامس المباشر، النواقل',
        incubation: '4-21 يوم',
        mortality: '5% - 50%',
        diagnosis: 'PCR، فحص سريري',
        treatment: 'لا يوجد علاج',
        prevention: 'التطعيمات، العزل',
        vaccines: 'لقاح RM65',
        control: 'العزل، التطعيمات',
        references: 'WOAH',
        riskLevel: 'medium',
        recommendations: [
            'تطبيق برنامج تطعيمي',
            'عزل الحيوانات المصابة',
            'مكافحة النواقل',
            'تطهير المعدات',
            'تجنب الرعي في مناطق موبوءة',
            'إبلاغ الحالات'
        ]
    }
];

// Symptom matching algorithm
function matchSymptoms(inputSymptoms, disease) {
    const input = inputSymptoms.toLowerCase();
    const symptomMatches = disease.symptoms.filter(s => 
        input.includes(s.toLowerCase().split(' ')[0]) ||
        input.includes(s.toLowerCase().split(' ')[1])
    );
    return (symptomMatches.length / disease.symptoms.length) * 100;
}

// Calculate disease probability based on symptoms
function calculateProbability(symptoms, disease) {
    const matchScore = matchSymptoms(symptoms, disease);
    const baseScore = matchScore * 0.7;
    const animalMatch = 30;
    return Math.min(95, baseScore + animalMatch);
}

// Analyze disease with AI
function analyzeDisease() {
    const symptoms = document.getElementById('symptomsInput').value.trim();
    const animalType = document.getElementById('animalTypeAI') ? document.getElementById('animalTypeAI').value : 'all';
    
    if (!symptoms) {
        showToast('يرجى إدخال الأعراض', 'error');
        return;
    }
    
    const btn = event.target;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحليل بالذكاء الاصطناعي...';
    btn.disabled = true;
    
    // Simulate AI processing delay
    setTimeout(() => {
        // Filter by animal type if specified
        let relevantDiseases = aiDiseaseDatabase;
        if (animalType && animalType !== 'all') {
            relevantDiseases = aiDiseaseDatabase.filter(d => 
                d.affectedAnimals.toLowerCase().includes(animalType)
            );
            if (relevantDiseases.length === 0) {
                relevantDiseases = aiDiseaseDatabase;
            }
        }
        
        // Calculate probabilities
        const results = relevantDiseases.map(disease => ({
            ...disease,
            probability: calculateProbability(symptoms, disease)
        })).sort((a, b) => b.probability - a.probability);
        
        // Get top result
        const topResult = results[0];
        
        // Update UI
        const resultDiv = document.getElementById('aiResult');
        const diseaseNameEl = document.getElementById('diseaseName');
        const confidenceEl = document.getElementById('confidencePercent');
        const confidenceBar = document.getElementById('confidenceBar');
        
        if (diseaseNameEl) diseaseNameEl.textContent = topResult.name;
        if (confidenceEl) confidenceEl.textContent = topResult.probability.toFixed(0) + '%';
        if (confidenceBar) {
            confidenceBar.style.width = topResult.probability + '%';
            confidenceBar.style.background = topResult.probability > 70 ? 
                'linear-gradient(90deg, #D32F2F, #FF5722)' : 
                topResult.probability > 50 ? 
                'linear-gradient(90deg, #FFA000, #FF5722)' : 
                'linear-gradient(90deg, #388E3C, #8BC34A)';
        }
        
        if (resultDiv) {
            resultDiv.classList.add('show');
            
            // Add detailed information
            let detailedInfo = `
                <div style="margin-top: 1rem; padding: 1rem; background: #f9f9f9; border-radius: 8px;">
                    <h4 style="color: var(--primary); margin-bottom: 0.75rem;">
                        <i class="fas fa-info-circle"></i> معلومات علمية تفصيلية
                    </h4>
                    
                    <p><strong><i class="fas fa-virus"></i> المسبب:</strong> ${topResult.cause}</p>
                    <p><strong><i class="fas fa-paw"></i> الحيوانات المعرضة:</strong> ${topResult.affectedAnimals}</p>
                    <p><strong><i class="fas fa-clock"></i> فترة الحضانة:</strong> ${topResult.incubation}</p>
                    <p><strong><i class="fas fa-skull-crossbones"></i> نسبة النفوق:</strong> ${topResult.mortality}</p>
                    <p><strong><i class="fas fa-spread"></i> طرق الانتقال:</strong> ${topResult.transmission}</p>
                    <p><strong><i class="fas fa-microscope"></i> التشخيص:</strong> ${topResult.diagnosis}</p>
                    <p><strong><i class="fas fa-pills"></i> العلاج:</strong> ${topResult.treatment}</p>
                    <p><strong><i class="fas fa-shield-virus"></i> الوقاية:</strong> ${topResult.prevention}</p>
                    <p><strong><i class="fas fa-syringe"></i> اللقاحات:</strong> ${topResult.vaccines}</p>
                    <p><strong><i class="fas fa-globe-americas"></i> المصدر:</strong> ${topResult.references}</p>
                </div>
                
                <div class="recommendations">
                    <h4><i class="fas fa-clipboard-check"></i> التوصيات والإجراءات المطلوبة:</h4>
                    <ul>
                        ${topResult.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-top: 1rem; padding: 0.75rem; background: #E3F2FD; border-radius: 8px; border-right: 4px solid #0D47A1;">
                    <strong><i class="fas fa-exclamation-triangle"></i> تحذير:</strong> 
                    هذا التحليل استرشادي فقط. يرجى استشارة طبيب بيطري معتمد للتشخيص النهائي والعلاج.
                </div>
            `;
            
            // Add other possible diseases
            if (results.length > 1) {
                detailedInfo += `
                    <div style="margin-top: 1rem;">
                        <h5 style="color: var(--text-secondary);">أمراض أخرى محتملة:</h5>
                        ${results.slice(1, 4).map((d, i) => `
                            <div style="padding: 0.5rem; background: white; border-radius: 4px; margin-top: 0.5rem; display: flex; justify-content: space-between;">
                                <span>${i + 2}. ${d.name}</span>
                                <span style="color: ${d.probability > 50 ? '#FFA000' : '#388E3C'}; font-weight: bold;">${d.probability.toFixed(0)}%</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            // Insert detailed info after the result
            const existingInfo = resultDiv.querySelector('.detailed-info');
            if (existingInfo) {
                existingInfo.innerHTML = detailedInfo;
            } else {
                resultDiv.innerHTML += `<div class="detailed-info">${detailedInfo}</div>`;
            }
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
    
    if (!animalType || !governorate || !symptoms) {
        showToast('يرجى إكمال جميع الحقول المطلوبة', 'error');
        return;
    }
    
    showToast('تم إرسال البلاغ بنجاح', 'success');
    document.getElementById('reportForm').reset();
}

// Initialize map
// Initialize interactive map
function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl) return;
    
    // Clean up old map
    if (mapEl._leaflet_id) {
        mapEl._leaflet_id = null;
    }
    
    // Create new map centered on Iraq
    map = L.map('map').setView([33.3152, 44.3661], 6);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);
    
    // Add scale control
    L.control.scale().addTo(map);
    
    // Add zoom control
    L.control.zoom({
        position: 'topright'
    }).addTo(map);
    
    // Create markers layer
    markersLayer = L.layerGroup().addTo(map);
    
    // Populate filter dropdowns
    populateMapFilters();
    
    // Display all outbreak markers
    displayOutbreakMarkers();
}

// Populate map filter dropdowns
function populateMapFilters() {
    const diseaseFilter = document.getElementById('diseaseFilter');
    const governorateFilter = document.getElementById('governorateFilter');
    
    if (!diseaseFilter || !governorateFilter) return;
    
    // Get unique diseases from outbreak locations
    const diseases = [...new Set(outbreakLocations.map(o => o.disease))];
    
    // Populate disease filter
    diseaseFilter.innerHTML = '<option value="all">كل الأمراض</option>';
    diseases.forEach(disease => {
        diseaseFilter.innerHTML += `<option value="${disease}">${disease}</option>`;
    });
    
    // Populate governorate filter
    governorateFilter.innerHTML = '<option value="all">كل المحافظات</option>';
    iraqiGovernorates.forEach(gov => {
        governorateFilter.innerHTML += `<option value="${gov.name}">${gov.name}</option>`;
    });
}

// Filter map by disease
function filterByDisease(disease) {
    currentDiseaseFilter = disease;
    displayOutbreakMarkers();
}

// Filter map by governorate
function filterByGovernorate(governorate) {
    currentGovernorateFilter = governorate;
    displayOutbreakMarkers();
}

// Display outbreak markers on map
function displayOutbreakMarkers() {
    if (!markersLayer) return;
    
    // Clear existing markers
    markersLayer.clearLayers();
    
    // Filter outbreaks
    let filteredOutbreaks = outbreakLocations;
    
    if (currentDiseaseFilter !== 'all') {
        filteredOutbreaks = filteredOutbreaks.filter(o => o.disease === currentDiseaseFilter);
    }
    
    if (currentGovernorateFilter !== 'all') {
        filteredOutbreaks = filteredOutbreaks.filter(o => o.governorate === currentGovernorateFilter);
    }
    
    // Add markers for each outbreak
    filteredOutbreaks.forEach(outbreak => {
        const color = diseaseColors[outbreak.disease] || '#757575';
        
        // Create circle marker with 5km radius (5000 meters)
        const marker = L.circleMarker([outbreak.lat, outbreak.lng], {
            radius: Math.sqrt(outbreak.cases) * 2,
            fillColor: color,
            color: '#fff',
            weight: 2,
            fillOpacity: 0.7
        });
        
        // Add popup with detailed info
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h4 style="margin: 0 0 10px 0; color: ${color};">${outbreak.disease}</h4>
                <p><strong>المحافظة:</strong> ${outbreak.governorate}</p>
                <p><strong>عدد الحالات:</strong> ${outbreak.cases}</p>
                <p><strong>الحيوانات:</strong> ${outbreak.animals}</p>
                <p><strong>دقة الموقع:</strong> ${outbreak.accuracy}%</p>
                <p><strong>نصف القطر:</strong> 5 كم</p>
                <p><strong>التاريخ:</strong> ${outbreak.date}</p>
            </div>
        `);
        
        markersLayer.addLayer(marker);
    });
    
    // Update statistics display
    updateMapStats(filteredOutbreaks);
}

// Update map statistics
function updateMapStats(outbreaks) {
    const statsContainer = document.getElementById('mapStats');
    if (!statsContainer) return;
    
    const totalCases = outbreaks.reduce((sum, o) => sum + o.cases, 0);
    const uniqueDiseases = [...new Set(outbreaks.map(o => o.disease))].length;
    const uniqueGovernorates = [...new Set(outbreaks.map(o => o.governorate))].length;
    
    statsContainer.innerHTML = `
        <div class="stat-box">
            <span class="stat-number">${outbreaks.length}</span>
            <span class="stat-label">بؤرة تفشي</span>
        </div>
        <div class="stat-box">
            <span class="stat-number">${totalCases}</span>
            <span class="stat-label">حالة</span>
        </div>
        <div class="stat-box">
            <span class="stat-number">${uniqueDiseases}</span>
            <span class="stat-label">مرض</span>
        </div>
        <div class="stat-box">
            <span class="stat-number">${uniqueGovernorates}</span>
            <span class="stat-label">محافظة</span>
        </div>
    `;
}

// Initialize charts
function initCharts() {
    if (document.getElementById('diseaseChart')) {
        // Disease distribution chart
        new Chart(document.getElementById('diseaseChart'), {
            type: 'doughnut',
            data: {
                labels: ['الحمام القلاعية', 'جرب', 'جمبورو', 'PPR', 'أخرى'],
                datasets: [{
                    data: [32, 25, 18, 15, 10],
                    backgroundColor: ['#D32F2F', '#F57F17', '#0D47A1', '#7B1FA2', '#757575']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });

        // Trend chart
        new Chart(document.getElementById('trendChart'), {
            type: 'line',
            data: {
                labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
                datasets: [{
                    label: 'البلاغات',
                    data: [180, 210, 195, 245, 280, 310],
                    borderColor: '#1B5E20',
                    backgroundColor: 'rgba(27,94,32,0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });

        // Governorate chart
        if (document.getElementById('governorateChart')) {
            new Chart(document.getElementById('governorateChart'), {
                type: 'bar',
                data: {
                    labels: ['بغداد', 'البصرة', 'نينوى', 'أربيل', 'كركوك'],
                    datasets: [{
                        label: 'الحالات',
                        data: [156, 89, 134, 67, 78],
                        backgroundColor: ['#D32F2F', '#F57F17', '#0D47A1', '#7B1FA2', '#388E3C']
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }

        // Recovery chart
        if (document.getElementById('recoveryChart')) {
            new Chart(document.getElementById('recoveryChart'), {
                type: 'doughnut',
                data: {
                    labels: ['تعافوا', 'تحت العلاج', 'وفيات'],
                    datasets: [{ data: [85, 12, 3], backgroundColor: ['#388E3C', '#FFA000', '#D32F2F'] }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
            });
        }
    }
}

// Initialize all
function initAll() {
    initMap();
    initCharts();
    initRoles();
    initStudyDiseases();
}

// ==================== Study Diseases Functions ====================

// Comprehensive veterinary diseases database for study section
const studyDiseasesDB = [
    // Cattle Diseases (أ diseases Cattle) - 20 diseases
    { id: 1, name: 'الحمى القلاعية', nameEn: 'Foot and Mouth Disease', category: 'أ diseases Cattle', cause: 'الفيروس الفموي الظلفية (FMDV)', affectedAnimals: 'الأبقار، الأغنام، الماعز، الخنازير', incidenceRate: '70-100%', mortalityRate: '5-70%', vector: 'لا يوجد', transmission: 'التلامس المباشر، الهواء، المنتجات الملوثة', recoveryRate: '90-95%', treatment: 'العلاج الداعم، المضادات الحيوية للعدوى الثانوية', prevention: 'التطعيمات، الحجر الصحي، التباعد', source: 'WOAH' },
    { id: 2, name: 'جرب الماشية', nameEn: 'Lumpy Skin Disease', category: 'أ diseases Cattle', cause: 'virus Capripoxvirus', affectedAnimals: 'الأبقار', incidenceRate: '50-80%', mortalityRate: '10-75%', vector: 'البعوض، الذباب', transmission: 'النواقل، التلامس المباشر', recoveryRate: '25-90%', treatment: 'المضادات الحيوية، مضادات الالتهاب', prevention: 'التطعيمات، مكافحة النواقل', source: 'WOAH' },
    { id: 3, name: 'الأنثراكس', nameEn: 'Anthrax', category: 'أ diseases Cattle', cause: 'بكتيريا Bacillus anthracis', affectedAnimals: 'جميع الماشية، الإنسان', incidenceRate: 'varies', mortalityRate: '100%', vector: 'لا يوجد', transmission: 'التربة الملوثة، ابتلاع الجراثيم', recoveryRate: '0%', treatment: 'البنسلين في المراحل المبكرة', prevention: 'التطعيمات، حرق الجثث', source: 'WOAH' },
    { id: 4, name: 'حمى الوادي المتصدع', nameEn: 'Rift Valley Fever', category: 'أ diseases Cattle', cause: 'virus Phlebovirus', affectedAnimals: 'الأبقار، الأغنام، الماعز، الإبل', incidenceRate: '30-90%', mortalityRate: '30-100%', vector: 'البعوض Aedes', transmission: 'البعوض، التلامس مع الأنسجة', recoveryRate: '0-70%', treatment: 'العلاج الداعم', prevention: 'مكافحة البعوض، التطعيمات', source: 'WOAH' },
    { id: 5, name: 'التهاب الضرع', nameEn: 'Mastitis', category: 'أ diseases Cattle', cause: 'بكتيريا Staphylococcus, Streptococcus', affectedAnimals: 'الأبقار، الجاموس', incidenceRate: '20-40%', mortalityRate: '2-5%', vector: 'لا يوجد', transmission: 'البكتيريا من البيئة', recoveryRate: '95-98%', treatment: 'المضادات الحيوية', prevention: 'النظافة، المعالجة الوقائية', source: 'FAO' },
    { id: 6, name: 'مرض البقر المجنون', nameEn: 'BSE', category: 'أ diseases Cattle', cause: 'بريون', affectedAnimals: 'الأبقار', incidenceRate: 'low', mortalityRate: '100%', vector: 'لا يوجد', transmission: 'تناول علف ملوث', recoveryRate: '0%', treatment: 'لا يوجد علاج', prevention: 'منع تغذية حيوانية', source: 'WOAH' },
    { id: 7, name: 'الإسهال الفيروسي البقري', nameEn: 'BVD', category: 'أ diseases Cattle', cause: 'virus Pestivirus', affectedAnimals: 'الأبقار', incidenceRate: '60-90%', mortalityRate: '5-30%', vector: 'لا يوجد', transmission: 'التلامس، الإفرازات', recoveryRate: '70-95%', treatment: 'العلاج الداعم', prevention: 'التطعيمات، العزل', source: 'WOAH' },
    { id: 8, name: 'التهاب الكبد المعدي', nameEn: 'IBR', category: 'أ diseases Cattle', cause: 'virus Bovine Herpesvirus-1', affectedAnimals: 'الأبقار', incidenceRate: '60-80%', mortalityRate: '2-10%', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: '90-98%', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 9, name: 'التهاب الضرع العقدي', nameEn: 'Contagious Bovine Pleuropneumonia', category: 'أ diseases Cattle', cause: 'بكتيريا Mycoplasma mycoides', affectedAnimals: 'الأبقار', incidenceRate: '30-60%', mortalityRate: '50-80%', vector: 'لا يوجد', transmission: 'التلامس المباشر', recoveryRate: '20-50%', treatment: 'التايلوزين', prevention: 'التطعيمات، العزل', source: 'WOAH' },
    { id: 10, name: 'السل البقري', nameEn: 'Bovine Tuberculosis', category: 'أ diseases Cattle', cause: 'بكتيريا Mycobacterium bovis', affectedAnimals: 'الأبقار، الإنسان', incidenceRate: 'low', mortalityRate: '50%', vector: 'لا يوجد', transmission: 'التلامس، استنشاق', recoveryRate: '50%', treatment: 'الذبح-Sanitary', prevention: 'الفحص، الذبح', source: 'WOAH' },
    { id: 11, name: 'البروسيلوز', nameEn: 'Brucellosis', category: 'أ diseases Cattle', cause: 'بكتيريا Brucella abortus', affectedAnimals: 'الأبقار، الإنسان', incidenceRate: 'varies', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس مع الإجهاض', recoveryRate: 'high', treatment: 'التطعيمات', prevention: 'التطعيمات، الفحص', source: 'WOAH' },
    { id: 12, name: 'حمى الكلى', nameEn: 'Kidney Fever', category: 'أ diseases Cattle', cause: 'Leptospira', affectedAnimals: 'الأبقار', incidenceRate: 'varies', mortalityRate: 'low', vector: 'القوارض', transmission: 'البول الملوث', recoveryRate: 'high', treatment: 'البنسلين', prevention: 'مكافحة القوارض', source: 'FAO' },
    { id: 13, name: 'التهاب الرئة البقري', nameEn: 'Bovine Pneumonia', category: 'أ diseases Cattle', cause: 'Pasteurella, Mannheimia', affectedAnimals: 'الأبقار', incidenceRate: '20-40%', mortalityRate: '10-30%', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: '70-90%', treatment: 'المضادات الحيوية', prevention: 'التهوية، تقليل الضغط', source: 'FAO' },
    { id: 14, name: 'خراج السرة', nameEn: 'Navel Ill', category: 'أ diseases Cattle', cause: 'E. coli, Streptococcus', affectedAnimals: 'العجول', incidenceRate: '10-30%', mortalityRate: '20-50%', vector: 'لا يوجد', transmission: 'البيئة الملوثة', recoveryRate: '50-80%', treatment: 'المضادات الحيوية', prevention: 'النظافة، التغذية', source: 'FAO' },
    { id: 15, name: 'مرض يوحنا', nameEn: 'Johnes Disease', category: 'أ diseases Cattle', cause: 'Mycobacterium avium', affectedAnimals: 'الأبقار', incidenceRate: 'low', mortalityRate: '100%', vector: 'لا يوجد', transmission: 'التلامس، الحليب', recoveryRate: '0%', treatment: 'لا يوجد', prevention: 'الفحص، الذبح', source: 'WOAH' },
    { id: 16, name: 'تعفن القدم', nameEn: 'Foot Rot', category: 'أ diseases Cattle', cause: 'Fusobacterium necrophorum', affectedAnimals: 'الأبقار', incidenceRate: '5-20%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'البيئة الملوثة', recoveryRate: 'high', treatment: 'المضادات الحيوية، التطهير', prevention: 'النظافة، معالجة الأقدام', source: 'FAO' },
    { id: 17, name: 'الليبتوسبيروز', nameEn: 'Leptospirosis', category: 'أ diseases Cattle', cause: 'Leptospira interrogans', affectedAnimals: 'الأبقار، الإنسان', incidenceRate: 'varies', mortalityRate: 'low', vector: 'القوارض', transmission: 'البول، الماء الملوث', recoveryRate: 'high', treatment: 'البنسلين', prevention: 'مكافحة القوارض، التطعيمات', source: 'WOAH' },
    { id: 18, name: 'الطفيليات الداخلية', nameEn: 'Internal Parasites', category: 'أ diseases Cattle', cause: 'الديدان، البروتوزوا', affectedAnimals: 'الأبقار', incidenceRate: '60-90%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'ابتلاع البيوض', recoveryRate: 'high', treatment: 'مضادات الطفيليات', prevention: 'التبريد، الرعي الدوري', source: 'FAO' },
    { id: 19, name: 'الطفيليات الخارجية', nameEn: 'External Parasites', category: 'أ diseases Cattle', cause: 'القراد، الذباب، القمل', affectedAnimals: 'الأبقار', incidenceRate: '80-100%', mortalityRate: 'low', vector: 'self', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المبيدات', prevention: 'المعاملة الدورية', source: 'FAO' },
    { id: 20, name: 'أمراض الأيض', nameEn: 'Metabolic Diseases', category: 'أ diseases Cattle', cause: 'اضطراب الأيض', affectedAnimals: 'الأبقار', incidenceRate: '5-15%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'varies', treatment: 'التدخل الغذائي', prevention: 'التغذية المتوازنة', source: 'FAO' },
    
    // Sheep and Goat Diseases
    { id: 21, name: 'الطاعون الغذائي', nameEn: 'PPR', category: 'أ diseases Sheep and Goat', cause: 'virus Morbillivirus', affectedAnimals: 'الماعز، الأغنام', incidenceRate: '90-100%', mortalityRate: '30-90%', vector: 'لا يوجد', transmission: 'التلامس المباشر', recoveryRate: '10-70%', treatment: 'العلاج الداعم', prevention: 'التطعيمات، العزل', source: 'WOAH' },
    { id: 22, name: 'الجدري', nameEn: 'Sheep and Goat Pox', category: 'أ diseases Sheep and Goat', cause: 'virus Capripoxvirus', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '60-90%', mortalityRate: '5-50%', vector: 'لا يوجد', transmission: 'التلامس، النواقل', recoveryRate: '50-95%', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 23, name: 'مرض الكبد المعدي', nameEn: 'Contagious Agalactia', category: 'أ diseases Sheep and Goat', cause: 'Mycoplasma agalactiae', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '30-60%', mortalityRate: '30-50%', vector: 'لا يوجد', transmission: 'التلامس، الحشرات', recoveryRate: '50-70%', treatment: 'التايلوزين', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 24, name: 'الأنثراكس', nameEn: 'Anthrax', category: 'أ diseases Sheep and Goat', cause: 'Bacillus anthracis', affectedAnimals: 'الأغنام، الماعز', incidenceRate: 'varies', mortalityRate: '100%', vector: 'لا يوجد', transmission: 'التربة الملوثة', recoveryRate: '0%', treatment: 'البنسلين المبكر', prevention: 'التطعيمات، حرق الجثث', source: 'WOAH' },
    { id: 25, name: 'التسمم الدموي', nameEn: 'Enterotoxemia', category: 'أ diseases Sheep and Goat', cause: 'Clostridium perfringens', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '20-40%', mortalityRate: '50-100%', vector: 'لا يوجد', transmission: 'تغيير مفاجئ في الغذاء', recoveryRate: '0-50%', treatment: 'المضادات الحيوية، السائل', prevention: 'التطعيمات، التغيير التدريجي', source: 'FAO' },
    { id: 26, name: 'التهاب الضرع المعدي', nameEn: 'Contagious Mastitis', category: 'أ diseases Sheep and Goat', cause: 'Staphylococcus aureus', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '10-30%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'during milking', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'النظافة', source: 'FAO' },
    { id: 27, name: 'الإجهاض العدوائي', nameEn: 'Enzootic Abortion', category: 'أ diseases Sheep and Goat', cause: 'Chlamydia abortus', affectedAnimals: 'الأغنام', incidenceRate: '30-50%', mortalityRate: 'varies in kids', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'التايلوزين', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 28, name: 'البروسيلوز', nameEn: 'Brucellosis', category: 'أ diseases Sheep and Goat', cause: 'Brucella melitensis', affectedAnimals: 'الماعز، الأغنام، الإنسان', incidenceRate: 'varies', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس مع الإجهاض', recoveryRate: 'high', treatment: 'التطعيمات', prevention: 'التطعيمات، الفحص', source: 'WOAH' },
    { id: 29, name: 'السعار', nameEn: 'Rabies', category: 'أ diseases Sheep and Goat', cause: 'virus Lyssavirus', affectedAnimals: 'الأغنام، الماعز، الإنسان', incidenceRate: 'rare', mortalityRate: '100%', vector: 'الكلاب، الثعالب', transmission: 'العض', recoveryRate: '0%', treatment: 'لا يوجد بعد الأعراض', prevention: 'تطعيمات الحيوانات الأليفة', source: 'WOAH' },
    { id: 30, name: 'الطفيليات الداخلية', nameEn: 'Endoparasites', category: 'أ diseases Sheep and Goat', cause: 'الديدان', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '70-100%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'ابتلاع البيوض', recoveryRate: 'high', treatment: 'مضادات الطفيليات', prevention: 'التبريد، الرعي الدوري', source: 'FAO' },
    { id: 31, name: 'الطفيليات الخارجية', nameEn: 'Ectoparasites', category: 'أ diseases Sheep and Goat', cause: 'القراد، الذباب، القمل', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '80-100%', mortalityRate: 'low', vector: 'self', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المبيدات', prevention: 'المعاملة الدورية', source: 'FAO' },
    { id: 32, name: 'الباستريلوز', nameEn: 'Pasteurellosis', category: 'أ diseases Sheep and Goat', cause: 'Pasteurella multocida', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '20-40%', mortalityRate: '30-70%', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: '30-70%', treatment: 'المضادات الحيوية', prevention: 'التطعيمات، تقليل الضغط', source: 'FAO' },
    { id: 33, name: 'مرض اللسان الأزرق', nameEn: 'Bluetongue', category: 'أ diseases Sheep and Goat', cause: 'virus Orbivirus', affectedAnimals: 'الأغنام، الماعز', incidenceRate: 'varies', mortalityRate: '5-30%', vector: 'الذباب Culicoides', transmission: 'النواقل', recoveryRate: '70-95%', treatment: 'العلاج الداعم', prevention: 'مكافحة النواقل، التطعيمات', source: 'WOAH' },
    { id: 34, name: 'الليستيريوز', nameEn: 'Listeriosis', category: 'أ diseases Sheep and Goat', cause: 'Listeria monocytogenes', affectedAnimals: 'الأغنام، الماعز', incidenceRate: 'low', mortalityRate: 'high', vector: 'لا يوجد', transmission: 'العلف الملوث', recoveryRate: 'low', treatment: 'البنسلين', prevention: 'النظافة، تخزين العلف', source: 'FAO' },
    { id: 35, name: 'الكامبيوباكتريوز', nameEn: 'Campylobacteriosis', category: 'أ diseases Sheep and Goat', cause: 'Campylobacter fetus', affectedAnimals: 'الأغنام', incidenceRate: '20-40%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'النظافة', source: 'FAO' },
    { id: 36, name: 'التوكسوبلازموز', nameEn: 'Toxoplasmosis', category: 'أ diseases Sheep and Goat', cause: 'Toxoplasma gondii', affectedAnimals: 'الأغنام، الماعز', incidenceRate: 'varies', mortalityRate: 'high in pregnant', vector: 'القطط', transmission: 'براز القطط، اللحوم', recoveryRate: 'varies', treatment: 'السلفا، البيريميثامين', prevention: 'منع القطط من الغذاء', source: 'FAO' },
    { id: 37, name: 'حمى كيو', nameEn: 'Q Fever', category: 'أ diseases Sheep and Goat', cause: 'Coxiella burnetii', affectedAnimals: 'الأغنام، الماعز، الإنسان', incidenceRate: 'varies', mortalityRate: 'low', vector: 'القراد', transmission: 'الهواء، milk', recoveryRate: 'high', treatment: 'التايلوزين', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 38, name: 'الذباب larval', nameEn: 'Myiasis', category: 'أ diseases Sheep and Goat', cause: 'الذباب larval', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '10-30%', mortalityRate: 'varies', vector: 'الذباب', transmission: 'الذباب يضع البيض', recoveryRate: 'varies', treatment: 'الإزالة، المبيدات', prevention: 'مكافحة الذباب', source: 'FAO' },
    { id: 39, name: 'مرض الفم القروح', nameEn: 'Contagious Ecthyma', category: 'أ diseases Sheep and Goat', cause: 'virus Parapoxvirus', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '70-90%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 40, name: 'تعفن القدم', nameEn: 'Foot Rot', category: 'أ diseases Sheep and Goat', cause: 'Dichelobacter nodosus', affectedAnimals: 'الأغنام، الماعز', incidenceRate: '20-40%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'البيئة الملوثة', recoveryRate: 'high', treatment: 'المضادات الحيوية، التطهير', prevention: 'الفرز، التطهير', source: 'FAO' },
    
    // Poultry Diseases
    { id: 41, name: 'مرض نيوكاسل', nameEn: 'Newcastle Disease', category: 'أ diseases الدواجن', cause: 'virus Paramyxovirus-1', affectedAnimals: 'الدواجن', incidenceRate: '80-100%', mortalityRate: '50-100%', vector: 'لا يوجد', transmission: 'الطيور البرية، التلامس', recoveryRate: '0-50%', treatment: 'لا يوجد', prevention: 'التطعيمات، الأمن البيولوجي', source: 'WOAH' },
    { id: 42, name: 'أنفلونزا الطيور', nameEn: 'Avian Influenza', category: 'أ diseases الدواجن', cause: 'virus Influenza A', affectedAnimals: 'الدواجن، الطيور', incidenceRate: '80-100%', mortalityRate: '50-100%', vector: 'الطيور البرية', transmission: 'التلامس، الهواء', recoveryRate: '0-50%', treatment: 'لا يوجد', prevention: 'الأمن البيولوجي، الذبح', source: 'WOAH' },
    { id: 43, name: 'مرض الجمبورو', nameEn: 'Gumboro', category: 'أ diseases الدواجن', cause: 'virus Birnavirus', affectedAnimals: 'الدواجن 3-6 أسابيع', incidenceRate: '80-100%', mortalityRate: '20-50%', vector: 'لا يوجد', transmission: 'البراز، الماء', recoveryRate: '50-80%', treatment: 'العلاج الداعم', prevention: 'التطعيمات، الأمن البيولوجي', source: 'WOAH' },
    { id: 44, name: 'مرض مارك', nameEn: 'Mareks Disease', category: 'أ diseases الدواجن', cause: 'virus Herpesvirus', affectedAnimals: 'الدواجن', incidenceRate: '30-50%', mortalityRate: '50-80%', vector: 'لا يوجد', transmission: 'الريش الملوث', recoveryRate: '20-50%', treatment: 'لا يوجد', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 45, name: 'التهاب الحنجرة والقصبة', nameEn: 'ILT', category: 'أ diseases الدواجن', cause: 'virus Gallid herpesvirus-1', affectedAnimals: 'الدواجن', incidenceRate: '40-80%', mortalityRate: '10-20%', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: '80-90%', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 46, name: 'التهاب الشغاف', nameEn: 'Colibacillosis', category: 'أ diseases الدواجن', cause: 'E. coli', affectedAnimals: 'الدواجن', incidenceRate: '30-60%', mortalityRate: '10-50%', vector: 'لا يوجد', transmission: 'البيئة الملوثة', recoveryRate: '50-90%', treatment: 'المضادات الحيوية', prevention: 'النظافة، التهوية', source: 'FAO' },
    { id: 47, name: 'السالمونيلا', nameEn: 'Salmonellosis', category: 'أ diseases الدواجن', cause: 'Salmonella spp', affectedAnimals: 'الدواجن، الإنسان', incidenceRate: '20-40%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'البراز، البيض', recoveryRate: 'varies', treatment: 'المضادات الحيوية', prevention: 'النظافة، السيطرة على القوارض', source: 'WOAH' },
    { id: 48, name: 'التهاب الكبد الفيروسي', nameEn: 'Viral Hepatitis', category: 'أ diseases الدواجن', cause: 'virus Adenovirus', affectedAnimals: 'العجول', incidenceRate: '20-40%', mortalityRate: '30-50%', vector: 'لا يوجد', transmission: 'التلامس، البيئة', recoveryRate: '50-70%', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'FAO' },
    { id: 49, name: 'الكوسيidios', nameEn: 'Coccidiosis', category: 'أ diseases الدواجن', cause: 'Eimeria spp', affectedAnimals: 'الدواجن', incidenceRate: '60-100%', mortalityRate: '10-50%', vector: 'لا يوجد', transmission: 'ابتلاع البيوض', recoveryRate: '50-90%', treatment: 'مضادات الكوكسيديا', prevention: 'النظافة،预防用药', source: 'FAO' },
    { id: 50, name: 'التهاب الأنف المعدي', nameEn: 'Infectious Coryza', category: 'أ diseases الدواجن', cause: 'Avibacterium paragallinarum', affectedAnimals: 'الدواجن', incidenceRate: '30-50%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'التطعيمات، النظافة', source: 'FAO' },
    { id: 51, name: 'الملكوبلازموسيس', nameEn: 'Mycoplasmosis', category: 'أ diseases الدواجن', cause: 'Mycoplasma gallisepticum', affectedAnimals: 'الدواجن', incidenceRate: '40-80%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: 'high', treatment: 'التايلوزين', prevention: 'التطعيمات، الفحص', source: 'WOAH' },
    { id: 52, name: 'الاسبرجيلوز', nameEn: 'Aspergillosis', category: 'أ diseases الدواجن', cause: 'Aspergillus fumigatus', affectedAnimals: 'الدواجن', incidenceRate: '10-30%', mortalityRate: '20-50%', vector: 'لا يوجد', transmission: 'استنشاق الجراثيم', recoveryRate: '50-80%', treatment: 'الأمبوتريسين', prevention: 'النظافة، التهوية', source: 'FAO' },
    { id: 53, name: 'النقرس', nameEn: 'Gout', category: 'أ diseases الدواجن', cause: 'اضطراب الأيض', affectedAnimals: 'الدواجن', incidenceRate: '5-15%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'varies', treatment: 'تعديل الغذاء', prevention: 'التغذية السليمة', source: 'FAO' },
    { id: 54, name: 'متلازمة الكبد الدهني', nameEn: 'Fatty Liver Syndrome', category: 'أ diseases الدواجن', cause: 'اضطراب الأيض', affectedAnimals: 'الدواجن البياضة', incidenceRate: '10-30%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'high', treatment: 'تعديل الغذاء', prevention: 'التغذية المتوازنة', source: 'FAO' },
    { id: 55, name: 'متلازمة التقزم', nameEn: 'Runting Stunting Syndrome', category: 'أ diseases الدواجن', cause: 'virus', affectedAnimals: 'العجول', incidenceRate: '30-60%', mortalityRate: '5-15%', vector: 'لا يوجد', transmission: 'الأمعاء', recoveryRate: 'high', treatment: 'العلاج الداعم', prevention: 'الأمن البيولوجي', source: 'FAO' },
    { id: 56, name: 'التهاب الكبد مع تضمينات', nameEn: 'Inclusion Body Hepatitis', category: 'أ diseases الدواجن', cause: 'virus Adenovirus', affectedAnimals: 'العجول', incidenceRate: '20-40%', mortalityRate: '10-30%', vector: 'لا يوجد', transmission: 'البراز', recoveryRate: '70-90%', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'FAO' },
    { id: 57, name: 'متلازمة استسقاء التامور', nameEn: 'Hydropericardium Syndrome', category: 'أ diseases الدواجن', cause: 'virus Adenovirus', affectedAnimals: 'العجول', incidenceRate: '30-70%', mortalityRate: '30-60%', vector: 'لا يوجد', transmission: 'البراز', recoveryRate: '40-70%', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'FAO' },
    { id: 58, name: 'التهاب الكبد الفيروسي للبط', nameEn: 'Duck Viral Hepatitis', category: 'أ diseases الدواجن', cause: 'virus Picornavirus', affectedAnimals: 'البط', incidenceRate: '50-80%', mortalityRate: '50-90%', vector: 'لا يوجد', transmission: 'البراز', recoveryRate: '10-50%', treatment: 'لا يوجد', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 59, name: 'طاعون البط', nameEn: 'Duck Plague', category: 'أ diseases الدواجن', cause: 'virus Herpesvirus', affectedAnimals: 'البط', incidenceRate: '30-70%', mortalityRate: '30-80%', vector: 'لا يوجد', transmission: 'التلامس، الماء', recoveryRate: '20-70%', treatment: 'لا يوجد', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 60, name: 'التهاب الرغامى للديوك الرومية', nameEn: 'Turkey Rhinotracheitis', category: 'أ diseases الدواجن', cause: 'virus Metapneumovirus', affectedAnimals: 'الديوك الرومية', incidenceRate: '40-80%', mortalityRate: '5-20%', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: '80-95%', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    
    // Pig Diseases
    { id: 61, name: 'حمى الخنازير الأفريقية', nameEn: 'African Swine Fever', category: 'أ diseases الخنازير', cause: 'virus Asfarvirus', affectedAnimals: 'الخنازير', incidenceRate: '90-100%', mortalityRate: '100%', vector: 'القراد Ornithodoros', transmission: 'التلامس، القراد', recoveryRate: '0%', treatment: 'لا يوجد', prevention: 'الذبح، السيطرة على الحركة', source: 'WOAH' },
    { id: 62, name: 'حمى الخنازير الكلاسيكية', nameEn: 'Classical Swine Fever', category: 'أ diseases الخنازير', cause: 'virus Pestivirus', affectedAnimals: 'الخنازير', incidenceRate: '80-100%', mortalityRate: '50-100%', vector: 'لا يوجد', transmission: 'التلامس، المعدات', recoveryRate: '0-50%', treatment: 'لا يوجد', prevention: 'التطعيمات، الذبح', source: 'WOAH' },
    { id: 63, name: 'متلازمة التنفس Reprodukt', nameEn: 'PRRS', category: 'أ diseases الخنازير', cause: 'virus Arterivirus', affectedAnimals: 'الخنازير', incidenceRate: '30-60%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: 'varies', treatment: 'العلاج الداعم', prevention: 'التطعيمات، الإدارة', source: 'WOAH' },
    { id: 64, name: 'أنفلونزا الخنازير', nameEn: 'Swine Influenza', category: 'أ diseases الخنازير', cause: 'virus Influenza', affectedAnimals: 'الخنازير، الإنسان', incidenceRate: '30-60%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: 'high', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 65, name: 'البروسيلوز', nameEn: 'Brucellosis', category: 'أ diseases الخنازير', cause: 'Brucella suis', affectedAnimals: 'الخنازير، الإنسان', incidenceRate: 'varies', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'الفحص، التطعيمات', source: 'WOAH' },
    { id: 66, name: 'مرض غلاسر', nameEn: 'Glassers Disease', category: 'أ diseases الخنازير', cause: 'Haemophilus parasuis', affectedAnimals: 'الخنازير', incidenceRate: '20-40%', mortalityRate: '10-30%', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: '70-90%', treatment: 'المضادات الحيوية', prevention: 'التطعيمات، الإدارة', source: 'FAO' },
    { id: 67, name: 'التهاب الأنف الضموري', nameEn: 'Atrophic Rhinitis', category: 'أ diseases الخنازير', cause: 'Bordetella, Pasteurella', affectedAnimals: 'الخنازير', incidenceRate: '30-50%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'التطعيمات، النظافة', source: 'FAO' },
    { id: 68, name: 'زحار الخنازير', nameEn: 'Swine Dysentery', category: 'أ diseases الخنازير', cause: 'Brachyspira hyodysenteriae', affectedAnimals: 'الخنازير', incidenceRate: '30-60%', mortalityRate: '5-30%', vector: 'لا يوجد', transmission: 'البراز', recoveryRate: '70-95%', treatment: 'المضادات الحيوية', prevention: 'النظافة، الإدارة', source: 'FAO' },
    { id: 69, name: 'الإسهال الوبائي للخنازير', nameEn: 'PED', category: 'أ diseases الخنازير', cause: 'virus Coronavirus', affectedAnimals: 'الخنازير', incidenceRate: '30-80%', mortalityRate: '50-100% in piglets', vector: 'لا يوجد', transmission: 'البراز', recoveryRate: 'varies', treatment: 'العلاج الداعم', prevention: 'النظافة، التطعيمات', source: 'WOAH' },
    { id: 70, name: 'التهاب المعد والأمعاء المعدي', nameEn: 'TGE', category: 'أ diseases الخنازير', cause: 'virus Coronavirus', affectedAnimals: 'الخنازير', incidenceRate: '30-70%', mortalityRate: 'high in piglets', vector: 'لا يوجد', transmission: 'البراز', recoveryRate: 'varies', treatment: 'العلاج الداعم', prevention: 'التطعيمات، النظافة', source: 'WOAH' },
    { id: 71, name: 'ال STREPTOCCOSIS', nameEn: 'Streptococcosis', category: 'أ diseases الخنازير', cause: 'Streptococcus suis', affectedAnimals: 'الخنازير، الإنسان', incidenceRate: '20-40%', mortalityRate: '10-30%', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: '70-90%', treatment: 'المضادات الحيوية', prevention: 'النظافة، الإدارة', source: 'FAO' },
    { id: 72, name: 'الحمام', nameEn: 'Erysipelas', category: 'أ diseases الخنازير', cause: 'Erysipelothrix rhusiopathiae', affectedAnimals: 'الخنازير', incidenceRate: '20-40%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'البيئة الملوثة', recoveryRate: 'high', treatment: 'البنسلين', prevention: 'التطعيمات', source: 'FAO' },
    { id: 73, name: 'داء لاوسون', nameEn: 'Porcine Proliferative Enteropathy', category: 'أ diseases الخنازير', cause: 'Lawsonia intracellularis', affectedAnimals: 'الخنازير', incidenceRate: '20-40%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'البراز', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'النظافة', source: 'FAO' },
    { id: 74, name: 'التسمم بالفطريات', nameEn: 'Mycotoxicosis', category: 'أ diseases الخنازير', cause: 'السموم الفطرية', affectedAnimals: 'الخنازير', incidenceRate: 'varies', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'العلف الملوث', recoveryRate: 'varies', treatment: 'إزالة السموم', prevention: 'تخزين العلف الجيد', source: 'FAO' },
    { id: 75, name: 'متلازمة MMA', nameEn: 'MMA Syndrome', category: 'أ diseases الخنازير', cause: 'عدوى، اضطراب', affectedAnimals: 'الخنازير', incidenceRate: '5-15%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'high', treatment: 'المضادات الحيوية، السائل', prevention: 'الإدارة الجيدة', source: 'FAO' },
    
    // Camel Diseases
    { id: 76, name: 'داء التربانوسوما', nameEn: 'Trypanosomiasis', category: 'أ diseases الإبل', cause: 'Trypanosoma evansi', affectedAnimals: 'الإبل، الخيول', incidenceRate: '30-60%', mortalityRate: '30-50%', vector: 'الذباب Tsetse, الذباب الأسود', transmission: 'النواقل', recoveryRate: '50-70%', treatment: 'السورامين، الميلارسينور', prevention: 'مكافحة النواقل', source: 'WOAH' },
    { id: 77, name: 'السورا', nameEn: 'Surra', category: 'أ diseases الإبل', cause: 'Trypanosoma evansi', affectedAnimals: 'الإبل', incidenceRate: '30-70%', mortalityRate: '30-50%', vector: 'الذباب', transmission: 'النواقل', recoveryRate: '50-70%', treatment: 'السورامين', prevention: 'مكافحة النواقل', source: 'WOAH' },
    { id: 78, name: 'جرب العث sarcoptic', nameEn: 'Sarcoptic Mange', category: 'أ diseases الإبل', cause: 'Sarcoptes scabiei', affectedAnimals: 'الإبل', incidenceRate: '40-80%', mortalityRate: 'low', vector: 'self', transmission: 'التلامس', recoveryRate: 'high', treatment: 'الإيفرمكتين', prevention: 'المعاملة، العزل', source: 'FAO' },
    { id: 79, name: 'الديدان الطفيلية', nameEn: 'Helminthiasis', category: 'أ diseases الإبل', cause: 'الديدان', affectedAnimals: 'الإبل', incidenceRate: '60-90%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'ابتلاع البيوض', recoveryRate: 'high', treatment: 'مضادات الطفيليات', prevention: 'التبريد', source: 'FAO' },
    { id: 80, name: 'جدري الإبل', nameEn: 'Camel Pox', category: 'أ diseases الإبل', cause: 'virus Orthopoxvirus', affectedAnimals: 'الإبل', incidenceRate: '30-60%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'العلاج الداعم', prevention: 'العزل', source: 'WOAH' },
    { id: 81, name: 'التهاب الأمعاء الناخر', nameEn: 'Necrotic Enteritis', category: 'أ diseases الإبل', cause: 'Clostridium', affectedAnimals: 'الإبل', incidenceRate: '10-30%', mortalityRate: '30-70%', vector: 'لا يوجد', transmission: 'البيئة الملوثة', recoveryRate: '30-70%', treatment: 'المضادات الحيوية', prevention: 'النظافة', source: 'FAO' },
    { id: 82, name: 'الدرماتوفيلوز', nameEn: 'Dermatophilosis', category: 'أ diseases الإبل', cause: 'Dermatophilus congolensis', affectedAnimals: 'الإبل', incidenceRate: '20-40%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'النظافة', source: 'FAO' },
    { id: 83, name: 'التهاب رئة الإبل المعدي', nameEn: 'Contagious Camel Pneumonia', category: 'أ diseases الإبل', cause: 'مخلوقات متعددة', affectedAnimals: 'الإبل', incidenceRate: '20-50%', mortalityRate: '10-30%', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: '70-90%', treatment: 'المضادات الحيوية', prevention: 'النظافة، التهوية', source: 'FAO' },
    { id: 84, name: 'البروسيلوز', nameEn: 'Brucellosis', category: 'أ diseases الإبل', cause: 'Brucella melitensis', affectedAnimals: 'الإبل', incidenceRate: 'varies', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'التطعيمات', prevention: 'التطعيمات، الفحص', source: 'WOAH' },
    { id: 85, name: 'الإصابة بالقراد', nameEn: 'Tick Infestation', category: 'أ diseases الإبل', cause: 'القراد', affectedAnimals: 'الإبل', incidenceRate: '60-100%', mortalityRate: 'varies', vector: 'self', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المبيدات', prevention: 'المعاملة الدورية', source: 'FAO' },
    
    // Horse Diseases
    { id: 86, name: 'أنفلونزا الخيول', nameEn: 'Equine Influenza', category: 'أ diseases الخيول', cause: 'virus Influenza', affectedAnimals: 'الخيول', incidenceRate: '60-90%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'الهواء، التلامس', recoveryRate: 'high', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 87, name: 'التهاب الشرايين الفيروسي', nameEn: 'EVA', category: 'أ diseases الخيول', cause: 'virus Arterivirus', affectedAnimals: 'الخيول', incidenceRate: '30-60%', mortalityRate: '30-80%', vector: 'لا يوجد', transmission: 'التلامس، السائل المنوي', recoveryRate: '20-70%', treatment: 'العلاج الداعم', prevention: 'الفحص، التطعيمات', source: 'WOAH' },
    { id: 88, name: 'مرضHorse Sickness الأفريقي', nameEn: 'AHS', category: 'أ diseases الخيول', cause: 'virus Orbivirus', affectedAnimals: 'الخيول', incidenceRate: '50-90%', mortalityRate: '30-90%', vector: 'الذباب Culicoides', transmission: 'النواقل', recoveryRate: '10-70%', treatment: 'العلاج الداعم', prevention: 'مكافحة النواقل، التطعيمات', source: 'WOAH' },
    { id: 89, name: 'الخناق', nameEn: 'Strangles', category: 'أ diseases الخيول', cause: 'Streptococcus equi', affectedAnimals: 'الخيول', incidenceRate: '40-80%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'النظافة، العزل', source: 'WOAH' },
    { id: 90, name: 'هربس الخيول', nameEn: 'EHV', category: 'أ diseases الخيول', cause: 'virus Herpesvirus', affectedAnimals: 'الخيول', incidenceRate: '40-70%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'التلامس، الهواء', recoveryRate: 'varies', treatment: 'العلاج الداعم', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 91, name: 'التيتانوس', nameEn: 'Tetanus', category: 'أ diseases الخيول', cause: 'Clostridium tetani', affectedAnimals: 'الخيول', incidenceRate: 'rare', mortalityRate: '80-100%', vector: 'لا يوجد', transmission: 'الجروح', recoveryRate: 'low', treatment: 'السموم، المضادات الحيوية', prevention: 'التطعيمات', source: 'WOAH' },
    { id: 92, name: 'مرض لايم', nameEn: 'Lyme Disease', category: 'أ diseases الخيول', cause: 'Borrelia burgdorferi', affectedAnimals: 'الخيول', incidenceRate: 'varies', mortalityRate: 'low', vector: 'القراد', transmission: 'النواقل', recoveryRate: 'varies', treatment: 'الدوكسيسيكلين', prevention: 'مكافحة القراد', source: 'FAO' },
    { id: 93, name: 'المغص', nameEn: 'Colic', category: 'أ diseases الخيول', cause: 'أسباب متعددة', affectedAnimals: 'الخيول', incidenceRate: '10-30%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'varies', treatment: 'التدخل الجراحي، drugs', prevention: 'التغذية السليمة', source: 'FAO' },
    { id: 94, name: 'التهاب用人', nameEn: 'Laminitis', category: 'أ diseases الخيول', cause: 'أسباب متعددة', affectedAnimals: 'الخيول', incidenceRate: '5-15%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'varies', treatment: 'مضادات الالتهاب', prevention: 'إدارة التغذية', source: 'FAO' },
    { id: 95, name: 'سفع المطر', nameEn: 'Rain Scald', category: 'أ diseases الخيول', cause: 'Dermatophilus congolensis', affectedAnimals: 'الخيول', incidenceRate: '20-40%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية', prevention: 'المأوى الجاف', source: 'FAO' },
    { id: 96, name: 'خراج الحلقوم', nameEn: 'Guttural Pouch Empyema', category: 'أ diseases الخيول', cause: 'Streptococcus', affectedAnimals: 'الخيول', incidenceRate: '10-20%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'التلامس', recoveryRate: 'high', treatment: 'المضادات الحيوية، الجراحة', prevention: 'النظافة', source: 'FAO' },
    { id: 97, name: 'انسداد المجرى الهوائي المتكرر', nameEn: 'RAO', category: 'أ diseases الخيول', cause: 'الحساسية', affectedAnimals: 'الخيول', incidenceRate: '10-30%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'chronic', treatment: 'مضادات الالتهاب', prevention: 'إدارة البيئة', source: 'FAO' },
    { id: 98, name: ' Cushing', nameEn: 'Pituitary Pars Intermedia Dysfunction', category: 'أ diseases الخيول', cause: 'ورم الغدة النخامية', affectedAnimals: 'الخيول كبار', incidenceRate: '5-15%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'chronic', treatment: 'البيرغوليد', prevention: 'لا يوجد', source: 'FAO' },
    { id: 99, name: 'متلازمة الأيض equine', nameEn: 'EMS', category: 'أ diseases الخيول', cause: 'اضطراب الأيض', affectedAnimals: 'الخيول', incidenceRate: '5-20%', mortalityRate: 'varies', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'chronic', treatment: 'إدارة الغذاء', prevention: 'إدارة الغذاء', source: 'FAO' },
    { id: 100, name: 'التهاب العظم والغضاريف', nameEn: 'Osteochondrosis', category: 'أ diseases الخيول', cause: 'اضطراب النمو', affectedAnimals: 'الخيول', incidenceRate: '10-30%', mortalityRate: 'low', vector: 'لا يوجد', transmission: 'لا يوجد', recoveryRate: 'varies', treatment: 'إدارة، الجراحة', prevention: 'التغذية السليمة', source: 'FAO' }
];

// Initialize study diseases
function initStudyDiseases() {
    if (!localStorage.getItem('studyDiseases')) {
        localStorage.setItem('studyDiseases', JSON.stringify(studyDiseasesDB));
    }
    loadStudyDiseases();
}

function loadStudyDiseases() {
    const diseases = JSON.parse(localStorage.getItem('studyDiseases') || '[]');
    const grid = document.getElementById('studyDiseasesGrid');
    if (!grid) return;
    
    let html = '';
    diseases.forEach(disease => {
        const riskClass = disease.mortalityRate.includes('100%') || parseInt(disease.mortalityRate) > 50 ? 'risk-high' : 
                        disease.mortalityRate.includes('low') ? 'risk-low' : 'risk-medium';
        
        html += `
        <div class="disease-card" onclick="showStudyDiseaseDetails(${disease.id})">
            <div class="disease-header">
                <h4>${disease.name}</h4>
                <span class="${riskClass}">${disease.mortalityRate}</span>
            </div>
            ${disease.nameEn ? `<p style="color: var(--text-secondary); font-size: 0.85rem;"><em>${disease.nameEn}</em></p>` : ''}
            <p style="font-size: 0.85rem; color: var(--accent);">${disease.category}</p>
            <div class="disease-info">
                <i class="fas fa-paw"></i> <strong>الحيوانات:</strong> ${disease.affectedAnimals}
            </div>
            <div class="disease-info">
                <i class="fas fa-percentage"></i> <strong>نسبة الوفيات:</strong> ${disease.mortalityRate}
            </div>
            <div class="disease-info">
                <i class="fas fa-virus"></i> <strong>المسبب:</strong> ${disease.cause}
            </div>
            <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-secondary);">
                <i class="fas fa-source"></i> المصدر: ${disease.source}
            </div>
        </div>`;
    });
    grid.innerHTML = html;
}

function showStudyDiseaseDetails(id) {
    const diseases = JSON.parse(localStorage.getItem('studyDiseases') || '[]');
    const disease = diseases.find(d => d.id === id);
    
    if (!disease) return;
    
    let modal = document.getElementById('studyDiseaseDetailModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'studyDiseaseDetailModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h3 id="studyDiseaseTitle"></h3>
                    <button onclick="closeStudyDiseaseModal()">×</button>
                </div>
                <div id="studyDiseaseContent"></div>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeStudyDiseaseModal();
        });
    }
    
    document.getElementById('studyDiseaseTitle').innerHTML = `<i class="fas fa-book-medical"></i> ${disease.name}`;
    document.getElementById('studyDiseaseContent').innerHTML = `
        <div style="padding: 1rem;">
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <h4 style="color: var(--primary); margin-bottom: 0.5rem;">${disease.nameEn || ''}</h4>
                <span style="background: var(--accent); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${disease.category}</span>
            </div>
            
            <div class="grid-2" style="gap: 1rem;">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-virus"></i> المسبب العلمي</label>
                    <div style="padding: 0.5rem; background: #e3f2fd; border-radius: 4px;">${disease.cause}</div>
                </div>
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-paw"></i> الحيوانات المتأثرة</label>
                    <div style="padding: 0.5rem; background: #e3f2fd; border-radius: 4px;">${disease.affectedAnimals}</div>
                </div>
            </div>
            
            <div class="grid-2" style="gap: 1rem; margin-top: 0.5rem;">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-chart-line"></i> نسبة الإصابة</label>
                    <div style="padding: 0.5rem; background: #fff3e0; border-radius: 4px;">${disease.incidenceRate}</div>
                </div>
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-skull-crossbones"></i> نسبة الوفيات</label>
                    <div style="padding: 0.5rem; background: #ffebee; border-radius: 4px; font-weight: bold; color: #c62828;">${disease.mortalityRate}</div>
                </div>
            </div>
            
            <div class="grid-2" style="gap: 1rem; margin-top: 0.5rem;">
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-bug"></i> الناقل</label>
                    <div style="padding: 0.5rem; background: #f3e5f5; border-radius: 4px;">${disease.vector}</div>
                </div>
                <div class="form-group">
                    <label class="form-label"><i class="fas fa-heart"></i> نسبة الشفاء</label>
                    <div style="padding: 0.5rem; background: #e8f5e9; border-radius: 4px;">${disease.recoveryRate}</div>
                </div>
            </div>
            
            <div class="form-group" style="margin-top: 0.5rem;">
                <label class="form-label"><i class="fas fa-share-alt"></i> طرق الانتقال</label>
                <div style="padding: 0.5rem; background: #e0f7fa; border-radius: 4px;">${disease.transmission}</div>
            </div>
            
            <div class="form-group" style="margin-top: 0.5rem;">
                <label class="form-label"><i class="fas fa-pills"></i> العلاج</label>
                <div style="padding: 0.5rem; background: #fff8e1; border-radius: 4px;">${disease.treatment}</div>
            </div>
            
            <div class="form-group" style="margin-top: 0.5rem;">
                <label class="form-label"><i class="fas fa-shield-alt"></i> الوقاية والسيطرة</label>
                <div style="padding: 0.5rem; background: #fce4ec; border-radius: 4px;">${disease.prevention}</div>
            </div>
            
            <div style="margin-top: 1rem; padding: 0.5rem; background: #eceff1; border-radius: 4px; text-align: center;">
                <small><i class="fas fa-book"></i> المصدر: ${disease.source}</small>
            </div>
            
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button class="btn btn-sm btn-primary" onclick="editStudyDisease(${disease.id})">
                    <i class="fas fa-edit"></i> تعديل
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteStudyDisease(${disease.id})">
                    <i class="fas fa-trash"></i> حذف
                </button>
            </div>
        </div>`;
    
    modal.classList.add('show');
}

function closeStudyDiseaseModal() {
    const modal = document.getElementById('studyDiseaseDetailModal');
    if (modal) modal.classList.remove('show');
}

function filterStudyDiseases() {
    const search = document.getElementById('studyDiseaseSearch').value.toLowerCase();
    const category = document.getElementById('studyCategoryFilter').value;
    const diseases = JSON.parse(localStorage.getItem('studyDiseases') || '[]');
    
    const filtered = diseases.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search) || d.nameEn.toLowerCase().includes(search);
        
        // Check if category is 'all' - show all diseases
        if (category === 'all') {
            return matchSearch;
        }
        
        // Check if disease affects multiple animals and should appear in multiple categories
        const affected = (d.affectedAnimals || '').toLowerCase();
        
        // Map category to animal keywords
        const categoryAnimals = {
            'أ diseases Cattle': ['أبقار', 'cattle', 'بقر', 'جاموس', 'buffalo'],
            'أ diseases Sheep and Goat': ['أغنام', 'ماعز', 'sheep', 'goat', 'غنم'],
            'أ diseases الدواجن': ['دواجن', 'دجاج', 'بط', 'حمام', 'Turkey', 'poultry', 'bird', 'طيور'],
            'أ diseases الخنازير': ['خنازير', 'pig', 'خنزير'],
            'أ diseases الإبل': ['إبل', ' camel'],
            'أ diseases الخيول': ['خيول', 'horse', 'حصان']
        };
        
        // If category matches the disease's category OR the disease affects animals in that category
        const categoryKeywords = categoryAnimals[category] || [];
        const diseaseInCategory = d.category === category || categoryKeywords.some(keyword => affected.includes(keyword));
        
        return matchSearch && diseaseInCategory;
    });
    
    const grid = document.getElementById('studyDiseasesGrid');
    if (!grid) return;
    
    let html = '';
    filtered.forEach(disease => {
        const riskClass = disease.mortalityRate.includes('100%') || parseInt(disease.mortalityRate) > 50 ? 'risk-high' : 
                        disease.mortalityRate.includes('low') ? 'risk-low' : 'risk-medium';
        
        html += `
        <div class="disease-card" onclick="showStudyDiseaseDetails(${disease.id})">
            <div class="disease-header">
                <h4>${disease.name}</h4>
                <span class="${riskClass}">${disease.mortalityRate}</span>
            </div>
            ${disease.nameEn ? `<p style="color: var(--text-secondary); font-size: 0.85rem;"><em>${disease.nameEn}</em></p>` : ''}
            <p style="font-size: 0.85rem; color: var(--accent);">${disease.category}</p>
            <div class="disease-info">
                <i class="fas fa-paw"></i> <strong>الحيوانات:</strong> ${disease.affectedAnimals}
            </div>
            <div class="disease-info">
                <i class="fas fa-percentage"></i> <strong>نسبة الوفيات:</strong> ${disease.mortalityRate}
            </div>
            <div class="disease-info">
                <i class="fas fa-virus"></i> <strong>المسبب:</strong> ${disease.cause}
            </div>
            <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-secondary);">
                <i class="fas fa-source"></i> المصدر: ${disease.source}
            </div>
        </div>`;
    });
    grid.innerHTML = html || '<p style="text-align: center; padding: 2rem;">لا توجد نتائج</p>';
}

function showAddStudyDiseaseModal() {
    let modal = document.getElementById('addStudyDiseaseModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'addStudyDiseaseModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3><i class="fas fa-plus"></i> إضافة مرض جديد</h3>
                    <button onclick="closeAddStudyDiseaseModal()">×</button>
                </div>
                <form id="addStudyDiseaseForm" onsubmit="saveStudyDisease(event)">
                    <input type="hidden" id="studyDiseaseId">
                    <div class="form-group">
                        <label class="form-label">اسم المرض (عربي)</label>
                        <input type="text" class="form-input" id="studyDiseaseName" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الاسم بالإنجليزية</label>
                        <input type="text" class="form-input" id="studyDiseaseNameEn">
                    </div>
                    <div class="form-group">
                        <label class="form-label">الفئة</label>
                        <select class="form-select" id="studyDiseaseCategory" required>
                            <option value="أ diseases Cattle">أ diseases Cattle</option>
                            <option value="أ diseases Sheep and Goat">أ diseases Sheep and Goat</option>
                            <option value="أ diseases الدواجن">أ diseases الدواجن</option>
                            <option value="أ diseases الخنازير">أ diseases الخنازير</option>
                            <option value="أ diseases الإبل">أ diseases الإبل</option>
                            <option value="أ diseases الخيول">أ diseases الخيول</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">المسبب العلمي</label>
                        <input type="text" class="form-input" id="studyDiseaseCause" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الحيوانات المتأثرة</label>
                        <input type="text" class="form-input" id="studyDiseaseAnimals" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">نسبة الإصابة</label>
                        <input type="text" class="form-input" id="studyDiseaseIncidence" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">نسبة الوفيات</label>
                        <input type="text" class="form-input" id="studyDiseaseMortality" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الناقل</label>
                        <input type="text" class="form-input" id="studyDiseaseVector">
                    </div>
                    <div class="form-group">
                        <label class="form-label">طرق الانتقال</label>
                        <input type="text" class="form-input" id="studyDiseaseTransmission">
                    </div>
                    <div class="form-group">
                        <label class="form-label">نسبة الشفاء</label>
                        <input type="text" class="form-input" id="studyDiseaseRecovery">
                    </div>
                    <div class="form-group">
                        <label class="form-label">العلاج</label>
                        <textarea class="form-textarea" id="studyDiseaseTreatment"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الوقاية والسيطرة</label>
                        <textarea class="form-textarea" id="studyDiseasePrevention"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-full"><i class="fas fa-save"></i> حفظ</button>
                </form>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e) {
            if (e.target === this) closeAddStudyDiseaseModal();
        });
    }
    
    document.getElementById('studyDiseaseId').value = '';
    document.getElementById('addStudyDiseaseForm').reset();
    modal.classList.add('show');
}

function closeAddStudyDiseaseModal() {
    const modal = document.getElementById('addStudyDiseaseModal');
    if (modal) modal.classList.remove('show');
}

function saveStudyDisease(e) {
    e.preventDefault();
    
    const diseases = JSON.parse(localStorage.getItem('studyDiseases') || '[]');
    const id = document.getElementById('studyDiseaseId').value;
    
    const disease = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('studyDiseaseName').value,
        nameEn: document.getElementById('studyDiseaseNameEn').value,
        category: document.getElementById('studyDiseaseCategory').value,
        cause: document.getElementById('studyDiseaseCause').value,
        affectedAnimals: document.getElementById('studyDiseaseAnimals').value,
        incidenceRate: document.getElementById('studyDiseaseIncidence').value,
        mortalityRate: document.getElementById('studyDiseaseMortality').value,
        vector: document.getElementById('studyDiseaseVector').value,
        transmission: document.getElementById('studyDiseaseTransmission').value,
        recoveryRate: document.getElementById('studyDiseaseRecovery').value,
        treatment: document.getElementById('studyDiseaseTreatment').value,
        prevention: document.getElementById('studyDiseasePrevention').value,
        source: 'User Added'
    };
    
    if (id) {
        const index = diseases.findIndex(d => d.id === parseInt(id));
        if (index !== -1) diseases[index] = disease;
    } else {
        diseases.push(disease);
    }
    
    localStorage.setItem('studyDiseases', JSON.stringify(diseases));
    showToast('تم حفظ المرض بنجاح', 'success');
    closeAddStudyDiseaseModal();
    loadStudyDiseases();
}

function editStudyDisease(id) {
    const diseases = JSON.parse(localStorage.getItem('studyDiseases') || '[]');
    const disease = diseases.find(d => d.id === id);
    if (!disease) return;
    
    showAddStudyDiseaseModal();
    
    document.getElementById('studyDiseaseId').value = disease.id;
    document.getElementById('studyDiseaseName').value = disease.name;
    document.getElementById('studyDiseaseNameEn').value = disease.nameEn || '';
    document.getElementById('studyDiseaseCategory').value = disease.category;
    document.getElementById('studyDiseaseCause').value = disease.cause;
    document.getElementById('studyDiseaseAnimals').value = disease.affectedAnimals;
    document.getElementById('studyDiseaseIncidence').value = disease.incidenceRate;
    document.getElementById('studyDiseaseMortality').value = disease.mortalityRate;
    document.getElementById('studyDiseaseVector').value = disease.vector;
    document.getElementById('studyDiseaseTransmission').value = disease.transmission;
    document.getElementById('studyDiseaseRecovery').value = disease.recoveryRate;
    document.getElementById('studyDiseaseTreatment').value = disease.treatment;
    document.getElementById('studyDiseasePrevention').value = disease.prevention;
    
    closeStudyDiseaseModal();
}

function deleteStudyDisease(id) {
    if (confirm('هل أنت متأكد من حذف هذا المرض؟')) {
        let diseases = JSON.parse(localStorage.getItem('studyDiseases') || '[]');
        diseases = diseases.filter(d => d.id !== id);
        localStorage.setItem('studyDiseases', JSON.stringify(diseases));
        showToast('تم حذف المرض بنجاح', 'success');
        closeStudyDiseaseModal();
        loadStudyDiseases();
    }
}

// Roles Management Functions
function initRoles() {
    // Initialize default roles if not exists
    if (!localStorage.getItem('raasidRoles')) {
        localStorage.setItem('raasidRoles', JSON.stringify([
            { id: 1, name: 'مدير نظام', description: 'لديه جميع الصلاحيات', permissions: { canViewStats: true, canViewDiseases: true, canManageDiseases: true, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: true, canAddUsers: true, canDeleteUsers: true, canEditSettings: true, canDeleteReports: true } },
            { id: 2, name: 'مدير', description: 'يمكنه إدارة المستخدمين والأمراض', permissions: { canViewStats: true, canViewDiseases: true, canManageDiseases: true, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: true, canAddUsers: true, canDeleteUsers: false, canEditSettings: false, canDeleteReports: true } },
            { id: 3, name: 'مشرف', description: 'يمكنه عرض وإضافة البلاغات', permissions: { canViewStats: true, canViewDiseases: true, canManageDiseases: false, canViewMap: true, canViewReport: true, canUseAI: true, canManageUsers: false, canAddUsers: false, canDeleteUsers: false, canEditSettings: false, canDeleteReports: false } }
        ]));
    }
    
    // Show roles management section for admin only
    if (currentUser && currentUser.role === 'admin') {
        const rolesSection = document.getElementById('rolesManagementSection');
        if (rolesSection) {
            rolesSection.style.display = 'block';
        }
        loadRolesList();
    }
}

function loadRolesList() {
    const roles = JSON.parse(localStorage.getItem('raasidRoles') || '[]');
    const rolesList = document.getElementById('rolesList');
    if (!rolesList) return;
    
    let html = '<div class="roles-grid">';
    roles.forEach(role => {
        html += `
        <div class="role-card">
            <div class="role-header">
                <i class="fas fa-user-shield"></i>
                <h4>${role.name}</h4>
            </div>
            <p>${role.description || 'لا يوجد وصف'}</p>
            <div class="role-permissions">
                <strong>الصلاحيات:</strong>
                <ul>
                    ${role.permissions.canViewStats ? '<li><i class="fas fa-check"></i> عرض الإحصائيات</li>' : ''}
                    ${role.permissions.canViewDiseases ? '<li><i class="fas fa-check"></i> عرض الأمراض</li>' : ''}
                    ${role.permissions.canManageDiseases ? '<li><i class="fas fa-check"></i> إدارة الأمراض</li>' : ''}
                    ${role.permissions.canViewMap ? '<li><i class="fas fa-check"></i> عرض الخريطة</li>' : ''}
                    ${role.permissions.canViewReport ? '<li><i class="fas fa-check"></i> عرض البلاغات</li>' : ''}
                    ${role.permissions.canUseAI ? '<li><i class="fas fa-check"></i> استخدام الذكاء الاصطناعي</li>' : ''}
                    ${role.permissions.canManageUsers ? '<li><i class="fas fa-check"></i> إدارة المستخدمين</li>' : ''}
                    ${role.permissions.canAddUsers ? '<li><i class="fas fa-check"></i> إضافة مستخدمين</li>' : ''}
                    ${role.permissions.canDeleteUsers ? '<li><i class="fas fa-check"></i> حذف مستخدمين</li>' : ''}
                    ${role.permissions.canEditSettings ? '<li><i class="fas fa-check"></i> تعديل الإعدادات</li>' : ''}
                    ${role.permissions.canDeleteReports ? '<li><i class="fas fa-check"></i> حذف البلاغات</li>' : ''}
                </ul>
            </div>
            ${role.id > 3 ? `<button class="btn btn-sm btn-danger" onclick="deleteRole(${role.id})"><i class="fas fa-trash"></i> حذف</button>` : ''}
        </div>`;
    });
    html += '</div>';
    rolesList.innerHTML = html;
}

function showAddRoleModal() {
    if (!currentUser || currentUser.role !== 'admin') {
        showToast('ليس لديك صلاحية إضافة رتب', 'error');
        return;
    }
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
    
    const rolePermissions = {
        canViewStats: document.getElementById('permViewStats').checked,
        canViewDiseases: document.getElementById('permViewDiseases').checked,
        canManageDiseases: document.getElementById('permManageDiseases').checked,
        canViewMap: document.getElementById('permViewMap').checked,
        canViewReport: document.getElementById('permViewReport').checked,
        canUseAI: document.getElementById('permUseAI').checked,
        canManageUsers: document.getElementById('permManageUsers').checked,
        canAddUsers: document.getElementById('permAddUsers').checked,
        canDeleteUsers: document.getElementById('permDeleteUsers').checked,
        canEditSettings: document.getElementById('permEditSettings').checked,
        canDeleteReports: document.getElementById('permDeleteReports').checked
    };
    
    const roles = JSON.parse(localStorage.getItem('raasidRoles') || '[]');
    roles.push({
        id: Date.now(),
        name: roleName,
        description: roleDescription,
        permissions: rolePermissions
    });
    
    localStorage.setItem('raasidRoles', JSON.stringify(roles));
    showToast('تم إضافة الرتبة بنجاح', 'success');
    closeRoleModal();
    loadRolesList();
}

function deleteRole(id) {
    if (!currentUser || currentUser.role !== 'admin') {
        showToast('ليس لديك صلاحية حذف الرتب', 'error');
        return;
    }
    
    if (confirm('هل أنت متأكد من حذف هذه الرتبة؟')) {
        let roles = JSON.parse(localStorage.getItem('raasidRoles') || '[]');
        roles = roles.filter(r => r.id !== id);
        localStorage.setItem('raasidRoles', JSON.stringify(roles));
        showToast('تم حذف الرتبة بنجاح', 'success');
        loadRolesList();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeUsers();
    initializeDiseases();
    checkAuth();
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const user = login(username, password);
        if (user) {
            localStorage.setItem('raasidCurrentUser', JSON.stringify(user));
            showToast('مرحباً بك ' + user.name, 'success');
            checkAuth();
        } else {
            showToast('اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
        }
    });

    // Add user form
    document.getElementById('addUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addUser(
            document.getElementById('newUserName').value,
            document.getElementById('newUsername').value,
            document.getElementById('newPassword').value,
            document.getElementById('newUserRole').value
        );
        closeModal();
    });

    // Animal form
    const animalForm = document.getElementById('animalForm');
    if (animalForm) {
        animalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('تم تسجيل الحيوان بنجاح', 'success');
        });
    }

    // Vet form
    const vetForm = document.getElementById('vetForm');
    if (vetForm) {
        vetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('تم إضافة الطبيب البيطري بنجاح', 'success');
        });
    }

    // Modal close on outside click
    const addUserModal = document.getElementById('addUserModal');
    if (addUserModal) {
        addUserModal.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }

    // Disease modal close on outside click
    const diseaseModal = document.getElementById('diseaseModal');
    if (diseaseModal) {
        diseaseModal.addEventListener('click', function(e) {
            if (e.target === this) closeDiseaseModal();
        });
    }

    // Add role form submission
    const addRoleForm = document.getElementById('addRoleForm');
    if (addRoleForm) {
        addRoleForm.addEventListener('submit', function(e) {
            saveRole(e);
        });
    }

    // Add role modal close on outside click
    const addRoleModal = document.getElementById('addRoleModal');
    if (addRoleModal) {
        addRoleModal.addEventListener('click', function(e) {
            if (e.target === this) closeRoleModal();
        });
    }
    
    // Load diseases on init
    loadDiseasesTable();
    
    // Show add disease button for admins/managers
    const perms = getUserPermissions(currentUser ? currentUser.role : 'visitor');
    const addBtn = document.getElementById('addDiseaseBtn');
    if (addBtn && perms.canManageDiseases) {
        addBtn.style.display = 'inline-flex';
    }
});
