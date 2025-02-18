    // ============ SISTEMA DE MENU ============
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

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
    sol: {
      periodo: 365.256363004,
      deslocamentoInicial: 280.147,
      excentricidade: 0.0167086,
      perihelio: null // O Sol não orbita outro corpo, portanto, não possui periélio.
    },
    lua: {
      periodo: 27.321661547,
      deslocamentoInicial: 218.31643,
      excentricidade: 0.0549,
      perihelio: 0.3633 // Distância média da Lua à Terra no perigeu, em milhões de km.
    },
    mercurio: {
      periodo: 87.96934963,
      deslocamentoInicial: 77.45645,
      excentricidade: 0.205635,
      perihelio: 46.0012 // Distância ao Sol no periélio, em milhões de km.
    },
    venus: {
      periodo: 224.70069,
      deslocamentoInicial: 131.563703,
      excentricidade: 0.006772,
      perihelio: 107.476 // Distância ao Sol no periélio, em milhões de km.
    },
    terra: {
      periodo: 365.256363004,
      deslocamentoInicial: 0, // Considerando 0 como referência para a Terra.
      excentricidade: 0.0167086,
      perihelio: 147.1 // Distância ao Sol no periélio, em milhões de km.
    },
    marte: {
      periodo: 686.980,
      deslocamentoInicial: 336.04084,
      excentricidade: 0.093405,
      perihelio: 206.669 // Distância ao Sol no periélio, em milhões de km.
    },
    jupiter: {
      periodo: 4332.589,
      deslocamentoInicial: 14.75385,
      excentricidade: 0.048498,
      perihelio: 740.5736 // Distância ao Sol no periélio, em milhões de km.
    },
    saturno: {
      periodo: 10759.22,
      deslocamentoInicial: 92.43194,
      excentricidade: 0.055546,
      perihelio: 1353.572956 // Distância ao Sol no periélio, em milhões de km.
    },
    urano: {
      periodo: 30685.4,
      deslocamentoInicial: 170.96424,
      excentricidade: 0.0457,
      perihelio: 2748.938461 // Distância ao Sol no periélio, em milhões de km.
    },
    neptuno: {
      periodo: 60189.0,
      deslocamentoInicial: 44.97135,
      excentricidade: 0.009456,
      perihelio: 4452.940833 // Distância ao Sol no periélio, em milhões de km.
    },
    plutao: {
      periodo: 90560.0,
      deslocamentoInicial: 224.06676,
      excentricidade: 0.248807,
      perihelio: 4436.824613 // Distância ao Sol no periélio, em milhões de km.
    }
  };

  function normalizarGraus(angulo) {
    return ((angulo % 360) + 360) % 360;
  }
  // Adicione esta função para ajustar o fuso horário
  function ajustarParaUTC(data, longitude) {
    // Longitude LESTE (positiva) → UTC = Local - Offset
    // Longitude OESTE (negativa) → UTC = Local + Offset
    const offsetHoras = longitude / 15;
    const offsetMillis = offsetHoras * 60 * 60 * 1000;
    return new Date(data.getTime() - offsetMillis); // Corrig
}

  function preencherDropdown(cidades) {
    const cidadesOrdenadas = [...cidades].sort((a, b) => a.cidade.localeCompare(b.cidade));
    birthplaceSelect.innerHTML = "";
    cidadesOrdenadas.forEach(cidade => {
      const option = document.createElement("option");
      option.value = JSON.stringify(cidade);
      option.textContent = cidade.cidade;
      birthplaceSelect.appendChild(option);
    });
  }

  function diasDesde1900(data) {
    const refDate = new Date("1900-01-01T00:00:00Z");
    return (data - refDate) / (1000 * 60 * 60 * 24);
  }

  function resolverEquacaoKepler(M, excentricidade, tolerancia = 1e-14, maxIteracoes = 2000) {
    let E = M;
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

  function calcularPosicaoPlaneta(planeta, data, longitudeLocal) {
    const params = planetas[planeta];
    const dataUTC = ajustarParaUTC(data, longitudeLocal); // Ajuste para UTC
    const dias = diasDesde1900(dataUTC);
  
    // Anomalia Média (M) com correção do periélio
    let M = ((2 * Math.PI * dias) / params.periodo + 
    ((params.deslocamentoInicial - params.perihelio) * Math.PI) / 180) % (2 * Math.PI);
    if (M < 0) M += 2 * Math.PI; // ✅ Agora é possível modificar 'M'

    // Resolver Equação de Kepler para obter Anomalia Exêntrica (E)
    const E = resolverEquacaoKepler(M, params.excentricidade);

    // Calcular Longitude Verdadeira (v)
    const v = 2 * Math.atan2(
      Math.sqrt(1 + params.excentricidade) * Math.sin(E / 2),
      Math.sqrt(1 - params.excentricidade) * Math.cos(E / 2)
    );

    // Ajustar para o deslocamento inicial e converter para graus
    const graus = normalizarGraus((v * 180) / Math.PI);
    return graus;
  }

  function determinarSigno(grau) {
    const indice = Math.floor(grau / 30);
    return signos[indice];
  }

  function gerarInterpretacao(planeta, signo) {
    return interpretacoes[planeta]?.[signo] || "Interpretação não disponível.";
  }

  function calcularPosicoes(data, longitudeLocal) {
    return Object.keys(planetas).map((planeta) => {
      const posicao = calcularPosicaoPlaneta(planeta, data, longitudeLocal);
      const signo = determinarSigno(posicao);
      const interpretacao = gerarInterpretacao(planeta, signo);
      return { planeta, posicao, signo, interpretacao };
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

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

    const posicoes = calcularPosicoes(birthDateTime, localNascimento.longitude); // Passe a longitude


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

  preencherDropdown(cidades);
});
