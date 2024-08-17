import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FaStar, FaLocationDot, FaBriefcase } from "react-icons/fa6";
import Header from "../header";
import SimilarJobs from "../similarJobSection";
import "./index.css";

const DetailedSection = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  const token = Cookies.get("jwtToken");

  useEffect(() => {
    const getDetailedJobsData = async () => {
      const api = `https://apis.ccbp.in/jobs/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(api, options);
      const data = await response.json();

      if (response.ok) {
        setJobDetails(data.job_details);
      }
    };

    getDetailedJobsData();
  }, [id, token]);

  if (!jobDetails) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="detailed-job-section">
        
        <div className="job-info">
          <div className="job-header">
            <img
              className="job-company-logo"
              src={jobDetails.company_logo_url}
              alt="Company Logo"
            />
            <div className="job-title-rating">
              <h3>{jobDetails.title}</h3>
              <div className="job-rating">
                <FaStar className="rating-icon" />
                <span>{jobDetails.rating}</span>
              </div>
            </div>
          </div>

          <div className="job-location-type-package">
            <div className="location-employment">
              <FaLocationDot className="mr-1" />
              <span className="mr-3">{jobDetails.location}</span>
              <FaBriefcase className="mr-1" />
              <span>{jobDetails.employment_type}</span>
            </div>
            <h5>{jobDetails.package_per_annum}</h5>
          </div>

          <hr />

          
          <div className="job-description">
            <div className="description-title-button">
              <h5>Description</h5>
              
              <a
                href={jobDetails.company_website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-company-btn"
              >
                Visit 
              </a>
            </div>
            <p>{jobDetails.job_description}</p>
          </div>

         
          <div className="skills-section">
            <h5>Skills</h5>
            <ul className="skills-list">
              {jobDetails.skills.map((skill) => (
                <li key={skill.name} className="skill-item">
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-logo"
                  />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>

       
          <div className="life-at-company-section">
            <h5>Life at {jobDetails.company_name}</h5>
            <div className="life-at-company-content">
              <p>{jobDetails.life_at_company.description}</p>
              <img
                src={jobDetails.life_at_company.image_url}
                alt="Life at Company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>

        
        <SimilarJobs jobId={id} />
      </div>
    </>
  );
};

export default DetailedSection;









