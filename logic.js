export async function getUserInfo(username) {
  try {
    const url = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
    );
    if (url.status === 404) {
      return { notFound: true, username };
    }

    return await url.json();
  } catch (error) {
    return { error: true, message: err.message };
  }
}

export async function fetchAllUsersData(listOfUsernames) {
  const allUsersInArray = listOfUsernames.split(",");
  let allUsersFetchedData = [];

  for (const username of allUsersInArray) {
    const userData = await getUserInfo(username);

    if (userData.notFound) {
      allUsersFetchedData.push({ [username]: null });
      msgToUser.innerHTML += `User not found: ${username}<br>`;
      continue;
    }

    if (userData.error) {
      msgToUser.innerHTML += `Error when fetching ${username}: ${result.message}<br>`;
      continue;
    }

    allUsersFetchedData.push(userData);
  }
  return allUsersFetchedData;
}
