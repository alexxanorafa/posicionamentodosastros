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
    sol: { periodo: 365.25, deslocamentoInicial: 280.46, excentricidade: 0 },
    lua: { periodo: 27.32, deslocamentoInicial: 0, excentricidade: 0.0549 },
    mercurio: { periodo: 87.969, deslocamentoInicial: 252.25, excentricidade: 0.2056 },
    venus: { periodo: 224.701, deslocamentoInicial: 181.98, excentricidade: 0.0067 },
    marte: { periodo: 686.971, deslocamentoInicial: 355.45, excentricidade: 0.0934 },
    jupiter: { periodo: 4332.59, deslocamentoInicial: 34.35, excentricidade: 0.0489 },
    saturno: { periodo: 10759.22, deslocamentoInicial: 50.08, excentricidade: 0.0565 },
    urano: { periodo: 30687.15, deslocamentoInicial: 314.04, excentricidade: 0.0463 },
    neptuno: { periodo: 60190.03, deslocamentoInicial: 304.88, excentricidade: 0.0097 },
    plutao: { periodo: 90560, deslocamentoInicial: 238.93, excentricidade: 0.2488 }
  };

  // Preenche o dropdown de cidades
  function preencherDropdown(cidades) {
    cidades.forEach(cidade => {
      const option = document.createElement("option");
      option.value = JSON.stringify(cidade); // Armazena a cidade e as coordenadas como string
      option.textContent = cidade.cidade;
      birthplaceSelect.appendChild(option);
    });
  }

  // Função para calcular o número de dias desde 01-01-2000
  function diasDesde2000(data) {
    const refDate = new Date("2000-01-01T00:00:00Z");
    return (data - refDate) / (1000 * 60 * 60 * 24);
  }

  // Função para calcular a posição do planeta com base nos parâmetros orbitais
  function calcularPosicaoPlaneta(planeta, data) {
    const params = planetas[planeta];
    const dias = diasDesde2000(data);
    
    // Cálculo da Anomalia Média
    let M = (2 * Math.PI * dias) / params.periodo; 

    // Correção de Kepler (usando um método iterativo de maior precisão)
    let E = M; // Aproximação inicial
    let deltaE = 1;
    let maxIteracoes = 1000; // Limite de iterações para evitar loops infinitos
    let iteracoes = 0;
    
    // Iteração para calcular a excentricidade com maior precisão
    while (Math.abs(deltaE) > 1e-10 && iteracoes < maxIteracoes) {
      iteracoes++;
      deltaE = (E - params.excentricidade * Math.sin(E) - M) / (1 - params.excentricidade * Math.cos(E));
      E -= deltaE;
    }

    // Verifique se o número de iterações excedeu o limite
    if (iteracoes >= maxIteracoes) {
      console.warn(`A iteração para a excentricidade do planeta ${planeta} não convergiu adequadamente`);
    }

    // Cálculo da longitude verdadeira (v) com a correção da excentricidade
    let v = 2 * Math.atan2(Math.sqrt(1 + params.excentricidade) * Math.sin(E / 2), Math.sqrt(1 - params.excentricidade) * Math.cos(E / 2));
    
    // Ajuste final com deslocamento inicial e normalização
    let grau = (v + params.deslocamentoInicial) % 360;

    // Garantir que o valor de grau esteja sempre entre 0 e 360
    if (grau < 0) {
      grau += 360;
    }

    // Adicionar log para verificar a posição do planeta
    console.log(`Posição do planeta ${planeta}: ${grau} graus`);

    return grau;
  }

  // Função para determinar o signo com base no ângulo
  function determinarSigno(grau) {
    const indice = Math.floor(grau / 30);
    return signos[indice];
  }

  // Função para gerar uma interpretação do planeta em um determinado signo
  function gerarInterpretacao(planeta, signo) {
    return interpretacoes[planeta]?.[signo] || "Interpretação não disponível.";
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

    // Combinar data e hora em um objeto Date
    const birthDateTime = new Date(`${birthdate}T${birthtime}`);
    const localNascimento = JSON.parse(birthplace); // Obter coordenadas da cidade selecionada
    console.log("Coordenadas do local de nascimento:", localNascimento);

    // Calcular a posição dos planetas e gerar interpretações
    let resultadosHTML = "<h2>Posicionamento dos Astros</h2>";
    Object.keys(planetas).forEach((planeta) => {
      const posicao = calcularPosicaoPlaneta(planeta, birthDateTime);
      
      // Log para verificar a posição do planeta
      console.log(`Posição do planeta ${planeta}: ${posicao} graus`);
      
      const signo = determinarSigno(posicao);
      
      // Log para verificar o signo correspondente
      console.log(`Signo correspondente ao planeta ${planeta}: ${signo}`);
      
      const interpretacao = gerarInterpretacao(planeta, signo);
      resultadosHTML += `<p><b>${planeta.charAt(0).toUpperCase() + planeta.slice(1)}:</b> ${signo} - ${interpretacao}</p>`;
    });

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
