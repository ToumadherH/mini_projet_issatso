-- ============================================================
-- 📋 Données Initiales pour ISSATSO+ (MySQL)
-- Charge automatiquement les département, utilisateurs, etc.
-- ============================================================

USE issatso_db;

-- 1️⃣ Départements
INSERT INTO departments_department (name, description) VALUES
('Informatique', 'Département d\'Informatique et Génie Logiciel'),
('Génie Civil', 'Département de Génie Civil et Infrastructure'),
('Électronique', 'Département d\'Électronique et Automatisme'),
('Mécanique', 'Département de Mécanique et Thermodynamique'),
('Chimie', 'Département de Chimie et Sciences des Matériaux');

-- 2️⃣ Utilisateurs (Admins)
INSERT INTO users_user (username, email, first_name, last_name, password, role, is_staff, is_active) VALUES
('admin', 'admin@issatso.com', 'Admin', 'System', 'pbkdf2_sha256$600000$abc123', 'ADMIN', 1, 1),
('prof_info', 'prof.info@issatso.com', 'Jean', 'Dupont', 'pbkdf2_sha256$600000$abc123', 'ENSEIGNANT', 0, 1),
('prof_web', 'prof.web@issatso.com', 'Marie', 'Martin', 'pbkdf2_sha256$600000$abc123', 'ENSEIGNANT', 0, 1),
('student1', 'student1@issatso.com', 'Ahmed', 'Ben Ali', 'pbkdf2_sha256$600000$abc123', 'ETUDIANT', 0, 1),
('student2', 'student2@issatso.com', 'Fatima', 'Saidane', 'pbkdf2_sha256$600000$abc123', 'ETUDIANT', 0, 1);

-- 3️⃣ Étudiants
INSERT INTO students_student (user_id, matricule, enrollment_year) VALUES
(4, 'E20230001', '2023-2024'),
(5, 'E20230002', '2023-2024');

-- 4️⃣ Cours
INSERT INTO courses_course (name, description, department_id, level, teacher_id) VALUES
('Programmation Python', 'Introduction à Python et algorithmique', 1, '1ere annee', 2),
('Web Development (Django)', 'Django, DRF et déploiement', 1, '2eme annee', 3),
('Bases de Données', 'MySQL, SQL avancé', 1, '2eme annee', 2),
('Structure de Données', 'Arbres, graphes et algorithmes', 1, '1ere annee', 3);

-- 5️⃣ Emploi du Temps
INSERT INTO courses_schedule (course_id, day_of_week, start_time, end_time, room) VALUES
(1, 'LUNDI', '08:00', '10:00', 'A101'),
(1, 'MERCREDI', '14:00', '16:00', 'A101'),
(2, 'MARDI', '10:00', '12:00', 'B205'),
(2, 'JEUDI', '14:00', '16:00', 'B205'),
(3, 'LUNDI', '10:00', '12:00', 'C102'),
(3, 'JEUDI', '08:00', '10:00', 'C102'),
(4, 'MERCREDI', '08:00', '10:00', 'A102'),
(4, 'VENDREDI', '10:00', '12:00', 'A102');

-- 6️⃣ Inscriptions
INSERT INTO students_enrollment (student_id, course_id, academic_year, level) VALUES
(1, 1, '2023-2024', '1ere annee'),
(1, 3, '2023-2024', '2eme annee'),
(2, 1, '2023-2024', '1ere annee'),
(2, 4, '2023-2024', '1ere annee');

-- 7️⃣ Notes
INSERT INTO courses_grade (student_id, course_id, assessment_type, value) VALUES
(1, 1, 'DS', 15.5),
(1, 1, 'EXAMEN', 16.0),
(1, 3, 'DS', 14.0),
(2, 1, 'DS', 12.5),
(2, 1, 'EXAMEN', 13.5),
(2, 4, 'DS', 17.0);

-- 8️⃣ Absences
INSERT INTO attendance_absencecord (student_id, course_id, date, justified) VALUES
(1, 1, '2024-01-15', 0),
(2, 4, '2024-01-16', 1);

-- 9️⃣ Stages
INSERT INTO internships_internshipapplication (student_id, subject, company, duration_months, status, description) VALUES
(1, 'Développement Web', 'TechCorp Tunisia', 3, 'VALIDATED', 'Stage en développement Django et React'),
(2, 'Analyse de Données', 'DataSoft', 4, 'PENDING', 'Stage en Python et Big Data');

-- ✅ Confirmation
SELECT '✅ Données initiales chargées avec succès!' AS Status;
SELECT COUNT(*) as 'Utilisateurs' FROM users_user;
SELECT COUNT(*) as 'Cours' FROM courses_course;
SELECT COUNT(*) as 'Étudiants' FROM students_student;
SELECT COUNT(*) as 'Emplois du Temps' FROM courses_schedule;
SELECT COUNT(*) as 'Notes' FROM courses_grade;
SELECT COUNT(*) as 'Stages' FROM internships_internshipapplication;
