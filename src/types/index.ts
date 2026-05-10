import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

export interface BusinessHour {
  day: string;
  hours: string;
}

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
}

export interface QuickLink {
  label: string;
  url: string;
}

export interface Bullet {
  icon: string;
  text: string;
}
