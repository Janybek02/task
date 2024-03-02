const userCardContainer = document.querySelector("[data-user-template]");
const userCardsContainer = document.querySelector(".main");
const search = document.querySelector(".search");
const sortEmail = document.querySelector(".select");
let users = [];
const load = document.querySelector(".loaderDiv");
const getUser = async () => {
  try {
    const url = `https://jsonplaceholder.typicode.com/users`;
    const response = await fetch(url);
    users = await response.json();
    setTimeout(() => {
      userCard(users);
      load.remove();
    }, 4000);

    console.log(users);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
search.addEventListener("keyup", (e) => {
  const value = e.target.value;
  const newUser = users.filter((item) => {
    const text = item.name.toLowerCase();
    return text.includes(value);
  });
  userCard(newUser);
});

sortEmail.addEventListener("change", (e) => {
  const value = e.target.value;
  let filterUsers;
  if (value == "a") {
    filterUsers = users.sort((a, b) => {
      if (a.email < b.email) {
        return -1;
      }
    });
  } else {
    filterUsers = users.sort((a, b) => {
      if (a.email > b.email) {
        return -1;
      }
    });
  }

  userCard(filterUsers);
});
const userCard = (users) => {
  userCardsContainer.innerHTML = "";
  users.map((items) => {
    const card = userCardContainer.content.cloneNode(true).children[0];
    const name = card.querySelector("[data-name]");
    const email = card.querySelector("[data-email]");
    const city = card.querySelector("[data-city]");
    const phone = card.querySelector("[data-phone]");
    name.textContent = items.name;
    email.textContent = items.email;
    phone.textContent = items.phone.slice(0, 10);
    city.textContent = items.address.city;
    userCardsContainer.append(card);
  });
};
getUser();
