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

  try {
    const reservation = await bookingsService.makeReservation(userId);
  } catch (error) {}
}
