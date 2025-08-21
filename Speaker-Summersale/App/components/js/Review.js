if (typeof Swiper !== "undefined") {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    freeMode: true,
    spaceBetween: 0,
  });
  const customSwiper = new Swiper(".custom-swiper", {
    direction: "horizontal",
    mousewheel: true, 
  });
}
