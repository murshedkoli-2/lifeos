import connectDB from '../lib/db';
import Task from '../models/Task';
import University from '../models/University';
import Project from '../models/Project';
import Finance from '../models/Finance';
import { roadmapTasks, initialUniversities, initialProjects, initialFinance } from '../data/roadmap';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Standalone CLI seeder (run with `npm run seed`). Shares its data with the
// seed API route via src/data/roadmap.ts so the two never drift.
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function seed() {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Connected!');

    console.log('Clearing existing data...');
    await Task.deleteMany({});
    await University.deleteMany({});
    await Project.deleteMany({});
    await Finance.deleteMany({});
    console.log('Cleared!');

    console.log('Seeding Tasks...');
    await Task.insertMany(roadmapTasks);
    console.log(`Seeded ${roadmapTasks.length} tasks!`);

    console.log('Seeding Universities...');
    await University.insertMany(initialUniversities);
    console.log(`Seeded ${initialUniversities.length} universities!`);

    console.log('Seeding Projects...');
    await Project.insertMany(initialProjects);
    console.log(`Seeded ${initialProjects.length} projects!`);

    console.log('Seeding initial Finance entry...');
    await Finance.create({ ...initialFinance, date: new Date() });
    console.log('Seeded Finance!');

    console.log('Seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
