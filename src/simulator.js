// ============================================================================
// MONTE CARLO SIMULATOR — Relegation probability engine
// Liga Bellvillense de Fútbol
// ============================================================================

import {
  GENERAL_A_2026, REMAINING_FIXTURE, TEAMS_2026, TEAMS,
  APERTURA_2026, CLAUSURA_2026, APERTURA_2025, CLAUSURA_2025,
  calculateBaseRates, calculateTeamStats
} from './data.js';

// --- Advanced Team Strength Calculator ---
function buildTeamStrengths() {
  const allMatches = [APERTURA_2025, CLAUSURA_2025, APERTURA_2026, CLAUSURA_2026];
  const matches2026 = [APERTURA_2026, CLAUSURA_2026];
  
  const strengths = {};

  for (const team of TEAMS_2026) {
    const stats26 = calculateTeamStats(team, matches2026);
    
    // Form: last 5 matches (from 2026)
    const form = calculateForm(team, matches2026, 5);

    strengths[team] = {
      overall: stats26.played > 0 ? stats26.ppg / 3.0 : 0.33,
      homeStrength: stats26.played > 0
        ? (stats26.homeWins * 3 + stats26.homeDraws) / (Math.max(1, stats26.homeWins + stats26.homeDraws + stats26.homeLosses) * 3)
        : 0.33,
      awayStrength: stats26.played > 0
        ? (stats26.awayWins * 3 + stats26.awayDraws) / (Math.max(1, stats26.awayWins + stats26.awayDraws + stats26.awayLosses) * 3)
        : 0.33,
      form: form, 
      stats: stats26
    };
  }

  return { strengths, allMatches };
}

function calculateForm(team, matchArrays, lastN) {
  const matches = [];
  for (const arr of matchArrays) {
    for (const m of arr) {
      if (m.h === team || m.a === team) matches.push(m);
    }
  }
  const recent = matches.slice(-lastN);
  if (recent.length === 0) return 0.33;
  let pts = 0;
  for (const m of recent) {
    const isHome = m.h === team;
    const tG = isHome ? m.hg : m.ag;
    const oG = isHome ? m.ag : m.hg;
    if (tG > oG) pts += 3;
    else if (tG === oG) pts += 1;
  }
  return pts / (recent.length * 3);
}

function getH2H(teamA, teamB, allMatches) {
  let aWins = 0, bWins = 0, draws = 0;
  for (const arr of allMatches) {
    for (const m of arr) {
      if ((m.h === teamA && m.a === teamB) || (m.h === teamB && m.a === teamA)) {
        const aG = m.h === teamA ? m.hg : m.ag;
        const bG = m.h === teamB ? m.hg : m.ag;
        if (aG > bG) aWins++;
        else if (bG > aG) bWins++;
        else draws++;
      }
    }
  }
  const total = aWins + bWins + draws;
  if (total === 0) return { aWinPct: 0.33, bWinPct: 0.33, drawPct: 0.34, total: 0 };
  return {
    aWinPct: aWins / total,
    bWinPct: bWins / total,
    drawPct: draws / total,
    total
  };
}

