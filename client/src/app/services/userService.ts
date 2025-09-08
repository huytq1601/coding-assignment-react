import { User } from "@acme/shared-models";
import { ApiResponse, BaseService } from "./baseService";

class UserService extends BaseService {
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>({ method: "GET", url: "/users" });
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    return this.request<User>({ method: "GET", url: `/users/${id}` });
  }
}

export const userService = new UserService();
