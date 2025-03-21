const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Predefined responses based on Pavan's resume
const responses = {
  hi: "Hello! I'm PavanBot, here to assist you with information about Pavan G R's portfolio. How can I help you today?",
  education:
    "Pavan holds a Bachelor's degree in Computer Science from East West Institute of Technology with a CGPA of 8. He studied courses like Operating Systems, Data Structures, Machine Learning, and more.",
  skills:
    "Pavan is skilled in Java, JavaScript, Python, SQL, Dart, and SOQL. He has expertise in frontend technologies like React.js, Angular, and Flutter, and backend technologies like Express, Flask, and Springboot. He also has experience with cloud platforms like AWS, Azure, and GCP.",
  experience:
    "Pavan has worked as a Software Engineer at Gandeevan Technologies and TicketsQue Solutions. He has experience in designing scalable backend systems, optimizing frontend performance, and deploying applications on AWS. He also led frontend development teams and mentored junior developers.",
  projects:
    "Pavan has worked on projects like an Event Management and Ticketing System, where he designed interactive dashboards using React, Node.js, MongoDB, Docker, and AWS.",
  certifications:
    "Pavan has certifications in Google Cloud Fundamentals, Python, Java SE 8, Full Stack MERN Development, and React Development.",
  interests:
    "Pavan is interested in Machine Learning, AI, Web3, Cryptography, Cybersecurity, Cloud Computing, Web Assembly, and Problem Solving.",
  help: "You can ask me about Pavan's skills, experience, projects, certifications, or education. For example, try asking 'What are Pavan's skills?' or 'Tell me about Pavan's projects.'",
  default:
    "I'm here to assist with Pavan G R's profile. Please ask about his skills, experience, projects, or certifications.",
};

// Detailed responses for specific skills
const skillsDetails = {
  react:
    "Pavan has extensive experience with React.js, including building e-commerce platforms and optimizing frontend performance.",
  aws: "Pavan has deployed applications on AWS, including EC2, SNS, and Cognito, and optimized cloud resource utilization.",
  python:
    "Pavan is proficient in Python and has completed a Google Crash Course on Python.",
  java: "Pavan is skilled in Java and holds a Udemy certification for Java SE 8 Programming.",
  flutter:
    "Pavan has experience with Flutter for building cross-platform mobile applications.",
  docker:
    "Pavan has used Docker for containerization and streamlining CI/CD pipelines.",
  kubernetes:
    "Pavan has experience with Kubernetes for orchestrating containerized applications.",
};

// Detailed responses for specific projects
const projectDetails = {
  "event management":
    "Pavan developed an Event Management and Ticketing System using React, Node.js, MongoDB, Docker, and AWS. The system included interactive dashboards for event creation, ticket management, and redemption options.",
  "e-commerce":
    "Pavan built an e-commerce platform using React.js, Mul, Bootstrap, and REST APIs. The platform allowed users to browse products, manage shopping carts, and complete secure transactions.",
};

// Chat endpoint
app.post("/chat", (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: "Message field is required" });
  }

  const message = req.body.message.toLowerCase().trim();

  let response = responses.default;

  // Check for specific skill queries
  for (const [skill, detail] of Object.entries(skillsDetails)) {
    if (message.includes(skill)) {
      response = detail;
      break;
    }
  }

  // Check for specific project queries
  for (const [project, detail] of Object.entries(projectDetails)) {
    if (message.includes(project)) {
      response = detail;
      break;
    }
  }

  // Check for general queries
  if (message.includes("skill") || message.includes("technology")) {
    response = responses.skills;
  } else if (message.includes("experience") || message.includes("work")) {
    response = responses.experience;
  } else if (message.includes("project")) {
    response = responses.projects;
  } else if (message.includes("certification")) {
    response = responses.certifications;
  } else if (message.includes("interest")) {
    response = responses.interests;
  } else if (message.includes("education") || message.includes("degree")) {
    response = responses.education;
  } else if (message.includes("help")) {
    response = responses.help;
  }

  res.json({ message: response });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
