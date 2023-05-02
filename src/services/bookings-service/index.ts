import ticketService from '../tickets-service';
import { notFoundError, requestError } from '@/errors';

import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getReservation(userId: number) {
  const booking = await bookingRepository.getAll(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function makeReservation(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw requestError(403, 'forbiden');
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw requestError(403, 'forbiden');
  }

  const rooms = await bookingRepository.findRoomById(roomId);
  if (!rooms) throw notFoundError();
  if (rooms.Booking.length >= rooms.capacity) throw requestError(403, 'forbiden');

  const booking = await bookingRepository.createBooking(roomId, userId);

  return booking;
}

async function updateBooking(bookingId: number, userId: number, roomId: number) {
  const bookingExist = await bookingRepository.findBookingById(bookingId);
  if (!bookingExist) throw requestError(403, 'no booking found');
  if (bookingExist.Room.id !== roomId) throw notFoundError();

  const roomCapacity = await bookingRepository.findRoomById(roomId);
  if (roomCapacity.Booking.length >= roomCapacity.capacity) throw requestError(403, 'full capacity');

  const updateRoom = await bookingRepository.updateBooking(bookingId, roomId);

  return updateRoom;
}

export default { getReservation, makeReservation, updateBooking };
