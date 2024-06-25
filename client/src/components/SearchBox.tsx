import tagOptions from "../tags";

interface SearchBoxProps {
  setSearchQuery: (searchQuery: string) => void;
  setFilterQuery: (filterQuery: string) => void;
}

function SearchBox({ setSearchQuery, setFilterQuery }: SearchBoxProps) {
  return (
    <div className="relative rounded-lg w-160">
      <input
        type="text"
        className="block w-full rounded-lg border-0 py-2 pl-3 pr-20 text-primary placeholder-primary placeholder-bold ring-1 ring-inset ring-gray-300"
        placeholder="Search Internships"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <select
          className="h-full rounded-lg rounded-l-none bg-transparent py-0 p-2 text-center text-primary font-semibold"
          onChange={(e) => setFilterQuery(e.target.value)}
        >
          <option value="">All Tags</option>
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBox;
