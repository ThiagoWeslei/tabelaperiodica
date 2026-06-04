let fontScale = 1.2;
const MIN_SCALE = 0.8, MAX_SCALE = 2.5, STEP = 0.1;

function aplicarEscala(val) {
  fontScale = Math.round(val * 10) / 10;
  document.documentElement.style.setProperty('--font-scale', fontScale);
  document.getElementById('scaleLabel').textContent = Math.round(fontScale * 100) + '%';
}

const btnTheme     = document.getElementById('btnTheme');
const btnContrast  = document.getElementById('btnContrast');
const btnFontUp    = document.getElementById('btnFontUp');
const btnFontDown  = document.getElementById('btnFontDown');

btnTheme.addEventListener('click', () => {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  document.documentElement.setAttribute('data-theme', isLight ? '' : 'light');
  btnTheme.setAttribute('aria-pressed', String(!isLight));
  btnTheme.textContent = isLight ? '🌙 Escuro' : '☀️ Claro';
  anunciar(isLight ? 'Modo escuro ativado' : 'Modo claro ativado');
});

btnContrast.addEventListener('click', () => {
  const isHigh = document.documentElement.getAttribute('data-contrast') === 'high';
  document.documentElement.setAttribute('data-contrast', isHigh ? '' : 'high');
  btnContrast.setAttribute('aria-pressed', String(!isHigh));
  anunciar(isHigh ? 'Alto contraste desativado' : 'Alto contraste ativado');
});

btnFontUp.addEventListener('click', () => {
  if (fontScale < MAX_SCALE) { aplicarEscala(fontScale + STEP); anunciar(`Fonte: ${Math.round(fontScale*100)}%`); }
});
btnFontDown.addEventListener('click', () => {
  if (fontScale > MIN_SCALE) { aplicarEscala(fontScale - STEP); anunciar(`Fonte: ${Math.round(fontScale*100)}%`); }
});

if (window.matchMedia && window.matchMedia('(prefers-color-scheme:light)').matches) {
  document.documentElement.setAttribute('data-theme', 'light');
  btnTheme.textContent = '☀️ Claro';
  btnTheme.setAttribute('aria-pressed', 'true');
}
if (window.matchMedia && window.matchMedia('(forced-colors: active)').matches) {
  document.documentElement.setAttribute('data-contrast', 'high');
  btnContrast.setAttribute('aria-pressed', 'true');
}

function anunciar(msg) {
  const lr = document.getElementById('live-region');
  lr.textContent = '';
  setTimeout(() => { lr.textContent = msg; }, 50);
}
const ESTADO = {
  1:'G',2:'G',3:'S',4:'S',5:'S',6:'S',7:'G',8:'G',9:'G',10:'G',
  11:'S',12:'S',13:'S',14:'S',15:'S',16:'S',17:'G',18:'G',
  19:'S',20:'S',21:'S',22:'S',23:'S',24:'S',25:'S',26:'S',27:'S',28:'S',29:'S',30:'S',
  31:'S',32:'S',33:'S',34:'S',35:'L',36:'G',
  37:'S',38:'S',39:'S',40:'S',41:'S',42:'S',43:'S',44:'S',45:'S',46:'S',47:'S',48:'S',
  49:'S',50:'S',51:'S',52:'S',53:'S',54:'G',
  55:'S',56:'S',57:'S',58:'S',59:'S',60:'S',61:'S',62:'S',63:'S',64:'S',65:'S',66:'S',
  67:'S',68:'S',69:'S',70:'S',71:'S',72:'S',73:'S',74:'S',75:'S',76:'S',77:'S',78:'S',
  79:'S',80:'L',81:'S',82:'S',83:'S',84:'S',85:'S',86:'G',
  87:'S',88:'S',89:'S',90:'S',91:'S',92:'S',93:'S',94:'S',95:'S',96:'S',97:'S',98:'S',
  99:'S',100:'S',101:'S',102:'S',103:'S',
  104:'?',105:'?',106:'?',107:'?',108:'?',109:'?',110:'?',111:'?',112:'?',113:'?',
  114:'?',115:'?',116:'?',117:'?',118:'?'
};
const ESTADO_LABEL = { S:'Sólido', L:'Líquido', G:'Gasoso', '?':'Desconhecido' };
const ESTADO_DESC  = {
  S:'Sólido a 25 °C e 1 atm (IUPAC).',
  L:'Líquido a 25 °C e 1 atm (IUPAC).',
  G:'Gasoso a 25 °C e 1 atm (IUPAC).',
  '?':'Estado não confirmado — elemento sintético ultrapesado.'
};
const ESTADO_DOT = { S:'🧊', L:'💧', G:'💨', '?':'🌀' };
const ESTADO_HEX_DARK  = { S:'#5aabff', L:'#ff6e6e', G:'#7df5b8', '?':'#bbbbbb' };
const ESTADO_HEX_LIGHT = { S:'#005fa3', L:'#b00020', G:'#006b40', '?':'#5a5a5a' };
function getEstadoHex(est){
  const isLight = document.documentElement.getAttribute('data-theme')==='light';
  return (isLight ? ESTADO_HEX_LIGHT : ESTADO_HEX_DARK)[est] || '#888';
}
const ESTADO_HEX = ESTADO_HEX_DARK;

const MASSA = {
  1:'1,008',2:'4,0026',3:'6,938',4:'9,0122',5:'10,81',6:'12,011',7:'14,007',8:'15,999',
  9:'18,998',10:'20,180',11:'22,990',12:'24,305',13:'26,982',14:'28,085',15:'30,974',
  16:'32,06',17:'35,45',18:'[39,792; 39,963]',19:'39,098',20:'40,078',21:'44,956',
  22:'47,867',23:'50,942',24:'51,996',25:'54,938',26:'55,845',27:'58,933',28:'58,693',
  29:'63,546',30:'65,38',31:'69,723',32:'72,630',33:'74,922',34:'78,971',35:'79,904',
  36:'83,798',37:'85,468',38:'87,62',39:'88,906',40:'91,224',41:'92,906',42:'95,95',
  43:'[97]',44:'101,07',45:'102,91',46:'106,42',47:'107,87',48:'112,41',49:'114,82',
  50:'118,71',51:'121,76',52:'127,60',53:'126,90',54:'131,29',55:'132,91',56:'137,33',
  57:'138,91',58:'140,12',59:'140,91',60:'144,24',61:'[145]',62:'150,36',63:'151,96',
  64:'157,25',65:'158,93',66:'162,50',67:'164,93',68:'167,26',69:'168,93',70:'173,05',
  71:'174,97',72:'178,49',73:'180,95',74:'183,84',75:'186,21',76:'190,23',77:'192,22',
  78:'195,08',79:'196,97',80:'200,59',81:'204,38',82:'[206,14; 207,94]',83:'208,98',
  84:'[209]',85:'[210]',86:'[222]',87:'[223]',88:'[226]',89:'[227]',90:'232,04',
  91:'231,04',92:'238,03',93:'[237]',94:'[244]',95:'[243]',96:'[247]',97:'[247]',
  98:'[251]',99:'[252]',100:'[257]',101:'[258]',102:'[259]',103:'[266]',104:'[267]',
  105:'[268]',106:'[269]',107:'[270]',108:'[269]',109:'[278]',110:'[281]',111:'[282]',
  112:'[285]',113:'[286]',114:'[289]',115:'[290]',116:'[293]',117:'[294]',118:'[294]'
};
const FAMILIA = {
  1:'1 (IA)',2:'2 (IIA)',3:'3 (IIIB)',4:'4 (IVB)',5:'5 (VB)',6:'6 (VIB)',
  7:'7 (VIIB)',8:'8 (VIII)',9:'9 (VIII)',10:'10 (VIII)',11:'11 (IB)',12:'12 (IIB)',
  13:'13 (IIIA)',14:'14 (IVA)',15:'15 (VA)',16:'16 (VIA)',17:'17 (VIIA)',18:'18 (0)'
};
const CAT_COLOR_VAR = {
  'Metal alcalino':        'var(--cat-alcalino)',
  'Metal alcalino-terroso':'var(--cat-alcalino-t)',
  'Lantanídeo':            'var(--cat-lantanideo)',
  'Actinídeo':             'var(--cat-actinideo)',
  'Metal de transição':    'var(--cat-transicao)',
  'Metal representativo':  'var(--cat-representat)',
  'Semimetal':             'var(--cat-semimetal)',
  'Não-metal':             'var(--cat-naometal)',
  'Halogênio':             'var(--cat-halogeno)',
  'Gás nobre':             'var(--cat-gasNobre)'
};
const CAT_COLOR_HEX_DARK = {
  'Metal alcalino':        '#e74c3c',
  'Metal alcalino-terroso':'#e67e22',
  'Lantanídeo':            '#b07edc',
  'Actinídeo':             '#a060cc',
  'Metal de transição':    '#f5a623',
  'Metal representativo':  '#22d4ae',
  'Semimetal':             '#3acf74',
  'Não-metal':             '#5aabff',
  'Halogênio':             '#4fa8e8',
  'Gás nobre':             '#20c9a0'
};
const CAT_COLOR_HEX_LIGHT = {
  'Metal alcalino':        '#a01825',
  'Metal alcalino-terroso':'#7a3e00',
  'Lantanídeo':            '#5c1a8c',
  'Actinídeo':             '#55127f',
  'Metal de transição':    '#7a4d00',
  'Metal representativo':  '#006b53',
  'Semimetal':             '#0d6b38',
  'Não-metal':             '#00508a',
  'Halogênio':             '#004d8c',
  'Gás nobre':             '#006152'
};
function getCatColorHex(cat){
  const isLight = document.documentElement.getAttribute('data-theme')==='light';
  return (isLight ? CAT_COLOR_HEX_LIGHT : CAT_COLOR_HEX_DARK)[cat] || '#888';
}
const CAT_COLOR = CAT_COLOR_VAR;
const CONFIG_EC = {
  // Período 1
  1:'1s¹', 2:'1s²',
  // Período 2
  3:'[He] 2s¹', 4:'[He] 2s²', 5:'[He] 2s² 2p¹', 6:'[He] 2s² 2p²',
  7:'[He] 2s² 2p³', 8:'[He] 2s² 2p⁴', 9:'[He] 2s² 2p⁵', 10:'[He] 2s² 2p⁶',
  // Período 3
  11:'[Ne] 3s¹', 12:'[Ne] 3s²', 13:'[Ne] 3s² 3p¹', 14:'[Ne] 3s² 3p²',
  15:'[Ne] 3s² 3p³', 16:'[Ne] 3s² 3p⁴', 17:'[Ne] 3s² 3p⁵', 18:'[Ne] 3s² 3p⁶',
  // Período 4
  19:'[Ar] 4s¹', 20:'[Ar] 4s²', 21:'[Ar] 3d¹ 4s²', 22:'[Ar] 3d² 4s²',
  23:'[Ar] 3d³ 4s²', 24:'[Ar] 3d⁵ 4s¹', 25:'[Ar] 3d⁵ 4s²', 26:'[Ar] 3d⁶ 4s²',
  27:'[Ar] 3d⁷ 4s²', 28:'[Ar] 3d⁸ 4s²', 29:'[Ar] 3d¹⁰ 4s¹', 30:'[Ar] 3d¹⁰ 4s²',
  31:'[Ar] 3d¹⁰ 4s² 4p¹', 32:'[Ar] 3d¹⁰ 4s² 4p²', 33:'[Ar] 3d¹⁰ 4s² 4p³',
  34:'[Ar] 3d¹⁰ 4s² 4p⁴', 35:'[Ar] 3d¹⁰ 4s² 4p⁵', 36:'[Ar] 3d¹⁰ 4s² 4p⁶',
  // Período 5
  37:'[Kr] 5s¹', 38:'[Kr] 5s²', 39:'[Kr] 4d¹ 5s²', 40:'[Kr] 4d² 5s²',
  41:'[Kr] 4d⁴ 5s¹', 42:'[Kr] 4d⁵ 5s¹', 43:'[Kr] 4d⁵ 5s²', 44:'[Kr] 4d⁷ 5s¹',
  45:'[Kr] 4d⁸ 5s¹', 46:'[Kr] 4d¹⁰', 47:'[Kr] 4d¹⁰ 5s¹', 48:'[Kr] 4d¹⁰ 5s²',
  49:'[Kr] 4d¹⁰ 5s² 5p¹', 50:'[Kr] 4d¹⁰ 5s² 5p²', 51:'[Kr] 4d¹⁰ 5s² 5p³',
  52:'[Kr] 4d¹⁰ 5s² 5p⁴', 53:'[Kr] 4d¹⁰ 5s² 5p⁵', 54:'[Kr] 4d¹⁰ 5s² 5p⁶',
  // Período 6
  55:'[Xe] 6s¹', 56:'[Xe] 6s²',
  57:'[Xe] 5d¹ 6s²', 58:'[Xe] 4f¹ 5d¹ 6s²',
  59:'[Xe] 4f³ 6s²', 60:'[Xe] 4f⁴ 6s²', 61:'[Xe] 4f⁵ 6s²', 62:'[Xe] 4f⁶ 6s²',
  63:'[Xe] 4f⁷ 6s²', 64:'[Xe] 4f⁷ 5d¹ 6s²', 65:'[Xe] 4f⁹ 6s²', 66:'[Xe] 4f¹⁰ 6s²',
  67:'[Xe] 4f¹¹ 6s²', 68:'[Xe] 4f¹² 6s²', 69:'[Xe] 4f¹³ 6s²', 70:'[Xe] 4f¹⁴ 6s²',
  71:'[Xe] 4f¹⁴ 5d¹ 6s²', 72:'[Xe] 4f¹⁴ 5d² 6s²', 73:'[Xe] 4f¹⁴ 5d³ 6s²',
  74:'[Xe] 4f¹⁴ 5d⁴ 6s²', 75:'[Xe] 4f¹⁴ 5d⁵ 6s²', 76:'[Xe] 4f¹⁴ 5d⁶ 6s²',
  77:'[Xe] 4f¹⁴ 5d⁷ 6s²', 78:'[Xe] 4f¹⁴ 5d⁹ 6s¹', 79:'[Xe] 4f¹⁴ 5d¹⁰ 6s¹',
  80:'[Xe] 4f¹⁴ 5d¹⁰ 6s²', 81:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', 82:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²',
  83:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', 84:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', 85:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵',
  86:'[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶',
  // Período 7
  87:'[Rn] 7s¹', 88:'[Rn] 7s²',
  89:'[Rn] 6d¹ 7s²', 90:'[Rn] 6d² 7s²', 91:'[Rn] 5f² 6d¹ 7s²', 92:'[Rn] 5f³ 6d¹ 7s²',
  93:'[Rn] 5f⁴ 6d¹ 7s²', 94:'[Rn] 5f⁶ 7s²', 95:'[Rn] 5f⁷ 7s²', 96:'[Rn] 5f⁷ 6d¹ 7s²',
  97:'[Rn] 5f⁹ 7s²', 98:'[Rn] 5f¹⁰ 7s²', 99:'[Rn] 5f¹¹ 7s²', 100:'[Rn] 5f¹² 7s²',
  101:'[Rn] 5f¹³ 7s²', 102:'[Rn] 5f¹⁴ 7s²', 103:'[Rn] 5f¹⁴ 7s² 7p¹',
  104:'[Rn] 5f¹⁴ 6d² 7s²',
  105:'[Rn] 5f¹⁴ 6d³ 7s²',
  106:'[Rn] 5f¹⁴ 6d⁴ 7s²',
  107:'[Rn] 5f¹⁴ 6d⁵ 7s²',
  108:'[Rn] 5f¹⁴ 6d⁶ 7s²',
  109:'[Rn] 5f¹⁴ 6d⁷ 7s²',
  110:'[Rn] 5f¹⁴ 6d⁸ 7s²',
  111:'[Rn] 5f¹⁴ 6d¹⁰ 7s¹',
  112:'[Rn] 5f¹⁴ 6d¹⁰ 7s²',
  113:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹',
  114:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²',
  115:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³',
  116:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴',
  117:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵',
  118:'[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶'
};
const CAMADAS_NOME    = ['K','L','M','N','O','P','Q'];
const ORDEM_SUBNIVEIS = ['1s','2s','2p','3s','3p','4s','3d','4p','5s','4d','5p',
                         '6s','4f','5d','6p','7s','5f','6d','7p'];
const MAX_SUB = { s:2, p:6, d:10, f:14 };

function distribuirEletrons(Z) {
  let e = Z, dist = {};
  for (const sub of ORDEM_SUBNIVEIS) {
    if (e <= 0) break;
    const fill = Math.min(e, MAX_SUB[sub[sub.length-1]]);
    if (fill > 0) { dist[sub] = fill; e -= fill; }
  }
  return dist;
}
function porCamada(dist) {
  const camadas = {};
  for (const [sub, e] of Object.entries(dist)) {
    const n = parseInt(sub[0]);
    if (!camadas[n]) camadas[n] = [];
    camadas[n].push({ sub, e });
  }
  return camadas;
}
function calcNeutrons(Z) {
  const m={1:1,2:4,3:7,4:9,5:11,6:12,7:14,8:16,9:19,10:20,11:23,12:24,13:27,14:28,15:31,16:32,17:35,18:40,19:39,20:40,21:45,22:48,23:51,24:52,25:55,26:56,27:59,28:58,29:63,30:65,31:70,32:73,33:75,34:79,35:80,36:84,37:85,38:88,39:89,40:91,41:93,42:96,43:98,44:102,45:103,46:106,47:108,48:112,49:115,50:119,51:122,52:128,53:127,54:131,55:133,56:137,57:139,58:140,59:141,60:144,61:145,62:150,63:152,64:157,65:159,66:163,67:165,68:167,69:169,70:173,71:175,72:178,73:181,74:184,75:186,76:190,77:192,78:195,79:197,80:201,81:204,82:207,83:209,84:209,85:210,86:222,87:223,88:226,89:227,90:232,91:231,92:238,93:237,94:244,95:243,96:247,97:247,98:251,99:252,100:257,101:258,102:259,103:266,104:267,105:268,106:269,107:270,108:269,109:278,110:281,111:282,112:285,113:286,114:289,115:290,116:293,117:294,118:294};
  return (m[Z]||Z*2)-Z;
}

