import{_ as p,o as a,c as i,a as t,w as u,v as h,d as f,F as r,r as b,t as c,e as v,j as _,g as w,i as x}from"./index-13d66610.js";const A={props:{typeList:{default:{}}},data(){return{title:"",textBody:"",type:""}},methods:{add(){const s={title:this.title,text_body:this.textBody,type:this.type,to:"all"};this.$axios.post("https://allbet247livegames.com/backend/web/announcement/admin/add",s).then(e=>{e=e.data,e.result&&this.$notif.show("Added!","success"),this.closeModal(),this.$emit("added")})},closeModal(){new bootstrap.Modal("#addAnnounModal").hide()}}},g={class:"modal",id:"addAnnounModal",tabindex:"-1","aria-hidden":"true"},$={class:"modal-dialog modal-lg modal-simple modal-edit-user"},M={class:"modal-content p-3 p-md-5"},L={class:"modal-body"},k=t("div",{class:"text-center mb-4"},[t("h3",{class:"mb-2"},"Add New Announcement")],-1),B={id:"editUserForm",class:"row g-3",onsubmit:"return false"},N={class:"col-12"},T=t("label",{class:"form-label"},"Title",-1),C={class:"col-12"},D=t("label",{class:"form-label"},"Body",-1),V={class:"col-12"},U=t("label",{class:"form-label"},"Type",-1),F=["value"],S={class:"col-12 text-center"},j=t("button",{type:"button",class:"btn btn-label-secondary","data-bs-dismiss":"modal","aria-label":"Close"}," close ",-1);function E(s,e,m,y,n,d){return a(),i("div",g,[t("div",$,[t("div",M,[t("div",L,[k,t("form",B,[t("div",N,[T,u(t("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>n.title=o),type:"text",class:"form-control"},null,512),[[h,n.title]])]),t("div",C,[D,u(t("textarea",{"onUpdate:modelValue":e[1]||(e[1]=o=>n.textBody=o),type:"text",class:"form-control"},null,512),[[h,n.textBody]])]),t("div",V,[U,u(t("select",{"onUpdate:modelValue":e[2]||(e[2]=o=>n.type=o),class:"form-control"},[(a(!0),i(r,null,b(Object.keys(m.typeList),o=>(a(),i("option",{value:o},c(o),9,F))),256))],512),[[f,n.type]])]),t("div",S,[t("button",{onClick:e[3]||(e[3]=(...o)=>d.add&&d.add(...o)),type:"button",class:"btn btn-primary me-sm-3 me-1"},"Add"),j])])])])])])}const O=p(A,[["render",E]]),q={components:{NewAnnounModal:O},data(){return{typeList:[],announList:[]}},mounted(){this.fetchAnnoun(),this.fetchTypeList()},methods:{deleteAnnoun(s){this.$axios.get("https://allbet247livegames.com/backend/web/announcement/admin/delete?id="+s._id).then(e=>{e=e.data,e.result&&this.$notif.show("Deleted!","success"),this.fetchAnnoun()})},openNewAnnounModal(){new bootstrap.Modal("#addAnnounModal").show()},fetchTypeList(){this.$axios.get("https://allbet247livegames.com/backend/web/announcement/admin/type-list").then(s=>{s=s.data,s.result&&(this.typeList=s.params)})},fetchAnnoun(){this.$axios.get("https://allbet247livegames.com/backend/web/announcement/admin/list").then(s=>{s=s.data,s.result&&(this.announList=s.params)})}}},z=t("h4",null,"Announcements",-1),G={class:"card"},H={class:"card-header header-elements"},I={class:"card-header-elements ms-auto"},J=t("span",{class:"tf-icon ti ti-plus ti-xs me-1"},null,-1),K={class:"table-responsive text-nowrap"},P={class:"table"},Q=t("thead",null,[t("tr",null,[t("th",null,"Title"),t("th",null,"Body"),t("th",null,"Type"),t("th",null,"Date"),t("th",null,"Actions")])],-1),R={class:"table-border-bottom-0"},W={class:"dropdown"},X=t("button",{type:"button",class:"btn p-0 dropdown-toggle hide-arrow","data-bs-toggle":"dropdown"},[t("i",{class:"ti ti-dots-vertical"})],-1),Y={class:"dropdown-menu"},Z=["onClick"],tt=t("i",{class:"ti ti-trash me-1"},null,-1);function et(s,e,m,y,n,d){const o=v("new-announ-modal");return a(),i(r,null,[z,t("div",G,[t("div",H,[t("div",I,[t("button",{onClick:e[0]||(e[0]=(...l)=>d.openNewAnnounModal&&d.openNewAnnounModal(...l)),type:"button",class:"btn btn-xs btn-primary waves-effect waves-light"},[J,_("Add New ")])])]),t("div",K,[t("table",P,[Q,t("tbody",R,[(a(!0),i(r,null,b(n.announList,l=>(a(),i("tr",null,[t("td",null,c(l.title),1),t("td",null,c(l.text_body),1),t("td",null,c(l.type),1),t("td",null,c(new Date(l.cdate*1e3).toLocaleString()),1),t("td",null,[t("div",W,[X,t("div",Y,[t("a",{onClick:x(st=>d.deleteAnnoun(l),["prevent"]),class:"dropdown-item"},[tt,_(" Delete")],8,Z)])])])]))),256))])])])]),w(o,{onAdded:e[1]||(e[1]=l=>d.fetchAnnoun()),"type-list":n.typeList},null,8,["type-list"])],64)}const nt=p(q,[["render",et]]);export{nt as default};