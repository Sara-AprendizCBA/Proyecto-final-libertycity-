const API_URL = "https://693dddb2f55f1be79303df76.mockapi.io/api/v1/users";

// =========================
// Registro
// =========================
export async function registerUser(userData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    throw new Error("Error al registrar usuario");
  }

  return await res.json();
}

// =========================
// Login
// =========================
export async function loginUser(email, password) {
  const res = await fetch(
    `${API_URL}?email=${email}&password=${password}`
  );

  const data = await res.json();

  if (data.length === 0) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return data[0];
}

// =========================
// Actualizar usuario
// =========================
export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar usuario");
  }

  return await res.json();
}
