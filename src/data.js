// ============================================================================
// DATA MODULE — Liga Bellvillense de Fútbol
// Todos los partidos de Primera A (2025-2026)
// ============================================================================

// --- Team metadata ---
export const TEAMS = {
  'MATIENZO':       { full: 'Club A. Matienzo',          city: 'Morrison',       logo: 'MATIENZO.png' },
  'ARGENTINO MJ':   { full: 'Club A. Argentino',         city: 'Marcos Juárez',  logo: 'ARGENTINO_MJ.png' },
  'BELL':           { full: 'Club A. y B. Bell',         city: 'Bell Ville',     logo: 'BELL.png' },
  'COMPLEJO':       { full: 'Club Complejo Dep.',        city: 'Justiniano Posse', logo: 'COMPLEJO.png' },
  'DEFENSORES SMS': { full: 'Club Defensores',           city: 'San Marcos Sud', logo: 'DEFENSORES_SMS.png' },
  'SAN MARTIN MB':  { full: 'Club A. San Martín',        city: 'Monte Buey',     logo: 'SAN_MARTIN_MB.png' },
  'DEFENSORES SAL': { full: 'Club Defensores',           city: 'Saladillo',      logo: 'DEFENSORES_SAL.png' },
  'ARGENTINO BV':   { full: 'Club A. Argentino',         city: 'Bell Ville',     logo: 'ARGENTINO_BV.png' },
  'SAN CARLOS':     { full: 'Club Atlético San Carlos',  city: 'Noetinger',      logo: 'SAN_CARLOS.png' },
  'SARMIENTO':      { full: 'Club A. Sarmiento',         city: 'Leones',         logo: 'SARMIENTO.png' },
  'RIVER PLATE':    { full: 'Club A. y B. River Plate',  city: 'Bell Ville',     logo: 'RIVER_PLATE.png' },
  'LURO':           { full: 'Club Luro y 30 de Junio',   city: '',               logo: 'LURO.png' },
  // 2025 only
  'LEONES':         { full: 'Club Dep. Leones',          city: 'Leones',         logo: 'LEONES.png' },
  'PROGRESO':       { full: 'Club A. Progreso',          city: 'Noetinger',      logo: 'PROGRESO.png' },
};

// Teams in 2026 Primera A
export const TEAMS_2026 = [
  'MATIENZO', 'ARGENTINO MJ', 'BELL', 'COMPLEJO', 'DEFENSORES SMS',
  'SAN MARTIN MB', 'DEFENSORES SAL', 'ARGENTINO BV', 'SAN CARLOS',
  'SARMIENTO', 'RIVER PLATE', 'LURO'
];

// --- Current General A standings (from official data, 20 PJ) ---
export const GENERAL_A_2026 = [
  { team: 'MATIENZO',       pts: 38, pj: 20, dg:  14 },
  { team: 'ARGENTINO MJ',   pts: 37, pj: 20, dg:  12 },
  { team: 'BELL',           pts: 34, pj: 20, dg:  19 },
  { team: 'COMPLEJO',       pts: 34, pj: 20, dg:   8 },
  { team: 'DEFENSORES SMS', pts: 33, pj: 20, dg:  10 },
  { team: 'SAN MARTIN MB',  pts: 22, pj: 20, dg:  -5 },
  { team: 'DEFENSORES SAL', pts: 21, pj: 20, dg:  -6 },
  { team: 'ARGENTINO BV',   pts: 21, pj: 20, dg:  -6 },
  { team: 'SAN CARLOS',     pts: 21, pj: 20, dg:  -8 },
  { team: 'SARMIENTO',      pts: 20, pj: 20, dg:  -4 },
  { team: 'RIVER PLATE',    pts: 18, pj: 20, dg: -12 },
  { team: 'LURO',           pts: 13, pj: 20, dg: -22 },
];

