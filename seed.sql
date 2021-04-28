insert into department(name)
values ("Web Development"),("Finance"),("Legal"),("Robotics"),("HR");

insert into role(title, salary, department_id)
values ("Web Developer", 90000, 1)
,("Junior Developer", 70000, 1)
,("Lead Robotics Engineer",150000,2)
,("Robotics Engineer",120000,2)
,("Accountant",125000,3)
,("Legal Team Lead",250000,4)
,("Lawyer",190000,4)

insert into employee(first_name,last_name,role_id,manager_id)
values ("Ray","Lewis",1,1)
,("Chris","Brown",2,1)
,("Snoop","Dogg",3,NULL)
,("Lil","Wayne",4,2)
,("Rick","Mortison",5,3)
,("Billie","Eyelash",6, NULL)
,("Sponge","Bob",7,4)
,("Stephen","Segal",4,2)

insert into manager(first_name,last_name,department_id)
values ("Snoop","Dogg",1),("Ray","Lewis", 2),("Joe","Rogan", 3),("Michael","Scott",4),("Dave","Chapelle",5);