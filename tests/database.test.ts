import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Database Tests', () => {
  it('should create and retrieve a service request', async () => {
    // Create a service request
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        nextAction: 'serviceteam',
        team: 'maintenance',
        activity: 'repair',
        budget: 500,
        personell: 3,
        dueDate: '2023-12-31',
        planNote: 'Urgent repair needed',
      },
    });

    // Retrieve the service request
    const retrievedRequest = await prisma.serviceRequest.findUnique({
      where: { id: serviceRequest.id },
    });

    // Assertions
    expect(retrievedRequest).not.toBeNull();
    expect(retrievedRequest?.team).toBe('maintenance');
    expect(retrievedRequest?.activity).toBe('repair');
    expect(retrievedRequest?.budget).toBe(500);
    expect(retrievedRequest?.personell).toBe(3);
    expect(retrievedRequest?.dueDate).toBe('2023-12-31');
    expect(retrievedRequest?.planNote).toBe('Urgent repair needed');
  });

  it('should create and retrieve an event request', async () => {
    // Create an event request
    const eventRequest = await prisma.eventRequest.create({
      data: {
        clientName: 'John Doe',
        memo: 'Annual company meeting',
        eventType: 'meeting',
        fromDate: new Date('2023-11-01T00:00:00Z'),
        toDate: new Date('2023-11-02T00:00:00Z'),
        numAttend: 50,
        budget: 2000,
        decorations: true,
        parties: false,
        photos: true,
        meals: true,
        drinks: true,
        finNote: 'Budget approved',
      },
    });

    // Retrieve the event request
    const retrievedRequest = await prisma.eventRequest.findUnique({
      where: { id: eventRequest.id },
    });

    // Assertions
    expect(retrievedRequest).not.toBeNull();
    expect(retrievedRequest?.clientName).toBe('John Doe');
    expect(retrievedRequest?.memo).toBe('Annual company meeting');
    expect(retrievedRequest?.eventType).toBe('meeting');
    expect(retrievedRequest?.numAttend).toBe(50);
    expect(retrievedRequest?.budget).toBe(2000);
    expect(retrievedRequest?.decorations).toBe(true);
    expect(retrievedRequest?.meals).toBe(true);
    expect(retrievedRequest?.drinks).toBe(true);
    expect(retrievedRequest?.finNote).toBe('Budget approved');
  });
});