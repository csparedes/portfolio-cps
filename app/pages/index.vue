<template>
  <div class="text-center">
    <UContainer class="flex w-full justify-center"
      ><NuxtImg src="perfil.jpg" class="rounded-full w-60 h-60 p-4"
    /></UContainer>
    <h1 class="text-xl font-bold">Hello</h1>

    <div class="flex justify-center p-5">
      <div class="text-left">
        <h1 class="font-light text-lg">I'm Cristian Paredes Sánchez</h1>
        <h2 class="uppercase font-bold text-lg">
          System Engineer / Software Developer
        </h2>
      </div>
    </div>

    <div class="p-8">
      <h1 class="text-left p-1">
        Have a look on my projects
        <NuxtLink to="/projects" class="font-bold">here</NuxtLink>
      </h1>
      <CarrouselImg :images="images" />
    </div>

    <div class="text-left p-1 md:p-8">
      <h1 class="text-xl font-bold pb-4">About me</h1>
      <p>
        I improve software developing process and make tailor apps for solve
        your needs. Systems Engineer with a Master’s degree in Full Stack
        Development and over 4 years of experiences in designing, developing,
        and implementing web applications and technological solutions.
        Specialized in technologies such as Node.js, NestJS, React, and Vue,
        with a focus on creating efficient systems. Recognized for technical
        expertise, teamwork skills, and excellent English communication,
        enabling effective collaboration in multicultural and remote
        environments. Seeking to contribute to innovative projects that drive
        technological growth within organizations.
      </p>
    </div>
    <div class="p-8">
      <h3 class="text-left font-bold text-xl pb-4">Work experience</h3>

      <div class="flex flex-col gap-8">
        <CardWorkExp
          title="Pontificia Universidad Católica del Ecuador - Ibarra"
          role="System Analist, Fullstack Developer"
          date-work="April 2022 - Current"
          description="The Pontifical Catholic University of Ecuador - Ibarra is a renowned university in Ecuador, focused on education in values and the social and personal transformation of society. I currently work on academic software projects related to students, professors, and administrative staff, helping to automate their processes and streamline transactions."
          stack="Vue, Nuxt, Postgres, Oracle, Docker, Jenkins"
        />
        
        <CardWorkExp
          title="Soluciones Tecnológicas Kauel - Remote, Chile"
          role="Fullstack Developer"
          date-work="November 2022 - April 2024"
          description="Kauel Unique Solutions is a Chilean technology consulting firm
            specializing in business solutions. During my time there, I led the
            development of complex web applications for clients in the oil and
            retail sectors."
          stack="React, Nodejs, Figma, Azure, Sql Server, Postgres"
        />

        <CardWorkExp 
          title="Intern: GAD Tulcán - Ecuador"
          role="Intern: Database Manager Assistance"
          date-work="January 2021 – March 2021"
          description="The decentralized autonomous government of the city of Tulcán in Ecuador is a mayor's office responsible for administering all the services required by the city. During my internship, I assisted the Database Administrator of the Department of Popular Economy and Sustainable Development in gathering information on the city's markets for the creation of a consolidated database."
          stack="Sql, MS Excel, Mysql"
        />

        <CardWorkExp 
          title="Intern: Pontificia Universidad Católica del Ecuador - Ibarra"
          role="Intern: IT Support and Virtualization"
          date-work="May 2019 – March 2020"
          description="As a student, I had the opportunity to intern in the infrastructure department at the Pontificia Universidad Católica del Ecuador Ibarra, where I assisted in the server virtualization process. This process includes everything from installing physical servers and configuring operating systems to routing and startup, in accordance with infrastructure guidelines."
          stack="oVirt, Virtual Box, VmWare, Linux, Red Hat"
        />

        
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const images = [
  { src: "sdv-1.png", alt: "al" },
  { src: "sgd-1.png", alt: "al" },
  { src: "sa-1.png", alt: "al" },
  { src: "sga-1.png", alt: "al" },
  { src: "sbac-1.png", alt: "al" },
  { src: "srb-1.png", alt: "al" },
];
</script>

<style></style>
