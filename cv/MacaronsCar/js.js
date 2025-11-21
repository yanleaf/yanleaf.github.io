// ============================
// HERO SLIDES DATA
// ============================
const heroSlides = [
  {
    titleLine1: "Cherry",
    titleLine2: "With",
    titleLine3: "White Chocolate",
    desc: "Cherry with White Chocolate 進口櫻桃果泥搭配法芙娜白巧克力，朱唇粉面的桃色搭配晶瑩雪白的餅皮，是視覺與味覺的雙重誘惑。",
    price: "$NT 680",
    badge: "暢銷",
    image: "images/m1.png",
    bgImage: null,
    titleColor: "#ff7e91",
    descColor: "#6a4a4a",
    priceColor: "#2d1f1f",
    bgLeft: "#ffe1e7",
    bgRight: "#fff4d6"
  },
  {
    titleLine1: "Passion Fruit",
    titleLine2: "With",
    titleLine3: "Milk Chocolate",
    desc: "百香果在內餡的選用上，選擇法國進口百香果果泥，以及法芙娜牛奶巧克力為主要原料。",
    price: "$NT 720",
    badge: "新口味",
    image: "images/m2.png",
    bgImage: null,
    titleColor: "#d9a638ff",
    descColor: "#6a4a4a",
    priceColor: "#2d1f1f",
    bgLeft: "#f1dcc2ff",
    bgRight: "#ffd6d6ff"
  },
  {
    titleLine1: "Earl Grey Tea",
    titleLine2: "with",
    titleLine3: "Milk Chocolate",
    desc: "進口伯爵紅茶搭配法芙娜牛奶巧克力，當您細細品嚐的同時，焦糖、香草、茶與佛手柑的組合。",
    price: "$NT 680",
    badge: "限定版",
    image: "images/m3.png",
    bgImage: null,
    titleColor: "#6194c8ff",
    descColor: "#6a4a4a",
    priceColor: "#2d1f1f",
    bgLeft: "#ddf9ffff",
    bgRight: "#fff4d6"
  }
];

// ============================
// DOM
// ============================
const heroSection = document.getElementById("heroSection");
const heroTitle  = document.getElementById("heroTitle");
const heroDesc   = document.getElementById("heroDesc");
const heroPrice  = document.getElementById("heroPrice");
const heroImage  = document.getElementById("heroImage");
const heroBadge  = document.getElementById("heroBadge");
const heroBg     = document.getElementById("heroBg");

// ============================
// 更新 HERO
// ============================
function updateHero(index) {
  const slide = heroSlides[index];

  heroImage.style.opacity = 0;
  heroDesc.style.opacity = 0;
  heroTitle.style.opacity = 0;
  heroBg.style.opacity = 0;

  setTimeout(() => {

    heroTitle.innerHTML = `
      <span>${slide.titleLine1}</span>
      <span>${slide.titleLine2}</span>
      <span>${slide.titleLine3}</span>
    `;
    heroDesc.textContent = slide.desc;
    heroPrice.textContent = slide.price;
    heroBadge.textContent = slide.badge;
    heroImage.src = slide.image;

    //  背景圖
    if (slide.bgImage) {
      heroBg.style.backgroundImage = `url(${slide.bgImage})`;
      heroBg.style.opacity = 1;
    } else {
      heroBg.style.backgroundImage = "none";
      heroBg.style.opacity = 0;
    }

    //  更新背景漸層顏色
    document.documentElement.style.setProperty("--hero-bg-left", slide.bgLeft);
    document.documentElement.style.setProperty("--hero-bg-right", slide.bgRight);

    document.documentElement.style.setProperty("--hero-title-color", slide.titleColor);
    document.documentElement.style.setProperty("--hero-desc-color", slide.descColor);
    document.documentElement.style.setProperty("--hero-price-color", slide.priceColor);


    heroImage.style.opacity = 1;
    heroDesc.style.opacity = 1;
    heroTitle.style.opacity = 1;

  }, 300);
}


// ============================
// 初始化
// ============================
let currentSlide = 0;
updateHero(currentSlide);

// ============================
// 自動輪播（可暫停）
// ============================
let heroInterval = null;

function startHeroAutoPlay() {
  stopHeroAutoPlay(); // 保險，避免重複啟動
  heroInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHero(currentSlide);
  }, 5000);
}

function stopHeroAutoPlay() {
  clearInterval(heroInterval);
}

// 開始輪播
startHeroAutoPlay();

// ============================
// 滑鼠滑過 → 暫停
// 滑鼠離開 → 繼續
// ============================
heroSection.addEventListener("mouseenter", stopHeroAutoPlay);
heroSection.addEventListener("mouseleave", startHeroAutoPlay);