const CURIOSIDADES = {
  // ── Período 1 ──
  1: "Elemento mais abundante do universo (~75% da massa bariónica). Combustível de fusão nas estrelas (reação p–p). A maior parte do H₂ industrial provém do vapor de metano reformado (steam methane reforming).",
  2: "Segundo elemento mais abundante do universo, formado pela fusão nuclear do hidrogênio nas estrelas (processo pp e ciclo CNO). Único elemento que permanece líquido a pressão atmosférica até o zero absoluto (Pe = −268,93 °C = 4,22 K, temperatura de ebulição normal). Não se solidifica a pressão ambiente, qualquer que seja a temperatura — solidifica apenas acima de 2,5 MPa (25 atm).",
  // ── Período 2 ──
  3: "Metal mais leve (0,534 g/cm³) e o elemento sólido com maior capacidade calorífica específica. Essencial em baterias de íon-lítio (Li-ion). Reservas significativas nas salinas da Bolívia, Chile e Argentina.",
  4: "Extremamente tóxico — poeira de berílio causa beriliose pulmonar crônica. Liga Be–Cu é usada em molas e instrumentos de precisão. Janelas de berílio são usadas em tubos de raios-X por sua baixa absorção de radiação.",
  5: "O boro-10 (19,9% natural) tem seção de choque de captura de nêutrons de ~3840 barns, tornando-o valioso em barras de controle de reatores e em radioterapia por captura de nêutrons (BNCT).",
  6: "Forma mais compostos do que qualquer outro elemento. O ciclo do carbono regula o clima da Terra. O carbono-14 (t½ = 5 730 anos) é base da datação radiocarbônica.",
  7: "Constitui 78,09% do volume da atmosfera terrestre (N₂). O processo Haber–Bosch, que fixa N₂ atmosférico em NH₃ (Fe como catalisador, 400–500 °C, 150–300 atm), sustenta a produção de fertilizantes nitrogenados que alimenta ~50% da população mundial atual.",
  8: "Segundo elemento mais abundante na crosta terrestre (~46% em massa). Responsável pela camada de ozônio (O₃) que bloqueia UV solar. Independentemente descoberto por Carl Wilhelm Scheele (1772) e Joseph Priestley (1774).",
  9: "Elemento mais eletronegativo (χ = 3,98 na escala Pauling). Tão reativo que reage diretamente com a maioria dos outros elementos, incluindo gases nobres como xenônio. O flúor-18 é fundamental em tomografias PET.",
  10: "Gás nobre usado em lâmpadas de descarga (luz laranja-avermelhada). Detectado espectroscopicamente no Sol antes de ser isolado na Terra (Ramsay & Travers, 1898). Produzido industrialmente por destilação do ar líquido.",
  // ── Período 3 ──
  11: "Reage violentamente com água, liberando H₂ e hidróxido de sódio. Essencial na regulação do potencial de ação neuronal (bomba Na⁺/K⁺-ATPase). Obtido industrialmente por eletrólise do NaCl fundido (processo Downs).",
  12: "Quarto elemento mais abundante na crosta terrestre por massa. Cofator de mais de 300 enzimas no corpo humano. A clorofila, pigmento central da fotossíntese, tem Mg²⁺ no centro do anel porfirínico.",
  13: "Metal mais abundante na crosta terrestre (~8,1% em massa) e terceiro elemento mais abundante. O processo Hall–Héroult (1886) tornou o alumínio acessível: eletrólise de Al₂O₃ dissolvida em criolita fundida.",
  14: "Segundo elemento mais abundante na crosta terrestre (~27,7%). Base da eletrônica moderna: semicondutor com gap de banda de 1,12 eV a 300 K. O SiO₂ é o principal componente do vidro comum.",
  15: "Essencial para a vida: compõe DNA, RNA e ATP. O fósforo branco (P₄) é pirofórico e altamente tóxico; o vermelho é estável e usado em fósforos de segurança. Obtido industrialmente por redução de fosfato de cálcio com carbono.",
  16: "Componente dos aminoácidos cisteína e metionina, essenciais para a estrutura de proteínas (pontes dissulfeto). O SO₂ liberado em erupções vulcânicas forma aerossóis de H₂SO₄ na estratosfera que refletem radiação solar, causando resfriamento climático temporário (p. ex., erupção do Pinatubo, 1991, reduziu T global em ~0,5 °C).",
  17: "Halogênio de alta reatividade; agente desinfetante usado em tratamento de água desde o início do século XX. O gás Cl₂ foi usado como arma química na Batalha de Ypres (1915). Produzido por eletrólise de salmoura (processo cloro-álcali).",
  18: "Terceiro gás mais abundante na atmosfera terrestre (~0,934% em volume). Utilizado como atmosfera inerte na soldagem TIG e em lâmpadas incandescentes de alta qualidade. Sem compostos estáveis conhecidos em condições normais.",
  // ── Período 4 ──
  19: "Metal alcalino essencial ao funcionamento celular: o gradiente K⁺/Na⁺ através das membranas é a base do potencial de repouso dos neurônios. Obtido industrialmente pela redução de KCl com sódio metálico.",
  20: "Elemento mais abundante nos ossos e dentes humanos (como hidroxiapatita, Ca₁₀(PO₄)₆(OH)₂). Quinto elemento mais abundante na crosta terrestre. Cofator essencial na contração muscular e coagulação sanguínea.",
  21: "Terra rara leve de ocorrência dispersa. Produzido em reatores nucleares pela fissão de urânio e plutônio. Adicionado ao alumínio para melhorar resistência mecânica em ligas aeroespaciais (ligas Al–Sc).",
  22: "Biocompatível e mais resistente à corrosão que qualquer outro metal. Razão resistência/densidade superior à do aço. Produzido pelo processo Kroll: redução de TiCl₄ com magnésio metálico em atmosfera inerte.",
  23: "Descoberto em 1801 por Andrés Manuel del Río (México) e erroneamente identificado como cromo; redescoberto em 1830–1831 por Nils Gabriel Sefström. O pentóxido V₂O₅ é catalisador no processo de contato para produção de H₂SO₄. Adicionado ao aço melhora dureza e resistência ao impacto.",
  24: "A configuração eletrônica anômala [Ar]3d⁵4s¹ (esperada: 3d⁴4s²) deve-se à estabilidade extra da subcamada d semicheia. O cromo confere resistência à corrosão ao aço inoxidável (mínimo 10,5% Cr).",
  25: "A configuração anômala [Ar]3d⁵4s² com a camada d semicheia o torna paramagnético. Essencial na produção de aço (remove enxofre e oxigênio). O MnO₂ é catalisador e eletrodo em pilhas secas zinco-carbono.",
  26: "Quarto elemento mais abundante na crosta terrestre e principal constituinte do núcleo terrestre (~80% do núcleo externo líquido e núcleo interno sólido). A hemoglobina e mioglobina contêm Fe²⁺ no centro do grupo heme para transporte de O₂. A fusão redutora em alto-forno combina hematita + coque + calcário a ~1 500 °C.",
  27: "Essencial para a vitamina B₁₂ (única vitamina que contém metal de transição). O azul da cobalto foi usado na cerâmica desde a Antiguidade. Principal produtor mundial: República Democrática do Congo (~70%).",
  28: "Primeiro a ser descoberto por seu forte ferromagnetismo (junto com Fe e Co). Componente de ligas resistentes a altas temperaturas (superligas de Ni em turbinas). Ocorre em meteoros ferro-níquel.",
  29: "Metal usado pelo ser humano há ~10 000 anos — o mais antigo com uso documentado. Melhor condutor elétrico depois da prata. Essencial à vida: centro ativo da citocromo c oxidase. O Chile detém as maiores reservas mundiais (~23%), seguido de Peru, Austrália e Rússia.",
  30: "Micronutriente essencial; cofator de mais de 300 enzimas. A deficiência de zinco afeta ~2 bilhões de pessoas. Produzido principalmente pelo processo pirometalúrgico Imperial Smelting ou por eletrólise de ZnSO₄.",
  31: "Ponto de fusão 29,76 °C — derrete ao ser aquecido pela mão. Produzido como subproduto do refino de bauxita (Al) e esfalerita (Zn). Usado em LEDs de alta eficiência (GaN, GaAs) e em substratos de semicondutores.",
  32: "Predito por Mendeleev em 1871 como 'eka-silício' antes de sua descoberta por Clemens Winkler em 1886. Semicondutor histórico: base dos primeiros transistores de ponto de contato (Bell Labs, 1947). Atualmente obtido do zinco.",
  33: "Veneno histórico: usado em crimes e como medicamento (Salvarsan, 1909 — primeiro agente quimioterápico moderno). O arseneto de gálio (GaAs) é semicondutor de alta velocidade. Ocorre em minerais sulfetados de Cu, Pb e Zn.",
  34: "Micronutriente essencial — componente da selenocisteína (21º aminoácido) e da enzima glutationa peroxidase. A China detém mais de 30% das reservas mundiais. Obtido como subproduto anódico do refino eletrolítico do cobre.",
  35: "Único não-metal líquido a 25 °C e 1 atm. Descrito pela IUPAC como halogênio de alta reatividade. Ocorre principalmente como brometo (Br⁻) dissolvido no oceano e no Mar Morto. Produzido por oxidação de Br⁻ com Cl₂.",
  36: "Gás nobre usado na iluminação de sinais luminosos (cor azul-branca). Isolado em 1898 por Ramsay & Travers. O criptônio-85 (t½ = 10,8 anos) liberado em reprocessamentos nucleares é indicador de proliferação nuclear.",
  // ── Período 5 ──
  37: "O mais reativo dos alcalinos leves. Os relógios atômicos de rubídio baseiam-se na transição hiperfina do Rb-87 a 6 835 MHz. Rb-87 (t½ = 47,5 × 10⁹ anos) é usado na geocronologia Rb–Sr.",
  38: "O Sr-90 (t½ = 28,8 anos), subproduto de explosões nucleares, se deposita nos ossos substituindo cálcio — cancerígeno. Usado em fogos de artifício (cor vermelha intensa, comprimento de onda ~650 nm). Minerais: celestita (SrSO₄).",
  39: "Componente dos fósforos YAG:Nd (lasers cirúrgicos e industriais) e Y₂O₃:Eu (fósforos vermelhos em televisões CRT). O Y-90 (t½ = 64 h) é usado em radioterapia de câncer hepático. Ocorre em areias monazíticas.",
  40: "Resistente à corrosão por neutrons, tornando-o ideal para revestimentos internos de reatores nucleares. Sempre coexiste com háfnio na natureza; separação difícil por similaridade química. Mineral principal: zircão (ZrSiO₄).",
  41: "O Brasil detém ~98% das reservas mundiais de nióbio (jazidas de pirocloro em Araxá, MG). Adicionado ao aço em quantidade de ~0,1% aumenta a resistência mecânica em ~30%. Supercondutores NbTi e Nb₃Sn equipam o LHC (CERN).",
  42: "O MoS₂ (molibdenita) é lubrificante sólido eficaz em vácuo e alta temperatura — usado na NASA. A enzima nitrogenase, que fixa N₂ atmosférico, contém um cofator Mo-Fe. Principal produtor mundial: China.",
  43: "Primeiro elemento artificial, produzido por Perrier & Segrè (1937) por bombardeio de Mo-98 com dêuterons. Sem isótopos estáveis. O Tc-99m (t½ = 6 h) é o radionuclídeo mais utilizado em medicina nuclear diagnóstica (~80% dos exames).",
  44: "Metal do grupo da platina; o RuO₂ é catalisador na oxidação do Cl₂ (processo DSA — Dimensionally Stable Anode). Componente de ligas para contatos elétricos de alta resistência ao desgaste. Produzido a partir dos resíduos do refino da platina.",
  45: "Metal mais raro da crosta terrestre (~0,001 ppb). Catalisador homogêneo essencial: o catalisador de Wilkinson [RhCl(PPh₃)₃] revolucionou a hidrogenação de alcenos. O Rh-103 é o único isótopo estável; o Rh é mononuclídico.",
  46: "Único metal de transição com configuração eletrônica [Kr]4d¹⁰ (sem elétrons 5s). Absorve H₂ em quantidade enorme (até 900× seu volume) — usado em células de combustível. Catalisador de referência em reações de hidrogenação.",
  47: "Maior condutividade elétrica (6,30×10⁷ S/m) e térmica de todos os metais. Empregado em contatos elétricos de alta confiabilidade, espelhos de telescópios e antimicrobianos. Os íons Ag⁺ são altamente bactericidas.",
  48: "Altamente tóxico — causa itai-itai (dor-dor), doença de desmineralização óssea documentada no Japão pós-II Guerra. Usado em eletroposicionamento e em detectores de raios-X (CdTe, CdZnTe). Subproduto do refino do zinco.",
  49: "Componente do óxido de estanho-índio (ITO — Indium Tin Oxide), transparente e condutor, indispensável em telas LCD, OLED e painéis sensíveis ao toque. ~80% do índio produzido destina-se a esta aplicação.",
  50: "A 'praga do estanho' (transformação alotrópica β→α abaixo de 13,2 °C) destruiu material de canhões no Exército de Napoleão em 1812. O estanho-orgânico é biocida; o SnO₂ é cerâmica elétrica e sensor de gases.",
  51: "Usado desde a Antiguidade em liga com chumbo (chumbo-antimônio para tipos gráficos). O Sb₂O₃ é retardante de chamas em plásticos. A estibina (SbH₃) é extremamente tóxica. Principal fonte: estibina (Sb₂S₃).",
  52: "Semicondutor usado em células solares de telureto de cádmio (CdTe), segunda tecnologia mais instalada no mundo. O Bi₂Te₃ é o melhor termoelétrico à temperatura ambiente. Obtido quase exclusivamente do refino do cobre.",
  53: "Essencial para a síntese dos hormônios tireoidianos (T₃ e T₄). O I-131 (t½ = 8,02 dias) é usado no tratamento do hipertireoidismo e câncer de tireoide. O I-123 é usado em imagens diagnósticas. Obtido de salmouras e algas marinhas.",
  54: "Gás nobre com notáveis compostos de inclusão. O XeF₂, XeF₄ e XeF₆ foram os primeiros compostos de gases nobres sintetizados (Bartlett, 1962). Os motores de íons de sondas como Dawn e Hayabusa usam Xe como propelente.",
  // ── Período 6 ──
  55: "Metal alcalino de maior raio atômico entre os elementos não-radioativos. O padrão de frequência do Cs-133 define o segundo SI (9 192 631 770 Hz — transição hiperfina). Reage violentamente com água e se inflama espontaneamente no ar (pirofórico).",
  56: "O BaSO₄ é insolúvel e opaco a raios-X, usado como agente de contraste gastrointestinal. O Ba(NO₃)₂ produz cor verde brilhante em fogos de artifício. Tóxico em formas solúveis (Ba²⁺ inibe canais de K⁺).",
  57: "Primeiro e mais abundante dos lantanídeos (~39 ppm na crosta). O La₂O₃ melhora o índice de refração em vidros ópticos especiais. A liga mischmetall (Ce-La-Nd) é usada na pedra de isqueiro.",
  58: "Lantanídeo mais abundante (~68 ppm). O CeO₂ é catalisador em conversores automotivos (oxida CO e HC). Polidor óptico de alta eficiência. A liga mischmetall contém ~50% de Ce.",
  59: "Os óculos de proteção para soldadores usam vidro dopado com Pr (absorve comprimentos de onda do arco elétrico). O Pr₂O₃ confere cor verde-amarelada a vidros e cerâmicas.",
  60: "Os ímãs de Nd₂Fe₁₄B são os mais potentes ímãs permanentes conhecidos (produto de energia máximo ~400 kJ/m³) — indispensáveis em motores elétricos de veículos e geradores eólicos.",
  61: "Único lantanídeo sem isótopos estáveis ou de meia-vida geológica. Encontrado em traços em minérios de urânio (fissão espontânea). O Pm-147 (t½ = 2,62 anos) alimenta células nucleares de marcapassos e baterias espaciais.",
  62: "Ímãs SmCo₅ e Sm₂Co₁₇ têm alta temperatura de Curie (~700–800 °C), ideais em motores de alta temperatura. O Sm-153 (t½ = 1,94 dias) é radiofármaco para tratamento paliativo de metástases ósseas.",
  63: "Os fosfores Eu²⁺ e Eu³⁺ emitem azul e vermelho, respectivamente — críticos nas lâmpadas fluorescentes compactas (CFL) e em telas de LEDs brancos. As notas de euro contêm pigmentos de európio para autenticação.",
  64: "O Gd³⁺ (7 elétrons desemparelhados, momento magnético máximo entre lantanídeos) é o agente de contraste MRI mais usado (complexo [Gd(DTPA)]²⁻). O Gd-157 tem a maior seção de choque de captura de nêutrons de todos os elementos estáveis (~259 000 barns).",
  65: "A liga Tb₀,₃Dy₀,₇Fe₂ (Terfenol-D) tem a maior magnetostrição à temperatura ambiente — usada em sensores e atuadores acústicos subaquáticos (sonares). O Tb³⁺ ativa o fósforo verde em tricolor de lâmpadas fluorescentes.",
  66: "O Dy₂Fe₁₄B é adicionado aos ímãs de Nd-Fe-B para aumentar a temperatura de Curie e resistência à desmagnetização. Absorvedor de nêutrons em barras de controle de reatores de alta potência.",
  67: "Maior momento magnético de dipolo entre todos os elementos (~10,6 μB). Os compostos de Ho são usados em magnetos de campo focal em equipamentos de RMN. O Ho-166 é radiofármaco experimental.",
  68: "Os amplificadores de fibra óptica dopados com érbio (EDFA — Erbium-Doped Fiber Amplifier) amplificam sinais a 1 550 nm sem conversão elétrica — fundamentais nas telecomunicações de longa distância.",
  69: "O lantanídeo mais raro de ocorrência natural (~0,52 ppm). O Tm-170 (t½ = 128,6 dias) é fonte de raios-X portátil usada em triagem radiológica. A meia-vida curta limita aplicações industriais.",
  70: "Resistência elétrica muito sensível à pressão — usado em transdutores de pressão de alta precisão. O Yb³⁺/Yb²⁺ é par redox de referência em química de lantanídeos. Produzido a partir da monazita por troca iônica.",
  71: "Lantanídeo mais pesado e menor (contração dos lantanídeos). O Lu₂SiO₅:Ce (LSO) é o cintilador mais eficiente em detectores PET. O Lu-177 (t½ = 6,65 dias) é radionuclídeo terapêutico de alta precisão (PRRT).",
  72: "Sempre coexiste com zircônio em minerais (diferença de raio ≤ 2 pm por contração dos lantanídeos). Altamente transparente a neutrons (ao contrário do Zr) — impede seu uso em elementos de combustível nuclear. Usado em microeletrônica (high-κ dielectric, HfO₂).",
  73: "O Ta₂O₅ tem alta permissividade dielétrica, essencial nos capacitores de tântalo (presentes em smartphones e eletrônica médica). Biocompatível: usado em implantes cranianos. O coltan (columbita-tantalita) origina conflitos no Congo.",
  74: "Maior ponto de fusão de todos os metais puros (3 422 °C). Maior módulo de Young entre metais elementares. Filamentos de W dominaram a iluminação incandescente por um século. O W-186 e W-184 são usados em blindagem de radiação.",
  75: "Um dos elementos mais raros da crosta terrestre (~1 ppb). Descoberto em 1925 por Noddack, Tacke & Berg. Ligas Re-W são usadas em filamentos de espectrômetros de massa. O Re-187 (t½ = 41,6 × 10⁹ anos) é base do cronômetro Re–Os.",
  76: "Metal natural mais denso (22,59 g/cm³). O OsO₄ é fixador e corador em microscopia eletrônica; extremamente tóxico (vaporiza a 130 °C). Ligas Os-Ir são as mais resistentes ao desgaste conhecidas, usadas em pontas de caneta.",
  77: "A camada de enriquecimento de irídio na fronteira Cretáceo-Paleógeno (K-Pg, 66 Ma) forneceu evidência do impacto de asteroide que causou a extinção em massa dos dinossauros (Alvarez et al., 1980). Metal mais resistente à corrosão.",
  78: "Não corrói a nenhuma temperatura. Catalisador crítico: o processo Ostwald (HNO₃) e as células de combustível PEM usam Pt como eletrodo. A cisplatina [Pt(NH₃)₂Cl₂] é o quimioterápico mais amplamente usado no mundo.",
  79: "Maleável: 1 g pode ser laminado a uma folha de ~1 m² ou esticado a ~3 km de fio. O Au-198 (t½ = 2,69 dias) é usado em braquiterapia. Os nanopartículas de ouro têm propriedades ópticas únicas (plasmônica).",
  80: "Único metal líquido à temperatura ambiente (junto com o gálio). A amalgamação com Au e Ag foi historicamente usada na mineração, causando contaminação ambiental grave. A Convenção de Minamata (2013) restringe seu uso.",
  81: "Altamente tóxico — o acetato de Tálio foi raticida até ser proibido em muitos países nos anos 1970–1980. O Tl⁺ mimetiza K⁺ nas bombas Na⁺/K⁺-ATPase e nos canais de potássio, acumulando-se intracelularmente. O Tl-201 (t½ = 73 h) foi padrão em cintilografia de perfusão miocárdica antes de ser amplamente substituído pelo Tc-99m.",
  82: "Material de blindagem de radiação por excelência (alta densidade, alto Z). A contaminação por chumbo (plumbismo) afetou civilizações antigas que usavam encanamentos e vasilhames de Pb. O Pb-210 é rastreador geoquímico.",
  83: "O Bi-209 foi considerado estável por décadas; sua radioatividade (α-decaimento, t½ = 1,9 × 10¹⁹ anos — ~10⁹× a idade do universo) foi descoberta em 2003 por De Marcillac et al. Cristais de bismuto solidificado formam estruturas cúbicas em degraus com óxidos iridescentes. O subsalicilato de bismuto (Pepto-Bismol) é usado no tratamento de gastrites e infecção por H. pylori.",
  84: "Descoberto por Marie e Pierre Curie em 1898 — homenagem à Polônia natal de Marie. O Po-210 (t½ = 138,4 dias) é α-emissor puro de alta toxicidade; usado em eliminadores de estática e no envenenamento de Alexander Litvinenko (2006).",
  85: "Elemento natural mais raro: estima-se que existam menos de 70 mg na crosta terrestre inteira. O At-211 (t½ = 7,2 h) é promissor em radioterapia α-dirigida (TAT — Targeted Alpha Therapy) por sua cadeia de decaimento pura em α.",
  86: "Gás nobre radioativo — o Rn-222 (t½ = 3,82 dias) é produto do decaimento do Ra-226. Segunda principal causa de câncer de pulmão em não-fumantes, segundo a OMS (após o tabagismo). Acumula-se em porões e locais com granito.",
  // ── Período 7 ──
  87: "Elemento natural mais instável: o isótopo mais duradouro, Fr-223 (t½ = 22,0 min), decai em Ra-223 ou At-219. Estimado que existam menos de 30 g de frâncio na crosta terrestre em qualquer momento. Descoberto em 1939 por Marguerite Perey.",
  88: "Descoberto em 1898 por Marie e Pierre Curie a partir da pechblenda. O Ra-226 (t½ = 1 600 anos) foi usado em tintas luminescentes (radioterapia), causando mortes entre as 'Radium Girls'. O Ra-223 é aprovado para metástases ósseas.",
  89: "Emite luz azul-pálida visível no escuro por radioluminescência — fenômeno de Cherenkov. O Ac-225 (t½ = 9,9 dias) é alvo de intenso desenvolvimento para radioterapia α dirigida (TAT) contra cânceres resistentes.",
  90: "Thorium-232 (t½ = 14 × 10⁹ anos) é três vezes mais abundante que o urânio na crosta. Reatores de tório (ciclo Th-232/U-233) produzem menos actinídeos transurânicos que reatores de urânio. Mineral: monazita [(Ce,La,Nd,Th)PO₄].",
  91: "Intermediário do decaimento do U-235. O Pa-231 (t½ = 32 760 anos) é usado como marcador geocronológico no estudo de circulação oceânica profunda. É o actinídeo natural mais raro (~1 ppm em minérios de urânio ricos).",
  92: "Combustível nuclear predominante: U-235 (0,72% natural) é fissil; U-238 (99,27%) é fértil (gera Pu-239 por captura de nêutron). A bomba de urânio Little Boy (1945) usou o método gun-type com U-235 altamente enriquecido.",
  93: "Primeiro elemento transuraniano, sintetizado em 1940 por McMillan & Abelson no ciclotron de Berkeley por bombardeio de U-238 com nêutrons. Encontrado em traços em minérios de urânio por fissão espontânea de U-238.",
  94: "O Pu-238 (t½ = 87,7 anos) alimenta Geradores Termoelétricos de Radioisótopos (RTG) em sondas Voyager, Cassini e Curiosity. O Pu-239 (t½ = 24 110 anos) é material fissil para armas e reatores nucleares.",
  95: "O Am-241 (t½ = 432,2 anos) é a fonte de radiação α em detectores de fumaça ionizantes (~0,3 μg ou ~37 kBq por unidade doméstica). Partículas α de 5,5 MeV ionizam o ar entre eletrodos; aerossóis de fumaça capturam os íons, reduzindo a corrente e disparando o alarme. Aprovado pela NRC (EUA) e regulamentado pela IAEA.",
  96: "Nomeado em homenagem a Marie e Pierre Curie. O Cm-244 (t½ = 18,1 anos) é fonte de calor em RTGs de missão de longa duração. O Cm-248 é produzido em reatores e serve como alvo para síntese de californium.",
  97: "Sintetizado em 1949 por Thompson, Ghiorso & Seaborg na UC Berkeley. O Bk-249 (t½ = 330 dias) é o único isótopo produzido em quantidades macroscópicas (~μg/ano) e serve como alvo-chave para síntese de elementos ainda mais pesados (Ts, Og).",
  98: "O Cf-252 (t½ = 2,65 anos) tem a maior taxa de emissão de nêutrons espontâneos de qualquer nuclídeo prático (~2,3 × 10¹² n/g·s) — usado para inicialização de reatores, análise por ativação de nêutrons e como fonte portátil.",
  99: "Identificado em 1952 nos detritos da primeira detonação de bomba de hidrogênio (Ivy Mike, Pacífico Sul) — produto de captura múltipla de nêutrons pelo U-238. Nomeado em homenagem a Albert Einstein.",
  100: "Identificado nos mesmos detritos de Ivy Mike que o einstênio. O Fm-257 (t½ = 100,5 dias) é o isótopo mais estável. A síntese acima de Z=100 é extremamente difícil pois o Fm não forma íons M³⁺ estáveis em solução aquosa.",
  101: "Sintetizado em 1955 por Ghiorso, Harvey, Choppin, Thompson & Seaborg bombardeando ~10⁹ átomos de Es-253 com partículas α. Primeiro elemento sintetizado um átomo de cada vez e identificado quimicamente. Homenagem a Mendeleev.",
  102: "Nomeado em homenagem a Alfred Nobel. A controvérsia sobre a descoberta (reivindicações de Dubna, Berkeley e Estocolmo) levou à primeira revisão formal de prioridade de descoberta pela IUPAC. O No-259 tem t½ = 58 min.",
  103: "Último actinídeo. Sintetizado em 1961 (Berkeley) por bombardeio de Cf com boro. A configuração eletrônica experimental é [Rn]5f¹⁴7s²7p¹ — a única exceção ao preenchimento sequencial entre os actinídeos.",
  // ── Transactinídeos (Z=104–118) ──
  104: "Análogo químico do háfnio (mesmo grupo). Sintetizado em 1964 (Dubna) e 1969 (Berkeley) — disputa de prioridade resolvida pela IUPAC em 1997. O isótopo mais estável, Rf-267 (t½ ≈ 1,3 h), permite experimentos químicos em fase gasosa.",
  105: "Análogo do tântalo. Confirmado pela IUPAC em 1997. O Db-268 (t½ ≈ 29 h) tem a maior meia-vida do elemento. Experimentos confirmaram seu comportamento químico análogo ao Nb e Ta em cromatografia de troca aniônica.",
  106: "Nomeado em 1997 em homenagem a Glenn T. Seaborg — único elemento nomeado enquanto o homenageado ainda vivia (Seaborg morreu em 1999). Análogo do tungstênio. O Sg-271 (t½ ≈ 1,9 min) permite estudos de volatilidade.",
  107: "Análogo do rênio. Primeiro transactinídeo com propriedades confirmadas de metal de transição do grupo 7 (em analogia com Mn, Tc, Re) por experimentos de cromatografia de troca iônica em 1994 (GSI, Darmstadt).",
  108: "Análogo do ósmio. Sintetizado pela primeira vez em 1984 no GSI (Darmstadt) pela fusão de Pb-208 com Fe-58. O Hs-270 (t½ ≈ 22 s) permitiu a observação do tetróxido HsO₄ volátil — análogo ao OsO₄ — em 2002.",
  109: "Nomeado em 1997 em homenagem a Lise Meitner — física austríaca co-descobridora da fissão nuclear com Otto Hahn e Fritz Strassmann. Análogo do irídio. Isótopo mais estável: Mt-278 (t½ ≈ 4,5 s).",
  110: "Análogo da platina. Sintetizado em 1994 no GSI. O Ds-281 (t½ ≈ 12,7 s) é o isótopo mais estável. Efeitos relativísticos podem tornar o Ds mais nobre que a platina, com possível configuração [Rn]5f¹⁴6d⁸7s² ou 6d⁹7s¹.",
  111: "Nomeado em 2004 em homenagem a Wilhelm Conrad Röntgen, descobridor dos raios-X. Análogo do ouro. O Rg-282 (t½ ≈ 100 s) é o isótopo mais estável. Cálculos relativísticos preveem alto potencial de ionização — mais nobre que o Au.",
  112: "Análogo do mercúrio. O Cn-285 (t½ ≈ 29 s) é o isótopo mais estável. Experimentos de 2007–2009 em Dubna e PSI (Suíça) sugerem que o Cn se comporta como gás nobre em condições ambientais, em vez de metal — consequência de efeitos relativísticos extremos.",
  113: "Primeiro elemento sintetizado na Ásia: descoberto pelo grupo RIKEN (Japão) em 2004. A confirmação definitiva pela IUPAC em dezembro de 2015 concedeu ao Japão o direito de nomeação — primeiro para um país asiático. Nomeado em homenagem ao Japão (Nihon = 日本).",
  114: "Análogo do chumbo; possivelmente na 'ilha de estabilidade' nuclear (núcleo duplamente mágico Z=114, N=184 está próximo). O Fl-289 (t½ ≈ 1,9 s) mostra comportamento mais próximo de gás nobre que de metal por efeitos relativísticos — referência: experimentos na RIKEN e JINR.",
  115: "Confirmado pela IUPAC em dezembro de 2015. Análogo do bismuto. Nomeado em homenagem à Oblast de Moscou (Moscóvia), onde fica o JINR em Dubna. O Mc-290 (t½ ≈ 0,65 s) é o isótopo mais estável.",
  116: "Análogo do polônio. Sintetizado em 2000 em Dubna pela fusão de Cm-248 com Ca-48. Nomeado em 2012 em homenagem ao Lawrence Livermore National Laboratory (EUA), parceiro da colaboração JINR-LLNL. O Lv-293 (t½ ≈ 57 ms) é o mais estável.",
  117: "Análogo do ástato. Sintetizado em 2010 em Dubna pela fusão de Bk-249 (produzido no ORNL, EUA) com Ca-48. Confirmado pela IUPAC em 2015. Nomeado em homenagem ao estado do Tennessee (EUA). O Ts-294 (t½ ≈ 51 ms) é o mais estável.",
  118: "Elemento de maior número atômico confirmado. Sintetizado em 2002 em Dubna (3 átomos). Confirmado pela IUPAC em 2015. Nomeado em homenagem a Yuri Oganessyan, pioneiro em síntese de elementos superpesados. Gás nobre previsto com t½ = 0,89 ms (Og-294)."
};

