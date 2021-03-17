<template>
  <div id="app">
    <Header name="app2"/>
    <Footer name="app2的footer"/>
  </div>
</template>
<script>

export default {
  // 远程组件的引入一定要注意代码的异步，可以直接使用上面的异步组件的加载方式，也可以使用 async/await 方式 动态加载组件。
  // recat 可以通过 const Header = React.lazy(() => import("app1/Header"));
  components: {
    Header: () => import('app1/Header'),
    Footer: () => import('app1/Footer')
  }
}

</script>
