CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE notes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT,
	KEY user_id_idx(user_id)
);

CREATE TABLE search(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	notes_id VARCHAR(255) NOT NULL,
	KEY notes_id_titlex(notes_id)
)

INSERT INTO users (first_name, last_name, email) VALUES (
	"Duck", "Cuack", "DuckCuack@gmail.com"
);