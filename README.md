# 📚 Library Management API

A simple RESTful API for managing books and borrowing records in a library system using **Node.js**, **Express**, **TypeScript**, and **MongoDB** (Mongoose).

---

## 🚀 Features

- Add, view, update, and delete books
- Borrow books with stock validation
- Aggregated summary of borrowed books
- Clean structure with TypeScript and proper error handling

---

### 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose)
- **Language:** TypeScript

---

### 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/tkabir3066/level-2-assignment-3.git
   cd .\Library-Management-API\
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup `.env` file**
   Create a `.env` file in the root:

   ```md
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/librarydb
   ```

4. **Run the server**

   ```bash
   npm run dev
   ```

---

### 📂 Folder Structure (Simplified)

```md
src/
├── app/
│ ├── controllers/
│ ├── models/
│ ├── interfaces/
├── server.ts
├── app.ts
```

### 🔗 API Endpoints

#### 📘 Books

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/books`     | Get all books  |
| POST   | `/api/books`     | Add a new book |
| PATCH  | `/api/books/:id` | Update a book  |
| DELETE | `/api/books/:id` | Delete a book  |

#### 📗 Borrow

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| POST   | `/api/borrows` | Borrow a book                 |
| GET    | `/api/borrows` | Get summary of borrowed books |

---

### 🧾 Borrowed Books Summary (GET `/api/borrow`)

Returns the total number of borrowed copies per book, along with the book's title and ISBN.

#### ✅ Response

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

### 🧪 Testing

You can use **Postman** or **Thunder Client** to test the API. Make sure MongoDB is running locally or use a remote URI in `.env`.

> [Live link on Render](https://level-2-assignment-3-1.onrender.com/) > [Live link on Vercel](https://level-2-assignment-3-iwyg.vercel.app/)