// --- Remaining fixture (Clausura 2026, dates 9-12) ---
export const REMAINING_FIXTURE = [
  {
    date: 9,
    matches: [
      { home: 'SAN MARTIN MB',  away: 'COMPLEJO' },
      { home: 'SAN CARLOS',     away: 'SARMIENTO' },
      { home: 'ARGENTINO BV',   away: 'BELL' },
      { home: 'ARGENTINO MJ',   away: 'MATIENZO' },
      { home: 'RIVER PLATE',    away: 'DEFENSORES SAL' },
      { home: 'DEFENSORES SMS', away: 'LURO' },
    ]
  },
  {
    date: 10,
    matches: [
      { home: 'LURO',           away: 'SAN MARTIN MB' },
      { home: 'DEFENSORES SAL', away: 'DEFENSORES SMS' },
      { home: 'MATIENZO',       away: 'RIVER PLATE' },
      { home: 'BELL',           away: 'ARGENTINO MJ' },
      { home: 'SARMIENTO',      away: 'ARGENTINO BV' },
      { home: 'COMPLEJO',       away: 'SAN CARLOS' },
    ]
  },
  {
    date: 11,
    matches: [
      { home: 'SAN MARTIN MB',  away: 'SAN CARLOS' },
      { home: 'ARGENTINO BV',   away: 'COMPLEJO' },
      { home: 'ARGENTINO MJ',   away: 'SARMIENTO' },
      { home: 'RIVER PLATE',    away: 'BELL' },
      { home: 'DEFENSORES SMS', away: 'MATIENZO' },
      { home: 'LURO',           away: 'DEFENSORES SAL' },
    ]
  },
  {
    date: 12,
    matches: [
      { home: 'DEFENSORES SAL', away: 'SAN MARTIN MB' },
      { home: 'MATIENZO',       away: 'LURO' },
      { home: 'BELL',           away: 'DEFENSORES SMS' },
      { home: 'SARMIENTO',      away: 'RIVER PLATE' },
      { home: 'COMPLEJO',       away: 'ARGENTINO MJ' },
      { home: 'SAN CARLOS',     away: 'ARGENTINO BV' },
    ]
  }
];

