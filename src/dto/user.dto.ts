export class CreateUserDTO {
      username: string;
      password: string;
      email: string;
      nickname?: string; // '?' 表示这个字段是可选的
    }
    //有选择地接受客户端传来的数据，定义数据