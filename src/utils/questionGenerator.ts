import { Question, MathModule } from '@/types/game';

export const generateQuestion = (module: MathModule): Question => {
  switch (module) {
    case 'multiplication':
      return generateMultiplicationQuestion();
    case 'squares':
      return generateSquareQuestion();
    case 'cubes':
      return generateCubeQuestion();
    case 'fractions':
      return generateFractionQuestion();
    case 'powers':
      return generatePowerQuestion();
    default:
      return generateMultiplicationQuestion();
  }
};

const generateMultiplicationQuestion = (): Question => {
  const num1 = Math.floor(Math.random() * 15) + 2; // 2-16
  const num2 = Math.floor(Math.random() * 15) + 2; // 2-16
  const answer = num1 * num2;
  
  return {
    id: `mult-${Date.now()}`,
    question: `${num1} × ${num2}`,
    answer,
    difficulty: Math.floor((num1 + num2) / 4),
    module: 'multiplication',
    hint: `Try breaking it down: ${num1} × ${num2} = ${num1} × ${Math.floor(num2/2)} × 2`
  };
};

const generateSquareQuestion = (): Question => {
  const num = Math.floor(Math.random() * 25) + 1; // 1-25
  const answer = num * num;
  
  return {
    id: `square-${Date.now()}`,
    question: `${num}²`,
    answer,
    difficulty: Math.floor(num / 5),
    module: 'squares',
    hint: num % 5 === 0 ? `Numbers ending in 5: ${num}² = ${num-5} × ${num+5} + 25` : undefined
  };
};

const generateCubeQuestion = (): Question => {
  const num = Math.floor(Math.random() * 12) + 1; // 1-12
  const answer = num * num * num;
  
  return {
    id: `cube-${Date.now()}`,
    question: `${num}³`,
    answer,
    difficulty: Math.floor(num / 3),
    module: 'cubes',
    hint: `${num}³ = ${num} × ${num} × ${num} = ${num * num} × ${num}`
  };
};

const generateFractionQuestion = (): Question => {
  const fractions = [
    { fraction: '1/2', decimal: 0.5, percent: 50 },
    { fraction: '1/3', decimal: 0.33, percent: 33 },
    { fraction: '2/3', decimal: 0.67, percent: 67 },
    { fraction: '1/4', decimal: 0.25, percent: 25 },
    { fraction: '3/4', decimal: 0.75, percent: 75 },
    { fraction: '1/5', decimal: 0.2, percent: 20 },
    { fraction: '2/5', decimal: 0.4, percent: 40 },
    { fraction: '3/5', decimal: 0.6, percent: 60 },
    { fraction: '4/5', decimal: 0.8, percent: 80 },
    { fraction: '1/8', decimal: 0.125, percent: 12.5 },
    { fraction: '3/8', decimal: 0.375, percent: 37.5 },
    { fraction: '5/8', decimal: 0.625, percent: 62.5 },
    { fraction: '7/8', decimal: 0.875, percent: 87.5 },
  ];
  
  const selectedFraction = fractions[Math.floor(Math.random() * fractions.length)];
  const questionType = Math.random() > 0.5 ? 'toPercent' : 'toDecimal';
  
  if (questionType === 'toPercent') {
    return {
      id: `frac-percent-${Date.now()}`,
      question: `${selectedFraction.fraction} = ?%`,
      answer: selectedFraction.percent,
      difficulty: 2,
      module: 'fractions',
      hint: `Convert to decimal first: ${selectedFraction.fraction} = ${selectedFraction.decimal}`
    };
  } else {
    return {
      id: `frac-decimal-${Date.now()}`,
      question: `${selectedFraction.fraction} = ? (decimal)`,
      answer: selectedFraction.decimal * 100, // Store as whole number for easier input
      difficulty: 2,
      module: 'fractions',
      hint: `Divide the numerator by the denominator`
    };
  }
};

const generatePowerQuestion = (): Question => {
  const bases = [2, 3, 5, 7];
  const base = bases[Math.floor(Math.random() * bases.length)];
  const exponent = Math.floor(Math.random() * 4) + 2; // 2-5
  const answer = Math.pow(base, exponent);
  
  return {
    id: `power-${Date.now()}`,
    question: `${base}^${exponent}`,
    answer,
    difficulty: Math.floor(exponent / 2),
    module: 'powers',
    hint: `${base}^${exponent} = ${base} × `.repeat(exponent - 1) + base
  };
};

export const generateMultipleChoice = (question: Question, numOptions: number = 4): number[] => {
  const options = [question.answer];
  const range = Math.max(10, Math.floor(question.answer * 0.5));
  
  while (options.length < numOptions) {
    const wrongAnswer = question.answer + (Math.random() - 0.5) * range * 2;
    const roundedWrong = Math.round(wrongAnswer);
    
    if (roundedWrong !== question.answer && !options.includes(roundedWrong) && roundedWrong > 0) {
      options.push(roundedWrong);
    }
  }
  
  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  return options;
};