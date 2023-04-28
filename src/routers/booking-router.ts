import { Router } from 'express';
import { createReservation, listReservation } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const bookingRoter = Router();

bookingRoter.all('/*', authenticateToken).get('/', listReservation).post('/', createReservation);

export { bookingRoter };
