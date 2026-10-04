// Infratech — scripts compartilhados por todas as páginas
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ano no rodapé
  document.querySelectorAll('[data-ano]').forEach(el => el.textContent = new Date().getFullYear());

  // Menu do celular
  const header = document.querySelector('header');
  const menuBtn = document.querySelector('.menu-btn');
  if (header && menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = header.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    header.querySelectorAll('.links a').forEach(a => a.addEventListener('click', () => header.classList.remove('open')));
  }

  // Vídeo do banner: aparece só se o arquivo existir
  const bv = document.getElementById('banner-video');
  if (bv) {
    if (reduce) bv.remove();
    else {
      const ok = () => { bv.setAttribute('data-ok', ''); bv.closest('.stage')?.classList.add('has-video'); };
      // o vídeo pode começar antes deste script carregar, então confere os dois casos
      if (!bv.paused && bv.readyState > 2) ok();
      bv.addEventListener('playing', ok, { once: true });
      bv.addEventListener('timeupdate', ok, { once: true });
      bv.play && bv.play().catch(() => {});
    }
  }

  // Luzes de Natal piscando sobre a foto do banner
  // Pontos (x, y de 0 a 1) das luzes da foto assets/banner-shopping.jpg. Se trocar a foto, apague ou ajuste esta lista.
  const LUZES = [[0.8241,0.5138],[0.4604,0.6672],[0.5258,0.4555],[0.4438,0.4555],[0.4834,0.1902],[0.4899,0.3482],[0.5396,0.2316],[0.2808,0.4678],[0.209,0.3865],[0.5166,0.434],[0.5451,0.6258],[0.4401,0.3405],[0.5101,0.4279],[0.2017,0.5153],[0.4641,0.3727],[0.4494,0.2791],[0.4392,0.5107],[0.2541,0.5138],[0.5239,0.2101],[0.5285,0.2362],[0.1694,0.6089],[0.4991,0.6334],[0.639,0.566],[0.5387,0.3221],[0.4365,0.2638],[0.7707,0.4494],[0.5028,0.2132],[0.1998,0.5353],[0.5497,0.3574],[0.1915,0.4678],[0.7726,0.4003],[0.6621,0.3865],[0.1593,0.3666],[0.8389,0.4877],[0.4346,0.2776],[0.3158,0.4862],[0.4355,0.2975],[0.6878,0.3834],[0.7882,0.4156],[0.4622,0.6365],[0.6584,0.5445],[0.6584,0.5107],[0.3775,0.388],[0.6832,0.5429],[0.1731,0.6012],[0.5368,0.4387],[0.4678,0.5506],[0.547,0.3405],[0.4807,0.3098],[0.2716,0.431],[0.1713,0.6212],[0.547,0.4586],[0.1952,0.431],[0.5138,0.3482],[0.4705,0.2607],[0.1621,0.5199],[0.4401,0.5752],[0.1943,0.6365],[0.3361,0.4479],[0.4494,0.4126],[0.5488,0.2745],[0.2053,0.6043],[0.326,0.612],[0.4687,0.6028],[0.6694,0.4325],[0.5424,0.635],[0.4742,0.2899],[0.7799,0.4509],[0.546,0.1764],[0.5433,0.385],[0.4392,0.2239],[0.547,0.25],[0.512,0.3865],[0.3066,0.5015],[0.512,0.4709],[0.5018,0.4448],[0.3831,0.5138],[0.3453,0.3788],[0.5046,0.4294],[0.7772,0.408],[0.5359,0.5245],[0.3711,0.4003],[0.4871,0.1825],[0.4448,0.6074],[0.6326,0.5782],[0.4392,0.1641],[0.4742,0.3344],[0.4309,0.2853],[0.7652,0.3512],[0.4613,0.612],[0.4622,0.158],[0.7486,0.3988],[0.454,0.3206],[0.5138,0.2393],[0.4862,0.1334],[0.6473,0.5782],[0.5405,0.4571],[0.7652,0.4156],[0.4438,0.6227],[0.5055,0.546],[0.2394,0.5997],[0.5018,0.2945],[0.8112,0.5736],[0.2017,0.4095],[0.4411,0.388],[0.5479,0.2347],[0.4963,0.1871],[0.5092,0.1748],[0.5479,0.4693],[0.4383,0.6534],[0.6924,0.4555],[0.2247,0.5399],[0.4678,0.2485],[0.5184,0.4617],[0.4954,0.1718],[0.2136,0.5905],[0.651,0.385],[0.4761,0.4064],[0.349,0.4325],[0.7127,0.4003],[0.3122,0.5951],[0.4365,0.3482],[0.4401,0.589],[0.5368,0.4755],[0.5129,0.5429],[0.1998,0.4678],[0.5203,0.3696],[0.4632,0.3006],[0.5239,0.1748],[0.4328,0.1764],[0.4503,0.5721],[0.5175,0.4034],[0.4825,0.4785],[0.4355,0.2439],[0.5276,0.3727],[0.5414,0.2623],[0.4448,0.5583],[0.4733,0.2009],[0.4475,0.3359],[0.5479,0.4248],[0.4972,0.1488],[0.4604,0.3942],[0.2284,0.6166],[0.6621,0.5798],[0.639,0.3696],[0.5359,0.6396],[0.5442,0.4847],[0.2643,0.3957],[0.5055,0.6656],[0.4641,0.2592],[0.2127,0.4724],[0.4825,0.1764],[0.8039,0.4923],[0.4963,0.4632],[0.4761,0.6626],[0.639,0.5445],[0.2468,0.3804],[0.7624,0.454],[0.5175,0.2837],[0.5157,0.4187],[0.5451,0.5353],[0.2228,0.5521],[0.4669,0.1442],[0.3416,0.3436],[0.5083,0.4371],[0.4825,0.2837],[0.8241,0.4064],[0.5424,0.523],[0.547,0.3236],[0.4448,0.638],[0.756,0.3742],[0.4687,0.5368],[0.4346,0.3313],[0.4521,0.5997],[0.2716,0.3558],[0.3858,0.431],[0.4678,0.4954],[0.3149,0.4387],[0.5239,0.362],[0.3297,0.5583],[0.4586,0.3804],[0.5184,0.5015],[0.6998,0.4018],[0.5451,0.5107],[0.3223,0.5767],[0.4337,0.2224],[0.4613,0.3589],[0.4392,0.4985],[0.5064,0.5031],[0.4715,0.1733],[0.5018,0.2377],[0.2532,0.3497],[0.8573,0.4509],[0.4834,0.6319],[0.4936,0.2546],[0.5442,0.6135],[0.4991,0.5307],[0.4346,0.204],[0.2762,0.4785],[0.4724,0.3497],[0.5166,0.3788],[0.4669,0.2837],[0.4871,0.2147],[0.4401,0.4433],[0.4438,0.5383],[0.5138,0.3972],[0.4991,0.4724],[0.442,0.5982],[0.698,0.3788],[0.4401,0.6288],[0.1823,0.6411],[0.4641,0.319],[0.5479,0.2025],[0.2063,0.569],[0.5433,0.2929],[0.4991,0.5552],[0.2403,0.4126],[0.5378,0.1794],[0.4751,0.6794],[0.3766,0.4479]];
  const cv = document.querySelector('.twinkle');
  if (cv && !reduce) {
    const img = cv.previousElementSibling;
    const ctx = cv.getContext('2d');
    const luz = LUZES.map(p => ({ x: p[0], y: p[1], f: 1.5 + Math.random() * 3.5, ph: Math.random() * 6.28, s: .6 + Math.random() * .8 }));
    let w = 0, h = 0, map = null, visivel = true;
    const medir = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const iw = img.naturalWidth || 1920, ih = img.naturalHeight || 1153;
      const s = Math.max(w / iw, h / ih);
      map = { s: s, ox: (w - iw * s) / 2, oy: (h - ih * s) / 2, iw: iw, ih: ih };
    };
    const desenhar = (t) => {
      if (visivel && map) {
        ctx.clearRect(0, 0, w, h);
        const k = Math.max(.7, map.s * 1.6);
        for (const p of luz) {
          const v = Math.pow((Math.sin(t / 1000 * p.f + p.ph) + 1) / 2, 6);   // picos curtos = cintilar
          if (v < .05) continue;
          const x = map.ox + p.x * map.iw * map.s, y = map.oy + p.y * map.ih * map.s;
          const r = (2 + v * 5) * p.s * k;
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, 'rgba(255,250,225,' + v + ')');
          g.addColorStop(.35, 'rgba(255,205,120,' + v * .6 + ')');
          g.addColorStop(1, 'rgba(255,170,60,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
        }
      }
      requestAnimationFrame(desenhar);
    };
    const iniciar = () => { medir(); requestAnimationFrame(desenhar); };
    if (img.complete) iniciar(); else img.addEventListener('load', iniciar, { once: true });
    addEventListener('resize', medir);
    if ('IntersectionObserver' in window) new IntersectionObserver(e => visivel = e[0].isIntersecting).observe(cv);
  }

  // Rastros de movimento no banner (sensação de shopping lotado)
  const streaks = document.querySelector('.streaks');
  if (streaks && !reduce) {
    const cores = ['#FFE2B0', '#FFFFFF', '#FFB23F', '#9CC8FF', '#FFD08A'];
    const total = innerWidth < 700 ? 14 : 26;
    for (let i = 0; i < total; i++) {
      const t = document.createElement('i');
      const topo = 56 + Math.random() * 40;              // só na metade de baixo, onde fica o piso
      const perto = (topo - 56) / 40;                    // mais perto da câmera = mais grosso e mais rápido
      t.style.top = topo + '%';
      t.style.setProperty('--h', (1 + perto * 2.5).toFixed(1) + 'px');
      t.style.setProperty('--l', (8 + Math.random() * 16) + '%');
      t.style.setProperty('--d', (2.6 - perto * 1.5 + Math.random() * .6).toFixed(2) + 's');
      t.style.setProperty('--w', (-Math.random() * 3).toFixed(2) + 's');
      t.style.setProperty('--o', (.35 + Math.random() * .5).toFixed(2));
      t.style.setProperty('--c', cores[i % cores.length]);
      if (i % 2) t.className = 'r';
      streaks.appendChild(t);
    }
  }

  // Revelar blocos ao rolar (o conteúdo é visível mesmo sem JS)
  if ('IntersectionObserver' in window && !reduce) {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });
    setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('in')), 2500);
  }

  // Brilho que segue o cursor nos cartões
  document.querySelectorAll('.glass').forEach(el => el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }));

  // Formulário de contato (só existe na página Contato)
  const form = document.getElementById('form-contato');
  if (form) {
    const status = document.getElementById('status');
    // pré-seleciona o interesse quando vem de um link como contato.html?interesse=mobile
    const pre = new URLSearchParams(location.search).get('interesse');
    if (pre) {
      const map = { integracoes: 0, mobile: 1, sistemas: 2, automacoes: 3 };
      if (pre in map) form.interesse.selectedIndex = map[pre];
    }
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = '';
      const nome = form.nome.value.trim(), email = form.email.value.trim();
      if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.className = 'err';
        status.textContent = 'Preencha seu nome e um e-mail válido.';
        return;
      }
      const btn = form.querySelector('button');
      btn.disabled = true; btn.textContent = 'Enviando…';
      try {
        // Netlify Forms: envia como formulário comum para a raiz do site
        const r = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        });
        if (!r.ok) throw new Error('falha');
        status.className = 'ok';
        status.textContent = 'Mensagem enviada. Retornaremos em até 1 dia útil.';
        form.reset();
      } catch (err) {
        status.className = 'err';
        status.innerHTML = 'Não foi possível enviar agora. Tente novamente ou <a href="https://wa.me/5511986489257" target="_blank" rel="noopener">fale pelo WhatsApp</a>.';
      } finally {
        btn.disabled = false; btn.textContent = 'Enviar mensagem';
      }
    });
  }
})();

