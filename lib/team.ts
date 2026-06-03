export interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
}

export const team: TeamMember[] = [
  {
    name: "Adithya P",
    role: "Founder & CEO",
    image: "/team/founder.jpeg",
    linkedin: "https://www.linkedin.com/in/itsadithyap"
  },
  {
    name: "Siva R",
    role: "Co-Founder & CTO",
    image: "/team/co-founder.jpeg",
    linkedin: "https://www.linkedin.com/in/sivavj"
  },
  {
    name: "Kavin T",
    role: "Creative Head",
    image: "/team/creative-head.png",
    linkedin: "https://www.linkedin.com/in/kavin-ragul-395184184"
  }
];
