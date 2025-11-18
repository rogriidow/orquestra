import { useEffect, useState } from 'react';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Target } from 'lucide-react';

const categoryColors = {
  ENERGIZACAO: 'bg-yellow-100 text-yellow-800',
  CONEXAO: 'bg-blue-100 text-blue-800',
  RECONHECIMENTO: 'bg-green-100 text-green-800',
  DESENVOLVIMENTO: 'bg-purple-100 text-purple-800',
  RENOVACAO: 'bg-indigo-100 text-indigo-800',
};

const categoryLabels = {
  ENERGIZACAO: 'Energização',
  CONEXAO: 'Conexão',
  RECONHECIMENTO: 'Reconhecimento',
  DESENVOLVIMENTO: 'Desenvolvimento',
  RENOVACAO: 'Renovação',
};

export default function Rituals() {
  const [rituals, setRituals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRituals();
  }, []);

  const loadRituals = async () => {
    try {
      const response = await api.get('/rituals');
      setRituals(response.data.data.rituals);
    } catch (error) {
      console.error('Error loading rituals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Biblioteca de Rituais</h1>
          <p className="text-muted-foreground">Práticas para energizar e conectar sua equipe</p>
        </div>
        <Button>Criar Ritual</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rituals.map((ritual) => (
          <Card key={ritual.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{ritual.title}</CardTitle>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[ritual.category as keyof typeof categoryColors]}`}>
                      {categoryLabels[ritual.category as keyof typeof categoryLabels]}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{ritual.description}</CardDescription>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {ritual.duration} min
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {ritual.participants} pessoas
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  Objetivos:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {ritual.objectives.slice(0, 2).map((obj: string, i: number) => (
                    <li key={i}>• {obj}</li>
                  ))}
                </ul>
              </div>

              <Button className="w-full" variant="outline">Ver Detalhes</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
