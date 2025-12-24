import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

const USERS_KEY = "users";
const SESSION_KEY = "currentUser";

const getUsers = () =>
  JSON.parse(localStorage.getItem(USERS_KEY)) || [];

const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const signup = async ({ name, email, password }) => {
  const users = getUsers();

  const exists = users.find((u) => u.email === email);
  if (exists) {
    throw new Error("User already exists. Please login.");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuid(),
    name,
    email,
    passwordHash,
  };

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  localStorage.setItem("isAuth", "true");

  return newUser;
};

export const login = async ({ email, password }) => {
  const users = getUsers();

  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error("User not found. Please sign up.");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem("isAuth", "true");

  return user;
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("isAuth");
};

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(SESSION_KEY));
