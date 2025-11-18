import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/hash';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create demo maestro
  const maestroPassword = await hashPassword('maestro123');
  const maestro = await prisma.user.upsert({
    where: { email: 'maestro@orquestra.com' },
    update: {},
    create: {
      email: 'maestro@orquestra.com',
      password: maestroPassword,
      name: 'Ana Maestro',
      role: 'MAESTRO',
      status: 'ACTIVE',
      position: 'Gerente de Inovação',
      department: 'Tecnologia',
    },
  });

  console.log('✅ Created maestro:', maestro.email);

  // Create demo collaborators
  const colaboradorPassword = await hashPassword('colab123');

  const colaboradores = await Promise.all([
    prisma.user.upsert({
      where: { email: 'joao@orquestra.com' },
      update: {},
      create: {
        email: 'joao@orquestra.com',
        password: colaboradorPassword,
        name: 'João Silva',
        role: 'COLABORADOR',
        status: 'ACTIVE',
        position: 'Desenvolvedor Senior',
        department: 'Tecnologia',
      },
    }),
    prisma.user.upsert({
      where: { email: 'maria@orquestra.com' },
      update: {},
      create: {
        email: 'maria@orquestra.com',
        password: colaboradorPassword,
        name: 'Maria Santos',
        role: 'COLABORADOR',
        status: 'ACTIVE',
        position: 'Designer UX/UI',
        department: 'Design',
      },
    }),
    prisma.user.upsert({
      where: { email: 'pedro@orquestra.com' },
      update: {},
      create: {
        email: 'pedro@orquestra.com',
        password: colaboradorPassword,
        name: 'Pedro Costa',
        role: 'COLABORADOR',
        status: 'ACTIVE',
        position: 'Product Manager',
        department: 'Produto',
      },
    }),
  ]);

  console.log('✅ Created', colaboradores.length, 'colaboradores');

  // Create demo team
  const team = await prisma.team.upsert({
    where: { id: 'demo-team-id' },
    update: {},
    create: {
      id: 'demo-team-id',
      name: 'Squad Inovação',
      description: 'Equipe responsável por inovação e novos produtos',
      color: '#6366f1',
      leaderId: maestro.id,
    },
  });

  console.log('✅ Created team:', team.name);

  // Add members to team
  for (const colab of colaboradores) {
    await prisma.teamMember.upsert({
      where: {
        teamId_userId: {
          teamId: team.id,
          userId: colab.id,
        },
      },
      update: {},
      create: {
        teamId: team.id,
        userId: colab.id,
      },
    });
  }

  console.log('✅ Added members to team');

  // Create sample energy assessments
  for (const colab of colaboradores) {
    await prisma.energyAssessment.create({
      data: {
        userId: colab.id,
        produtiva: Math.floor(Math.random() * 5) + 5,
        confortavel: Math.floor(Math.random() * 5) + 5,
        renovacao: Math.floor(Math.random() * 5) + 5,
        conexao: Math.floor(Math.random() * 5) + 5,
      },
    });
  }

  console.log('✅ Created energy assessments');

  // Create sample rituals
  await prisma.ritual.createMany({
    data: [
      {
        title: 'Check-in Diário',
        description: 'Momento rápido para compartilhar como cada pessoa está se sentindo',
        category: 'CONEXAO',
        frequency: 'DIARIA',
        duration: 15,
        participants: 5,
        objectives: ['Criar conexão', 'Identificar necessidades', 'Promover empatia'],
        benefits: ['Melhora o clima da equipe', 'Antecipa problemas', 'Fortalece vínculos'],
        steps: [
          'Reunir a equipe em círculo',
          'Cada pessoa compartilha como está se sentindo (1-2 min)',
          'Sem julgamentos, apenas escuta ativa',
          'Identificar se alguém precisa de suporte',
        ],
        materials: [],
        tips: ['Seja autêntico', 'Pratique a escuta ativa', 'Respeite quem preferir não compartilhar'],
      },
      {
        title: 'Retrospectiva Apreciativa',
        description: 'Celebrar conquistas e aprendizados da semana',
        category: 'RECONHECIMENTO',
        frequency: 'SEMANAL',
        duration: 60,
        participants: 8,
        objectives: ['Reconhecer esforços', 'Celebrar conquistas', 'Aprender com experiências'],
        benefits: ['Aumenta motivação', 'Fortalece cultura de reconhecimento', 'Promove aprendizado'],
        steps: [
          'Cada pessoa compartilha uma vitória da semana',
          'Reconhecer contribuições de colegas',
          'Identificar aprendizados',
          'Definir ações de melhoria',
        ],
        materials: ['Quadro ou ferramenta digital', 'Post-its'],
        tips: ['Foque no positivo', 'Seja específico nos elogios', 'Valorize pequenas conquistas'],
      },
    ],
  });

  console.log('✅ Created sample rituals');

  console.log('🌱 Seed completed!');
  console.log('\n📝 Demo credentials:');
  console.log('Maestro: maestro@orquestra.com / maestro123');
  console.log('Colaborador: joao@orquestra.com / colab123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
