import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/bookings-service';

export async function listReservation(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const reservations = await bookingsService.getReservation(userId);

    return res.status(httpStatus.OK).send(reservations);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND);
  }
}

export async function createReservation(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  if (!roomId) return res.status(403).send('no body');

  try {
    const reservation = await bookingsService.makeReservation(userId, roomId);

    return res.status(httpStatus.OK).send({ bookingId: reservation.id });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    if (error.name === 'RequestError') return res.sendStatus(403);
  }
}

export async function changeReservation(req: AuthenticatedRequest, res: Response) {
  const { bookingId } = req.params;
  const { userId } = req;
  const { roomId } = req.body;

  try {
    const update = await bookingsService.updateBooking(Number(bookingId), userId, roomId);
    return res.status(httpStatus.OK).send({ bookingId: update.id });
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(404);
    if (error.name === 'RequestError') return res.sendStatus(403);
  }
}
