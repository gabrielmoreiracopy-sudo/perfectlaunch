const demoDate = new Date("2026-07-08");

export const demoProject = {
  id: "demo-project",
  name: "Lançamento Perfeito - Demo",
  expert: "Gabriel Moreira",
  product: "Mentoria Lançamento Perfeito",
  launchType: "Lançamento interno",
  logoUrl: "",
  notes: "Projeto demonstrativo inicial.",
  status: "Em andamento",
  revenueGoal: 150000,
  leadsGoal: 5000,
  budget: 12000,
  startDate: new Date("2026-06-01"),
  openCartDate: demoDate,
  closeCartDate: new Date("2026-07-15"),
  createdAt: new Date("2026-05-03")
};

export const demoProjectFull = {
  ...demoProject,
  strategy: {
    id: "demo-strategy",
    projectId: demoProject.id,
    niche: "Infoprodutores e especialistas em fase de primeiro lançamento.",
    avatar: "Especialista com conhecimento validado, audiência pequena e pouca estrutura comercial.",
    pains: "Falta de clareza, funil confuso, medo de lançar e baixa previsibilidade.",
    desires: "Campanha simples, organizada, com comunicação clara e metas visíveis.",
    objections: "Não tenho audiência suficiente; não sei escrever copy; tenho pouco tempo.",
    promise: "Criar um lançamento organizado e pronto para vender em 30 dias."
  },
  offer: {
    id: "demo-offer",
    projectId: demoProject.id,
    name: "Mentoria Lançamento Perfeito",
    deliverables: "Aulas ao vivo, templates, calendário de campanha e revisão de funil.",
    bonuses: "Checklist de CPLs, biblioteca de copies e planilha de métricas.",
    price: 2997,
    guarantee: "Garantia incondicional de 7 dias.",
    mechanism: "Método ROMA: rota, oferta, mensagem e aquisição."
  },
  contents: [
    {
      id: "demo-cpl1",
      projectId: demoProject.id,
      type: "CPL1",
      objective: "Gerar consciência do problema.",
      script: "História do erro comum em lançamentos sem plano.",
      cta: "Entrar no grupo VIP",
      status: "Em andamento"
    },
    {
      id: "demo-cpl2",
      projectId: demoProject.id,
      type: "CPL2",
      objective: "Ensinar o mapa do lançamento.",
      script: "Passo a passo da estrutura mínima de campanha.",
      cta: "Responder pesquisa de intenção",
      status: "Pendente"
    },
    {
      id: "demo-cpl3",
      projectId: demoProject.id,
      type: "CPL3",
      objective: "Quebrar objeções.",
      script: "Estudos de caso e erros que travam a conversão.",
      cta: "Ativar lembrete da abertura",
      status: "Pendente"
    },
    {
      id: "demo-vsl",
      projectId: demoProject.id,
      type: "VSL",
      objective: "Apresentar oferta.",
      script: "Promessa, mecanismo, prova, oferta e chamada.",
      cta: "Garantir minha vaga",
      status: "Pendente"
    }
  ],
  creatives: [
    {
      id: "demo-creative",
      projectId: demoProject.id,
      name: "Anuncio dor principal",
      platform: "Meta Ads",
      format: "Reels",
      angle: "Campanha organizada",
      hook: "Seu lançamento não precisa ser um caos",
      copy: "Veja como planejar a campanha em etapas simples.",
      link: "https://example.com/captura",
      status: "Pendente"
    }
  ],
  pages: [
    { id: "demo-page-1", projectId: demoProject.id, name: "Captura", url: "https://example.com/captura", status: "Em andamento" },
    { id: "demo-page-2", projectId: demoProject.id, name: "Obrigado", url: "https://example.com/obrigado", status: "Pendente" },
    { id: "demo-page-3", projectId: demoProject.id, name: "Vendas", url: "https://example.com/vendas", status: "Pendente" }
  ],
  trackingLinks: [
    {
      id: "demo-utm",
      projectId: demoProject.id,
      name: "Meta CPL1",
      url: "https://example.com/captura",
      utmSource: "meta",
      utmMedium: "paid",
      utmCampaign: "lp-cpl1"
    }
  ],
  messages: [
    {
      id: "demo-message",
      projectId: demoProject.id,
      channel: "email",
      phase: "Aquecimento",
      objective: "Entregar valor e gerar antecipação.",
      content: "O maior erro de um lançamento e como evitar.",
      cta: "Assistir ao CPL1",
      link: "https://example.com/cpl1",
      sendDate: new Date("2026-06-20")
    }
  ],
  leads: [
    {
      id: "demo-lead",
      projectId: demoProject.id,
      name: "Ana Souza",
      contact: "ana@example.com",
      status: "em conversa",
      temperature: "quente",
      objection: "Precisa validar agenda",
      notes: "Interessada na mentoria com acompanhamento."
    }
  ],
  files: [
    {
      id: "demo-file",
      projectId: demoProject.id,
      name: "Mapa da campanha",
      type: "Documento",
      url: "https://example.com/mapa",
      description: "Documento central com etapas do lançamento."
    }
  ]
};
