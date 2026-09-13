export const models = {
  financial: {
    title: "Forecast financeiro",
    eyebrow: "Modelo financeiro",
    summary: "Antecipe receitas, custos e caixa com cenários que tornam o planejamento mais objetivo.",
    file: "01_financial-forecast.xlsx",
    steps: ["Defina receitas e custos", "Compare cenários", "Planeje o caixa"],
    metrics: [
      { value: "R$ 482.600", label: "receita projetada" },
      { value: "18 meses", label: "horizonte de análise" },
      { value: "3 cenários", label: "para decidir com clareza" },
    ],
    visual: {
      ariaLabel: "Prévia do modelo financeiro",
      topline: ["VISÃO GERAL", "2025 / 2026"],
      value: "R$ 482.600",
      label: "receita projetada",
      bars: [30, 45, 38, 62, 55, 78, 91],
      legend: ["Realizado", "Projetado"],
    },
    workspace: {
      sheet: "Fluxo de caixa",
      headers: ["Mês", "Receita", "Saldo"],
      rows: [["Jan", "R$ 38.200", "R$ 74.600"], ["Fev", "R$ 41.500", "R$ 81.900"], ["Mar", "R$ 46.300", "R$ 92.400"]],
    },
  },
  sales: {
    title: "Pipeline comercial",
    eyebrow: "Modelo de vendas",
    summary: "Organize oportunidades, priorize negociações e acompanhe a previsão de receita.",
    file: "02_sales-pipeline.xlsx",
    steps: ["Registre oportunidades", "Priorize negociações", "Projete receitas"],
    metrics: [
      { value: "R$ 326.000", label: "em oportunidades" },
      { value: "42 negócios", label: "no pipeline" },
      { value: "28%", label: "conversão esperada" },
    ],
    visual: {
      ariaLabel: "Prévia do modelo de vendas",
      topline: ["PIPELINE", "MÊS ATUAL"],
      value: "R$ 326.000",
      label: "em oportunidades",
      bars: [88, 72, 58, 43, 31, 24, 16],
      legend: ["Entrada", "Fechamento"],
    },
    workspace: {
      sheet: "Pipeline ativo",
      headers: ["Etapa", "Negócios", "Valor"],
      rows: [["Proposta", "14", "R$ 118.000"], ["Negociação", "9", "R$ 84.000"], ["Fechamento", "5", "R$ 46.000"]],
    },
  },
  marketing: {
    title: "Performance de marketing",
    eyebrow: "Modelo de marketing",
    summary: "Compare canais, acompanhe campanhas e encontre onde seu investimento gera mais retorno.",
    file: "03_marketing-performance.xlsx",
    steps: ["Reúna resultados", "Compare canais", "Ajuste investimentos"],
    metrics: [
      { value: "4,2x", label: "retorno sobre investimento" },
      { value: "R$ 38,40", label: "custo por lead" },
      { value: "6 canais", label: "em comparação" },
    ],
    visual: {
      ariaLabel: "Prévia do modelo de marketing",
      topline: ["CAMPANHAS", "ÚLTIMOS 90 DIAS"],
      value: "4,2x",
      label: "retorno sobre investimento",
      bars: [35, 52, 48, 67, 73, 69, 86],
      legend: ["Investimento", "Retorno"],
    },
    workspace: {
      sheet: "Canais e retorno",
      headers: ["Canal", "CPL", "Retorno"],
      rows: [["Busca", "R$ 32,10", "4,8x"], ["Social", "R$ 41,20", "3,9x"], ["E-mail", "R$ 18,80", "6,1x"]],
    },
  },
  inventory: {
    title: "Planejamento de estoque",
    eyebrow: "Modelo de estoque",
    summary: "Antecipe reposições e mantenha os itens certos disponíveis no momento de maior demanda.",
    file: "04_inventory-planning.xlsx",
    steps: ["Cadastre os itens", "Defina níveis de reposição", "Acompanhe alertas"],
    metrics: [
      { value: "128 itens", label: "monitorados" },
      { value: "21 dias", label: "cobertura média" },
      { value: "9 alertas", label: "para reposição" },
    ],
    visual: {
      ariaLabel: "Prévia do modelo de estoque",
      topline: ["ESTOQUE", "COBERTURA ATUAL"],
      value: "21 dias",
      label: "cobertura média",
      bars: [76, 64, 82, 51, 68, 42, 57],
      legend: ["Estoque atual", "Nível ideal"],
    },
    workspace: {
      sheet: "Reposição",
      headers: ["Item", "Atual", "Ação"],
      rows: [["Linha A", "9 dias", "Repor"], ["Linha B", "28 dias", "Monitorar"], ["Linha C", "12 dias", "Repor"]],
    },
  },
  projects: {
    title: "Orçamento de projeto",
    eyebrow: "Modelo de projetos",
    summary: "Acompanhe o previsto, o realizado e as variações para conduzir cada entrega com segurança.",
    file: "05_project-budget.xlsx",
    steps: ["Liste as entregas", "Planeje o orçamento", "Acompanhe variações"],
    metrics: [
      { value: "R$ 184.000", label: "orçamento total" },
      { value: "12 etapas", label: "no cronograma" },
      { value: "4,8%", label: "variação atual" },
    ],
    visual: {
      ariaLabel: "Prévia do modelo de projetos",
      topline: ["ORÇAMENTO", "PROJETO ATUAL"],
      value: "R$ 184.000",
      label: "orçamento total",
      bars: [22, 39, 47, 54, 63, 76, 84],
      legend: ["Planejado", "Realizado"],
    },
    workspace: {
      sheet: "Orçamento por etapa",
      headers: ["Entrega", "Previsto", "Realizado"],
      rows: [["Planejamento", "R$ 24.000", "R$ 22.800"], ["Execução", "R$ 88.000", "R$ 91.400"], ["Finalização", "R$ 31.000", "R$ 29.600"]],
    },
  },
};

export const modelIds = ["financial", "sales", "marketing", "inventory", "projects"];

export const getModel = (id) => models[id] ?? models.financial;
