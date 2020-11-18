<template>
  <v-app fluid dark>
    <div class="page">
      <div class="content">
        <h1>404</h1>
        <h2>Page not found</h2>
        <p>I tried to catch some fog, but i mist</p>
        <nuxt-link to="/">
          back to home
        </nuxt-link>
      </div>
      <img id="background" src="http://www.supah.it/dribbble/008/008.jpg">
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'Error',
  mounted () {
    this.animation()
    console.log('run')
  },
  methods: {
    animation () {
      let lFollowX = 0
      let lFollowY = 0
      let x = 0
      let y = 0
      const friction = 1 / 30
      function animate () {
        x += (lFollowX - x) * friction
        y += (lFollowY - y) * friction
        const translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)'
        const img = document.querySelector('#background')
        img.setAttribute(
          'style',
          `-webit-transform: ${translate};-moz-transform: ${translate};transform: ${translate};`
        )
        window.requestAnimationFrame(animate)
      }
      document.addEventListener('mousemove', function (e) {
        const lMouseX = Math.max(
          -100,
          Math.min(100, window.innerWidth / 2 - e.clientX)
        )
        const lMouseY = Math.max(
          -100,
          Math.min(100, window.innerHeight / 2 - e.clientY)
        )
        lFollowX = (20 * lMouseX) / 100 // 100 : 12 = lMouxeX : lFollow
        lFollowY = (10 * lMouseY) / 100
      })
      animate()
    }
  }
}
</script>

<style scoped lang="scss">
/*--------------------
Page
--------------------*/
.page {
  width: 100vw;
  height: 100vh;
  z-index: 1;
  font-family: Roboto, sans-serif;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
}
/*--------------------
Header
--------------------*/
.content {
  text-align: center;
  padding-top: 118px;
  color: #cdd4de;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  h1 {
    font-weight: 900;
    font-size: 165px;
    line-height: 1;
    margin-bottom: -10px;
    opacity: 0.8;
    color: rgba($color: #fff, $alpha: 0.9);
    text-shadow: 2px 2px rgba($color: #aaa, $alpha: 0.8);
  }
  h2 {
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 6px;
    opacity: 0.9;
    color: rgba(213, 24, 59, 0.8);
    text-shadow: 1px 2px rgba($color: #fff, $alpha: 0.7);
  }
  p {
    font-weight: 300;
    font-size: 18px;
    opacity: 0.7;
    margin-bottom: 100px;
    color: #c40e4adb;
    text-shadow: -0.1px -1px white;
  }
  a {
    display: inline-block;
    text-decoration: none;
    font-weight: 300;
    font-size: 12px;
    text-transform: uppercase;
    border: 1px solid #cdd4de94;
    padding: 8px 14px;
    border-radius: 4px;
    opacity: 1;
    cursor: pointer;
    color: whitesmoke;
  }
}
/*--------------------
Image
--------------------*/
img {
  position: relative;
  width: inherit;
  z-index: -1;
}
</style>
