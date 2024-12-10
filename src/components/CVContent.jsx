import PropTypes from "prop-types";
import "../styles/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const CVContent = ({ personalInfo, educationInfo, workInfo, skills }) => {
  const isPersonalInfoEmpty =
    !personalInfo.name &&
    !personalInfo.email &&
    !personalInfo.phone &&
    !personalInfo.address;
  const isEducationInfoEmpty = educationInfo.length === 0;
  const isWorkInfoEmpty = workInfo.length === 0;
  const isSkillsEmpty =
    skills.length === 0 || skills.every((skill) => skill.trim() === "");

  return (
    <div className="cv-container">
      {!isPersonalInfoEmpty && (
        <div className="personalInfo">
          {personalInfo.name && <h1>{personalInfo.name}</h1>}
          <div className="personalInfoRow">
            {personalInfo.email && (
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {personalInfo.email}
              </p>
            )}
            {personalInfo.phone && (
              <p>
                <FontAwesomeIcon icon={faPhone} /> {personalInfo.phone}
              </p>
            )}
            {personalInfo.address && (
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {personalInfo.address}
              </p>
            )}
          </div>
        </div>
      )}

      {!isWorkInfoEmpty && (
        <>
          <h2 className="workHeader">Experience</h2>
          <hr className="hrContent"></hr>
          {workInfo.map((work, index) => (
            <div key={index}>
              <div className="workRow">
                <p id="workPosition">{work.position}</p>
                <p id="invisibleText">x</p>
              </div>
              <div className="workRow">
                <p id="workName">{work.company}</p>
                <p id="workDates">
                  {work.startDate} - {work.endDate}, {work.location}
                </p>
              </div>
              <p id="workDescription">{work.description}</p>
            </div>
          ))}
          <hr className="hrBottom"></hr>
        </>
      )}

      {!isEducationInfoEmpty && (
        <>
          <h2 className="educationHeader">Education Info</h2>
          <hr className="hrContent"></hr>
          {educationInfo.map((education, index) => (
            <div key={index}>
              <div className="educationRow">
                <p id="educationDegree">{education.degree}</p>
              </div>
              <div className="educationRow">
                <p id="educationSchool">{education.school}</p>
                <p id="educationDates">
                  {education.startDate} - {education.endDate},{" "}
                  {education.location}
                </p>
              </div>
            </div>
          ))}
          <hr className="hrBottom"></hr>
        </>
      )}

      {!isSkillsEmpty && (
        <>
          <h2 className="skillsHeader">Skills</h2>
          <hr className="hrContent"></hr>
          <ul className="list">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <hr className="hrBottom"></hr>
        </>
      )}
    </div>
  );
};

CVContent.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  educationInfo: PropTypes.arrayOf(
    PropTypes.shape({
      school: PropTypes.string.isRequired,
      degree: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
  workInfo: PropTypes.arrayOf(
    PropTypes.shape({
      company: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CVContent;
