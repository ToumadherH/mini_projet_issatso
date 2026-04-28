import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Attendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    axios
      .get("/api/attendance/records/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des absences");
        setLoading(false);
      });
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Absences</h1>
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
      {user?.role === "ENSEIGNANT" && (
        <button className="btn btn-primary" style={{ marginBottom: "1rem" }}>
          + Marquer une absence
        </button>
      )}

      {!loading && !error && data && data.length > 0 ? (
        <div className="card table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Étudiant</th>
                <th>Cours</th>
                <th>Justifié</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id || Math.random()}>
                  <td>{d.date || "-"}</td>
                  <td>
                    {d.student_details?.user_details?.first_name}{" "}
                    {d.student_details?.user_details?.last_name}
                  </td>
                  <td>{d.course_name || "-"}</td>
                  <td>{d.justified ? "Oui" : "Non"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error ? (
        <div className="card">
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            Aucune absence trouvée.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Attendance;
