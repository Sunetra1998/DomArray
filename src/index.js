const api = `https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const ascSortBtn = document.getElementById("sort-asc");
const dscSortBtn = document.getElementById("sort-dsc");

const appState = [];
class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = `${title}`;
    this.name = `${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userjson = await userData.json();
  const user = userjson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);

  domRenderer(appState);
});

searchInput.addEventListener("keyup", searchEventHandler);
dscSortBtn.addEventListener("click", dscSortHandler);
ascSortBtn.addEventListener("click", ascSortHandler);

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userElement = document.createElement("div");
    userElement.innerHTML = `<div class="mainCard"> 
    <div class="card">
    <div>${userObj.title} ${userObj.name}</div>
    <div> ${userObj.email}</div>
    <div> ${userObj.gender}</div>
    </div>
  </div>`;
    userList.appendChild(userElement);
  });
};
function searchEventHandler(e) {
  console.log(e, searchInput.value);

  const filterAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filterAppState);
}
function dscSortHandler() {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRenderer(appStateCopy);
}

function ascSortHandler() {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));
  domRenderer(appStateCopy);
}
