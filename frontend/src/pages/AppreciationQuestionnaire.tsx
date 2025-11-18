import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const questions = [
  'Prefiro receber elogios verbais ou por escrito?',
  'Valorizo quando alguém dedica tempo exclusivo para conversar comigo.',
  'Aprecio quando recebo pequenos presentes ou lembranças.',
  'Me sinto valorizado quando alguém me ajuda com minhas tarefas.',
  'Gosto de cumprimentos como apertos de mão (quando apropriado).',
  'Palavras de reconhecimento me motivam muito.',
  'Prefiro ter conversas profundas a presentes.',
  'Símbolos de reconhecimento (troféus, certificados) são importantes para mim.',
  'Valorizo quando alguém assume tarefas para me ajudar.',
  'Gestos de apoio me fazem sentir valorizado.',
  'Elogios públicos são muito importantes para mim.',
  'Atenção total durante uma conversa me faz sentir valorizado.',
  'Presentes personalizados mostram que alguém se importa.',
  'Ações práticas valem mais que palavras.',
  'Um gesto de incentivo me energiza.',
];

const languageMapping = [
  'PALAVRAS_AFIRMACAO',
  'TEMPO_QUALIDADE',
  'PRESENTES',
  'ATOS_SERVICO',
  'TOQUE_FISICO',
  'PALAVRAS_AFIRMACAO',
  'TEMPO_QUALIDADE',
  'PRESENTES',
  'ATOS_SERVICO',
  'TOQUE_FISICO',
  'PALAVRAS_AFIRMACAO',
  'TEMPO_QUALIDADE',
  'PRESENTES',
  'ATOS_SERVICO',
  'TOQUE_FISICO',
];

export default function AppreciationQuestionnaire() {
  const [answers, setAnswers] = useState<number[]>(Array(15).fill(0));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const mappedAnswers = answers.map((_, index) => languageMapping[index]);
      await api.post('/appreciation/submit', { answers: mappedAnswers });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Linguagens de Valorização</CardTitle>
          <CardDescription>
            Descubra como você prefere ser reconhecido no trabalho
          </CardDescription>
          <div className="w-full bg-secondary h-2 rounded-full mt-4">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Pergunta {currentQuestion + 1} de {questions.length}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[200px]">
            <Label className="text-lg mb-4 block">{questions[currentQuestion]}</Label>

            <div className="space-y-3">
              {[
                { value: 1, label: 'Discordo totalmente' },
                { value: 2, label: 'Discordo' },
                { value: 3, label: 'Neutro' },
                { value: 4, label: 'Concordo' },
                { value: 5, label: 'Concordo totalmente' },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={answers[currentQuestion] === option.value ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Anterior
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit}>Finalizar</Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={answers[currentQuestion] === 0}
              >
                Próxima
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
