import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Internships = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    axios
      .get("/api/internships/applications/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des stages");
        setLoading(false);
      });
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Gestion des Stages</h1>
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
      {user?.role === "ETUDIANT" && (
        <button className="btn btn-primary" style={{ marginBottom: "1rem" }}>
          + Ajouter une demande
        </button>
      )}

      {!loading && !error && data && data.length > 0 ? (
        <div className="card table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Étudiant</th>
                <th>Sujet</th>
                <th>Entreprise</th>
                <th>Durée (mois)</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id || Math.random()}>
                  <td>
                    {d.student_details?.user_details?.first_name}{" "}
                    {d.student_details?.user_details?.last_name}
                  </td>
                  <td>{d.subject || "-"}</td>
                  <td>{d.company || "-"}</td>
                  <td>{d.duration_months || "-"}</td>
                  <td>
                    <span
                      style={{
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        backgroundColor:
                          d.status === "PENDING"
                            ? "#f59e0b"
                            : d.status === "VALIDATED"
                              ? "#10b981"
                              : "#f43f5e",
                        color: "white",
                      }}
                    >
                      {d.status || "UNKNOWN"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error ? (
        <div className="card">
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            Aucun stage trouvé.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Internships;
