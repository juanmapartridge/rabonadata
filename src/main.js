// ============================================================================
// MAIN APP — La Rabona Data
// ============================================================================

import './style.css';
import {
  GENERAL_A_2026, REMAINING_FIXTURE, TEAMS, TEAMS_2026,
  APERTURA_2026, CLAUSURA_2026, APERTURA_2025, CLAUSURA_2025
} from './data.js';
import { runSimulation, classifyTeams, analyzeTeam } from './simulator.js';

// ---- State ----
let lockedResults = {};
let currentSimResults = null;

// Datasets mapping
const DATASETS = {
  'CLAUSURA_2026': CLAUSURA_2026,
  'APERTURA_2026': APERTURA_2026,
  'CLAUSURA_2025': CLAUSURA_2025,
  'APERTURA_2025': APERTURA_2025
};

// ---- Logo path helper ----
function logoPath(team) {
  const meta = TEAMS[team];
  if (!meta?.logo) return '';
  return `/logos/${meta.logo}`;
}

// ---- Initialize ----
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  
  // Tab 1: Simulator
  renderGeneralTable();
  renderFixtureSimulator();
  runAndDisplay();
  
  document.getElementById('btn-resimulate').addEventListener('click', runAndDisplay);
  document.getElementById('btn-reset-sim').addEventListener('click', resetSimulation);

  // Tab 2: Analysis
  setupAnalysisView();
});

// ============================================================================
// TAB NAVIGATION
// ============================================================================
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const views = document.querySelectorAll('.view-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.style.display = 'none');
      views.forEach(v => v.classList.remove('active'));

      // Activate target
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetView = document.getElementById(targetId);
      targetView.style.display = 'block';
      
      // trigger reflow then opacity
      setTimeout(() => targetView.classList.add('active'), 10);
    });
  });
}

// ============================================================================
// TAB 1: SIMULATOR
// ============================================================================
function runAndDisplay() {
  const statusEl = document.getElementById('sim-status');
  const dotEl = document.getElementById('sim-indicator');
  statusEl.textContent = 'Calculando...';
  dotEl.classList.add('busy');

  setTimeout(() => {
    const startTime = performance.now();
    currentSimResults = runSimulation(50000, lockedResults);
    const elapsed = Math.round(performance.now() - startTime);

    statusEl.textContent = `Actualizado (${elapsed}ms)`;
    dotEl.classList.remove('busy');

    renderProbabilityBars(currentSimResults);
    renderInsights(currentSimResults);
    updateTableWithProbabilities(currentSimResults);
  }, 10);
}

function resetSimulation() {
  lockedResults = {};
  document.querySelectorAll('.btn-opt').forEach(btn => {
    btn.classList.remove('sel-home', 'sel-draw', 'sel-away');
  });
  runAndDisplay();
}

