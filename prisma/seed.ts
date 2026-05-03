import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingProjects = await prisma.project.count();

  if (existingProjects > 0) {
    console.log("Seed ignorado: já existem projetos no banco.");
    return;
  }

  const project = await prisma.project.create({
    data: {
      name: "Lançamento Perfeito - Turma Piloto",
      expert: "Gabriel Moreira",
      product: "Mentoria Lançamento Perfeito",
      launchType: "Lançamento interno",
      status: "Em andamento",
      revenueGoal: 150000,
      leadsGoal: 5000,
      budget: 12000,
      startDate: new Date("2026-06-01"),
      openCartDate: new Date("2026-07-08"),
      closeCartDate: new Date("2026-07-15"),
      strategy: {
        create: {
          niche: "Infoprodutores e especialistas que querem estruturar seu primeiro lançamento",
          avatar: "Especialista com audiência pequena, conhecimento validado e dificuldade para organizar campanha",
          pains: "Falta de clareza, baixa conversão, calendário confuso e medo de lançar",
          desires: "Previsibilidade, plano simples, campanha organizada e vendas com confiança",
          objections: "Não tenho audiência suficiente; não sei escrever copy; tenho pouco tempo",
          promise: "Criar um lançamento simples, organizado e pronto para vender em 30 dias"
        }
      },
      offer: {
        create: {
          name: "Mentoria Lançamento Perfeito",
          deliverables: "Aulas ao vivo, templates, calendário de campanha e revisão de funil",
          bonuses: "Checklist de CPLs, biblioteca de copies e planilha de métricas",
          price: 2997,
          guarantee: "Garantia incondicional de 7 dias",
          mechanism: "Método ROMA: rota, oferta, mensagem e aquisição"
        }
      },
      contents: {
        create: [
          {
            type: "CPL1",
            objective: "Gerar consciência do problema e abrir o loop do método",
            script: "História do erro comum em lançamentos sem plano.",
            cta: "Entrar no grupo VIP",
            status: "Em andamento"
          },
          {
            type: "CPL2",
            objective: "Ensinar o mapa do lançamento e reforçar autoridade",
            script: "Passo a passo da estrutura mínima de campanha.",
            cta: "Responder pesquisa de intenção",
            status: "Pendente"
          },
          {
            type: "CPL3",
            objective: "Quebrar objeções e antecipar a oferta",
            script: "Estudos de caso e erros que travam a conversão.",
            cta: "Ativar lembrete da abertura",
            status: "Pendente"
          },
          {
            type: "VSL",
            objective: "Apresentar oferta e conduzir para aplicação/checkout",
            script: "Promessa, mecanismo, prova, oferta e chamada.",
            cta: "Garantir minha vaga",
            status: "Pendente"
          }
        ]
      },
      creatives: {
        create: [
          {
            name: "Anuncio dor principal",
            platform: "Meta Ads",
            format: "Reels",
            angle: "Campanha organizada",
            hook: "Seu lançamento não precisa ser um caos",
            copy: "Veja como planejar a campanha em etapas simples.",
            link: "https://example.com/captura",
            status: "Pendente"
          }
        ]
      },
      pages: {
        create: [
          { name: "Captura", url: "https://example.com/captura", status: "Em andamento" },
          { name: "Obrigado", url: "https://example.com/obrigado", status: "Pendente" },
          { name: "Vendas", url: "https://example.com/vendas", status: "Pendente" }
        ]
      },
      trackingLinks: {
        create: [
          {
            name: "Meta CPL1",
            url: "https://example.com/captura",
            utmSource: "meta",
            utmMedium: "paid",
            utmCampaign: "lp-cpl1"
          }
        ]
      },
      messages: {
        create: [
          {
            channel: "email",
            phase: "Aquecimento",
            objective: "Entregar valor e gerar antecipação",
            content: "O maior erro de um lançamento e como evitar.",
            cta: "Assistir ao CPL1",
            link: "https://example.com/cpl1",
            sendDate: new Date("2026-06-20")
          }
        ]
      },
      leads: {
        create: [
          {
            name: "Ana Souza",
            contact: "ana@example.com",
            status: "em conversa",
            temperature: "quente",
            objection: "Precisa validar agenda",
            notes: "Interessada na mentoria com acompanhamento."
          }
        ]
      },
      files: {
        create: [
          {
            name: "Mapa da campanha",
            type: "Documento",
            url: "https://example.com/mapa",
            description: "Documento central com etapas do lançamento."
          }
        ]
      }
    }
  });

  console.log(`Seed criado: ${project.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
