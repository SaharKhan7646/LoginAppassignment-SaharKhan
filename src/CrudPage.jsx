import React, { useState, useEffect } from "react";

function CrudPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show a success message temporarily
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear the message after 3 seconds
  };

  // Handle form submission to create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      const result = await response.json();
      setData([result, ...data]);
      setNewPost({ title: "", body: "" });
      setError("");
      showSuccessMessage("Post created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle editing a post
  const handleEditPost = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingPost),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      const result = await response.json();
      setData(data.map((post) => (post.id === result.id ? result : post)));
      setEditingPost(null);
      setError("");
      showSuccessMessage("Post updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle delete post
  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    setActionLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      setData(data.filter((post) => post.id !== id));
      setError("");
      showSuccessMessage("Post deleted successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">CRUD Operations</h1>

      {/* Display error messages */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Display success messages */}
      {successMessage && (
        <p className="text-green-500 mb-4 text-center">{successMessage}</p>
      )}

      {/* Loading indicator for actions */}
      {actionLoading && (
        <p className="text-center mb-4">Processing, please wait...</p>
      )}

      {/* Form for creating a new post */}
      <form
        onSubmit={handleCreatePost}
        className="mb-6 bg-gray-100 p-4 rounded-md shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Body:</label>
          <textarea
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>

      {/* Form for editing an existing post */}
      {editingPost && (
        <form
          onSubmit={handleEditPost}
          className="mb-6 bg-gray-100 p-4 rounded-md shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              value={editingPost.title}
              onChange={(e) =>
                setEditingPost({ ...editingPost, title: e.target.value })
              }
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Body:</label>
            <textarea
              value={editingPost.body}
              onChange={(e) =>
                setEditingPost({ ...editingPost, body: e.target.value })
              }
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="px-4 py-2 bg-gray-500 text-white rounded ml-2 hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Table for displaying posts */}
      <table className="border-collapse border border-gray-300 w-full text-left shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded mr-2 hover:bg-yellow-700"
                  onClick={() => setEditingPost(item)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => handleDeletePost(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudPage;
