import { getUserInfo, fetchAllUsersData } from "./logic.js";

const usersInput = document.getElementById("submitUsers");
usersInput.addEventListener("click", async (e) => {
  e.preventDefault();
  const submitUsersBtn = document.getElementById("usersInput").value;
  console.log(await fetchAllUsersData(submitUsersBtn));
});
