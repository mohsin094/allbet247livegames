import{_ as h,o,c as a,a as t,F as d,r as _,t as u,w as p,v as m}from"./index-489d631c.js";const g={data(){return{settings:{}}},mounted(){this.fetchSettings()},methods:{update(e){const i={value:this.settings[e].value};this.$axios.post("https://allbet247livegames.com/backend/web/admin-setting/update?id="+this.settings[e]._id,i).then(l=>{l=l.data,l.result&&this.$notif.show("Updated!","success")})},fetchSettings(){this.$axios.get("https://allbet247livegames.com/backend/web/admin-setting/get").then(e=>{e=e.data,e.result&&(this.settings=e.params)})}}},b=t("h4",null,"Settings",-1),v={class:"card"},f={class:"table-responsive text-nowrap"},x={class:"table"},w=t("thead",null,[t("tr",null,[t("th",null,"Name"),t("th",null,"Value"),t("th",null,"DESC.")])],-1),S={class:"table-border-bottom-0"},k=["onFocusout","onUpdate:modelValue"];function y(e,i,l,F,s,r){return o(),a(d,null,[b,t("div",v,[t("div",f,[t("table",x,[w,t("tbody",S,[(o(!0),a(d,null,_(Object.keys(s.settings),n=>(o(),a("tr",null,[t("td",null,u(s.settings[n].name),1),t("td",null,[p(t("input",{onFocusout:c=>r.update(n),type:"text","onUpdate:modelValue":c=>s.settings[n].value=c,class:"form-control"},null,40,k),[[m,s.settings[n].value]])]),t("td",null,u(s.settings[n].description),1)]))),256))])])])])],64)}const B=h(g,[["render",y]]);export{B as default};
