export interface Address {
  id?: number;
  streetAddress: string | null;
  city: string;
  state: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  mobile: string | null;
  userId?: number;
}