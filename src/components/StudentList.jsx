export default function StudentList({ students, onEdit, onDelete }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Students</h3>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul>
          {students.map((s) => (
            <li key={s.id}>
                <span className="course-badge">#{s.id} - {s.name} ({s.course})</span>
              <div className="student-actions">
              <button  className="edit-btn" onClick={() => onEdit(s)}>
                Edit
              </button>

              <button  className="delete-btn"  onClick={() => onDelete(s.id)}>
                Delete
              </button></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