// --- All played matches 2026 (Apertura + Clausura dates 1-8) ---
// Format: { h: home, a: away, hg: homeGoals, ag: awayGoals }
export const APERTURA_2026 = [
  // FECHA 1
  { h:'SAN MARTIN MB',a:'ARGENTINO BV',hg:0,ag:1 },
  { h:'SAN CARLOS',a:'ARGENTINO MJ',hg:2,ag:0 },
  { h:'COMPLEJO',a:'RIVER PLATE',hg:2,ag:0 },
  { h:'SARMIENTO',a:'DEFENSORES SMS',hg:0,ag:0 },
  { h:'BELL',a:'LURO',hg:3,ag:1 },
  { h:'MATIENZO',a:'DEFENSORES SAL',hg:1,ag:0 },
  // FECHA 2
  { h:'MATIENZO',a:'SAN MARTIN MB',hg:0,ag:0 },
  { h:'DEFENSORES SAL',a:'BELL',hg:0,ag:4 },
  { h:'LURO',a:'SARMIENTO',hg:0,ag:3 },
  { h:'DEFENSORES SMS',a:'COMPLEJO',hg:2,ag:2 },
  { h:'RIVER PLATE',a:'SAN CARLOS',hg:1,ag:2 },
  { h:'ARGENTINO MJ',a:'ARGENTINO BV',hg:3,ag:3 },
  // FECHA 3
  { h:'ARGENTINO BV',a:'RIVER PLATE',hg:0,ag:0 },
  { h:'SAN CARLOS',a:'DEFENSORES SMS',hg:0,ag:1 },
  { h:'COMPLEJO',a:'LURO',hg:2,ag:1 },
  { h:'SARMIENTO',a:'DEFENSORES SAL',hg:2,ag:4 },
  { h:'BELL',a:'MATIENZO',hg:0,ag:2 },
  { h:'SAN MARTIN MB',a:'ARGENTINO MJ',hg:2,ag:2 },
  // FECHA 4
  { h:'BELL',a:'SAN MARTIN MB',hg:1,ag:2 },
  { h:'MATIENZO',a:'SARMIENTO',hg:2,ag:2 },
  { h:'DEFENSORES SAL',a:'COMPLEJO',hg:1,ag:1 },
  { h:'LURO',a:'SAN CARLOS',hg:1,ag:1 },
  { h:'DEFENSORES SMS',a:'ARGENTINO BV',hg:2,ag:0 },
  { h:'RIVER PLATE',a:'ARGENTINO MJ',hg:0,ag:3 },
  // FECHA 5
  { h:'SAN MARTIN MB',a:'RIVER PLATE',hg:1,ag:2 },
  { h:'ARGENTINO MJ',a:'DEFENSORES SMS',hg:2,ag:0 },
  { h:'ARGENTINO BV',a:'LURO',hg:2,ag:3 },
  { h:'SAN CARLOS',a:'DEFENSORES SAL',hg:1,ag:1 },
  { h:'COMPLEJO',a:'MATIENZO',hg:2,ag:1 },
  { h:'SARMIENTO',a:'BELL',hg:0,ag:0 },
  // FECHA 6
  { h:'SARMIENTO',a:'SAN MARTIN MB',hg:1,ag:1 },
  { h:'BELL',a:'COMPLEJO',hg:2,ag:0 },
  { h:'MATIENZO',a:'SAN CARLOS',hg:4,ag:1 },
  { h:'DEFENSORES SAL',a:'ARGENTINO BV',hg:0,ag:1 },
  { h:'LURO',a:'ARGENTINO MJ',hg:1,ag:1 },
  { h:'DEFENSORES SMS',a:'RIVER PLATE',hg:3,ag:1 },
  // FECHA 7
  { h:'SAN MARTIN MB',a:'MATIENZO',hg:1,ag:2 },
  { h:'LURO',a:'DEFENSORES SAL',hg:0,ag:0 },
  { h:'RIVER PLATE',a:'COMPLEJO',hg:1,ag:3 },
  { h:'DEFENSORES SMS',a:'SAN CARLOS',hg:2,ag:2 },
  { h:'ARGENTINO MJ',a:'SARMIENTO',hg:3,ag:2 },
  { h:'ARGENTINO BV',a:'BELL',hg:0,ag:0 },
  // FECHA 8
  { h:'SAN MARTIN MB',a:'DEFENSORES SMS',hg:1,ag:1 },
  { h:'RIVER PLATE',a:'LURO',hg:3,ag:1 },
  { h:'ARGENTINO MJ',a:'DEFENSORES SAL',hg:1,ag:0 },
  { h:'ARGENTINO BV',a:'MATIENZO',hg:1,ag:1 },
  { h:'SAN CARLOS',a:'BELL',hg:1,ag:4 },
  { h:'COMPLEJO',a:'SARMIENTO',hg:0,ag:1 },
  // FECHA 9
  { h:'COMPLEJO',a:'SAN MARTIN MB',hg:3,ag:1 },
  { h:'SARMIENTO',a:'SAN CARLOS',hg:2,ag:2 },
  { h:'BELL',a:'ARGENTINO BV',hg:0,ag:1 },
  { h:'MATIENZO',a:'ARGENTINO MJ',hg:0,ag:0 },
  { h:'DEFENSORES SAL',a:'RIVER PLATE',hg:1,ag:2 },
  { h:'LURO',a:'DEFENSORES SMS',hg:2,ag:5 },
  // FECHA 10
  { h:'SAN MARTIN MB',a:'LURO',hg:0,ag:0 },
  { h:'DEFENSORES SMS',a:'DEFENSORES SAL',hg:4,ag:0 },
  { h:'RIVER PLATE',a:'MATIENZO',hg:0,ag:2 },
  { h:'ARGENTINO MJ',a:'BELL',hg:0,ag:0 },
  { h:'ARGENTINO BV',a:'SARMIENTO',hg:1,ag:1 },
  { h:'SAN CARLOS',a:'COMPLEJO',hg:1,ag:1 },
  // FECHA 11
  { h:'SAN CARLOS',a:'SAN MARTIN MB',hg:1,ag:1 },
  { h:'COMPLEJO',a:'ARGENTINO BV',hg:2,ag:1 },
  { h:'SARMIENTO',a:'ARGENTINO MJ',hg:2,ag:2 },
  { h:'BELL',a:'RIVER PLATE',hg:1,ag:1 },
  { h:'MATIENZO',a:'DEFENSORES SMS',hg:2,ag:2 },
  { h:'DEFENSORES SAL',a:'LURO',hg:1,ag:1 },
  // FECHA 12
  { h:'SAN MARTIN MB',a:'DEFENSORES SAL',hg:2,ag:5 },
  { h:'LURO',a:'MATIENZO',hg:0,ag:1 },
  { h:'DEFENSORES SMS',a:'BELL',hg:0,ag:3 },
  { h:'RIVER PLATE',a:'SARMIENTO',hg:1,ag:0 },
  { h:'ARGENTINO MJ',a:'COMPLEJO',hg:2,ag:0 },
  { h:'ARGENTINO BV',a:'SAN CARLOS',hg:0,ag:0 },
];

