import { useState } from "react";
import { createStudent } from "../api/studentApi";

export default function StudentForm({ onAdded, setMsg }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  async function addStudent() {
    setMsg("Adding student...");

    const { ok, data } = await createStudent({ name, course });

    if (!ok) return setMsg(data.message || "Failed to add student");

    setMsg("Student added ✅");
    setName("");
    setCourse("");
    onAdded();
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Add Student</h3>

      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" />
      <br /><br />
      <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" />
      <br /><br />

      <button className="btn-primary" onClick={addStudent}>Add</button>
    </div>
  );
}
