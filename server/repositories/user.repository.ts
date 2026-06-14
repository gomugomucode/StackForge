import { prisma } from '../db/client'
import { User, Profile } from '@prisma/client'

export const UserRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    })
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  },

  async create(data: any) {
    return prisma.user.create({
      data,
    })
  },

  async update(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    })
  },

  async getProfile(userId: string) {
    return prisma.profile.findUnique({
      where: { userId },
    })
  },

  async updateXP(userId: string, amount: number) {
    return prisma.profile.update({
      where: { userId },
      data: {
        xp: {
          increment: amount,
        },
      },
    })
  },
}