const elementosBase = [
  {
    numero:1, 
    simbolo:"H",  
    nome:"Hidrogênio",   
    grupo:1,  
    periodo:1,
    cat:"Não-metal",             
    obtencao:"Industrialmente por reforma a vapor do metano (CH₄ + H₂O → CO + 3H₂) ou por eletrólise da água (2H₂O → 2H₂ + O₂). O H₂ verde, por eletrólise com energia renovável, é tecnologia emergente."
  },
  {
    numero:2,  
    simbolo:"He", 
    nome:"Hélio",         
    grupo:18, 
    periodo:1, 
    cat:"Gás nobre",             
    obtencao:"Extraído como subproduto do gás natural (campos de Kansas, Texas e Argélia contêm até 7% He). Formado pelo decaimento α de U e Th. Não pode ser sintetizado economicamente."
  },
  {numero:3,  simbolo:"Li", nome:"Lítio",         grupo:1,  periodo:2, cat:"Metal alcalino",        obtencao:"Salmouras de salares (Bolívia, Chile, Argentina — 'triângulo do lítio') por evaporação e precipitação seletiva. Também do mineral espodumênio (LiAlSi₂O₆) por lixiviação ácida."},
  {numero:4,  simbolo:"Be", nome:"Berílio",       grupo:2,  periodo:2, cat:"Metal alcalino-terroso", obtencao:"Do mineral berilo [Be₃Al₂(SiO₃)₆] por fusão com NaOH e lixiviação ácida, seguida de redução de BeF₂ com magnésio metálico (processo Kjeldahl-modificado)."},
  {numero:5,  simbolo:"B",  nome:"Boro",          grupo:13, periodo:2, cat:"Semimetal",             obtencao:"Principalmente da bórax (Na₂B₄O₇·10H₂O) e cernita em depósitos evaporíticos (Turquia, EUA). Boro elementar por redução de B₂O₃ com magnésio ou alumínio a alta temperatura."},
  {numero:6,  simbolo:"C",  nome:"Carbono",       grupo:14, periodo:2, cat:"Não-metal",             obtencao:"Grafite e diamante são minerados diretamente. Carvão por destilação da madeira ou mineração. Carbono industrial sintético por decomposição de metano em plasma (negro de fumo) ou CVD (diamante sintético)."},
  {numero:7,  simbolo:"N",  nome:"Nitrogênio",    grupo:15, periodo:2, cat:"Não-metal",             obtencao:"Industrialmente por destilação fracionada do ar líquido (ponto de ebulição: −195,8 °C). O processo Linde-Hampson liquefaz o ar; a destilação separa N₂ do O₂ (−183 °C) e Ar (−185,8 °C)."},
  {numero:8,  simbolo:"O",  nome:"Oxigênio",      grupo:16, periodo:2, cat:"Não-metal",             obtencao:"Por destilação fracionada do ar líquido (processo Linde-Hampson). Em escala laboratorial, por decomposição de KMnO₄ ou H₂O₂. Eletrólise da água produz O₂ de alta pureza como subproduto."},
  {numero:9,  simbolo:"F",  nome:"Flúor",         grupo:17, periodo:2, cat:"Halogênio",             obtencao:"Exclusivamente por eletrólise do fluoreto de hidrogênio anidro (HF) dissolvido em KF fundido (célula de Moissan, 1886). O F₂ não pode ser obtido por rotas químicas convencionais."},
  {numero:10, simbolo:"Ne", nome:"Neônio",        grupo:18, periodo:2, cat:"Gás nobre",             obtencao:"Por destilação fracionada do ar líquido. O Ne se concentra no topo da coluna (ponto de ebulição: −246,1 °C). Separado do He por adsorção seletiva em carvão ativo a temperatura de N₂ líquido."},
  {numero:11, simbolo:"Na", nome:"Sódio",         grupo:1,  periodo:3, cat:"Metal alcalino",        obtencao:"Industrialmente por eletrólise do NaCl fundido no processo Downs (cátodo de aço, ânodo de grafite, separador de aço para evitar recombinação de Na e Cl₂). Temperatura de operação ~600 °C."},
  {numero:12, simbolo:"Mg", nome:"Magnésio",      grupo:2,  periodo:3, cat:"Metal alcalino-terroso", obtencao:"Pela eletrólise do MgCl₂ fundido (processo Dow, obtendo MgCl₂ da água do mar por tratamento com cal e cloreto). Também por redução de MgO com silício em forno a vácuo (processo Pidgeon)."},
  {numero:13, simbolo:"Al", nome:"Alumínio",      grupo:13, periodo:3, cat:"Metal representativo",  obtencao:"Processo Hall–Héroult (1886): eletrólise de Al₂O₃ (alumina) dissolvida em criolita (Na₃AlF₆) fundida a ~960 °C. A alumina é extraída da bauxita pelo processo Bayer com NaOH sob pressão e temperatura."},
  {numero:14, simbolo:"Si", nome:"Silício",       grupo:14, periodo:3, cat:"Semimetal",             obtencao:"Sílica (SiO₂) reduzida com coque em forno elétrico a arco (Si grau metalúrgico, ~98%). Si ultrapuro (eletrônico) por decomposição do tricloro-silano (SiHCl₃) e refino de zona flutuante (FZ) ou Czochralski (CZ)."},
  {numero:15, simbolo:"P",  nome:"Fósforo",       grupo:15, periodo:3, cat:"Não-metal",             obtencao:"Processo de fornos elétricos: redução de Ca₃(PO₄)₂ com coque e SiO₂ a ~1 400 °C. O P₄ formado é condensado. O fósforo vermelho é obtido por aquecimento controlado do P₄ branco na ausência de ar."},
  {numero:16, simbolo:"S",  nome:"Enxofre",       grupo:16, periodo:3, cat:"Não-metal",             obtencao:"Processo Frasch (enxofre nativo em sal domes): injeção de água superaquecida que funde o enxofre, expelido à superfície com ar comprimido. Também como subproduto da dessulfurização de petróleo e gás (processo Claus)."},
  {numero:17, simbolo:"Cl", nome:"Cloro",         grupo:17, periodo:3, cat:"Halogênio",             obtencao:"Processo cloro-álcali: eletrólise de solução aquosa saturada de NaCl (salmoura). Produz Cl₂ no ânodo e NaOH + H₂ no cátodo. Células de membrana (processo DuPont) substituíram as células de mercúrio por razões ambientais."},
  {numero:18, simbolo:"Ar", nome:"Argônio",       grupo:18, periodo:3, cat:"Gás nobre",             obtencao:"Subproduto da destilação fracionada do ar líquido (ponto de ebulição: −185,8 °C — entre N₂ e O₂). O Ar (0,934% do ar) é separado num ciclo lateral da coluna de destilação do ar e purificado por oxidação catalítica do H₂ residual."},
  {numero:19, simbolo:"K",  nome:"Potássio",      grupo:1,  periodo:4, cat:"Metal alcalino",        obtencao:"Por redução térmica de KCl fundido com vapores de sódio a ~850 °C e destilação fracionada do K metálico (processo Griesheimer-Castner adaptado). A eletrólise do KCl fundido é ineficiente pois o K metálico se dissolve no eletrólito fundido, exigindo separação por destilação de qualquer forma."},
  {numero:20, simbolo:"Ca", nome:"Cálcio",        grupo:2,  periodo:4, cat:"Metal alcalino-terroso", obtencao:"Eletrólise do CaCl₂ fundido (cátodo de aço, ânodo de grafite) a ~800 °C. O CaCl₂ é obtido a partir da calcita (CaCO₃) tratada com HCl. Escala muito menor que Al ou Mg; consumo industrial limitado."},
  {numero:21, simbolo:"Sc", nome:"Escândio",      grupo:3,  periodo:4, cat:"Metal de transição",    obtencao:"Subproduto do processamento de minerais de terras raras (bastnasita, monazita, euxênita) e do refino de titânio e urânio. O Sc metálico é obtido por redução de ScF₃ com Ca em atmosfera de Ar. Produção mundial: ~15–20 toneladas/ano; Rússia e China dominam."},
  {numero:22, simbolo:"Ti", nome:"Titânio",       grupo:4,  periodo:4, cat:"Metal de transição",    obtencao:"Processo Kroll (1940): cloração do rutilo (TiO₂) com Cl₂ e C a ~900 °C para obter TiCl₄, seguida de redução com Mg metálico em atmosfera de Ar a ~800 °C. O produto ('esponja') é fundido em forno a arco."},
  {numero:23, simbolo:"V",  nome:"Vanádio",       grupo:5,  periodo:4, cat:"Metal de transição",    obtencao:"Subproduto do processamento de magnetita vanadifera (Rússia, China, África do Sul). A escória rica em V₂O₅ é reduzida com Al ou Ca. Também recuperado do petróleo cru vanadifico por incineração e lixiviação."},
  {numero:24, simbolo:"Cr", nome:"Cromo",         grupo:6,  periodo:4, cat:"Metal de transição",    obtencao:"Do mineral cromita (FeCr₂O₄) por redução aluminotérmica (processo de Goldschmidt) ou redução com carbono em forno elétrico. A pureza é ajustada pelo processo eletrolítico em banho de CrO₃/H₂SO₄."},
  {numero:25, simbolo:"Mn", nome:"Manganês",      grupo:7,  periodo:4, cat:"Metal de transição",    obtencao:"Do mineral pirolusita (MnO₂) por redução com Al (aluminotermia) ou por eletrólise de MnSO₄ aquoso (Mn eletrolítico de alta pureza). A maior parte é usada diretamente como ferroliga (FeMn, SiMn)."},
  {numero:26, simbolo:"Fe", nome:"Ferro",         grupo:8,  periodo:4, cat:"Metal de transição",    obtencao:"Redução de hematita (Fe₂O₃) ou magnetita (Fe₃O₄) com coque e calcário em alto-forno a ~1 500 °C. O ferro-gusa resultante é convertido em aço pelo processo LD (Basic Oxygen Furnace) ou em forno elétrico a arco (EAF)."},
  {numero:27, simbolo:"Co", nome:"Cobalto",       grupo:9,  periodo:4, cat:"Metal de transição",    obtencao:"Subproduto do refino hidrometalúrgico do cobre e do níquel (extração por solvente com D2EHPA). Também de minerais cobaltíferos (cobaltita, eritrita). Principal produtor: República Democrática do Congo (~70%)."},
  {numero:28, simbolo:"Ni", nome:"Níquel",        grupo:10, periodo:4, cat:"Metal de transição",    obtencao:"De lateritas (Ni em goethita — processamento por lixiviação ácida sob pressão, HPAL) ou de sulfetos (pentlandita — pirometalurgia: tostação → fusão matte → processo Mond para Ni ultrapuro). Rússia e Indonésia líderes."},
  {numero:29, simbolo:"Cu", nome:"Cobre",         grupo:11, periodo:4, cat:"Metal de transição",    obtencao:"De sulfetos (calcopirita, CuFeS₂): concentração por flotação, tostação, fusão em forno de reverberação, conversão, e refino eletrolítico (catodo de Cu ≥99,99%). Também por lixiviação em pilha de minério oxidado + extração por solvente + eletrólise (SX-EW)."},
  {numero:30, simbolo:"Zn", nome:"Zinco",         grupo:12, periodo:4, cat:"Metal de transição",    obtencao:"Da esfalerita (ZnS) por tostação (ZnO), lixiviação em H₂SO₄, purificação (remoção de Cu, Cd, Co) e eletrólise de solução de ZnSO₄ (processo hidrometalúrgico — ~80% da produção mundial). Alternativa: forno Imperial Smelting."},
  {numero:31, simbolo:"Ga", nome:"Gálio",         grupo:13, periodo:4, cat:"Metal representativo",  obtencao:"Subproduto do processo Bayer (lixiviação alcalina da bauxita): o Ga³⁺ se concentra no licor de alumina e é recuperado por eletrólise em célula de mercúrio ou por extração com resinas quelantes, seguida de eletrólise."},
  {numero:32, simbolo:"Ge", nome:"Germânio",      grupo:14, periodo:4, cat:"Semimetal",             obtencao:"Subproduto do refino do zinco (concentra-se em poeiras de forno) e de cinzas volantes de carvão. Purificado por destilação de GeCl₄, hidrólise a GeO₂ e redução com H₂. Refino de zona para Ge eletrônico."},
  {numero:33, simbolo:"As", nome:"Arsênio",       grupo:15, periodo:4, cat:"Semimetal",             obtencao:"Subproduto da tostação de sulfetos de cobre, chumbo e ouro que contêm arsenopirita (FeAsS). O As₂O₃ (arsenolite) sublima e é condensado. Arsênio metálico obtido por redução de As₂O₃ com carbono."},
  {numero:34, simbolo:"Se", nome:"Selênio",       grupo:16, periodo:4, cat:"Não-metal",             obtencao:"Recuperado da lama anódica do refino eletrolítico do cobre (onde o Se se concentra como CuSeO₃). A lama é fundida com Na₂CO₃, lixiviada e o selenito precipitado por acidificação, depois reduzido com SO₂."},
  {numero:35, simbolo:"Br", nome:"Bromo",         grupo:17, periodo:4, cat:"Halogênio",             obtencao:"De salmouras naturais (Israel — Mar Morto, EUA) por oxidação de Br⁻ com Cl₂ e destilação a vapor (processo de deslocamento de halogênio). O processo Ethyl Corporation usa salmouras do Golfo do México."},
  {numero:36, simbolo:"Kr", nome:"Criptônio",     grupo:18, periodo:4, cat:"Gás nobre",             obtencao:"Subproduto da destilação fracionada do ar líquido (concentra-se no resíduo junto com Xe). Separado do Xe por adsorção seletiva em carvão ativo a temperatura de N₂ líquido ou por nova destilação fracionada."},
  {numero:37, simbolo:"Rb", nome:"Rubídio",       grupo:1,  periodo:5, cat:"Metal alcalino",        obtencao:"Subproduto do processamento da lepidolita (lítio) e da polucita (césio). Separado por troca iônica ou cromatografia. O Rb metálico é obtido por redução de RbCl com Ca ou pelo método de getters em sistemas de vácuo."},
  {numero:38, simbolo:"Sr", nome:"Estrôncio",     grupo:2,  periodo:5, cat:"Metal alcalino-terroso", obtencao:"Do mineral celestita (SrSO₄) por conversão a SrCO₃ (tratamento com Na₂CO₃) e subsequente redução aluminotérmica de SrO a ~1 000 °C em vácuo. Também por eletrólise do SrCl₂ fundido."},
  {numero:39, simbolo:"Y",  nome:"Ítrio",         grupo:3,  periodo:5, cat:"Metal de transição",    obtencao:"De concentrados de terras raras (bastnasita, xenotímio) por extração líquido-líquido com D2EHPA ou EHEHPA. O Y metálico é obtido por redução de YF₃ com Ca metálico em forno a vácuo."},
  {numero:40, simbolo:"Zr", nome:"Zircônio",      grupo:4,  periodo:5, cat:"Metal de transição",    obtencao:"Do zircão (ZrSiO₄) por cloração com C e Cl₂ a ~900 °C para obter ZrCl₄, seguida de redução com Mg (processo Kroll, análogo ao titânio). A separação do Hf é obrigatória para uso nuclear."},
  {numero:41, simbolo:"Nb", nome:"Nióbio",        grupo:5,  periodo:5, cat:"Metal de transição",    obtencao:"Da pirocloro [(Ca,Na)₂Nb₂O₆(OH,F)] — jazidas de Araxá (MG) e Catalão (GO), Brasil. Concentrado por flotação, reduzido aluminotermicamente a Nb metálico. O ferronióbio é o produto comercial principal."},
  {numero:42, simbolo:"Mo", nome:"Molibdênio",    grupo:6,  periodo:5, cat:"Metal de transição",    obtencao:"Da molibdenita (MoS₂) por flotação (concentrado) e tostação a MoO₃, depois reduzida com H₂ a ~1 100 °C para Mo metálico. Subproduto da mineração de cobre pórfiro (Cu-Mo). Principais produtores: China, EUA, Chile."},
  {numero:43, simbolo:"Tc", nome:"Tecnécio",      grupo:7,  periodo:5, cat:"Metal de transição",    obtencao:"Produzido em reatores nucleares pela fissão de U-235 (rendimento de fissão ~6%). O Tc-99m (t½ = 6,01 h) é obtido de geradores Mo-99/Tc-99m: o Mo-99 (t½ = 65,9 h) adsorve em alumina e o Tc-99m é eluído com solução salina. É o radionuclídeo mais usado em medicina nuclear (~40 milhões de exames/ano)."},
  {numero:44, simbolo:"Ru", nome:"Rutênio",       grupo:8,  periodo:5, cat:"Metal de transição",    obtencao:"Subproduto do refino dos metais do grupo da platina (PGMs) a partir de concentrados de Norilsk (Rússia) e Merensky Reef (África do Sul). Separado por destilação do tetróxido RuO₄, depois reduzido com H₂."},
  {numero:45, simbolo:"Rh", nome:"Ródio",         grupo:9,  periodo:5, cat:"Metal de transição",    obtencao:"Subproduto do refino dos PGMs (Pt, Pd). Concentra-se na lama de refino do Ni/Cu. Separado por extração seletiva com TBP e outros extratantes, depois precipitado como (NH₄)₃[RhCl₆] e calcinado/reduzido."},
  {numero:46, simbolo:"Pd", nome:"Paládio",       grupo:10, periodo:5, cat:"Metal de transição",    obtencao:"Subproduto do refino do Pt e Ni. Os maiores produtores são Rússia (Norilsk Nickel) e África do Sul (Anglo American Platinum). Separado por dissolução seletiva em HCl/Cl₂ e precipitação como Pd(NH₃)₂Cl₂."},
  {numero:47, simbolo:"Ag", nome:"Prata",         grupo:11, periodo:5, cat:"Metal de transição",    obtencao:"Principalmente como subproduto do refino eletrolítico do cobre (lama anódica), zinco e chumbo (por copelação). A prata nativa é rara; a maior parte provém de argento-galena e argentita (Ag₂S)."},
  {numero:48, simbolo:"Cd", nome:"Cádmio",        grupo:12, periodo:5, cat:"Metal de transição",    obtencao:"Exclusivamente como subproduto do refino do zinco: o Cd se concentra no pó de tostação (Cd_gaseificado a ~767 °C) e é recuperado por condensação seletiva e eletrólise de solução de CdSO₄."},
  {numero:49, simbolo:"In", nome:"Índio",         grupo:13, periodo:5, cat:"Metal representativo",  obtencao:"Subproduto do refino hidrometalúrgico do zinco — concentra-se nas lamas e resíduos ácidos. Recuperado por extração com D2EHPA seguida de eletrólise de In₂(SO₄)₃. Produção mundial: ~900 toneladas/ano."},
  {numero:50, simbolo:"Sn", nome:"Estanho",       grupo:14, periodo:5, cat:"Metal representativo",  obtencao:"Da cassiterita (SnO₂) por redução com carbono em forno de reverberação a ~1 300 °C (processo pirometalúrgico clássico). O Sn fundido é refinado por liquação e eletrólise para remover Cu, Pb, Bi e As."},
  {numero:51, simbolo:"Sb", nome:"Antimônio",     grupo:15, periodo:5, cat:"Semimetal",             obtencao:"Da estibina (Sb₂S₃) por precipitação com ferro ('ferro-processo'), ou por tostação a Sb₂O₃ e redução com carbono. A China produz ~80% do antimônio mundial. Refinado por fusão de zona para Sb eletrônico."},
  {numero:52, simbolo:"Te", nome:"Telúrio",       grupo:16, periodo:5, cat:"Semimetal",             obtencao:"Quase exclusivamente como subproduto do refino eletrolítico do cobre (lama anódica). O TeO₂ é extraído por dissolução alcalina, acidificado para precipitar TeO₂, e reduzido com SO₂ ou eletrólise."},
  {numero:53, simbolo:"I",  nome:"Iodo",          grupo:17, periodo:5, cat:"Halogênio",             obtencao:"De salmouras petrolíferas (Japão — Chiba; Chile — deserto do Atacama) por oxidação do I⁻ com Cl₂ ou H₂O₂ e sopro de vapor. O Chile domina >60% da produção mundial pela concentração em depósitos de salitre (NaNO₃)."},
  {numero:54, simbolo:"Xe", nome:"Xenônio",       grupo:18, periodo:5, cat:"Gás nobre",             obtencao:"Subproduto da destilação do ar líquido — concentra-se no resíduo com Kr. Separado por adsorção seletiva em sílica-gel a −100 °C. O Xe (0,0000087% do ar) é o mais raro dos gases nobres obtidos do ar."},
  {numero:55, simbolo:"Cs", nome:"Césio",         grupo:1,  periodo:6, cat:"Metal alcalino",        obtencao:"Do mineral polucita (Cs₄Al₄Si₉O₂₆·H₂O) de Bernic Lake, Manitoba, Canadá (maior depósito mundial). Cs metálico por redução de CsCl com cálcio a alta temperatura, sob vácuo, e destilação fracionada."},
  {numero:56, simbolo:"Ba", nome:"Bário",         grupo:2,  periodo:6, cat:"Metal alcalino-terroso", obtencao:"Da barita (BaSO₄) por redução com carvão a BaS (processo de bário negro), depois convertida em BaCl₂ e eletrolisada em estado fundido. Ba metálico puro também por redução aluminotérmica de BaO."},
  {numero:72, simbolo:"Hf", nome:"Háfnio",        grupo:4,  periodo:6, cat:"Metal de transição",    obtencao:"Sempre coexiste com Zr em minerais. Separado por destilação fracionada de ZrCl₄/HfCl₄ ou extração líquido-líquido com TBP (tributilfosfato) em HNO₃. O HfCl₄ é reduzido com Mg (processo Kroll adaptado)."},
  {numero:73, simbolo:"Ta", nome:"Tântalo",       grupo:5,  periodo:6, cat:"Metal de transição",    obtencao:"Do coltan (columbita-tantalita) da RDC, Ruanda e Brasil. O Ta₂O₅ é separado do Nb₂O₅ por extração com MIBK (metil-isobutil-cetona) em HF/H₂SO₄. O Ta metálico é obtido por redução de K₂TaF₇ com sódio."},
  {numero:74, simbolo:"W",  nome:"Tungstênio",    grupo:6,  periodo:6, cat:"Metal de transição",    obtencao:"Da scheelita (CaWO₄) e volframita [(Fe,Mn)WO₄] por digestão alcalina para Na₂WO₄, precipitação de WO₃, e redução com H₂ a ~850 °C. A China produz ~80% do tungstênio mundial."},
  {numero:75, simbolo:"Re", nome:"Rênio",         grupo:7,  periodo:6, cat:"Metal de transição",    obtencao:"Subproduto do processamento da molibdenita: na tostação oxidante, o Re volatiliza como Re₂O₇, que é capturado nos gases de combustão por absorção em água e precipitado como NH₄ReO₄. Chile e Cazaquistão são produtores."},
  {numero:76, simbolo:"Os", nome:"Ósmio",         grupo:8,  periodo:6, cat:"Metal de transição",    obtencao:"Subproduto do refino dos PGMs (Norilsk, Bushveld Complex). Separado por destilação do OsO₄ volátil (f.e. 130 °C) em solução de HNO₃/HClO₄, depois reduzido com H₂. Produção: ~1 tonelada/ano."},
  {numero:77, simbolo:"Ir", nome:"Irídio",        grupo:9,  periodo:6, cat:"Metal de transição",    obtencao:"Subproduto do refino dos PGMs no Bushveld Complex (África do Sul) e Norilsk (Rússia). Separado do Pt e Rh por dissolução seletiva em água régia, precipitação e redução. Produção: ~7–10 toneladas/ano."},
  {numero:78, simbolo:"Pt", nome:"Platina",       grupo:10, periodo:6, cat:"Metal de transição",    obtencao:"Principalmente do Bushveld Complex (África do Sul, ~75% mundial) e de depósitos de Ni-Cu (Norilsk, Rússia). Extraída de concentrados de PGMs por dissolução em água régia e precipitação seletiva de (NH₄)₂[PtCl₆]."},
  {numero:79, simbolo:"Au", nome:"Ouro",          grupo:11, periodo:6, cat:"Metal de transição",    obtencao:"Mineração de ouro nativo ou dissolvido em soluções de cianeto de sódio (processo MacArthur-Forrest). O Au é recuperado por cimentação com zinco (processo Merrill-Crowe) ou por adsorção em carvão ativo (CIL/CIP)."},
  {numero:80, simbolo:"Hg", nome:"Mercúrio",      grupo:12, periodo:6, cat:"Metal de transição",    obtencao:"Do cinábrio (HgS) por tostação oxidante (HgS + O₂ → Hg + SO₂) e condensação do vapor de Hg. A produção está em declínio por restrições ambientais (Convenção de Minamata, 2013). China e Quirguistão principais produtores."},
  {numero:81, simbolo:"Tl", nome:"Tálio",         grupo:13, periodo:6, cat:"Metal representativo",  obtencao:"Subproduto da tostação de sulfetos de Zn, Pb e Cu e do processamento de pirita. Concentrado em poeiras de câmaras de Cottrell. O Tl metálico é obtido por eletrólise de solução de TlSO₄ ou por redução química."},
  {numero:82, simbolo:"Pb", nome:"Chumbo",        grupo:14, periodo:6, cat:"Metal representativo",  obtencao:"Da galena (PbS) por concentração (flotação), tostação a PbO, e redução com coque em forno de cuba. O Pb é refinado por pirometalurgia (processo Harris para As/Sn/Sb) e desplatinizado (processo Parkes com Zn)."},
  {numero:83, simbolo:"Bi", nome:"Bismuto",       grupo:15, periodo:6, cat:"Metal representativo",  obtencao:"Subproduto do refino do chumbo (lamas de copelação) e do cobre. O Bi₂O₃ presente nas escórias é reduzido com carbono. China domina a produção mundial (>80%). Também de bismutinita (Bi₂S₃) em depósitos menores."},
  {numero:84, simbolo:"Po", nome:"Polônio",       grupo:16, periodo:6, cat:"Metal representativo",  obtencao:"Produzido em reatores nucleares por irradiação de Bi-209 com nêutrons (Bi-209 + n → Bi-210 → Po-210). Ocorre em traços em minérios de urânio (produto da cadeia de decaimento do Ra-226). Produção: gramas por ano."},
  {numero:85, simbolo:"At", nome:"Ástato",        grupo:17, periodo:6, cat:"Halogênio",             obtencao:"Produzido em cíclotrons por bombardeio de Bi-209 com partículas α aceleradas a 28 MeV: ²⁰⁹Bi(α,2n)²¹¹At. O At-211 é separado por destilação a seco. Sem ocorrência natural prática; raro na crosta (~25 g estimados)."},
  {numero:86, simbolo:"Rn", nome:"Radônio",       grupo:18, periodo:6, cat:"Gás nobre",             obtencao:"Emanado naturalmente do solo por decaimento do Ra-226 (cadeia U-238). Não produzido industrialmente. Para uso em pesquisa, é coletado por bombeamento do gás desprendido de soluções de Ra-226 em água e crioconcentração."},
  {numero:87, simbolo:"Fr", nome:"Frâncio",       grupo:1,  periodo:7, cat:"Metal alcalino",        obtencao:"Não há produção industrial. Formado em traços por decaimento alfa do actínio-227: ²²⁷Ac → ²²³Fr (t½ = 22 min). Em laboratório, produzido por bombardeio de Au-197 com ¹⁸O acelerado em cíclotron (ISOLDE, CERN)."},
  {numero:88, simbolo:"Ra", nome:"Rádio",         grupo:2,  periodo:7, cat:"Metal alcalino-terroso", obtencao:"Ocorre em minérios de urânio (1 g de Ra por ~7 toneladas de pechblenda). Hoje produzido em reatores por irradiação de Ba-130 ou Ba-132 com nêutrons. O Ra-223 é produzido de geradores Ac-227/Ra-223 para uso médico."},
  {numero:104, simbolo:"Rf", nome:"Rutherfórdio", grupo:4,  periodo:7, cat:"Metal de transição",    obtencao:"²²⁶Ra(¹²C,4n)²⁶⁸Rf tentado; confirmado por ²⁴⁹Cf(¹²C,4n)²⁵⁷Rf (Berkeley, 1969, GHIORSO et al.) e ²⁴²Pu(²²Ne,4n)²⁶⁰Rf (Dubna, 1964, FLEROV et al.). A IUPAC reconheceu prioridade compartilhada em 1997. Dezenas de átomos por experimento; identificados por espectrometria de decaimento-alfa em separadores de retrocesso (separador SHIP/BGS)."},
  {numero:105, simbolo:"Db", nome:"Dúbnio",       grupo:5,  periodo:7, cat:"Metal de transição",    obtencao:"²⁴⁹Cf(¹⁵N,4n)²⁶⁰Db (Berkeley, 1970) ou ²⁴³Am(²²Ne,5n)²⁶⁰Db (Dubna, 1968). Identificado por decaimento alfa em cascata. Poucas dezenas de átomos por experimento."},
  {numero:106, simbolo:"Sg", nome:"Seabórgio",    grupo:6,  periodo:7, cat:"Metal de transição",    obtencao:"²⁴⁹Cf(¹⁸O,4n)²⁶³Sg (Berkeley, 1974, equipe de Ghiorso et al.) ou ²⁰⁶Pb(⁵⁴Cr,xn)Sg por fusão fria (GSI, 1981). Nomeado após mediação da IUPAC sobre disputa Berkeley-Dubna-GSI."},
  {numero:107, simbolo:"Bh", nome:"Bóhrio",       grupo:7,  periodo:7, cat:"Metal de transição",    obtencao:"²⁰⁹Bi(⁵⁴Cr,n)²⁶²Bh por fusão fria (GSI, 1981). O Bh-267 (t½ ≈ 17 s) foi confirmado por GSI e RIKEN. Síntese: separador de velocidades SHIP (GSI) ou GARIS (RIKEN)."},
  {numero:108, simbolo:"Hs", nome:"Hássio",       grupo:8,  periodo:7, cat:"Metal de transição",    obtencao:"²⁰⁸Pb(⁵⁸Fe,n)²⁶⁵Hs por fusão fria (GSI, 1984). Nomeado em 1997 em homenagem ao estado de Hessen (Alemanha), onde fica o GSI. O HsO₄, análogo ao OsO₄, foi detectado em 2002 por cromatografia de gás quente."},
  {numero:109, simbolo:"Mt", nome:"Meitnério",    grupo:9,  periodo:7, cat:"Metal de transição",    obtencao:"²⁰⁹Bi(⁵⁸Fe,n)²⁶⁶Mt por fusão fria (GSI, 1982). Um único átomo foi detectado. O isótopo mais estável, Mt-278, tem t½ ≈ 4,5 s. Sintetizado em separadores de velocidade tipo SHIP."},
  {numero:110, simbolo:"Ds", nome:"Darmstádtio",  grupo:10, periodo:7, cat:"Metal de transição",    obtencao:"²⁰⁸Pb(⁶²Ni,n)²⁶⁹Ds por fusão fria (GSI, 1994). Nomeado em 2003 em homenagem a Darmstadt, cidade onde fica o GSI. O Ds-281 (t½ ≈ 12,7 s) é o isótopo mais estável identificado."},
  {numero:111, simbolo:"Rg", nome:"Roentgênio",   grupo:11, periodo:7, cat:"Metal de transição",    obtencao:"²⁰⁹Bi(⁶⁴Ni,n)²⁷²Rg por fusão fria (GSI, 1994). Confirmado pela IUPAC em 2004. Nomeado em 2004 em homenagem a Wilhelm Röntgen, primeiro ganhador do Nobel de Física (1901). O Rg-282 tem t½ ≈ 100 s."},
  {numero:112, simbolo:"Cn", nome:"Copernício",   grupo:12, periodo:7, cat:"Metal de transição",    obtencao:"²⁰⁸Pb(⁷⁰Zn,n)²⁷⁷Cn por fusão fria (GSI, 1996). Confirmado pela IUPAC em 2010. Nomeado em homenagem a Nicolau Copérnico. O Cn-285 (t½ ≈ 29 s) é o isótopo mais estável."},
  {numero:113, simbolo:"Nh", nome:"Nihônio",      grupo:13, periodo:7, cat:"Metal representativo",  obtencao:"²⁰⁹Bi(⁷⁰Zn,n)²⁷⁸Nh por fusão fria (RIKEN, Japão, 2004). A confirmação pela IUPAC em dezembro de 2015 concedeu ao RIKEN o direito de nomeação — primeiro elemento descoberto na Ásia. O Nh-286 tem t½ ≈ 9,5 s."},
  {numero:114, simbolo:"Fl", nome:"Fleróvio",     grupo:14, periodo:7, cat:"Metal representativo",  obtencao:"²⁴⁴Pu(⁴⁸Ca,3-4n)²⁸⁸⁻²⁸⁹Fl por fusão quente (JINR Dubna + LLNL, 1999–2004). Nomeado em 2012 em homenagem ao Laboratório Flerov de Reações Nucleares (JINR). Isótopo mais estável: Fl-289 (t½ ≈ 1,9 s)."},
  {numero:115, simbolo:"Mc", nome:"Moscóvio",     grupo:15, periodo:7, cat:"Metal representativo",  obtencao:"²⁴³Am(⁴⁸Ca,3-4n)²⁸⁷⁻²⁸⁸Mc (JINR Dubna + LLNL, 2003). Confirmado pela IUPAC em 2015. Nomeado em 2016 em homenagem à Oblast de Moscou. Isótopo mais estável: Mc-290 (t½ ≈ 0,65 s)."},
  {numero:116, simbolo:"Lv", nome:"Livermório",   grupo:16, periodo:7, cat:"Metal representativo",  obtencao:"²⁴⁸Cm(⁴⁸Ca,3-4n)²⁹²⁻²⁹³Lv (JINR Dubna + LLNL, 2000). Nomeado em 2012 em homenagem ao Lawrence Livermore National Laboratory (EUA). Isótopo mais estável: Lv-293 (t½ ≈ 57 ms)."},
  {numero:117, simbolo:"Ts", nome:"Tenessino",    grupo:17, periodo:7, cat:"Halogênio",             obtencao:"²⁴⁹Bk(⁴⁸Ca,3-4n)²⁹³⁻²⁹⁴Ts (JINR Dubna + ORNL/Vanderbilt, 2010). O Bk-249 foi produzido em 250 dias no reator HFIR do ORNL. Confirmado pela IUPAC em 2015. Ts-294 tem t½ ≈ 51 ms."},
  {numero:118, simbolo:"Og", nome:"Oganessônio",  grupo:18, periodo:7, cat:"Gás nobre",             obtencao:"²⁴⁹Cf(⁴⁸Ca,3n)²⁹⁴Og (JINR Dubna + LLNL, 2002–2005, 3 átomos). Confirmado pela IUPAC em 2015. Nomeado em 2016 em homenagem a Yuri Oganessian, pioneiro da síntese de elementos superpesados. Og-294 tem t½ ≈ 0,89 ms."}
];
const lantanideos = [
  {numero:57, simbolo:"La", nome:"Lantânio",    grupo:4,  cat:"Lantanídeo", obtencao:"Da bastnasita [(Ce,La,Nd)CO₃F] e monazita [(Ce,La,Nd,Th)PO₄] por digestão ácida ou alcalina. O La³⁺ é separado por troca iônica ou extração líquido-líquido com D2EHPA (ácido di-2-etilexilfosfórico). La metálico por eletrólise de LaF₃/LiF fundidos."},
  {numero:58, simbolo:"Ce", nome:"Cério",       grupo:5,  cat:"Lantanídeo", obtencao:"O mais abundante dos lantanídeos (~68 ppm na crosta). Obtido da bastnasita por tostação, lixiviação ácida e extração seletiva de Ce⁴⁺ (único lantanídeo estável no estado +4) por oxidação com KMnO₄ e precipitação de Ce(OH)₄."},
  {numero:59, simbolo:"Pr", nome:"Praseodímio", grupo:6,  cat:"Lantanídeo", obtencao:"Separado do Ce e Nd por extração líquido-líquido em processo de múltiplos estágios com D2EHPA ou EHEHPA em HNO₃. O Pr metálico é obtido por redução de PrF₃ com Ca ou por eletrólise de PrCl₃/KCl fundidos."},
  {numero:60, simbolo:"Nd", nome:"Neodímio",    grupo:7,  cat:"Lantanídeo", obtencao:"Da bastnasita e monazita por extração multistágio. O Nd é separado do La, Pr e Sm em colunas de extração líquido-líquido com 2-etilexilfosfato (P507). O Nd metálico é obtido por eletrólise de NdF₃/LiF fundidos a ~1 000 °C."},
  {numero:61, simbolo:"Pm", nome:"Promécio",    grupo:8,  cat:"Lantanídeo", obtencao:"Produzido em reatores nucleares por fissão de U-235 (rendimento ~2,6%) e pelo decaimento do Nd-147 (captura de nêutron). Separado de outros produtos de fissão por troca iônica em HDEHP/Dowex-50. Sem ocorrência natural prática."},
  {numero:62, simbolo:"Sm", nome:"Samário",     grupo:9,  cat:"Lantanídeo", obtencao:"Separado das terras raras pesadas da bastnasita/monazita por extração com D2EHPA após remoção dos lantanídeos leves (La, Ce, Pr, Nd). O Sm metálico é obtido por redução de SmO com lantânio ou por eletrólise de SmCl₃/KCl fundidos."},
  {numero:63, simbolo:"Eu", nome:"Európio",     grupo:10, cat:"Lantanídeo", obtencao:"Separado seletivamente pelo aproveitamento do estado +2 do Eu (único lantanídeo com +2 estável em solução aquosa): redução com Zn amalgamado em HCl precipita Eu²⁺ como EuSO₄, enquanto os outros lantanídeos permanecem em solução como M³⁺."},
  {numero:64, simbolo:"Gd", nome:"Gadolínio",   grupo:11, cat:"Lantanídeo", obtencao:"Separado da fração de terras raras pesadas da bastnasita e de minerais de Gd como gadolinita [Be₂FeY₂Si₂O₁₀] por extração com EHEHPA. O Gd metálico é obtido por redução de GdF₃ com Ca a alta temperatura em vácuo."},
  {numero:65, simbolo:"Tb", nome:"Térbio",      grupo:12, cat:"Lantanídeo", obtencao:"Separado junto com as terras raras pesadas (Dy, Ho, Er, Tm, Yb, Lu) da bastnasita/xenotímio por múltiplos estágios de extração. Purificado por aproveitamento da oxidação a Tb⁴⁺ em meio alcalino forte. Produção: ~10 toneladas/ano."},
  {numero:66, simbolo:"Dy", nome:"Disprósio",   grupo:13, cat:"Lantanídeo", obtencao:"Obtido principalmente do xenotímio [(Y,Er,Dy,...)PO₄] e da bastnasita por extração em cascata. A separação Dy/Ho é uma das mais difíceis na química das terras raras (raios iônicos quasi-idênticos). China domina ~90% da produção."},
  {numero:67, simbolo:"Ho", nome:"Hólmio",      grupo:14, cat:"Lantanídeo", obtencao:"Separado do Dy e Er por extração em colunas de HDEHP sobre sílica ou por troca iônica em resinas quelantes. O Ho metálico é obtido por redução de HoF₃ com Ca em vácuo. Produção mundial: ~10 toneladas/ano."},
  {numero:68, simbolo:"Er", nome:"Érbio",       grupo:15, cat:"Lantanídeo", obtencao:"Obtido do xenotímio e de concentrate de terras raras pesadas por extração líquido-líquido com P507 em HCl. Após separação do Ho e Tm, ErCl₃ é precipitado e calcinado a Er₂O₃. Metálico por redução com Ca ou eletrólise de fluoretos fundidos."},
  {numero:69, simbolo:"Tm", nome:"Túlio",       grupo:16, cat:"Lantanídeo", obtencao:"Mais raro dos lantanídeos (~0,52 ppm). Separado das frações pesadas de xenotímio e euxênio [Y(Nb,Ti,Ta)O₄] por extração multistágio. O Tm metálico é obtido por redução de TmF₃ com Ca a >1 000 °C em vácuo. Produção: <50 t/ano."},
  {numero:70, simbolo:"Yb", nome:"Itérbio",     grupo:17, cat:"Lantanídeo", obtencao:"Separado das terras raras pesadas por extração com P507 em HCl em colunas contínuas de mixer-settler. A separação Yb/Lu é facilitada pela diferença de raio iônico (~3 pm). O Yb metálico é obtido por redução de YbF₃ com Ca."},
  {numero:71, simbolo:"Lu", nome:"Lutécio",     grupo:18, cat:"Lantanídeo", obtencao:"Lantanídeo mais pesado, mais caro e mais difícil de separar. Concentra-se no xenotímio (~5%). A separação Lu/Yb exige >100 estágios de extração. O Lu metálico é obtido por redução de LuF₃ com Ca e destilação a vácuo a ~1 400 °C."}
];
const actinideos = [
  {numero:89,  simbolo:"Ac", nome:"Actínio",     grupo:4,  cat:"Actinídeo", obtencao:"Ocorre em traços em minérios de urânio como produto da cadeia de decaimento do U-235 (Ac-227). Produzido em reatores por irradiação de Ra-226 com nêutrons: Ra-226(n,γ)Ra-227 → Ac-227. Separado por extração com TTA ou HDEHP em HNO₃."},
  {numero:90,  simbolo:"Th", nome:"Tório",       grupo:5,  cat:"Actinídeo", obtencao:"Da monazita [(Ce,Th)PO₄] por digestão com NaOH a 140 °C (processo alcalino) ou com H₂SO₄ concentrado. O Th(OH)₄ é precipitado e convertido a ThO₂. O Th metálico é obtido por redução de ThF₄ com Ca a alta temperatura."},
  {numero:91,  simbolo:"Pa", nome:"Protactínio", grupo:6,  cat:"Actinídeo", obtencao:"Produto intermediário da cadeia de decaimento do U-235 (Pa-231, t½ = 32 760 anos). Em 1961, 125 g de Pa-231 foram isolados de ~60 toneladas de resíduos de refino de urânio pelo UKAEA, Harwell. Separado por extração com TBP em HF/HNO₃."},
  {numero:92,  simbolo:"U",  nome:"Urânio",      grupo:7,  cat:"Actinídeo", obtencao:"Da uraninita/pechblenda (UO₂) ou carnotita [K₂(UO₂)₂(VO₄)₂] por lixiviação em H₂SO₄ ou Na₂CO₃. Purificado por extração com TBP em parafina (processo PUREX), precipitado como UO₂(NO₃)₂ e calcinado a UO₃. Reduzido a UF₄ e depois a U com Ca ou Mg."},
  {numero:93,  simbolo:"Np", nome:"Netúnio",     grupo:8,  cat:"Actinídeo", obtencao:"Subproduto de reatores nucleares: U-238(n,γ)U-239 → Np-239 → Pu-239. O Np-237 (t½ = 2,14 × 10⁶ anos) acumula-se no combustível irradiado e é separado no processo PUREX por ajuste de valência e extração seletiva com TBP."},
  {numero:94,  simbolo:"Pu", nome:"Plutônio",    grupo:9,  cat:"Actinídeo", obtencao:"Produzido em reatores: U-238(n,γ)U-239(β⁻)Np-239(β⁻)Pu-239. Separado do U e produtos de fissão pelo processo PUREX (extração com TBP em parafina): o Pu⁴⁺ e U⁶⁺ são co-extraídos, depois o Pu é reduzido a Pu³⁺ e re-extraído seletivamente."},
  {numero:95,  simbolo:"Am", nome:"Amerício",    grupo:10, cat:"Actinídeo", obtencao:"Produzido em reatores de alta fluxo de nêutrons: Pu-239(n,γ)Pu-240(n,γ)Pu-241(β⁻)Am-241. Separado do Pu por precipitação de Am(OH)₃ ou por extração com HDEHP. O Am-243 é obtido por irradiação prolongada do Am-241."},
  {numero:96,  simbolo:"Cm", nome:"Cúrio",       grupo:11, cat:"Actinídeo", obtencao:"Produzido em reatores de fluxo ultra-alto: Am-241(n,γ)Am-242m(n,γ)Am-243(n,γ)Cm-244. Separado por extração com HDEHP em HNO₃ (processo TALSPEAK) ou por cromatografia de troca iônica com α-HIBA. Principal isotopo de produção: Cm-244."},
  {numero:97,  simbolo:"Bk", nome:"Berquélio",   grupo:12, cat:"Actinídeo", obtencao:"Produzido no reator HFIR (Oak Ridge National Laboratory, EUA) por irradiação intensa de Am-243 com nêutrons: Am-243(n,γ)Am-244(β⁻)Cm-244(n,γ)...Bk-249. Ciclo de ~250 dias. Separado por cromatografia de troca iônica. Produção: ~mg/ciclo."},
  {numero:98,  simbolo:"Cf", nome:"Califórnio",  grupo:13, cat:"Actinídeo", obtencao:"Produzido no HFIR (ORNL) e no reator SM-3 (RIAR, Rússia) por irradiação de Cm-244/245 com nêutrons, seguida de múltiplas capturas. Separado por cromatografia de troca iônica com citrato de amônio. Produção mundial: ~500 μg/ano (Cf-252)."},
  {numero:99,  simbolo:"Es", nome:"Einstênio",   grupo:14, cat:"Actinídeo", obtencao:"Produzido em quantidade de nanogramas por irradiação de Pu-239 com fluxos de nêutrons muito altos no HFIR (ORNL): requer ~15 capturas de nêutrons sucessivas por U-238. Separado por cromatografia de troca iônica com α-HIBA."},
  {numero:100, simbolo:"Fm", nome:"Férmio",      grupo:15, cat:"Actinídeo", obtencao:"Produzido em quantidades de picogramas no HFIR (ORNL) por irradiação de alvos de Es. Também identificado nos detritos de testes nucleares (Ivy Mike, 1952). Separado por cromatografia de troca iônica. Sem aplicações fora da pesquisa básica."},
  {numero:101, simbolo:"Md", nome:"Mendelévio",  grupo:16, cat:"Actinídeo", obtencao:"Produzido por bombardeio de Es-253 com partículas α de 41 MeV em cíclotron: ²⁵³Es(α,n)²⁵⁶Md. Primeira síntese (1955): 17 átomos identificados por migração química em resina de troca iônica com α-HIBA."},
  {numero:102, simbolo:"No", nome:"Nobélio",     grupo:17, cat:"Actinídeo", obtencao:"Síntese confirmada: ²⁰⁶Pb(⁴⁸Ca,2n)²⁵²No (Dubna, 1966, Flerov et al.) e ²⁴⁸Cm(¹²C,4n)²⁵⁶No (Berkeley). Identificado por migração eletroquímica em cromatografia de troca iônica. O No²⁺ é estável em solução aquosa — anomalia entre actinídeos."},
  {numero:103, simbolo:"Lr", nome:"Laurêncio",   grupo:18, cat:"Actinídeo", obtencao:"Síntese original: ²⁵²Cf(¹⁰B,n)²⁵⁸Lr e (¹¹B,2n)²⁵⁸Lr (Berkeley, 1961). Reconfirmado: ²⁵¹Cf(¹¹B,n)²⁵⁸Lr. Identificado por captura de recuo em fita de cobre e detecção alfa. O Lr-266 (t½ = 11 h) é o isótopo mais estável."}
];
const RAIO = {
  // --- Período 1 ---
  1: {r:31,  t:'cov', f:'P09'},
  2: {r:140, t:'vdW', f:'Alv13'},
  // --- Período 2 ---
  3: {r:128, t:'cov', f:'C08'},   // Li
  4: {r:96,  t:'cov', f:'C08'},   // Be
  5: {r:84,  t:'cov', f:'C08'},   // B
  6: {r:77,  t:'cov', f:'C08'},   // C
  7: {r:71,  t:'cov', f:'C08'},   // N
  8: {r:66,  t:'cov', f:'C08'},   // O
  9: {r:64,  t:'cov', f:'C08'},   // F
  10:{r:154, t:'vdW', f:'Alv13'}, // Ne 
  // --- Período 3 ---
  11:{r:166, t:'cov', f:'C08'},   // Na
  12:{r:141, t:'cov', f:'C08'},   // Mg
  13:{r:121, t:'cov', f:'C08'},   // Al
  14:{r:111, t:'cov', f:'C08'},   // Si
  15:{r:107, t:'cov', f:'C08'},   // P
  16:{r:105, t:'cov', f:'C08'},   // S
  17:{r:102, t:'cov', f:'C08'},   // Cl
  18:{r:188, t:'vdW', f:'Alv13'}, // Ar 
  // --- Período 4 ---
  19:{r:203, t:'cov', f:'C08'},   // K
  20:{r:176, t:'cov', f:'C08'},   // Ca
  21:{r:170, t:'cov', f:'C08'},   // Sc
  22:{r:160, t:'cov', f:'C08'},   // Ti
  23:{r:153, t:'cov', f:'C08'},   // V
  24:{r:139, t:'cov', f:'C08'},   // Cr 
  25:{r:139, t:'cov', f:'C08'},   // Mn 
  26:{r:132, t:'cov', f:'C08'},   // Fe 
  27:{r:126, t:'cov', f:'C08'},   // Co 
  28:{r:124, t:'cov', f:'C08'},   // Ni
  29:{r:132, t:'cov', f:'C08'},   // Cu
  30:{r:122, t:'cov', f:'C08'},   // Zn
  31:{r:122, t:'cov', f:'C08'},   // Ga
  32:{r:120, t:'cov', f:'C08'},   // Ge
  33:{r:119, t:'cov', f:'C08'},   // As
  34:{r:120, t:'cov', f:'C08'},   // Se
  35:{r:120, t:'cov', f:'C08'},   // Br
  36:{r:202, t:'vdW', f:'Alv13'}, // Kr
  // --- Período 5 ---
  37:{r:220, t:'cov', f:'C08'},   // Rb
  38:{r:195, t:'cov', f:'C08'},   // Sr
  39:{r:190, t:'cov', f:'C08'},   // Y
  40:{r:175, t:'cov', f:'C08'},   // Zr
  41:{r:164, t:'cov', f:'C08'},   // Nb
  42:{r:154, t:'cov', f:'C08'},   // Mo
  43:{r:147, t:'cov', f:'C08'},   // Tc
  44:{r:146, t:'cov', f:'C08'},   // Ru
  45:{r:142, t:'cov', f:'C08'},   // Rh
  46:{r:139, t:'cov', f:'C08'},   // Pd
  47:{r:145, t:'cov', f:'C08'},   // Ag
  48:{r:144, t:'cov', f:'C08'},   // Cd
  49:{r:142, t:'cov', f:'C08'},   // In
  50:{r:139, t:'cov', f:'C08'},   // Sn
  51:{r:139, t:'cov', f:'C08'},   // Sb
  52:{r:138, t:'cov', f:'C08'},   // Te
  53:{r:139, t:'cov', f:'C08'},   // I
  54:{r:216, t:'vdW', f:'Alv13'}, // Xe
  // --- Período 6 ---
  55:{r:244, t:'cov', f:'C08'},   // Cs
  56:{r:215, t:'cov', f:'C08'},   // Ba
  // Lantanídeos (Z 57–71): Cordero 2008
  57:{r:207, t:'cov', f:'C08'},   // La
  58:{r:204, t:'cov', f:'C08'},   // Ce
  59:{r:203, t:'cov', f:'C08'},   // Pr
  60:{r:201, t:'cov', f:'C08'},   // Nd
  61:{r:199, t:'cov', f:'C08'},   // Pm
  62:{r:198, t:'cov', f:'C08'},   // Sm
  63:{r:198, t:'cov', f:'C08'},   // Eu
  64:{r:196, t:'cov', f:'C08'},   // Gd
  65:{r:194, t:'cov', f:'C08'},   // Tb
  66:{r:192, t:'cov', f:'C08'},   // Dy
  67:{r:192, t:'cov', f:'C08'},   // Ho
  68:{r:189, t:'cov', f:'C08'},   // Er
  69:{r:190, t:'cov', f:'C08'},   // Tm
  70:{r:187, t:'cov', f:'C08'},   // Yb
  71:{r:187, t:'cov', f:'C08'},   // Lu
  72:{r:175, t:'cov', f:'C08'},   // Hf
  73:{r:170, t:'cov', f:'C08'},   // Ta
  74:{r:162, t:'cov', f:'C08'},   // W
  75:{r:151, t:'cov', f:'C08'},   // Re
  76:{r:144, t:'cov', f:'C08'},   // Os
  77:{r:141, t:'cov', f:'C08'},   // Ir
  78:{r:136, t:'cov', f:'C08'},   // Pt
  79:{r:136, t:'cov', f:'C08'},   // Au
  80:{r:132, t:'cov', f:'C08'},   // Hg
  81:{r:145, t:'cov', f:'C08'},   // Tl
  82:{r:146, t:'cov', f:'C08'},   // Pb
  83:{r:148, t:'cov', f:'C08'},   // Bi
  84:{r:140, t:'cov', f:'C08'},   // Po
  85:{r:150, t:'cov', f:'C08'},   // At
  86:{r:220, t:'vdW', f:'Alv13'}, // Rn 
  // --- Período 7 ---
  87:{r:260, t:'cov', f:'P09'},   // Fr
  88:{r:221, t:'cov', f:'P09'},   // Ra
  89:{r:215, t:'cov', f:'P09'},   // Ac
  90:{r:206, t:'cov', f:'P09'},   // Th
  91:{r:200, t:'cov', f:'P09'},   // Pa
  92:{r:196, t:'cov', f:'P09'},   // U
  93:{r:190, t:'cov', f:'P09'},   // Np
  94:{r:187, t:'cov', f:'P09'},   // Pu
  95:{r:180, t:'cov', f:'P09'},   // Am
  96:{r:169, t:'cov', f:'C08'},   // Cm
  97:{r:168, t:'cov', f:'P09'},   // Bk
  98:{r:168, t:'cov', f:'P09'},   // Cf
  99:{r:165, t:'cov', f:'P09'},   // Es
  100:{r:167,t:'cov', f:'P09'},   // Fm
  101:{r:173,t:'cov', f:'P09'},   // Md
  102:{r:176,t:'cov', f:'P09'},   // No
  103:{r:161,t:'cov', f:'P09'},   // Lr
  104:{r:157,t:'cov', f:'P09'},   // Rf
  105:{r:149,t:'cov', f:'P09'},   // Db
  106:{r:143,t:'cov', f:'P09'},   // Sg
  107:{r:141,t:'cov', f:'P09'},   // Bh
  108:{r:134,t:'cov', f:'P09'},   // Hs
  109:{r:129,t:'cov', f:'P09'},   // Mt
  110:{r:128,t:'cov', f:'P09'},   // Ds
  111:{r:121,t:'cov', f:'P09'},   // Rg
  112:{r:122,t:'cov', f:'P09'},   // Cn
  113:{r:136,t:'cov', f:'P09'},   // Nh
  114:{r:143,t:'cov', f:'P09'},   // Fl
  115:{r:162,t:'cov', f:'P09'},   // Mc
  116:{r:175,t:'cov', f:'P09'},   // Lv
  117:{r:165,t:'cov', f:'P09'},   // Ts
  118:{r:157,t:'cov', f:'P09'}    // Og
};
const RAIO_MAX_PM = 260;
const RAIO_TIPO_LABEL = {
  cov: 'Covalente (ligação simples)',
  vdW: 'Van der Waals',
  met: 'Metálico'
};
const RAIO_TIPO_DEF = {
  cov: 'Metade da distância internuclear entre dois átomos idênticos unidos por ligação covalente simples σ. É a medida preferida pela IUPAC para comparações periódicas.',
  vdW: 'Metade da distância mínima entre núcleos de dois átomos do mesmo elemento sem interação covalente ou metálica. Aplicado a gases nobres e moléculas sem ligação.',
  met: 'Metade da distância entre centros de átomos adjacentes na rede cristalina metálica.'
};
const RAIO_FONTE_LABEL = {
  C08:   'Cordero et al., Dalton Trans. 2008, 2832–2838',
  P09:   'Pyykkö & Atsumi, Chem. Eur. J. 15 (2009) 186–197',
  Alv13: 'Alvarez, Dalton Trans. 42 (2013) 8617–8636'
};
function classificarPreenchimento(elCount, maxEl, tipo){
  if(elCount === 0)           return { status:'vazio',          label:'Vazio',                   icon:'○' };
  if(elCount === maxEl)       return { status:'preenchido',      label:'Preenchido',              icon:'●' };
  if(elCount === maxEl / 2)   return { status:'semipreenchido',  label:'Semipreenchido',          icon:'◑' };
  return                       { status:'parcial',              label:'Parcialmente preenchido', icon:'◔' };
}

