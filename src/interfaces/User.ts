interface User {
  full_name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

interface UserLogin {
  full_name: string;
  email: string;
  id: string;
}

interface TokenUser {
  id: string;
  role: 'admin' | 'user';
}

interface UserIdWithToken {
  id: string;
  token: string;
}

export {User, UserLogin, TokenUser, UserIdWithToken};
