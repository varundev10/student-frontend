export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Students</h3>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id} style={{ marginBottom: 10 }}>
              #{s.id} - {s.name} ({s.course})

              <button style={{ marginLeft: 10 }} onClick={() => onEdit(s)}>
                Edit
              </button>

              <button style={{ marginLeft: 10 }} onClick={() => onDelete(s.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
