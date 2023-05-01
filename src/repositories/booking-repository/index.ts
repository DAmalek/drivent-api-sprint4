import { Booking } from '@prisma/client';
import { prisma } from '@/config';

async function getAll(userId: number) {
  return prisma.booking.findFirst({
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
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: { id: bookingId },
    include: {
      Room: true,
    },
  });
}
async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      roomId,
    },
  });
}
const bookingRepository = { getAll, findRoomById, createBooking, findBookingById, updateBooking };
export default bookingRepository;
