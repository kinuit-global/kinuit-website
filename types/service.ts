export type services = {
    id?: string,
    num: string,
    title: string,
    tags: string[],
    program?: Array<{
        courses: string

    }>
}
                                                                                                                                                                                                                                                                                                           
export const services: services[] = [

  {
    num: "01",
    title: "Brand\nStrategy",
    tags: ["Identity & Strategy", "NFT", "Video Production", "UI/UX Lab", "Creative Assets"],
  },
  {
    num: "02",
    title: "Web\nDevelopment",
    tags: ["Full-Stack Dev", "React / Next.js", "Speed & SEO", "UI/UX Build", "Webflow"],
  },
  {
    num: "03",
    title: "Digital\nMarketing",
    tags: ["Paid Media", "Social Growth", "Performance Mktg", "Content MKT", "Community"],
  },
  {
    num: "04",
    title: "Management\n& Strategy",
    tags: ["Project Mgmt", "Growth Strategy", "Brand Advisory", "Fractional CMO", "Partnerships"],
  },
];
    