export const CLAUSURA_2026 = [
  // FECHA 1
  { h:'ARGENTINO BV',a:'SAN MARTIN MB',hg:0,ag:1 },
  { h:'ARGENTINO MJ',a:'SAN CARLOS',hg:0,ag:0 },
  { h:'RIVER PLATE',a:'COMPLEJO',hg:0,ag:1 },
  { h:'DEFENSORES SMS',a:'SARMIENTO',hg:1,ag:0 },
  { h:'LURO',a:'BELL',hg:1,ag:5 },
  { h:'DEFENSORES SAL',a:'MATIENZO',hg:0,ag:1 },
  // FECHA 2
  { h:'SAN MARTIN MB',a:'MATIENZO',hg:1,ag:0 },
  { h:'BELL',a:'DEFENSORES SAL',hg:1,ag:2 },
  { h:'SARMIENTO',a:'LURO',hg:1,ag:0 },
  { h:'COMPLEJO',a:'DEFENSORES SMS',hg:1,ag:1 },
  { h:'SAN CARLOS',a:'RIVER PLATE',hg:2,ag:1 },
  { h:'ARGENTINO BV',a:'ARGENTINO MJ',hg:0,ag:1 },
  // FECHA 3
  { h:'ARGENTINO MJ',a:'SAN MARTIN MB',hg:1,ag:0 },
  { h:'RIVER PLATE',a:'ARGENTINO BV',hg:1,ag:1 },
  { h:'DEFENSORES SMS',a:'SAN CARLOS',hg:1,ag:3 },
  { h:'LURO',a:'COMPLEJO',hg:0,ag:3 },
  { h:'DEFENSORES SAL',a:'SARMIENTO',hg:1,ag:0 },
  { h:'MATIENZO',a:'BELL',hg:0,ag:0 },
  // FECHA 4
  { h:'SAN MARTIN MB',a:'BELL',hg:0,ag:0 },
  { h:'SARMIENTO',a:'MATIENZO',hg:1,ag:2 },
  { h:'COMPLEJO',a:'DEFENSORES SAL',hg:3,ag:3 },
  { h:'SAN CARLOS',a:'LURO',hg:0,ag:1 },
  { h:'ARGENTINO BV',a:'DEFENSORES SMS',hg:0,ag:0 },
  { h:'ARGENTINO MJ',a:'RIVER PLATE',hg:2,ag:2 },
  // FECHA 5
  { h:'RIVER PLATE',a:'SAN MARTIN MB',hg:1,ag:1 },
  { h:'DEFENSORES SMS',a:'ARGENTINO MJ',hg:1,ag:1 },
  { h:'LURO',a:'ARGENTINO BV',hg:0,ag:0 },
  { h:'DEFENSORES SAL',a:'SAN CARLOS',hg:1,ag:1 },
  { h:'MATIENZO',a:'COMPLEJO',hg:1,ag:1 },
  { h:'BELL',a:'SARMIENTO',hg:2,ag:0 },
  // FECHA 6
  { h:'SAN MARTIN MB',a:'SARMIENTO',hg:2,ag:1 },
  { h:'COMPLEJO',a:'BELL',hg:0,ag:0 },
  { h:'SAN CARLOS',a:'MATIENZO',hg:0,ag:2 },
  { h:'ARGENTINO BV',a:'DEFENSORES SAL',hg:1,ag:0 },
  { h:'ARGENTINO MJ',a:'LURO',hg:2,ag:1 },
  { h:'RIVER PLATE',a:'DEFENSORES SMS',hg:1,ag:3 },
  // FECHA 7
  { h:'MATIENZO',a:'SAN MARTIN MB',hg:2,ag:2 },
  { h:'DEFENSORES SAL',a:'LURO',hg:3,ag:0 },
  { h:'COMPLEJO',a:'RIVER PLATE',hg:2,ag:1 },
  { h:'SAN CARLOS',a:'DEFENSORES SMS',hg:0,ag:2 },
  { h:'SARMIENTO',a:'ARGENTINO MJ',hg:1,ag:1 },
  { h:'BELL',a:'ARGENTINO BV',hg:5,ag:3 },
  // FECHA 8
  { h:'DEFENSORES SMS',a:'SAN MARTIN MB',hg:1,ag:1 },
  { h:'LURO',a:'RIVER PLATE',hg:3,ag:3 },
  { h:'DEFENSORES SAL',a:'ARGENTINO MJ',hg:0,ag:2 },
  { h:'MATIENZO',a:'ARGENTINO BV',hg:3,ag:1 },
  { h:'BELL',a:'SAN CARLOS',hg:3,ag:1 },
  { h:'SARMIENTO',a:'COMPLEJO',hg:1,ag:0 },
];

