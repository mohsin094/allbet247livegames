import{_ as p,o as a,c as i,a as t,w as u,v as h,b as f,F as r,r as b,t as c,d as w,h as _,f as v,g as x}from"./index-f5519bef.js";const A={props:{typeList:{default:{}}},data(){return{title:"",textBody:"",type:""}},methods:{add(){const o={title:this.title,text_body:this.textBody,type:this.type,to:"all"};this.$axios.post("http://backgammon.all-bet-247.com/backend/web/announcement/admin/add",o).then(e=>{e=e.data,e.result&&this.$notif.show("Added!","success"),this.closeModal(),this.$emit("added")})},closeModal(){new bootstrap.Modal("#addAnnounModal").hide()}}},g={class:"modal",id:"addAnnounModal",tabindex:"-1","aria-hidden":"true"},$={class:"modal-dialog modal-lg modal-simple modal-edit-user"},k={class:"modal-content p-3 p-md-5"},M={class:"modal-body"},L=t("div",{class:"text-center mb-4"},[t("h3",{class:"mb-2"},"Add New Announcement")],-1),B={id:"editUserForm",class:"row g-3",onsubmit:"return false"},N={class:"col-12"},T=t("label",{class:"form-label"},"Title",-1),C={class:"col-12"},D=t("label",{class:"form-label"},"Body",-1),V={class:"col-12"},U=t("label",{class:"form-label"},"Type",-1),F=["value"],S={class:"col-12 text-center"},j=t("button",{type:"button",class:"btn btn-label-secondary","data-bs-dismiss":"modal","aria-label":"Close"}," close ",-1);function E(o,e,m,y,s,d){return a(),i("div",g,[t("div",$,[t("div",k,[t("div",M,[L,t("form",B,[t("div",N,[T,u(t("input",{"onUpdate:modelValue":e[0]||(e[0]=n=>s.title=n),type:"text",class:"form-control"},null,512),[[h,s.title]])]),t("div",C,[D,u(t("textarea",{"onUpdate:modelValue":e[1]||(e[1]=n=>s.textBody=n),type:"text",class:"form-control"},null,512),[[h,s.textBody]])]),t("div",V,[U,u(t("select",{"onUpdate:modelValue":e[2]||(e[2]=n=>s.type=n),class:"form-control"},[(a(!0),i(r,null,b(Object.keys(m.typeList),n=>(a(),i("option",{value:n},c(n),9,F))),256))],512),[[f,s.type]])]),t("div",S,[t("button",{onClick:e[3]||(e[3]=(...n)=>d.add&&d.add(...n)),type:"button",class:"btn btn-primary me-sm-3 me-1"},"Add"),j])])])])])])}const O=p(A,[["render",E]]),q={components:{NewAnnounModal:O},data(){return{typeList:[],announList:[]}},mounted(){this.fetchAnnoun(),this.fetchTypeList()},methods:{deleteAnnoun(o){this.$axios.get("http://backgammon.all-bet-247.com/backend/web/announcement/admin/delete?id="+o._id).then(e=>{e=e.data,e.result&&this.$notif.show("Deleted!","success"),this.fetchAnnoun()})},openNewAnnounModal(){new bootstrap.Modal("#addAnnounModal").show()},fetchTypeList(){this.$axios.get("http://backgammon.all-bet-247.com/backend/web/announcement/admin/type-list").then(o=>{o=o.data,o.result&&(this.typeList=o.params)})},fetchAnnoun(){this.$axios.get("http://backgammon.all-bet-247.com/backend/web/announcement/admin/list").then(o=>{o=o.data,o.result&&(this.announList=o.params)})}}},z=t("h4",null,"Announcements",-1),G={class:"card"},H={class:"card-header header-elements"},I={class:"card-header-elements ms-auto"},J=t("span",{class:"tf-icon ti ti-plus ti-xs me-1"},null,-1),K={class:"table-responsive text-nowrap"},P={class:"table"},Q=t("thead",null,[t("tr",null,[t("th",null,"Title"),t("th",null,"Body"),t("th",null,"Type"),t("th",null,"Date"),t("th",null,"Actions")])],-1),R={class:"table-border-bottom-0"},W={class:"dropdown"},X=t("button",{type:"button",class:"btn p-0 dropdown-toggle hide-arrow","data-bs-toggle":"dropdown"},[t("i",{class:"ti ti-dots-vertical"})],-1),Y={class:"dropdown-menu"},Z=["onClick"],tt=t("i",{class:"ti ti-trash me-1"},null,-1);function et(o,e,m,y,s,d){const n=w("new-announ-modal");return a(),i(r,null,[z,t("div",G,[t("div",H,[t("div",I,[t("button",{onClick:e[0]||(e[0]=(...l)=>d.openNewAnnounModal&&d.openNewAnnounModal(...l)),type:"button",class:"btn btn-xs btn-primary waves-effect waves-light"},[J,_("Add New ")])])]),t("div",K,[t("table",P,[Q,t("tbody",R,[(a(!0),i(r,null,b(s.announList,l=>(a(),i("tr",null,[t("td",null,c(l.title),1),t("td",null,c(l.text_body),1),t("td",null,c(l.type),1),t("td",null,c(new Date(l.cdate*1e3).toLocaleString()),1),t("td",null,[t("div",W,[X,t("div",Y,[t("a",{onClick:x(ot=>d.deleteAnnoun(l),["prevent"]),class:"dropdown-item"},[tt,_(" Delete")],8,Z)])])])]))),256))])])])]),v(n,{onAdded:e[1]||(e[1]=l=>d.fetchAnnoun()),"type-list":s.typeList},null,8,["type-list"])],64)}const st=p(q,[["render",et]]);export{st as default};
