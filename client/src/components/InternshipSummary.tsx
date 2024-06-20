interface InternshipSummaryProps {
  internship: any;
  setSelectedInternship: any;
}

function InternshipSummary({
  internship,
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
      className="container my-10 hover:cursor-pointer"
      onClick={() => setSelectedInternship(internship)}
    >
      <h1 className="text-2xl font-semibold">{internship.title}</h1>
      <div className="text-md text-gray-600">
        <p>{internship.companyName}</p>
        <p>{internship.location}</p>
        <p className="mt-3">${internship.hourlyRate} / hour</p>
        <p>{internship.hoursPerWeek} hours / week</p>
        <p>
          {startDateString} - {endDateString}
        </p>
      </div>
      <div className="mt-4">
        {internship.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-black text-white rounded-lg px-3 py-2 text-sm me-1 whitespace-nowrap"
          >
            # {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default InternshipSummary;
