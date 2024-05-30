export async function hash(string) {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");
    return hashHex
}

export async function CreateUser(login, password) {
  if (login && password) {
    await hash(password).then(passwordHash=>{
      const user = { login, password: passwordHash };
      sessionStorage.setItem("CURRENT_USER", JSON.stringify(user));
      localStorage.setItem(
        `user${GetMaxValueNumberOfUser()}`,
        JSON.stringify(user)
      );
    });
  } else {
    throw new Error("Password and login can not be empty");
  }
}

function GetMaxValueNumberOfUser() {
  const keys = Object.keys(localStorage);

  const validKeys = keys.filter((key) => key.startsWith("user"));

  let max = -1;
  validKeys.forEach((key) => {
    const numberKey= +key.slice(4);
    if (numberKey > max) {
      max = numberKey;
    }
  });

  return max + 1;
}
