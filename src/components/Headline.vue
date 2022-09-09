<template>
  <div class="container">
    <h1>
      <span>OMDb API</span><br/>
      The Open Movie Database
    </h1>
    <p>
      The OMDb API is a RESTful web service to obtain movie information,<br/> 
      all content and images on the site are contributed and maintained by our users.
    </p>
  </div>
</template>

<style lang="scss" scoped>
  h1{
    padding-top: 40px;
    line-height: 1;
    font-family: "Oswald", sans-serif;
    font-size: 80px;
    span{
      color: $primary;
    }
  }

  p{
    margin: 30px 0;
    color: $gray-600;
  } 
</style>