// Robozinho assistente com IA
(function () {
  const wrap = document.getElementById('bot');
  if (!wrap) return;
  const btn = wrap.querySelector('.bot');
  const panel = document.getElementById('bot-panel');
  const bubble = document.getElementById('bot-bubble');
  const eyes = wrap.querySelector('.bot-eyes');
  const log = document.getElementById('chat-log');
  const chips = document.getElementById('chat-chips');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const sendBtn = form.querySelector('button');
  const WA = '5511986489257';
  const WA_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.5L3 29l6.7-1.7A13 13 0 1 0 16 3zm6 18.7c-.3.8-1.5 1.5-2.2 1.5-.6.1-1.3.1-2-.1-.5-.2-1-.3-1.8-.7-3.2-1.4-5.3-4.6-5.4-4.8-.2-.2-1.3-1.7-1.3-3.3s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.6.3.6.9 2.2 1 2.3.1.2.1.4 0 .6-.1.2-.2.4-.3.5l-.5.6c-.2.2-.3.3-.1.7.2.3.8 1.4 1.8 2.2 1.2 1.1 2.3 1.4 2.6 1.6.3.2.5.1.7-.1.2-.2.8-.9 1-1.3.2-.3.4-.3.7-.2.3.1 1.9.9 2.2 1 .3.2.5.2.6.4.1.1.1.7-.2 1.5z"/></svg>';
  const DEMO = window.INFRATECH_CHAT_DEMO === true;

  // conversa guardada durante a visita, para continuar ao trocar de página
  let historico = [];
  let encaminhado = false;
  try {
    const salvo = JSON.parse(sessionStorage.getItem('infratechChat') || 'null');
    if (salvo) { historico = salvo.h || []; encaminhado = !!salvo.e; }
  } catch (e) {}
  const salvar = () => { try { sessionStorage.setItem('infratechChat', JSON.stringify({ h: historico.slice(-20), e: encaminhado })); } catch (e) {} };

  const rolar = () => { log.scrollTop = log.scrollHeight; };
  const bolha = (texto, quem, extra) => {
    const d = document.createElement('div');
    d.className = 'msg ' + quem + (extra ? ' ' + extra : '');
    d.textContent = texto;
    log.appendChild(d); rolar();
    return d;
  };
  const cartaoWhats = (resumo) => {
    const d = document.createElement('div');
    d.className = 'handoff';
    const texto = resumo || 'Olá! Vim pelo site da Infratech e gostaria de falar com um especialista.';
    d.innerHTML = '<small>Continue com um especialista. A mensagem já vai com o resumo da conversa.</small>';
    const a = document.createElement('a');
    a.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(texto);
    a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = WA_ICON + 'Continuar no WhatsApp';
    d.appendChild(a); log.appendChild(d); rolar();
  };

  const SAUDACAO = 'Olá! 👋 Sou o assistente da Infratech. Posso explicar nossas soluções para o varejo ou entender o seu desafio. Como posso ajudar?';
  let iniciado = false;
  const iniciar = () => {
    if (iniciado) return; iniciado = true;
    bolha(SAUDACAO, 'ia');
    historico.forEach(m => bolha(m.content, m.role === 'user' ? 'eu' : 'ia'));
    if (historico.length) chips.hidden = true;
    if (encaminhado) cartaoWhats(encaminhado === true ? '' : encaminhado);
  };

  const abrir = (sim) => {
    panel.hidden = !sim;
    bubble.hidden = true;
    btn.setAttribute('aria-expanded', sim);
    if (sim) { iniciar(); setTimeout(() => input.focus(), 50); }
  };
  btn.addEventListener('click', () => abrir(panel.hidden));
  wrap.querySelector('.bot-close').addEventListener('click', () => abrir(false));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) abrir(false); });
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) abrir(false); });
  bubble.addEventListener('click', () => abrir(true));

  // respostas de demonstração (usadas só na prévia, sem servidor)
  const demo = (txt) => {
    const t = txt.toLowerCase();
    if (/pessoa|humano|especialista|orçamento|orcamento|proposta|reuni/.test(t))
      return { reply: 'Claro! Um especialista pode te atender pelo WhatsApp. Antes, qual é o seu nome e o nome da sua empresa?', handoff: 'Olá! Vim pelo site da Infratech e gostaria de falar com um especialista.' };
    if (/segmento|supermercado|moda|farm|constru|eletro|distribuidor/.test(t))
      return { reply: 'Atendemos supermercados, moda e calçados, farmácias, materiais de construção, eletro e eletrônicos, distribuidores e indústria. Qual é o segmento da sua empresa e quantas lojas vocês têm?' };
    if (/diagn/.test(t))
      return { reply: 'O diagnóstico é gratuito e leva de 1 a 2 semanas. Mapeamos seus sistemas, processos e gargalos e, no final, enviamos uma proposta com escopo, prazo e investimento. Quer agendar?' };
    if (/solu|servi|oferec|fazem/.test(t))
      return { reply: 'Temos quatro frentes:\n• Integrações entre ERP, PDV, e-commerce e marketplaces\n• Apps mobile para clientes e equipe\n• Sistemas sob medida e dashboards\n• Automações como conciliação e preços em massa\nQual delas faz mais sentido para você?' };
    return { reply: 'Entendi! Para eu te ajudar melhor, me conta um pouco sobre a sua operação: qual é o segmento e qual desafio você quer resolver?' };
  };

  let ocupado = false;
  const enviar = async (texto) => {
    texto = texto.trim();
    if (!texto || ocupado) return;
    ocupado = true; sendBtn.disabled = true; chips.hidden = true;
    bolha(texto, 'eu');
    historico.push({ role: 'user', content: texto }); salvar();
    const dig = document.createElement('div');
    dig.className = 'typing'; dig.innerHTML = '<i></i><i></i><i></i>';
    log.appendChild(dig); rolar();
    try {
      let dados;
      if (DEMO) {
        await new Promise(r => setTimeout(r, 900));
        dados = Object.assign({ ok: true }, demo(texto));
      } else {
        const r = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: historico })
        });
        dados = await r.json().catch(() => ({}));
        if (!r.ok || !dados.ok) throw new Error(dados.erro || 'falha');
      }
      dig.remove();
      bolha(dados.reply, 'ia');
      historico.push({ role: 'assistant', content: dados.reply });
      if (dados.handoff) {
        encaminhado = dados.handoff; cartaoWhats(dados.handoff);
        // registra o contato no painel da Netlify (Forms › lead-chat)
        if (!DEMO) {
          const conversa = historico.map(m => (m.role === 'user' ? 'Visitante: ' : 'Assistente: ') + m.content).join('\n\n');
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ 'form-name': 'lead-chat', resumo: dados.handoff, conversa }).toString()
          }).catch(() => {});
        }
      }
      salvar();
    } catch (e) {
      dig.remove();
      historico.pop(); salvar();
      bolha('Não consegui responder agora. Você pode falar direto com um especialista pelo WhatsApp:', 'ia', 'erro');
      cartaoWhats('');
    } finally {
      ocupado = false; sendBtn.disabled = false; input.focus();
    }
  };

  form.addEventListener('submit', e => { e.preventDefault(); const t = input.value; input.value = ''; enviar(t); });
  chips.querySelectorAll('button').forEach(b => b.addEventListener('click', () => enviar(b.textContent)));

  // balão de boas-vindas: aparece uma vez por visita
  let visto = false;
  try { visto = sessionStorage.getItem('botOi') === '1'; } catch (e) {}
  if (!visto) {
    setTimeout(() => {
      if (panel.hidden) bubble.hidden = false;
      try { sessionStorage.setItem('botOi', '1'); } catch (e) {}
      setTimeout(() => { bubble.hidden = true; }, 7000);
    }, 3500);
  }

  // olhos acompanham o cursor
  addEventListener('pointermove', e => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 300);
    eyes.style.transform = `translate(${(dx / d * 4 * k).toFixed(1)}px, ${(dy / d * 3 * k).toFixed(1)}px)`;
  }, { passive: true });
})();
