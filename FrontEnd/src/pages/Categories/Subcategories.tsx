import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Subcategories.css';

interface CategoryDTO {
  id: number;
  name: string;
  level: number;
  parentCategoryId: number | null;
  imageUrl: string;
}

const SubcategoriesPage = () => {
  const [subcategories, setSubcategories] = useState<CategoryDTO[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`http://localhost:5454/api/categories/public/parent/${id}`)
      .then(res => setSubcategories(res.data))
      .catch(err => console.error(err));
  }, [id]);

 return (
  <div className="container py-4">
    <div className="outer-subcategory-card shadow-lg rounded-4 p-4 bg-white">
      <h2 className="mb-4 text-center">Subcategories</h2>
      <div className="row">
        {subcategories.map(cat => (
          <div key={cat.id} className="col-md-4 mb-4">
            <div className="card subcategory-card h-100">
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

};

export default SubcategoriesPage;
