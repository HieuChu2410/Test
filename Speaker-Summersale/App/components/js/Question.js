function initQuestion() {
  const faqButtons = document.querySelectorAll("#question button");

  if (!faqButtons.length) return;

  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector("span");

      if (answer.classList.contains("open")) {
        // Đóng
        answer.style.maxHeight = null;
        answer.classList.remove("open");
        icon.textContent = "+";
      } else {
        // Accordion: đóng hết trước
        document.querySelectorAll("#question .faq-answer").forEach((ans) => {
          ans.style.maxHeight = null;
          ans.classList.remove("open");
        });
        document.querySelectorAll("#question button span").forEach((ic) => {
          ic.textContent = "+";
        });

        // Mở cái hiện tại
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.classList.add("open");
        icon.textContent = "−";
      }
    });
  });
}
