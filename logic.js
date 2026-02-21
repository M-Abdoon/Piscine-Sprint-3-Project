export async function getUserInfo(username) {
  try {
    const url = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
    );
    if (!url.ok) {
      return false;
    }
    return await url.json();
  } catch (error) {
    return false;
  }
}

export async function fetchAllUsersData(listOfUsernames) {
  const allUsersInArray = listOfUsernames.split(",");
  let allUsersFetchedData = [];

  for (const username of allUsersInArray) {
    const userData = await getUserInfo(username);

    if (!userData) {
      allUsersFetchedData.push({ [username]: null });
      continue;
    }

    allUsersFetchedData.push(userData);
  }
  return allUsersFetchedData;
}
