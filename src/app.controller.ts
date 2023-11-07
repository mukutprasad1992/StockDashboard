import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AppService } from './app.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
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
        throw new Error('User not found'); // Customize the error message as needed
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
        message: "Error in getting all the  cities",
        error: error.message
      });

    }
  }


  @Post('register')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'documents', maxCount: 10 }]))
  async registerUser(@Body() userData: UserDTO, @Res() response, @UploadedFiles() documents) {

    const getFileUploadContent = await this.profileService.uploadFile(documents);
    userData.documents = getFileUploadContent;

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

}

