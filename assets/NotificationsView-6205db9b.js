import{_ as l,S as _,a as s,c as o,b as a,F as b,C as h,v as n}from"./index-7a9a660b.js";const p={components:{Sidebar:_},data(){return{announcements:[]}},mounted(){this.getannouncement()},methods:{getannouncement(){const i="https://allbet247livegames.com/backend/web/announcement/default/list";let d=this;this.$axios.get(i).then(function(c){let e=c.data.params;e.length>0&&(d.announcements=e)})}}},u={class:"row"},g={class:"accordion",id:"accordion"},m={class:"accordion-item"},f=["id"],v=["data-bs-target","aria-controls"],x=["id","aria-labelledby"],y={class:"accordion-body"};function k(i,d,c,e,r,$){return s(),o("div",u,[a("div",g,[(s(!0),o(b,null,h(r.announcements,t=>(s(),o("div",m,[a("h2",{class:"accordion-header",id:"heading"+t._id},[a("button",{class:"accordion-button bg-dark-gradient",type:"button","data-bs-toggle":"collapse","data-bs-target":"#id"+t._id,"aria-expanded":"true","aria-controls":"collapse"+t._id},n(t.title),9,v)],8,f),a("div",{id:"id"+t._id,class:"accordion-collapse collapse","aria-labelledby":"heading"+t._id,"data-bs-parent":"#accordion"},[a("div",y,n(t.text_body),1)],8,x)]))),256))])])}const B=l(p,[["render",k]]);export{B as default};
