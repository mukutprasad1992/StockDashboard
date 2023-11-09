import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileUploadService } from 'src/utils/file-upload/file-upload.service';
import { ProfileService } from '../service/profile.service';
import { ProfileDto } from '../profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly fileUploadService: FileUploadService,
        private profileService: ProfileService) { }

    @Post('/upload')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'profilePic', maxCount: 10 }]))
    async createUser(@Body() profileDto: ProfileDto, @Res() response, @UploadedFiles() profilePic) {
        try {
            const getFileUploadContent: any = await this.fileUploadService.uploadFile(profilePic);
            console.info("getFileUploadContent", getFileUploadContent);
            profileDto.profilePic = getFileUploadContent ? getFileUploadContent.Location : "";
            const getUserAfterInsert = await this.profileService.uploadFile(profileDto);

            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "Profile pic uploaded successfully",
                data: getUserAfterInsert
            })
        }
        catch (error) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: "Error creating user",
                error: error.message
            });

        }
    }

    @Get('/getProfile/:userId')
    async getById(@Param('userId') userId: string, @Res() response): Promise<void> {
        try {
            const getUserInstance = await this.profileService.getUserById(userId);

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
    @Get('/getProfileData/:userId')
    async getAllById(@Param('userId') userId: string, @Res() response): Promise<void> {
        try {
            const getUserInstance = await this.profileService.getAlldata(userId);

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
}
