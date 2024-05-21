declare global {
  namespace Express {
    interface Request {
      files?: { [fieldname: string]: Express.Multer.File };
    }
  }
}