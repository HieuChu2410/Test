function startCountdown(days) {
  let countdownTime = days * 24 * 60 * 60 * 1000;

  function updateCountdown() {
    let daysLeft = Math.floor(countdownTime / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor(
      (countdownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutesLeft = Math.floor(
      (countdownTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    let secondsLeft = Math.floor((countdownTime % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(daysLeft).padStart(
      2,
      "0"
    );
    document.getElementById("hours").textContent = String(hoursLeft).padStart(
      2,
      "0"
    );
    document.getElementById("minutes").textContent = String(
      minutesLeft
    ).padStart(2, "0");
    document.getElementById("seconds").textContent = String(
      secondsLeft
    ).padStart(2, "0");

    countdownTime -= 1000;
    if (countdownTime < 0) {
      clearInterval(timer);
    }
  }

  updateCountdown();
  let timer = setInterval(updateCountdown, 1000);
}
startCountdown(30);
