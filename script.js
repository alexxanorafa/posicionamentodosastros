document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#birth-form");
  const dateInput = form.querySelector("input[name='birthdate']");
  const timeInput = form.querySelector("input[name='birthtime']");
  const resultContainer = document.getElementById("result");

  const signos = [
    "Carneiro", "Touro", "Gémeos", "Caranguejo", "Leão", "Virgem",
    "Balança", "Escorpião", "Sagitário", "Capricórnio",
    "Aquário", "Peixes"
  ];

  // Parâmetros orbitais de cada planeta (aproximados)
  const planetas = {
    sol: { periodo: 365.25, deslocamentoInicial: 280.46, excentricidade: 0 },
    lua: { periodo: 27.3217, deslocamentoInicial: 218.32, excentricidade: 0.0549 },
    mercurio: { periodo: 87.969, deslocamentoInicial: 252.25, excentricidade: 0.2056 },
    venus: { periodo: 224.701, deslocamentoInicial: 181.98, excentricidade: 0.0067 },
    marte: { periodo: 686.971, deslocamentoInicial: 355.45, excentricidade: 0.0934 },
    jupiter: { periodo: 4332.59, deslocamentoInicial: 34.35, excentricidade: 0.0489 },
    saturno: { periodo: 10759.22, deslocamentoInicial: 50.08, excentricidade: 0.0565 },
    urano: { periodo: 30687.15, deslocamentoInicial: 314.04, excentricidade: 0.0463 },
    neptuno: { periodo: 60190.03, deslocamentoInicial: 304.88, excentricidade: 0.0097 },
    plutao: { periodo: 90560, deslocamentoInicial: 238.93, excentricidade: 0.2488 }
  };

  // Função para calcular o número de dias desde 01-01-2000
  function diasDesde2000(data) {
    const refDate = new Date("2000-01-01T00:00:00Z");
    return (data - refDate) / (1000 * 60 * 60 * 24);
  }

  // Correção para a posição com base nas excentricidades e parâmetros de Kepler
  function calcularPosicaoPlaneta(planeta, data) {
    const params = planetas[planeta];
    const dias = diasDesde2000(data);
    let M = (2 * Math.PI * dias) / params.periodo;  // Anomalia média em radianos

    // Correção para a excentricidade usando a equação de Kepler
    let E = M;  // Aproximação inicial
    let deltaE = 1;
    while (Math.abs(deltaE) > 1e-6) {
      deltaE = (E - params.excentricidade * Math.sin(E) - M) / (1 - params.excentricidade * Math.cos(E));
      E -= deltaE;
    }

    // Cálculo da longitude verdadeira (v) com a correção da excentricidade
    let v = 2 * Math.atan2(Math.sqrt(1 + params.excentricidade) * Math.sin(E / 2), Math.sqrt(1 - params.excentricidade) * Math.cos(E / 2));
    let grau = (v + params.deslocamentoInicial) % 360;

    // Correção devido ao periélio (precessão) - varia ao longo do tempo
    const perihelio = 0.0000459 * dias;  // Um fator de correção para o movimento do periélio
    grau = (grau + perihelio) % 360;  // Ajuste da posição

    return grau;
  }

  // Função para determinar o signo com base no ângulo
  function determinarSigno(grau) {
    const indice = Math.floor(grau / 30);
    return signos[indice];
  }

  // Função para gerar uma interpretação do planeta em um determinado signo
  function gerarInterpretacao(planeta, signo) {
    const interpretacoes = {
      sol: {
        "Carneiro": "O Sol em Carneiro representa uma força vibrante, pronta para conquistar e liderar. É o fogo inicial que impulsiona o ser a agir com coragem e determinação.",
        "Touro": "O Sol em Touro ilumina a busca por estabilidade e apreciação das coisas simples e belas. Uma energia que valoriza a paciência e a prosperidade.",
        "Gémeos": "O Sol em Gémeos é curioso e ágil, sempre em busca de novas ideias e conexões. A mente está sempre em movimento, pronta para aprender e comunicar.",
        "Caranguejo": "O Sol em Caranguejo traz uma luz emocional e acolhedora. Focado na proteção e na ligação familiar, é um farol de segurança e compaixão.",
        "Leão": "O Sol em Leão brilha intensamente com autoconfiança e criatividade. É a expressão pura do espírito que deseja ser visto e admirado.",
        "Virgem": "O Sol em Virgem ilumina a ordem, o detalhe e a busca pela perfeição. Uma energia que traz serviço e cuidado prático ao mundo.",
        "Balança": "O Sol em Balança busca harmonia e equilíbrio nas relações, promovendo beleza, justiça e cooperação entre os seres.",
        "Escorpião": "O Sol em Escorpião é intenso e transformador, iluminando as profundezas emocionais e a busca por verdade.",
        "Sagitário": "O Sol em Sagitário é aventureiro e filosófico, movido pela expansão de horizontes e pelo amor ao desconhecido.",
        "Capricórnio": "O Sol em Capricórnio é ambicioso e perseverante, com foco em construir uma vida sólida e cheia de realizações.",
        "Aquário": "O Sol em Aquário inspira inovação, originalidade e uma visão progressista que busca o bem coletivo.",
        "Peixes": "O Sol em Peixes é sonhador e intuitivo, trazendo uma profunda ligação com o mundo espiritual e as emoções."
      },
      venus: {
        "Carneiro": "Vénus em Carneiro expressa um amor ardente e direto. Apaixona-se rapidamente e busca aventura e espontaneidade nas relações.",
        "Touro": "Vénus em Touro é sensual e busca segurança no amor. Valorizam-se gestos simples e toques que expressam afeição.",
        "Gémeos": "Vénus em Gémeos encanta com palavras e curiosidade. O amor é leve, divertido e cheio de descobertas.",
        "Caranguejo": "Vénus em Caranguejo é profundamente emocional, buscando nutrição e conexão no amor.",
        "Leão": "Vénus em Leão é apaixonado e dramático, com uma necessidade de ser admirado e amado intensamente.",
        "Virgem": "Vénus em Virgem é discreto e dedicado no amor. Expressa afeição por meio de cuidados e atenção aos detalhes.",
        "Balança": "Vénus em Balança é elegante e diplomático, valorizando a harmonia e a beleza nas relações.",
        "Escorpião": "Vénus em Escorpião é intensa e transformadora, com um amor que vai além da superfície e busca profundidade.",
        "Sagitário": "Vénus em Sagitário ama a liberdade e a aventura. Relações baseiam-se em crescimento mútuo e exploração.",
        "Capricórnio": "Vénus em Capricórnio é leal e pragmático, buscando segurança e estabilidade nas relações.",
        "Aquário": "Vénus em Aquário valoriza a independência e a amizade no amor. Relações são únicas e progressistas.",
        "Peixes": "Vénus em Peixes é romântica e compassiva, amando de forma incondicional e com profunda empatia."
      },
      marte: {
        "Carneiro": "Marte em Carneiro é uma explosão de energia e determinação. Ação imediata e coragem marcam seu caminho.",
        "Touro": "Marte em Touro é persistente e paciente, com uma força constante voltada para conquistas práticas.",
        "Gémeos": "Marte em Gémeos é ágil e cheio de ideias. A energia é canalizada para comunicação e aprendizado.",
        "Caranguejo": "Marte em Caranguejo age com emoção, defendendo ferozmente aquilo que ama.",
        "Leão": "Marte em Leão é determinado e criativo, movido pelo desejo de expressar-se plenamente.",
        "Virgem": "Marte em Virgem é meticuloso e eficiente, com energia focada na melhoria contínua.",
        "Balança": "Marte em Balança busca equilíbrio e harmonia, movendo-se com estratégia em vez de força bruta.",
        "Escorpião": "Marte em Escorpião é intenso e implacável, com uma energia transformadora que nunca desiste.",
        "Sagitário": "Marte em Sagitário é aventureiro e otimista, sempre em busca de novas jornadas.",
        "Capricórnio": "Marte em Capricórnio é disciplinado e trabalhador, alcançando objetivos com perseverança.",
        "Aquário": "Marte em Aquário é inovador e progressista, canalizando energia para mudanças significativas.",
        "Peixes": "Marte em Peixes é intuitivo e sensível, movendo-se com empatia e criatividade."
      },
      jupiter: {
        "Carneiro": "Júpiter em Carneiro expande a coragem e a liderança. É uma energia de inspiração para começar novos projetos e enfrentar desafios com entusiasmo.",
        "Touro": "Júpiter em Touro traz prosperidade material e um amor pela natureza. Busca estabilidade e conforto em um crescimento constante.",
        "Gémeos": "Júpiter em Gémeos amplia a curiosidade e o desejo de aprender. A comunicação e o pensamento criativo são favorecidos.",
        "Caranguejo": "Júpiter em Caranguejo expande o cuidado emocional e a ligação familiar. Uma energia que promove proteção e empatia.",
        "Leão": "Júpiter em Leão traz confiança e brilho. Expande a criatividade, o carisma e o desejo de ser reconhecido.",
        "Virgem": "Júpiter em Virgem amplia a busca pela perfeição e pela ordem. Favorece o crescimento por meio do trabalho dedicado e meticuloso.",
        "Balança": "Júpiter em Balança promove justiça, equilíbrio e harmonia. O crescimento ocorre nas relações e na busca por beleza.",
        "Escorpião": "Júpiter em Escorpião é intenso e transformador. Expande a capacidade de regeneração e o entendimento emocional profundo.",
        "Sagitário": "Júpiter em Sagitário é aventureiro e filosófico. Promove a expansão do conhecimento e a busca por liberdade.",
        "Capricórnio": "Júpiter em Capricórnio traz crescimento através da disciplina e do trabalho árduo. Favorece o alcance de metas a longo prazo.",
        "Aquário": "Júpiter em Aquário amplia a inovação e o pensamento progressista. Promove mudanças que beneficiam o coletivo.",
        "Peixes": "Júpiter em Peixes traz empatia e espiritualidade. Expande a conexão emocional e a compreensão intuitiva do mundo."
      },
      saturno: {
        "Carneiro": "Saturno em Carneiro ensina disciplina na liderança e na ação. Aprender a controlar impulsos é o caminho para o crescimento.",
        "Touro": "Saturno em Touro traz lições sobre paciência e estabilidade. O crescimento vem da perseverança e da valorização do que é duradouro.",
        "Gémeos": "Saturno em Gémeos ensina a estruturar ideias e a comunicar-se de maneira clara e eficaz. O aprendizado é um processo gradual.",
        "Caranguejo": "Saturno em Caranguejo desafia a lidar com as emoções e a construir segurança emocional. Lições profundas sobre o lar e a família.",
        "Leão": "Saturno em Leão desafia o ego e a expressão criativa. O crescimento ocorre ao equilibrar autoconfiança com responsabilidade.",
        "Virgem": "Saturno em Virgem ensina a importância dos detalhes e da organização. Crescer exige disciplina e trabalho meticuloso.",
        "Balança": "Saturno em Balança promove lições sobre relacionamentos e equilíbrio. Ensina a estabelecer conexões duradouras e justas.",
        "Escorpião": "Saturno em Escorpião traz lições de transformação e resiliência. Crescer exige enfrentar medos profundos e mudar.",
        "Sagitário": "Saturno em Sagitário ensina a responsabilidade na busca por conhecimento e liberdade. Crescimento exige disciplina na exploração de novas ideias.",
        "Capricórnio": "Saturno em Capricórnio está em casa, trazendo lições sobre trabalho árduo e responsabilidade. Crescimento ocorre com ambição estruturada.",
        "Aquário": "Saturno em Aquário ensina a equilibrar inovação com responsabilidade social. O progresso vem da persistência em ideias originais.",
        "Peixes": "Saturno em Peixes traz lições sobre disciplina espiritual e emocional. O crescimento ocorre ao equilibrar sonhos com realidade."
      },
      urano: {
        "Carneiro": "Urano em Carneiro traz inovações ousadas e um espírito pioneiro. Mudanças ocorrem por meio da ação direta e corajosa.",
        "Touro": "Urano em Touro revoluciona valores e estabilidade material. Traz mudanças inesperadas na busca por conforto e segurança.",
        "Gémeos": "Urano em Gémeos promove inovação na comunicação e no aprendizado. Idéias revolucionárias surgem de conexões rápidas.",
        "Caranguejo": "Urano em Caranguejo transforma o lar e as emoções. Mudanças radicais ocorrem na forma de se conectar emocionalmente.",
        "Leão": "Urano em Leão promove criatividade única e originalidade. As mudanças surgem da expressão autêntica do ser.",
        "Virgem": "Urano em Virgem inova no trabalho e na saúde. Mudanças transformam rotinas e sistemas de organização.",
        "Balança": "Urano em Balança revoluciona os relacionamentos e a busca por harmonia. Promove novas formas de conexão.",
        "Escorpião": "Urano em Escorpião traz transformações profundas e mudanças inesperadas nas emoções e na psique.",
        "Sagitário": "Urano em Sagitário revoluciona crenças e filosofias. Mudanças surgem da exploração de novos horizontes.",
        "Capricórnio": "Urano em Capricórnio transforma estruturas e sistemas tradicionais. Revolução ocorre nas áreas de trabalho e governo.",
        "Aquário": "Urano em Aquário está em casa, trazendo inovações radicais e mudanças no coletivo. O progresso é a prioridade.",
        "Peixes": "Urano em Peixes promove transformações espirituais e intuitivas. Mudanças ocorrem nas percepções e sonhos."
      },
      neptuno: {
        "Carneiro": "Neptuno em Carneiro inspira ação guiada pela intuição. Sonhos são perseguidos com coragem.",
        "Touro": "Neptuno em Touro traz sensibilidade à beleza e aos prazeres terrenos. O mundo espiritual conecta-se com o material.",
        "Gémeos": "Neptuno em Gémeos amplia a imaginação e a intuição na comunicação. Sonhos surgem em palavras e ideias.",
        "Caranguejo": "Neptuno em Caranguejo promove profunda empatia e ligação emocional. Sonhos estão centrados na segurança emocional.",
        "Leão": "Neptuno em Leão inspira criatividade artística e visão espiritual. Sonhos são expressos com brilho.",
        "Virgem": "Neptuno em Virgem combina sensibilidade espiritual com trabalho prático. Intuição guia a organização.",
        "Balança": "Neptuno em Balança sonha com harmonia e beleza universal. Relações são profundamente espirituais.",
        "Escorpião": "Neptuno em Escorpião mergulha na profundidade emocional. Sonhos são transformadores e intensos.",
        "Sagitário": "Neptuno em Sagitário inspira ideais elevados e conexão espiritual. Sonhos envolvem expansão e aventura.",
        "Capricórnio": "Neptuno em Capricórnio une espiritualidade com ambição. Sonhos manifestam-se de maneira tangível.",
        "Aquário": "Neptuno em Aquário traz visões de um futuro ideal. Sonhos conectam o coletivo e o espiritual.",
        "Peixes": "Neptuno em Peixes está em casa, trazendo profunda sensibilidade e conexão espiritual. Sonhos são ilimitados."
      },
      plutao: {
        "Carneiro": "Plutão em Carneiro transforma por meio da ação direta. O poder pessoal é despertado pela coragem.",
        "Touro": "Plutão em Touro renova valores e segurança material. Transformações ocorrem lentamente, mas de forma profunda.",
        "Gémeos": "Plutão em Gémeos transforma ideias e comunicação. Mudanças radicais ocorrem na forma de pensar.",
        "Caranguejo": "Plutão em Caranguejo renova as bases emocionais e familiares. Transformação ocorre na segurança interna.",
        "Leão": "Plutão em Leão transforma a criatividade e o ego. O poder surge da expressão autêntica do ser.",
        "Virgem": "Plutão em Virgem renova métodos e rotinas. Transformações profundas ocorrem no trabalho e na saúde.",
        "Balança": "Plutão em Balança transforma as relações e a busca por equilíbrio. Poder surge do entendimento mútuo.",
        "Escorpião": "Plutão em Escorpião está em casa, trazendo intensas transformações emocionais e espirituais.",
        "Sagitário": "Plutão em Sagitário renova crenças e filosofias. Transformações ocorrem na busca por sentido e liberdade.",
        "Capricórnio": "Plutão em Capricórnio transforma estruturas e sistemas. Poder surge da reinvenção de tradições.",
        "Aquário": "Plutão em Aquário transforma o coletivo e a inovação. O poder está em mudanças sociais profundas.",
        "Peixes": "Plutão em Peixes traz transformações espirituais e intuitivas. Poder surge da conexão com o inconsciente."
      },
      lua: {
        "Carneiro": "A Lua em Carneiro traz emoções intensas e reativas. Uma energia impulsiva que busca a liberdade e a ação imediata.",
        "Touro": "A Lua em Touro é emocionalmente estável, buscando segurança e conforto. A necessidade de apego ao material é forte.",
        "Gémeos": "A Lua em Gémeos é curiosa e adaptável, buscando novidades e comunicação. As emoções são expressas através de palavras.",
        "Caranguejo": "A Lua em Caranguejo é emocionalmente profunda e protetora. Busca segurança e carinho no ambiente familiar.",
        "Leão": "A Lua em Leão expressa emoções de forma calorosa e dramática. A busca por atenção e reconhecimento é forte.",
        "Virgem": "A Lua em Virgem tende a ser analítica e prática, com uma forte necessidade de ordem e controle nas emoções.",
        "Balança": "A Lua em Balança busca harmonia emocional nas relações, com uma tendência a ser conciliadora e sensível às necessidades dos outros.",
        "Escorpião": "A Lua em Escorpião é emocionalmente intensa e transformadora. Profundas emoções e transformações podem ocorrer.",
        "Sagitário": "A Lua em Sagitário é otimista e busca liberdade emocional. A busca por aventuras e expansão é uma característica marcante.",
        "Capricórnio": "A Lua em Capricórnio é reservada e focada em objetivos. As emoções são mais controladas e voltadas para a conquista.",
        "Aquário": "A Lua em Aquário é emocionalmente independente e progressista, buscando a originalidade e a liberdade emocional.",
        "Peixes": "A Lua em Peixes é intuitiva e sensível, buscando conexão espiritual e emocional com o mundo ao redor."
      },
      mercurio: {
        "Carneiro": "Mercúrio em Carneiro é direto e rápido na comunicação. A mente é ágil, com uma tendência a agir impulsivamente.",
        "Touro": "Mercúrio em Touro é prático e focado. Prefere pensar de forma mais lenta, ponderando as decisões com cautela.",
        "Gémeos": "Mercúrio em Gémeos é a expressão pura da curiosidade e adaptabilidade. A comunicação flui facilmente e a mente está sempre ativa.",
        "Caranguejo": "Mercúrio em Caranguejo é intuitivo e emocional na comunicação. A mente é influenciada pelo instinto e pela memória.",
        "Leão": "Mercúrio em Leão é dramático e criativo na comunicação. Expressa ideias com confiança e autoridade.",
        "Virgem": "Mercúrio em Virgem é analítico e detalhista. A mente se preocupa com a organização e com a eficiência na comunicação.",
        "Balança": "Mercúrio em Balança busca equilíbrio e harmonia nas palavras. É diplomático e procura evitar conflitos.",
        "Escorpião": "Mercúrio em Escorpião é profundo e investigativo. A comunicação é intensa e as palavras são usadas para transformar.",
        "Sagitário": "Mercúrio em Sagitário é filosófico e expansivo. A mente busca conhecimento e a comunicação é otimista e cheia de ideias.",
        "Capricórnio": "Mercúrio em Capricórnio é pragmático e focado. A comunicação é prática e voltada para o objetivo.",
        "Aquário": "Mercúrio em Aquário é original e inovador. A mente é aberta e a comunicação é voltada para mudanças sociais e intelectuais.",
        "Peixes": "Mercúrio em Peixes é intuitivo e sonhador. A comunicação flui com sensibilidade e inspiração."
      }
      // Adicionar interpretações para os outros planetas conforme necessário...
    };

    return interpretacoes[planeta]?.[signo] || "Interpretação não disponível.";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validação de entrada
    if (!dateInput.value || !timeInput.value) {
      resultContainer.innerHTML = "<p>Por favor, insira a data e a hora do nascimento.</p>";
      resultContainer.style.display = "block";
      return;
    }

    const dataNascimento = new Date(dateInput.value);
    const tempoNascimento = timeInput.value.split(":");
    dataNascimento.setHours(tempoNascimento[0], tempoNascimento[1], 0);

    // Calcular a posição dos planetas
    let resultadosHTML = "";
    Object.keys(planetas).forEach((planeta) => {
      const posicao = calcularPosicaoPlaneta(planeta, dataNascimento);
      const signo = determinarSigno(posicao);
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
});