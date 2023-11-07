import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileUploadService } from 'src/utils/file-upload/file-upload.service';
import { Multer } from 'multer';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: FileUploadService) { }

    @Post('/upload')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'documents', maxCount: 10 }]))
    async createUser(@Res() response, @UploadedFiles() documents) {
        try {
            const getFileUploadContent = await this.profileService.uploadFile(documents);
            return response.status(HttpStatus.CREATED).json({
                status: true,
                message: "Profile upload successfully",
                data: getFileUploadContent
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
}
