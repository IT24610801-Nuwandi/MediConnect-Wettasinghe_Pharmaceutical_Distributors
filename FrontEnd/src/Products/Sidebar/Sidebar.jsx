import React, { useMemo } from "react";
import "./Sidebar.css";

function Chevron({ open }) {
  return (
    <svg
      className={`chevron ${open ? "open" : ""}`}
      width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"
    >
      <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Sidebar({
  categories,
  selectedCategoryId,
  openGroupIds,
  sort,
  typeFilter,
  onSelectCategory,
  onToggleGroup,
  onChangeSort,
  onChangeType,
}) {
  const topTitle = useMemo(() => {
    const current = findById(categories, selectedCategoryId);
    return current?.label || "PHARMACEUTICALS";
  }, [categories, selectedCategoryId]);

  return (
    <aside className="sidebar" aria-label="Product filters and navigation">
      <div className="sidebar__title">
        <p className="small_title">PHARMACEUTICALS</p>
        <h3>{topTitle}</h3>
      </div>

      <nav className="sidebar__nav">
        <ul className="list">
          {categories.map(cat => {
            const hasChildren = !!cat.children?.length;
            const isOpen = openGroupIds.has(cat.id);
            const isActive = selectedCategoryId === cat.id;

            return (
              <li key={cat.id} className="list__item">
                <div className="linkrow">
                  <button
                    className={`link ${isActive ? "active" : ""}`}
                    onClick={() => onSelectCategory(cat.id)}
                  >
                    {cat.label}
                  </button>

                  {hasChildren && (
                    <button
                      className="toggle"
                      aria-expanded={isOpen}
                      aria-controls={`group-${cat.id}`}
                      onClick={() => onToggleGroup(cat.id)}
                      title={isOpen ? "Collapse" : "Expand"}
                    >
                      <Chevron open={isOpen} />
                    </button>
                  )}
                </div>

                {hasChildren && isOpen && (
                  <ul id={`group-${cat.id}`} className="sublist">
                    {cat.children.map(sub => {
                      const isSubActive = selectedCategoryId === sub.id;
                      return (
                        <li key={sub.id}>
                          <button
                            className={`sublink ${isSubActive ? "active" : ""}`}
                            onClick={() => onSelectCategory(sub.id)}
                          >
                            {sub.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="section">
        <h4 className="section__title">SORT :</h4>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={sort === "asc"}
              onChange={() => onChangeSort("asc")}
            />
            <span>Asc : (A–Z)</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={sort === "desc"}
              onChange={() => onChangeSort("desc")}
            />
            <span>Desc : (Z–A)</span>
          </label>
        </div>
      </section>

      <section className="section">
        <h4 className="section__title">FILTERS :</h4>
        <div className="radio">
          <label>
            <input
              type="radio"
              name="type"
              value="all"
              checked={typeFilter === "all"}
              onChange={() => onChangeType("all")}
            />
            <span>All</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="capsules"
              checked={typeFilter === "capsules"}
              onChange={() => onChangeType("capsules")}
            />
            <span>Capsules</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="syrups"
              checked={typeFilter === "syrups"}
              onChange={() => onChangeType("syrups")}
            />
            <span>Syrups</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="packs"
              checked={typeFilter === "packs"}
              onChange={() => onChangeType("packs")}
            />
            <span>Packs</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="tubes"
              checked={typeFilter === "tubes"}
              onChange={() => onChangeType("tubes")}
            />
            <span>Tubes</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="bottles"
              checked={typeFilter === "bottles"}
              onChange={() => onChangeType("bottles")}
            />
            <span>Bottles</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="vials"
              checked={typeFilter === "vials"}
              onChange={() => onChangeType("vials")}
            />
            <span>Vials</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="cans"
              checked={typeFilter === "cans"}
              onChange={() => onChangeType("cans")}
            />
            <span>Cans</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="tablets"
              checked={typeFilter === "tablets"}
              onChange={() => onChangeType("tablets")}
            />
            <span>Tablets</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="injection"
              checked={typeFilter === "injection"}
              onChange={() => onChangeType("injection")}
            />
            <span>Injection</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="roll's"
              checked={typeFilter === "roll's"}
              onChange={() => onChangeType("roll's")}
            />
            <span>Roll's</span>
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="cream"
              checked={typeFilter === "cream"}
              onChange={() => onChangeType("cream")}
            />
            <span>Cream</span>
          </label>
        </div>
      </section>
    </aside>
  );
}

function findById(cats, id) {
  if (!id) return null;
  for (const c of cats) {
    if (c.id === id) return c;
    if (c.children) {
      const m = c.children.find(s => s.id === id);
      if (m) return m;
    }
  }
  return null;
}

