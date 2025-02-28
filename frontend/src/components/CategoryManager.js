import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  const addCategory = () => {
    axios.post('/categories', { name })
      .then(response => {
        setCategories([...categories, response.data]);
        setName('');
      })
      .catch(error => console.error('Error adding category:', error));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <input type="text" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addCategory}>Add Category</button>
      {loading ? <p className="loading">Loading categories...</p> : (
        <ul>
          {categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryManager;