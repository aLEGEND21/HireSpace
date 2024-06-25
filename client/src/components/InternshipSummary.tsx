interface InternshipSummaryProps {
  internship: any;
  selectedInternship: any;
  setSelectedInternship: any;
}

function InternshipSummary({
  internship,
  selectedInternship,
  setSelectedInternship,
}: InternshipSummaryProps) {
  // Format the start and end dates
  const startDate = new Date(internship.startDate);
  const endDate = new Date(internship.endDate);
  const fmtOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const startDateString = startDate.toLocaleDateString(undefined, fmtOptions);
  const endDateString = endDate.toLocaleDateString(undefined, fmtOptions);

  return (
    <div
      className={`container px-14 pt-4 pb-7 border-b border-gray-200 hover:cursor-pointer hover:bg-slate-100 ${
        selectedInternship._id === internship._id ? "bg-slate-100" : ""
      }`}
      onClick={() => setSelectedInternship(internship)}
    >
      <h1 className="text-lg font-semibold">{internship.title}</h1>
      <div className="text-md text-gray-600">
        <p>{internship.companyName}</p>
        <p>{internship.location}</p>
        <p className="mt-3">
          ${internship.hourlyRate} / hr • {internship.hoursPerWeek} hr / week
        </p>
        <p>
          {startDateString} - {endDateString}
        </p>
      </div>
      <div className="mt-4">
        {internship.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-primary text-white rounded-lg px-3 py-2 text-sm me-1 whitespace-nowrap"
          >
            # {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default InternshipSummary;