// --- 2025 matches (different teams: LEONES and PROGRESO instead of RIVER PLATE and DEFENSORES SAL) ---
export const APERTURA_2025 = [
  // FECHA 1
  { h:'COMPLEJO',a:'DEFENSORES SMS',hg:3,ag:0 },
  { h:'MATIENZO',a:'LEONES',hg:1,ag:0 },
  { h:'BELL',a:'SAN CARLOS',hg:1,ag:0 },
  { h:'LURO',a:'ARGENTINO MJ',hg:2,ag:0 },
  { h:'PROGRESO',a:'ARGENTINO BV',hg:1,ag:1 },
  { h:'SARMIENTO',a:'SAN MARTIN MB',hg:2,ag:2 },
  // FECHA 2
  { h:'SAN MARTIN MB',a:'COMPLEJO',hg:1,ag:0 },
  { h:'ARGENTINO BV',a:'SARMIENTO',hg:1,ag:1 },
  { h:'LURO',a:'PROGRESO',hg:0,ag:1 },
  { h:'SAN CARLOS',a:'ARGENTINO MJ',hg:3,ag:0 },
  { h:'LEONES',a:'BELL',hg:2,ag:2 },
  { h:'DEFENSORES SMS',a:'MATIENZO',hg:1,ag:0 },
  // FECHA 3
  { h:'COMPLEJO',a:'MATIENZO',hg:4,ag:0 },
  { h:'BELL',a:'DEFENSORES SMS',hg:1,ag:3 },
  { h:'ARGENTINO MJ',a:'LEONES',hg:1,ag:2 },
  { h:'PROGRESO',a:'SAN CARLOS',hg:3,ag:0 },
  { h:'SARMIENTO',a:'LURO',hg:5,ag:0 },
  { h:'SAN MARTIN MB',a:'ARGENTINO BV',hg:1,ag:2 },
  // FECHA 4
  { h:'LURO',a:'SAN MARTIN MB',hg:1,ag:1 },
  { h:'SAN CARLOS',a:'SARMIENTO',hg:2,ag:0 },
  { h:'LEONES',a:'PROGRESO',hg:1,ag:1 },
  { h:'DEFENSORES SMS',a:'ARGENTINO MJ',hg:2,ag:0 },
  { h:'ARGENTINO BV',a:'COMPLEJO',hg:1,ag:1 },
  { h:'MATIENZO',a:'BELL',hg:3,ag:0 },
  // FECHA 5
  { h:'COMPLEJO',a:'BELL',hg:3,ag:1 },
  { h:'ARGENTINO MJ',a:'MATIENZO',hg:1,ag:0 },
  { h:'PROGRESO',a:'DEFENSORES SMS',hg:1,ag:1 },
  { h:'SARMIENTO',a:'LEONES',hg:3,ag:0 },
  { h:'SAN MARTIN MB',a:'SAN CARLOS',hg:3,ag:1 },
  { h:'ARGENTINO BV',a:'LURO',hg:2,ag:0 },
  // FECHA 6
  { h:'LURO',a:'COMPLEJO',hg:2,ag:2 },
  { h:'SAN CARLOS',a:'ARGENTINO BV',hg:1,ag:1 },
  { h:'LEONES',a:'SAN MARTIN MB',hg:1,ag:0 },
  { h:'DEFENSORES SMS',a:'SARMIENTO',hg:0,ag:2 },
  { h:'MATIENZO',a:'PROGRESO',hg:1,ag:0 },
  { h:'BELL',a:'ARGENTINO MJ',hg:0,ag:2 },
  // FECHA 7
  { h:'DEFENSORES SMS',a:'COMPLEJO',hg:2,ag:0 },
  { h:'ARGENTINO BV',a:'BELL',hg:2,ag:1 },
  { h:'SAN MARTIN MB',a:'MATIENZO',hg:1,ag:0 },
  { h:'LEONES',a:'SARMIENTO',hg:1,ag:1 },
  { h:'SAN CARLOS',a:'PROGRESO',hg:2,ag:0 },
  { h:'ARGENTINO MJ',a:'LURO',hg:1,ag:1 },
  // FECHA 8
  { h:'COMPLEJO',a:'ARGENTINO MJ',hg:1,ag:0 },
  { h:'PROGRESO',a:'BELL',hg:4,ag:0 },
  { h:'SARMIENTO',a:'MATIENZO',hg:0,ag:1 },
  { h:'SAN MARTIN MB',a:'DEFENSORES SMS',hg:3,ag:1 },
  { h:'ARGENTINO BV',a:'LEONES',hg:1,ag:1 },
  { h:'LURO',a:'SAN CARLOS',hg:0,ag:2 },
  // FECHA 9
  { h:'SAN CARLOS',a:'COMPLEJO',hg:0,ag:0 },
  { h:'LEONES',a:'LURO',hg:1,ag:3 },
  { h:'DEFENSORES SMS',a:'ARGENTINO BV',hg:0,ag:2 },
  { h:'MATIENZO',a:'SAN MARTIN MB',hg:0,ag:0 },
  { h:'BELL',a:'SARMIENTO',hg:2,ag:2 },
  { h:'ARGENTINO MJ',a:'PROGRESO',hg:3,ag:0 },
  // FECHA 10
  { h:'COMPLEJO',a:'PROGRESO',hg:0,ag:0 },
  { h:'SARMIENTO',a:'ARGENTINO MJ',hg:2,ag:0 },
  { h:'SAN MARTIN MB',a:'BELL',hg:1,ag:1 },
  { h:'ARGENTINO BV',a:'MATIENZO',hg:0,ag:1 },
  { h:'LURO',a:'DEFENSORES SMS',hg:0,ag:0 },
  { h:'SAN CARLOS',a:'LEONES',hg:3,ag:2 },
  // FECHA 11
  { h:'LEONES',a:'COMPLEJO',hg:1,ag:2 },
  { h:'DEFENSORES SMS',a:'SAN CARLOS',hg:0,ag:2 },
  { h:'MATIENZO',a:'LURO',hg:3,ag:0 },
  { h:'BELL',a:'ARGENTINO BV',hg:2,ag:0 },
  { h:'ARGENTINO MJ',a:'SAN MARTIN MB',hg:1,ag:1 },
  { h:'PROGRESO',a:'SARMIENTO',hg:0,ag:2 },
  // FECHA 12
  { h:'COMPLEJO',a:'SARMIENTO',hg:1,ag:1 },
  { h:'SAN MARTIN MB',a:'PROGRESO',hg:2,ag:3 },
  { h:'ARGENTINO BV',a:'ARGENTINO MJ',hg:0,ag:1 },
  { h:'LURO',a:'BELL',hg:1,ag:1 },
  { h:'SAN CARLOS',a:'MATIENZO',hg:1,ag:0 },
  { h:'LEONES',a:'DEFENSORES SMS',hg:0,ag:1 },
];

