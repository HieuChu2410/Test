function initDetail() {
  const root = document.getElementById("detail");
  if (!root) return;


  const variantBigImgs = [
    "./assets/detail_black.webp",
    "./assets/detail_white.webp",
    "./assets/detail_gold.webp",
    "./assets/detail_bb.webp",
    "./assets/detail_pink.webp",
    "./assets/detail_green.webp",
  ];
  const variantNames = ["Black", "White", "Gold", "Blue", "Pink", "Green"];

 
  const desktopWrap = root.querySelector(".hidden.md\\:flex");
  const bigImg = root.querySelector(".hidden.md\\:flex div.max-w-full img");
  const thumbs = Array.from(
    root.querySelectorAll(".hidden.md\\:flex img[data-img]")
  );

  const colorNameEl = root.querySelector("#colorName");
  const colorList = colorNameEl ? colorNameEl.nextElementSibling : null;
  const colorDots = colorList
    ? Array.from(colorList.querySelectorAll("li"))
    : [];

  const swiperEl = root.querySelector(".md\\:hidden .swiper");

  let mobileSwiper = null;
  if (typeof Swiper !== "undefined" && swiperEl) {
    mobileSwiper = new Swiper(swiperEl, {
      loop: true,
      spaceBetween: 10,
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  
  function setMainImage(src) {
    if (bigImg) bigImg.src = src;
   
  }


  root.querySelectorAll(".divide-y button").forEach((btn) => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector("span");
    if (!content) return;

    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.3s ease";
    content.classList.add("hidden"); 

    btn.addEventListener("click", () => {
      const isOpen = content.classList.contains("open");

      root.querySelectorAll(".divide-y button").forEach((otherBtn) => {
        const otherContent = otherBtn.nextElementSibling;
        const otherIcon = otherBtn.querySelector("span");
        if (!otherContent) return;

        otherContent.style.maxHeight = null;
        otherContent.classList.remove("open");
        otherContent.classList.add("hidden");
        if (otherIcon) otherIcon.textContent = "+";
      });

      if (!isOpen) {
        content.classList.remove("hidden");
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.textContent = "-";
      }
    });
  });

  if (thumbs.length) {
    thumbs.forEach((t, i) => {
      if (i !== 0) t.classList.remove("border-2", "border-black");
    });

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const src = thumb.getAttribute("data-img");
        if (!src) return;
        setMainImage(src);

        thumbs.forEach((t) => t.classList.remove("border-2", "border-black"));
        thumb.classList.add("border-2", "border-black");
      });
    });
  }

  if (colorDots.length) {
    colorDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        const imgSrc = variantBigImgs[i] || variantBigImgs[0];
        setMainImage(imgSrc);

        if (colorNameEl) colorNameEl.textContent = variantNames[i] || "";

        colorDots.forEach((d) => (d.style.boxShadow = ""));
        dot.style.boxShadow = "0 0 0 2px #fff, 0 0 0 3px #000";
      });
    });
  }

  if (bigImg) {
    let startX = 0;
    let isDown = false;
    const threshold = 40;

    const getIndex = () => {
      const src = bigImg.getAttribute("src") || "";
      const idx = variantBigImgs.indexOf(src);
      return idx >= 0 ? idx : 0;
    };

    const go = (delta) => {
      let idx = getIndex();
      idx = (idx + delta + variantBigImgs.length) % variantBigImgs.length;
      setMainImage(variantBigImgs[idx]);
    };

    bigImg.addEventListener("dragstart", (e) => e.preventDefault());

    bigImg.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.clientX;
    });
    window.addEventListener("mouseup", (e) => {
      if (!isDown) return;
      isDown = false;
      const dx = e.clientX - startX;
      if (dx <= -threshold) go(+1);
      if (dx >= threshold) go(-1);
    });

    bigImg.addEventListener(
      "touchstart",
      (e) => {
        isDown = true;
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );
    bigImg.addEventListener("touchend", (e) => {
      if (!isDown) return;
      isDown = false;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx <= -threshold) go(+1);
      if (dx >= threshold) go(-1);
    });
  }

  function copyCode() {
    const codeEl = document.querySelector("#promoCode");
    const copyBtn = document.querySelector("#copyBtn");
    const msgEl = document.querySelector("#copiedMsg");
    if (!codeEl) return;

    const text = codeEl.textContent.trim();
    navigator.clipboard.writeText(text).then(() => {
    
      codeEl.classList.add("hidden");
      copyBtn.classList.add("hidden");

      msgEl.classList.remove("hidden");

      setTimeout(() => {
        codeEl.classList.remove("hidden");
        copyBtn.classList.remove("hidden");
        msgEl.classList.add("hidden");
      }, 1200);
    });
  }

  window.copyCode = copyCode;

  if (bigImg && !bigImg.getAttribute("src")) {
    setMainImage(variantBigImgs[0]);
  }
}
