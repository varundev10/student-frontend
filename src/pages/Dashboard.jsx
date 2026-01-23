import { useEffect, useState } from "react";
import { clearToken } from "../api/api";
import { deleteStudent, fetchStudents, updateStudent, createStudent } from "../api/studentApi";

import StudentList from "../components/StudentList";

export default function Dashboard({ setMsg }) {
  const [students, setStudents] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCourse, setEditCourse] = useState("");

  const [addName, setAddName] = useState("");
  const [addCourse, setAddCourse] = useState("");

  const Name_REGEX = /^[a-zA-Z_ ]{2,30}$/;
  const Course_REGEX = /^[a-zA-Z0-9_ ]{2,50}$/;

  async function loadStudents() {
    setMsg("Loading students...");
    const { ok, data } = await fetchStudents();

    if (!ok) return setMsg(data.message || "Failed to load students");

    setStudents(data);
    setMsg("Students loaded ✅");
  }

  async function addStudent() {
    if (!Name_REGEX.test(addName.trim())) {
      return setMsg("Name must be 2-30 letters, spaces, or underscores only");
    }
    if (!Course_REGEX.test(addCourse.trim())) {
      return setMsg("Course must be 2-50 characters, letters, numbers, spaces, or underscores only");
    }

    setMsg("Adding student...");

    const { ok, data } = await createStudent({ name: addName, course: addCourse });

    if (!ok) return setMsg(data.message || "Failed to add student");

    setMsg("Student added ✅");
    setAddName("");
    setAddCourse("");
    loadStudents();
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
    <div className="container">
      <button className="button-primary" style={{ position: 'fixed', top: '30px', right: '30px', width: 'auto' }} onClick={logout}>Logout</button>

      <h3>Add Student</h3>

      <input value={addName} onChange={(e) => setAddName(e.target.value)} placeholder="Student name" />
      <br /><br />
      <input value={addCourse} onChange={(e) => setAddCourse(e.target.value)} placeholder="Course" />
      <br /><br />

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="button-primary" onClick={addStudent}>Add</button>
        <button className="button-primary" onClick={loadStudents}>Refresh Students</button>
      </div>

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

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={handleUpdate}>Update</button>
            <button
              onClick={() => {
                setEditId(null);
                setEditName("");
                setEditCourse("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