function ultimoSubnivel(Z){
  const cfg = CONFIG_EC[Z];
  if(!cfg) return null;
  const termos = cfg.replace(/\[[A-Za-z]+\]\s*/,'').trim().split(/\s+/);
  if(!termos.length) return null;
  const ultimo = termos[termos.length - 1];
  const match = ultimo.match(/^(\d[spdf])(.*)$/);
  if(!match) return null;
  const sub = match[1];
  const expStr = match[2];
  const sup2n = {'⁰':0,'¹':1,'²':2,'³':3,'⁴':4,'⁵':5,'⁶':6,'⁷':7,'⁸':8,'⁹':9};
  const elCount = [...expStr].reduce((acc,c)=>{
    const d = sup2n[c]; return d !== undefined ? acc * 10 + d : acc;
  }, 0);
  const tipo = sub[1];
  const bloco = tipo.toUpperCase();
  const n = parseInt(sub[0]);
  const maxEl = {s:2,p:6,d:10,f:14}[tipo]||0;
  const numOrbitais = maxEl / 2;
  const preenche = classificarPreenchimento(elCount, maxEl, tipo);
  return {
    sub, n, tipo, bloco, elCount, maxEl, numOrbitais,
    status:    preenche.status,
    statusLabel: preenche.label,
    statusIcon:  preenche.icon,
    camada: 'KLMNOPQ'[n-1]||'?'
  };
}
function resolverCorCSS(cssVar){
  const val = getComputedStyle(document.documentElement)
                .getPropertyValue(cssVar.replace('var(','').replace(')','').trim())
                .trim();
  return val || '#888';
}
function rgbToHex(str){
  // converts 'rgb(r, g, b)' or '#rrggbb' to '#rrggbb'
  if(!str) return '#888888';
  if(str.startsWith('#')) return str;
  const m = str.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if(m) return '#'+[m[1],m[2],m[3]].map(v=>parseInt(v).toString(16).padStart(2,'0')).join('');
  return '#888888';
}
function corAtomo(bloco, ccHex){
  const varMap = {S:'--orb-s', P:'--orb-p', D:'--orb-d', F:'--orb-f'};
  const v = varMap[bloco];
  if(v){
    const raw = resolverCorCSS(v);
    return rgbToHex(raw);
  }
  return ccHex || '#888888';
}
function propsSubnivel(Z, el, sub){
  if(!sub) return null;
  const bloco  = sub.bloco;
  const status = sub.status;
  const e      = sub.elCount;
  const max    = sub.maxEl;
  let condutiv = '—';
  if(bloco==='S'){
    condutiv = status==='completo'
      ? 'Alta — subnível s completo; elétrons deslocalizados na banda de condução metálica (metais alcalinos e alcalino-terrosos)'
      : 'Alta — 1 e⁻ no subnível s facilmente deslocalizado';
  } else if(bloco==='P'){
    if(status==='completo')
      condutiv = 'Muito baixa a nula — subnível p completo; gap de banda elevado (gás nobre) ou par isolado inativo';
    else if(status==='semipreenchido')
      condutiv = 'Variável — p³ semipreenchido; comportamento de não-metal ou semimetal';
    else if(e <= 2)
      condutiv = 'Moderada — poucos e⁻ no subnível p; caráter metálico ou semimetal (metais pós-transição)';
    else
      condutiv = 'Baixa — subnível p parcialmente preenchido; comportamento de não-metal';
  } else if(bloco==='D'){
    if(status==='completo')
      condutiv = 'Alta — subnível d completo; elétrons d contribuem para a banda de condução (Cu, Ag, Au, Zn, Cd, Hg)';
    else
      condutiv = 'Alta — subnível d parcialmente preenchido; elétrons d parcialmente deslocalizados';
  } else if(bloco==='F'){
    condutiv = status==='completo'
      ? 'Alta — subnível f completo; condução pelos elétrons s de valência (Lu, Lr)'
      : 'Alta — elétrons f altamente localizados; condução predominantemente pelos elétrons 6s ou 7s';
  }
  let desempar = 0;
  const nOrb = max / 2;
  if(e <= nOrb) desempar = e;
  else          desempar = max - e;

  let magnet = '—';
  if(desempar === 0){
    magnet = 'Diamagnético — todos os orbitais do subnível emparelhados (0 e⁻ desemparelhados)';
  } else {
    const plural = desempar === 1 ? '' : 's';
    const intensidade = desempar >= 5 ? 'Fortemente p' : desempar >= 3 ? 'P' : 'P';
    magnet = `${intensidade}aramagnético — ${desempar} e⁻ desemparelhado${plural} `+
             `no subnível ${sub.sub} (${sub.statusLabel})`;
    if(status==='semipreenchido')
      magnet += '; subnível semipreenchido — estabilidade extra por troca (Regra de Hund)';
  }
  let ativid = '—';
  if(bloco==='S'){
    ativid = status==='semipreenchido'
      ? 'Muito alta — 1 e⁻ de valência facilmente cedido; metais alcalinos com potencial de ionização baixo'
      : 'Alta — 2 e⁻ de valência (subnível s completo); metais alcalino-terrosos tendem a ceder os 2 e⁻';
  } else if(bloco==='P'){
    if(status==='completo')
      ativid = 'Muito baixa — subnível p completo (octeto satisfeito); gases nobres praticamente inertes';
    else if(e === max - 1)
      ativid = 'Muito alta — 1 e⁻ para completar o octeto; halogênios com forte tendência a capturar e⁻';
    else if(status==='semipreenchido')
      ativid = 'Moderada — p³ semipreenchido; configuração relativamente estável (N, P, As)';
    else
      ativid = 'Moderada a alta — subnível p parcialmente preenchido; tendência a completar o octeto por ganho ou compartilhamento de e⁻';
  } else if(bloco==='D'){
    if(status==='completo')
      ativid = 'Baixa a moderada — subnível d completo; menor tendência a estados de oxidação elevados (Cu, Ag, Au, Zn)';
    else if(status==='semipreenchido')
      ativid = 'Moderada — subnível d semipreenchido; configuração extra-estável limita a reatividade (Mn, Tc, Re)';
    else
      ativid = 'Moderada — múltiplos estados de oxidação acessíveis pelos orbitais d parcialmente preenchidos';
  } else if(bloco==='F'){
    if(status==='completo')
      ativid = 'Moderada — subnível f completo; estado de oxidação +3 predominante (Lu, Lr, Yb, No)';
    else if(status==='semipreenchido')
      ativid = 'Moderada — subnível f semipreenchido (f⁷); configuração extra-estável (Eu, Gd, Am, Cm)';
    else
      ativid = 'Moderada a alta — subnível f parcialmente preenchido; estado +3 predominante nos lantanídeos, maior variabilidade nos actinídeos';
  }
  let ligacao = '—';
  if(bloco==='S')
    ligacao = 'Ligação metálica — e⁻ s deslocalizados formam a banda de condução';
  else if(bloco==='P'){
    if(status==='completo')
      ligacao = 'Sem ligação química primária — subnível p completo (gás nobre) ou par isolado inativo';
    else if(e <= 2)
      ligacao = 'Ligação metálica — poucos e⁻ p disponíveis (metais pós-transição: Ga, In, Tl, Sn, Pb, Bi)';
    else
      ligacao = 'Ligação covalente (compartilhamento de e⁻ p) ou iônica (transferência para completar o octeto)';
  } else if(bloco==='D'){
    if(status==='completo')
      ligacao = 'Ligação metálica — subnível d completo contribui fracamente para a banda (metais nobres do grupo 11–12)';
    else
      ligacao = 'Ligação metálica — os e⁻ d participam da banda de condução; ligações coordenativas dativas também comuns';
  } else if(bloco==='F'){
    ligacao = 'Ligação metálica — e⁻ f altamente localizados (não participam significativamente da condução); ligações iónicas e covalentes polarizadas comuns';
  }

  return { condutiv, magnet, ativid, ligacao, desempar };
}
function tendenciaRaio(Z, el, sub){
  if(!sub) return { periodo:'', grupo:'', contração:'' };
  const bloco = sub.bloco;
  const tendP = {
    S: `Ao longo do <b>período</b> (→), o número atômico Z aumenta mas não são adicionadas camadas eletrônicas: a carga nuclear efetiva Z<sub>ef</sub> cresce, atraindo os elétrons do subnível <b>${sub.sub}</b> com mais força e <b>contraindo</b> o raio.`,
    P: `No mesmo <b>período</b> (→), cada próton adicionado eleva Z<sub>ef</sub> sobre os elétrons do subnível <b>${sub.sub}</b>. Sem novas camadas, o raio <b>diminui progressivamente</b> da esquerda (bloco s) para a direita (bloco p).`,
    D: `Na série de transição (mesmo período), o elétron extra entra no subnível interno <b>${sub.sub}</b>, que blinda fracamente os elétrons de valência ns. O raio <b>varia pouco e de forma irregular</b> — em geral decresce levemente até os grupos 8–10 e depois se estabiliza ou aumenta ligeiramente.`,
    F: `Na série dos lantanídeos/actinídeos, cada elétron extra entra no subnível interno <b>${sub.sub}</b>, que quase não blinda os demais. Z<sub>ef</sub> cresce continuamente, causando a <b>contração dos lantanídeos</b>: o raio diminui progressivamente ao longo da série.`
  };

  const tendG = {
    S: `Descendo no <b>grupo</b> (↓), adiciona-se uma camada eletrônica completa. Os elétrons do subnível <b>${sub.sub}</b> ficam em n maior, mais distantes do núcleo, e os elétrons internos blindam parcialmente Z<sub>ef</sub>. O raio <b>aumenta significativamente</b>.`,
    P: `Ao <b>descer no grupo</b> (↓), uma nova camada principal é adicionada. Os elétrons do subnível <b>${sub.sub}</b> ocupam valor de n maior: a distância ao núcleo cresce e a blindagem pelas camadas internas atenua Z<sub>ef</sub>, <b>aumentando</b> o raio.`,
    D: `Ao <b>descer no grupo</b> (↓), o subnível d passa de 3d → 4d → 5d. A partir do 5d, efeitos relativísticos comprimem os orbitais s internos, indiretamente contraindo o átomo — por isso o raio de Hf (5d) é quase igual ao de Zr (4d): efeito da <b>contração dos lantanídeos</b>.`,
    F: `O comportamento ao longo do <b>grupo</b> é menos definido para elementos f, pois há apenas duas séries (lantanídeos e actinídeos). Dentro de cada série o raio diminui; os actinídeos tendem a ter raios maiores que os lantanídeos do mesmo grupo por efeitos relativísticos e maior instabilidade nuclear.`
  };

  const contração = bloco==='F'
    ? `<b>Contração dos lantanídeos</b>: o preenchimento progressivo dos orbitais 4f, com fraca blindagem mútua, faz o raio cair de La (207 pm) a Lu (187 pm). Isso explica por que os metais 5d (Hf–Au) têm raios quase idênticos aos seus análogos 4d (Zr–Ag), quebrando a tendência de aumento esperada ao descer no grupo.`
    : bloco==='D' && sub.n>=5
    ? `<b>Efeitos relativísticos</b> nos metais pesados (5d): os elétrons 1s atingem velocidades próximas a c, tornando-se mais massivos e contraindo os orbitais s. Isso eleva a blindagem sobre os elétrons d, tornando os raios 5d próximos aos 4d.`
    : '';

  return { periodo: tendP[bloco]||'', grupo: tendG[bloco]||'', contração };
}
function vizinhosRaio(Z, el, allEls){
  const periodo = (el.periodo||0)<=7?el.periodo:(el.cat==='Lantanídeo'?6:7);
  const grupo   = el.grupo||0;
  const mesmoPer = allEls
    .filter(e=>{
      const p=(e.periodo||0)<=7?e.periodo:(e.cat==='Lantanídeo'?6:7);
      return p===periodo && RAIO[e.numero] && e.numero!==Z;
    })
    .sort((a,b)=>a.grupo-b.grupo)
    .slice(0,5);
  const mesmoGrp = allEls
    .filter(e=>{
      const p=(e.periodo||0)<=7?e.periodo:(e.cat==='Lantanídeo'?6:7);
      return e.grupo===grupo && p!==periodo && RAIO[e.numero] && e.numero!==Z;
    })
    .sort((a,b)=>{
      const pa=(a.periodo||0)<=7?a.periodo:(a.cat==='Lantanídeo'?6:7);
      const pb=(b.periodo||0)<=7?b.periodo:(b.cat==='Lantanídeo'?6:7);
      return pa-pb;
    })
    .slice(0,5);

  return { mesmoPer, mesmoGrp };
}
function renderRaio(Z, el, ccHex){
  const dados = RAIO[Z];
  const sub   = ultimoSubnivel(Z);
  if(!dados && !sub){
    return `<p class="raio-sem-dados">Dados de raio atômico não disponíveis — elemento sintético superpesado sem medição experimental confirmada.</p>`;
  }
  const atomCor  = sub ? corAtomo(sub.bloco, ccHex) : (ccHex||'#888');
  const atomGlow = (()=>{
    const h = atomCor.replace('#','');
    if(h.length < 6) return 'rgba(136,136,136,0.5)';
    const r=parseInt(h.slice(0,2),16), g=parseInt(h.slice(2,4),16), b=parseInt(h.slice(4,6),16);
    return `rgba(${r},${g},${b},0.5)`;
  })();
  const rPm      = dados ? dados.r   : null;
  const tipoKey  = dados ? dados.t   : null;
  const fonteKey = dados ? dados.f   : null;
  const tipoLabel = tipoKey  ? (RAIO_TIPO_LABEL[tipoKey] ||tipoKey)  : '—';
  const tipoDef   = tipoKey  ? (RAIO_TIPO_DEF[tipoKey]  ||'')        : '';
  const fonteLabel= fonteKey ? (RAIO_FONTE_LABEL[fonteKey]||fonteKey) : '—';
  const diam = rPm ? Math.round(20+(rPm/RAIO_MAX_PM)*60) : 40;
  const pct  = rPm ? Math.round((rPm/RAIO_MAX_PM)*100)   : 0;
  const circuloHtml=`
    <div class="raio-circulo-wrap">
      <div class="raio-circulo" style="width:${diam}px;height:${diam}px;--atom-color:${atomCor};--atom-color-glow:${atomGlow}"
           role="img" aria-label="${rPm||'sem dado'} pm — representação proporcional"></div>
      <span class="raio-circulo-label" aria-hidden="true">${el.simbolo||''}</span>
    </div>`;

  const valorHtml = rPm
    ? `<div class="raio-valor-box" style="--atom-color:${atomCor}">
         <span class="raio-valor-titulo">Raio ${tipoLabel}</span>
         <span class="raio-valor-num" aria-label="${rPm} picômetros">${rPm}<span class="raio-valor-unit"> pm</span></span>
         <span class="raio-valor-fonte">Fonte: ${fonteLabel}</span>
       </div>`
    : `<div class="raio-valor-box"><span class="raio-valor-titulo">Raio atômico</span>
       <span class="raio-sem-dados">Sem dado experimental disponível</span></div>`;
  const iupacHtml = '';
  const subHtml = sub ? (()=>{
    const statusClass = {
      preenchido:    'raio-status-preenchido',
      semipreenchido:'raio-status-semipreenchido',
      parcial:       'raio-status-parcial',
      vazio:         'raio-status-vazio'
    }[sub.status] || 'raio-status-parcial';
    return `
    <div class="raio-sub-box">
      <span class="raio-sub-titulo">Camada de valência — último subnível</span>
      <span class="raio-sub-valor" aria-label="Subnível ${sub.sub}: ${sub.elCount} de ${sub.maxEl} elétrons">${sub.sub} &nbsp;·&nbsp; ${sub.elCount}/${sub.maxEl} e⁻</span>
      <span class="raio-sub-tipo">
        Bloco <b>${sub.bloco}</b> &nbsp;·&nbsp; Camada <b>${sub.camada}</b> (n = ${sub.n}) &nbsp;·&nbsp; ${sub.numOrbitais} orbital${sub.numOrbitais>1?'is':''}
      </span>
      <span class="raio-status-badge ${statusClass}" aria-label="Estado de preenchimento: ${sub.statusLabel}">${sub.statusLabel}</span>
    </div>`;
  })() : '';
  const barraHtml = rPm ? `
    <div class="raio-barra-wrap">
      <span class="raio-barra-titulo">Escala relativa — referência: Fr = ${RAIO_MAX_PM} pm</span>
      <div class="raio-barra-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Raio relativo a Fr: ${pct}%">
        <div class="raio-barra-fill" style="width:${pct}%;--atom-color:${atomCor};--atom-color-glow:${atomGlow}"></div>
      </div>
      <div class="raio-barra-legenda"><span>0 pm</span><span>${rPm} pm (${pct}%)</span><span>${RAIO_MAX_PM} pm (Fr)</span></div>
    </div>` : '';
  const toggleHtml=`
    <div class="raio-header">
      <span class="raio-tend-titulo">📐 Raio Atômico — ${rPm||'—'} pm</span>
      <div class="raio-view-toggle" role="group" aria-label="Modo de visualização">
        <button class="raio-vbtn ativo" id="rbtn-dados-${Z}" aria-pressed="true"
                onclick="raioVista('dados','${Z}',this)">Dados</button>
        <button class="raio-vbtn" id="rbtn-grade-${Z}" aria-pressed="false"
                onclick="raioVista('grade','${Z}',this)">Grade</button>
        <button class="raio-vbtn" id="rbtn-bohr-${Z}" aria-pressed="false"
                onclick="raioVista('bohr','${Z}',this)">Bohr</button>
        <button class="raio-vbtn" id="rbtn-lewis-${Z}" aria-pressed="false"
                onclick="raioVista('lewis','${Z}',this)">Lewis</button>
        <button class="raio-vbtn" id="rbtn-nuvem-${Z}" aria-pressed="false"
                onclick="raioVista('nuvem','${Z}',this)">Nuvem</button>
      </div>
    </div>`;
  const painelDadosHtml=`
    <div id="raio-painel-dados-${Z}">
      <div class="raio-visual">${circuloHtml}<div class="raio-info-col">${valorHtml}</div></div>
      ${subHtml}
      ${barraHtml}
    </div>`;

  const elJSON = JSON.stringify({numero:el.numero,simbolo:el.simbolo||'',nome:el.nome||'',grupo:el.grupo,periodo:el.periodo||0,cat:el.cat||''});

  const painelGradeHtml=`
    <div id="raio-painel-grade-${Z}" style="display:none"
         data-lazy="grade" data-z="${Z}"
         data-cor="${atomCor.replace(/"/g,'&quot;')}"
         data-glow="${atomGlow.replace(/"/g,'&quot;')}"
         data-el='${elJSON.replace(/'/g,'&#39;')}'>
    </div>`;

  const painelBohrHtml=`
    <div id="raio-painel-bohr-${Z}" style="display:none"
         data-lazy="bohr" data-z="${Z}"
         data-cor="${atomCor.replace(/"/g,'&quot;')}"
         data-glow="${atomGlow.replace(/"/g,'&quot;')}"
         data-el='${elJSON.replace(/'/g,'&#39;')}'>
    </div>`;

  const painelLewisHtml=`
    <div id="raio-painel-lewis-${Z}" style="display:none"
         data-lazy="lewis" data-z="${Z}"
         data-cor="${atomCor.replace(/"/g,'&quot;')}"
         data-glow="${atomGlow.replace(/"/g,'&quot;')}"
         data-el='${elJSON.replace(/'/g,'&#39;')}'>
    </div>`;

  // pre-compute nuvem orbitais for fullscreen access before lazy render
  const _nuvemOrbs = (()=>{
    const dist2 = distribuirEletrons(Z); const cam2 = porCamada(dist2);
    const nc2 = Object.keys(cam2).length; const orbs = [];
    for(let n2=1; n2<=nc2; n2++){
      const subs2 = cam2[n2]||[];
      subs2.forEach(({sub:s2, e:e2})=>{
        const t2 = s2[s2.length-1];
        const vm = {s:'--orb-s', p:'--orb-p', d:'--orb-d', f:'--orb-f'};
        orbs.push({sub:s2, e:e2, tipo:t2, n:parseInt(s2[0]), cor:rgbToHex(resolverCorCSS(vm[t2]||'--orb-s'))});
      });
    }
    return orbs;
  })();

  const painelNuvemHtml=`
    <div id="raio-painel-nuvem-${Z}" style="display:none"
         data-lazy="nuvem" data-z="${Z}"
         data-cor="${atomCor.replace(/"/g,'&quot;')}"
         data-glow="${atomGlow.replace(/"/g,'&quot;')}"
         data-orbitais='${JSON.stringify(_nuvemOrbs).replace(/'/g,'&#39;')}'
         data-el='${elJSON.replace(/'/g,'&#39;')}'>
    </div>`;

  return `<div class="raio-wrap" style="--atom-color:${atomCor};--atom-color-glow:${atomGlow}">
    ${toggleHtml}
    ${painelDadosHtml}
    ${painelGradeHtml}
    ${painelBohrHtml}
    ${painelLewisHtml}
    ${painelNuvemHtml}
  </div>`;
}
function renderBohr(Z, el, sub, atomCor, atomGlow, escala){
  escala = escala || 1;
  const dist     = distribuirEletrons(Z);
  const camadas  = porCamada(dist);
  const nCamadas = Object.keys(camadas).length;
  if(!nCamadas) return '';

  const elPorCamada = [];
  for(let n=1; n<=nCamadas; n++){
    const subs  = camadas[n]||[];
    const total = subs.reduce((a,{e})=>a+e,0);
    elPorCamada.push({n, total, nome:'KLMNOPQ'[n-1]||'?'});
  }
  const nVal    = nCamadas;
  const elVal   = elPorCamada[nCamadas-1].total;
  const nomeVal = elPorCamada[nCamadas-1].nome;

  const COR_BORDA  = resolverCorCSS('--border');
  const COR_DIM    = resolverCorCSS('--text-dim');
  const COR_ACCENT = resolverCorCSS('--accent');
  const COR_NUCLEO = resolverCorCSS('--bg-deep');
  const COR_TEXT   = resolverCorCSS('--text-main');

  function buildSVG(camPara, modo){
    const nC     = camPara.length;
    const R_NUC  = Math.round(32 * escala);
    const MARG   = Math.round(100 * escala);
    const AVAIL  = Math.round(320 * escala);
    const GAP    = Math.min(Math.round(38*escala), (AVAIL - R_NUC - 8) / nC);
    const R_EL   = Math.max(4.5*escala, Math.min(7*escala, GAP * 0.19));
    const R_OUT  = R_NUC + nC * GAP + R_EL + 6;
    const DIM    = R_OUT * 2 + 16;
    const SVG_W  = DIM + MARG;
    const SVG_H  = DIM;
    const CX = DIM/2, CY = DIM/2;
    const fSz = Math.round(10 * escala);
    const fSzSm = Math.round(8 * escala);

    const defs = `<defs>
      <marker id="mA-${Z}-${modo}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="${COR_ACCENT}"/>
      </marker>
      <marker id="mD-${Z}-${modo}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="${COR_DIM}"/>
      </marker>
    </defs>`;

    let p = [];
    camPara.forEach(({n:cn, total:nEl, nome:cnome}, idx)=>{
      const r   = R_NUC + (idx+1)*GAP;
      const isV = modo==='val' ? true : (cn===nVal);
      p.push(`<circle cx="${CX.toFixed(1)}" cy="${CY.toFixed(1)}" r="${r.toFixed(1)}"
        fill="none" stroke="${isV?atomCor:COR_BORDA}" stroke-width="${isV?2.2:1}"
        opacity="${isV?1:0.4}"/>`);
      if(modo==='all'){
        p.push(`<text x="${(CX-r-6).toFixed(1)}" y="${(CY+4).toFixed(1)}"
          text-anchor="end" font-family="Share Tech Mono,monospace"
          font-size="${fSz}" fill="${isV?atomCor:COR_DIM}" opacity="${isV?1:0.65}">${cnome}</text>`);
      }
    });
    camPara.forEach(({n:cn, total:nEl}, idx)=>{
      const r   = R_NUC + (idx+1)*GAP;
      const isV = modo==='val' ? true : (cn===nVal);
      for(let j=0; j<nEl; j++){
        const ang = (2*Math.PI*j/nEl) - Math.PI/2;
        const ex  = CX + r*Math.cos(ang);
        const ey  = CY + r*Math.sin(ang);
        if(isV) p.push(`<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}"
          r="${(R_EL+3).toFixed(1)}" fill="${atomGlow}" opacity="0.28"/>`);
        p.push(`<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}"
          r="${R_EL.toFixed(1)}" fill="${isV?atomCor:COR_DIM}"
          stroke="${isV?COR_NUCLEO:'none'}" stroke-width="${isV?1.2:0}"
          opacity="${isV?1:0.6}"/>`);
      }
    });
    const symLen = (el.simbolo||'').length;
    const symFS  = Math.round((symLen > 2 ? 16 : 20) * escala);
    p.push(
      `<circle cx="${CX.toFixed(1)}" cy="${CY.toFixed(1)}" r="${R_NUC}"
        fill="${COR_NUCLEO}" stroke="${atomCor}" stroke-width="${(2.5*escala).toFixed(1)}"/>`,
      `<text x="${CX.toFixed(1)}" y="${(CY+1).toFixed(1)}"
        text-anchor="middle" dominant-baseline="middle"
        font-family="Rajdhani,sans-serif" font-weight="700"
        font-size="${symFS}" fill="${atomCor}">${el.simbolo||''}</text>`,
      `<text x="${CX.toFixed(1)}" y="${(CY+R_NUC-8*escala).toFixed(1)}"
        text-anchor="middle" font-family="Share Tech Mono,monospace"
        font-size="${fSzSm}" fill="${COR_DIM}" opacity="0.8">${Z}</text>`
    );
    const rVa  = R_NUC + camPara.length * GAP;
    const LX   = CX + rVa + 12*escala;
    const LW   = Math.round(94*escala);
    const LH   = Math.round(22*escala);
    const pCx  = CX + rVa;
    const pCy  = CY;
    p.push(
      `<line x1="${(pCx+R_EL+2).toFixed(1)}" y1="${pCy.toFixed(1)}"
             x2="${(LX-4).toFixed(1)}" y2="${pCy.toFixed(1)}"
             stroke="${COR_ACCENT}" stroke-width="1.3"
             marker-end="url(#mA-${Z}-${modo})"/>`,
      `<rect x="${LX.toFixed(1)}" y="${(pCy-16*escala).toFixed(1)}"
             width="${LW}" height="${LH}" rx="3"
             fill="${COR_NUCLEO}" opacity="0.85"/>`,
      `<text x="${(LX+4*escala).toFixed(1)}" y="${(pCy-4*escala).toFixed(1)}"
             font-family="Rajdhani,sans-serif" font-size="${fSz}" font-weight="700"
             fill="${COR_ACCENT}">Camada de valência</text>`,
      `<text x="${(LX+4*escala).toFixed(1)}" y="${(pCy+7*escala).toFixed(1)}"
             font-family="Rajdhani,sans-serif" font-size="${fSz}" font-weight="700"
             fill="${COR_ACCENT}">(${nomeVal}) — ${elVal} e⁻</text>`
    );
    const pEx  = CX;
    const pEy  = CY - rVa;
    const LW2  = Math.round(86*escala);
    const LH2  = Math.round(20*escala);
    p.push(
      `<line x1="${pEx.toFixed(1)}" y1="${(pEy-R_EL-2).toFixed(1)}"
             x2="${(LX-4).toFixed(1)}" y2="${(pEy-10*escala).toFixed(1)}"
             stroke="${COR_DIM}" stroke-width="1" stroke-dasharray="3,2"
             marker-end="url(#mD-${Z}-${modo})"/>`,
      `<rect x="${LX.toFixed(1)}" y="${(pEy-24*escala).toFixed(1)}"
             width="${LW2}" height="${LH2}" rx="3"
             fill="${COR_NUCLEO}" opacity="0.85"/>`,
      `<text x="${(LX+4*escala).toFixed(1)}" y="${(pEy-13*escala).toFixed(1)}"
             font-family="Rajdhani,sans-serif" font-size="${fSz}"
             fill="${COR_DIM}">Elétron de valência</text>`,
      `<text x="${(LX+4*escala).toFixed(1)}" y="${(pEy-2*escala).toFixed(1)}"
             font-family="Rajdhani,sans-serif" font-size="${fSz}"
             fill="${COR_DIM}">${elVal} no nível ${nomeVal}</text>`
    );
    return `<svg viewBox="0 0 ${SVG_W.toFixed(0)} ${SVG_H.toFixed(0)}"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagrama de Bohr — ${elVal} elétron${elVal>1?'s':''} de valência na camada ${nomeVal}"
      style="width:100%;height:auto;display:block;">
      ${defs}
      ${p.join('\n      ')}
    </svg>`;
  }
  const svgVal = buildSVG([elPorCamada[nCamadas-1]], 'val');
  const svgAll = buildSVG(elPorCamada, 'all');
  const maxCap = [2,8,18,32,50,72,98];
  const fsCam  = Math.max(0.78, Math.min(1.4, escala));
  const linhas = elPorCamada.map(({n,total,nome})=>{
    const cap = maxCap[n-1]||2*n*n;
    const pct = Math.round(total/cap*100);
    const isV = n===nVal;
    return `<div class="bohr-camada-row" style="font-size:calc(${fsCam} * 0.78rem * var(--font-scale))">
      <span class="bohr-camada-nome" style="${isV?'color:'+atomCor:''}">${nome}</span>
      <span class="bohr-camada-el">${total}/${cap} e⁻</span>
      <div class="bohr-camada-bar-track">
        <div class="bohr-camada-bar-fill" style="width:${pct}%;background:${isV?atomCor:COR_DIM};opacity:${isV?1:0.5}"></div>
      </div>
      ${isV?`<span class="bohr-camada-val-tag">← valência</span>`:''}
    </div>`;
  }).join('');
  return `<div class="bohr-wrap">
    <div class="bohr-header">
      <span class="bohr-titulo">Diagrama de Bohr</span>
      <div class="raio-view-toggle" role="group" aria-label="Modo do diagrama Bohr">
        <button class="raio-vbtn ativo" id="bohr-btn-val-${Z}" aria-pressed="true"
                onclick="bohrModo('val','${Z}')">Valência</button>
        <button class="raio-vbtn" id="bohr-btn-all-${Z}" aria-pressed="false"
                onclick="bohrModo('all','${Z}')">Todas as camadas</button>
      </div>
    </div>
    <div class="bohr-svg-wrap">
      <div id="bohr-svg-val-${Z}">${svgVal}</div>
      <div id="bohr-svg-all-${Z}" style="display:none">${svgAll}</div>
    </div>
    <div class="bohr-camada-info">
      <span class="bohr-camada-titulo">Elétrons por camada</span>
      ${linhas}
    </div>
  </div>`;
}
function renderLewis(Z, el, sub, atomCor, atomGlow, escala){
  escala = escala || 1;
  if(!sub) return '<p class="raio-sem-dados">Diagrama de Lewis não disponível.</p>';
  const elV = sub.elCount;
  const dist    = distribuirEletrons(Z);
  const camadas = porCamada(dist);
  const nCam    = Object.keys(camadas).length;
  const subsCam = camadas[nCam]||[];
  const eValTotal = subsCam.reduce((a,{e})=>a+e,0);
  const maxLewis = (Z<=2) ? 2 : 8;
  const eL = Math.min(eValTotal, maxLewis);
  const COR_DIM    = resolverCorCSS('--text-dim');
  const COR_ACCENT = resolverCorCSS('--accent');
  const COR_TEXT   = resolverCorCSS('--text-main');
  const COR_BG     = resolverCorCSS('--bg-card');
  const COR_NUCLEO = resolverCorCSS('--bg-deep');
  const SZ   = Math.round(220 * escala);
  const CX   = SZ/2, CY = SZ/2;
  const BOX  = Math.round(36 * escala);
  const DIST = Math.round(54 * escala);
  const R_PT = 5.5 * escala;
  const GAP  = 14 * escala;
  const fSz  = Math.round(10 * escala);
  const FACES = [
    {dx:0,   dy:-DIST, ax: 0,  ay:-1, label:''},
    {dx:DIST, dy:0,    ax: 1,  ay: 0, label:''},
    {dx:0,   dy:DIST,  ax: 0,  ay: 1, label:''},
    {dx:-DIST,dy:0,    ax:-1,  ay: 0, label:''},
  ];
  const slots = [
    {fi:0,slot:0},{fi:1,slot:0},{fi:2,slot:0},{fi:3,slot:0},
    {fi:0,slot:1},{fi:1,slot:1},{fi:2,slot:1},{fi:3,slot:1},
  ].slice(0, eL);
  const ocup = [0,0,0,0];
  slots.forEach(({fi})=> ocup[fi]++);

  let parts = [];
  const defs = `<defs>
    <marker id="lmA-${Z}" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="${COR_ACCENT}"/>
    </marker>
  </defs>`;
  parts.push(`<rect width="${SZ}" height="${SZ}" fill="transparent"/>`);
  FACES.forEach(({dx,dy,ax,ay}, fi)=>{
    const n = ocup[fi];
    if(n===0) return;
    const fx = CX+dx, fy = CY+dy;

    if(n===1){
      parts.push(
        `<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${(R_PT+3).toFixed(1)}" fill="${atomGlow}" opacity="0.3"/>`,
        `<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${R_PT}" fill="${atomCor}" stroke="${COR_NUCLEO}" stroke-width="1.2"/>`
      );
    } else {
      const px = ay!==0 ? GAP/2 : 0;
      const py = ax!==0 ? GAP/2 : 0;
      [-1,1].forEach(s=>{
        const ex = fx + s*px;
        const ey = fy + s*py;
        parts.push(
          `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${(R_PT+2.5).toFixed(1)}" fill="${atomGlow}" opacity="0.28"/>`,
          `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${R_PT}" fill="${atomCor}" stroke="${COR_NUCLEO}" stroke-width="1.2"/>`
        );
      });
      parts.push(`<line x1="${(fx-px).toFixed(1)}" y1="${(fy-py).toFixed(1)}"
        x2="${(fx+px).toFixed(1)}" y2="${(fy+py).toFixed(1)}"
        stroke="${atomCor}" stroke-width="1" opacity="0.5"/>`);
    }
  });
  const symLen = (el.simbolo||'').length;
  const symFS  = Math.round((symLen > 2 ? 18 : 26) * escala);
  parts.push(
    `<rect x="${(CX-BOX).toFixed(1)}" y="${(CY-BOX).toFixed(1)}"
           width="${(BOX*2).toFixed(0)}" height="${(BOX*2).toFixed(0)}"
           rx="6" fill="${COR_NUCLEO}" stroke="${atomCor}" stroke-width="2"/>`,
    `<text x="${CX.toFixed(1)}" y="${(CY+2).toFixed(1)}"
           text-anchor="middle" dominant-baseline="middle"
           font-family="Rajdhani,sans-serif" font-weight="700"
           font-size="${symFS}" fill="${atomCor}">${el.simbolo||''}</text>`
  );
  const annoY = CY - DIST - R_PT - 22*escala;
  const annoX = CX + 38*escala;
  const annoTX = CX + 42*escala;
  parts.push(
    `<line x1="${(CX+4*escala).toFixed(1)}" y1="${(CY-DIST-R_PT-3*escala).toFixed(1)}"
           x2="${annoX.toFixed(1)}" y2="${(annoY+12*escala).toFixed(1)}"
           stroke="${COR_DIM}" stroke-width="1" stroke-dasharray="3,2"
           marker-end="url(#lmA-${Z})"/>`,
    `<text x="${annoTX.toFixed(1)}" y="${annoY.toFixed(1)}"
           font-family="Rajdhani,sans-serif" font-size="${fSz}"
           fill="${COR_ACCENT}" font-weight="700">${eValTotal} e⁻ de valência</text>`,
    `<text x="${annoTX.toFixed(1)}" y="${(annoY+12*escala).toFixed(1)}"
           font-family="Rajdhani,sans-serif" font-size="${fSz}"
           fill="${COR_DIM}">${sub.statusLabel}</text>`
  );
  const maxW = Math.round(260 * escala);
  const svgLewis = `<svg viewBox="0 0 ${SZ} ${SZ}"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Diagrama de Lewis do ${el.nome||el.simbolo}: ${eValTotal} elétrons de valência — ${sub.statusLabel}"
    style="width:100%;height:auto;display:block;max-width:${maxW}px;">
    ${defs}
    ${parts.join('\n    ')}
  </svg>`;
  const pares  = Math.floor(eL/2);
  const solt   = eL - pares*2;
  const legendaRows = [
    ['Elétrons de valência', `${eValTotal}`, atomCor],
    ['Pares de elétrons',    `${pares}`,     atomCor],
    ['Elétrons solitários',  `${solt}`,      COR_DIM],
    ['Estado',               sub.statusLabel, COR_ACCENT],
  ].map(([lbl,val,cor])=>
    `<div class="lewis-legenda-row">
      <div class="lewis-legenda-dot" style="background:${cor}"></div>
      <span style="color:${resolverCorCSS('--text-dim')};min-width:140px">${lbl}</span>
      <span style="font-family:'Share Tech Mono',monospace;font-weight:700;color:${cor}">${val}</span>
    </div>`
  ).join('');
  const nota = eValTotal > 8
    ? `<p style="font-size:calc(0.72rem * var(--font-scale));color:${COR_DIM};font-style:italic;margin-top:4px">
        Nota: O diagrama de Lewis convencional representa até 8 e⁻ (octeto).
        Este elemento possui ${eValTotal} e⁻ na camada de valência —
        o excedente ocorre em elementos do bloco ${sub.bloco} com expansão de octeto.
       </p>` : '';

  return `<div class="lewis-wrap">
    <div class="lewis-header">
      <span class="lewis-titulo">Diagrama de Lewis — Elétrons de Valência</span>
    </div>
    <div class="lewis-svg-wrap">${svgLewis}</div>
    <div class="lewis-legenda">
      <span class="lewis-legenda-titulo">Legenda</span>
      ${legendaRows}
    </div>
    ${nota}
  </div>`;
}
function renderNuvem(Z, el, sub, atomCor, atomGlow){
  const dist    = distribuirEletrons(Z);
  const camadas = porCamada(dist);
  const nCam    = Object.keys(camadas).length;
  const orbitaisInfo = [];
  for(let n=1; n<=nCam; n++){
    const subs = camadas[n]||[];
    subs.forEach(({sub:s, e})=>{
      const tipo = s[s.length-1];
      const varMap = {s:'--orb-s', p:'--orb-p', d:'--orb-d', f:'--orb-f'};
      const cor = rgbToHex(resolverCorCSS(varMap[tipo]||'--orb-s'));
      orbitaisInfo.push({sub:s, e, tipo, n:parseInt(s[0]), cor});
    });
  }
  const orbitaisJSON = JSON.stringify(orbitaisInfo);
  return `<div class="nuvem-wrap">
    <div class="nuvem-header">
      <span class="nuvem-titulo">Nuvem Eletrônica de Probabilidade</span>
      <div class="nuvem-controles" role="group" aria-label="Controles da nuvem">
        <label class="nuvem-label">Orbital:</label>
        <select class="nuvem-select" id="nuvem-orb-${Z}" onchange="nuvemMudarOrbital(${Z})">
          <option value="all">Todos</option>
          ${orbitaisInfo.map(o=>`<option value="${o.sub}">${o.sub} (${o.e} e⁻)</option>`).join('')}
        </select>
      </div>
    </div>
    <canvas id="nuvem-canvas-${Z}" class="nuvem-canvas"
            aria-label="Nuvem eletrônica de probabilidade do ${el.nome}"
            data-z="${Z}" data-orbitais='${orbitaisJSON}'
            data-cor="${atomCor}" data-glow="${atomGlow}"></canvas>
    <div class="nuvem-legenda" id="nuvem-legenda-${Z}"></div>
  </div>`;
}

