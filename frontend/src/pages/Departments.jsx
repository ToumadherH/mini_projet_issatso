import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Departments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    axios
      .get("/api/departments/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des départements");
        setLoading(false);
      });
  }, [token]);

  return (
    <div>
      <h1 style={{ marginBottom: "1.5rem" }}>Départements</h1>
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
                <th>ID</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Chef de Département</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id || Math.random()}>
                  <td>{d.id || "-"}</td>
                  <td>{d.name || "-"}</td>
                  <td>{d.description || "-"}</td>
                  <td>
                    {d.head_of_department_details?.first_name}{" "}
                    {d.head_of_department_details?.last_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !loading && !error ? (
        <div className="card">
          <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>
            Aucun département trouvé.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Departments;
