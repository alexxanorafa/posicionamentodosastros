const interpretacoes = {
  sol: {
    "Carneiro": "O espírito destemido emerge, com coragem primitiva a desafiar o desconhecido.",
    "Touro": "A serenidade encontra força na beleza duradoura e na busca pelo essencial.",
    "Gémeos": "A curiosidade ilumina caminhos, num incessante diálogo com o saber.",
    "Caranguejo": "Laços profundos nutrem o coração, resgatando memórias ancestrais.",
    "Leão": "O brilho autêntico manifesta-se, celebrando a essência do ser.",
    "Virgem": "A perfeição revela-se nos detalhes e na harmonia prática do mundo.",
    "Balança": "A harmonia floresce no equilíbrio, onde justiça e beleza coexistem.",
    "Escorpião": "A transformação surge das profundezas, renovando a essência da alma.",
    "Sagitário": "A liberdade expande os horizontes, guiada pela busca incessante de sabedoria.",
    "Capricórnio": "A paciência constrói o futuro, unindo ambição e perseverança.",
    "Aquário": "A inovação inspira o coletivo, traçando novos caminhos para o progresso.",
    "Peixes": "A conexão com o invisível desvenda mistérios através da intuição e da empatia."
  },
  lua: {
      "Carneiro": "A emoção é intensa e espontânea, guiada por um impulso instintivo.",
      "Touro": "O conforto emocional emerge da estabilidade e do prazer sensorial.",
      "Gémeos": "A mente inquieta procura expressão nas emoções e ideias partilhadas.",
      "Caranguejo": "As raízes emocionais encontram força no cuidado e na proteção dos laços.",
      "Leão": "A criatividade reflete-se nos sentimentos, ansiosos por reconhecimento e afeição.",
      "Virgem": "O pragmatismo molda as emoções, em busca de ordem e perfeição.",
      "Balança": "O equilíbrio nas relações alimenta o coração, buscando harmonia e paz.",
      "Escorpião": "A intensidade emocional transforma e renova, revelando profundidades ocultas.",
      "Sagitário": "O otimismo emocional encontra plenitude na exploração e no significado.",
      "Capricórnio": "A segurança emocional nasce da estrutura e da realização pessoal.",
      "Aquário": "A lógica orienta os sentimentos, valorizando a independência e a inovação.",
      "Peixes": "A empatia flui entre as emoções, ligando o mundo visível ao espiritual."
  },
  venus: {
    "Carneiro": "O amor é ardente, movido pela paixão e pela espontaneidade.",
    "Touro": "A doçura do amor manifesta-se na simplicidade e no toque terno.",
    "Gémeos": "O encanto revela-se na leveza das palavras e na curiosidade incessante.",
    "Caranguejo": "A profundidade afetiva encontra conforto na conexão e no cuidado.",
    "Leão": "O amor brilha com intensidade, ansioso por admiração e devoção.",
    "Virgem": "A afeição expressa-se com dedicação e atenção aos gestos mais simples.",
    "Balança": "A beleza da harmonia reflete-se nas relações, equilibrando alma e coração.",
    "Escorpião": "O desejo profundo une-se à intensidade emocional, criando laços transformadores.",
    "Sagitário": "O amor aventura-se em busca de liberdade e expansão mútua.",
    "Capricórnio": "O vínculo constrói-se na lealdade e na segurança partilhada.",
    "Aquário": "A singularidade une-se à amizade, moldando relações únicas.",
    "Peixes": "A entrega afetiva é total, fluindo com compaixão e romantismo."
  },
  marte: {
    "Carneiro": "A força instintiva age com audácia, abrindo caminho sem hesitação.",
    "Touro": "A energia é constante e firme, orientada para conquistas tangíveis.",
    "Gémeos": "A mente ágil traduz-se em ação criativa e comunicação eficaz.",
    "Caranguejo": "A determinação nasce das emoções, protegendo o que é essencial.",
    "Leão": "O ímpeto criativo reflete a vontade de brilhar e conquistar.",
    "Virgem": "A energia canaliza-se no detalhe e na eficiência prática.",
    "Balança": "A ação move-se em busca de harmonia, com estratégia e ponderação.",
    "Escorpião": "A intensidade dirige-se à transformação, enfrentando qualquer obstáculo.",
    "Sagitário": "A energia expande-se com entusiasmo, em constante descoberta.",
    "Capricórnio": "A determinação é sólida, conquistando metas com disciplina inabalável.",
    "Aquário": "A ação inovadora transforma, criando mudanças significativas.",
    "Peixes": "A intuição guia os gestos, com criatividade e sensibilidade."
  },
  jupiter: {
    "Carneiro": "O entusiasmo impulsiona novos começos, com confiança e inspiração.",
    "Touro": "O crescimento emerge da estabilidade, enraizando-se na terra fértil.",
    "Gémeos": "A expansão ocorre na troca de ideias e no pensamento ágil.",
    "Caranguejo": "A empatia e o cuidado promovem um crescimento emocional profundo.",
    "Leão": "A confiança ilumina o caminho, amplificando o brilho e a criatividade.",
    "Virgem": "O progresso é metódico, alimentado pelo trabalho minucioso.",
    "Balança": "O equilíbrio e a justiça promovem relações harmoniosas e crescimento mútuo.",
    "Escorpião": "A transformação interior conduz à expansão da alma.",
    "Sagitário": "A busca pelo conhecimento e pela liberdade abre novos horizontes.",
    "Capricórnio": "A ambição alinhada à paciência constrói realizações duradouras.",
    "Aquário": "A visão futurista expande o coletivo, promovendo inovações.",
    "Peixes": "A conexão espiritual amplia a compaixão e o entendimento universal."
  },
  saturno: {
    "Carneiro": "A autodisciplina molda a ação, transformando impulsos em força estruturada.",
    "Touro": "A paciência e a resiliência constroem segurança e valor duradouro.",
    "Gémeos": "A estrutura mental organiza ideias e clareia a comunicação.",
    "Caranguejo": "As emoções são fortalecidas pela construção de alicerces internos.",
    "Leão": "A responsabilidade equilibra o desejo de expressão com a maturidade.",
    "Virgem": "A disciplina transforma os detalhes em excelência prática.",
    "Balança": "O equilíbrio entre compromissos promove relações estáveis e justas.",
    "Escorpião": "A força interior emerge ao enfrentar e superar desafios profundos.",
    "Sagitário": "A liberdade é conquistada através de sabedoria disciplinada.",
    "Capricórnio": "A ambição encontra suporte na responsabilidade e no esforço contínuo.",
    "Aquário": "A inovação alinha-se com a responsabilidade pelo bem coletivo.",
    "Peixes": "Os sonhos concretizam-se com disciplina espiritual e equilíbrio emocional."
  },
  urano: {
    "Carneiro": "A mudança ocorre com audácia, transformando limites em possibilidades.",
    "Touro": "A estabilidade renova-se, encontrando novas formas de valor.",
    "Gémeos": "A mente inova, criando conexões únicas e revolucionárias.",
    "Caranguejo": "As emoções evoluem, transformando o lar e os laços afetivos.",
    "Leão": "A criatividade irrompe em expressões únicas e visionárias.",
    "Virgem": "As rotinas e os métodos ajustam-se, revelando novas eficiências.",
    "Balança": "As relações são renovadas por novas formas de conexão e harmonia.",
    "Escorpião": "A transformação psíquica abre caminhos para novas perceções.",
    "Sagitário": "Crenças e filosofias expandem-se, explorando o desconhecido.",
    "Capricórnio": "As estruturas renovam-se, promovendo mudanças sólidas e visionárias.",
    "Aquário": "A inovação coletiva transforma o futuro, rompendo barreiras.",
    "Peixes": "As perceções espirituais conectam-se com sonhos e intuições profundas."
  },
  neptuno: {
    "Carneiro": "A intuição age com coragem, unindo ação e idealismo.",
    "Touro": "A espiritualidade encontra expressão na apreciação do mundo físico.",
    "Gémeos": "A imaginação inspira palavras que tocam e revelam.",
    "Caranguejo": "A ligação emocional é envolta em profunda empatia e cuidado.",
    "Leão": "A arte e o espírito unem-se numa expressão brilhante e inspiradora.",
    "Virgem": "A sensibilidade organiza-se em gestos práticos e subtis.",
    "Balança": "A beleza ideal une corações em harmonia transcendente.",
    "Escorpião": "A profundidade emocional reflete-se em sonhos transformadores.",
    "Sagitário": "A espiritualidade expande-se na busca por verdades universais.",
    "Capricórnio": "A compaixão encontra solidez em gestos reais e duradouros.",
    "Aquário": "Os ideais fluem, inspirando visões que tocam o coletivo.",
    "Peixes": "A intuição dissolve fronteiras, conectando-se ao todo."
  },
  plutao: {
      "Carneiro": "A transformação nasce do fogo interior, destruindo para recriar.",
      "Touro": "A renovação é lenta e profunda, enraizada naquilo que é essencial.",
      "Gémeos": "A mente renasce constantemente, explorando novos paradigmas.",
      "Caranguejo": "As emoções regeneram-se, ligadas a memórias e laços profundos.",
      "Leão": "O poder interior brilha, transformando a identidade com intensidade.",
      "Virgem": "O aperfeiçoamento constante é impulsionado por mudanças profundas.",
      "Balança": "As relações passam por renascimentos, buscando equilíbrio nas profundezas.",
      "Escorpião": "A alma renasce através do enfrentamento das sombras e mistérios.",
      "Sagitário": "A busca pelo significado transforma crenças e expande horizontes.",
      "Capricórnio": "A ambição renova-se com força, enfrentando e superando limites.",
      "Aquário": "A transformação coletiva é impulsionada por visões radicais e inovadoras.",
      "Peixes": "O poder invisível conduz à cura e à fusão com o universo."
  },
  mercurio: {
      "Carneiro": "O pensamento é direto e dinâmico, agindo com rapidez e intensidade.",
      "Touro": "A mente é prática e paciente, absorvendo ideias com firmeza.",
      "Gémeos": "A comunicação é ágil e multifacetada, explorando múltiplas perspetivas.",
      "Caranguejo": "Os pensamentos fluem com emoção, nutrindo conexões pessoais.",
      "Leão": "A mente é criativa e expressiva, iluminando ideias com paixão.",
      "Virgem": "O raciocínio é meticuloso, dedicado à análise e ao detalhe.",
      "Balança": "A mente busca harmonia, articulando ideias com elegância e equilíbrio.",
      "Escorpião": "Os pensamentos exploram profundezas, revelando verdades ocultas.",
      "Sagitário": "O intelecto expande-se em busca de conhecimento e sabedoria universal.",
      "Capricórnio": "O pensamento é disciplinado, focado em objetivos concretos e realizáveis.",
      "Aquário": "A mente é visionária, criando ideias inovadoras e vanguardistas.",
      "Peixes": "O pensamento é intuitivo e imaginativo, navegando entre sonhos e realidades."
  }
};
