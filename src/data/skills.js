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
    { name: "JavaScript", icon: Js, experience: "3+ tahun" },
    { name: "TypeScript", icon: TypeScript, experience: "Masih belajar" },
    { name: "Golang", icon: Go, experience: "Explorasi & pengembangan" },
    { name: "PHP", icon: PHP, experience: "Laravel & proyek CMS" },
  ],
  Frontend: [
    { name: "React", icon: ReactLogo, experience: "Berbagai proyek web" },
    { name: "Next.js", icon: Next, experience: "Aplikasi SSR/SSG" },
    { name: "Redux", icon: Redux, experience: "State management" },
    { name: "HTML", icon: Html, experience: "5+ proyek" },
    { name: "CSS", icon: Css, experience: "Styling antarmuka" },
  ],
  Backend: [
    { name: "Laravel", icon: Laravel, experience: "Fullstack API + Blade" },
    { name: "Node.js", icon: Node, experience: "Server backend" },
  ],
  Database: [
    { name: "MongoDB", icon: MongoDB, experience: "Project Node.js" },
    { name: "MySQL", icon: MySQL, experience: "Laravel & PHP" },
    { name: "PostgreSQL", icon: PostgreSQL, experience: "Skala besar" },
    { name: "SQLite", icon: SQLite, experience: "Prototyping" },
    {
      name: "Firebase Auth",
      icon: Firebase,
      experience: "Login Google & Email (React)",
    },
  ],
  "Tools & Testing": [
    { name: "Git", icon: GIT, experience: "Version control" },
    { name: "OutSystems", icon: OutSystems, experience: "Project enterprise" },
    { name: "Jest", icon: Jest, experience: "Unit testing React" },
    { name: "Supertest", icon: Supertest, experience: "API testing Node.js" },
    { name: "REST API", icon: Api, experience: "Integrasi berbagai layanan" },
  ],
  Workflow: [
    {
      name: "Agile (Scrum/Kanban)",
      icon: Agile,
      experience: "Sprint menggunakan Jira & Trello",
    },
  ],
};
