import os
import django
from datetime import time, date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from users.models import User
from departments.models import Department
from students.models import StudentProfile, Enrollment
from courses.models import Course, Schedule, CourseMaterial, Grade
from attendance.models import Absence
from internships.models import Internship

def seed_db():
    print("⏳ Création massive des données de test...")

    # 1. Admin
    admin, _ = User.objects.get_or_create(username='admin', defaults={'email': 'admin@univ.com', 'role': 'ADMIN'})
    admin.set_password('admin123')
    admin.is_superuser = True
    admin.is_staff = True
    admin.save()

    # 2. Chefs de Département
    chef_info, _ = User.objects.get_or_create(username='chef_info', defaults={'email': 'chef@univ.com', 'role': 'CHEF', 'first_name': 'Jean', 'last_name': 'Dupont'})
    chef_info.set_password('chef123')
    chef_info.save()
    
    chef_math, _ = User.objects.get_or_create(username='chef_math', defaults={'email': 'math@univ.com', 'role': 'CHEF', 'first_name': 'Sophie', 'last_name': 'Martin'})
    chef_math.set_password('chef123')
    chef_math.save()

    # 3. Départements
    dept_info, _ = Department.objects.get_or_create(name='Informatique', defaults={'description': "Département d'Informatique", 'head_of_department': chef_info})
    dept_math, _ = Department.objects.get_or_create(name='Mathématiques', defaults={'description': "Département de Mathématiques", 'head_of_department': chef_math})

    # 4. Enseignants
    prof1, _ = User.objects.get_or_create(username='prof1', defaults={'email': 'prof1@univ.com', 'role': 'ENSEIGNANT', 'first_name': 'Marie', 'last_name': 'Curie'})
    prof1.set_password('prof123')
    prof1.save()
    
    prof2, _ = User.objects.get_or_create(username='prof2', defaults={'email': 'prof2@univ.com', 'role': 'ENSEIGNANT', 'first_name': 'Alan', 'last_name': 'Turing'})
    prof2.set_password('prof123')
    prof2.save()

    prof3, _ = User.objects.get_or_create(username='prof3', defaults={'email': 'prof3@univ.com', 'role': 'ENSEIGNANT', 'first_name': 'Ada', 'last_name': 'Lovelace'})
    prof3.set_password('prof123')
    prof3.save()

    # 5. Cours (Assignés aux classes)
    c1, _ = Course.objects.get_or_create(name='Algorithmique Avancée', level='1ere annee', defaults={'department': dept_info, 'teacher': prof1, 'description': 'Bases des algorithmes'})
    c2, _ = Course.objects.get_or_create(name='Bases de Données', level='1ere annee', defaults={'department': dept_info, 'teacher': prof2, 'description': 'SQL et NoSQL'})
    c3, _ = Course.objects.get_or_create(name='Programmation Web', level='2eme annee', defaults={'department': dept_info, 'teacher': prof1, 'description': 'React & Django'})
    c4, _ = Course.objects.get_or_create(name='Intelligence Artificielle', level='3eme annee', defaults={'department': dept_info, 'teacher': prof2, 'description': 'Machine Learning'})
    c5, _ = Course.objects.get_or_create(name='Algèbre Linéaire', level='1ere annee', defaults={'department': dept_math, 'teacher': prof3, 'description': 'Espaces vectoriels'})

    # 6. Étudiants
    etudiants = [
        ('etudiant1', 'Ali', 'Ben Salah', 'INFO2026-001', dept_info, '1ere annee'),
        ('etudiant2', 'Sara', 'Mansour', 'INFO2026-002', dept_info, '1ere annee'),
        ('etudiant3', 'Youssef', 'Karim', 'INFO2025-001', dept_info, '2eme annee'),
        ('etudiant4', 'Lina', 'Fahmi', 'MATH2026-001', dept_math, '1ere annee'),
    ]
    
    student_profiles = {}
    for uname, fname, lname, mat, dept, level in etudiants:
        u, _ = User.objects.get_or_create(username=uname, defaults={'email': f'{uname}@univ.com', 'role': 'ETUDIANT', 'first_name': fname, 'last_name': lname})
        u.set_password('etud123')
        u.save()
        prof, _ = StudentProfile.objects.get_or_create(user=u, defaults={'matricule': mat})
        Enrollment.objects.get_or_create(student=prof, academic_year='2025-2026', defaults={'department': dept, 'level': level})
        student_profiles[uname] = prof

    # 7. Emploi du temps massifs
    schedules = [
        (c1, 'LUNDI', 8, 30, 10, 0, 'Amphi A'),
        (c2, 'LUNDI', 10, 15, 11, 45, 'Salle 102'),
        (c5, 'LUNDI', 14, 0, 15, 30, 'Amphi B'),
        (c1, 'MARDI', 8, 30, 10, 0, 'Amphi A'),
        (c3, 'MARDI', 10, 15, 12, 15, 'Labo 3'),
        (c4, 'MERCREDI', 9, 0, 12, 0, 'Salle IA'),
        (c2, 'JEUDI', 14, 0, 16, 0, 'Salle 102'),
        (c3, 'VENDREDI', 8, 30, 10, 0, 'Labo 3'),
    ]
    
    for c, day, h1, m1, h2, m2, room in schedules:
        Schedule.objects.get_or_create(course=c, day_of_week=day, start_time=time(h1, m1), end_time=time(h2, m2), defaults={'room': room})

    # 8. Notes
    Grade.objects.get_or_create(course=c1, student=student_profiles['etudiant1'], defaults={'value': 15.5, 'assessment_type': 'Examen Final'})
    Grade.objects.get_or_create(course=c2, student=student_profiles['etudiant1'], defaults={'value': 18.0, 'assessment_type': 'Projet'})
    Grade.objects.get_or_create(course=c1, student=student_profiles['etudiant2'], defaults={'value': 12.0, 'assessment_type': 'Examen Final'})
    Grade.objects.get_or_create(course=c3, student=student_profiles['etudiant3'], defaults={'value': 16.5, 'assessment_type': 'TP'})

    # 9. Absences
    Absence.objects.get_or_create(student=student_profiles['etudiant1'], course_name='Programmation Web', date=date.today(), defaults={'teacher': prof1, 'justified': False})
    
    # 10. Stages
    Internship.objects.get_or_create(student=student_profiles['etudiant3'], subject='Développement ERP', defaults={'company': 'TechCorp', 'duration_months': 3, 'status': 'PENDING'})

    print("✅ Base de données complètement peuplée !")

if __name__ == '__main__':
    seed_db()
