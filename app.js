const root = document.getElementById('root');
const app = document.createElement('div');
app.className = 'container';
app.innerHTML = `
  <header>
    <h1>🎀 冯栩湘减肥专属记录器</h1>
    <img class="avatar" src="avatar.png" alt="avatar">
  </header>
  <div class="card">
    <input type="date" id="date" placeholder="日期">
    <input type="number" id="weight" placeholder="体重 (kg)">
    <input type="number" id="waist" placeholder="腰围 (cm)">
    <input type="number" id="hip" placeholder="臀围 (cm)">
    <input type="number" id="thigh" placeholder="大腿围 (cm)">
    <input type="number" id="exercise" placeholder="运动时间 (分钟)">
    <textarea id="food" rows="2" placeholder="饮食简述 / 热量"></textarea>
    <textarea id="mood" rows="2" placeholder="今日心情"></textarea>
    <button>保存今日记录</button>
  </div>
  <div id="log"></div>
`;
root.appendChild(app);

let log = JSON.parse(localStorage.getItem('trackerLog') || '[]');
const logEl = document.getElementById('log');

const render = () => {
  logEl.innerHTML = '';
  log.forEach(entry => {
    const c = document.createElement('div');
    c.className = 'card';
    c.style.position = 'relative';
    c.innerHTML = `
      <div>📅 ${entry.date}</div>
      <div>⚖️ 体重：${entry.weight} kg</div>
      <div>📏 腰围：${entry.waist} cm</div>
      <div>🍑 臀围：${entry.hip} cm</div>
      <div>🦵 大腿围：${entry.thigh} cm</div>
      <div>🏃‍♀️ 运动时间：${entry.exercise} 分钟</div>
      <div>🍱 饮食：${entry.food}</div>
      <div>🧠 心情：${entry.mood}</div>
    `;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '🗑️';
   deleteBtn.style.cssText = `
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(255,255,255,0.6);
  border: none;
  border-radius: 4px;
  font-size: 20px;
  z-index: 1;
  padding: 4px;
  cursor: pointer;
`;
    deleteBtn.onclick = () => deleteEntry(entry.id);
    c.appendChild(deleteBtn);
    logEl.appendChild(c);
  });
};
render();

app.querySelector('button').addEventListener('click', () => {
  const entry = {
    id: Date.now().toString(),
    date: app.querySelector('#date').value,
    weight: app.querySelector('#weight').value,
    waist: app.querySelector('#waist').value,
    hip: app.querySelector('#hip').value,
    thigh: app.querySelector('#thigh').value,
    exercise: app.querySelector('#exercise').value,
    food: app.querySelector('#food').value,
    mood: app.querySelector('#mood').value,
  };
  if (!entry.date) return alert('请填写日期');
  log.unshift(entry);
  localStorage.setItem('trackerLog', JSON.stringify(log));
  render();
});

window.deleteEntry = function(id) {
  log = log.filter(entry => entry.id !== id);
  localStorage.setItem('trackerLog', JSON.stringify(log));
  render();
};
