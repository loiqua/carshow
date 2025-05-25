import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur administrateur
  const adminPassword = await hash('Admin123!', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@carshow.com' },
    update: {},
    create: {
      email: 'admin@carshow.com',
      name: 'Administrateur',
      password: adminPassword,
    },
  });

  console.log('Admin user created:', admin.email);

  // Créer quelques voitures
  const car1 = await prisma.car.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Mercedes-AMG GT',
      description: 'Une supercar allemande au design élégant avec un moteur V8 puissant.',
      brand: 'Mercedes-Benz',
      model: 'AMG GT',
      price: 125000,
      color: 'Gris Sélénite',
      motorType: 'Essence',
      power: '462 ch',
      placeNumber: 2,
      status: true,
      type: 'Coupé',
    },
  });

  const car2 = await prisma.car.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'BMW M4 Competition',
      description: 'Un coupé sportif avec une puissance exceptionnelle et une tenue de route précise.',
      brand: 'BMW',
      model: 'M4 Competition',
      price: 112900,
      color: 'Bleu San Marino',
      motorType: 'Essence',
      power: '510 ch',
      placeNumber: 4,
      status: true,
      type: 'Coupé',
    },
  });

  const car3 = await prisma.car.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Audi RS e-tron GT',
      description: 'Une berline électrique alliant performances et élégance avec une autonomie impressionnante.',
      brand: 'Audi',
      model: 'RS e-tron GT',
      price: 140700,
      color: 'Noir Mythic',
      motorType: 'Électrique',
      power: '646 ch',
      placeNumber: 4,
      status: true,
      type: 'Berline',
    },
  });

  console.log('Cars created:', [car1.name, car2.name, car3.name]);

  // Ajouter des images pour chaque voiture
  await prisma.image.create({
    data: {
      url: '/images/mercedes-amg-gt-1.jpg',
      carId: car1.id,
    },
  });

  await prisma.image.create({
    data: {
      url: '/images/mercedes-amg-gt-2.jpg',
      carId: car1.id,
    },
  });

  await prisma.image.create({
    data: {
      url: '/images/bmw-m4-1.jpg',
      carId: car2.id,
    },
  });

  await prisma.image.create({
    data: {
      url: '/images/bmw-m4-2.jpg',
      carId: car2.id,
    },
  });

  await prisma.image.create({
    data: {
      url: '/images/audi-rs-etron-1.jpg',
      carId: car3.id,
    },
  });

  await prisma.image.create({
    data: {
      url: '/images/audi-rs-etron-2.jpg',
      carId: car3.id,
    },
  });

  console.log('Images created for cars');

  // Créer quelques rendez-vous
  await prisma.appointment.create({
    data: {
      name: 'Dubois',
      firstName: 'Jean',
      email: 'jean.dubois@example.com',
      message: 'Je souhaiterais essayer ce modèle le plus tôt possible.',
      contact: '0612345678',
      appointmentDate: new Date('2025-06-15T10:00:00Z'),
      status: 'pending',
      carId: car1.id,
    },
  });

  await prisma.appointment.create({
    data: {
      name: 'Martin',
      firstName: 'Sophie',
      email: 'sophie.martin@example.com',
      message: 'Pouvez-vous me donner plus d\'informations sur les options disponibles?',
      contact: '0687654321',
      appointmentDate: new Date('2025-06-20T14:30:00Z'),
      status: 'confirmed',
      carId: car3.id,
    },
  });

  console.log('Appointments created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