function nuvemIniciarCanvas(Z, forceOrbital){
  const canvas = document.getElementById('nuvem-canvas-'+Z);
  if(!canvas) return;
  const sel    = document.getElementById('nuvem-orb-'+Z);
  const orbital= forceOrbital || (sel ? sel.value : 'all');
  _nuvemDrawOnCanvas(canvas, orbital);
  nuvemLegenda(canvas.closest('.nuvem-wrap'), canvas, orbital);
}

function nuvemLegenda(container, canvas, orbital){
  const leg = container ? container.querySelector('.nuvem-legenda') : null;
  if(!leg || !canvas) return;
  const orbs  = JSON.parse(canvas.dataset.orbitais||'[]');
  const shown = (orbital && orbital !== 'all') ? orbs.filter(o=>o.sub===orbital) : orbs;
  leg.innerHTML = shown.map(o=>`<div class="nuvem-leg-row"><span class="nuvem-leg-dot" style="background:${o.cor}"></span><span class="nuvem-leg-sub">${o.sub}</span><span class="nuvem-leg-e">${o.e} e⁻</span></div>`).join('');
}

function nuvemMudarOrbital(Z){
  const canvas = document.getElementById('nuvem-canvas-'+Z);
  const sel    = document.getElementById('nuvem-orb-'+Z);
  if(!canvas) return;
  const orbital = sel ? sel.value : 'all';
  _nuvemDrawOnCanvas(canvas, orbital);
  nuvemLegenda(canvas.closest('.nuvem-wrap'), canvas, orbital);
}

