import { Router } from 'express';
import { changeReservation, createReservation, listReservation } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const bookingRoter = Router();

bookingRoter
  .all('/*', authenticateToken)
  .get('/', listReservation)
  .post('/', createReservation)
  .put('/:bookingId', changeReservation);

export { bookingRoter };
