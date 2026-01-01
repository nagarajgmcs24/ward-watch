export interface Problem {
  id: string;
  title: string;
  category: string;
  wardNumber: string;
  location: string;
  description: string;
  imageUrl: string | null;
  status: 'pending' | 'in-progress' | 'resolved';
  reportedBy: string;
  reportedAt: string;
  councillorRemarks?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'citizen' | 'councillor';
  wardNumber?: string;
}

const PROBLEMS_KEY = 'fixmyward_problems';
const USERS_KEY = 'fixmyward_users';
const CURRENT_USER_KEY = 'fixmyward_current_user';

// Initialize with sample data
const sampleProblems: Problem[] = [
  {
    id: '1',
    title: 'Large pothole on main road',
    category: 'Road',
    wardNumber: '12',
    location: 'MG Road, Near City Mall',
    description: 'A large pothole has formed on the main road causing traffic issues and danger to two-wheelers. The pothole is approximately 2 feet wide and 6 inches deep.',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600',
    status: 'pending',
    reportedBy: 'citizen@example.com',
    reportedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Garbage overflow at corner',
    category: 'Garbage',
    wardNumber: '12',
    location: 'Sector 5, Block C',
    description: 'The garbage bin at the corner has been overflowing for 3 days. Waste is scattered on the road causing hygiene issues.',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600',
    status: 'in-progress',
    reportedBy: 'user2@example.com',
    reportedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    councillorRemarks: 'Cleaning crew has been dispatched. Will be resolved by tomorrow.',
  },
  {
    id: '3',
    title: 'Streetlight not working',
    category: 'Electricity',
    wardNumber: '8',
    location: 'Gandhi Nagar, Lane 3',
    description: 'The streetlight near house number 45 has not been working for a week. The area becomes very dark at night.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    status: 'resolved',
    reportedBy: 'user3@example.com',
    reportedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    councillorRemarks: 'Streetlight has been repaired and is now functional.',
  },
  {
    id: '4',
    title: 'Water pipeline leakage',
    category: 'Water',
    wardNumber: '12',
    location: 'Nehru Street, Near Temple',
    description: 'Major water pipeline leakage causing water wastage and making the road slippery. Urgent attention needed.',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600',
    status: 'pending',
    reportedBy: 'citizen@example.com',
    reportedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Blocked drainage causing flooding',
    category: 'Drainage',
    wardNumber: '8',
    location: 'Industrial Area, Phase 2',
    description: 'The drainage system is completely blocked causing water logging during rains. Needs immediate cleaning.',
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600',
    status: 'in-progress',
    reportedBy: 'user4@example.com',
    reportedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const initializeStorage = () => {
  if (!localStorage.getItem(PROBLEMS_KEY)) {
    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(sampleProblems));
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([
      {
        id: '1',
        email: 'councillor@ward12.gov.in',
        name: 'Rajesh Kumar',
        role: 'councillor',
        wardNumber: '12',
      },
      {
        id: '2',
        email: 'councillor@ward8.gov.in',
        name: 'Priya Sharma',
        role: 'councillor',
        wardNumber: '8',
      },
    ]));
  }
};

export const getProblems = (): Problem[] => {
  initializeStorage();
  const data = localStorage.getItem(PROBLEMS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProblemById = (id: string): Problem | undefined => {
  const problems = getProblems();
  return problems.find(p => p.id === id);
};

export const addProblem = (problem: Omit<Problem, 'id' | 'reportedAt' | 'status'>): Problem => {
  const problems = getProblems();
  const newProblem: Problem = {
    ...problem,
    id: Date.now().toString(),
    status: 'pending',
    reportedAt: new Date().toISOString(),
  };
  problems.unshift(newProblem);
  localStorage.setItem(PROBLEMS_KEY, JSON.stringify(problems));
  return newProblem;
};

export const updateProblemStatus = (id: string, status: Problem['status'], remarks?: string): Problem | undefined => {
  const problems = getProblems();
  const index = problems.findIndex(p => p.id === id);
  if (index !== -1) {
    problems[index] = { 
      ...problems[index], 
      status,
      councillorRemarks: remarks || problems[index].councillorRemarks,
    };
    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(problems));
    return problems[index];
  }
  return undefined;
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const getUsers = (): User[] => {
  initializeStorage();
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const registerUser = (email: string, name: string, role: 'citizen' | 'councillor', wardNumber?: string): User => {
  const users = getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role,
    wardNumber,
  };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return newUser;
};

export const loginUser = (email: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const logoutUser = () => {
  setCurrentUser(null);
};