// --- Render Table ---
function renderGeneralTable() {
  const classified = classifyTeams(GENERAL_A_2026);
  const container = document.getElementById('general-table');

  let html = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="col-pos">#</th>
            <th>EQUIPO</th>
            <th class="col-num">PTS</th>
            <th class="col-num">PJ</th>
            <th class="col-num">DG</th>
          </tr>
        </thead>
        <tbody>`;

  classified.forEach(team => {
    const dgClass = team.dg > 0 ? 'dg-pos' : (team.dg < 0 ? 'dg-neg' : '');
    
    html += `
      <tr class="" data-team="${team.team}">
        <td class="col-pos">${team.pos}</td>
        <td>
          <div class="col-team">
            <img class="team-logo" src="${logoPath(team.team)}" alt="" onerror="this.style.display='none'">
            <span class="team-name">${team.team}</span>
          </div>
        </td>
        <td class="col-num val-pts">${team.pts}</td>
        <td class="col-num">${team.pj}</td>
        <td class="col-num ${dgClass}">${team.dg > 0 ? '+'+team.dg : team.dg}</td>
      </tr>`;
  });

  html += '</tbody></table></div>';
  container.innerHTML = html;
}

function updateTableWithProbabilities(simResults) {
  if (!simResults) return;
  const rows = document.querySelectorAll('#general-table tbody tr');
  rows.forEach(row => {
    const team = row.getAttribute('data-team');
    const result = simResults.results.find(r => r.team === team);
    if (!result) return;

    row.className = '';
    if (result.descensoPct > 50) row.classList.add('row-desc');
    else if (result.descensoPct < 0.1) {
      const pos = GENERAL_A_2026.findIndex(t => t.team === team) + 1;
      if (pos === 1) row.classList.add('row-champ');
    }
  });
}

// --- Render Probabilities ---
function renderProbabilityBars(simResults) {
  const container = document.getElementById('probability-bars');
  if (!simResults) return;

  const sorted = [...simResults.results].sort((a, b) => b.descensoPct - a.descensoPct);

  let html = '';
  sorted.forEach(result => {
    const pct = result.descensoPct;
    let riskClass = 'risk-none';
    if (pct > 50) riskClass = 'risk-high';
    else if (pct > 15) riskClass = 'risk-med';
    else if (pct > 1) riskClass = 'risk-low';

    const displayPct = pct < 0.1 ? '<0.1%' : pct.toFixed(1) + '%';

    html += `
      <div class="prob-item ${riskClass}">
        <div class="prob-team">
          <img src="${logoPath(result.team)}" onerror="this.style.display='none'">
          <span>${result.team}</span>
        </div>
        <div class="prob-track">
          <div class="prob-fill" style="width: ${Math.max(pct, 0.5)}%"></div>
        </div>
        <span class="prob-val">${displayPct}</span>
      </div>`;
  });

  container.innerHTML = html;
}

// --- Render Fixture ---
function renderFixtureSimulator() {
  const container = document.getElementById('fixture-simulator');
  let html = '';

  REMAINING_FIXTURE.forEach((dateObj, idx) => {
    html += `
      <div class="sim-date ${idx !== 0 ? 'collapsed' : ''}">
        <div class="sim-date-head">FECHA ${dateObj.date}</div>
        <div class="sim-matches">`;

    dateObj.matches.forEach(match => {
      const key = `${dateObj.date}-${match.home}-${match.away}`;
      html += `
          <div class="match-row">
            <div class="m-team">
              <img src="${logoPath(match.home)}" onerror="this.style.display='none'">
              <span>${match.home}</span>
            </div>
            <div class="m-opts">
              <button class="btn-opt" data-res="home" data-key="${key}">L</button>
              <button class="btn-opt" data-res="draw" data-key="${key}">E</button>
              <button class="btn-opt" data-res="away" data-key="${key}">V</button>
            </div>
            <div class="m-team away">
              <img src="${logoPath(match.away)}" onerror="this.style.display='none'">
              <span>${match.away}</span>
            </div>
          </div>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;

  container.querySelectorAll('.sim-date-head').forEach(el => {
    el.addEventListener('click', () => el.parentElement.classList.toggle('collapsed'));
  });

  container.querySelectorAll('.btn-opt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const b = e.currentTarget;
      const key = b.getAttribute('data-key');
      const res = b.getAttribute('data-res');
      const row = b.closest('.match-row');
      
      const wasSel = b.classList.contains('sel-home') || b.classList.contains('sel-draw') || b.classList.contains('sel-away');
      row.querySelectorAll('.btn-opt').forEach(x => x.classList.remove('sel-home', 'sel-draw', 'sel-away'));

      if (wasSel) {
        delete lockedResults[key];
      } else {
        b.classList.add(`sel-${res}`);
        lockedResults[key] = { result: res, goalDiff: res === 'draw' ? 0 : 1 };
      }
      runAndDisplay();
    });
  });
}

// --- Render Insights ---
function renderInsights(simResults) {
  const container = document.getElementById('insights-content');
  const results = simResults.results;
  const insights = [];

  const saved = results.filter(r => r.descensoPct < 0.1);
  if (saved.length > 0) {
    insights.push({ type: 'safe', icon: '✓', title: `${saved.length} Equipos Salvados`, text: `Matemáticamente fuera de riesgo.` });
  }

  const danger = results.filter(r => r.descensoPct > 50).sort((a,b) => b.descensoPct - a.descensoPct);
  danger.forEach(team => {
    insights.push({ type: 'danger', icon: '!', title: `${team.team} (${team.descensoPct.toFixed(1)}%)`, text: `Altísima probabilidad de perder la categoría.` });
  });

  const locked = Object.keys(lockedResults).length;
  if(locked > 0) {
     insights.push({ type: '', icon: '⚙', title: `Simulación Personalizada`, text: `${locked} resultados manuales aplicados.` });
  }

  let html = '';
  insights.forEach(i => {
    html += `
      <div class="insight-box i-${i.type}">
        <div class="insight-icon">${i.icon}</div>
        <div class="insight-body">
          <h4>${i.title}</h4>
          <p>${i.text}</p>
        </div>
      </div>`;
  });
  container.innerHTML = html;
}

