import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface NeedsBarometerProps {
  data: {
    seguranca: number;
    social: number;
    estima: number;
    autorrealizacao: number;
  };
}

export default function NeedsBarometer({ data }: NeedsBarometerProps) {
  const chartData = [
    { need: 'Segurança', value: data.seguranca, description: 'Estabilidade e clareza' },
    { need: 'Social', value: data.social, description: 'Pertencimento' },
    { need: 'Estima', value: data.estima, description: 'Reconhecimento' },
    { need: 'Autorrealização', value: data.autorrealizacao, description: 'Propósito' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Barômetro de Necessidades</CardTitle>
        <CardDescription>Baseado na Pirâmide de Maslow adaptada</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 10]} />
            <YAxis dataKey="need" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {chartData.map((item) => (
            <div key={item.need} className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <div>
                <span className="font-medium">{item.need}</span>
                <span className="text-sm text-muted-foreground ml-2">({item.description})</span>
              </div>
              <span className="font-semibold">{item.value}/10</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
