import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  rol: 'admin' | 'repartidor' | 'caja';
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'repartidor', 'caja'], required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
