import { faker } from '@faker-js/faker';

export interface FakeUser {
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  occupation: string;
  interests: string[];
  joinDate: Date;
  activityLevel: 'high' | 'medium' | 'low';
  trustScore: number;
  bio: string;
  avatar: string;
  connections: string[];
  connectionCount: number;
  isOnline: boolean;
  lastSeen: Date;
  accountType: 'free' | 'professional' | 'venue';
}

export interface Connection {
  userAId: string;
  userBId: string;
  relationshipType: 'friend' | 'follower' | 'mutual';
  connectionDate: Date;
  strengthScore: number;
  mutualFriendsCount: number;
  interactionFrequency: 'high' | 'medium' | 'low';
  connectionSource: 'mutual_friends' | 'location' | 'interests' | 'work' | 'random';
  professionalRelationshipType?: 'professional_only' | 'personal_access' | 'uncategorized';
}

export class FakeUserNetworkGenerator {
  private users: FakeUser[] = [];
  private connections: Connection[] = [];
  
  private readonly TOTAL_USERS = 7;
  private readonly MIN_CONNECTIONS = 1;
  private readonly MAX_CONNECTIONS = 6;
  
  // Interest categories for realistic groupings
  private readonly INTERESTS = [
    'Programming', 'Web Development', 'AI/ML', 'Photography', 'Music Production',
    'Rock Climbing', 'Running', 'Yoga', 'Marketing', 'Finance', 'Cooking',
    'Travel', 'Wine Tasting', 'Coffee', 'Volunteering', 'Networking'
  ];
  
  // Arizona cities for geographic distribution
  private readonly LOCATIONS = [
    { city: 'Phoenix', state: 'AZ', weight: 25 },
    { city: 'Tucson', state: 'AZ', weight: 15 },
    { city: 'Mesa', state: 'AZ', weight: 12 },
    { city: 'Scottsdale', state: 'AZ', weight: 10 },
    { city: 'Chandler', state: 'AZ', weight: 8 }
  ];
  
  private readonly OCCUPATIONS = [
    'Software Engineer', 'Marketing Manager', 'Teacher', 'Nurse', 'Sales Representative',
    'Graphic Designer', 'Financial Advisor', 'Real Estate Agent', 'Project Manager'
  ];

  constructor() {
    faker.seed(12345);
  }

  generateNetwork(): { users: FakeUser[], connections: Connection[] } {
    console.log('Generating fake user network...');
    
    // Phase 1: Generate users
    this.generateUsers();
    
    // Phase 2: Create connections
    this.createConnections();
    
    // Phase 3: Validate and adjust
    this.validateNetwork();
    
    console.log(`Generated ${this.users.length} users with ${this.connections.length} connections`);
    return { users: this.users, connections: this.connections };
  }