export const CLAUSURA_2025 = [
  // FECHA 1
  { h:'ARGENTINO MJ',a:'LURO',hg:2,ag:0 },
  { h:'DEFENSORES SMS',a:'COMPLEJO',hg:1,ag:1 },
  { h:'LEONES',a:'MATIENZO',hg:0,ag:1 },
  { h:'SAN MARTIN MB',a:'SARMIENTO',hg:2,ag:0 },
  { h:'SAN CARLOS',a:'BELL',hg:0,ag:0 },
  { h:'ARGENTINO BV',a:'PROGRESO',hg:2,ag:1 },
  // FECHA 2
  { h:'SARMIENTO',a:'ARGENTINO BV',hg:2,ag:1 },
  { h:'ARGENTINO MJ',a:'SAN CARLOS',hg:4,ag:0 },
  { h:'COMPLEJO',a:'SAN MARTIN MB',hg:1,ag:0 },
  { h:'PROGRESO',a:'LURO',hg:0,ag:0 },
  { h:'MATIENZO',a:'DEFENSORES SMS',hg:1,ag:0 },
  { h:'BELL',a:'LEONES',hg:0,ag:0 },
  // FECHA 3
  { h:'LURO',a:'SARMIENTO',hg:2,ag:1 },
  { h:'SAN CARLOS',a:'PROGRESO',hg:1,ag:1 },
  { h:'MATIENZO',a:'COMPLEJO',hg:1,ag:1 },
  { h:'DEFENSORES SMS',a:'BELL',hg:1,ag:1 },
  { h:'LEONES',a:'ARGENTINO MJ',hg:0,ag:2 },
  { h:'ARGENTINO BV',a:'SAN MARTIN MB',hg:0,ag:1 },
  // FECHA 4
  { h:'ARGENTINO MJ',a:'DEFENSORES SMS',hg:0,ag:1 },
  { h:'SARMIENTO',a:'SAN CARLOS',hg:3,ag:1 },
  { h:'BELL',a:'MATIENZO',hg:0,ag:2 },
  { h:'PROGRESO',a:'LEONES',hg:0,ag:0 },
  { h:'SAN MARTIN MB',a:'LURO',hg:1,ag:0 },
  { h:'COMPLEJO',a:'ARGENTINO BV',hg:2,ag:3 },
  // FECHA 5
  { h:'LURO',a:'ARGENTINO BV',hg:3,ag:0 },
  { h:'LEONES',a:'SARMIENTO',hg:1,ag:1 },
  { h:'BELL',a:'COMPLEJO',hg:2,ag:1 },
  { h:'SAN CARLOS',a:'SAN MARTIN MB',hg:1,ag:1 },
  { h:'MATIENZO',a:'ARGENTINO MJ',hg:0,ag:1 },
  { h:'DEFENSORES SMS',a:'PROGRESO',hg:0,ag:1 },
  // FECHA 6
  { h:'SARMIENTO',a:'DEFENSORES SMS',hg:0,ag:2 },
  { h:'COMPLEJO',a:'LURO',hg:0,ag:1 },
  { h:'PROGRESO',a:'MATIENZO',hg:0,ag:2 },
  { h:'SAN MARTIN MB',a:'LEONES',hg:0,ag:0 },
  { h:'ARGENTINO MJ',a:'BELL',hg:3,ag:1 },
  { h:'ARGENTINO BV',a:'SAN CARLOS',hg:0,ag:1 },
  // FECHA 7
  { h:'SARMIENTO',a:'LEONES',hg:2,ag:0 },
  { h:'COMPLEJO',a:'DEFENSORES SMS',hg:0,ag:0 },
  { h:'LURO',a:'ARGENTINO MJ',hg:0,ag:1 },
  { h:'MATIENZO',a:'SAN MARTIN MB',hg:0,ag:0 },
  { h:'BELL',a:'ARGENTINO BV',hg:0,ag:2 },
  { h:'PROGRESO',a:'SAN CARLOS',hg:0,ag:0 },
  // FECHA 8
  { h:'MATIENZO',a:'SARMIENTO',hg:2,ag:1 },
  { h:'ARGENTINO MJ',a:'COMPLEJO',hg:1,ag:0 },
  { h:'SAN CARLOS',a:'LURO',hg:2,ag:1 },
  { h:'DEFENSORES SMS',a:'SAN MARTIN MB',hg:0,ag:1 },
  { h:'LEONES',a:'ARGENTINO BV',hg:0,ag:0 },
  { h:'BELL',a:'PROGRESO',hg:4,ag:1 },
  // FECHA 9
  { h:'LURO',a:'LEONES',hg:0,ag:0 },
  { h:'PROGRESO',a:'ARGENTINO MJ',hg:0,ag:1 },
  { h:'ARGENTINO BV',a:'DEFENSORES SMS',hg:2,ag:1 },
  { h:'SARMIENTO',a:'BELL',hg:0,ag:2 },
  { h:'SAN MARTIN MB',a:'MATIENZO',hg:0,ag:1 },
  { h:'COMPLEJO',a:'SAN CARLOS',hg:2,ag:0 },
  // FECHA 10
  { h:'PROGRESO',a:'COMPLEJO',hg:1,ag:2 },
  { h:'MATIENZO',a:'ARGENTINO BV',hg:0,ag:2 },
  { h:'LEONES',a:'SAN CARLOS',hg:3,ag:0 },
  { h:'DEFENSORES SMS',a:'LURO',hg:1,ag:2 },
  { h:'ARGENTINO MJ',a:'SARMIENTO',hg:0,ag:0 },
  { h:'BELL',a:'SAN MARTIN MB',hg:2,ag:1 },
  // FECHA 11
  { h:'COMPLEJO',a:'LEONES',hg:1,ag:0 },
  { h:'SAN CARLOS',a:'DEFENSORES SMS',hg:3,ag:0 },
  { h:'ARGENTINO BV',a:'BELL',hg:1,ag:3 },
  { h:'SAN MARTIN MB',a:'ARGENTINO MJ',hg:2,ag:1 },
  { h:'SARMIENTO',a:'PROGRESO',hg:1,ag:1 },
  { h:'LURO',a:'MATIENZO',hg:3,ag:2 },
  // FECHA 12
  { h:'MATIENZO',a:'SAN CARLOS',hg:1,ag:0 },
  { h:'SARMIENTO',a:'COMPLEJO',hg:1,ag:1 },
  { h:'BELL',a:'LURO',hg:0,ag:0 },
  { h:'DEFENSORES SMS',a:'LEONES',hg:2,ag:1 },
  { h:'PROGRESO',a:'SAN MARTIN MB',hg:3,ag:2 },
  { h:'ARGENTINO MJ',a:'ARGENTINO BV',hg:2,ag:2 },
];

