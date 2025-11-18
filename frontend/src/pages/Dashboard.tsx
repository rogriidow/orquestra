import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnergyRadar from '@/components/EnergyRadar';
import NeedsBarometer from '@/components/NeedsBarometer';
import { Users, TrendingUp, Heart, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [teamEnergy, setTeamEnergy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const response = await api.get('/teams');
      const teamsData = response.data.data.teams;
      setTeams(teamsData);

      if (teamsData.length > 0) {
        setSelectedTeam(teamsData[0]);
        loadTeamEnergy(teamsData[0].id);
      }
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeamEnergy = async (teamId: string) => {
    try {
      const response = await api.get(`/assessments/team/${teamId}/energy`);
      setTeamEnergy(response.data.data);
    } catch (error) {
      console.error('Error loading team energy:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎼</span>
              <div>
                <h1 className="text-xl font-bold">Orquestra de Potenciais</h1>
                <p className="text-sm text-muted-foreground">Bem-vindo, {user?.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => useAuth.getState().logout()}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {teams.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Nenhuma equipe encontrada</CardTitle>
              <CardDescription>
                Crie sua primeira equipe para começar a orquestrar potenciais!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Criar Equipe</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Equipes</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teams.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teams.reduce((acc, team) => acc + (team.members?.length || 0), 0)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Energia Média</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teamEnergy?.averages ?
                      Math.round((teamEnergy.averages.produtiva + teamEnergy.averages.confortavel +
                                 teamEnergy.averages.renovacao + teamEnergy.averages.conexao) / 4 * 10) / 10
                      : '-'}/10
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Alto</div>
                </CardContent>
              </Card>
            </div>

            {/* Team Selection */}
            {selectedTeam && (
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedTeam.name}
                </h2>
                <p className="text-muted-foreground">{selectedTeam.description}</p>
              </div>
            )}

            {/* Charts */}
            {teamEnergy?.averages && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EnergyRadar data={teamEnergy.averages} />
                <NeedsBarometer
                  data={{
                    seguranca: 7,
                    social: 8,
                    estima: 6,
                    autorrealizacao: 7
                  }}
                />
              </div>
            )}

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Sugestões Inteligentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl">💡</div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Ritual de Conexão</h4>
                      <p className="text-sm text-blue-700">
                        A energia de conexão está ligeiramente baixa. Considere realizar um Check-in Diário com a equipe.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl">🌟</div>
                    <div>
                      <h4 className="font-semibold text-green-900">Reconhecimento</h4>
                      <p className="text-sm text-green-700">
                        Ótimo momento para reconhecer as conquistas da semana. Realize uma Retrospectiva Apreciativa!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
