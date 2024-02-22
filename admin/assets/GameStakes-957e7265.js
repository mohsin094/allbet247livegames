import{_ as h,o as n,c as i,a as t,w as b,v as p,e as k,j as c,F as r,r as w,g as v,t as m,i as f}from"./index-489d631c.js";const g={data(){return{stake:""}},methods:{add(){const s={stake:this.stake,status:"active"};this.$axios.post("https://allbet247livegames.com/backend/web/game/admin/add-stake",s).then(e=>{e=e.data,e.result&&this.$notif.show("Added!","success"),this.closeModal(),this.$emit("added")})},closeModal(){new bootstrap.Modal("#addStakeModal").hide()}}},S={class:"modal",id:"addStakeModal",tabindex:"-1","aria-hidden":"true"},$={class:"modal-dialog modal-lg modal-simple modal-edit-user"},x={class:"modal-content p-3 p-md-5"},M={class:"modal-body"},y=t("div",{class:"text-center mb-4"},[t("h3",{class:"mb-2"},"Add New Stake")],-1),N={id:"editUserForm",class:"row g-3",onsubmit:"return false"},A={class:"col-12"},C=t("label",{class:"form-label"},"Stake",-1),D={class:"col-12 text-center"},L=t("button",{type:"button",class:"btn btn-label-secondary","data-bs-dismiss":"modal","aria-label":"Close"}," close ",-1);function V(s,e,_,u,l,a){return n(),i("div",S,[t("div",$,[t("div",x,[t("div",M,[y,t("form",N,[t("div",A,[C,b(t("input",{"onUpdate:modelValue":e[0]||(e[0]=d=>l.stake=d),type:"text",class:"form-control"},null,512),[[p,l.stake]])]),t("div",D,[t("button",{onClick:e[1]||(e[1]=(...d)=>a.add&&a.add(...d)),type:"button",class:"btn btn-primary me-sm-3 me-1"},"Add"),L])])])])])])}const B=h(g,[["render",V]]),F={components:{NewStakeModal:B},data(){return{stakeList:[]}},mounted(){this.fetchStakes()},methods:{openNewStakeModal(){new bootstrap.Modal("#addStakeModal").show()},deleteStake(s){this.$axios.get("https://allbet247livegames.com/backend/web/game/admin/delete-stake?id="+s._id).then(e=>{e=e.data,e.result&&(this.$notif.show("Deleted!","success"),this.fetchStakes())})},fetchStakes(){this.$axios.get("https://allbet247livegames.com/backend/web/game/admin/get-stakes-list").then(s=>{s=s.data,s.result&&(this.stakeList=s.params)})}}},G=t("h4",null,"Game Stakes",-1),T={class:"card"},U={class:"card-header header-elements"},j={class:"card-header-elements ms-auto"},E=t("span",{class:"tf-icon ti ti-plus ti-xs me-1"},null,-1),q={class:"table-responsive text-nowrap"},z={class:"table"},H=t("thead",null,[t("tr",null,[t("th",null,"Stake"),t("th",null,"Status"),t("th",null,"Actions")])],-1),I={class:"table-border-bottom-0"},J={class:"dropdown"},K=t("button",{type:"button",class:"btn p-0 dropdown-toggle hide-arrow","data-bs-toggle":"dropdown"},[t("i",{class:"ti ti-dots-vertical"})],-1),O={class:"dropdown-menu"},P=["onClick"],Q=t("i",{class:"ti ti-trash me-1"},null,-1);function R(s,e,_,u,l,a){const d=k("new-stake-modal");return n(),i(r,null,[G,t("div",T,[t("div",U,[t("div",j,[t("button",{onClick:e[0]||(e[0]=(...o)=>a.openNewStakeModal&&a.openNewStakeModal(...o)),type:"button",class:"btn btn-xs btn-primary waves-effect waves-light"},[E,c("Add New ")])])]),t("div",q,[t("table",z,[H,t("tbody",I,[(n(!0),i(r,null,w(l.stakeList,o=>(n(),i("tr",null,[t("td",null,m(o.stake),1),t("td",null,m(o.status),1),t("td",null,[t("div",J,[K,t("div",O,[t("a",{onClick:f(W=>a.deleteStake(o),["prevent"]),class:"dropdown-item"},[Q,c(" Delete")],8,P)])])])]))),256))])])])]),v(d,{onAdded:e[1]||(e[1]=o=>a.fetchStakes())})],64)}const Y=h(F,[["render",R]]);export{Y as default};
