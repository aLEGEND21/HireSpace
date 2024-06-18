import { Link } from "react-router-dom";

interface InternshipSummaryProps {
  internship: any;
  creator: any;
}

function ApprovalSummary({ internship, creator }: InternshipSummaryProps) {
  // Format the date the internship was submitted
  const submittedDate = new Date(internship.createdAt);
  const fmtOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const submittedDateString = submittedDate.toLocaleDateString(
    undefined,
    fmtOptions
  );

  return (
    <Link to={`/internship/approve/${internship._id}`}>
      <div className="pt-4 pb-8 px-6 border-b hover:bg-slate-100">
        <h1 className="text-2xl font-semibold">{internship.title}</h1>
        <p className="font-semibold mt-0.5">
          Submitted by <u>{creator?.username}</u> on{" "}
          <u>{submittedDateString}</u>
        </p>
        <p className="line-clamp-3 text-gray-600 mt-0.5">
          {internship.description}
        </p>
        <div className="mt-4">
          {internship.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-black text-white rounded-lg px-3 py-2 text-sm me-1 whitespace-nowrap"
            >
              # {tag.charAt(0).toUpperCase() + tag.substring(1).toLowerCase()}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default ApprovalSummary;