// --- Advanced Match Outcome Probability Calculator ---
function predictMatch(homeTeam, awayTeam, strengthsData, baseRates) {
  const { strengths, allMatches } = strengthsData;
  const homeStr = strengths[homeTeam];
  const awayStr = strengths[awayTeam];

  if (!homeStr || !awayStr) return { homeWin: 0.33, draw: 0.34, awayWin: 0.33 };

  // 1. Base Power (General performance + specific Home/Away performance + Form)
  // Localía es importantísima: pesa 50% de la fuerza base.
  const homePower = (homeStr.homeStrength * 0.5 + homeStr.overall * 0.3 + homeStr.form * 0.2);
  const awayPower = (awayStr.awayStrength * 0.5 + awayStr.overall * 0.3 + awayStr.form * 0.2);

  // 2. Head-to-Head (H2H) Factor (Partidos entre sí)
  const h2h = getH2H(homeTeam, awayTeam, allMatches);
  let h2hHomeMod = 0;
  let h2hAwayMod = 0;
  if (h2h.total >= 1) { // Si jugaron al menos una vez, consideramos el H2H
    h2hHomeMod = (h2h.aWinPct - 0.33) * 0.20; 
    h2hAwayMod = (h2h.bWinPct - 0.33) * 0.20;
  }

  // Differential determines shift from base rates
  const diff = homePower - awayPower;

  // Adjust base rates based on strength differential and H2H
  let homeAdj = baseRates.homeWin + (diff * 0.45) + h2hHomeMod;
  let awayAdj = baseRates.awayWin - (diff * 0.45) + h2hAwayMod;
  
  // Dynamic draw probability (more likely if teams are evenly matched)
  let drawAdj = baseRates.draw + (0.1 - Math.abs(diff) * 0.15) - (h2hHomeMod + h2hAwayMod) * 0.5;

  // Clamp probabilities to realistic bounds para fútbol
  homeAdj = Math.max(0.15, Math.min(0.85, homeAdj));
  awayAdj = Math.max(0.10, Math.min(0.75, awayAdj));
  drawAdj = Math.max(0.15, Math.min(0.40, drawAdj));

  const sum = homeAdj + drawAdj + awayAdj;

  return {
    homeWin: homeAdj / sum,
    draw: drawAdj / sum,
    awayWin: awayAdj / sum,
  };
}

// --- Simulate a single match result ---
function simulateMatch(prob) {
  const r = Math.random();
  if (r < prob.homeWin) return 'home';
  if (r < prob.homeWin + prob.draw) return 'draw';
  return 'away';
}

// --- Generate random goal difference for a result ---
function randomGoalDiff(result) {
  if (result === 'draw') return 0;
  // Most wins are by 1-2 goals in this league
  const r = Math.random();
  if (r < 0.55) return 1;
  if (r < 0.80) return 2;
  if (r < 0.93) return 3;
  return 4;
}

// --- Run full Monte Carlo simulation ---
export function runSimulation(iterations = 50000, lockedResults = {}) {
  const strengthsData = buildTeamStrengths();
  const baseRates = calculateBaseRates([APERTURA_2026, CLAUSURA_2026]);

  // Track descenso count per team
  const descensoCount = {};
  const positionCounts = {};  // team -> [count at pos 1, pos 2, ..., pos 12]

  for (const team of TEAMS_2026) {
    descensoCount[team] = 0;
    positionCounts[team] = new Array(12).fill(0);
  }

  // Pre-calculate match probabilities for each remaining match
  const matchProbs = [];
  for (const dateObj of REMAINING_FIXTURE) {
    for (const match of dateObj.matches) {
      const key = `${dateObj.date}-${match.home}-${match.away}`;
      const prob = predictMatch(match.home, match.away, strengthsData, baseRates);
      matchProbs.push({ ...match, date: dateObj.date, prob, key });
    }
  }

  // Run iterations
  for (let i = 0; i < iterations; i++) {
    // Clone current standings
    const standings = {};
    for (const entry of GENERAL_A_2026) {
      standings[entry.team] = { pts: entry.pts, dg: entry.dg, pj: entry.pj };
    }

    // Simulate each remaining match
    for (const match of matchProbs) {
      const key = match.key;

      let result;
      let goalDiff;

      if (lockedResults[key]) {
        // User locked this match result
        result = lockedResults[key].result;
        goalDiff = lockedResults[key].goalDiff || randomGoalDiff(result);
      } else {
        result = simulateMatch(match.prob);
        goalDiff = randomGoalDiff(result);
      }

      // Update standings
      standings[match.home].pj += 1;
      standings[match.away].pj += 1;

      if (result === 'home') {
        standings[match.home].pts += 3;
        standings[match.home].dg += goalDiff;
        standings[match.away].dg -= goalDiff;
      } else if (result === 'away') {
        standings[match.away].pts += 3;
        standings[match.away].dg += goalDiff;
        standings[match.home].dg -= goalDiff;
      } else {
        standings[match.home].pts += 1;
        standings[match.away].pts += 1;
      }
    }

    // Sort by points, then goal difference
    const sorted = TEAMS_2026
      .map(t => ({ team: t, ...standings[t] }))
      .sort((a, b) => b.pts !== a.pts ? b.pts - a.pts : b.dg - a.dg);

    // Record positions
    sorted.forEach((entry, idx) => {
      positionCounts[entry.team][idx]++;
      if (idx >= 10) { // positions 11 and 12 = descenso
        descensoCount[entry.team]++;
      }
    });
  }

  // Calculate probabilities
  const results = TEAMS_2026.map(team => ({
    team,
    descensoPct: (descensoCount[team] / iterations) * 100,
    positions: positionCounts[team].map(c => ((c / iterations) * 100)),
    avgPosition: positionCounts[team].reduce((sum, count, idx) => sum + count * (idx + 1), 0) / iterations,
  }));

  // Sort by descenso probability (highest first)
  results.sort((a, b) => b.descensoPct - a.descensoPct);

  return {
    results,
    iterations,
    baseRates,
    matchProbs: matchProbs.map(m => ({
      date: m.date,
      home: m.home,
      away: m.away,
      key: m.key,
      prob: m.prob
    })),
    strengths: strengthsData.strengths
  };
}

