import{_ as d}from"./index-5f4d758a.js";const m={created(){this.$router.push({name:"backgammon",params:{matchId:this.$route.params.matchId}})},beforeRouteEnter(r,o,e){e(a=>{var t=document.getElementById("main-header"),n=document.getElementById("backgammon-header");t.style.display="none",n.style.display="block"})},beforeRouteLeave(r,o,e){var a=document.getElementById("main-header"),t=document.getElementById("backgammon-header");a.style.display="block",t.style.display="none",e()}};function s(r,o,e,a,t,n){return null}const l=d(m,[["render",s]]);export{l as default};
