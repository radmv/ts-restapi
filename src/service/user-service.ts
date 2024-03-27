import bcrypt from "bcrypt";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
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
}
