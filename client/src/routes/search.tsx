import { useEffect, useState } from "react";

function Search() {
  const [internships, setInternships] = useState<any[]>([]);
  const [visibleInternships, setVisibleInternships] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/internships", {
      credentials: "include",
      mode: "cors",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setInternships(data);
          setVisibleInternships(data);
        });
      }
    });
  }, []);

  useEffect(() => {
    let filteredInternships = internships.filter((internship) => {
      return (
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        internship.companyName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        internship.tags
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    if (filterQuery) {
      filteredInternships = filteredInternships.filter((internship) => {
        return internship.tags
          .join(" ")
          .toLowerCase()
          .includes(filterQuery.toLowerCase());
      });
    }
    setVisibleInternships(filteredInternships);
  }, [searchQuery, filterQuery]);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold">Search Internships</h1>
      <input
        type="text"
        className="border p-2 my-4"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="border p-2 my-4"
        onChange={(e) => setFilterQuery(e.target.value)}
      >
        <option value="">All</option>
        <option value="software">Software</option>
        <option value="engineering">Engineering</option>
        <option value="marketing">Marketing</option>
        <option value="product">Product</option>
        <option value="sales">Sales</option>
      </select>
      {visibleInternships.map((internship) => (
        <div key={internship._id} className="border rounded p-4 my-4">
          <a href={`/internship/view/${internship._id}`}>
            <h2 className="text-xl font-bold">{internship.title}</h2>
            <p>{internship.description}</p>
            <div className="my-2">
              {internship.tags.map((tag: any) => (
                <span
                  key={tag}
                  className="bg-blue-200 text-gray-800 rounded px-2 py-1 text-sm mr-2"
                >
                  #{tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Search;
