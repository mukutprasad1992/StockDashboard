import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseInterceptors, UploadedFiles, Delete, Put, Patch } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './user.dto';
import * as bcrypt from "bcrypt";
import { FileUploadService } from './utils/file-upload/file-upload.service';

@Controller('user')
export class AppController {
  constructor(private appService: AppService,
    private profileService: FileUploadService) { }



  @Get('/getUser/:userId')
  async getById(@Param('userId') userId: string, @Res() response): Promise<void> {
    try {
      const getUserInstance = await this.appService.getUserById(userId);

      if (!getUserInstance) {
        throw new Error('User not found');
      }

      return response.status(HttpStatus.OK).json({
        status: true,
        message: 'User found',
        data: getUserInstance,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        status: false,
        message: 'User not found', // You can customize this error message too
        error: error.message, // Include the error message for debugging
      });
    }
  }

  @Get('/getAll')
  async findAllUsers(@Res() response): Promise<any> {
    try {
      const findAllUsers = await this.appService.findAll();
      return response.status(HttpStatus.OK).json({
        status: true,
        message: "List of all users ",
        data: findAllUsers
      })
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Error in getting all the  Users",
        error: error.message
      });

    }
  }


  @Post('register')
  async registerUser(@Body() userData: UserDTO, @Res() response) {
    if (userData.password !== userData.confirmpassword) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: "Password Mismatch",
      })
    }
    delete userData.confirmpassword;
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.email = userData.email.toLowerCase();
    userData.password = hashedPassword;
    const createUser = await this.appService.registerUser(userData);
    return response.status(HttpStatus.CREATED).json({
      status: true,
      message: "User registered successfully",
      data: createUser
    })
  }

  @Delete('/delete/:userId')
  async deleteUserById(@Param('userId') userId: string, @Res() Response) {
    try {
      const deleteCityById = await this.appService.deleteUser(userId);
      return Response.status(HttpStatus.OK).json({
        status: true,
        message: "User deleted successfully",
        data: {}
      })

    } catch (error) {
      return Response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Error in deleting User",
        error: error.message
      });

    }
  }
  @Put('/update/:userid')
  async updateUser(@Param('userid') userId: string, @Body() updateData: Record<string, any>): Promise<any> {
    const updatedUser = this.appService.update(userId, updateData);
    return updatedUser
  }

}

