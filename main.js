// console.log("selam");

const container = document.querySelector(".container");

const count = document.getElementById("count");
const amount = document.getElementById("amount");

const movieList = document.querySelector("#movie");

const infoText = document.querySelector(".infoText");

const seats = container.querySelectorAll(".seat:not(.reserved)");

// console.log(seats);

// console.log(movieList.selectedIndex);

const saveSeatsToDatabase = (seatIndex) => {
  localStorage.setItem("seatIndex", JSON.stringify(seatIndex));

  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

const getSeatsFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatIndex"));
  // console.log(dbSelectedSeats);

  if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  // console.log(dbSelectedMovie);

  movieList.selectedIndex = dbSelectedMovie;
};

getSeatsFromDatabase();

const calculateTotal = () => {
  const allSeatsArray = [];

  seats.forEach((seat) => allSeatsArray.push(seat));

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");

  allSelectedSeats.forEach((selected) => allSelectedSeatsArray.push(selected));

  const selectedSeatsIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });

  // console.log(selectedSeatsIndex);

  // console.log(allSelectedSeats);

  let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
  // console.log(selectedSeatCount);
  count.innerText = selectedSeatCount;
  amount.innerText = selectedSeatCount * movieList.value;

  if (selectedSeatCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }

  saveSeatsToDatabase(selectedSeatsIndex);
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

movieList.addEventListener("change", () => {
  calculateTotal();
});

calculateTotal();
