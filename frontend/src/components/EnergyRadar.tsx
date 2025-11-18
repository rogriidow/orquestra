import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EnergyRadarProps {
  data: {
    produtiva: number;
    confortavel: number;
    renovacao: number;
    conexao: number;
  };
}

export default function EnergyRadar({ data }: EnergyRadarProps) {
  const chartData = [
    { energy: 'Produtiva', value: data.produtiva, fullMark: 10 },
    { energy: 'Confortável', value: data.confortavel, fullMark: 10 },
    { energy: 'Renovação', value: data.renovacao, fullMark: 10 },
    { energy: 'Conexão', value: data.conexao, fullMark: 10 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Radar de Energia</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="energy" />
            <PolarRadiusAxis angle={90} domain={[0, 10]} />
            <Radar name="Energia" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {chartData.map((item) => (
            <div key={item.energy} className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{item.energy}</span>
              <span className="font-semibold">{item.value}/10</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