/* ===== FULLSCREEN ===== */
let _fsZ = null, _fsVista = null;
function abrirFullscreen(vista, Z){
  _fsZ = Z; _fsVista = vista;
  const ov    = document.getElementById('fullscreen-overlay');
  const body  = document.getElementById('fullscreen-body');
  const title = document.getElementById('fullscreen-title');
  if(!ov || !body) return;

  const titulos = {grade:'Grade de Raios Atômicos', bohr:'Diagrama de Bohr', lewis:'Diagrama de Lewis', nuvem:'Nuvem Eletrônica de Probabilidade'};
  title.textContent = titulos[vista] || vista;

  const srcPainel = document.getElementById('raio-painel-'+vista+'-'+Z);
  if(!srcPainel) return;
  const atomCor  = srcPainel.dataset.cor  || '#00e5ff';
  const atomGlow = srcPainel.dataset.glow || 'rgba(0,229,255,0.5)';
  const elData   = JSON.parse(srcPainel.dataset.el || '{}');
  const Z_num    = parseInt(srcPainel.dataset.z) || Z;
  const sub      = ultimoSubnivel(Z_num);
  const allEls   = [...elementosBase, ...lantanideos, ...actinideos];
  const el       = allEls.find(e=>e.numero===Z_num) || elData;

  // Espaço útil (desconta header fixo ~52px)
  const VH = window.innerHeight - 52;
  const VW = window.innerWidth;

  body.innerHTML = '';

  if(vista === 'grade'){
    const { mesmoPer, mesmoGrp } = vizinhosRaio(Z_num, el, allEls);
    const esfera = (e, isA) => {
      const r = RAIO[e.numero]; if(!r) return '';
      const sE = ultimoSubnivel(e.numero);
      const cE = sE ? corAtomo(sE.bloco, getCatColorHex(e.cat)) : getCatColorHex(e.cat);
      const h6 = cE.replace('#','');
      const gE = h6.length>=6?`rgba(${parseInt(h6.slice(0,2),16)},${parseInt(h6.slice(2,4),16)},${parseInt(h6.slice(4,6),16)},0.4)`:'rgba(136,136,136,0.4)';
      const d  = Math.round(28+(r.r/RAIO_MAX_PM)*110);
      const bd = isA?`outline:3px solid var(--accent);outline-offset:3px;`:'';
      return `<div class="raio-grade-item fs-grade-item"><div class="raio-grade-esfera" style="width:${d}px;height:${d}px;--esfera-cor:${cE};--esfera-glow:${gE};${bd}" aria-label="${e.nome}: ${r.r} pm"></div><span class="raio-grade-sim fs-grade-sim" style="color:${isA?'var(--accent)':'var(--text-dim)'}">${e.simbolo}</span><span class="raio-grade-val fs-grade-val">${r.r} pm</span></div>`;
    };
    const blocoFs = (lista, atual, titulo, seta) => {
      if(!lista.length) return '';
      const todos = [...lista, atual].sort((a,b)=>a.grupo-b.grupo||((a.periodo||0)-(b.periodo||0)));
      return `<div class="raio-grade-wrap visivel fs-grade-wrap"><span class="raio-grade-titulo fs-grade-titulo">${titulo}</span><div class="raio-grade fs-grade">${todos.map(e=>esfera(e,e.numero===Z_num)).join('')}</div><div class="raio-grade-setas">${seta}</div></div>`;
    };
    const gPer = blocoFs(mesmoPer, el, `Período ${(el.periodo||0)<=7?el.periodo:(el.cat==='Lantanídeo'?6:7)} — raio diminui →`, '← raio maior &nbsp;&nbsp;&nbsp; raio menor →');
    const gGrp = blocoFs(mesmoGrp, el, `Grupo ${el.grupo} — raio aumenta ↓`, '↑ raio menor &nbsp;&nbsp;&nbsp; raio maior ↓');
    body.innerHTML = `<div class="fs-grade-container">${gPer}${gGrp}</div>`;

  } else if(vista === 'bohr'){
    const dist2 = distribuirEletrons(Z_num);
    const nCam  = Object.keys(porCamada(dist2)).length;
    const R_NUC_B = 32, GAP_B = Math.min(38,(320-32-8)/nCam);
    const R_OUT_B = R_NUC_B + nCam*GAP_B + 7 + 6;
    const DIM_B   = R_OUT_B*2 + 16;
    const SVG_W_B = DIM_B + 100;
    const escalaW = (VW * 0.88) / SVG_W_B;
    const escalaH = (VH * 0.72) / DIM_B;
    const escala  = Math.min(Math.max(escalaW, escalaH), 4.0);
    const wrap = document.createElement('div');
    wrap.className = 'fs-bohr-wrap';
    wrap.innerHTML = renderBohr(Z_num, el, sub, atomCor, atomGlow, escala);
    body.appendChild(wrap);

  } else if(vista === 'lewis'){
    const escalaH = (VH * 0.72) / 220;
    const escalaW = (VW * 0.55) / 220;
    const escala  = Math.min(Math.max(escalaH, escalaW), 4.5);
    const wrap = document.createElement('div');
    wrap.className = 'fs-lewis-wrap';
    wrap.innerHTML = renderLewis(Z_num, el, sub, atomCor, atomGlow, escala);
    body.appendChild(wrap);

  } else if(vista === 'nuvem'){
    const orbitaisData = srcPainel.dataset.orbitais || '[]';
    const nuvemHTML = renderNuvem(Z_num, el, sub, atomCor, atomGlow);
    body.innerHTML = `<div class="fs-nuvem-wrap">${nuvemHTML}</div>`;
    const canvas = body.querySelector('canvas');
    const sel    = body.querySelector('.nuvem-select');
    if(canvas){
      canvas.dataset.z        = Z_num;
      canvas.dataset.orbitais = orbitaisData;
      canvas.dataset.cor      = atomCor;
      canvas.dataset.glow     = atomGlow;
      canvas.classList.add('fs-nuvem-canvas');
    }
    if(sel) sel.onchange = ()=>{ if(canvas){ _nuvemDrawOnCanvas(canvas, sel.value); nuvemLegenda(body, canvas, sel.value); } };
    setTimeout(()=>{
      if(canvas){ _nuvemDrawOnCanvas(canvas, 'all'); nuvemLegenda(body, canvas, 'all'); }
    }, 50);
  }

  ov.classList.add('aberto');
  ov.setAttribute('aria-hidden','false');
  document.getElementById('btnFullscreenClose').focus();
  anunciar(`${titulos[vista]||vista} expandido para tela cheia.`);
}


