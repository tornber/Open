use ShipsDB;
CREATE TABLE ships (
	ID int IDENTITY(1,1) PRIMARY KEY,
	Model VARCHAR(50) NOT NULL,
	ReleaseYear DATE NOT NULL,
	Speed int NOT NULL,
	Weight int NOT NULL
);