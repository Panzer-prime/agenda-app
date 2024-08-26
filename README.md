# English docs

---

# Agenda Web App Documentation

## Technologies Used

- **Next.js / React.js**: For building the frontend and server-side rendered pages.
- **[Sequelize](https://sequelize.org/)**: ORM for managing database interactions.
- **[SweetAlert2](https://sweetalert2.github.io/#examples)**: For elegant toast notifications.
- **[Zod](https://zod.dev/)**: Schema validation library.
- **MySQL**: Database used for storing app data.

## Getting Started

To set up and run the project, follow these steps:

### 1. Environment Setup

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
// MySQL Configuration
NEXT_PUBLIC_DB_USERNAME=your_username
NEXT_PUBLIC_DB_PASSWORD=your_password
NEXT_PUBLIC_URL_DB_HOST=your_host
NEXT_PUBLIC_DATABASE=your_database

// JWT Session Secret
SESSION_SECRET=your_session_secret

// Admin Email
ADMIN_EMAIL=your_admin_email
```

Ensure that each variable is filled with the appropriate information relevant to your environment.

### 2. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 3. Start the Development Server

To start the project, run:

```bash
npm run dev
```

This command will launch the development server, and you can access the app in your browser at `http://localhost:3000`.

---


# Romanian docs 


Here’s the Romanian version of the documentation:

---

# Documentație pentru aplicația web Agenda

## Tehnologii utilizate

- **Next.js / React.js**: Pentru construirea frontend-ului și paginilor randate pe server.
- **[Sequelize](https://sequelize.org/)**: ORM pentru gestionarea interacțiunilor cu baza de date.
- **[SweetAlert2](https://sweetalert2.github.io/#examples)**: Pentru notificări toast elegante.
- **[Zod](https://zod.dev/)**: Bibliotecă pentru validarea schemelor.
- **MySQL**: Baza de date utilizată pentru stocarea datelor aplicației.

## Începerea proiectului

Pentru a configura și a rula proiectul, urmează pașii de mai jos:

### 1. Configurarea mediului

Creează un fișier `.env` în directorul rădăcină și adaugă următoarele variabile de mediu:

```plaintext
// Configurare MySQL
NEXT_PUBLIC_DB_USERNAME=utilizatorul_tău
NEXT_PUBLIC_DB_PASSWORD=parola_ta
NEXT_PUBLIC_URL_DB_HOST=hostul_tău
NEXT_PUBLIC_DATABASE=baza_ta_de_date

// Secretul sesiunii JWT
SESSION_SECRET=secretul_tău_pentru_sesiune

// Emailul administratorului
ADMIN_EMAIL=emailul_tău_de_administrator
```

Asigură-te că fiecare variabilă este completată cu informațiile corespunzătoare mediului tău.

### 2. Instalarea dependențelor

Rulează următoarea comandă pentru a instala toate dependențele necesare:

```bash
npm install
```

### 3. Pornirea serverului de dezvoltare

Pentru a porni proiectul, rulează:

```bash
npm run dev
```

Această comandă va lansa serverul de dezvoltare, iar aplicația va putea fi accesată în browser la `http://localhost:3000`.

---
