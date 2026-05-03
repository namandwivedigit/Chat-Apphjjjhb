import http from 'http';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';

const PORT = 3000;
const DB_PATH = './data/db.json';
const PUBLIC_DIR = './public';

const readDb = () => JSON.parse(readFileSync(DB_PATH, 'utf8'));
const writeDb = (db) => writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

const send = (res, status, data, type='application/json') => {
  res.writeHead(status, { 'Content-Type': type });
  res.end(type === 'application/json' ? JSON.stringify(data) : data);
};

const parseBody = (req) => new Promise((resolve) => {
  let b=''; req.on('data', c => b += c); req.on('end', () => resolve(b ? JSON.parse(b) : {}));
});

const serveStatic = (url, res) => {
  const p = url === '/' ? '/index.html' : url;
  const filePath = join(PUBLIC_DIR, p);
  if (!existsSync(filePath)) return false;
  const map = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript' };
  send(res, 200, readFileSync(filePath), map[extname(filePath)] || 'text/plain');
  return true;
};

const server = http.createServer(async (req,res) => {
  if (req.url.startsWith('/api/signup') && req.method==='POST') {
    const body = await parseBody(req); const db = readDb();
    if (db.users.some(u => u.email===body.email)) return send(res,400,{error:'Email exists'});
    const user = { id: randomUUID(), name: body.name, email: body.email, password: body.password, role:'user' };
    db.users.push(user); writeDb(db); return send(res,201,{id:user.id,name:user.name,email:user.email,role:user.role});
  }
  if (req.url.startsWith('/api/login') && req.method==='POST') {
    const body=await parseBody(req); const db=readDb();
    const user=db.users.find(u=>u.email===body.email && u.password===body.password);
    if(!user) return send(res,401,{error:'Invalid credentials'});
    return send(res,200,{id:user.id,name:user.name,email:user.email,role:user.role});
  }
  if (req.url==='/api/doctors' && req.method==='GET') return send(res,200,readDb().doctors);
  if (req.url==='/api/appointments' && req.method==='POST') {
    const body=await parseBody(req); const db=readDb();
    const appt={id:randomUUID(),...body,status:'Booked',createdAt:new Date().toISOString()};
    db.appointments.push(appt);
    db.notifications.push({id:randomUUID(),userId:body.userId,message:`Appointment booked for ${body.date} ${body.time}`});
    writeDb(db); return send(res,201,appt);
  }
  if (req.url.startsWith('/api/appointments?') && req.method==='GET') {
    const userId = new URL(req.url, `http://localhost:${PORT}`).searchParams.get('userId');
    return send(res,200,readDb().appointments.filter(a=>a.userId===userId));
  }
  if (req.url==='/api/admin/appointments' && req.method==='GET') return send(res,200,readDb().appointments);

  if (serveStatic(req.url, res)) return;
  send(res,404,{error:'Not found'});
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
