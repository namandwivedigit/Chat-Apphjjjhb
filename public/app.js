const pages=["Splash Screen","Login Page","Signup Page","Forgot Password Page","Home Page","Service/Doctor List Page","Service/Doctor Details Page","Select Date & Time Page","Appointment Booking Form","Booking Confirmation Page","My Appointments Page","Appointment Details Page","Cancel/Reschedule Appointment Page","User Profile Page","Edit Profile Page","Notifications Page","Payment Page","Payment Success Page","Reviews & Ratings Page","Help & Support Page","Settings Page","Admin Dashboard","Manage Appointments Page","Manage Users Page","Manage Services/Doctors Page"];
const state={user:JSON.parse(localStorage.getItem('user')||'null'),selectedDoctor:null,slot:{date:'',time:''},lastBooking:null};
const menu=document.getElementById('menu'),view=document.getElementById('view'),title=document.getElementById('title'),auth=document.getElementById('auth');
const api=(u,o)=>fetch(u,{headers:{'Content-Type':'application/json'},...o}).then(r=>r.json());
function authBar(){auth.innerHTML=state.user?`${state.user.name} (${state.user.role}) <button onclick='logout()'>Logout</button>`:''}
window.logout=()=>{localStorage.removeItem('user');location.reload()}
function nav(){menu.innerHTML='';pages.forEach(p=>{const b=document.createElement('button');b.textContent=p;b.onclick=()=>render(p);menu.appendChild(b);});}
async function render(p){title.textContent=p;
if(p==='Signup Page')return view.innerHTML=`<div class='card'><input id=n placeholder='Name'><input id=e placeholder='Email'><input id=pw placeholder='Password'><button onclick='signup()'>Signup</button></div>`;
if(p==='Login Page')return view.innerHTML=`<div class='card'><input id=e placeholder='Email'><input id=pw placeholder='Password'><button onclick='login()'>Login</button></div>`;
if(p==='Home Page')return view.innerHTML=`<div class='card'>Welcome ${state.user?state.user.name:'Guest'}<br>Use menu to continue booking flow.</div>`;
if(p==='Service/Doctor List Page'){const d=await api('/api/doctors');view.innerHTML=d.map(x=>`<div class='card'><b>${x.name}</b> - ${x.service} - ₹${x.fee}<button onclick='pickDoctor("${x.id}")'>Select</button></div>`).join('');return}
if(p==='Service/Doctor Details Page')return view.innerHTML=`<div class='card'>${state.selectedDoctor?JSON.stringify(state.selectedDoctor):'Select doctor first from list.'}</div>`;
if(p==='Select Date & Time Page')return view.innerHTML=`<div class='card'><input id=d type='date'><select id=t><option>10:00</option><option>11:00</option><option>15:00</option></select><button onclick='saveSlot()'>Save Slot</button></div>`;
if(p==='Appointment Booking Form')return view.innerHTML=`<div class='card'><textarea id=s placeholder='Symptoms'></textarea><button onclick='book()'>Book Appointment</button></div>`;
if(p==='Booking Confirmation Page')return view.innerHTML=`<div class='card'>${state.lastBooking?`Booked ID: ${state.lastBooking.id}`:'No booking yet'}</div>`;
if(p==='My Appointments Page'){if(!state.user)return view.innerHTML='Please login';const a=await api('/api/appointments?userId='+state.user.id);view.innerHTML=a.map(x=>`<div class='card'>${x.date} ${x.time} - ${x.status}</div>`).join('')||'No appointments';return}
if(p==='Admin Dashboard') return view.innerHTML= state.user?.role==='admin' ? `<div class='card'>Admin controls available.</div>`:`Admin only`;
if(p==='Manage Appointments Page'){const a=await api('/api/admin/appointments');view.innerHTML=a.map(x=>`<div class='card'>${x.userId} | ${x.date} ${x.time} | ${x.status}</div>`).join('');return}
view.innerHTML=`<div class='card'>${p} ready. Connect business logic as needed.</div>`;
}
window.signup=async()=>{const r=await api('/api/signup',{method:'POST',body:JSON.stringify({name:n.value,email:e.value,password:pw.value})});if(r.error)alert(r.error);else alert('Signup success');};
window.login=async()=>{const r=await api('/api/login',{method:'POST',body:JSON.stringify({email:e.value,password:pw.value})});if(r.error)alert(r.error);else{localStorage.setItem('user',JSON.stringify(r));location.reload();}};
window.pickDoctor=async(id)=>{const list=await api('/api/doctors');state.selectedDoctor=list.find(x=>x.id===id);alert('Doctor selected');};
window.saveSlot=()=>{state.slot={date:d.value,time:t.value};alert('Slot saved');};
window.book=async()=>{if(!state.user)return alert('Login first');const r=await api('/api/appointments',{method:'POST',body:JSON.stringify({userId:state.user.id,doctorId:state.selectedDoctor?.id,date:state.slot.date,time:state.slot.time,symptoms:s.value})});if(r.error)alert(r.error);else{state.lastBooking=r;alert('Booked');}};
nav();authBar();render('Splash Screen');
