import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Students = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    axios
      .get("/api/students/enrollments/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des étudiants");
        setLoading(false);
      });
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Étudiants Inscrits</h1>
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
      {!loading && !error && data && data.length > 0 ? (
        <div className="card table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Matricule</th>
                <th>Nom Complet</th>
                <th>Département</th>
                <th>Année</th>
                <th>Niveau</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id || Math.random()}>
                  <td>{d.student_details?.matricule || "-"}</td>
                  <td>
                    {d.student_details?.user_details?.first_name}{" "}
                    {d.student_details?.user_details?.last_name}
                  </td>
                  <td>{d.department_details?.name || "-"}</td>
                  <td>{d.academic_year || "-"}</td>
                  <td>{d.level || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error ? (
        <div className="card">
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            Aucun étudiant trouvé.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Students;