// ============================================================================
// TAB 2: TOURNAMENT ANALYSIS
// ============================================================================
function chunkMatches(flatMatches) {
  // Every 6 matches is a "Fecha" (since there are 12 teams)
  const fechas = [];
  for(let i = 0; i < flatMatches.length; i += 6) {
    fechas.push(flatMatches.slice(i, i + 6));
  }
  return fechas;
}

function setupAnalysisView() {
  const selTour = document.getElementById('select-tournament');
  const selMatchday = document.getElementById('select-matchday');
  const btnAll = document.getElementById('btn-analyze-all');

  function updateMatchdays() {
    const tKey = selTour.value;
    const matches = DATASETS[tKey];
    const fechas = chunkMatches(matches);
    
    let html = '';
    fechas.forEach((_, idx) => {
      html += `<option value="${idx}">Fecha ${idx + 1}</option>`;
    });
    selMatchday.innerHTML = html;
    
    // Default to last played date
    selMatchday.value = fechas.length - 1;
    analyzeMatchData(fechas[fechas.length - 1], `Fecha ${fechas.length}`);
  }

  selTour.addEventListener('change', updateMatchdays);
  
  selMatchday.addEventListener('change', () => {
    const fechas = chunkMatches(DATASETS[selTour.value]);
    const idx = parseInt(selMatchday.value);
    analyzeMatchData(fechas[idx], `Fecha ${idx + 1}`);
  });

  btnAll.addEventListener('click', () => {
    analyzeMatchData(DATASETS[selTour.value], `Total del Torneo`);
  });

  // Init
  updateMatchdays();
}

function analyzeMatchData(matches, labelContext) {
  let homeWins = 0, awayWins = 0, draws = 0;
  let homeGoals = 0, awayGoals = 0;

  matches.forEach(m => {
    homeGoals += m.hg;
    awayGoals += m.ag;
    if (m.hg > m.ag) homeWins++;
    else if (m.ag > m.hg) awayWins++;
    else draws++;
  });

  const totalMatches = matches.length;
  const totalGoals = homeGoals + awayGoals;
  const avgGoals = totalMatches > 0 ? (totalGoals / totalMatches).toFixed(1) : 0;

  // Render Stats Top Bar
  document.getElementById('analysis-stats').innerHTML = `
    <div class="data-card">
      <div class="val">${totalMatches}</div>
      <div class="lbl">Partidos Jugados</div>
    </div>
    <div class="data-card highlight">
      <div class="val">${totalGoals}</div>
      <div class="lbl">Goles Totales</div>
    </div>
    <div class="data-card">
      <div class="val">${avgGoals}</div>
      <div class="lbl">Promedio Gol</div>
    </div>
    <div class="data-card">
      <div class="val">${homeWins}</div>
      <div class="lbl">Triunfos Locales</div>
    </div>
  `;

  // Render Chart
  document.getElementById('analysis-chart-title').textContent = `RESULTADOS: ${labelContext.toUpperCase()}`;
  
  const hwPct = totalMatches ? Math.round((homeWins/totalMatches)*100) : 0;
  const dPct = totalMatches ? Math.round((draws/totalMatches)*100) : 0;
  const awPct = totalMatches ? Math.round((awayWins/totalMatches)*100) : 0;

  document.getElementById('analysis-chart').innerHTML = `
    <div class="chart-row">
      <div class="chart-lbl">LOCAL (${hwPct}%)</div>
      <div class="chart-bar-wrap">
        <div class="chart-bar c-local" style="width: ${Math.max(hwPct, 5)}%">${homeWins}</div>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-lbl">EMPATE (${dPct}%)</div>
      <div class="chart-bar-wrap">
        <div class="chart-bar c-empate" style="width: ${Math.max(dPct, 5)}%">${draws}</div>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-lbl">VISITANTE (${awPct}%)</div>
      <div class="chart-bar-wrap">
        <div class="chart-bar c-visit" style="width: ${Math.max(awPct, 5)}%">${awayWins}</div>
      </div>
    </div>
  `;

  // Render Matches List
  document.getElementById('analysis-matches-title').textContent = `DETALLE DE PARTIDOS (${labelContext})`;
  let matchesHtml = '';
  matches.forEach(m => {
    matchesHtml += `
      <div class="al-match">
        <div class="al-team">
          <img src="${logoPath(m.h)}" onerror="this.style.display='none'">
          <span>${m.h}</span>
        </div>
        <div class="al-score">${m.hg} - ${m.ag}</div>
        <div class="al-team away">
          <img src="${logoPath(m.a)}" onerror="this.style.display='none'">
          <span>${m.a}</span>
        </div>
      </div>
    `;
  });
  document.getElementById('analysis-matches').innerHTML = matchesHtml;
}
