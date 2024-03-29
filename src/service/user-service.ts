import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  UserResponse,
  toUserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    // validate request
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    // cek apakah username pernah digunakan
    const totalUserWithSameUsername = await prismaClient.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new ResponseError(400, "Username already exists");
    }

    // jika username belum digunakan maka enkripsi password
    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // registrasi user ke database
    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    // kembalikan response dengan konversi model ke response
    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    // cari apakah user sudah terdaftar
    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    // jika user tidak ditemukan
    if (!user) {
      throw new ResponseError(401, "Username or password is incorrect");
    }

    // jika user ditemukan, cek password
    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );

    // jika password salah
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is incorrect");
    }

    // jika password benar
    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }
}
