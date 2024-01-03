export interface UserModel {
  id?: string,
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  ageRange: string;
  password: string;
  smoke?: boolean;
  sex?: 'male' | 'female';
  profession?: string;
  about?: string;
  hobbies?: string[];
  userProfile: string;
}
