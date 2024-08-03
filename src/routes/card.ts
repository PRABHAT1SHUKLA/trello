import { Router } from 'express';
import jwt from 'jsonwebtoken';
import zod from 'zod'
import { PrismaClient } from '@prisma/client';


const JWT_SECRET = "12345"
const router = Router();
const prisma = new PrismaClient();