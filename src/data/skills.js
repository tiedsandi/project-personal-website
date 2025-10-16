import Agile from "@/assets/skills/agile.webp";
import Api from "@/assets/skills/api.jpeg";
import Css from "@/assets/skills/css3.png";
import Firebase from "@/assets/skills/firebase.png";
import GIT from "@/assets/skills/git.png";
import Go from "@/assets/skills/go.png";
import Html from "@/assets/skills/html5.png";
import Jest from "@/assets/skills/jest.png";
import Js from "@/assets/skills/js.webp";
import Laravel from "@/assets/skills/laravel.png";
import MongoDB from "@/assets/skills/mongodb.png";
import MySQL from "@/assets/skills/mysql.png";
import Next from "@/assets/skills/next.webp";
import Node from "@/assets/skills/node-js.svg";
import OutSystems from "@/assets/skills/outsystems.png";
import PHP from "@/assets/skills/php.jpeg";
import PostgreSQL from "@/assets/skills/postgresql.webp";
import ReactLogo from "@/assets/skills/reactjs.png";
import Redux from "@/assets/skills/redux.png";
import SQLite from "@/assets/skills/sqlite.jpeg";
import Supertest from "@/assets/skills/supertest.png";
import TypeScript from "@/assets/skills/typescript.png";

export const skillCategories = {
  Bahasa: [
    { name: "JavaScript", icon: Js, experienceKey: "3years" },
    { name: "TypeScript", icon: TypeScript, experienceKey: "learning" },
    { name: "Golang", icon: Go, experienceKey: "exploration" },
    { name: "PHP", icon: PHP, experienceKey: "laravel" },
  ],
  Frontend: [
    { name: "React", icon: ReactLogo, experienceKey: "webProjects" },
    { name: "Next.js", icon: Next, experienceKey: "ssr" },
    { name: "Redux", icon: Redux, experienceKey: "stateManagement" },
    { name: "HTML", icon: Html, experienceKey: "5projects" },
    { name: "CSS", icon: Css, experienceKey: "styling" },
  ],
  Backend: [
    { name: "Laravel", icon: Laravel, experienceKey: "fullstackApi" },
    { name: "Node.js", icon: Node, experienceKey: "serverBackend" },
  ],
  Database: [
    { name: "MongoDB", icon: MongoDB, experienceKey: "nodeProjects" },
    { name: "MySQL", icon: MySQL, experienceKey: "laravelPhp" },
    { name: "PostgreSQL", icon: PostgreSQL, experienceKey: "largScale" },
    { name: "SQLite", icon: SQLite, experienceKey: "prototyping" },
    {
      name: "Firebase Auth",
      icon: Firebase,
      experienceKey: "firebaseAuth",
    },
  ],
  "Tools & Testing": [
    { name: "Git", icon: GIT, experienceKey: "versionControl" },
    { name: "OutSystems", icon: OutSystems, experienceKey: "enterprise" },
    { name: "Jest", icon: Jest, experienceKey: "unitTesting" },
    { name: "Supertest", icon: Supertest, experienceKey: "apiTesting" },
    { name: "REST API", icon: Api, experienceKey: "restApi" },
  ],
  Workflow: [
    {
      name: "Agile (Scrum/Kanban)",
      icon: Agile,
      experienceKey: "agileExp",
    },
  ],
};
