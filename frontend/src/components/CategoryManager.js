import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
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
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;