import { Booking } from '@prisma/client';
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

async function findRoomById(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
    include: { Booking: true },
  });
}
async function createBooking(roomId: number, userId: number) {
  prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}
const bookingRepository = { getAll, findRoomById, createBooking };
export default bookingRepository;
