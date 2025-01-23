document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#astrologyForm");
  const birthplaceSelect = document.getElementById("birthplace");
  const resultContainer = document.getElementById("result");

  const signos = [
    "Carneiro", "Touro", "Gémeos", "Caranguejo", "Leão", "Virgem",
    "Balança", "Escorpião", "Sagitário", "Capricórnio",
    "Aquário", "Peixes"
  ];

  const planetas = {
    sol: { periodo: 365.25636, deslocamentoInicial: 280.147, excentricidade: 0.0167 },
    lua: { periodo: 27.321661, deslocamentoInicial: 218.316, excentricidade: 0.0549 },
    mercurio: { periodo: 87.969, deslocamentoInicial: 77.456, excentricidade: 0.2056 },
    venus: { periodo: 224.701, deslocamentoInicial: 131.564, excentricidade: 0.0067 },
    marte: { periodo: 686.971, deslocamentoInicial: 336.040, excentricidade: 0.0934 },
    jupiter: { periodo: 4332.59, deslocamentoInicial: 14.753, excentricidade: 0.0489 },
    saturno: { periodo: 10759.22, deslocamentoInicial: 92.431, excentricidade: 0.0565 },
    urano: { periodo: 30687.15, deslocamentoInicial: 170.964, excentricidade: 0.0463 },
    neptuno: { periodo: 60190.03, deslocamentoInicial: 44.971, excentricidade: 0.0097 },
    plutao: { periodo: 90560, deslocamentoInicial: 224.066, excentricidade: 0.2488 }
  };

  // Função utilitária para normalizar valores angulares entre 0 e 360 graus
  function normalizarGraus(angulo) {
    return ((angulo % 360) + 360) % 360;
  }

  // Preenche o dropdown de cidades
  function preencherDropdown(cidades) {
    cidades.forEach(cidade => {
      const option = document.createElement("option");
      option.value = JSON.stringify(cidade);
      option.textContent = cidade.cidade;
      birthplaceSelect.appendChild(option);
    });
  }

  // Função para calcular o número de dias desde 01-01-2000
  function diasDesde2000(data) {
    const refDate = new Date("2000-01-01T00:00:00Z");
    return (data - refDate) / (1000 * 60 * 60 * 24);
  }

  // Função para resolver a Equação de Kepler com alta precisão usando Newton-Raphson
  function resolverEquacaoKepler(M, excentricidade, tolerancia = 1e-12, maxIteracoes = 1000) {
    let E = M; // Aproximação inicial para Anomalia Exêntrica
    let deltaE;
    let iteracoes = 0;

    do {
      deltaE = (E - excentricidade * Math.sin(E) - M) / (1 - excentricidade * Math.cos(E));
      E -= deltaE;
      iteracoes++;
    } while (Math.abs(deltaE) > tolerancia && iteracoes < maxIteracoes);

    if (iteracoes >= maxIteracoes) {
      console.warn("A equação de Kepler não convergiu após o número máximo de iterações.");
    }

    return E;
  }

  // Função para calcular a posição do planeta com base em seus parâmetros orbitais
  function calcularPosicaoPlaneta(planeta, data) {
    const params = planetas[planeta];
    const dias = diasDesde2000(data);

    // Anomalia Média (M)
    let M = (2 * Math.PI * dias / params.periodo) % (2 * Math.PI);
    if (M < 0) M += 2 * Math.PI; // Garantir que M esteja entre 0 e 2π

    // Resolver Equação de Kepler para obter Anomalia Exêntrica (E)
    const E = resolverEquacaoKepler(M, params.excentricidade);

    // Calcular Longitude Verdadeira (v)
    const v = 2 * Math.atan2(
      Math.sqrt(1 + params.excentricidade) * Math.sin(E / 2),
      Math.sqrt(1 - params.excentricidade) * Math.cos(E / 2)
    );

    // Ajustar para deslocamento inicial e converter para graus
    const deslocamentoInicialRad = (params.deslocamentoInicial * Math.PI) / 180;
    const vCorrigido = v + deslocamentoInicialRad;
    const graus = normalizarGraus((vCorrigido * 180) / Math.PI);

    return graus;
  }

  // Função para determinar o signo com base no ângulo
  function determinarSigno(grau) {
    const indice = Math.floor(grau / 30);
    return signos[indice];
  }

  // Função para gerar a interpretação do planeta em um determinado signo
  function gerarInterpretacao(planeta, signo) {
    return interpretacoes[planeta]?.[signo] || "Interpretação não disponível.";
  }

  // Função para calcular posições de todos os planetas
  function calcularPosicoes(data) {
    return Object.keys(planetas).map((planeta) => {
      const posicao = calcularPosicaoPlaneta(planeta, data);
      const signo = determinarSigno(posicao);
      const interpretacao = gerarInterpretacao(planeta, signo);
      return { planeta, posicao, signo, interpretacao };
    });
  }

  // Evento de envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obter os valores do formulário
    const birthdate = form.querySelector("#birthdate").value;
    const birthtime = form.querySelector("#birthtime").value;
    const birthplace = form.querySelector("#birthplace").value;

    if (!birthdate || !birthtime || !birthplace) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    const birthDateTime = new Date(`${birthdate}T${birthtime}`);
    if (isNaN(birthDateTime.getTime())) {
      alert("Data e hora de nascimento inválidas. Por favor, corrija e tente novamente.");
      return;
    }

    const localNascimento = JSON.parse(birthplace);
    console.log("Coordenadas do local de nascimento:", localNascimento);

    // Calcular posições dos planetas e gerar interpretações
    const posicoes = calcularPosicoes(birthDateTime);

    let resultadosHTML = "<h2>Posicionamento dos Astros</h2>";
    resultadosHTML += posicoes.map(({ planeta, signo, interpretacao }) =>
      `<p><b>${planeta.charAt(0).toUpperCase() + planeta.slice(1)}:</b> ${signo} - ${interpretacao}</p>`
    ).join("");

    resultadosHTML += `
      <h3>Reflexão Global</h3>
      <p>O mapa astrológico é uma jornada introspectiva pelas forças cósmicas que moldam a nossa essência. 
      Cada planeta, ao atravessar os signos, revela um fragmento do nosso ser. 
      Este é o espelho do cosmos dentro de nós, uma harmonia que nos conecta ao infinito.</p>
    `;

    resultContainer.innerHTML = resultadosHTML;
    resultContainer.style.display = "block";
  });

  // Carregar cidades diretamente do array em cidades.js
  preencherDropdown(cidades);
});
