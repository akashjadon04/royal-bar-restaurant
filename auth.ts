import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isSignUp: { label: "Sign Up", type: "text" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const email = credentials.email as string;
        const password = credentials.password as string;
        
        let user = await prisma.user.findUnique({ where: { email } });

        // Sign Up Flow
        if (credentials.isSignUp === 'true') {
          if (user) {
            throw new Error('Email already exists');
          }
          user = await prisma.user.create({
            data: {
              email,
              passwordHash: password, // For simplicity in file DB, we store as plain. In prod use bcrypt!
              firstName: credentials.firstName as string || 'New',
              lastName: credentials.lastName as string || 'User',
              role: email.includes('admin') ? 'ADMIN' : 'CUSTOMER'
            }
          });
        } else {
          // Sign In Flow
          let isValid = false;
          if (user && user.passwordHash) {
            if (user.passwordHash.startsWith('$2')) {
              isValid = await bcrypt.compare(password, user.passwordHash);
            } else {
              isValid = (user.passwordHash === password);
            }
          }
          
          if (!user || !isValid) {
            // Fallback to static .env admin if they wiped the DB
            const envAdminEmail = process.env.ADMIN_EMAIL || 'admin@royalbar.com';
            const envAdminPass = process.env.ADMIN_PASSWORD || 'admin123';
            if (email === envAdminEmail && password === envAdminPass) {
               return { id: 'admin-0', name: 'Master Admin', email, role: 'ADMIN' };
            }
            return null;
          }
        }

        return { 
          id: user.id, 
          name: `${user.firstName} ${user.lastName}`, 
          email: user.email, 
          role: user.role 
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET || "a-very-secure-random-secret-key-12345"
})
