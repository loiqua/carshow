import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

// Type pour les données de la voiture
interface CarData {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  price: number;
  color: string;
  motorType: string;
  power: string;
  placeNumber: number;
  status: boolean;
  type: string;
}

// Fonction utilitaire pour créer une voiture avec ses images
async function createCarWithImages(carData: CarData, images: string[]) {
  const car = await prisma.car.upsert({
    where: { id: carData.id },
    update: {},
    create: carData,
  });

  // Supprimer les images existantes pour éviter les doublons
  await prisma.image.deleteMany({
    where: { carId: car.id },
  });

  // Ajouter les nouvelles images
  for (const url of images) {
    await prisma.image.create({
      data: {
        url,
        carId: car.id,
      },
    });
  }

  return car;
}

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

  // Supprimer d'abord les dépendances
  await prisma.appointment.deleteMany({});
  
  // Ensuite supprimer les images
  await prisma.image.deleteMany({});
  
  // Enfin supprimer les voitures
  await prisma.car.deleteMany({});

  // Voiture 1: Mercedes-AMG GT
  const car1 = await createCarWithImages(
    {
      id: 1,
      name: 'Mercedes-AMG GT',
      description: 'Une supercar allemande au design élégant avec un moteur V8 puissant offrant des performances exceptionnelles.',
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
    [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580273916551-e264ee7e7f79?q=80&w=2000&auto=format&fit=crop'
    ]
  );

  // Voiture 2: BMW M4 Competition
  const car2 = await createCarWithImages(
    {
      id: 2,
      name: 'BMW M4 Competition',
      description: 'Un coupé sportif avec une puissance exceptionnelle et une tenue de route précise pour les amateurs de conduite sportive.',
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
    [
      'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605894333980-802c2bfbc5f1?q=80&w=2000&auto=format&fit=crop'
    ]
  );

  // Voiture 3: Audi RS e-tron GT
  const car3 = await createCarWithImages(
    {
      id: 3,
      name: 'Audi RS e-tron GT',
      description: 'Une berline électrique alliant performances et élégance avec une autonomie impressionnante et une accélération foudroyante.',
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
    [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603584173809-6f6e5e59e3a6?q=80&w=2000&auto=format&fit=crop'
    ]
  );

  // Voiture 4: Porsche 911 Turbo S
  await createCarWithImages(
    {
      id: 4,
      name: 'Porsche 911 Turbo S',
      description: 'L\'icône de la sportivité Porsche avec des performances exceptionnelles et un design intemporel.',
      brand: 'Porsche',
      model: '911 Turbo S',
      price: 215000,
      color: 'Blanc Carrara',
      motorType: 'Essence',
      power: '650 ch',
      placeNumber: 4,
      status: true,
      type: 'Coupé',
    },
    [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780293-7e4081c3dfff?q=80&w=2000&auto=format&fit=crop'
    ]
  );

  // Voiture 5: Ferrari 296 GTB
  await createCarWithImages(
    {
      id: 5,
      name: 'Ferrari 296 GTB',
      description: 'Une hypercar hybride rechargeable alliant la puissance d\'un V6 biturbo à la technologie électrique.',
      brand: 'Ferrari',
      model: '296 GTB',
      price: 269000,
      color: 'Rouge Corsa',
      motorType: 'Hybride',
      power: '830 ch',
      placeNumber: 2,
      status: true,
      type: 'Coupé',
    },
    [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1623428189015-9aeb79d5ccf1?q=80&w=2000&auto=format&fit=crop'
    ]
  );

  // Voiture 6: Lamborghini Huracán EVO
  await createCarWithImages(
    {
      id: 6,
      name: 'Lamborghini Huracán EVO',
      description: 'Une supercar extrême avec un V10 atmosphérique et une technologie de pointe pour une expérience de conduite inégalée.',
      brand: 'Lamborghini',
      model: 'Huracán EVO',
      price: 215000,
      color: 'Verde Mantis',
      motorType: 'Essence',
      power: '640 ch',
      placeNumber: 2,
      status: true,
      type: 'Coupé',
    },
    [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1623428189015-9aeb79d5ccf1?q=80&w=2000&auto=format&fit=crop'
    ]
  );

  console.log('Cars created successfully!');

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