  private generateUsers(): void {
    console.log('Generating user profiles...');
    
    // Create Rieslin Lefluuf as the first user
    const rieslin: FakeUser = {
      id: faker.string.uuid(),
      name: 'Rieslin Lefluuf',
      username: 'rieslin',
      email: 'rieslin@example.com',
      age: 28,
      location: {
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA'
      },
      occupation: 'Software Engineer',
      interests: ['Programming', 'Web Development', 'AI/ML', 'Rock Climbing'],
      joinDate: new Date('2023-01-01'),
      activityLevel: 'high',
      trustScore: 95,
      bio: 'Passionate about technology and outdoor adventures',
      avatar: this.generateAvatar('Rieslin Lefluuf'),
      connections: [],
      connectionCount: 0,
      isOnline: true,
      lastSeen: new Date(),
      accountType: 'professional'
    };
    
    this.users.push(rieslin);
    
    // Generate 6 more users
    const otherUsers = [
      'Jessica Wong',
      'David Kim',
      'Mike Johnson',
      'Emma Davis',
      'Sarah Chen',
      'Alex Martinez'
    ];
    
    otherUsers.forEach(name => {
      const user: FakeUser = {
        id: faker.string.uuid(),
        name: name,
        username: faker.internet.username(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 65 }),
        location: this.getRandomLocation(),
        occupation: faker.helpers.arrayElement(this.OCCUPATIONS),
        interests: this.generateInterests(),
        joinDate: faker.date.between({ 
          from: new Date('2023-01-01'), 
          to: new Date() 
        }),
        activityLevel: this.getActivityLevel(),
        trustScore: faker.number.int({ min: 65, max: 98 }),
        bio: faker.lorem.sentences(2),
        avatar: this.generateAvatar(name),
        connections: [],
        connectionCount: 0,
        isOnline: faker.datatype.boolean({ probability: 0.15 }),
        lastSeen: faker.date.recent({ days: 30 }),
        accountType: this.getAccountType()
      };
      
      this.users.push(user);
    });
  }

  private getRandomLocation() {
    const totalWeight = this.LOCATIONS.reduce((sum, loc) => sum + loc.weight, 0);
    const random = faker.number.int({ min: 1, max: totalWeight });
    
    let currentWeight = 0;
    for (const location of this.LOCATIONS) {
      currentWeight += location.weight;
      if (random <= currentWeight) {
        return {
          city: location.city,
          state: location.state,
          country: 'USA'
        };
      }
    }
    
    return {
      city: this.LOCATIONS[0].city,
      state: this.LOCATIONS[0].state,
      country: 'USA'
    };
  }

  private generateInterests(): string[] {
    return faker.helpers.arrayElements(this.INTERESTS, faker.number.int({ min: 2, max: 5 }));
  }

  private getActivityLevel(): 'high' | 'medium' | 'low' {
    return faker.helpers.arrayElement(['high', 'medium', 'low']);
  }

  private getAccountType(): 'free' | 'professional' | 'venue' {
    return faker.helpers.arrayElement(['free', 'professional']);
  }

  private generateAvatar(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  }

  private createConnections(): void {
    // Make Rieslin Lefluuf friends with everyone
    const rieslin = this.users[0];
    for (let i = 1; i < this.users.length; i++) {
      this.addConnection(
        rieslin.id,
        this.users[i].id,
        'friend',
        'mutual_friends',
        0.9
      );
    }

    // Create some additional connections between other users
    for (let i = 1; i < this.users.length; i++) {
      const numConnections = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = faker.number.int({ min: 1, max: this.users.length - 1 });
        if (targetIndex !== i) {
          this.addConnection(
            this.users[i].id,
            this.users[targetIndex].id,
            'friend',
            'mutual_friends',
            faker.number.float({ min: 0.5, max: 0.9 })
          );
        }
      }
    }
  }

  private addConnection(
    userAId: string,
    userBId: string,
    type: 'friend' | 'follower' | 'mutual',
    source: 'mutual_friends' | 'location' | 'interests' | 'work' | 'random',
    strength: number
  ): void {
    if (this.connectionExists(userAId, userBId)) return;

    const connection: Connection = {
      userAId,
      userBId,
      relationshipType: type,
      connectionDate: faker.date.recent({ days: 30 }),
      strengthScore: strength,
      mutualFriendsCount: this.getMutualFriendsCount(userAId, userBId),
      interactionFrequency: faker.helpers.arrayElement(['high', 'medium', 'low']),
      connectionSource: source
    };

    this.connections.push(connection);

    // Update user connections
    const userA = this.users.find(u => u.id === userAId);
    const userB = this.users.find(u => u.id === userBId);

    if (userA && userB) {
      userA.connections.push(userBId);
      userB.connections.push(userAId);
      userA.connectionCount++;
      userB.connectionCount++;
    }
  }

  private connectionExists(userAId: string, userBId: string): boolean {
    return this.connections.some(
      conn => (conn.userAId === userAId && conn.userBId === userBId) ||
              (conn.userAId === userBId && conn.userBId === userAId)
    );
  }

  private getMutualFriendsCount(userAId: string, userBId: string): number {
    const userA = this.users.find(u => u.id === userAId);
    const userB = this.users.find(u => u.id === userBId);
    
    if (!userA || !userB) return 0;
    
    return userA.connections.filter(id => userB.connections.includes(id)).length;
  }

  private validateNetwork(): void {
    // Ensure all users have at least MIN_CONNECTIONS
    this.users.forEach(user => {
      if (user.connectionCount < this.MIN_CONNECTIONS) {
        const neededConnections = this.MIN_CONNECTIONS - user.connectionCount;
        this.addMoreConnections(user, neededConnections);
      }
    });
  }

  private addMoreConnections(user: FakeUser, count: number): void {
    const potentialConnections = this.users.filter(u => 
      u.id !== user.id && !user.connections.includes(u.id)
    );

    for (let i = 0; i < count && i < potentialConnections.length; i++) {
      const targetUser = potentialConnections[i];
      this.addConnection(
        user.id,
        targetUser.id,
        'friend',
        'random',
        faker.number.float({ min: 0.3, max: 0.7 })
      );
    }
  }

  getNetworkAnalytics() {
    return {
      totalUsers: this.users.length,
      totalConnections: this.connections.length,
      averageConnections: this.users.reduce((sum, user) => sum + user.connectionCount, 0) / this.users.length,
      mostConnectedUser: this.users.reduce((max, user) => 
        user.connectionCount > max.connectionCount ? user : max
      ),
      leastConnectedUser: this.users.reduce((min, user) => 
        user.connectionCount < min.connectionCount ? user : min
      )
    };
  }
}

export const fakeUserNetworkGenerator = new FakeUserNetworkGenerator();