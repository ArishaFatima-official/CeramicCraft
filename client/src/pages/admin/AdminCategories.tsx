import { useEffect, useState } from "react";
import { getCategory, addCategory, updateCategory, deleteCategory} from "../../api/categoryApi";
import type { Category } from "../../types/category";

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      setCategories(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch categories:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await addCategory(name.trim());

      setName("");
      await fetchCategories();
    } catch (error) {
      console.error(
        "Failed to add category:",
        error
      );
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) return;

    try {
      await updateCategory(
        id,
        editingName.trim()
      );

      setEditingId(null);
      setEditingName("");

      await fetchCategories();
    } catch (error) {
      console.error(
        "Failed to update category:",
        error
      );
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    try {
      await deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      console.error(
        "Failed to delete category:",
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        Loading categories...
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      <h2 className="fw-bold mb-4">
        Categories
      </h2>

      {/* Add Category */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">

          <h5 className="fw-bold mb-3">
            Add Category
          </h5>

          <form
            onSubmit={handleAdd}
            className="d-flex gap-2"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Category name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <button
              type="submit"
              className="btn btn-dark"
            >
              Add
            </button>
          </form>

        </div>
      </div>

      {/* Categories */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>

                    <td>
                      {category.id}
                    </td>

                    <td>
                      {editingId === category.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editingName}
                          onChange={(e) =>
                            setEditingName(
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <span className="fw-semibold">
                          {category.name}
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex gap-2">

                        {editingId === category.id ? (
                          <>
                            <button
                              className="btn btn-sm btn-dark"
                              onClick={() =>
                                handleUpdate(
                                  category.id
                                )
                              }
                            >
                              Save
                            </button>

                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => {
                                setEditingId(null);
                                setEditingName("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-outline-dark"
                              onClick={() => {
                                setEditingId(
                                  category.id
                                );
                                setEditingName(
                                  category.name
                                );
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDelete(
                                  category.id
                                )
                              }
                            >
                              Delete
                            </button>
                          </>
                        )}

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminCategories;