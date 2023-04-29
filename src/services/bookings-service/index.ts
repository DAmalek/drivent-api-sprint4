import ticketService from '../tickets-service';
import { notFoundError, requestError } from '@/errors';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getReservation(userId: number) {
  const booking = await bookingRepository.getAll(userId);
  if (!booking) throw notFoundError;

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

export default { getReservation, makeReservation };
