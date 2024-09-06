const recintos = [
  {
    numero: 1,
    bioma: "savana",
    tamanho: 10,
    animais: [
      { especie: "MACACO", tamanho: 1 },
      { especie: "MACACO", tamanho: 1 },
      { especie: "MACACO", tamanho: 1 },
    ],
  },
  { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
  {
    numero: 3,
    bioma: "savana e rio",
    tamanho: 7,
    animais: [{ especie: "GAZELA", tamanho: 2 }],
  },
  { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
  {
    numero: 5,
    bioma: "savana",
    tamanho: 9,
    animais: [{ especie: "LEAO", tamanho: 3 }],
  },
];

const animais = {
  LEAO: { tamanho: 3, bioma: "savana" },
  LEOPARDO: { tamanho: 2, bioma: "savana" },
  CROCODILO: { tamanho: 3, bioma: "rio" },
  MACACO: { tamanho: 1, bioma: "savana ou floresta" },
  GAZELA: { tamanho: 2, bioma: "savana" },
  HIPOPOTAMO: { tamanho: 4, bioma: "savana ou rio" },
};

function analisaRecintos(especie, quantidade) {
  if (!animais[especie]) {
    return { erro: "Animal inválido" };
  }

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    return { erro: "Quantidade inválida" };
  }

  const animal = animais[especie];
  const recintosViaveis = [];

  recintos.forEach((recinto) => {
    const espacoOcupado = recinto.animais.reduce(
      (total, animal) => total + animal.tamanho,
      0
    );
    const espacoLivre = recinto.tamanho - espacoOcupado;

    if (
      ehBiomaAdequado(recinto.bioma, animal.bioma) &&
      ehEspacoSuficiente(recinto, animal, quantidade) &&
      podeAdicionarAnimal(recinto, animal, quantidade)
    ) {
      recintosViaveis.push(
        `Recinto ${recinto.numero} (espaço livre: ${
          espacoLivre - quantidade * animal.tamanho
        } total: ${recinto.tamanho})`
      );
    }
  });

  if (recintosViaveis.length === 0) {
    return { erro: "Não há recinto viável" };
  }

  return { recintosViaveis: recintosViaveis.sort() };
}

function ehBiomaAdequado(biomaRecinto, biomaAnimal) {
  if (biomaAnimal === "savana ou floresta" || biomaAnimal === "savana ou rio") {
    return biomaRecinto.includes(biomaAnimal.split(" ")[0]);
  }
  return biomaRecinto === biomaAnimal;
}

function ehEspacoSuficiente(recinto, animal, quantidade) {
  return (
    recinto.tamanho -
      recinto.animais.reduce((total, animal) => total + animal.tamanho, 0) >=
    quantidade * animal.tamanho
  );
}

function podeAdicionarAnimal(recinto, animal, quantidade) {
  if (animal.bioma === "savana" && quantidade > 0) {
    return true;
  }

  return true;
}
console.log(analisaRecintos("MACACO", 2));
console.log(analisaRecintos("UNICORNIO", 1));
