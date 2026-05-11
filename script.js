// Constants
const TRIVIA_QUESTIONS = [
    { question: "小时候玩的弹珠，常见的材质通常是？", options: ["木头", "石头", "玻璃"], answer: 2 },
    { question: "小霸王游戏机的经典手柄按键通常是哪个组合？", options: ["AB键", "XY键", "LR键"], answer: 0 },
    { question: "童年冰棍车的木箱里，通常铺什么来保温？", options: ["报纸", "棉被", "塑料布"], answer: 1 },
    { question: "跳房子游戏通常需要用到什么在地上画图？", options: ["粉笔", "油漆", "马克笔"], answer: 0 }
];

const THEMES = [
    { id: 'outdoor', name: '户外玩耍主题', description: '短袖背心、帆布球鞋、弹珠丢沙包，还原阳光下的质感。', tag: '户外', bgColor: 'bg-[#4361EE]', icon: '⚽' },
    { id: 'indoor', name: '室内娱乐主题', description: '碎花衬衫、棉布裤、小霸王电视机，适配居家玩乐场景。', tag: '室内', bgColor: 'bg-[#7209B7]', icon: '🎮' },
    { id: 'school', name: '校园时光主题', description: '蓝白校服、红领巾、帆布书包，教室操场里的纯真。', tag: '校园', bgColor: 'bg-[#3A0CA3]', icon: '📝' },
    { id: 'taste', name: '童年味道主题', description: '宽松T恤、冰棍车、辣条、农家小院，寻找舌尖上的记忆。', tag: '味道', bgColor: 'bg-[#F72585]', icon: '🍦' }
];

const REWARDS = ["弹珠大师勋章", "小霸王终极周五券", "大白兔奶糖兑换码", "铁皮玩具表情包", "复古珍藏背景卡"];

// State
let currentStep = 'welcome';
let selectedThemeId = null;
let currentTriviaIndex = 0;
let triviaScore = 0;

// Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    theme: document.getElementById('theme-screen'),
    generating: document.getElementById('generating-screen'),
    result: document.getElementById('result-screen')
};

const themesList = document.getElementById('themes-list');
const startBtn = document.getElementById('start-btn');
const crossBtn = document.getElementById('cross-btn');
const backBtns = document.querySelectorAll('.back-btn');
const fileInput = document.getElementById('file-input');
const triviaQuestion = document.getElementById('trivia-question');
const triviaOptions = document.getElementById('trivia-options');
const scoreText = document.getElementById('score-text');
const scoreDots = document.getElementById('score-dots');
const triviaStep = document.getElementById('trivia-step');
const progressBar = document.getElementById('progress-bar');
const generatedImg = document.getElementById('generated-image');
const themeTag = document.getElementById('theme-tag');
const blindBoxBtn = document.getElementById('blind-box-btn');
const modalOverlay = document.getElementById('modal-overlay');
const rewardText = document.getElementById('reward-text');
const closeModals = document.querySelectorAll('#close-modal, .close-modal-action');

// Functions
function showScreen(step) {
    Object.values(screens).forEach(screen => screen.classList.add('hidden-screen'));
    screens[step].classList.remove('hidden-screen');
    currentStep = step;
}

function renderThemes() {
    themesList.innerHTML = THEMES.map(theme => `
        <div class="theme-card group cursor-pointer bg-white rounded-2xl p-4 shadow-md border-2 transition-all relative overflow-hidden flex items-center gap-4 ${selectedThemeId === theme.id ? 'border-[#5d4037] scale-[1.02]' : 'border-transparent'}" data-id="${theme.id}">
            <div class="w-12 h-12 shrink-0 ${theme.bgColor} rounded-xl flex items-center justify-center text-2xl shadow-sm italic text-white">${theme.icon}</div>
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                    <h3 class="text-base font-bold font-nostalgia truncate text-stone-800">${theme.name}</h3>
                    <span class="px-1.5 py-0.5 ${theme.bgColor} text-white text-[8px] font-bold rounded-md">${theme.tag}</span>
                </div>
                <p class="text-stone-500 text-[10px] leading-snug line-clamp-2">${theme.description}</p>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
            selectedThemeId = card.dataset.id;
            renderThemes();
            crossBtn.className = "w-full py-3.5 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 bg-[#5d4037] text-[#f5f5dc] shadow-[#5d4037]/20 active:scale-95 transition-all text-sm";
        });
    });
}

function renderTrivia() {
    const q = TRIVIA_QUESTIONS[currentTriviaIndex];
    triviaStep.innerText = `挑战: ${currentTriviaIndex + 1} / ${TRIVIA_QUESTIONS.length}`;
    triviaQuestion.innerHTML = `📖 考考你的童年回忆：<br/><span class="text-[#5d4037] block mt-2 text-base">${q.question}</span>`;
    triviaOptions.innerHTML = q.options.map((opt, i) => `
        <button class="trivia-opt w-full p-4 text-left bg-stone-50 border-2 border-transparent rounded-xl hover:border-[#5d4037] hover:bg-[#f5f5dc]/20 transition-all text-sm font-medium" data-idx="${i}">${opt}</button>
    `).join('');

    document.querySelectorAll('.trivia-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            if (parseInt(btn.dataset.idx) === q.answer) {
                triviaScore++;
            }
            if (currentTriviaIndex < TRIVIA_QUESTIONS.length - 1) {
                currentTriviaIndex++;
                renderTrivia();
            }
        });
    });

    scoreText.innerText = triviaScore;
    scoreDots.innerHTML = Array.from({ length: TRIVIA_QUESTIONS.length }).map((_, i) => `
        <div class="w-1.5 h-1.5 rounded-full ${i < triviaScore ? 'bg-yellow-400' : 'bg-stone-200'}"></div>
    `).join('');
}

function startGenerating() {
    progressBar.style.width = '0%';
    setTimeout(() => progressBar.style.width = '100%', 10);
    
    // Fake generation time
    setTimeout(() => {
        const theme = THEMES.find(t => t.id === selectedThemeId);
        generatedImg.src = "https://images.unsplash.com/photo-1519750783826-e2420f4d687f?q=80&w=800&auto=format&fit=crop";
        themeTag.innerText = theme.tag + "主题";
        themeTag.className = `px-2 py-1 ${theme.bgColor} text-white text-[8px] font-bold rounded-md shadow-sm`;
        showScreen('result');
    }, 6000);
}

// Event Listeners
startBtn.addEventListener('click', () => {
    showScreen('theme');
    renderThemes();
});

crossBtn.addEventListener('click', () => {
    if (!selectedThemeId) {
        alert("请先选择一个童年主题哦～");
        return;
    }
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        showScreen('generating');
        currentTriviaIndex = 0;
        triviaScore = 0;
        renderTrivia();
        startGenerating();
    }
});

backBtns.forEach(btn => btn.addEventListener('click', () => showScreen('welcome')));

blindBoxBtn.addEventListener('click', () => {
    const r = REWARDS[Math.floor(Math.random() * REWARDS.length)];
    rewardText.innerText = r;
    modalOverlay.classList.remove('hidden');
});

closeModals.forEach(btn => btn.addEventListener('click', () => modalOverlay.classList.add('hidden')));

// Init Lucide
lucide.createIcons();