// ============================
// 左右按鈕控制
// ============================
document.getElementById("heroPrev")?.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  updateHero(currentSlide);
});

document.getElementById("heroNext")?.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  updateHero(currentSlide);
});




// ==========================================
// Slider Elements
// ==========================================
const sliderWrapper = document.querySelector('.flavour-slider-wrapper');
const slider = document.querySelector('.flavour-slider-wrapper'); 
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

const CARD_WIDTH = 260; // 可調整

// ==========================================
// 0. 更新按鈕狀態
// ==========================================
function updateButtons() {
    const maxScroll = sliderWrapper.scrollWidth - sliderWrapper.clientWidth;

    btnPrev.disabled = sliderWrapper.scrollLeft <= 0;
    btnNext.disabled = sliderWrapper.scrollLeft >= maxScroll - 1;
}

// 初始化
updateButtons();

sliderWrapper.addEventListener('scroll', updateButtons);


// ==========================================
// 1. 按鈕滑動
// ==========================================
btnPrev.addEventListener('click', () => {
    sliderWrapper.scrollBy({ left: -CARD_WIDTH, behavior: 'smooth' });
});

btnNext.addEventListener('click', () => {
    sliderWrapper.scrollBy({ left: CARD_WIDTH, behavior: 'smooth' });
});


// ==========================================
// 2. 滑鼠拖曳 + 防沾黏
// ==========================================
let isDown = false;
let startX;
let scrollLeft;
let hasMoved = false;

function disableCardEvents() {
    sliderWrapper.classList.add('dragging');
}

function enableCardEvents() {
    sliderWrapper.classList.remove('dragging');
}

sliderWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    hasMoved = false;

    startX = e.pageX - sliderWrapper.offsetLeft;
    scrollLeft = sliderWrapper.scrollLeft;

    disableCardEvents();
});

sliderWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    enableCardEvents();
});

sliderWrapper.addEventListener('mouseup', () => {
    isDown = false;
    enableCardEvents();
});

sliderWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - sliderWrapper.offsetLeft;
    const walk = x - startX;

    if (Math.abs(walk) > 4) {
        hasMoved = true;
    }

    sliderWrapper.scrollLeft = scrollLeft - walk * 1.35;
});

sliderWrapper.addEventListener('click', (e) => {
    if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);


// ==========================================
// 3. Touch 手機拖曳
// ==========================================
sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - sliderWrapper.offsetLeft;
    scrollLeft = sliderWrapper.scrollLeft;
    hasMoved = false;
    disableCardEvents();
});

sliderWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - sliderWrapper.offsetLeft;
    const walk = x - startX;

    if (Math.abs(walk) > 3) {
        hasMoved = true;
    }

    sliderWrapper.scrollLeft = scrollLeft - walk * 1.25;
});

sliderWrapper.addEventListener('touchend', (e) => {
    enableCardEvents();

    if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
    }
}, true);

// ========================================================
// Toggle Grid / Slider
// ========================================================
const toggleBtn = document.getElementById("toggleLayout");
const sliderMode = document.getElementById("sliderMode");
const gridMode = document.getElementById("gridMode");

let isGridMode = false;

// 初次：複製 Slider 卡片到 Grid
function cloneCardsToGrid() {
    document.getElementById("gridTrack").innerHTML =
        document.getElementById("sliderTrack").innerHTML;
}
cloneCardsToGrid();

// 只有一顆按鈕的 Toggle 行為
toggleBtn.addEventListener("click", () => {
    isGridMode = !isGridMode;  // ← 核心 toggle

    if (isGridMode) {
        // 切換到 Grid
        sliderMode.style.display = "none";
        gridMode.style.display = "block";

        // 停用 Slider 按鈕
        btnPrev.disabled = true;
        btnNext.disabled = true;

        // icon 換成 Slider 樣式
        toggleBtn.innerHTML = '<span class="material-symbols-outlined">calendar_view_week</span>';
        toggleBtn.classList.add("active");

    } else {
        // 切回 Slider
        gridMode.style.display = "none";
        sliderMode.style.display = "block";

        // 恢復 Slider 按鈕狀態
        updateButtons();

        // icon 換成 Grid 樣式
        toggleBtn.innerHTML = '<span class="material-symbols-outlined">grid_on</span>';
        toggleBtn.classList.remove("active");
    }
});

  function changeImg(src) {
    document.getElementById("mainImg").src = src;
  }

  function showTab(n) {
    document.querySelectorAll(".tabs-nav button").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll(".tabs-nav button")[n].classList.add("active");
    document.querySelectorAll(".tab")[n].classList.add("active");
  }

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  const closeBtn = document.querySelector('.mobile-menu-close');

  menuBtn.addEventListener('click', () => {
    nav.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    nav.classList.remove('open');
  });
  