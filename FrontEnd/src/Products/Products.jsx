import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Sidebar/Sidebar.css";
import "./Products.css";
import ProductsGrid from "./ProductsGrid";

//main sidebar categories
const CATEGORIES = [
  { id: "pharmaceutical", label: "Pharmaceutical" },
  { id: "solution", label: "Solution" },
  { id: "consumer", label: "Consumer" },
  { id: "surgical", label: "Surgical" },
  { id: "injection", label: "Injection" },
  { id: "syrup", label: "Syrup" },
  { id: "refrigerated", label: "Refrigerated" },
  { id: "cream", label: "Cream" },
  { id: "ointment", label: "Ointment" },
  { id: "inhaler", label: "Inhaler" },
  { id: "powder", label: "Powder" },
];

export default function Products() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openGroupIds] = useState(new Set());
  const [sort, setSort] = useState("asc");
  const [typeFilter, setTypeFilter] = useState("all");

  return (
    <section className="products-layout">
      <aside className="mc-sidebar">
        <Sidebar
          categories={CATEGORIES}
          selectedCategoryId={selectedCategoryId}
          openGroupIds={openGroupIds}
          sort={sort}
          typeFilter={typeFilter}
          onSelectCategory={setSelectedCategoryId}
          onToggleGroup={() => {}}
          onChangeSort={setSort}
          onChangeType={setTypeFilter}
        />
      </aside>

      {/*grid fetched from backend*/}
      <div className="products-content">
        <h2>Our Products</h2>
        {/*send filters to grid*/}
        <ProductsGrid
          selectedCategoryId={selectedCategoryId}
          typeFilter={typeFilter}
          sort={sort}
          priceField="priceRetail"
          basePath="/products"

        />
      </div>
    </section>
  );
}



