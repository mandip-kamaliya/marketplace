import { migrator } from './config/migrations';
import { seedDatabase } from './db/seeders';
import { setupAssociations } from './db';

async function main() {
  console.log('Running migrations...');
  await migrator.up();
  
  console.log('Setting up associations...');
  await setupAssociations();
  
  console.log('Seeding database...');
  await seedDatabase();
  
  console.log('Database setup completed successfully!');
  process.exit(0);
}

main().catch((error) => {
  console.error('Error setting up database:', error);
  process.exit(1);
});
