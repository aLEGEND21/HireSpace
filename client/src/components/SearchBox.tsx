interface SearchBoxProps {
  setSearchQuery: (searchQuery: string) => void;
  setFilterQuery: (filterQuery: string) => void;
}

function SearchBox({ setSearchQuery, setFilterQuery }: SearchBoxProps) {
  return (
    <span className="flex items-center">
      <input
        type="text"
        className="border p-2 rounded-lg rounded-r-none font-normal text-gray-600 w-96"
        placeholder="Search Internships"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="border p-2 rounded-lg rounded-l-none font-normal text-gray-600 w-40"
        onChange={(e) => setFilterQuery(e.target.value)}
      >
        <option value="">All Tags</option>
        <option value="software">Software</option>
        <option value="engineering">Engineering</option>
        <option value="marketing">Marketing</option>
        <option value="product">Product</option>
        <option value="sales">Sales</option>
      </select>
    </span>
  );
}

export default SearchBox;
