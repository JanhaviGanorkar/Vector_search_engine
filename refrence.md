# Reference Documentation for Semantic Search Engine Project

This document provides an overview of the references, technologies, and functionalities used in the Semantic Search Engine project.

---

## **Project Overview**
The Semantic Search Engine is a full-stack application designed to allow users to upload documents and perform semantic searches using vector similarity. It combines advanced text processing techniques with a user-friendly interface to deliver accurate and efficient search results.

---

## **Technologies Used**

### **Frontend**
- **React**: For building the user interface.
- **Vite**: A fast build tool for modern web projects.
- **Tailwind CSS**: For styling the application with utility-first CSS.
- **React Router**: For managing navigation and routing.
- **Lucide Icons**: For adding icons to the UI.

### **Backend**
- **Node.js**: For building the backend server.
- **Express.js**: For creating RESTful API endpoints.
- **MongoDB**: As the database for storing documents, vectors, and user data.
- **Mongoose**: For schema-based interaction with MongoDB.
- **Natural**: A natural language processing library for tokenization and TF-IDF vectorization.
- **Bcrypt**: For securely hashing user passwords.

### **Other Tools**
- **Docker**: For containerizing the MongoDB database.
- **Postman**: For testing API endpoints.
- **Jest**: For writing unit tests.
- **FAISS (Future Integration)**: Placeholder for optimizing vector similarity search for large datasets.

---

## **Functionalities**

### **Frontend**
1. **User Authentication**:
   - Login and registration pages with form validation.
   - Secure storage of authentication state using `localStorage`.

2. **Document Upload**:
   - Users can upload documents with a title and content.
   - Form validation ensures required fields are filled.

3. **Search Functionality**:
   - Users can search for documents using keywords or phrases.
   - Results are displayed with relevance scores based on vector similarity and text search.

4. **Responsive Design**:
   - The application is fully responsive and works seamlessly across devices.

5. **Navigation**:
   - A dynamic navbar adjusts based on the user's authentication state.
   - Links to key pages like "Home," "Search," "About," and "Contact."

6. **Privacy Policy**:
   - A dedicated page explaining how user data is handled and stored securely.

### **Backend**
1. **Document Ingestion**:
   - Processes uploaded documents to tokenize content and generate TF-IDF vectors.
   - Updates the vocabulary dynamically as new documents are added.

2. **Search API**:
   - Combines MongoDB full-text search, regex-based search, and vector similarity to rank results.
   - Supports pagination and filtering for efficient result handling.

3. **User Authentication**:
   - Secure login and registration endpoints with password hashing using Bcrypt.

4. **Error Handling**:
   - Comprehensive error handling for all API endpoints to ensure reliability.

5. **Database Management**:
   - MongoDB is used to store documents, vectors, and user data.
   - Vocabulary is maintained as a separate collection for vectorization.

---

## **References**

### **Libraries and Frameworks**
- [React](https://reactjs.org/): For building the frontend.
- [Vite](https://vitejs.dev/): For fast development and build processes.
- [Tailwind CSS](https://tailwindcss.com/): For styling the application.
- [Express.js](https://expressjs.com/): For creating the backend API.
- [MongoDB](https://www.mongodb.com/): For database storage.
- [Mongoose](https://mongoosejs.com/): For schema-based interaction with MongoDB.
- [Natural](https://github.com/NaturalNode/natural): For natural language processing and TF-IDF vectorization.
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js): For password hashing.

### **APIs and Tools**
- [Postman](https://www.postman.com/): For testing API endpoints.
- [Docker](https://www.docker.com/): For containerizing the MongoDB database.
- [FAISS](https://github.com/facebookresearch/faiss): Placeholder for future optimization of vector similarity search.

### **Inspiration and Tutorials**
- MongoDB Documentation: [https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)
- Express.js Guide: [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)
- Tailwind CSS Documentation: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- React Router Documentation: [https://reactrouter.com/](https://reactrouter.com/)

---

## **Future Enhancements**
1. **Integration with FAISS**:
   - Replace in-memory cosine similarity with FAISS for faster vector search on large datasets.

2. **Advanced Search Features**:
   - Add support for filtering by metadata (e.g., date, tags).
   - Implement advanced ranking algorithms for better relevance.

3. **User Profiles**:
   - Allow users to manage their uploaded documents and search history.

4. **Deployment**:
   - Deploy the application to a cloud platform like AWS or Heroku.

---

## **Contact**
For any questions or support, please contact the project maintainer through the provided channels in the "Contact Us" page.
