import{_ as p,k as r,a as s,c as a,b as t,n as d}from"./index-c3e30c6e.js";const _={data(){return{invitationCode:"",tooltipText:"Copy to clipboard"}},mounted(){this.fetchLink()},methods:{fetchLink(){const i="https://allbet247livegames.com/backend/web/user/profile/get-invitation-link";this.$axios.get(i).then(e=>{e=e.data,e.result&&(this.invitationCode=e.params.link)})},copyLink(){this.tooltipText="Copied!";var i=document.getElementById("link");i.setSelectionRange(0,99999),navigator.clipboard.writeText(i.value)}}},u={class:"row justify-content-center"},v={class:"col-md-8 mb-2"},h={class:"bg-dark-gradient text-center p-4 simple-page"},m=t("label",null,"INVITATION LINK",-1),k=t("hr",{class:"hr-text"},null,-1),b={class:"position-relative input-wrapper"},f=t("span",{class:"input-icon input-icon-left position-absolute"},[t("span",{class:"material-symbols-outlined"},"link")],-1),x=["value"],y=t("span",{class:"material-symbols-outlined"},"content_copy",-1),g=[y];function w(i,e,I,T,o,n){const l=r("tooltip");return s(),a("div",u,[t("div",v,[t("div",h,[m,k,t("div",b,[f,t("input",{type:"text",class:"formkit-input",value:o.invitationCode,id:"link"},null,8,x),d((s(),a("span",{onClick:e[0]||(e[0]=(...c)=>n.copyLink&&n.copyLink(...c)),class:"input-icon input-icon-right position-absolute"},g)),[[l,o.tooltipText]])])])])])}const L=p(_,[["render",w]]);export{L as default};
