"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[939],{4939:(e,n,s)=>{s.r(n),s.d(n,{__N_SSG:()=>C,default:()=>T});var t=s(7876),r=s(4232),i=s(9099),l=s(8847),a=s.n(l),d=s(8751);let o=a()(()=>s.e(24).then(s.bind(s,8024)),{loadableGenerated:{webpack:()=>[8024]},ssr:!1,loading:()=>(0,t.jsx)("fieldset",{children:"\xa0"})}),h=a()(()=>s.e(96).then(s.bind(s,1096)),{loadableGenerated:{webpack:()=>[1096]},ssr:!1,loading:()=>(0,t.jsx)(t.Fragment,{children:"\xa0"})});class c extends r.Component{render(){let{timezone:e}=this.props;return(0,t.jsxs)(d.A,{title:"Anywhere On Earth",children:[(0,t.jsx)("p",{children:"Anywhere on Earth is a timezone commonly used for deadlines. It usuallly includes only a date, not a time. As long as the day is correct (no matter where you are), you are within the deadline."}),(0,t.jsxs)("p",{children:["The current date in ",(0,t.jsx)("b",{children:"Anywhere On Earth"})," is:"]}),(0,t.jsx)(o,{offset:-12,format:"LL"}),(0,t.jsxs)("p",{children:["In your timezone, a new ",(0,t.jsx)("b",{children:"Anywhere On Earth"})," day starts at ",(0,t.jsx)("b",{children:(0,t.jsx)(h,{timezone:e})})," localtime."]})]})}}let x=a()(()=>s.e(24).then(s.bind(s,8024)),{loadableGenerated:{webpack:()=>[8024]},ssr:!1,loading:()=>(0,t.jsx)("fieldset",{children:"\xa0"})}),j=a()(()=>s.e(62).then(s.bind(s,8062)),{loadableGenerated:{webpack:()=>[8062]},ssr:!1,loading:()=>(0,t.jsx)(t.Fragment,{children:"\xa0"})});class p extends r.Component{render(){let{timezone:e}=this.props;return(0,t.jsxs)(d.A,{title:"UTC",children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("b",{children:"Coordinated Universal Time"})," is a global time standard that all other timezones are defined relative to."]}),(0,t.jsxs)("p",{children:["Your current timezone is ",(0,t.jsx)("b",{children:(0,t.jsx)(j,{timezone:e})})," UTC."]}),(0,t.jsxs)("p",{children:["The current time in ",(0,t.jsx)("b",{children:"UTC"})," is:"]}),(0,t.jsx)(x,{})]})}}let m=a()(()=>s.e(24).then(s.bind(s,8024)),{loadableGenerated:{webpack:()=>[8024]},ssr:!1,loading:()=>(0,t.jsx)("fieldset",{children:"\xa0"})}),u=a()(()=>s.e(101).then(s.bind(s,9101)),{loadableGenerated:{webpack:()=>[9101]},ssr:!1,loading:()=>(0,t.jsx)("select",{disabled:!0,children:(0,t.jsx)("option",{children:"Loading"})})});class b extends r.Component{render(){let{timezone:e,onChange:n,onReset:s}=this.props;return(0,t.jsxs)(d.A,{title:"Local Time",children:[(0,t.jsxs)("p",{children:["The current time in ",(0,t.jsx)(u,{current:e,onChange:n})," is:"]}),(0,t.jsx)(m,{timezone:e,format:"YYYY-MM-DD[T]HH:mm:ss.SSSZZ"}),(0,t.jsx)("p",{children:(0,t.jsx)("button",{onClick:s,children:"Reset Timezone"})})]})}}s(1479);var w=s(7328),g=s.n(w);class z extends r.Component{render(){let{timezone:e}=this.props;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(g(),{children:[(0,t.jsxs)("title",{children:["Time in ",e]}),(0,t.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),(0,t.jsx)(b,{timezone:e,onChange:this.goTz,onReset:this.goHome}),(0,t.jsx)(p,{timezone:e}),(0,t.jsx)(c,{timezone:e})]})}constructor(...e){super(...e),this.goHome=()=>this.props.router.push("/"),this.goTz=e=>this.props.router.push("/tz/".concat(e))}}var C=!0;let T=(0,i.withRouter)(z)}}]);