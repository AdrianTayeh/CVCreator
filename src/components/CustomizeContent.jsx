import { useState } from "react";
import CVContent from "./CVContent";
import "../styles/style.css";
import html2pdf from "html2pdf.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const CustomizeContent = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [educationInfo, setEducationInfo] = useState([]);
  const [workInfo, setWorkInfo] = useState([]);
  const [skills, setSkills] = useState([""]);

  const [currentEducation, setCurrentEducation] = useState({
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const [currentWork, setCurrentWork] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "• ",
  });

  const [showEducationForm, setShowEducationForm] = useState(true);
  const [showWorkForm, setShowWorkForm] = useState(true);
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(null);
  const [educationVisibility, setEducationVisibility] = useState([]);
  const [workVisibility, setWorkVisibility] = useState([]);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentEducationChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentWorkChange = (e) => {
    const { name, value } = e.target;
    setCurrentWork((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (index, e) => {
    const newSkills = [...skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };

  const addSkillInput = () => {
    setSkills([...skills, ""]);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkillInput();
    }
  };

  const handleDescriptionKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCurrentWork((prev) => ({
        ...prev,
        description: prev.description + "\n• ",
      }));
    }
  };

  const handleEducationKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      addEducationEntry();
    }
  };

  const handleWorkKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      addWorkEntry();
    }
  };

  const addEducationEntry = () => {
    if (selectedEducationIndex !== null) {
      const newEducationInfo = [...educationInfo];
      newEducationInfo[selectedEducationIndex] = currentEducation;
      setEducationInfo(newEducationInfo);
      setSelectedEducationIndex(null);
    } else {
      setEducationInfo([...educationInfo, currentEducation]);
      setEducationVisibility([...educationVisibility, true]);
    }
    setCurrentEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setShowEducationForm(false);
  };

  const addWorkEntry = () => {
    if (selectedWorkIndex !== null) {
      const newWorkInfo = [...workInfo];
      newWorkInfo[selectedWorkIndex] = currentWork;
      setWorkInfo(newWorkInfo);
      setSelectedWorkIndex(null);
    } else {
      setWorkInfo([...workInfo, currentWork]);
      setWorkVisibility([...workVisibility, true]);
    }
    setCurrentWork({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "• ",
    });
    setShowWorkForm(false);
  };

  const deleteEducationEntry = () => {
    if (selectedEducationIndex !== null) {
      const newEducationInfo = educationInfo.filter(
        (_, i) => i !== selectedEducationIndex
      );
      const newEducationVisibility = educationVisibility.filter(
        (_, i) => i !== selectedEducationIndex
      );
      setEducationInfo(newEducationInfo);
      setEducationVisibility(newEducationVisibility);
      setSelectedEducationIndex(null);
      if (newEducationInfo.length === 0) {
        setShowEducationForm(true);
      }
    }
  };

  const deleteWorkEntry = () => {
    if (selectedWorkIndex !== null) {
      const newWorkInfo = workInfo.filter((_, i) => i !== selectedWorkIndex);
      const newWorkVisibility = workVisibility.filter(
        (_, i) => i !== selectedWorkIndex
      );
      setWorkInfo(newWorkInfo);
      setWorkVisibility(newWorkVisibility);
      setSelectedWorkIndex(null);
      if (newWorkInfo.length === 0) {
        setShowWorkForm(true);
      }
    }
  };

  const editEducationEntry = (index) => {
    setCurrentEducation(educationInfo[index]);
    setShowEducationForm(true);
    setSelectedEducationIndex(index);
  };

  const editWorkEntry = (index) => {
    setCurrentWork(workInfo[index]);
    setShowWorkForm(true);
    setSelectedWorkIndex(index);
  };

  const toggleEducationVisibility = (index) => {
    const newEducationVisibility = [...educationVisibility];
    newEducationVisibility[index] = !newEducationVisibility[index];
    setEducationVisibility(newEducationVisibility);
  };

  const toggleWorkVisibility = (index) => {
    const newWorkVisibility = [...workVisibility];
    newWorkVisibility[index] = !newWorkVisibility[index];
    setWorkVisibility(newWorkVisibility);
  };

  const saveCV = () => {
    const element = document.querySelector(".cv-container");
    html2pdf().from(element).save("cv.pdf");
  };

  const handleAddNewEducation = () => {
    setCurrentEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setShowEducationForm(true);
    setSelectedEducationIndex(null);
  };

  const handleAddNewWork = () => {
    setCurrentWork({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "• ",
    });
    setShowWorkForm(true);
    setSelectedWorkIndex(null);
  };

  const handleCancelEducation = () => {
    setCurrentEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    setShowEducationForm(false);
  };

  const handleCancelWork = () => {
    setCurrentWork({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "• ",
    });
    setShowWorkForm(false);
  };

  return (
    <div className="main-container">
      <div className="side-container">
        <div className="save-cv">
          <div className="download-cv">
            <p>Save your CV</p>
            <button className="download-button" type="button" onClick={saveCV}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="svg-download"
                >
                  <path
                    fill="currentColor"
                    d="M220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Zm260-153L287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193Z"
                  ></path>
                </svg>
                <span>Download</span>
              </span>
            </button>
          </div>
        </div>
        <form>
          <h2>Personal Info</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={personalInfo.address}
              onChange={handlePersonalInfoChange}
            />
          </label>
        </form>

        {showWorkForm ? (
          <form onKeyDown={handleWorkKeyDown}>
            <h2>
              <FontAwesomeIcon icon={faBriefcase} /> Work Info
            </h2>
            <label>
              Company Name:
              <input
                type="text"
                name="company"
                value={currentWork.company}
                onChange={handleCurrentWorkChange}
              />
            </label>
            <label>
              Position Title:
              <input
                type="text"
                name="position"
                value={currentWork.position}
                onChange={handleCurrentWorkChange}
              />
            </label>
            <label>
              Start Date:
              <input
                type="text"
                name="startDate"
                value={currentWork.startDate}
                onChange={handleCurrentWorkChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="text"
                name="endDate"
                value={currentWork.endDate}
                onChange={handleCurrentWorkChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={currentWork.location}
                onChange={handleCurrentWorkChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={currentWork.description}
                onChange={handleCurrentWorkChange}
                onKeyDown={handleDescriptionKeyDown}
              ></textarea>
            </label>
            <div className="buttonContainer">
              <button
                className="delete-button"
                type="button"
                onClick={deleteWorkEntry}
              >
                Delete
              </button>
              <div>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={handleCancelWork}
                >
                  Cancel
                </button>
                <button
                  className="save-button"
                  type="button"
                  onClick={addWorkEntry}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="listContainer">
            <h2>
              <FontAwesomeIcon icon={faBriefcase} /> Work Info
            </h2>
            {workInfo.map((work, index) => (
              <div key={index} className="list-item">
                <p onClick={() => editWorkEntry(index)}>{work.position}</p>
                <button
                  type="button"
                  onClick={() => toggleWorkVisibility(index)}
                >
                  <FontAwesomeIcon
                    icon={workVisibility[index] ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            ))}
            <button
              className="add-button"
              type="button"
              onClick={handleAddNewWork}
            >
              +
            </button>
          </div>
        )}

        {showEducationForm ? (
          <form onKeyDown={handleEducationKeyDown}>
            <h2>
              <FontAwesomeIcon icon={faGraduationCap} /> Education Info
            </h2>
            <label>
              School:
              <input
                type="text"
                name="school"
                value={currentEducation.school}
                onChange={handleCurrentEducationChange}
              />
            </label>
            <label>
              Degree:
              <input
                type="text"
                name="degree"
                value={currentEducation.degree}
                onChange={handleCurrentEducationChange}
              />
            </label>
            <label>
              Start Date:
              <input
                type="text"
                name="startDate"
                value={currentEducation.startDate}
                onChange={handleCurrentEducationChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="text"
                name="endDate"
                value={currentEducation.endDate}
                onChange={handleCurrentEducationChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={currentEducation.location}
                onChange={handleCurrentEducationChange}
              />
            </label>
            <div className="buttonContainer">
              <button
                className="delete-button"
                type="button"
                onClick={deleteEducationEntry}
              >
                Delete
              </button>
              <div>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={handleCancelEducation}
                >
                  Cancel
                </button>
                <button
                  className="save-button"
                  type="button"
                  onClick={addEducationEntry}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="listContainer">
            <h2>
              <FontAwesomeIcon icon={faGraduationCap} /> Education Info
            </h2>
            {educationInfo.map((education, index) => (
              <div key={index} className="list-item">
                <p onClick={() => editEducationEntry(index)}>
                  {education.school}
                </p>
                <button
                  type="button"
                  onClick={() => toggleEducationVisibility(index)}
                >
                  <FontAwesomeIcon
                    icon={educationVisibility[index] ? faEyeSlash : faEye}
                  />
                </button>
              </div>
            ))}
            <button
              className="add-button"
              type="button"
              onClick={handleAddNewEducation}
            >
              +
            </button>
          </div>
        )}

        <form onKeyDown={handleSkillKeyDown}>
          <h2>Skills</h2>
          {skills.map((skill, index) => (
            <input
              key={index}
              className="skillsInput"
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e)}
            />
          ))}
          <button className="add-button" type="button" onClick={addSkillInput}>
            +
          </button>
        </form>
      </div>

      <CVContent
        personalInfo={personalInfo}
        educationInfo={educationInfo.filter((_, i) => educationVisibility[i])}
        workInfo={workInfo.filter((_, i) => workVisibility[i])}
        skills={skills}
      />
    </div>
  );
};

export default CustomizeContent;
