export async function getUserInfo(username) {
  try {
    const url = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
    );
    if (url.status === 404) {
      return { notFound: true, username };
    }

    return { data: await url.json() };
  } catch (error) {
    return { error: true, message: error.message };
  }
}

export async function fetchAllUsersData(listOfUsernames) {
  let allUsersInArray = listOfUsernames.split(",");

  allUsersInArray = allUsersInArray.map((u) => u.trim());
  allUsersInArray = allUsersInArray.filter((u) => u.length > 0);

  const allUsersFetchedData = await Promise.all(
    allUsersInArray.map((username) => getUserInfo(username)),
  );

  return allUsersFetchedData;
}