// --- Classify team status ---
export function classifyTeams(standings) {
  const maxRemaining = 4 * 3; // 4 matches × 3 points

  return standings.map((team, idx) => {
    const maxPossible = team.pts + maxRemaining;
    // A team is "saved" if even all teams below can't overtake them
    // More precisely: count how many teams could potentially finish below them
    const teamsBelow = standings.filter(t =>
      t.team !== team.team && (t.pts + maxRemaining) < team.pts
    ).length;

    const teamsThatCouldPassMe = standings.filter(t =>
      t.team !== team.team && t.pts > team.pts + maxRemaining
    ).length;

    let status;
    if (idx <= 4 && teamsBelow >= 2) {
      status = 'saved';
    } else if (idx >= 10) {
      status = 'descenso';
    } else if (idx >= 8) {
      status = 'danger';
    } else {
      status = 'safe';
    }

    return {
      ...team,
      pos: idx + 1,
      maxPossible,
      status,
      logo: TEAMS[team.team]?.logo || ''
    };
  });
}

// --- Get detailed analysis for a specific team ---
export function analyzeTeam(teamName) {
  const standing = GENERAL_A_2026.find(t => t.team === teamName);
  if (!standing) return null;

  const maxRemaining = 4 * 3;
  const maxPossible = standing.pts + maxRemaining;
  const stats2026 = calculateTeamStats(teamName, [APERTURA_2026, CLAUSURA_2026]);

  // Find remaining opponents
  const remainingOpponents = [];
  for (const dateObj of REMAINING_FIXTURE) {
    for (const match of dateObj.matches) {
      if (match.home === teamName || match.away === teamName) {
        const opp = match.home === teamName ? match.away : match.home;
        const isHome = match.home === teamName;
        const oppStanding = GENERAL_A_2026.find(t => t.team === opp);
        remainingOpponents.push({
          date: dateObj.date,
          opponent: opp,
          isHome,
          oppPts: oppStanding?.pts || 0,
          oppPos: GENERAL_A_2026.indexOf(oppStanding) + 1,
        });
      }
    }
  }

  return {
    team: teamName,
    pts: standing.pts,
    pj: standing.pj,
    dg: standing.dg,
    maxPossible,
    stats2026,
    remainingOpponents,
    ptsNeeded: null, // will be calculated after simulation
  };
}
