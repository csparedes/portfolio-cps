<template>
  <div class="text-center">
    
    <UContainer class="flex w-full justify-center"
      ><NuxtImg src="perfil.jpg" class="rounded-full w-60 h-60 p-4"
    /></UContainer>
    <h1 class="text-xl font-bold">Hello</h1>

    <div class="flex justify-center p-5">
      <div class="text-left">
        <h1 class="font-light text-lg">I'm Cristian Paredes Sánchez</h1>
        <h2 class="uppercase font-bold text-lg">System Engineer / Software Developer</h2>
      </div>
    </div>

    <div class="p-8">
      <h1 class="text-left p-1">Have a look on my projects <NuxtLink to="/projects">here</NuxtLink></h1>
      <CarrouselImg :images="images" />
    </div>

    <div class="text-left p-1 md:p-8">
      <h1 class="text-xl font-bold">About me</h1>
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
      <h3>Work experience</h3>
      <ul>
        <li>Pontificia Universidad Católica del Ecuador - Ibarra</li>
        <li>Soluciones Tecnológicas Kauel - Chile</li>
        <li>GAD Tulcán - Ecuador</li>
      </ul>
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
