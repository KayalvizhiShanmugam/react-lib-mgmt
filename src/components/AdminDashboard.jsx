/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const initialValues = {
    id: '',
    title: '',
    author: '',
  };

  const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (editingIndex !== -1) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = values;
      setBooks(updatedBooks);
      setEditingIndex(-1);
    } else {
      setBooks([...books, values]);
    }
    resetForm();
  };

  return (
    <div>
      <h1>Library Management Admin Dashboard</h1>

      {/* Create Book Form */}
      <h2>Create New Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="id">ID</label>
            <Field type="text" id="id" name="id" />
            <ErrorMessage name="id" component="div" />
          </div>

          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label htmlFor="author">Author</label>
            <Field type="text" id="author" name="author" />
            <ErrorMessage name="author" component="div" />
          </div>

          <div>
            <button type="submit">Save</button>
          </div>
        </Form>
      </Formik>

      {/* List of Books */}
      <h2>Book List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
            <button onClick={() => setEditingIndex(index)}>Edit</button>
            <button onClick={() => setBooks(books.filter((_, i) => i !== index))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;