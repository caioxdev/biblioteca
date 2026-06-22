CREATE DATABASE IF NOT EXISTS biblioteca
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE biblioteca;

DROP TABLE IF EXISTS Emprestimos;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Livros;

CREATE TABLE Livros (
    id_livro INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    ano_publicacao INT,
    quantidade_disponivel INT NOT NULL,
    PRIMARY KEY (id_livro)
);

CREATE TABLE Usuarios (
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('leitor', 'bibliotecario') NOT NULL,
    PRIMARY KEY (id_usuario)
);

CREATE TABLE Emprestimos (
    id INT NOT NULL AUTO_INCREMENT,
    data_emprestimo DATE NOT NULL,
    data_devolucao_prevista DATE NOT NULL,
    data_devolucao_real DATE DEFAULT NULL,
    status ENUM('ativo', 'devolvido', 'atrasado') NOT NULL DEFAULT 'ativo',
    livro_id INT,
    leitor_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (livro_id) REFERENCES Livros(id_livro),
    FOREIGN KEY (leitor_id) REFERENCES Usuarios(id_usuario)
);