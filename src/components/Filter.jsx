function Filter({ categories, selectedCategory, setSelectedCategory }) {
    return (
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="form-select"
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
  }
  
  export default Filter;
  