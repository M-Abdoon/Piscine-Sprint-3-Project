import { fetchAllUsersData } from "./logic.js";

async function setup() {
  const submitUsersBtn = document.getElementById("submitUsers");
  const usersInput = document.getElementById("usersInput");
  const languagesDropDownEl = document.getElementById("languagesDropDown");
  const loadingTextEl = document.getElementById("loadingText");
  const msgToUser = document.getElementById("msgToUser");

  let allUsersFetchedData = [];

  submitUsersBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    loadingTextEl.innerHTML = "Loading ...";
    msgToUser.innerHTML = "";

    const usernames = usersInput.value;
    allUsersFetchedData = await fetchAllUsersData(usernames);

    renderTable();
    allUsersFetchedData.forEach((result) => {
      if (result.notFound) {
        msgToUser.innerHTML += `User not found: ${result.username}<br>`;
      } else if (result.error) {
        msgToUser.innerHTML += `Error fetching ${result.username}: ${result.message}<br>`;
      }
    });

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

  allUsersDataInArray.forEach((userData) => {
    if (!userData.data) return;

    const currentUserData = userData.data;
    const langs = Object.keys(currentUserData.ranks?.languages || {});

    langs.forEach((lang) => {
      languagesOfAllUsers.push(lang);
    });
  });

  languagesOfAllUsers = new Set(languagesOfAllUsers);

  languagesDropDownEl.disabled = false;

  let option = `<option value="overall">Overall</option>`;
  languagesOfAllUsers.forEach((lang) => {
    option += `<option value="${lang}">${lang}</option>`;
  });
  languagesDropDownEl.innerHTML = option;
}

function renderTable() {
  const usersTableBodyEl = document.getElementById("usersTableBody");

  usersTableBodyEl.innerHTML = "";
  msgToUser.innerHTML = "";
}

function displayUsers(allUsersInArray, selectedLanguage) {
  const usersTableBody = document.getElementById("usersTableBody");
  let contentArray = [];

  allUsersInArray.forEach((userData) => {
    if (!userData.data) return;

    const currentUserData = userData.data;
    if (Object.values(currentUserData)[0] != null) {
      const langScore =
        selectedLanguage === "overall"
          ? currentUserData.ranks.overall
          : currentUserData.ranks.languages[selectedLanguage];

      const userClan = currentUserData.clan ?? "";

      if (!langScore) return;

      contentArray.push({
        username: currentUserData.username,
        clan: userClan,
        score: langScore.score,
      });
    }
  });
  contentArray.sort((a, b) => b.score - a.score);

  contentArray.forEach((currentUserData, i) => {
    let bgColor = "#333";
    let color = "white";
    if (i == 0) {
      bgColor = "#d3a409";
      color = "black";
    }

    usersTableBody.innerHTML += `
		<tr style="background-color:${bgColor}; color:${color}; border-bottom: 1px solid #555;">
			<td>${currentUserData.username}</td>
			<td>${currentUserData.clan}</td>
			<td>${currentUserData.score}</td>
			</tr>`;
  });
}

window.onload = setup;
