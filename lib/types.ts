export interface Visit {
  id: number;
  full_name: string | null;
  phone_number: string | null;
  purpose: string | null;
  visiting_person: string | null;
  status: 'INSIDE' | 'OUTSIDE' | null;
  check_in_time: string | null;
  check_out_time: string | null;
  remarks: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  role: 'admin' | 'staff' | null;
  avatar_url: string | null;
  created_at?: string;
  updated_at?: string;
} 