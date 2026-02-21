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

console.log(await getUserInfo("M-Abdoon"));
