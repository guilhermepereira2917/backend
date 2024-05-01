import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  nome: string;
  email: string;
  idade: number;
  genero: string;
  telefone: string;
  cpf: string;
  rg: string;
}

const UserSchema: Schema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true, validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  idade: { type: Number, required: true },
  genero: { type: String, required: true },
  telefone: { type: String },
  cpf: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /\d{3}\.\d{3}\.\d{3}-\d{2}/.test(v);
      },
      message: props => `${props.value} não é um CPF válido!`
    }
  },
  rg: { type: String, required: true, unique: true },
});

export default mongoose.model<User>('User', UserSchema);
