import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CategoriesPage.css';

interface CategoryDTO {
  id: number;
  name: string;
  level: number;
  parentCategoryId: number | null;
  imageUrl: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5454/api/categories/public/top')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCategoryClick = (id: number) => {
    navigate(`/categories/${id}`);
  };

  return (
  <div className="container py-4">
    <div className="outer-category-card shadow-lg rounded-4 p-4 bg-white">
      <h2 className="mb-4 text-center">Shop by Category</h2>
      <div className="row">
        {categories.map(cat => (
          <div key={cat.id} className="col-md-4 mb-4">
            <div
              className="card category-card h-100"
              onClick={() => handleCategoryClick(cat.id)}
            >
              <img
                src={cat.imageUrl}
                className="card-img-top"
                alt={cat.name}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{cat.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="footer">
  © 2025 JustOrder. All rights reserved.
</div>

  </div>
  
  
);
}



export default CategoriesPage;
