(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,n,t){e.exports=t(42)},41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(16),u=t.n(c),o=t(6),s=t(3),i=t(2),l=t.n(i),m=t(4),f=t(5),d=t.n(f),p="/api/persons",v={createPerson:function(){var e=Object(m.a)(l.a.mark(function e(n){var t,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=d.a.post(p,n),e.next=3,t;case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),updatePerson:function(){var e=Object(m.a)(l.a.mark(function e(n){var t,a,r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(p,"/").concat(n.id),a=d.a.put(t,n),e.next=4,a;case 4:return r=e.sent,e.abrupt("return",r.data);case 6:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),getAllPersons:function(){var e=Object(m.a)(l.a.mark(function e(){var n,t;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.a.get(p),e.next=3,n;case 3:return t=e.sent,e.abrupt("return",t.data);case 5:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),deletePerson:function(){var e=Object(m.a)(l.a.mark(function e(n){var t,a,r;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(p,"/").concat(n.id),a=d.a.delete(t,n),e.next=4,a;case 4:return r=e.sent,e.abrupt("return",r.data);case 6:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}()},b=function(e){var n=e.filter,t=e.setFilter,a=e.handleChange;return r.a.createElement("div",null,"filter shown with",r.a.createElement("input",{value:n,onChange:function(e){return a(t,e.target.value.toLowerCase())}}))},h=function(e){var n=e.person,t=e.handleDelete;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){return t(n)}},"delete"))},w=function(e){var n=e.persons,t=e.handleDelete,a=e.filter,c=n.filter(function(e){var n=e.name.toLowerCase().includes(a),t=e.number.toLowerCase().includes(a);return n||t});return r.a.createElement("ul",null,c.map(function(e){return r.a.createElement(h,{key:e.id,person:e,handleDelete:t})}))},E=function(e){var n=e.addNewContact,t=e.newName,a=e.newNumber,c=e.setNewName,u=e.setNewNumber,o=e.handleChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:t,onChange:function(e){return o(c,e.target.value)}})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:a,onChange:function(e){return o(u,e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},g=function(e){var n=e.notification;return n.message?r.a.createElement("div",{className:"notification ".concat(n.class)},n.message):null},j=(t(41),function(){var e=Object(a.useState)([]),n=Object(s.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),i=Object(s.a)(u,2),l=i[0],m=i[1],f=Object(a.useState)(""),d=Object(s.a)(f,2),p=d[0],h=d[1],j=Object(a.useState)(""),O=Object(s.a)(j,2),N=O[0],C=O[1],k=Object(a.useState)({message:"",class:""}),x=Object(s.a)(k,2),y=x[0],P=x[1],D=function(e){P(e),setTimeout(function(){P(Object(o.a)({},e,{message:""}))},5e3)};Object(a.useEffect)(function(){v.getAllPersons().then(function(e){c(e)})},[]);var S=function(e,n){e(n)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{notification:y}),r.a.createElement(b,{filter:N,setFilter:C,handleChange:S}),r.a.createElement("h3",null,"add a new"),r.a.createElement(E,{addNewContact:function(e){e.preventDefault();var n=t.find(function(e){return e.name===l});if(n){if(!window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?")))return;var a=Object(o.a)({},n,{number:p});v.updatePerson(a).then(function(e){var r={message:"Updated contact information for ".concat(a.name),class:"success"};D(r),c(t.map(function(t){return t.id===n.id?e:t}))}).catch(function(e){console.log(e.response.data);var n={message:"Error: ".concat(e.response.data),class:"error"};D(n)})}else{var r={name:l,number:p};v.createPerson(r).then(function(e){var n={message:"Added ".concat(e.name),class:"success"};D(n),c(t.concat(e))}).catch(function(e){var n=e.response.data.error,t={message:"Error: ".concat(n),class:"error"};D(t)})}m(""),h("")},newName:l,newNumber:p,setNewName:m,setNewNumber:h,handleChange:S}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(w,{persons:t,handleDelete:function(e){window.confirm("Delete ".concat(e.name,"?"))&&v.deletePerson(e).then(function(n){var a={message:"Deleted ".concat(e.name),class:"success"};D(a),c(t.filter(function(n){return n.id!==e.id}))}).catch(function(n){var t={message:"Information of ".concat(e.name," has already been removed from server"),class:"error"};D(t)})},filter:N}))});u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.c45a2b1f.chunk.js.map