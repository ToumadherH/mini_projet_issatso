import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Schedule = () => {
  const [data, setData] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  // State form
  const [courseId, setCourseId] = useState("");
  const [day, setDay] = useState("LUNDI");
  const [start, setStart] = useState("08:30");
  const [end, setEnd] = useState("10:00");
  const [room, setRoom] = useState("");

  const fetchSchedule = () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    axios
      .get("/api/courses/schedule/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement de l'emploi du temps");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!token) return;
    fetchSchedule();
    if (isAdmin) {
      axios
        .get("/api/courses/list/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCourses(res.data))
        .catch((err) => {
          console.error(err);
          setError("Erreur lors du chargement des cours");
        });
    }
  }, [token, isAdmin]);

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/api/courses/schedule/",
        {
          course: courseId,
          day_of_week: day,
          start_time: start,
          end_time: end,
          room: room,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchSchedule(); // Refresh
      setRoom("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création");
    }
  };

  // Filter for students based on enrollment (simulated visually if not strictly enforced in backend)
  // For teachers, we only show their taught courses.
  // The API could handle this, but we show the full table here for simplicity unless it's a student.

  return (
    <div className="fade-in">
      <h1 style={{ marginBottom: "1.5rem" }}>Emploi du temps</h1>

      {loading && (
        <p
          style={{
            padding: "1rem",
            backgroundColor: "#e3f2fd",
            borderRadius: "4px",
            color: "#1976d2",
          }}
        >
          Chargement...
        </p>
      )}
      {error && (
        <p
          style={{
            padding: "1rem",
            backgroundColor: "#ffebee",
            borderRadius: "4px",
            color: "#c62828",
          }}
        >
          ❌ {error}
        </p>
      )}

      {isAdmin && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3>Créer un créneau (Admin)</h3>
          <form
            onSubmit={handleAddSchedule}
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "1rem",
            }}
          >
            <select
              className="form-select"
              style={{ flex: 1, minWidth: "150px" }}
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Sélectionner un cours</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.level})
                </option>
              ))}
            </select>
            <select
              className="form-select"
              style={{ width: "120px" }}
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              <option value="LUNDI">Lundi</option>
              <option value="MARDI">Mardi</option>
              <option value="MERCREDI">Mercredi</option>
              <option value="JEUDI">Jeudi</option>
              <option value="VENDREDI">Vendredi</option>
              <option value="SAMEDI">Samedi</option>
            </select>
            <input
              type="time"
              className="form-input"
              style={{ width: "100px" }}
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
            <input
              type="time"
              className="form-input"
              style={{ width: "100px" }}
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-input"
              placeholder="Salle"
              style={{ flex: 1, minWidth: "100px" }}
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </form>
        </div>
      )}

      {!loading && !error && data && data.length > 0 ? (
        <div className="card table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Jour</th>
                <th>Horaire</th>
                <th>Cours</th>
                <th>Classe</th>
                <th>Enseignant</th>
                <th>Salle</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id || Math.random()}>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "var(--primary-color)",
                    }}
                  >
                    {d.day_of_week || "-"}
                  </td>
                  <td>
                    {d.start_time?.substring(0, 5) || "-"} -{" "}
                    {d.end_time?.substring(0, 5) || "-"}
                  </td>
                  <td>{d.course_details?.name || "-"}</td>
                  <td>
                    <span className="badge badge-success">
                      {d.course_details?.level || "-"}
                    </span>
                  </td>
                  <td>{d.course_details?.teacher_details?.last_name || "-"}</td>
                  <td>{d.room || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error ? (
        <div className="card">
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            Aucun emploi du temps disponible.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Schedule;
