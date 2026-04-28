import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Grades = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    axios
      .get("/api/courses/grades/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des notes");
        setLoading(false);
      });
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Notes & Résultats</h1>
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
          + Saisir des notes
        </button>
      )}

      {!loading && !error && data && data.length > 0 ? (
        <div className="card table-wrapper">
          <table>
            <thead>
              <tr>
                {user?.role !== "ETUDIANT" && <th>Étudiant</th>}
                <th>Cours</th>
                <th>Type d'évaluation</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id || Math.random()}>
                  {user?.role !== "ETUDIANT" && (
                    <td>
                      {d.student_details?.user_details?.first_name}{" "}
                      {d.student_details?.user_details?.last_name}
                    </td>
                  )}
                  <td>{d.course_details?.name || "-"}</td>
                  <td>{d.assessment_type || "-"}</td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: parseFloat(d.value) >= 10 ? "#10b981" : "#f43f5e",
                    }}
                  >
                    {d.value || "-"} / 20
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error ? (
        <div className="card">
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            Aucune note trouvée.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Grades;