function _nuvemDrawOnCanvas(canvas, orbital){
  if(!canvas) return;
  const orbitaisInfo = JSON.parse(canvas.dataset.orbitais||'[]');
  const atomCor = canvas.dataset.cor || '#00e5ff';
  const Z_num   = parseInt(canvas.dataset.z)||1;

  const DIM = Math.max(canvas.offsetWidth, canvas.offsetHeight, 340);
  canvas.width  = DIM;
  canvas.height = DIM;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,DIM,DIM);

  const bg = resolverCorCSS('--bg-card');
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,DIM,DIM);

  const CX = DIM/2, CY = DIM/2;
  const MAX_R = DIM*0.46;
  const SHELL_SCALE = { s:1.0, p:0.78, d:0.6, f:0.45 };
  const N_DOTS = Math.min(12000, Math.max(2000, Z_num * 60));

  function hexToRgb(hex){
    if(!hex) return {r:0,g:229,b:255};
    // handle rgb() format
    const mRgb = hex.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if(mRgb) return {r:parseInt(mRgb[1]),g:parseInt(mRgb[2]),b:parseInt(mRgb[3])};
    const h = hex.replace('#','');
    if(h.length < 6) return {r:0,g:229,b:255};
    return {r:parseInt(h.slice(0,2),16), g:parseInt(h.slice(2,4),16), b:parseInt(h.slice(4,6),16)};
  }

  const toRender = orbital === 'all' ? orbitaisInfo : orbitaisInfo.filter(o=>o.sub===orbital);
  if(!toRender.length) return;
  const totalE = toRender.reduce((a,o)=>a+o.e,0);

  toRender.forEach(orb=>{
    const frac = orb.e / totalE;
    const nDots = Math.round(N_DOTS * frac);
    const nLevel = orb.n;
    const tipo   = orb.tipo;
    const scale  = SHELL_SCALE[tipo] || 1.0;
    const baseR  = MAX_R * (nLevel / 7) * scale;
    const spread = baseR * (0.35 + 0.15*(tipo==='s'?0:tipo==='p'?1:tipo==='d'?2:3));
    const {r:cr, g:cg, b:cb} = hexToRgb(orb.cor);

    for(let i=0; i<nDots; i++){
      let x, y, alpha;
      if(tipo === 's'){
        const u = Math.random();
        const r = baseR * Math.pow(u, 1/3) + (Math.random()-0.5)*spread*0.6;
        const theta = Math.random() * Math.PI * 2;
        x = CX + r * Math.cos(theta);
        y = CY + r * Math.sin(theta);
        alpha = 0.55 - (r/(baseR+spread))*0.4;
      } else if(tipo === 'p'){
        const lobe = Math.random() < 0.5 ? 1 : -1;
        const r = baseR * (0.5 + Math.random() * 0.9);
        const ang = (Math.random() - 0.5) * Math.PI * 0.7;
        x = CX + lobe * r * Math.cos(ang);
        y = CY + r * Math.sin(ang) * 0.5;
        alpha = 0.5 * (1 - Math.abs(ang) / (Math.PI*0.7)*0.5);
      } else if(tipo === 'd'){
        const lobe = Math.floor(Math.random()*4);
        const ang0 = lobe * Math.PI/2 + Math.PI/4;
        const r  = baseR * (0.3 + Math.random() * 0.85);
        const jitter = (Math.random()-0.5) * spread * 0.9;
        x = CX + (r + jitter) * Math.cos(ang0 + (Math.random()-0.5)*0.6);
        y = CY + (r + jitter) * Math.sin(ang0 + (Math.random()-0.5)*0.6);
        alpha = 0.4 + Math.random()*0.2;
      } else {
        const lobe = Math.floor(Math.random()*7);
        const ang0 = lobe * (Math.PI*2/7);
        const r  = baseR * (0.25 + Math.random() * 0.75);
        const jitter = (Math.random()-0.5) * spread * 1.1;
        x = CX + (r + jitter) * Math.cos(ang0 + (Math.random()-0.5)*0.4);
        y = CY + (r + jitter) * Math.sin(ang0 + (Math.random()-0.5)*0.4);
        alpha = 0.3 + Math.random()*0.25;
      }
      alpha = Math.max(0.05, Math.min(0.82, alpha));
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI*2);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(2)})`;
      ctx.fill();
    }
  });

  const grd = ctx.createRadialGradient(CX,CY,1,CX,CY,14);
  const {r:nr,g:ng,b:nb} = hexToRgb(atomCor);
  grd.addColorStop(0, `rgba(${nr},${ng},${nb},0.95)`);
  grd.addColorStop(0.5,`rgba(${nr},${ng},${nb},0.5)`);
  grd.addColorStop(1,  `rgba(${nr},${ng},${nb},0)`);
  ctx.beginPath();
  ctx.arc(CX,CY,14,0,Math.PI*2);
  ctx.fillStyle = grd;
  ctx.fill();
}

function fecharFullscreen(){
  const ov = document.getElementById('fullscreen-overlay');
  if(!ov) return;
  ov.classList.remove('aberto');
  ov.setAttribute('aria-hidden','true');
  _fsZ = null; _fsVista = null;
  anunciar('Tela cheia fechada.');
}

function raioLazyRender(vista, Z){
  const painel = document.getElementById('raio-painel-'+vista+'-'+Z);
  if(!painel || painel.dataset.rendered) return;
  painel.dataset.rendered = '1';

  const atomCor  = painel.dataset.cor  || '#00e5ff';
  const atomGlow = painel.dataset.glow || 'rgba(0,229,255,0.5)';
  const elData   = JSON.parse(painel.dataset.el || '{}');
  const Z_num    = parseInt(painel.dataset.z) || Z;
  const sub      = ultimoSubnivel(Z_num);

  // find el object from all arrays
  const allEls = [...elementosBase, ...lantanideos, ...actinideos];
  const el     = allEls.find(e=>e.numero===Z_num) || elData;

  const fsBar = `<div class="painel-fullscreen-bar">
    <button class="painel-fullscreen-btn" aria-label="Expandir para tela cheia"
            onclick="abrirFullscreen('${vista}','${Z}')">⛶ Tela cheia</button>
  </div>`;

  if(vista === 'grade'){
    const dados      = RAIO[Z_num];
    const allEls2    = [...elementosBase, ...lantanideos, ...actinideos];
    const { mesmoPer, mesmoGrp } = vizinhosRaio(Z_num, el, allEls2);
    const esferaGrade = (e, isAtual) => {
      const r = RAIO[e.numero];
      if(!r) return '';
      const subE  = ultimoSubnivel(e.numero);
      const corE  = subE ? corAtomo(subE.bloco, getCatColorHex(e.cat)) : getCatColorHex(e.cat);
      const h6    = corE.replace('#','');
      const glowE = h6.length>=6
        ? `rgba(${parseInt(h6.slice(0,2),16)},${parseInt(h6.slice(2,4),16)},${parseInt(h6.slice(4,6),16)},0.4)`
        : 'rgba(136,136,136,0.4)';
      const d     = Math.round(14+(r.r/RAIO_MAX_PM)*46);
      const bord  = isAtual ? `outline:2px solid var(--accent);outline-offset:2px;` : '';
      return `<div class="raio-grade-item">
        <div class="raio-grade-esfera" style="width:${d}px;height:${d}px;--esfera-cor:${corE};--esfera-glow:${glowE};${bord}"
             aria-label="${e.nome}: ${r.r} pm"></div>
        <span class="raio-grade-sim" style="color:${isAtual?'var(--accent)':'var(--text-dim)'}">${e.simbolo}</span>
        <span class="raio-grade-val">${r.r} pm</span>
      </div>`;
    };
    const blocoGrade = (lista, atual, titulo, seta) => {
      if(!lista.length) return '';
      const todos = [...lista, atual].sort((a,b)=>a.grupo-b.grupo||((a.periodo||0)-(b.periodo||0)));
      const items = todos.map(e=>esferaGrade(e, e.numero===Z_num)).join('');
      return `<div class="raio-grade-wrap visivel">
        <span class="raio-grade-titulo">${titulo}</span>
        <div class="raio-grade">${items}</div>
        <div class="raio-grade-setas"><span>${seta}</span></div>
      </div>`;
    };
    const gradePer = blocoGrade(mesmoPer, el, `Período ${(el.periodo||0)<=7?el.periodo:(el.cat==='Lantanídeo'?6:7)} — raio diminui →`, '← raio maior &nbsp;&nbsp;&nbsp; raio menor →');
    const gradeGrp = blocoGrade(mesmoGrp, el, `Grupo ${el.grupo} — raio aumenta ↓`, '↑ raio menor &nbsp;&nbsp;&nbsp; raio maior ↓');
    painel.innerHTML = fsBar + `<div id="raio-grade-container-${Z_num}">${gradePer}${gradeGrp}</div>`;

  } else if(vista === 'bohr'){
    painel.innerHTML = fsBar + renderBohr(Z_num, el, sub, atomCor, atomGlow);

  } else if(vista === 'lewis'){
    painel.innerHTML = fsBar + renderLewis(Z_num, el, sub, atomCor, atomGlow);

  } else if(vista === 'nuvem'){
    painel.innerHTML = fsBar + renderNuvem(Z_num, el, sub, atomCor, atomGlow);
    setTimeout(()=>{ nuvemIniciarCanvas(Z_num); }, 30);
  }
}

function raioVista(vista, Z, btnEl){
  const ids    = ['dados','grade','bohr','lewis','nuvem'];
  const paineis = ids.map(id => document.getElementById('raio-painel-'+id+'-'+Z));
  const btns    = ids.map(id => document.getElementById('rbtn-'+id+'-'+Z));
  ids.forEach((id, i) => {
    const active = id === vista;
    if(paineis[i]) paineis[i].style.display = active ? '' : 'none';
    if(btns[i]){
      btns[i].classList.toggle('ativo', active);
      btns[i].setAttribute('aria-pressed', String(active));
    }
  });
  if(vista !== 'dados'){
    raioLazyRender(vista, Z);
  }
}
function bohrModo(modo, Z){
  const svgVal  = document.getElementById('bohr-svg-val-'+Z);
  const svgAll  = document.getElementById('bohr-svg-all-'+Z);
  const btnVal  = document.getElementById('bohr-btn-val-'+Z);
  const btnAll  = document.getElementById('bohr-btn-all-'+Z);
  if(!svgVal || !svgAll) return;
  const isVal = modo === 'val';
  svgVal.style.display  = isVal ? '' : 'none';
  svgAll.style.display  = isVal ? 'none' : '';
  btnVal.classList.toggle('ativo', isVal);
  btnVal.setAttribute('aria-pressed', String(isVal));
  btnAll.classList.toggle('ativo', !isVal);
  btnAll.setAttribute('aria-pressed', String(!isVal));
}
let estadoSeries={lantanideos:false,actinideos:false};
let elementoAtivo=null,divAtiva=null;
let filtroCategoria=null,filtroEstado=null;
const botoesToggle={},posicaoMap={};
const modalOverlay=document.getElementById('modalOverlay');
const btnClose=document.getElementById('btnClose');
function abrirModal(el,divEl){
  const est=ESTADO[el.numero]||'?';
  const cc=CAT_COLOR[el.cat]||'var(--text-dim)';
  const ccHex=getCatColorHex(el.cat)||'#888'; 
  const estHex=getEstadoHex(est);
  if(elementoAtivo===el.numero){fecharModal();return;}
  if(divAtiva)divAtiva.classList.remove('selected');
  elementoAtivo=el.numero;divAtiva=divEl;divEl.classList.add('selected');
  const sym=document.getElementById('modalSymbol');
  sym.textContent=el.simbolo;sym.style.color=ccHex;
  document.getElementById('modalNumber').textContent='#'+el.numero;
  const nm=document.getElementById('modalName');
  nm.textContent=el.nome;nm.style.color=ccHex;
  document.getElementById('modalMass').textContent='Massa: '+(MASSA[el.numero]||'—')+' u';
  const familia=FAMILIA[el.grupo]||'—';
  const periodo=(el.periodo||0)<=7?el.periodo:(el.cat==='Lantanídeo'?6:7);
  document.getElementById('modalMeta').textContent='Família '+familia+' · Período '+periodo+' · '+el.cat;
  document.getElementById('modalBadges').innerHTML=
    `<span class="badge" style="background:${estHex}22;color:${estHex};border-color:${estHex}55">${ESTADO_DOT[est]} ${ESTADO_LABEL[est]}</span>`+
    `<span class="badge" style="background:${ccHex}22;color:${ccHex};border-color:${ccHex}55">${el.cat}</span>`;
  document.getElementById('stateCard').style.borderLeftColor=estHex;
  document.getElementById('modalName').style.color=ccHex;
  document.getElementById('modalState').textContent=ESTADO_DESC[est];
  const Z=el.numero,N=calcNeutrons(Z);
  document.getElementById('modalParticles').innerHTML=
    `<div class="particle-box"><span class="pval" style="color:var(--orb-d)">${Z}</span><span class="plabel">Prótons</span></div>`+
    `<div class="particle-box"><span class="pval" style="color:var(--orb-f)">${N}</span><span class="plabel">Nêutrons</span></div>`+
    `<div class="particle-box"><span class="pval" style="color:var(--orb-s)">${Z}</span><span class="plabel">Elétrons</span></div>`;
  document.getElementById('modalConfig').innerHTML=renderConfig(Z);
  document.getElementById('modalObtencao').textContent=el.obtencao||'—';
  document.getElementById('modalCuriosidade').textContent=CURIOSIDADES[el.numero]||'—';
  document.getElementById("modalRaio").innerHTML=renderRaio(Z,el,ccHex);
  modalOverlay.classList.add('aberto');
  modalOverlay.setAttribute('aria-hidden','false');
  anunciar(`${el.nome}, número atômico ${Z}, ${el.cat}, ${ESTADO_LABEL[est]}.`);
  setTimeout(()=>btnClose.focus(),260);
}
function fecharModal(){
  modalOverlay.classList.remove('aberto');
  modalOverlay.setAttribute('aria-hidden','true');
  document.querySelector('.modal-body').scrollTop = 0;
  if(divAtiva){divAtiva.classList.remove('selected');divAtiva.focus();}
  elementoAtivo=null;divAtiva=null;
  anunciar('Modal fechado.');
}
btnClose.addEventListener('click',fecharModal);
modalOverlay.addEventListener('click',e=>{if(e.target===modalOverlay)fecharModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modalOverlay.classList.contains('aberto'))fecharModal();});
modalOverlay.addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const foc=[...modalOverlay.querySelectorAll('button,[tabindex="0"],[href],input,select,textarea')].filter(el=>!el.disabled);
  const first=foc[0],last=foc[foc.length-1];
  if(e.shiftKey){if(document.activeElement===first){e.preventDefault();last.focus();}}
  else{if(document.activeElement===last){e.preventDefault();first.focus();}}
});
function renderConfig(Z){
  const notacao=CONFIG_EC[Z];
  if(!notacao){
    return `<div class="ec-title">Notação eletrônica</div>