// --- Helper: calculate base rates from match data ---
export function calculateBaseRates(matchArrays) {
  let homeWins = 0, draws = 0, awayWins = 0, total = 0;
  for (const matches of matchArrays) {
    for (const m of matches) {
      total++;
      if (m.hg > m.ag) homeWins++;
      else if (m.hg === m.ag) draws++;
      else awayWins++;
    }
  }
  return {
    homeWin: homeWins / total,
    draw: draws / total,
    awayWin: awayWins / total,
    total,
    homeWins,
    draws,
    awayWins
  };
}

// --- Helper: calculate team-specific stats ---
export function calculateTeamStats(team, matchArrays) {
  let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;
  let homeWins = 0, homeLosses = 0, homeDraws = 0;
  let awayWins = 0, awayLosses = 0, awayDraws = 0;
  let played = 0;

  for (const matches of matchArrays) {
    for (const m of matches) {
      if (m.h !== team && m.a !== team) continue;
      played++;
      const isHome = m.h === team;
      const teamGoals = isHome ? m.hg : m.ag;
      const oppGoals = isHome ? m.ag : m.hg;
      gf += teamGoals;
      ga += oppGoals;

      if (teamGoals > oppGoals) {
        wins++;
        if (isHome) homeWins++; else awayWins++;
      } else if (teamGoals === oppGoals) {
        draws++;
        if (isHome) homeDraws++; else awayDraws++;
      } else {
        losses++;
        if (isHome) homeLosses++; else awayLosses++;
      }
    }
  }

  return {
    played, wins, draws, losses, gf, ga, gd: gf - ga,
    homeWins, homeDraws, homeLosses,
    awayWins, awayDraws, awayLosses,
    winRate: played > 0 ? wins / played : 0,
    ppg: played > 0 ? (wins * 3 + draws) / played : 0,
  };
}
