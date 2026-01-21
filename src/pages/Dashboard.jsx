import { useEffect, useState } from "react";
import { clearToken } from "../api/api";
import { deleteStudent, fetchStudents, updateStudent } from "../api/studentApi";

import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";

export default function Dashboard({ setMsg }) {
  const [students, setStudents] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCourse, setEditCourse] = useState("");

  async function loadStudents() {
    setMsg("Loading students...");
    const { ok, data } = await fetchStudents();

    if (!ok) return setMsg(data.message || "Failed to load students");

    setStudents(data);
    setMsg("Students loaded ✅");
  }

  useEffect(() => {
    loadStudents();
    // eslint-disable-next-line
  }, []);

  async function handleDelete(id) {
    setMsg("Deleting...");
    const { ok, data } = await deleteStudent(id);

    if (!ok) return setMsg(data.message || "Delete failed");

    setMsg("Deleted ✅");
    loadStudents();
  }

  async function handleUpdate() {
    setMsg("Updating...");
    const { ok, data } = await updateStudent(editId, { name: editName, course: editCourse });

    if (!ok) return setMsg(data.message || "Update failed");

    setMsg("Updated ✅");
    setEditId(null);
    setEditName("");
    setEditCourse("");
    loadStudents();
  }

  function logout() {
    clearToken();
    window.location.reload();
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>

      <StudentForm onAdded={loadStudents} setMsg={setMsg} />

      <button style={{ marginTop: 20 }} onClick={loadStudents}>
        Refresh Students
      </button>

      <StudentList
        students={students}
        onEdit={(s) => {
          setEditId(s.id);
          setEditName(s.name);
          setEditCourse(s.course);
        }}
        onDelete={handleDelete}
      />

      {editId && (
        <div style={{ marginTop: 20 }}>
          <h3>Edit Student #{editId}</h3>

          <input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" />
          <br /><br />
          <input value={editCourse} onChange={(e) => setEditCourse(e.target.value)} placeholder="Course" />
          <br /><br />

          <button onClick={handleUpdate}>Update</button>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => {
              setEditId(null);
              setEditName("");
              setEditCourse("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
