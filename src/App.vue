<template>
  <div>
    <div>{{ $store.state.user.profile.nickname }}</div>
    <button @click="$store.commit('user/setUser', {nickname: '123'})">changeUser</button>
  </div>
</template>

<style lang="less">

</style>
