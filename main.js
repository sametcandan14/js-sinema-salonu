// console.log("selam");

const container = document.querySelector(".container");

const count = document.getElementById("count");
const amount = document.getElementById("amount");

const calculateTotal = () => {
  let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
  console.log(selectedSeatCount);
};

// console.log(container);

// tıklanan koltuğun tespit edilmesi
container.addEventListener("click", (e) => {
  //   console.log(e.target.offsetParent);

  const clickedSeat = e.target.offsetParent;
  //   console.log(clickedSeat);

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});
