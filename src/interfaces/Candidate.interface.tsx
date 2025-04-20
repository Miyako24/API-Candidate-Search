// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    login: string;
    name: string | null;
    avatar_url: string;
    location: string | null;
    email: string | null;
    company: string | null;
    html_url: string;
  }