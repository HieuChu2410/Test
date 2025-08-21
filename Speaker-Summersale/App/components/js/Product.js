const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  breakpoints: {
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 4, spaceBetween: 30 },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  grabCursor: true, 
});

document.querySelectorAll("[data-img]").forEach((dot) => {
  ["click", "mouseenter"].forEach((evt) => {
    dot.addEventListener(evt, () => {
      const imgSrc = dot.getAttribute("data-img");
      const parent = dot.closest(".swiper-slide");
      const imgTag = parent.querySelector("img");

      if (imgSrc && imgTag) {
        imgTag.src = imgSrc;

        parent
          .querySelectorAll("[data-img]")
          .forEach((d) => d.classList.remove("ring-2", "ring-black"));
        dot.classList.add("ring-2", "ring-black");
      }
    });
  });
});

document.querySelectorAll(".stock").forEach((el) => {
  const stock = parseInt(el.textContent.replace(/\D/g, ""));
  if (!isNaN(stock) && stock < 5) {
    el.textContent = `Very low stock (${stock} units)`;
    el.style.color = "#c00000";
  }
});


document.querySelectorAll(".swiper-slide").forEach((slide) => {
  const actionBtns = slide.querySelector(".hidden-buttons"); 
  if (actionBtns) {
    slide.addEventListener("mouseenter", () => {
      actionBtns.classList.remove("opacity-0", "invisible");
      actionBtns.classList.add("opacity-100", "visible");
    });
    slide.addEventListener("mouseleave", () => {
      actionBtns.classList.add("opacity-0", "invisible");
      actionBtns.classList.remove("opacity-100", "visible");
    });
  }
});
