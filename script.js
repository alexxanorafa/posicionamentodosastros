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
    sol: { periodo: 365.256363004, deslocamentoInicial: 280.147, excentricidade: 0.0167086 },
    lua: { periodo: 27.321582, deslocamentoInicial: 218.316, excentricidade: 0.0549 },
    mercurio: { periodo: 87.96934963, deslocamentoInicial: 77.45645, excentricidade: 0.205635 },
    venus: { periodo: 224.70069, deslocamentoInicial: 131.563703, excentricidade: 0.006772 },
    marte: { periodo: 686.980, deslocamentoInicial: 336.04084, excentricidade: 0.093405 },
    jupiter: { periodo: 4332.589, deslocamentoInicial: 14.75385, excentricidade: 0.048498 },
    saturno: { periodo: 10759.22, deslocamentoInicial: 92.43194, excentricidade: 0.055546 },
    urano: { periodo: 30685.4, deslocamentoInicial: 170.96424, excentricidade: 0.0457 },
    neptuno: { periodo: 60189.0, deslocamentoInicial: 44.97135, excentricidade: 0.009456 },
    plutao: { periodo: 90560.0, deslocamentoInicial: 224.06676, excentricidade: 0.248807 }
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

  // Função para calcular o número de dias desde 01-01-1900
  function diasDesde1900(data) {
    const refDate = new Date("1900-01-01T00:00:00Z");
    return (data - refDate) / (1000 * 60 * 60 * 24);
  }

  // Função para resolver a Equação de Kepler com alta precisão usando Newton-Raphson
  function resolverEquacaoKepler(M, excentricidade, tolerancia = 1e-14, maxIteracoes = 2000) {
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
    const dias = diasDesde1900(data);

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
