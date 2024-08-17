import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaLocationDot, FaBriefcase } from "react-icons/fa6";
import Cookies from "js-cookie";
import "./index.css";

const SimilarJobs = ({ jobId }) => {
  const [similarJobs, setSimilarJobs] = useState([]);

  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const getSimilarJobs = async () => {
      const api = `https://apis.ccbp.in/jobs/${jobId}`;

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(api, options);
      const data = await response.json();

      if (response.ok) {
        setSimilarJobs(data.similar_jobs);
      }
    };

    getSimilarJobs();
  }, [jobId, token]);

  if (!similarJobs.length) {
    return <p>Loading similar jobs...</p>;
  }

  return (
    <div className="similar-jobs-section">
      <h3 className="text-edit">Similar Jobs</h3>
      <ul className="similar-jobs-list">
        {similarJobs.map((job) => (
          <li key={job.id} className="similar-job-card">
            <Link to={`/jobs/${job.id}`} className="similar-job-link">
              <div className="similar-job-logo-rating">
                <img
                  src={job.company_logo_url}
                  alt="company logo"
                  className="similar-job-logo"
                />
                <div className="similar-job-details">
                  <h4>{job.title}</h4>
                  <div className="job-rating">
                    <FaStar className="rating-icon" />
                    <span>{job.rating}</span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="similar-job-description">
                <h5>Description</h5>
                <p>{job.job_description}</p>
              </div>

              <div className="location-type-package">
                <div className="location-employment">
                  <FaLocationDot className="mr-1" />
                  <span className="mr-3">{job.location}</span>
                  <FaBriefcase className="mr-1" />
                  <span>{job.employment_type}</span>
                </div>
                <h5 className="job-package">{job.package_per_annum}</h5>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarJobs;
