<template>
  <nav class="bg-blue-700 flex justify-end w-full mb-4">
    <img
      src="./assets/icons/basket.svg"
      width="20"
      height="20"
      alt="basket_icon"
      class="cursor-pointer"
    />
  </nav>
  <div class="m-auto w-4/5">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