<p class="ec-aviso">Configuração não disponível para este elemento (Z=${Z}).</p>`;
  }
  const aviso = Z>=104
    ? `<p class="ec-aviso">⚠️ Configuração prevista por cálculos relativísticos — este é um elemento sintético superpesado.</p>`
    : '';
  const dist=distribuirEletrons(Z);
  const camadas=porCamada(dist);
  let html=`<div class="ec-title">Notação eletrônica</div>${aviso}<div class="ec-full" aria-label="Configuração eletrônica: ${notacao.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c).toString())}">${notacao}</div>
<div class="ec-title" style="margin-top:6px">Por camada (Diagrama de Pauling)</div><div class="ec-camadas">`;
  const nMax=Object.keys(camadas).length;
  for(let n=1;n<=nMax;n++){
    const nome=CAMADAS_NOME[n-1]||'?';
    const subs=camadas[n]||[];
    const orbs=subs.map(({sub,e})=>{
      const tipo=sub[1];
      const col={s:'var(--orb-s)',p:'var(--orb-p)',d:'var(--orb-d)',f:'var(--orb-f)'}[tipo]||'var(--text-dim)';
      const exp=String(e).split('').map(d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[parseInt(d)]).join('');
      return `<span class="ec-orbital" style="color:${col}" aria-label="${sub} com ${e} elétrons">${sub}${exp}</span>`;
    }).join(' ');
    html+=`<div class="ec-row"><span class="ec-camada-name" aria-label="Camada ${nome}">${nome}</span><div class="ec-orbitals">${orbs}</div></div>`;
  }
  return html+'</div>';
}
function abrirSerie(s){estadoSeries[s]=true;document.getElementById(`linha-${s}`)?.classList.remove('recolhida');if(botoesToggle[s]){botoesToggle[s].classList.add('aberta');botoesToggle[s].setAttribute('aria-expanded','true');}}
function fecharSerie(s){estadoSeries[s]=false;document.getElementById(`linha-${s}`)?.classList.add('recolhida');if(botoesToggle[s]){botoesToggle[s].classList.remove('aberta');botoesToggle[s].setAttribute('aria-expanded','false');}}
function aplicarDim(){
  document.querySelectorAll('.element[data-cat]').forEach(e=>{
    const Z=parseInt(e.dataset.z)||0;
    const ok=(!filtroCategoria||e.dataset.cat===filtroCategoria)&&(!filtroEstado||(ESTADO[Z]||'?')===filtroEstado);
    e.classList.toggle('dim',!ok);e.setAttribute('aria-hidden',String(!ok));
  });
  if(filtroEstado||filtroCategoria){
    const laOk=lantanideos.some(el=>(!filtroCategoria||el.cat===filtroCategoria)&&(!filtroEstado||(ESTADO[el.numero]||'?')===filtroEstado));
    const acOk=actinideos.some(el=>(!filtroCategoria||el.cat===filtroCategoria)&&(!filtroEstado||(ESTADO[el.numero]||'?')===filtroEstado));
    laOk?(!estadoSeries.lantanideos&&abrirSerie('lantanideos')):(estadoSeries.lantanideos&&fecharSerie('lantanideos'));
    acOk?(!estadoSeries.actinideos&&abrirSerie('actinideos')):(estadoSeries.actinideos&&fecharSerie('actinideos'));
    setTimeout(()=>{
      document.querySelectorAll('.element[data-cat]').forEach(e=>{
        const Z=parseInt(e.dataset.z)||0;
        const ok=(!filtroCategoria||e.dataset.cat===filtroCategoria)&&(!filtroEstado||(ESTADO[Z]||'?')===filtroEstado);
        e.classList.toggle('dim',!ok);
      });
    },60);
  }else{fecharSerie('lantanideos');fecharSerie('actinideos');}
}
function hexToRgba(hex,a){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return `rgba(${r},${g},${b},${a})`;}
function setItemAtivo(btn,cor){btn.style.setProperty('--item-color',cor);btn.style.setProperty('--item-bg',hexToRgba(cor,0.18));btn.classList.add('ativo');btn.setAttribute('aria-pressed','true');}
function clearItemAtivo(btn){btn.style.removeProperty('--item-color');btn.style.removeProperty('--item-bg');btn.classList.remove('ativo');btn.setAttribute('aria-pressed','false');}
function aplicarFiltroCat(cat){
  filtroCategoria=filtroCategoria===cat?null:cat;
  document.querySelectorAll('.legend-item[data-cat]').forEach(b=>b.dataset.cat===filtroCategoria?setItemAtivo(b,getCatColorHex(b.dataset.cat)||'#00e5ff'):clearItemAtivo(b));
  aplicarDim();anunciar(filtroCategoria?`Filtro: ${filtroCategoria}`:'Filtro de categoria removido');
}
function aplicarFiltroEstado(est){
  filtroEstado=filtroEstado===est?null:est;
  document.querySelectorAll('.legend-item[data-est]').forEach(b=>b.dataset.est===filtroEstado?setItemAtivo(b,getEstadoHex(b.dataset.est)||'#00e5ff'):clearItemAtivo(b));
  aplicarDim();anunciar(filtroEstado?`Filtro: ${ESTADO_LABEL[filtroEstado]}`:'Filtro de estado removido');
}
function registrarPosicao(el,div){const key=`${el.periodo||0}_${el.grupo}`;if(!posicaoMap[key])posicaoMap[key]=[];posicaoMap[key].push(div);}
function vizinho(g,p){return(posicaoMap[`${p}_${g}`]||[])[0]||null;}
function navegarTabela(e,div){
  const g=parseInt(div.dataset.grupo)||0,p=parseInt(div.dataset.periodo)||0;
  let alvo=null;
  if(e.key==='ArrowRight')alvo=vizinho(g+1,p)||vizinho(g+2,p)||vizinho(g+3,p);
  if(e.key==='ArrowLeft') alvo=vizinho(g-1,p)||vizinho(g-2,p)||vizinho(g-3,p);
  if(e.key==='ArrowDown') alvo=vizinho(g,p+1)||vizinho(g,p+2);
  if(e.key==='ArrowUp')   alvo=vizinho(g,p-1)||vizinho(g,p-2);
  if(alvo){e.preventDefault();alvo.focus();}
}
function criarEl(el){
  const div=document.createElement('div');
  div.className='element';
  div.dataset.cat=el.cat;div.dataset.z=el.numero;
  div.dataset.grupo=el.grupo;div.dataset.periodo=el.periodo||0;
  const est=ESTADO[el.numero]||'?';
  const ccHexEl=getCatColorHex(el.cat)||'#888';
  div.style.setProperty('--cat-color',ccHexEl);
  div.setAttribute('role','gridcell');div.setAttribute('tabindex','0');
  div.setAttribute('aria-label',`${el.nome}, símbolo ${el.simbolo}, número atômico ${el.numero}, ${el.cat}, estado ${ESTADO_LABEL[est]}${el.periodo?', período '+el.periodo:''}`);
  const massaEl = MASSA[el.numero]||'';
  div.innerHTML=
    `<div class="el-number" aria-hidden="true">${el.numero}</div>`+
    `<div class="el-symbol" style="color:${ccHexEl}" aria-hidden="true">${el.simbolo}</div>`+
    `<div class="el-name"   aria-hidden="true">${el.nome}</div>`+
    `<div class="el-mass"   aria-hidden="true">${massaEl}</div>`+
    `<div class="state-dot" aria-hidden="true">${ESTADO_DOT[est]}</div>`;
  div.addEventListener('click',()=>abrirModal(el,div));
  div.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();abrirModal(el,div);}
    navegarTabela(e,div);
  });
  registrarPosicao(el,div);
  return div;
}
function criarLegendaBar(){
}
function criarLegendaGridCell(container){
  const catCell = document.createElement('div');
  catCell.className = 'legend-grid-cats';
  catCell.setAttribute('role','group');
  catCell.setAttribute('aria-label','Filtros por categoria');
  const lcLbl = document.createElement('div');
  lcLbl.className='legend-section-label'; lcLbl.id='lblCats'; lcLbl.textContent='Categorias';
  catCell.appendChild(lcLbl);
  const gridCat = document.createElement('div');
  gridCat.className='legend-cats';
  gridCat.setAttribute('role','group'); gridCat.setAttribute('aria-labelledby','lblCats');
  Object.entries(CAT_COLOR).forEach(([cat])=>{
    const btn=document.createElement('button'); btn.className='legend-item'; btn.dataset.cat=cat;
    btn.setAttribute('aria-pressed','false'); btn.setAttribute('aria-label',`Filtrar por categoria: ${cat}`);
    btn.innerHTML=`<div class="legend-dot" aria-hidden="true" style="background:${getCatColorHex(cat)}"></div><span>${cat}</span>`;
    btn.addEventListener('click',()=>aplicarFiltroCat(cat)); gridCat.appendChild(btn);
  });
  catCell.appendChild(gridCat);
  container.appendChild(catCell);
  const stCell = document.createElement('div');
  stCell.className='legend-grid-states';
  stCell.setAttribute('role','group');
  stCell.setAttribute('aria-label','Filtros por estado físico');
  const leLbl = document.createElement('div');
  leLbl.className='legend-section-label'; leLbl.id='lblStates'; leLbl.textContent='Estado Físico (25 °C · 1 atm)';
  stCell.appendChild(leLbl);
  const gridEst = document.createElement('div');
  gridEst.className='legend-states';
  gridEst.setAttribute('role','group'); gridEst.setAttribute('aria-labelledby','lblStates');
  [{k:'S',label:'Sólido',emoji:'🧊'},{k:'L',label:'Líquido',emoji:'💧'},
   {k:'G',label:'Gasoso',emoji:'💨'},{k:'?',label:'Desconhecido',emoji:'🌀'}]
    .forEach(({k,label,emoji})=>{
      const btn=document.createElement('button'); btn.className='legend-item'; btn.dataset.est=k;
      btn.setAttribute('aria-pressed','false'); btn.setAttribute('aria-label',`Filtrar: ${label}`);
      btn.innerHTML=`<span aria-hidden="true">${emoji}</span><span>${label}</span>`;
      btn.addEventListener('click',()=>aplicarFiltroEstado(k)); gridEst.appendChild(btn);
    });
  stCell.appendChild(gridEst);
  container.appendChild(stCell);
}
function criarLegendaDemoCell(container){
  const cell = document.createElement('button');
  cell.className = 'legend-demo-cell';
  cell.setAttribute('type','button');
  cell.setAttribute('aria-haspopup','dialog');
  cell.setAttribute('aria-label','Abrir guia de leitura do card de elemento');
  cell.setAttribute('title','Como ler um card — clique para abrir o guia');
  cell.innerHTML = `
    <div class="legend-demo-body" aria-hidden="true">
      <div class="demo-card">
        <div class="d-num">79</div>
        <div class="d-sym" style="color:var(--c-transition)">Au</div>
        <div class="d-name">Ouro</div>
        <div class="d-mass">196,97 u</div>
        <div class="d-dot">🧊</div>
      </div>
    </div>
    <div class="legend-demo-footer" aria-hidden="true">
      <span class="legend-demo-footer-text">📖 Como ler ▶</span>
    </div>`;
  cell.addEventListener('click', abrirGuia);
  cell.addEventListener('keydown', e => {
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); abrirGuia(); }
  });
  container.appendChild(cell);
}
function abrirGuia(){
  const ov = document.getElementById('guiaOverlay');
  ov.classList.add('aberto');
  ov.setAttribute('aria-hidden','false');
  document.getElementById('btnGuiaClose').focus();
  anunciar('Guia de leitura do card aberto.');
}
function fecharGuia(){
  const ov = document.getElementById('guiaOverlay');
  ov.classList.remove('aberto');
  ov.setAttribute('aria-hidden','true');
  anunciar('Guia fechado.');
}
document.getElementById('btnGuiaClose').addEventListener('click', fecharGuia);
document.getElementById('guiaOverlay').addEventListener('click', e => {
  if(e.target === document.getElementById('guiaOverlay')) fecharGuia();
});
document.addEventListener('keydown', e => {
  if(e.key==='Escape' && document.getElementById('guiaOverlay').classList.contains('aberto')) fecharGuia();
});
document.getElementById('guiaOverlay').addEventListener('keydown', e => {
  if(e.key!=='Tab') return;
  const foc = [...document.getElementById('guiaOverlay')
    .querySelectorAll('button,[tabindex="0"],[href]')].filter(el=>!el.disabled);
  if(!foc.length) return;
  const first=foc[0], last=foc[foc.length-1];
  if(e.shiftKey){ if(document.activeElement===first){e.preventDefault();last.focus();} }
  else          { if(document.activeElement===last) {e.preventDefault();first.focus();} }
});
document.addEventListener('keydown', e => {
  if(e.key==='Escape' && document.getElementById('fullscreen-overlay')?.classList.contains('aberto')) fecharFullscreen();
});
document.getElementById('fullscreen-overlay')?.addEventListener('click', e => {
  if(e.target === document.getElementById('fullscreen-overlay')) fecharFullscreen();
});

function criarRotulos(c){
  for(let g=1;g<=18;g++){const d=document.createElement('div');d.className='family-label';d.style.cssText=`grid-column:${g+1};grid-row:1;`;d.textContent=g;d.setAttribute('aria-label',`Grupo ${g}`);c.appendChild(d);}
  for(let p=1;p<=7;p++){const d=document.createElement('div');d.className='period-label';d.style.cssText=`grid-column:1;grid-row:${p+1};`;d.textContent=p;d.setAttribute('aria-label',`Período ${p}`);c.appendChild(d);}
}
function criarBotaoSerie(serie){
  const cfgs={
    lantanideos:{numero:'57-71',simbolo:'La-Lu',nome:'Lant.',grupo:3,periodo:6,cat:'Lantanídeo',obtencao:'Série dos lantanídeos (Z=57–71).',curiosidade:'15 elementos (terras raras) usados em ímãs, lasers e fibra óptica.'},
    actinideos: {numero:'89-103',simbolo:'Ac-Lr',nome:'Actin.',grupo:3,periodo:7,cat:'Actinídeo',obtencao:'Série dos actinídeos (Z=89–103).',curiosidade:'15 elementos, maioria radioativa; incluem urânio e plutônio.'}
  };
  const cfg=cfgs[serie];const cc=getCatColorHex(cfg.cat)||'#888';
  const div=document.createElement('div');
  div.className='element serie-toggle';
  div.dataset.cat=cfg.cat;div.dataset.z=cfg.numero;div.dataset.grupo=cfg.grupo;div.dataset.periodo=cfg.periodo;
  div.setAttribute('role','button');div.setAttribute('tabindex','0');div.setAttribute('aria-expanded','false');
  div.setAttribute('aria-label',`${serie==='lantanideos'?'Lantanídeos':'Actinídeos'} — elementos ${cfg.numero}. Clique simples para expandir ou recolher. Clique duplo para abrir os detalhes.`);
  div.style.cssText=`grid-column:${cfg.grupo+1};grid-row:${cfg.periodo+1};--cat-color:${cc}`;
  div.innerHTML=
    `<div class="el-number" aria-hidden="true" style="font-size:calc(0.4rem * var(--font-scale))">${cfg.numero}</div>`+
    `<div class="el-symbol" aria-hidden="true" style="color:${cc};font-size:calc(0.52vw * var(--font-scale));line-height:1.1">${cfg.simbolo}</div>`+
    `<div class="el-name"   aria-hidden="true">${cfg.nome}</div>`+
    `<span class="toggle-arrow" aria-hidden="true" style="color:${cc}">&#9660;</span>`;
  let timerClique = null;
  const ESPERA_MS = 300;

  const handler = () => {
    if (timerClique) {
      clearTimeout(timerClique);
      timerClique = null;
      elementoAtivo = null;
      abrirModal({...cfg, numero: cfg.numero, grupo: cfg.grupo}, div);
      anunciar(`Detalhes da série ${serie === 'lantanideos' ? 'Lantanídeos' : 'Actinídeos'} abertos.`);
    } else {
      timerClique = setTimeout(() => {
        timerClique = null;
        const novoEstado = !estadoSeries[serie];
        estadoSeries[serie] = novoEstado;
        div.classList.toggle('aberta', novoEstado);
        div.setAttribute('aria-expanded', String(novoEstado));
        document.getElementById(`linha-${serie}`)?.classList.toggle('recolhida', !novoEstado);
        anunciar(novoEstado
          ? 'Série expandida. Clique duplo para abrir os detalhes.'
          : 'Série recolhida.');
      }, ESPERA_MS);
    }
  };

  div.addEventListener('click', handler);
  div.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
    navegarTabela(e, div);
  });
  botoesToggle[serie] = div;
  return div;
}
function criarLinha(serie,els,row){
  const w=document.createElement('div');w.id=`linha-${serie}`;w.className='linha-serie recolhida';w.setAttribute('role','row');
  els.forEach(el=>{const d=criarEl(el);d.style.gridColumn=el.grupo+1;d.style.gridRow=row;w.appendChild(d);});
  return w;
}

function renderizar(){
  const c=document.getElementById('periodic-table');
  criarRotulos(c);
  criarLegendaGridCell(c);
  criarLegendaDemoCell(c);
  elementosBase.forEach(el=>{const d=criarEl(el);d.style.gridColumn=el.grupo+1;d.style.gridRow=el.periodo+1;c.appendChild(d);});
  c.appendChild(criarBotaoSerie('lantanideos'));c.appendChild(criarBotaoSerie('actinideos'));
  const sep=document.createElement('div');sep.className='serie-separator';sep.style.gridRow='9';sep.setAttribute('aria-hidden','true');c.appendChild(sep);
  c.appendChild(criarLinha('lantanideos',lantanideos,10));
  c.appendChild(criarLinha('actinideos',actinideos,11));
  criarLegendaBar();
}
renderizar();
