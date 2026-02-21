import { fetchAllUsersData } from "./logic.js";

async function setup() {
  const submitUsersBtn = document.getElementById("submitUsers");
  const usersInput = document.getElementById("usersInput");
  const languagesDropDownEl = document.getElementById("languagesDropDown");
  const loadingTextEl = document.getElementById("loadingText");

  let allUsersFetchedData = [];

  submitUsersBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    loadingTextEl.innerHTML = "Loading ...";
    const allUsersInArray = usersInput.value;

    renderTable();
    allUsersFetchedData = await fetchAllUsersData(allUsersInArray);
    fillLanguagesDropDown(allUsersFetchedData);
    displayUsers(allUsersFetchedData, "overall");
    loadingTextEl.innerHTML = "";
  });

  languagesDropDownEl.addEventListener("change", () => {
    loadingTextEl.innerHTML = "Loading ...";
    renderTable();
    displayUsers(allUsersFetchedData, languagesDropDownEl.value);
    loadingTextEl.innerHTML = "";
  });
}

function fillLanguagesDropDown(allUsersDataInArray) {
  const languagesDropDownEl = document.getElementById("languagesDropDown");
  let languagesOfAllUsers = [];

  //allUsersDataInArray = allUsersDataInArray.filter(user => Object.values(user)[0] != null);

  allUsersDataInArray.forEach((userData) => {
    const langs = Object.keys(userData.ranks?.languages || {});

    langs.forEach((lang) => {
      languagesOfAllUsers.push(lang);
    });
  });

  languagesOfAllUsers = new Set(languagesOfAllUsers);

  languagesDropDownEl.disabled = false;
  languagesDropDownEl.innerHTML = `<option value="overall">Overall</option>`;
  languagesOfAllUsers.forEach((lang) => {
    languagesDropDownEl.innerHTML += `<option value="${lang}">${lang}</option>`;
  });
}

function renderTable() {
  const usersTableBodyEl = document.getElementById("usersTableBody");
  const msgToUser = document.getElementById("msgToUser");

  usersTableBodyEl.innerHTML = "";
  msgToUser.innerHTML = "";
}

function displayUsers(allUsersInArray, selectedLanguage) {
  const usersTableBody = document.getElementById("usersTableBody");
  const msgToUser = document.getElementById("msgToUser");
  let contentArray = [];

  allUsersInArray.forEach((userData) => {
    if (Object.values(userData)[0] != null) {
      const langScore =
        selectedLanguage === "overall"
          ? (userData.ranks.overall?.score ?? 0)
          : (userData.ranks.languages[selectedLanguage]?.score ?? 0);

      const userClan = userData.clan ?? "";

      if (langScore !== 0) {
        contentArray.push({
          username: userData.username,
          clan: userClan,
          score: langScore,
        });
      }
    } else {
      msgToUser.innerHTML += `Failed to fetch user: ${Object.keys(userData)[0]}`;
      msgToUser.innerHTML += `<br>`;
    }
  });
  contentArray.sort((a, b) => b.score - a.score);

  contentArray.forEach((userData, i) => {
    let bgColor = "#333";
    let color = "white";
    if (i == 0) {
      bgColor = "#d3a409";
      color = "black";
    }

    usersTableBody.innerHTML += `
		<tr style="background-color:${bgColor}; color:${color}; border-bottom: 1px solid #555;">
			<td>${userData.username}</td>
			<td>${userData.clan}</td>
			<td>${userData.score}</td>
			</tr>`;
  });
}

window.onload = setup;
