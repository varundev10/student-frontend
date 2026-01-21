import { BASE_URL, getToken } from "./api";

export async function fetchStudents() {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/students`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function createStudent({ name, course }) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, course }),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function updateStudent(id, { name, course }) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, course }),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

export async function deleteStudent(id) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}/students/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  return { ok: res.ok, data };
}
