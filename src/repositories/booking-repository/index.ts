import { prisma } from '@/config';

async function getAll(userId: number) {
  return prisma.booking.findMany({
    where: { userId: userId },
    select: {
      id: true,
      Room: true,
    },
  });
}
const bookingRepository = { getAll };
export default bookingRepository;
